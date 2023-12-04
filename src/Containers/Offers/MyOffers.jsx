import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import OffersTables from "../Tables/OffersTables";
import Pagination from "../Tables/Pagination";
import { useAuth } from "../../Middlewares/AuthContext";
import ViewModal from "./ViewModal";
import Footer from "../../Components/footer/Footer";
import EmptyState from "../../Components/EmptyState/EmptyState";
import Card from "../../Components/Card/Card";
import ConfirmModal from "./ConfirmModal";
import LoadingPage from "../LoadingPage/LoadingPage"
import { Helmet } from "react-helmet";

export default function MyOffers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const [alloffers, setalloffers] = useState([]);
  const [status, setStatus] = useState(false);
  const auth = useAuth();

  async function gettingoffers() {
    setLoading(true)
    await axios
      .get(process.env.REACT_APP_MAIN_URL + "/offers/get-offers-by-user/", {
        headers: {
          "x-access-token": auth?.user.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setalloffers(response.data.offers);
        }
      }).finally(() => {
        setLoading(false)
      });
  }

  useEffect(() => {
    gettingoffers();
  }, []);

  const TableHeader = [
    {
      id: 1,
      name: "",
    },
    {
      id: 2,
      name: t("Title"),
    },
    {
      id: 3,
      name: t("Category"),
    },
    {
      id: 5,
      name: t("Price"),
    },
    {
      id: 6,
      name: t("Status"),
    },
    {
      id: 7,
      name: t("Actions"),
    },
  ];
  const [currentList, setCurrentList] = useState(1);
  const indexOfLastOffer = currentList * 5;
  const indexOfFirstOffer = indexOfLastOffer - 5;
  const Offers = alloffers?.slice(indexOfFirstOffer, indexOfLastOffer);

  const paginate = (number) => {
    setCurrentList(number);
  };

  const Refersh = () => {
    gettingoffers();
  };

  const vehicle_type = {
    bicycle: "Bicycle",
    bicycle_electric: "Bicycle Electric",
    scooter: "Scooter",
    scooter_electric: "Scooter Electric",
  };

  const Offer_Status = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <>
            <span className="flex justify-center items-center px-1.5 py-1 bg-[#65D01E] text-white rounded-md">
              {t("Approved")}
            </span>
          </>
        );
      case "pending":
        return (
          <>
            <span className="flex justify-center items-center px-1.5 py-1 bg-[#E1CF1B] text-white rounded-md">
              {t("Pending")}
            </span>
          </>
        );
      case "rejected":
        return (
          <>
            <span className="flex justify-center items-center px-1.5 py-1 bg-[#D01E33] text-white rounded-md">
              {t("Not Approved")}
            </span>
          </>
        );
    }
  };

  const [selected, setSelected] = useState(null);

  const OpenModal = (id) => {
    const selectOffer = alloffers?.find((offer) => offer?.offer_id === id);
    setSelected(selectOffer);
    setStatus(true);
  };
  const CloseModal = () => {
    setStatus(false);
  };
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    action: {
      name: null,
      path: null,
    },
    id: null,
  });
  const HandleOpenConfirmation = (id, action) => {
    return setConfirmation({
      ...confirmation,
      isOpen: true,
      action: action,
      id: id,
    });
  };
  return (
    <div className="flex flex-col justify-between items-between pb-24">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | My offers`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      {
        <>
          <ViewModal offer={selected} status={status} Close={CloseModal} />
          <ConfirmModal
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            refresh={Refersh}
          />
        </>
      }
      {
        loading 
        ? <div className="w-full h-screen justify-center items-center flex"><LoadingPage /></div>
        : (
          <>
            {alloffers?.length > 0 ? (
        <div className="container mx-auto w-full mt-5 h-full mb-10">
          <div className="flex-col justify-start w-full h-full gap-6 hidden md:hidden lg:flex">
            <OffersTables
              TableHeader={TableHeader}
              TableBody={Offers}
              OpenModal={OpenModal}
              Offer_Status={Offer_Status}
              t={t}
              VehicleType={vehicle_type}
              OpenConfirmation={HandleOpenConfirmation}
              navigate={navigate}
            />
            <Pagination
              totalOffers={alloffers.length}
              offerPerList={5}
              currentList={currentList}
              paginate={paginate}
            />
          </div>
          <div className="lg:hidden flex flex-row flex-wrap gap-4 justify-center items-center w-full px-4">
            {alloffers?.map((offer) => (
              <div key={offer?.offer_id}>
                <Card
                  key={offer?.offer_id}
                  offer={offer}
                  OpenModal={OpenModal}
                  t={t}
                  OpenConfirmation={HandleOpenConfirmation}
                  Offer_Status={Offer_Status}
                  navigate={navigate}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          msg={"addYourOffer"}
          path={"/add-new-offer"}
          goTo={"AddOffer"}
        />
      )}
          </>
        )
      }
      <div className="w-full fixed bottom-0 z-50">
        <Footer />
      </div>
    </div>
  );
}
