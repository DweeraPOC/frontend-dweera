import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function RadarChartCom({ vehicles }) {
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
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={vehicles}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar name="dweera" dataKey="value" stroke="#65D01E" fill="#65D01E" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
  )
}
