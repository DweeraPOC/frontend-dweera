import React from "react";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { TextField, Box } from "@mui/material";
import styled from "styled-components";

function TestLogin({onLoged}) {
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") === "tester" &&
      data.get("password") === "tester")
    {
      localStorage.setItem("isTestLogin", "true");
      onLoged();
    } 
    else {
      alert("Data entered Incorrect");
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ textAlign: "center", m: 10 }}
    >
      <DirectionsBikeIcon sx={{ color: "#55B814", m: 3, fontSize: 50 }} />
      <div style={{ margin: "3px" }}> TEST LOGIN IN </div>
      <div> Test Dweera and explore our services</div>
      <div style={{ margin: "3px" }}>
        <TextField
          variant="standard"
          sx={{ width: 200, m: 1 }}
          label="UserName "
          name="username"
          required
        />{" "}
      </div>
      <div>
        <TextField
          variant="standard"
          sx={{ width: 200, m: 1 }}
          label="Password "
          name="password"
          type="password"
          required
        />{" "}
      </div>
      <Finishedb type="submit"> GET STARTED </Finishedb>
    </Box>
  );
}

const Finishedb = styled.button`
  background-color: #65d01e;
  color: white;
  border-radius: 20px;
  padding: 8px 10px;
  border: 1px solid #65d01e;
  margin: 10px;
  margin-left: auto;
`;

export default TestLogin;
