import React from 'react'
import dealsImg from "../../assets/deals.png"
const DealsSection = () => {
    return (
        <section className='section__container deals__container'>
            <div className='deals__image'>
                <img src={dealsImg} alt="" />
            </div>
            <div className='deals__content'>
                <h5>Giảm giá lên đến 20%</h5>
                <h4>Ưu đãi trong tháng này</h4>
                <p>Các ưu đãi thời trang nữ của tháng đã đến để biến giấc mơ phong cách của bạn thành hiện
                     thực mà không làm bạn tốn kém. Khám phá bộ sưu tập được chọn lọc gồm những trang phục,
                     phụ kiện và giày dép tinh tế, tất cả đều được lựa chọn kỹ lưỡng để nâng tầm tủ đồ của bạn.</p>

                <div className='deals__countdown flex-wrap'>
                    <div className='deals__countdown__card'>
                        <h4>14</h4>
                        <p>ngày</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>20</h4>
                        <p>giờ</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>15</h4>
                        <p>phút</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>05</h4>
                        <p>giây</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DealsSection
