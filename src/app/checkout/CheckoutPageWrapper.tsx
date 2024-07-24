"use client";

import CheckoutPage from "./CheckoutPage";
import { useSearchParams } from "next/navigation";

const CheckoutPageWrapper = () => {
  const searchParams = useSearchParams();
  const searchParamsObject: { [key: string]: string | string[] | undefined } = {};
  searchParams.forEach((value, key) => {
    searchParamsObject[key] = value;
  });

  return <CheckoutPage searchParams={searchParamsObject} />;
};

export default CheckoutPageWrapper;
