import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

import ErrorDisplayer from "../ErrorDisplayer/ErrorDisplayer";

import 'react-image-crop/dist/ReactCrop.css'; 
import CropEasy from './CropEasy';


function VehicleDetails({
  titleError,
  descriptionError,
  categoryError,
  vehicleSizeError,
  pictureError,
  setTitleError,
  setDescriptionError,
  setPictureError,
  setCategoryError,
  setVehicleSizeError,
  title,
  description,
  category,
  vehicleSize,
  images,
  tags,
  imageList,
  setTitle,
  setDescription,
  setCategory,
  setVehicleSize,
  setImages,
  setTags,
  setImageList,
  imgsUrl,
  setImgsUrl,
  setImgsRemoved,
  imgsRemoved,
  photos, 
  setPhotos,
  currentStep, 
  handleNext,
  loading
}) {
  const { t } = useTranslation();
  const [tagError, setTagError] = useState("");

  const [files,setFiles] = useState(null);
  const [status,setStatus] = useState(false)
  const HandleRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = (e) => {
    if (
      e.key === "Enter" &&
      e.currentTarget.value.length > 0 &&
      e.currentTarget.value.length < 30 &&
      tags.indexOf(e.currentTarget.value) === -1
    ) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
    setTagError(
      e.currentTarget.value.length > 30
        ? t("Your extra equipment are too long")
        : ""
    );
  };
 
  
  return (
  <>
    <div className="my-6 block md:flex justify-around">
      <div className="w-full md:w-5/12">
        <div>
          <label
            htmlFor="Title"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Title")} <sup className="text-red-600">*</sup>
          </label>
          <input
            type="text"
            id="Title"
            className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
            value={title}
            placeholder={t("Add title")}
            onChange={(e) => {
              setTitleError(
                e.currentTarget.value.length < 300
                  ? ""
                  : t("Maximum 300 characters")
              );
              setTitle(e.currentTarget.value);
            }}
          />
          <ErrorDisplayer error={titleError} />
        </div>
        <div className="mt-2 block md:hidden ">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Description")} <sup className="text-red-600">*</sup>
          </label>
          <textarea
            id="description"
            rows="4"
            className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
            placeholder={t("Write your description here...")}
            value={description}
            onChange={(e) => {
              setDescriptionError(
                e.currentTarget.value.length < 1500
                  ? ""
                  : t("maximun 1500 characters")
              );
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
          <ErrorDisplayer error={descriptionError} />
        </div>
        <div className="mt-2">
          <label
            htmlFor="Types"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Type")}
            <sup className="text-red-600">*</sup>
          </label>
          <select
            id="Types"
            className="border bg-transparent border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600  w-full p-2.5"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
              setCategoryError("");
            }}
          >
            <option defaultValue hidden>
              {t("Choose a type")}
            </option>
            <option value="bicycle" selected={category === "bicycle"}>
              {t("Bicycle")}
            </option>
            <option
              value="bicycle_electric"
              selected={category === "bicycle_electric"}
            >
              {t("BicycleElectric")}
            </option>
            <option value="scooter" selected={category === "scooter"}>
              {t("Scooter")}
            </option>
            <option
              value="scooter_electric"
              selected={category === "scooter_electric"}
            >
              {t("ScooterElectric")}
            </option>
          </select>
          <ErrorDisplayer error={categoryError} />
        </div>
        <div className="mt-2">
          <label
            htmlFor="Sizes"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Vehicle size")}
            <sup className="text-red-600">*</sup>
          </label>
          <select
            id="Sizes"
            className="border bg-transparent p-2.5  border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 w-full"
            onChange={(e) => {
              setVehicleSize(e.currentTarget.value);
              setVehicleSizeError("");
            }}
          >
            <option defaultValue hidden>
              {t("Choose vehicle size")}
            </option>
            <option value="small" selected={vehicleSize === "small"}>
              {t("Small")}
            </option>
            <option value="medium" selected={vehicleSize === "medium"}>
              {t("Medium")}
            </option>
            <option value="large" selected={vehicleSize === "large"}>
              {t("Large")}
            </option>
          </select>
          <ErrorDisplayer error={vehicleSizeError} />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-semibold text-gray-900">
            {t("Extra equipment")}
          </label>
          <p className="flex w-full items-center my-2 gap-2">
            <InformationCircleIcon className="w-6 h-6 text-blue-400" />
            <span className="text-gray-600 font-semibold text-sm">
              {t("Click to enter for inserting your equipment.")}
            </span>
          </p>
          <div className="w-full">
            <input
              className="border border-gray-400 mb-2 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
              onKeyUp={addTag}
              placeholder={t("Add extra equipment")}
            />
            {tags.length > 0 && (
              <ul className="flex flex-wrap items-center gap-2 border-2 p-1 rounded-md bg-gray-100">
                {tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-1 border-1 font-bold text-white bg-lime-600 px-2 rounded-full py-[1px]"
                    >
                      {tag}
                      <CancelOutlinedIcon
                        className="cursor-pointer w-1 h-1"
                        onClick={() => HandleRemove(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            <ErrorDisplayer error={tagError} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-5/12">
        <div className="hidden md:block">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Description")} <sup className="text-red-600">*</sup>
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
            placeholder={t("Write your description here...")}
            onChange={(e) => {
              setDescriptionError(
                e.currentTarget.value.length < 1500
                  ? ""
                  : t("maximun 1500 characters")
              );
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
          <ErrorDisplayer error={descriptionError} />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-semibold text-gray-900">
            {t("Add pictures")}
            <sup className="text-red-600">*</sup>
          </label>
          
          <CropEasy 
              imageList={imageList} 
              setImageList={setImageList} 
              photos={photos} 
              setPhotos={setPhotos} 
              currentStep={currentStep}
              handleNext={handleNext}
              loading={loading}
          />
          <ErrorDisplayer error={pictureError} />
        </div>
      </div>
    </div>
  
   </>
  );
}

export default VehicleDetails;
