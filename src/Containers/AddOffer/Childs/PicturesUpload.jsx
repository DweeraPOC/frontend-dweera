import React from "react";
import { useTranslation } from "react-i18next";
import Resizer from "react-image-file-resizer";

function PicturesUpload({
  setPictureError,
  images,
  setImages,
  setImageList,
  imageList,
  imgsUrl,
  setImgsUrl,
  imgsRemoved,
  setImgsRemoved,
}) {
  const { t } = useTranslation();

  const fileRemove = (file) => {
    const updatedList = [...images];
    updatedList.splice(images.indexOf(file), 1);
    setImages(updatedList);
    setImageList(updatedList.map((item) => item.data));
  };

  const FormatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  const ResizeImage = (file) => {
    var newFile = null;
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          newFile =  uri;
        },
        "base64"
      );
      return newFile;
  };
  const handleFileChange = async (e) => {
    setPictureError("");
    if (
      e.target.files.length > 4 ||
      images.length + e.target.files.length > 4
    ) {
      setPictureError(t("You can upload maximum 4 images"));
      return;
    }
    const tempArr = [];
    for (var i = 0; i < e.target.files.length; i++) {
      let result = e.target.files[i].size / 1048576;
      if (
        result.toFixed(0) < 2 &&
        (e.target.files[i].type === "image/jpeg" ||
          e.target.files[i].type === "image/png" ||
          e.target.files[i].type === "image/jpg")
      ) {
        //console.log(`${i} : ${FormatBytes(e.target.files[i]?.size)}`);
        /*Resizer.imageFileResizer(
          e.target.files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri)
            tempArr.push({
              preview: uri,
              data: uri
            });
          },
          "base64"
        );*/
        tempArr.push({
          preview: URL.createObjectURL(e.target.files[i]),
          data: e.target.files[i]
        });
      } else {
        setPictureError(
          result.toFixed(0) < 2
            ? t("You can upload only images with extension jpg, jpeg or png")
            : t("Your image is too big, Max size is 2MB")
        );
      }
    }
    setImages([...images, ...tempArr]);
    setImageList([...imageList, ...e.target.files]);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-row flex-wrap gap-2">
        {imgsUrl.map((item, index) => (
          <div
            className="rounded-b px-1 border-gray-300 py-1 shadow-md group transition-all delay-150 ease-in-out overflow-hidden"
            role="alert"
            key={index}
          >
            <div className="w-32 h-32 p-0 m-0 flex justify-center items-center relative overflow-hidden">
              <img
                src={`${process.env.REACT_APP_MAIN_URL}/images/offers/${item.image_url}`}
                alt="offer for rent"
                className="w-full h-full overflow-hidden object-center object-cover"
              />
              <div className="w-32 h-32 top-1/3 left-[15%] absolute text-start hidden group-hover:block transition-all delay-150 ease-in-out overflow-hidden">
                <button
                  type="button"
                  className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setImgsRemoved({
                      RemoveImgs: [...imgsRemoved.RemoveImgs, item.image_url],
                      OfferId: imgsRemoved.OfferId,
                    });
                    setImgsUrl(
                      imgsUrl.filter((el) => el.image_url !== item.image_url)
                    );
                  }}
                >
                  {t("Remove")}
                </button>
              </div>
            </div>
          </div>
        ))}
        {images.map((item, index) => (
          <div
            className="rounded-b px-1 border-gray-300 py-1 shadow-md group transition-all delay-150 ease-in-out overflow-hidden"
            role="alert"
            key={index}
          >
            <div className="w-32 h-32 p-0 m-0 flex justify-center items-center relative overflow-hidden">
              <img
                src={item.preview}
                alt="offer for rent"
                className="w-full h-full overflow-hidden object-center object-cover"
              />
              <div className="bg-lime-500 w-32 h-32 top-0 left-0 absolute text-start hidden group-hover:block transition-all delay-150 ease-in-out overflow-hidden bg-opacity-40">
                <div className="flex flex-col justify-between overflow-hidden text-start">
                  <span className="line-clamp-2 p-2 text-white font-semibold overflow-hidden text-start">
                    {item.data.name}
                  </span>
                  <div className="flex w-full justify-center items-center overflow-hidden">
                    <button
                      type="button"
                      className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => fileRemove(item)}
                    >
                      {t("Remove")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {images.length + imgsUrl.length === 4 ? null : (
        <label className="flex justify-center w-32 h-32 border border-gray-400  bg-gray-100 cursor-pointer hover:border-lime-600">
          <span className="flex flex-col justify-center items-center">
            <svg
              aria-hidden="true"
              className="mb-4 w-10 h-10 text-lime-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <span className="text-sm text-lime-700">{t("Add")}</span>
          </span>
          <input
            className="w-full h-full hidden"
            accept="image/*"
            multiple
            type="file"
            value=""
            name="file"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default PicturesUpload;
