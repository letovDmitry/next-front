import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IUser } from "./userApi";

export interface IOrder {
  id: number;
  createdAt: string;
  updatedAt: string;

  system: String;
  type: String;
  status: String;
  current: String;
  goal: String;

  userId: number;
  user: IUser;

  options: string;

  boosterId?: number;
  booster: IUser;

  seenBy?: IUser[]
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://anyboost.ru/api/order",
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

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrdersForMember: builder.query<IOrder[], void>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: "/member",
          method: "GET",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      providesTags: ["Orders"],
    }),

    getNewOrdersForBooster: builder.query<IOrder[], void>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: "/booster_new",
          method: "GET",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      providesTags: ["Orders"],
    }),

    getOrdersForBooster: builder.query<IOrder[], void>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: "/booster",
          method: "GET",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      providesTags: ["Orders"],
    }),

    takeOrderForBooster: builder.mutation<IOrder, number>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: `/${data}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),

    completeOrderForBooster: builder.mutation<IOrder, number>({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: `/complete/${data}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),

    createOrderYookassa: builder.mutation<
      IOrder,
      {
        status: string;
        custom_fields: {
          system;
          goal: string;
          current: string;
          type: string;
          email: string;
        };
      }
    >({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: `/yookassa`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),

    createOrderEnot: builder.mutation<
      IOrder,
      {
        status: string;
        custom_fields: {
          system;
          goal: string;
          current: string;
          type: string;
          email: string;
        };
      }
    >({
      query(data) {
        const access_token = Cookies.get("access_token");
        return {
          url: `/enot`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderEnotMutation,
  useCreateOrderYookassaMutation,
  useGetNewOrdersForBoosterQuery,
  useGetOrdersForBoosterQuery,
  useGetOrdersForMemberQuery,
  useTakeOrderForBoosterMutation,
  useCompleteOrderForBoosterMutation,
} = ordersApi;
