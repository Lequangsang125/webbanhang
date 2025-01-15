import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery, useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi'
import { formatDate } from '../../../../utils/formatDate'
import { Link } from 'react-router-dom'
import UpdateOrderModal from './UpdateOrderModal'
import Swal from 'sweetalert2'

const ManageOrders = () => {
    const { data: orders, isLoading, error ,refetch} = useGetAllOrdersQuery()
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteOrder] = useDeleteOrderMutation();
    const handleEditedOrder = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setSelectedOrder(null)
        setIsModalOpen(false)
    }

    const handleDeleteOder = async (id) => {
         const result = await Swal.fire({
                          title: 'Bạn chắc chắn muốn xóa người dùng này?',
                          text: 'Thao tác này không thể hoàn tác!',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Xóa',
                          cancelButtonText: 'Hủy',
                      });
                  
                      if (result.isConfirmed) {
                          try {
                              const res = await deleteOrder(id).unwrap();
                              Swal.fire({
                                  title: "Good job!",
                                  text: "Xóa thành công!",
                                  icon: "success"
                              });
                              await refetch();
                          } catch (error) {
                              console.error("Lỗi ", error);
                          }
                      }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error </div>

    return (
        <div className='section__container p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Quản lý đơn hàng </h2>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                <thead>
                    <tr>
                    <th className='py-3 px-4 border-b'>STT </th>
                        <th className='py-3 px-4 border-b'>Id </th>
                        <th className='py-3 px-4 border-b'>Email </th>
                        <th className='py-3 px-4 border-b'>Trạng thái </th>
                        <th className='py-3 px-4 border-b'>Ngày tạo </th>
                        <th className='py-3 px-4 border-b'>Xem chi tiết </th>
                        <th className='py-3 px-4 border-b'>Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((order, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                     <td className='py-3 px-4 border-b'>{index+1}</td>
                                    <td className='py-3 px-4 border-b'>{order?._id}</td>
                                    <td className='py-3 px-4 border-b'>{order?.email}</td>
                                    <td className='py-3 px-4 border-b'>
                                        <span className={`inline-block px-3 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>{order?.status}</span>
                                    </td>
                                    <td className='py-3 px-4 border-b'>{formatDate(order?.updatedAt)}</td>
                                    <td className='py-3 px-4 border-b'>
                                        <Link to={`/orders/${order?._id}`} className='text-blue-500 hover:underline'>Xem chi tiết</Link>
                                    </td>
                                    <td className='py-3 px-4 border-b flex space-x-2'>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-700"
                                            onClick={() => handleEditedOrder(order)}>Sửa </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-700"
                                            onClick={() => handleDeleteOder(order._id)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/*update order modal*/}
            {
                selectedOrder && (
                  <UpdateOrderModal
                  order={selectedOrder}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  />
                )
            }
        </div>
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-500';
    }

}

export default ManageOrders