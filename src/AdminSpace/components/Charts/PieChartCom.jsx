import { Tooltip } from 'bootstrap';
import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import Chart from "react-apexcharts";


export default function PieChartCom({ genders }) {
    const data01 = [
        { name: 'Male', value: 100 },
        { name: 'Female', value: 200 },
        { name: 'None', value: 50 },
    ];
    const COLORS = ["#516BEB", "#F473B9", "#DBDFEA"];

  const renderCustomizedLabel = ({ payload,cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <>
        <text x={x} y={y} className='font-bold text-sm flex justify-center items-center' fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${payload.name}`}
        </text>
      </>
    );
  };
  return (
    <>
        {/*<ResponsiveContainer width="100%" height="100%">
          <PieChart width={730} height={300}>
            <Pie
              data={genders}
              color="#000000"
              dataKey="value"
              nameKey="name"
              label={renderCustomizedLabel}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {genders?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
              ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>*/}
      {
                <Chart
                  options={
                  {
                    chart: {
                      type : "pie"
                    },
                    colors : COLORS,
                    labels : ["Male","Female","None"]
                  }
                }
                series={genders || []}
                type="pie"
                width={450}
              />
    }
    </>
  )
}
