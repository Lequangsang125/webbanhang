import React, { useState } from 'react'
import commentorIcon from '../../../assets/avatar.png'
import { fomateDate } from '../../../utils/formateDate'
import RatingStarts from '../../../component/RatingStarts'
import PostARevies from './PostAReviews'
const ReviewsCart = ({ productReviews }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const reviews = productReviews || []
    const handleOpenReviewModal = () =>{
        setIsModalOpen(true)
    }

    const handleCloseReviewModal = () =>{
        setIsModalOpen(false)
    } 
    return (
        <div className='my-6 bg-white p-8'>
            <div>
                {
                    reviews.length > 0 ? (<div>
                        <h3 className='text-lg font-medium'>All comment :</h3>
                        <div>
                            {
                                reviews.map((review, index) => (
                                    <div key={index} className='mt-4'>
                                        <div className='flex gap-4 items-center'>
                                            <img src={commentorIcon} className='size-14' alt="" />
                                            <div className='space-y-1'>
                                                <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{review?.userId.username}</p>
                                                <p className='text-[12px] italic'>{fomateDate(review?.updatedAt)}</p>
                                                <RatingStarts rating={review?.rating} />
                                            </div>
                                        </div>
                                        <div className='text-gray-600 mt-5 border p-8'>
                                            <p className='md:w-4/5'>{review?.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>) : <p>No reviews yet</p>
                }
            </div>

            {/*add review button*/}
            <div className='mt-12'>
                <button 
                onClick={handleOpenReviewModal}
                className='px-6 py-3 bg-primary text-white rounded-md'>Add a reviews</button>
            </div>

            {/**Review modal */}
        <PostARevies isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
        </div>
    )
}

export default ReviewsCart
