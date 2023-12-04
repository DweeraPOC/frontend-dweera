import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import Widget from "../../components/widget/Widget";
import { useAuth } from "../../../Middlewares/AuthContext";
import BoxState from "../../components/BoxState/BoxState";
import { EyeIcon,RectangleStackIcon,UserIcon } from "@heroicons/react/24/solid";
import CategoryIcon from '@mui/icons-material/Category';
import LinChartCom from "../../components/Charts/LinChartCom";
import AreaChartCom from "../../components/Charts/AreaChartCom";
import PieChartCom from "../../components/Charts/PieChartCom";
import RadarChartCom from "../../components/Charts/RadarChartCom";
import Chart from "react-apexcharts";


export default function AdminHome() {
  const [userCount, setUserCount] = useState();
  const [approvedCount, setApprovedCount] = useState();
  const [offersCount, setOffersCount] = useState();
  const [loading,setLoading] = useState(false);
  const [statistics,setStatistics] = useState({});
  const [selected,setSelected] = useState(7);
  const currentDate = new Date(); // Get the current date
  const dateList = [];

// Helper function to format the date as "YYYY-MM-DD"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

for (let i = selected - 1; i >= 0; i--) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  const formattedDate = formatDate(date);
  dateList.push(formattedDate);
}
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    colors: ["#FF1654", "#247BA0","#AA7BA0"],
    xaxis: {
      categories: statistics?.statistics?.dates
    }
  });

  const [series, setSeries] = useState([
    {
      name: "Offer",
      data : [
        113, 114, 119, 117, 122, 120, 123, 121, 124, 125, 127, 126, 129, 128, 130, 131, 133, 134,
        132, 137, 135, 138, 136, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151,
        152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
        170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187,
        188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205,
        206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41,
        3, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41]
    },
    {
      name: "Booking",
      data : [
        
        170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41,
        3, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,48, 26, 9, 102, 105, 101, 100, 106, 103, 108, 107, 104, 110, 111, 109, 115, 118, 116, 112,
        113, 114, 119, 117, 122, 120, 123, 121, 124, 125, 127, 126, 129, 128, 130, 131, 133, 134,
        132, 137, 135, 138, 136, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151,
        152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41,
        206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14]
    }
    ,
    {
      name: "user",
      data : [
        206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41,
        3, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
        48, 26, 9, 102, 105, 101, 100, 106, 103, 108, 107, 104, 110, 111, 109, 115, 118, 116, 112,
        113, 114, 119, 117, 122, 120, 123, 121, 124, 125, 127, 126, 129, 128, 130, 131, 133, 134,
    
        224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 67, 93, 24, 88, 52, 35, 74, 16, 42, 71, 50, 85, 29, 63, 91, 10, 79, 53, 38, 11, 56, 83,
        19, 70, 31, 60, 46, 75, 22, 64, 97, 13, 82, 43, 69, 25, 89, 57, 40, 76, 21, 44, 94, 66,
        33, 58, 87, 32, 78, 15, 95, 61, 27, 73, 49, 37, 80, 55, 30, 96, 68, 12, 84, 59, 45, 28,
        81, 17, 51, 86, 23, 72, 39, 98, 20, 77, 14, 92, 47, 65, 34, 99, 62, 36, 90, 18, 54, 41]
    }
  ]);
  const auth = useAuth();
  const initData = () => {
    setLoading(true)
    axios
      .get(process.env.REACT_APP_MAIN_URL + "/offers/", {
        headers: {
          "x-access-token": auth?.user.token,
        },
      })
      .then((response) => {
        setApprovedCount(response.data.alloffers.length);
      })
      .catch((error) => {
        //console.log(error);
      });

    axios
      .get(process.env.REACT_APP_MAIN_URL + "/offers/", {
        headers: {
          "x-access-token": auth?.user.token,
        },
      })
      .then((response) => {
        setOffersCount(response.data.alloffers.length);
      })
      .catch((error) => {
        //console.log(error);
      });

      const start = new Date();
        //const currentDate = new Date();
        start.setDate(start.getDate() - selected + 2);
        start.setMonth(start.getMonth() + 0)
        start.setHours(0, 0, 0, 0);
        console.log(start)

        const end = new Date();
        //const sevenDaysAgo = new Date(currentDate);
        end.setDate(end.getDate() + 1);
        end.setMonth(end.getMonth() + 0)
        end.setHours(0, 0, 0, 0);
        console.log(end)
      axios
      .post(process.env.REACT_APP_MAIN_URL + "/admin/get-statistics",
        {
          "start" : new Date(start),
          "end" : new Date(end)
        },
        {
          headers: {
            "x-access-token": auth?.user.token,
          },
          
        })
      .then((response) => {
        if(response.status===200){
          console.log(response.data)
          //setStatistics(response.data);
          const data = {
            "genders" : [
              response.data?.genders?.malesCount,
              response.data?.genders?.femalesCount,
              response.data?.genders?.nullCount
            ],
            "vehicles" : [
              {name : "Bicycle" , value : response.data?.vehicle_type?.bicycleCount},
              {name : "Bicycle Electric" , value : response.data?.vehicle_type?.bicycleElectricCount},
              {name : "Scooter" , value : response.data?.vehicle_type?.scooterCount},
              {name : "Scooter Electric" , value : response.data?.vehicle_type?.scooterElectricCount},
            ],
            "statistics" : response.data?.statistics /*response.data?.statistics.map((v) => {return {
              date : new Date(v?.data).toISOString().substr(0, 10),
              numberOfOffers : v?.numberOfOffers, 
              numberOfUsers : v?.numberOfUsers,
              numberOfBookigs : v?.numberOfBookigs
            }})*/,
            "counting" : {...response?.data?.counting}
          }
          setStatistics(data);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      setLoading(false)
  };

  useEffect(() => {
    initData();
  }, [selected]);

  const data = [
    {
      name : "Offer",
      icon : <CategoryIcon style={{ width : "2rem",height : "2rem"}} className="block w-8 h-8 text-lime-500" />,
      status : "down",
      context : statistics?.counting?.offers,
      //per : "8.9%"
    },
    {
      name : "Booking",
      icon : <RectangleStackIcon className="block w-8 h-8 text-lime-500" />,
      status : "down",
      context : statistics?.counting?.bookings,
      //per : "8.9%"
    },
    {
      name : "User",
      icon : <UserIcon className="block w-8 h-8 text-lime-500" />,
      status : "up",
      context : statistics?.counting?.users,
      //per : "8.9%"
    },
    /*{
      name : "View",
      icon : <EyeIcon className="block w-8 h-8 text-lime-500" />,
      status : "down",
      context : "3789",
      per : "8.9%"
    }*/
  ]

  const onChangeDate = (e) => {
    setSelected(parseInt(e.currentTarget.value))
    initData(parseInt(e.currentTarget.value))
  }
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex flex-row gap-3 flex-wrap lg:flex-nowrap">
        {
          data && data?.map((_v,i) => 
            <BoxState key={i} info={_v} />
          )
        }
      </div>
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-full h-fit border p-4 flex flex-col">
          <div className="w-full pt-4 pr-4 pb-8 relative">
            <select onChange={onChangeDate} value={selected} id="type" className="absolute z-40 top-0 w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block right-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value={7}>Last 7 days</option>
              <option value={28}>Last 28 days</option>
              <option value={90}>Last 90 days</option>
              <option selected value={365}>Last 365 days</option>
            </select>
          </div>
{selected}
          {/* {statistics && <AreaChartCom statistics={statistics?.statistics || []} type={selected} />} */}
          <div className="flex flex-col justify-center items-center md:flex-row gap-2 w-full h-full">
              {
                !loading ?
                <Chart
                  options={
                  {
                    chart: {
                      id: "basic-bar"
                    },
                    colors: ["#FF1654", "#247BA0","#AA7BA0"],
                    xaxis: {
                      categories: statistics?.statistics?.dates
                    }
                  }
                }
                series={[
                  {
                    "name" : "Offer",
                    "data" : statistics?.statistics?.offers
                  },
                  {
                    "name" : "Users",
                    "data" : statistics?.statistics?.users
                  },
                  {
                    "name" : "Bookings",
                    "data" : statistics?.statistics?.bookings
                  }
                ]}
                type="line"
                width="1200"
                height="300"
              />
              : null
              }
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row gap-2 w-full h-full">
          <div className="w-2/5 h-full ">
            {/*statistics && <RadarChartCom vehicles={statistics?.vehicles} />*/}
            {
                !loading && statistics?.genders ?
                <Chart
                  options={
                  {
                    chart: {
                      type : "radar"
                    },
                  }
                }
                series={[
                  statistics?.genders?.malesCount || 12,
                  statistics?.genders?.femalesCount || 19,
                  statistics?.genders?.nullCount || 29
                ]}
                type="radar"
                width={450}
              />
              : null
              }
          </div>
          <div className="w-3/5 h-full ">
            {!loading && statistics && <PieChartCom genders={statistics?.genders} />}
            
          </div>
        </div>
      </div>
    </div>
  );
}
