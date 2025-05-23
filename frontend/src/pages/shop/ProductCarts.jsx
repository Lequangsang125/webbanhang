import React from 'react'
import { Link } from 'react-router-dom';
import RatingStarts from '../../component/RatingStarts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCarts = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCard = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {
        products.map((product) => (
          <div key={product._id} className='product__card'>
            <div className='relative'>
              <Link to={`/shop/${product._id}`}>
                <img src={product.image} alt="product image" className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300' />
              </Link>
              <div className='hover:block absolute top-3 right-3'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCard(product)
                  }}
                >
                  <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white"></i>
                </button>
              </div>
            </div>

            {/**product description */}
            <div className='product__card__content'>
              <h4>{product.name}</h4>
              <p>
                {product.price.toLocaleString("vi-VN")}₫
                {product.oldPrice ? <s> {product.oldPrice.toLocaleString("vi-VN")}₫</s> : null}
              </p>

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProductCarts
