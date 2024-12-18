import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/header.png"
const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Giam gia 20%</h4>
            <h1>Thoi trang nu</h1>
            <p>OKOKOKOKOKOKOKOKOKOKOKOJK</p>
            <button className='btn'><Link to="/shop">Mua ngay</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner
