import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";
import "./styles.css";

export default function CarouselV3({ Images }) {
    const Spliter = (st) => {
        return st?.split("/");
      }
  return (
    <>
        <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
            clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper w-full"
        >
            {
                Images?.map((pic,index) => 
                    <SwiperSlide key={index} className="bg-gray-100 w-full h-full">
                        <img className='object-cover object-center' 
                            src={
                                Spliter(pic?.image_url)?.length==1
                                ? `${process.env.REACT_APP_MAIN_URL}/images/offers/${pic?.image_url}`
                                : pic?.image_url
                            } 
                            loading='lazy'
                        />
                    </SwiperSlide>
                )
            }
        </Swiper>
    </>
  )
}
