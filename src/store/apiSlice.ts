import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse, Review, OrderRequest, OrderResponse } from "@/types";

const API_BASE_URL = "http://o-complex.com:1337";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Products", "Reviews", "Order"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    getProducts: builder.query<
      ProductsResponse,
      { page: number; pageSize?: number }
    >({
      query: ({ page, pageSize = 20 }) => ({
        url: "/products",
        params: { page, page_size: pageSize },
      }),
      providesTags: ["Products"],
    }),
    submitOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useSubmitOrderMutation,
} = apiSlice;
