import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Middlewares/AuthContext";
import ProfileModal from "../UserProfile/ProfileModal";
import Footer from "../../Components/footer/Footer";
import EmptyState from "../../Components/EmptyState/EmptyState";
import RequestBookig from "../../Components/RequestBooking/RequestBooking";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../Components/RequestBooking/ConfirmModal";
import Feedback from "../../Components/Feedback/Feedback";
import { Helmet } from "react-helmet";
import LoadingPage from "../LoadingPage/LoadingPage";

const UserPage = () => {
  const [tableData, setTableData] = useState([]);
  const [loading,setLoading] = useState(true);
  const auth = useAuth();

  const getMyBookings = async () => {
    setLoading(true)
    await axios
      .get(process.env.REACT_APP_MAIN_URL + "/bookings/get-bookings-by-user", {
        headers: {
          "x-access-token": auth?.user.token,
        },
      })
      .then((response) => {
        setTableData(response.data.bookings);
      })
      .catch((err) => {
        //console.log(err)
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const HandleConfirm = async (type, id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_MAIN_URL}/bookings/cancel-booking`,
        headers: {
          "x-access-token": auth?.user.token,
        },
        data: {
          BookingId: id,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            getMyBookings();
            setAction({
              ...action,
              id: null,
              name: null,
              isOpen: false,
              loading: false
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    } catch (err) {
      //console.log(err);
    }
  };

  const { t } = useTranslation();

  const [action, setAction] = useState({
    name: null,
    isOpen: false,
    id: null,
    loading: false
  });

  const HandleAction = (type, id) => {
    setAction({
      ...action,
      isOpen: true,
      name: type,
      id: id
    })
  }

  const HandleLoading = () => {
    setAction({
      ...action,
      loading: true
    })
  }

  const HandleClose = () => {
    setAction({
      ...action,
      id: null,
      name: null,
      isOpen: false,
      loading: false
    });
  }
  useEffect(() => {
    getMyBookings();
  }, []);

  const [feedBack, setFeedBack] = useState({
    isOpen: false,
    id: null,
    value: {
      comment: null,
      rating: 0
    },
    err: null
  })

  const HandleFeedBack = (v, id) => {
    setFeedBack({
      ...feedBack,
      id: id,
      value: {
        comment: null,
        rating: 0
      },
      isOpen: v
    })
  }

  const HandleRating = (v, type) => {
    switch (type) {
      case "rate":
        return setFeedBack({
          ...feedBack,
          value: {
            ...feedBack.value,
            rating: Number(v)
          }
        })
      case "comment":
        return setFeedBack({
          ...feedBack,
          value: {
            ...feedBack.value,
            comment: v
          }
        })
      case "id":
        return setFeedBack({
          ...feedBack,
          id: v
        })
    }
  }

  const HandleReview = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_MAIN_URL}/review/add`,
        headers: {
          "x-access-token": auth?.user.token,
        },
        data: {
          Comment: feedBack.value.comment || '',
          Rating: feedBack.value.rating,
          BookingId: feedBack?.id,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            getMyBookings();
            setFeedBack({
              ...feedBack,
              id: null,
              value: {
                comment: null,
                rating: 0
              },
              isOpen: false
            })
          }
        })
    }
    catch (err) {
      //console.log(err)
      setFeedBack({
        ...feedBack,
        err : err?.response?.data?.message
      })
    }
  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | My bookings`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      {
        <>
          <ProfileModal />
          <ConfirmModal
            isOpen={action?.isOpen}
            HandleClose={HandleClose}
            action={action}
            confirm={HandleConfirm}
          />
          <Feedback feedBack={feedBack} HandleFeedBack={HandleFeedBack} HandleRating={HandleRating} HandleReview={HandleReview} />
        </>
      }
      <div className="flex flex-col justify-between items-between pb-24 w-full">
        <div className="flex flex-row flex-wrap justify-center gap-4 mx-auto md:px-10 px-4 my-5 w-full">
          {
            loading
            ? <div className="w-full h-screen justify-center items-center flex"><LoadingPage /></div>
            : (
              <>
                {tableData?.length > 0 ? (
                tableData?.map((booking, i) => (
                  /*<ProductCard
                    key={`product-${i}`}
                    booking={booking}
                    HandleCancel={HandleCancel}
                />*/
                  <RequestBookig
                    key={`product-${i}`}
                    RqBooking={false}
                    t={t}
                    booking={booking}
                    /*HandleCancel={HandleCancel}*/
                    HandleAction={HandleAction}
                    HandleFeedBack={HandleFeedBack}
                    HandleRating={HandleRating}
                    user={booking?.users_bookings_owner_offerTousers}
                    refresh={null}
                  />
                ))
              ) : (
                <EmptyState
                  msg={"goBookOffer"}
                  path={"/"}
                  goTo={"Book an offer"}
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
};

export default UserPage;
