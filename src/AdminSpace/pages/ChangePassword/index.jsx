import React, { useState, forwardRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Helmet } from "react-helmet";
import { useAuth } from "../../../Middlewares/AuthContext";

export default function ChangePasswordAdmin() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [stateToast, setStateToast] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const [typeToast, setTypeToast] = useState("success");
  const [passwordList, setPasswordList] = useState({
    current: {
      value: null,
      visible: false,
    },
    new_password: {
      value: null,
      visible: false,
    },
    repeat_password: {
      value: null,
      visible: false,
    },
  });

  const HandleVisible = (e) => {
    const name = e.currentTarget.dataset["name"];
    switch (name) {
      case "password":
        setPasswordList({
          ...passwordList,
          current: {
            value: passwordList.current.value,
            visible: !passwordList.current.visible,
          },
        });
        return;
      case "new_password":
        setPasswordList({
          ...passwordList,
          new_password: {
            value: passwordList.new_password.value,
            visible: !passwordList.new_password.visible,
          },
        });
        return;
      case "repeat_password":
        setPasswordList({
          ...passwordList,
          repeat_password: {
            value: passwordList.repeat_password.value,
            visible: !passwordList.repeat_password.visible,
          },
        });
        return;
    }
  };
  const HandleChange = (e) => {
    const name = e.currentTarget.dataset["name"];
    switch (name) {
      case "password":
        setPasswordList({
          ...passwordList,
          current: {
            value: e.currentTarget.value,
            visible: passwordList.current.visible,
          },
        });
        return;
      case "new_password":
        setPasswordList({
          ...passwordList,
          new_password: {
            value: e.currentTarget.value,
            visible: passwordList.new_password.visible,
          },
        });
        return;
      case "repeat_password":
        setPasswordList({
          ...passwordList,
          repeat_password: {
            value: e.currentTarget.value,
            visible: passwordList.repeat_password.visible,
          },
        });
        return;
    }
  };

  const HandleSubmit = async () => {
    if (passwordList.new_password.value === passwordList.repeat_password.value) {
      try {
        setLoading(true);
        await axios
          .patch(
            `${process.env.REACT_APP_MAIN_URL}/users/change-password/`,
            {
              CurrentPassword: passwordList.current.value,
              NewPassword: passwordList.new_password.value,
            },
            {
              headers: {
                "x-access-token": auth?.user.token,
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then(() => {
            setTypeToast("success");
            HandleOpenToast();
          })
          .catch(() => {
            setTypeToast("error");
            HandleOpenToast();
          });
        setLoading(false);
      } catch (error) {
        setTypeToast("error");
        HandleOpenToast();
      }
    } else {
      setTypeToast("warning");
      HandleOpenToast();
    }
  };

  const { vertical, horizontal, open } = stateToast;
  const HandleOpenToast = () => {
    setStateToast({
      open: true,
      vertical: stateToast.vertical,
      horizontal: stateToast.horizontal,
    });
  };

  const HandleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStateToast({ ...stateToast, open: false });
  };
  const Toast = (props) => {
    const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const AlertType = (type) => {
      switch (type) {
        case "success":
          return (
            <Alert
              onClose={props.HandleCloseToast}
              severity="success"
              sx={{ width: "100%" }}
            >
              Password is changed with success
            </Alert>
          );
        case "error":
          return (
            <Alert
              onClose={props.HandleCloseToast}
              severity="error"
              sx={{ width: "100%" }}
            >
              Error in process to change password
            </Alert>
          );
        case "warning":
          return (
            <Alert
              onClose={props.HandleCloseToast}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Repeat password not valid
            </Alert>
          );
      }
    };
    return (
      <>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical, horizontal }}
            onClose={props.HandleCloseToast}
          >
            {AlertType(typeToast)}
          </Snackbar>
        </Stack>
      </>
    );
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Change password`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      <div className="">
        <div className="container mx-auto h-full overflow-hidden flex flex-col max-w-3xl justify-center gap-4 px-4 py-10">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Current Password
            </label>
            <div className="relative w-full">
              <input
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                autoComplete="off"
                type={passwordList.current.visible ? "text" : "password"}
                data-name="password"
                dataset="password"
                onChange={HandleChange}
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                data-name="password"
                dataset="password"
                onClick={HandleVisible}
              >
                {passwordList.current.visible ? (
                  <VisibilityIcon style={{ color: "#65D01E" }} />
                ) : (
                  <VisibilityOffIcon style={{ color: "#65D01E" }} />
                )}
              </span>
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              New Password
            </label>
            <div className="relative w-full">
              <input
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                autoComplete="off"
                type={passwordList.new_password.visible ? "text" : "password"}
                data-name="new_password"
                dataset="new_password"
                onChange={HandleChange}
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                data-name="new_password"
                dataset="new_password"
                onClick={HandleVisible}
              >
                {passwordList.new_password.visible ? (
                  <VisibilityIcon style={{ color: "#65D01E" }} />
                ) : (
                  <VisibilityOffIcon style={{ color: "#65D01E" }} />
                )}
              </span>
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Repeat Password
            </label>
            <div className="relative w-full">
              <input
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                autoComplete="off"
                type={
                  passwordList.repeat_password.visible ? "text" : "password"
                }
                data-name="repeat_password"
                dataset="repeat_password"
                onChange={HandleChange}
                required
              />
              <span
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                data-name="repeat_password"
                dataset="repeat_password"
                onClick={HandleVisible}
              >
                {passwordList.repeat_password.visible ? (
                  <VisibilityIcon style={{ color: "#65D01E" }} />
                ) : (
                  <VisibilityOffIcon style={{ color: "#65D01E" }} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={HandleSubmit}
              className=" text-white text-lg bg-[#65D01E] hover:bg-[#59b81a] font-medium rounded-lg px-3.5 py-2 focus:outline-none flex flex-row justify-end items-center"
            >
              {loading ? (
                <ClipLoader color="#FFFF" loading={true} size={20} />
              ) : (
                <span>Change password</span>
              )}
            </button>
          </div>
        </div>
        <Toast
          HandleOpenToast={HandleOpenToast}
          HandleCloseToast={HandleCloseToast}
        />
      </div>
    </>
  );
}
