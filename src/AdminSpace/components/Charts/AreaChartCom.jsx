import { ResponsiveContainer,AreaChart,XAxis,YAxis,Area,Tooltip,CartesianGrid } from 'recharts'
import React from 'react'
import { format, parseISO, subDays } from "date-fns";

export default function AreaChartCom({ statistics,type }) {
    const data = [];
    for (let num = 7; num > 0; num--) {
        data.push({
            date: subDays(new Date(), num).toISOString().substr(0, 10),
            value: (Math.random() * 1000),
            num : num
        });
    }
    const TYPES = {
      "offers" : "numberOfOffers",
      "bookings" : "numberOfBookigs",
      "users" : "numberOfUsers"
    } 

  return (
    <>
        <ResponsiveContainer height={300}>
            <AreaChart data={statistics}>
                <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#65D01E" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#65D01E" stopOpacity={0.05} />
                </linearGradient>
                </defs>

                <Area dataKey={TYPES[type]} stroke="#65D01E" fill="url(#color)" />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(str) =>  {
                    const date = parseISO(str) || parseISO(new Date());
                    return format(date, "MMM ,d");
                  }}
                />

                <YAxis
                  datakey={TYPES[type]}
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  tickFormatter={(number) => `${number}`}
                />

                {<Tooltip content={<CustomTooltip type={type} />} />}

                <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
    </>
  )
}

function CustomTooltip({ active, payload, label,types,type }) {
    if (active) {
      return (
        <div className="rounded-md bg-gray-500 text-white p-4 shadow-md text-center text-sm">
          <h4 className='text-sm'>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>{payload[0].value} {type}</p>
        </div>
      );
    }
    return null;
  }
