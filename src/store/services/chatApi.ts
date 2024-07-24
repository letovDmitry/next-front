import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://anyboost.ru/api/chat",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log(result.error);
    Cookies.remove("access_token");
    window.location.reload();
  }
  return result;
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessagesByOrderId: builder.query<any, string>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: `/${data}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      providesTags: ["Messages"],
    }),
  }),
});

export const { useGetMessagesByOrderIdQuery } = chatApi;
