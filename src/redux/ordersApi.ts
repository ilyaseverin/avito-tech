import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../types/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], { status?: number | string }>({
      query: ({ status }) => {
        let queryString = `/orders?_sort=total`;

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
