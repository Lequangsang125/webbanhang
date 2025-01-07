import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'


const UserDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email)

    if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    if (!stats) {
        return <div className='text-center text-gray-500'>No data available</div>
    }
    const data = {
        labels: ['Total payments', 'Total Reviews', 'Total Purchased Products',],
        datasets: [
            {
                label: 'User Stats',
                data: [stats.totalPayments, stats.totalReviews, stats.totalPurchasedProducts],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        if(tooltipItem.label === 'Total Payment'){
        
                        }
                    }
                }
            }
        }
    }
    return (
        <div>
            UserDMain
        </div>
    )
}

export default UserDMain
