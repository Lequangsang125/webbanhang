import React, { useEffect, useState } from 'react';
import { getBaseUrl } from '../utils/baseURL';
import TimeLineStep from './TimeLineStep';

const PaymentSuccess = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get("session_id");
        console.log(sessionId);
        if (sessionId) {
            fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ session_id: sessionId }),
            })
                .then((res) => res.json())
                .then((data) => setOrder(data.order))
                .catch((err) => console.error("error confirming payment", err));
        }
    }, []);

    if (!order) return <div>Đang xác nhận thanh toán...</div>;

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
            <h2 className='text-2xl font-semibold mb-4'>Thanh toán {order?.status}</h2>
            <p className='mb-8'>Trạng thái : {order?.status}</p>

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
    );
};

export default PaymentSuccess;