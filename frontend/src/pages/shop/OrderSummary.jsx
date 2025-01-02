import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  
  
  const products = useSelector((store) => store.cart.products)
  
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart)

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  //payment integration 
  const makePayment = async (e) => {

    
  }
  return (
    <div className='bg-primary-light mt-5 rounded text-base'>
      <div className='px-6 py-4 space-x-5'>
        <h2 className='text-2xl font-bold text-text-dark'>Tóm tắt đơn hàng</h2>
        <p className='text-text-dark mt-3 '>Mục đã chọn: {selectedItems}</p>
        <p className='mt-3'>Tổng giá: ${totalPrice.toFixed(2)}</p>
        <p className='mt-3'>Thuế ({taxRate * 100}%): ${tax.toFixed(2)}</p>
        <h3 className='font-bold mt-3'>Tổng cộng: ${grandTotal.toFixed(2)}</h3>
        <div className='px-4 mb-6'>
          <button
          onClick={(e)=>{
            e.stopPropagation();
            handleClearCart()
          }}
            className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
            <span className='mr-2'>Xóa toàn bộ giỏ hàng</span>
            <i className="ri-delete-bin-line"></i>
          </button>
          <button
          onClick={(e)=>{
            e.stopPropagation();
            makePayment();
          }}
            className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
            <span className='mr-2'>Thanh toán</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
