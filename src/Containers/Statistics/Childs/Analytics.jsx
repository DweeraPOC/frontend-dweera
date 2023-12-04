import React from 'react'
import { Helmet } from 'react-helmet'
import LineChartCom from '../../../Components/Charts/LineChartCom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useAuth } from '../../../Middlewares/AuthContext';
import axios from 'axios';

export default function Analytics() {
    const statisticsList = [
        {
            name : "Offers",
            count : 20
        },
        {
            name : "Bookings",
            count : 20
        },
        {
            name : "Bookings requests",
            count : 20
        },
        {
            name : "Reviews",
            count : 20
        }
    ];
    const auth = useAuth();
    const [statistics,setStatistics] = useState({});
    const [loading,setLoading] = useState(false);
    const GetUserStatistics = useCallback(async () => {
        setLoading(true)
        await axios({
            url : `${process.env.REACT_APP_MAIN_URL}/users/user-statistics`,
            method : "GET",
            headers : {
                "x-access-token" : auth?.user.token
            }
        })
        .then((response) => {
            //console.log(response)
            if(response.status===200) return setStatistics(response.data.result);
        })
        .catch((err) => {
            // 
        })
        .finally(() => setLoading(false))
    })
    useEffect(() => {
        GetUserStatistics()
    },[])
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{`Dweera | Overview`}</title>
            <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
            <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
        </Helmet>
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
            <div className='grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2  lg:grid-cols-4 lg:grid-rows-1 w-full border-2 border-gray-100 rounded-md'>
                {
                    statistics?.counting && statistics?.counting?.map((_,i,elements) =>
                        <div key={_?.name} className={`w-full h-full flex-grow flex flex-col text-center gap-3 px-15 py-10 justify-center items-center border-gray-100 border-r border-b`}>
                            <p className={`font-bold text-sm break-words`}>
                                {_?.name}
                            </p>
                            <p className={`font-normal text-2xl text-gray-400`}>
                                {_?.count}
                            </p>
                        </div>
                    )
                }
            </div>
            <div className='flex w-full py-4 px-4 border border-gray-100 rounded-md'>
                {
                    loading 
                    ? null
                    : <LineChartCom info={statistics?.data} />
                }
            </div>
        </div>
    </>
  )
}
