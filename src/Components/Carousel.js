import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import bike1 from "../assets/images/bike1.jpg"
import bike2 from "../assets/images/bike2.jpg"
import bike3 from "../assets/images/bike3.jpg"
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import styled from "styled-components";


export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Componentdiv >
        <Slider {...settings} >
             <Container>
                <Box
                component="img"
                sx={{
                    height: 250,
                    width: 400,
                    minWidth: { lg : 150 },
                    minHeight: { lg: 150 },
                    maxWidth: { lg : 300 },
                    maxHeight: { lg: 600 },
                  }}
                   src={bike1}
                />
             </Container>
              <Container>
                <Box
                component="img"
                sx={{
                  height: 250,
                  width: 400,
                    minWidth: { lg : 150 },
                    minHeight: { lg: 150 },
                    maxWidth: { lg : 300 },
                    maxHeight: { lg: 600 },
                  }}
                   src={bike2}
                />
             </Container>
              <Container>
                <Box
                component="img"
                sx={{
                  height: 250,
                  width: 400,
                    minWidth: { lg : 150 },
                    minHeight: { lg: 150 },
                    maxWidth: { lg : 300 },
                    maxHeight: { lg: 600 },
                  }}
                   src={bike3}
                />
                </Container>
        </Slider>
      </Componentdiv>
    );
  }
}

const Componentdiv= styled.div`
position:relative;
top: 0.1rem;
.slick-prev{
  right : 0rem;
  left : 2rem;
  z-index: 10;
}
.slick-next{
  left: 18rem;
}
.slick-dots{
  text-align: left;
  left : 14rem;
  bottom : 1rem;
}
`;
