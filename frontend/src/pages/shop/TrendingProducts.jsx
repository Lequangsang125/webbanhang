import React, { useState } from 'react'
import ProductCarts from './ProductCarts'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const TrendingProducts = () => {
      const { data: { products = []} = {}, isLoading, error} = useFetchAllProductsQuery({       
      })
      console.log(products.length);
      
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = ()=>{
        setVisibleProducts(prevCount => prevCount +4)
    }
    if (isLoading) return <div>Đang tải sản phẩm...</div>
    if (error) return <div>Đã xảy ra lỗi khi tải sản phẩm!</div>
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
