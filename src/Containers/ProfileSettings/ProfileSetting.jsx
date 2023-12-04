import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useTranslation } from "react-i18next";
import default_picture from "../../assets/images/default_profile_picture.png"
import { useAuth } from "../../Middlewares/AuthContext";
import Footer from "../../Components/footer/Footer";
import { Helmet } from "react-helmet";

function ProfileSetting() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [newProfile, setNewProfile] = useState({
    FirstName: null,
    LastName: null,
    Gender: null,
    Adresse: null,
    Telephone: null,
  });
  const [stateToast, setStateToast] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const auth = useAuth();

  const InitialData = async () => {
    await axios
      .get(`${process.env.REACT_APP_MAIN_URL}/users/user-info`, {
        headers: {
          "x-access-token": auth?.user.token,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
          setStatus(response.data.status);
        }
      })
      .catch((err) => {
        //alert("Oops! Something went wrong. please try again.")
      });
  };

  const HandleSubmit = async () => {
    setLoading(true);

    try {
      let FullData = new FormData();
      if (picture)
      {
        FullData.append("Img_profile", picture.data);
      }
      newProfile?.FirstName && FullData.append(
        "FirstName",
        newProfile?.FirstName 
      );
      newProfile?.LastName && FullData.append(
        "LastName",
        newProfile?.LastName
      );
      newProfile?.Gender && FullData.append(
        "Gender",
        newProfile?.Gender
      );
      newProfile?.Telephone && FullData.append(
        "Telephone",
        newProfile?.Telephone
      );
      newProfile?.Adresse && FullData.append(
        "Address",
        newProfile?.Adresse 
      );

      await axios
        .patch(
          `${process.env.REACT_APP_MAIN_URL}/users/user-info`,FullData,
          {
            headers: {
              "x-access-token": auth?.user.token,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if(res.status===200){
            setNewProfile({
              FirstName: null,
              LastName: null,
              Gender: null,
              Adresse: null,
              Telephone: null,
            });
            HandleOpenToast();
          }
        })
        .catch(() => {
          HandleOpenToast();
        });
    } catch (error) {
      HandleOpenToast();
    }
    InitialData();
  };

  const HandleFileChange = (e) => {
    var file = e.target.files[0];
    switch (e.target.name) {
      case "picture":
        setPicture({
          preview: URL.createObjectURL(e.target.files[0]),
          data: file,
        });
    }
  };

  useEffect(() => {
    InitialData();
  }, []);

  const HandleOpenToast = () => {
    setLoading(false);

    setStateToast({
      open: true,
      vertical: stateToast.vertical,
      horizontal: stateToast.horizontal,
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Profile settings`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      <form autoComplete="off">
        <div className="my-5 md:mt-10 pb-24">
          <div className="container mx-auto h-full overflow-hidden flex flex-col lg:flex-row max-w-7xl justify-center gap-4 px-4">
            <div className="w-full lg:w-2/5 min-h-full border-2 rounded-md ">
              <div className="w-full h-full bg-white rounded-lg p-6">
                <div className="flex flex-col items-center pb-10">
                  <div className="max-w-xl h-full overflow-hidden flex justify-center items-center border-4 rounded-full border-[#65D01E]">
                    <div className="relative w-40 h-40 rounded-full group">
                      <img
                        className=" w-40 h-40 mb-3 rounded-full shadow-md z-20"
                        src={
                          !picture
                            ? (profile?.profile_photo) ? process.env.REACT_APP_MAIN_URL +
                              "/images/users/" +
                              profile?.profile_photo
                              : default_picture
                            : picture?.preview
                        }
                        alt=""
                      />
                      <label className="absolute -z-50 top-0 left-0 flex overflow-hidden justify-center flex-row items-center rounded-full w-40 h-40 transition  appearance-none cursor-pointer bg-[#ffffff]  bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 hover:border-gray-400 focus:outline-none group-hover:z-50">
                        <span className="flex flex-col justify-center items-center">
                          <PhotoCameraIcon
                            style={{ color: "#65D01E", fontSize: "60" }}
                          />
                        </span>
                        <input
                          src={default_picture}
                          name="picture"
                          className="w-full h-full hidden"
                          accept="image/*"
                          type="file"
                          onChange={HandleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    {profile?.first_name} {profile?.last_name}
                  </h5>
                  <span className="text-sm text-gray-500 ">
                    {profile?.email}
                  </span>
                  <div className="mt-4 w-full text-xl">
                    <ul className="w-full text-[#65D01E] no-underline">
                      <li className="w-full ">
                        <a
                          href="#"
                          className="cursor-default no-underline hover:no-underline text-[#65D01E]"
                        >
                          <div className="w-full flex flex-row justify-between items-center p-3 text-[#65D01E] no-underline">
                            <span>Published Offers</span>
                            <span>{status?.offer_published || 0}</span>
                          </div>
                        </a>
                      </li>
                      <li className="w-full text-[#65D01E] no-underline">
                        <a
                          href="#"
                          className="cursor-default no-underline hover:no-underline text-[#65D01E]"
                        >
                          <div className="w-full flex flex-row justify-between items-center p-3 text-[#65D01E] no-underline">
                            <span>Offers Approved</span>
                            <span>{status?.offer_approval || 0}</span>
                          </div>
                        </a>
                      </li>
                      <li className="w-full text-[#65D01E] no-underline">
                        <a
                          href="#"
                          className="cursor-default no-underline hover:no-underline text-[#65D01E]"
                        >
                          <div className="w-full flex flex-row justify-between items-center p-3 text-[#65D01E] no-underline under">
                            <span>Booking Approved</span>
                            <span>{status?.booking_approval || 0}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full col-start-auto col-span-4 border-2 rounded-md">
              <div className="lg:grid md:grid flex flex-col overflow-hidden gap-4 p-4 lg:grid-rows-5 lg:grid-cols-2 md:grid-cols-2 md:grid-rows-5">
                <div className="min-w-full min-h-full">
                  <div className="">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      {t("First name")}
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={profile?.first_name}
                      onChange={(e) =>
                        setNewProfile({
                          ...newProfile,
                          FirstName: e.currentTarget.value,
                        })
                      }
                      value={newProfile.FirstName}
                    />
                  </div>
                </div>
                <div className="min-w-full min-h-full">
                  <div className="">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      {t("Last name")}
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={profile?.last_name}
                      onChange={(e) =>
                        setNewProfile({
                          ...newProfile,
                          LastName: e.currentTarget.value,
                        })
                      }
                      value={newProfile.LastName}
                    />
                  </div>
                </div>
                <div className="min-w-full  min-h-full">
                  <div className="">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      {t("Telephone")}
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={profile?.telephone}
                      onChange={(e) =>
                        setNewProfile({
                          ...newProfile,
                          Telephone: e.currentTarget.value,
                        })
                      }
                      value={newProfile.Telephone ? newProfile.Telephone : ""}
                    />
                  </div>
                </div>
                <div className="min-w-full min-h-full">
                  <div className="">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      {t("Gender")}
                    </label>
                    <select
                      id="cender"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) =>
                        setNewProfile({
                          ...newProfile,
                          Gender: e.currentTarget.value,
                        })
                      }
                      defaultChecked
                    >
                      <option selected disabled>
                        {newProfile.Gender
                          ? t(newProfile.Gender)
                          : profile?.gender
                          ? t(profile.gender)
                          : t("Choose your gender")}
                      </option>
                      <option value="male">{t("Male")}</option>
                      <option value="female">{t("Female")}</option>
                    </select>
                  </div>
                </div>
                <div className="min-w-full min-h-full col-span-2">
                  <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      {t("Location address")}
                    </label>
                    <input
                      name="location"
                      type="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={
                        profile?.address
                          ? profile?.address
                          : t("Entre address manually")
                      }
                      onChange={(e) =>
                        setNewProfile({
                          ...newProfile,
                          Adresse: e.currentTarget.value,
                        })
                      }
                      value={newProfile.Adresse ? newProfile.Adresse : ""}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 py-2.5 overflow-hidden flex justify-center items-center">
                <button
                  type="button"
                  onClick={HandleSubmit}
                  className=" text-white text-lg bg-[#65D01E] hover:bg-[#59b81a] font-medium rounded-lg px-3.5 py-2 focus:outline-none flex flex-row justify-center items-center"
                >
                  {loading ? (
                    <ClipLoader color="#FFFF" loading={true} size={20} />
                  ) : (
                    <span>{t("Update")}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="w-full fixed bottom-0 z-50">
        <Footer />
      </div>
    </>
  );
}

export default ProfileSetting;
