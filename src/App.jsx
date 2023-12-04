import React from "react";

import "./App.css";
import BrowserRoutes from "./Middlewares/BrowserRoutes";
import { AuthProvider } from './Middlewares/AuthContext';
import { CloudinaryContext } from 'cloudinary-react';

function App() {
  const cloudinaryConfig = {
    cloud_name: 'dpqenrxtj',
    api_key: '352543645111333',
    api_secret: 'nDQQNOIWsFVcXYF0Amj8jgnWggo'
  };

  return (
    <AuthProvider>
      <CloudinaryContext {...cloudinaryConfig}>
        <BrowserRoutes />
      </CloudinaryContext>
    </AuthProvider>
  );
}

export default App;
