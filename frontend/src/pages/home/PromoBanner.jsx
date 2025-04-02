import React from 'react'

const PromoBanner = () => {
  return (
   <section className='section__container banner__container'>
        <div className='banner__card'>
            <span><i className="ri-truck-line"></i></span>
            <h4>Miễn phí giao hàng</h4>
            <p>Cung cấp sự tiện lợi và khả năng mua sắm từ bất kỳ đâu, bất kỳ lúc nào.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-exchange-dollar-line"></i></span>
            <h4>Thanh toán nhanh chóng</h4>
            <p>Thương mại điện tử có một hệ thống đánh giá nơi khách hàng có thể chia sẻ phản hồi.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-user-2-fill"></i></span>
            <h4>Hỗ trợ nhiệt tình</h4>
            <p>Cung cấp dịch vụ hỗ trợ khách hàng để giúp khách hàng giải 
                đáp thắc mắc và xử lý vấn đề.</p>
        </div>
   </section>
  )
}

export default PromoBanner
