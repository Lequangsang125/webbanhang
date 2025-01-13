import React from 'react'
import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'
const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>Thông tin liên hệ</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        sanglq125@gmail.com 
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        sanglq125@gmail.cpm
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        123456789
                    </p>
                </div>

                <div className='footer__col'>
                    <h4>Công ty</h4>
                    <a href="/">Trang chủ</a>
                    <a href="/">Về chúng tôi</a>
                    <a href="/">Làm việc với chúng tôi</a>
                    <a href="/">Blog của chúng tôi</a>
                    <a href="/">Điều khoản</a>


                </div>

                <div className='footer__col'>
                    <h4>Hữu ích</h4>
                    <a href="/">Giúp đỡ</a>
                    <a href="/">Theo dõi đơn hàng</a>
                    <a href="/">Đàn ông</a>
                    <a href="/">Phụ nữ</a>
                    <a href="/">Đầm</a>

                </div>
                <div className='footer__col'>
                    <h4>Instagram</h4>
                    <div className='instagram__grid'>
                    <img src={instaImg1} alt="" />
                    <img src={instaImg2} alt="" />
                    <img src={instaImg3} alt="" />
                    <img src={instaImg4} alt="" />
                    <img src={instaImg5} alt="" />
                    <img src={instaImg6} alt="" />
                    </div>
                </div>
            </footer>
            <div className='footer__bar'>
            Copyright © by lequangsang
            </div>
        </>
    )
}

export default Footer
