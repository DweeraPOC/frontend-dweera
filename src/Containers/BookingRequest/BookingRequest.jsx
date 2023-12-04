import React, { useEffect, useState } from "react";
import Request from "./Request";
import axios from "axios";
import ProfileModal from "../UserProfile/ProfileModal";
import { useAuth } from "../../Middlewares/AuthContext";
import Footer from "../../Components/footer/Footer";
import EmptyState from "../../Components/EmptyState/EmptyState";
import RequestBookig from "../../Components/RequestBooking/RequestBooking";
import ConfirmModal from "../../Components/RequestBooking/ConfirmModal";
import { Helmet } from "react-helmet";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useTranslation } from "react-i18next";

export default function BookingRequest() {
  const [request, setRequest] = useState([]);
  const [loading,setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selected,setSelected] = useState(null);
  const [action,setAction] = useState({
    name : null,
    isOpen : false,
    id : null,
    loading : false
  });

  function openModal() {
    setIsOpen(true)
  }

  const auth = useAuth();
  const GetBookingRequest = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_MAIN_URL}/bookings/get-bookings-request/`, {
        headers: {
          "x-access-token": auth?.user.token,
        },
      })
      .then((response) => {
        if(response.status===200) setRequest(response?.data?.bookings);
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const SendRequest = async (type,id) => {
          setAction({
            ...action,
            loading : true
          });
          await axios
            .patch(
                `${process.env.REACT_APP_MAIN_URL}/bookings/${type}`,
                {
                    BookingId: id
                },
                {
                    headers: {
                        "x-access-token": auth?.user.token,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                  setAction({
                    ...action,
                    loading : false,
                    isOpen : false,
                    id : null,
                    name : null
                  });
                  GetBookingRequest();
                };
            })
            .catch((err) => {
                //console.log(err);
            })
    };

  const HandleAction = (type,id) => {
    setAction({
      ...action,
      isOpen : true,
      name : type,
      id : id
    })
  }

  const HandleLoading = () => {
    setAction({
      ...action,
      loading : true
    })
  }

  const HandleClose = () => {
    setAction({
      ...action,
      id : null,
      name : null,
      isOpen : false,
      loading : false
    });
  }
  const { t } = useTranslation();
  useEffect(() => {
    GetBookingRequest();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Booking requests`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      {
        // add modal user
        <>
          <ProfileModal />
          <ConfirmModal
            isOpen={action?.isOpen}
            HandleClose={HandleClose}
            action={action}
            confirm={SendRequest}
          />
        </>
      }
      <div className="flex flex-col justify-between items-between pb-24 w-full">
          <div className="flex flex-row flex-wrap gap-4 mx-auto md:px-10 px-4 my-5 w-full justify-center items-center">
          {
            loading
            ? <div className="w-full h-screen justify-center items-center flex"><LoadingPage /></div>
            : (
              <>
                {request?.length > 0 ? (
                  request &&
                  request?.map((req, index) => (
                    <RequestBookig
                      key={index}
                      RqBooking={true}
                      booking={req} 
                      user={req?.users_bookings_booker_user_idTousers}
                      openModal={openModal}
                      t={t}
                      HandleAction={HandleAction}
                    />
                  ))
                ) : (
                  <EmptyState
                    msg={"BookingRequest"}
                    path={"/manage-my-offers"}
                    goTo={"Check your offers"}
                  />
                )}
              </>
            )
          }
          </div>
          <div className="w-full fixed bottom-0 z-30">
            <Footer />
          </div>
      </div>
    </>
  );
}
