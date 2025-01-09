import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByIdQuery } from '../../../redux/features/orders/orderApi'
import { useParams } from 'react-router-dom'
import TimeLineStep from '../../../component/TimeLineStep'
 

const OrderDetails = () => {
    // const {user} = useSelector((state) => state.auth)
    const {orderId} = useParams()
    const {data: order,error,isLoading} = useGetOrdersByIdQuery(orderId)

    if(isLoading) return  <div>Loading...</div>
    if(error) return <div>Error fetching order</div>

    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        return statuses.indexOf(status) < statuses.indexOf(order.status);
    };

    const isCurrent = (status) => order.status === status;

    const steps = [
        {
            status: 'pending',
            label: 'Chờ xác nhận',
            description: 'Đơn hàng của bạn đã được tạo và đang chờ xử lý..',
            icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
            status: 'processing',
            label: 'Đang xử lý',
            description: 'Đơn hàng của bạn hiện đang được xử lý.',
            icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
        },
        {
            status: 'shipped',
            label: 'Đã giao hàng',
            description: 'Đơn hàng của bạn đã được giao.',
            icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
        },
        {
            status: 'completed',
            label: 'Đã hoàn thành',
            description: 'Đơn hàng của bạn đã hoàn thành.',
            icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
        },
    ];

  return (
    <section className='section__container rounded p-6'>
    <h2 className='text-2xl font-semibold mb-4'>Payment {order?.status}</h2>
    <p className='mb-4'>Order id : {order?.orderId}</p>
    <p className='mb-8'>Status : {order?.status}</p>

    <ol className='sm:flex items-center relative'>
        {steps.map((step, index) => (
            <TimeLineStep
                key={index}
                step={step}
                order={order}
                isCompleted={isCompleted(step.status)}
                isCurrent={isCurrent(step.status)}
                isLastStep={index === steps.length - 1}
                icon={step.icon}
                description={step.description}
            />
        ))}
    </ol>
</section>
  )
}

export default OrderDetails
