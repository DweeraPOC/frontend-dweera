import { format, parseISO } from 'date-fns';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

//const COLORS = ["#65D01E", "#DC3535", "#F49D1A"];
export default function LineChartCom({ info }) {
  return (
    <>
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                width={500}
                height={300}
                data={info}
            >
                <CartesianGrid horizontal={false} vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line type="monotone" dataKey="Offers" stroke="#65D01E" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Booking request" stroke="#DF2E38" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Reviews" stroke="#F7C04A" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </>
  )
}

function CustomTooltip({ active, payload, label,types,type }) {
    if (active) {
      return (
        <div className="rounded-md bg-gray-400 text-white p-4 shadow-md text-center text-sm flex flex-col gap-2 w-full">
          <h4 className='text-sm'>{format(parseISO(new Date()?.toISOString()), "eeee, d MMM, yyyy")}</h4>
          <p className='flex justify-center items-center gap-2 flex-col text-white'>
            <span>{payload[0]?.payload["Offers"]} {payload[0]?.dataKey}</span>
            <span>{payload[0]?.payload["Booking request"]} {payload[1]?.dataKey}</span>
            <span>{payload[0]?.payload["Reviews"]} {payload[2]?.dataKey}</span>
          </p>
        </div>
      );
    }
    return null;
}

/*function CustomLegend(props){
    const { payload } = props;
    //console.log(props)
    const COLORS = ["#65D01E", "#DC3535", "#F49D1A"];
    return (
        <ul className='w-full flex justify-center items-center flex-row gap-3'>
        {
            payload && payload?.map((entry, index) => (
                <li key={`item-${index}`} className=' flex justify-center items-center gap-4 border'>
                    <span className={`w-4 h-4 rounded-full bg-[${entry?.color}] text-[${entry?.color}]`}>{entry?.color}</span>
                    <span className='text-sm text-gray-900'>{entry?.value}</span>
                </li>
            ))
        }
        </ul>
    );
}*/
