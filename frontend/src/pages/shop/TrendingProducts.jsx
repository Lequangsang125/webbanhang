import React, { useState } from 'react'
import ProductCarts from './ProductCarts'
import products from '../../data/products.json'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = ()=>{
        setVisibleProducts(prevCount => prevCount +4)
    }
  return (
    <section className='section__container product__container'>
    <h2 className='section__header'>Sản phẩm nổi bật</h2>
    <p className='section__subheader mb-12'>sản phẩm đang bán chạy 

    </p>

  {/**products cards */}
 <div className='mt-3'> <ProductCarts products={products.slice(0,visibleProducts)} /></div>
 {/** load more product */}
 <div className='product__btn'>
    {
        visibleProducts <products.length &&(
            <button className='btn' onClick={loadMoreProducts}>XEM THÊM</button>
        )
    }
    
 </div>
  </section>
  )
}

export default TrendingProducts
