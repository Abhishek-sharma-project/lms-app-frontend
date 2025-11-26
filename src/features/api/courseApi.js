import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_COURSE_API;

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice, page, limit }) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        // append category
        if (categories && categories.length > 0) {
          categories.forEach((category) => {
            queryString += `&categories=${encodeURIComponent(category)}`;
          });
        }

        // append sortByPrice if available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        queryString += `&page=${page}&limit=${limit}`;

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    getSuggestion: builder.query({
      query: (query) => ({
        url: `/course/suggestion?query=${query}`,
        method: "GET",
      }),
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PATCH",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    removeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useLazyGetSuggestionQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} = courseApi;
