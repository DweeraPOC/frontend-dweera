import React from "react";
import  { useEffect } from 'react';
import { useAuth } from "../../Middlewares/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleButton({ type }) {
  
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('message', event => {
      if (event.data.token) {

        auth.Login({
          token : event.data.token,
          role : "user",
        });

        navigate(0,{replace : true});
      }
    });
  }, []);


  const GoogleHandler = () => {
    window.open(process.env.REACT_APP_MAIN_URL + "/google/auth",
      "_blank",
      "width=800,height=600"
    );
  };

  // const FacebookHandler = () => {
  //   window.open(process.env.REACT_APP_MAIN_URL + "/facebook/auth",
  //     "_blank",
  //     "width=800,height=600"
  //   );
  // };

  return (
    <>
    <div id="signin" className="w-full text-center mt-4 ">
      <button
        className="border border-gray-600 rounded bg-gray-600 hover:bg-gray-700 py-1 shadow-sm
                  flex items-center justify-center gap-2 cursor-pointer w-full"
        onClick={GoogleHandler}
      >
        <img
          className="h-7 w-7 self-start"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
        <p className="text-white font-bold">{type} with google</p>
      </button>
    </div>

    {/* <div id="signin" className="w-full text-center mt-4 ">
      <div
        className="border border-gray-600 rounded bg-gray-600 hover:bg-gray-700 py-1 shadow-sm
                  flex items-center justify-center gap-2"
        onClick={FacebookHandler}
      >
        <img
          className="h-7 w-7"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
        />
        <p className="text-white font-bold">Sign in with facebook</p>
      </div>
    </div> */}

    </>
  );
}
