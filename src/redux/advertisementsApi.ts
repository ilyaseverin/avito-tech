import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Advertisement, AdvertisementResponse } from "../types/types";

export const advertisementsApi = createApi({
  reducerPath: "advertisementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["Advertisement"],
  endpoints: (builder) => ({
    getAdvertisements: builder.query<
      AdvertisementResponse,
      { page?: number; per_page?: number; sort?: string; searchQuery?: string }
    >({
      query: ({
        page = 1,
        per_page = 10,
        sort = "price",
        searchQuery = "",
      }) => {
        let queryString = `/advertisements?_page=${page}&_per_page=${per_page}&_sort=${sort}`;
        if (searchQuery) {
          queryString += `&q=${searchQuery}`;
        }
        return queryString;
      },
      providesTags: (result) =>
        result ? [{ type: "Advertisement", id: "LIST" }] : ["Advertisement"],
    }),
    getAdvertisementById: builder.query<Advertisement, string>({
      query: (id) => `/advertisements/${id}`,
      providesTags: (result, error, id) => [{ type: "Advertisement", id }],
    }),
    createAdvertisement: builder.mutation<
      Advertisement,
      Partial<Advertisement>
    >({
      query: (body) => ({
        url: "/advertisements",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Advertisement", id: "LIST" }],
    }),
    updateAdvertisement: builder.mutation<
      Advertisement,
      Partial<Advertisement> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/advertisements/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Advertisement", id },
        { type: "Advertisement", id: "LIST" },
      ],
    }),
    patchAdvertisement: builder.mutation<
      Advertisement,
      Partial<Advertisement> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/advertisements/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Advertisement", id },
        { type: "Advertisement", id: "LIST" },
      ],
    }),
    deleteAdvertisement: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/advertisements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Advertisement", id },
        { type: "Advertisement", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useCreateAdvertisementMutation,
  useUpdateAdvertisementMutation,
  usePatchAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementsApi;
