import React, { useState } from "react";
import { useAuth } from "../../../Middlewares/AuthContext";
import axios from "axios";
import ErrorDisplayer from "../../../Components/ErrorDisplayer/ErrorDisplayer";

function AdminSignUp() {
  const [userID, setUserId] = useState("");
  const [errorUserID, setErrorUserId] = useState("");
  const [succ, setSucc] = useState("");
  const auth = useAuth();
  const handleSubmit = async () => {
    setErrorUserId("");
    setSucc("");
    if (userID === "") {
      setErrorUserId("User id is required");
      return;
    }

    await axios
      .patch(
        `${process.env.REACT_APP_MAIN_URL}/admin/Create-Admin/`,
        {
          User_id: userID,
        },
        {
          headers: {
            "x-access-token": auth?.user.token,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setSucc(res.data.message);
      })
      .catch((err) => {
        setErrorUserId(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center  h-full w-full md:w-1/3 md:mx-auto mx-4">
      <p className="text-base font-semibold">Upgrade to Admin</p>
      <div className="w-full mt-4">
        <label
          htmlFor="userId"
          className="block mb-2 text-xs font-semibold text-gray-900"
        >
          User id
        </label>
        <input
          type="userId"
          id="userId"
          className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
          placeholder="User id"
          required
          onChange={(e) => setUserId(e.currentTarget.value)}
        />
        <ErrorDisplayer error={errorUserID} />
      </div>
      <p className="text-green-600 text-base mb-1 self-start">{succ}</p>
      <button
        type="button"
        className="border bg-lime-200 border-gray-400 text-gray-900 rounded-lg focus:border-lime-600
              w-full p-2 font-semibold shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg
              focus:outline-none hover:text-white active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out"
        onClick={handleSubmit}
      >
        Upgrade
      </button>{" "}
    </div>
  );
}

export default AdminSignUp;
