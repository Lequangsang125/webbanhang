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
                    <h4>Contact infor</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        khu 8 thi tran thanh ba, phu tho
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        sanglq125@gmail.cpm
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        1234567890
                    </p>
                </div>

                <div className='footer__col'>
                    <h4>Conpany</h4>
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Work With Us</a>
                    <a href="/">Our Blogs</a>
                    <a href="/">Trems & Conditions</a>


                </div>

                <div className='footer__col'>
                    <h4>Useful link</h4>
                    <a href="/">Help</a>
                    <a href="/">Track My Oder</a>
                    <a href="/">Men</a>
                    <a href="/">Women</a>
                    <a href="/">Dress</a>

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
            Copyright © by sanglq125@gmail.com
            </div>
        </>
    )
}

export default Footer
