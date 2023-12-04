import axios from 'axios';
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';

export default function Test() {
  const HandlePost = async () => {
    const values = {
      "amount": "5.69",
      "shopUrl": "http://localhost:3000/p2",
      "BillToName": "BillToName",
      "tel": "0688889977",
      "BillToStreet1": "BillToStreet1",
      "BillToCity": "BillToCity",
      "id1": "234",
      "qty1": "1",
      "total1": "5.69",
      "desc1": "desc1"
    };

    await axios({
      method : "POST",
      url : process.env.REACT_APP_MAIN_URL + "/offers/payment-request",
      data : values
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div>
      <button type='button' onClick={HandlePost}>Submit</button>
    </div>
  )
}
