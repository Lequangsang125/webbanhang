import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({order,isOpen,onClose}) => {
    const [status,setStatus] = useState(order?.status);
    const [updateOrderStatus,{isLoading,error}] = useUpdateOrderStatusMutation()

    const handleUpdateOrderStatus = async () =>{
        try {
            await updateOrderStatus({id: order?._id,status})
            onClose();
        } catch (error) {
            console.error("Failed to update order status",error);

        }
    }
    if(!isOpen){
        return null;
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-4 rounded shadow-lg w-1/3'>
        <h2 className='text-xl mb-4'>Cập nhật trạng thái đơn  </h2>
        <div className='mb-4 space-y-4'>
            <label className='block text-sm font-medium text-gray-700'>Chọn trạng thái</label>
           <select 
           value={status}
           onChange={(e) => setStatus(e.target.value)}
             className='block w-full shadow-sm sm:text-sm border-gray-300 bg-gray-100
                rounded-md py-2.5 px-5 focus:outline-none'
           >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="shipped">shipped</option>
            <option value="completed">completed</option>
           </select>
        </div>
        {error && <p className="text-red-500 mb-4">Failed to update status.</p>}
                
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                    </button>
                    </div>
    </div>
</div>
)
}

export default UpdateOrderModal