import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/header.png"
const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Giảm giá đến 20%</h4>
            <h1>Thời trang nữ</h1>
            <p>Khám phá những xu hướng mới nhất và thể hiện phong cách độc đáo của
               bạn với trang web Thời trang Nữ của chúng tôi. Khám phá bộ sưu tập quần áo, 
               phụ kiện và giày dép được chọn lọc, phù hợp với mọi sở thích và dịp lễ.</p>
            <button className='btn'><Link to="/shop">Khám phá</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner
