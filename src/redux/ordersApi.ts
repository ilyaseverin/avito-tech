import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order, OrdersResponse } from "../types/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<
      OrdersResponse,
      { status?: number; page?: number; per_page?: number; sort?: string }
    >({
      query: ({ status, page = 1, per_page = 6, sort = "total" }) => {
        let queryString = `/orders?_page=${page}&_per_page=${per_page}&_sort=${sort}`;
        if (status !== undefined) {
          queryString += `&status=${status}`;
        }
        return queryString;
      },
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: number }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
