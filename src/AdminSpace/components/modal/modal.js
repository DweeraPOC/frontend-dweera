import React, { useState } from "react";
import "./Modal.css";
import styled from "styled-components";
import Updateoffer2 from "../../../Api/updateofferapproval2";
import { TextField } from '@mui/material';
import { Box } from '@mui/material';

export default function Modal(props) {
  const[formerror, Setformerror]= useState('');  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('reason')=='')
    {
      Setformerror("Enter a reason");
    }
    else {
      Setformerror("");
      let reason=data.get('reason');
      let lid = props.lid;
      let param = {lid, reason}
      Updateoffer2(param);
    }
  }
    ;
 
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
      <button onClick={toggleModal} className="deleteButton2"
>
        Not Approved
      </button>

      {modal && (
        <div className="mymodal2">
          <div className="overlay2" onClick={toggleModal}></div>
          <div className="modal-content2">
          <div className="main2">
          <GeneralSignupdiv >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt:5}}>
            <Formdiv1 >
              <Inputs>
              <TextField required id="standard-basic" 
              name="reason"
              label="Reason this offer is refused" 
              variant="standard" 
              style ={{width: '50vh',margin:'1%'}}  />
              
              <Redp>{formerror}</Redp>

             </Inputs>
              <Signupb type='submit'>Submit</Signupb>
                        
            </Formdiv1 >
            </Box>
            
        </GeneralSignupdiv>
          </div>    
            <button className="close-modal2" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const GeneralSignupdiv= styled.div`
display:flex;
height:100%;
text-align : center;
`;
const Inputs = styled.div`

`;
const Formdiv1= styled.div`
height:400px;
.title{
    font-size:30px;
}
`;

const Signupb =styled.button`
background: #65D01E;
border-radius: 20px;
font-weight: bold;
font-size: 15px;
color: #FFF;
padding: 12px 14px;
border : 1px solid #65D01E;
margin: 3%;

:hover { 
  border : 1px solid #96999D;
  box-shadow : 0px 1px 1px #96999D;}
  `;
const Btndiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3%;
`;

const Redp = styled.p`
color:red;
font-size:15px;
margin:0;
`;