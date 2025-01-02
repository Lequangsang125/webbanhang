import React from 'react'
import OrderSummary from './OrderSummary'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const CartModal = ({ products, isOpen, onClose }) => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const handleQuantity = (type, id) => {
    const payload = { type, id }
    dispatch(updateQuantity(payload))
  }
  const handleRemove = (e, id) => {
    e.preventDefault()
    dispatch(removeFromCart({ id }))
  }
  return (
    <div
      onClick={onClose}
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ transition: 'opacity 300ms' }}>
      <div
       onClick={(e) => e.stopPropagation()}
      className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)' }}
      >
        <div className='p-4 mt-4'>
          <div className='flex  justify-between items-center mt-4'>
            <h4 className='text-xl font-semibold'>Giỏ hàng: </h4>
            <button
              onClick={() => onClose()}
              className='text-gray-600 hover:text-gray-900'>
              <i className="ri-close-large-fill bg-black p-1 text-white"></i></button>
          </div>

          {/**cart details */}
          <div className='cart-item'>
            {
              products.length === 0 ? (<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                {/* Hình minh họa */}
                <div className="mb-6">
                  <i className="ri-shopping-cart-line text-9xl"></i>
                </div>

                {/* Nội dung */}
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Giỏ hàng trống!</h1>
                <p className="text-gray-600 text-center mb-6">
                  Bạn chưa thêm sản phẩm nào vào giỏ. Khám phá các sản phẩm thú vị và quay lại đây nhé!
                </p>
                {/* Nút hành động */}
                <button
                  className="px-8 py-3 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition"
                  onClick={() => {
                    onClose();
                    nav('/shop');
                  }
                  }
                >
                  Khám phá sản phẩm
                </button>
              </div>) : (
                products.map((item, index) => (
                  <div key={index} className='flex flex-col md:flex-row 
                  md:items-center md:justify-between shadow-md md:p-5 p-2
                   mb-4'>
                    <div className='flex items-center'>
                      <span className='mr-4 px-1 bg-primary text-white rounded-full'>0{index + 1}</span>
                      <img src={item.image} alt="" className='size-12 object-cover mr-4' />
                      <div>
                        <h5 className='text-lg font-medium'>{item.name}</h5>
                        <p className='text-gray-600 text-sm'>${Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className='flex flex-row md:justify-start
                      justify-end items-center mt-2'>
                        <button
                          onClick={() => handleQuantity('decrement', item.id)}
                          className='size-6 flex items-center
                        justify-center px-1.5 rounded-full bg-gray-200
                        text-gray-700 hover:bg-primary hover:text-white
                        ml-8
                        '
                        >-</button>
                        <span className='px-2 text-center mx-1'>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantity('increment', item.id)}
                          className='size-6 flex items-center
                        justify-center px-1.5 rounded-full bg-gray-200
                        text-gray-700 hover:bg-primary hover:text-white
                        '
                        >+</button>
                        <div className='ml-5'>
                          <button
                            onClick={(e) => handleRemove(e, item._id)}
                            className='text-red-500 hover:text-red-800 mr-4'
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            }
          </div>

          {/** calculation */}
          {
            products.length > 0 && (
              <OrderSummary />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CartModal
