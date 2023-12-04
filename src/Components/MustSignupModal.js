import React, { useState } from "react";
import "./style/Modal.css";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Modal() {
    const Parag1 = styled.p`
    position: relative;
    left : 35%;
    width :20%;
    text-align:center;
    background: #65D01E;
    border-radius: 50px;
    font-size: 16px;
    color: #FFF;
    padding: 12px;
    border : 1px solid #65D01E;
    margin: 1vh;
    :hover { 
      box-shadow : 0px 1px 1px #96999D;}
  `;
  const Parag2 = styled.p`
  position: relative;
    left : 20%;
  width :50%;
  text-align:center;
  border-radius: 50px;
  font-size: 16px;
  color: grey;
  padding: 12px;
  border : 1px solid #65D01E;
  margin: 1vh;
  :hover { 
    box-shadow : 0px 1px 1px #65D01E;}
`;
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div>
      <button onClick={toggleModal} className="btn-modal">
        ADD MY OWN RENT
      </button>

      {modal && (
        <div className="mymodal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
          <DirectionsBikeIcon sx={{color:'#55B814',marginTop : 4,marginBottom : '1vh', marginLeft: 25, fontSize:50}}/>
          <div className="main">Make use of your unused scooter or bike and put it up for rent !</div>
          <div className="second">Join Dweera and explore our services. The vehicle you're looking to book may be 5mins away from you!</div>
          <Link to ="/Signup" style={{textDecoration:'none'}} onClick={()=>setModal(!modal)}><Parag1>SIGN UP</Parag1></Link>
          <Link to ="/login" style={{textDecoration:'none'}} onClick={()=>setModal(!modal)}><Parag2>LOGIN TO YOUR ACCOUNT</Parag2></Link>
    
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}