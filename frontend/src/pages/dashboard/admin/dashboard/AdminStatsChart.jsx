import React from 'react'
import {Pie,Line} from 'react-chartjs-2'
import 'chart.js/auto';

const AdminStatsChart = ({stats}) => {
  console.log();
  
    const pieData = {
            labels: [ "Tổng đơn hàng","Tổng sản phẩm" , "Tổng đánh giá", " Tổng người dùng"],
            datasets: [
                {
                    label: "Admin Stats",
                    data: [
                        stats.totalOrders,
                        stats.totalProducts,
                        stats.totalReviews,
                        stats.totalUsers,
                    ],
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF'
                    ],
                    hoverBackgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF'
                    ]
                },
               
            ]
    }
    const data = new Array(12).fill(0);
    //map correct month
    stats?.monthlyEarnings.forEach((entry) =>{
      data[entry.month - 1] = entry.earnings;
    })

    const lineData = {
        labels: ['Tháng 1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Thu nhập hàng tháng',
                data,
                fill: false,
                borderColor: '#36A2EB',
                backgroundColor: '#36A2EB',
                tension: 0.1,
            },
        ]
    }
    const options = {
      reponsive: true,
      maintainAspectRatio: false,
    }
  return (
    <div className='mt-12 space-y-12'>
      <h2 className='text-xl font-semibold mb-4'>Tổng quan thống kê</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/*Pie chart*/}
      <div className='max-h-96 md:h-96 w-full'>
        <Pie data={pieData} options={options} />
      </div>
      <div className='max-h-96 md:h-96 w-full'>
        <Line data={lineData} options={options} />
      </div>
      </div>
     
    </div>
  )
}

export default AdminStatsChart
