import React from 'react'
import { useSelector } from 'react-redux'
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi'
import { useNavigate } from 'react-router-dom'

const UserReviews = () => {
    const {user} = useSelector((state) => state.auth)
    const{data: reviews, error, isLoading} = useGetReviewsByUserIdQuery(user?._id)
    const nav = useNavigate()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No reviews found!</div>
    console.log(reviews);
    
    const handleCardClick = ()=>{
        nav('/shop')
    }
  return (
    <div className='py-6'>
        <h2 className='text-2xl font-bold mb-4'>Đánh giá của bạn</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6'>
            {
                reviews && reviews.map((review,index)=>
            <div key={index} className='bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-add'>
                <p className='text-lg font-semibold mb-2'>Đánh giá: {review?.rating} <i className="text-yellow-500 ri-star-fill"></i></p>
                <p className='mb-2'><strong>Comment:</strong> {review?.comment}</p>
                <p className='text-sm text-gray-500'><strong>ProductId:</strong> {review?.productId}</p>
                <p className='text-sm text-gray-500'><strong>Date:</strong> {new Date (review?.createdAt).toLocaleDateString()}</p>
            </div> 
        )
            }
            <div
            onClick={handleCardClick}
            className='bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary hover:text-white transition_all duration-200'>
                <span>+</span>
                <p>Add new reviews</p>
            </div>
        </div>
    </div>
  )
}

export default UserReviews
