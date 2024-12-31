import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

const reviewApi = createApi ({
    reducerPath:'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
        credentials: 'include',
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) =>({
        postReview: builder.mutation({
            query: (reviewData) =>({
                url: "/post-review",
                method: "POST",
                body: reviewData
            }),
            invalidatesTags: (result,error,{postId}) =>[{type: "Reviews", id: postId}]
        }),
        getReviewsCount: builder.query({
            query: () =>({
                url: "/total-reviews"
            })
        }),
        getReviewsByUserId: builder.mutation({
            query: (userId) =>({
                url: `/${userId}`
            }),
            providesTags: (result) => result ? [{type: "Reviews", id: result[0] ?.email}] : []
        })
    })
})
export const {usePostReviewMutation, useGetReviewsByUserIdMutation,useGetReviewsCountQuery} = reviewApi
export default reviewApi