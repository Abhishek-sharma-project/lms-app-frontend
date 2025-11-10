import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = import.meta.env.VITE_PURCHASE_API;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/create-checkout",
        method: "POST",
        body: { courseId },
      }),
    }),
    webhook: builder.mutation({
      query: (transactionId) => ({
        url: "/webhook",
        method: "POST",
        body: { transactionId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchaseCourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useWebhookMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchaseCoursesQuery,
} = purchaseApi;
