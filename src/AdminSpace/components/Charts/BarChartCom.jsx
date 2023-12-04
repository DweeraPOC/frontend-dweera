import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartCom() {
    const data = [
        {
          subject: 'Bike',
          A: 120,
          B: 110,
          fullMark: 150,
        },
        {
          subject: 'Bike E',
          A: 98,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'Scooter',
          A: 54,
          B: 130,
          fullMark: 150,
        },
        {
          subject: 'Scooter e',
          A: 99,
          B: 100,
          fullMark: 150,
        },
      ];
  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="A" fill="#8884d8" />
            <Bar dataKey="B" fill="#82ca9d" />
            <Bar dataKey="A" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    </>
  )
}
