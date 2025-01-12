import React from 'react'
import {Pie,Line} from 'react-chartjs-2'
import 'chart.js/auto';

const AdminStatsChart = ({stats}) => {
    const pieData = {
            labels: ['Total Order', "Total Products" , "Total Reviews", " Total Users"],
            datasets: [
                {
                    label: "Admin Stats",
                    data: [
                        stats.total
                    ]
                }
            ]
    }
  return (
    <div>
      AdminStatsChart
    </div>
  )
}

export default AdminStatsChart
