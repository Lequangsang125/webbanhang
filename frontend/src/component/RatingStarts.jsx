import React from 'react'

const RatingStarts = ({rating}) => {
    const starts = [];
    for(let i = 1; i <= 5;i++){
        starts.push(
            <span key={i} className={`ri-star${i <= rating ? '-fill' : '-line'}`}></span>
        )
    }
  return (
    <div className='product__rating'>
      {starts}
    </div>
  )
}

export default RatingStarts
