
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop/cropImage';
import './crop.css'
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";


const CropEasy = ({
              photos, 
              setPhotos,
              imageList,
              setImageList ,  
              currentStep, 
              handleNext,
            }) => {
  //const [photos, setPhotos] = useState([]);
  const [loading,setLoading] = useState(false)
  //const [signedUrl,setSignedUrl] = useState(null)
  const { t } = useTranslation();
  const addPhoto = (file) => {
    if (photos.length < 4) {
      const newPhoto = {
        file,
        photoURL: URL.createObjectURL(file),
        openCrop: true,
        crop: { x: 0, y: 0 },
        zoom: 1,
        rotation: 0,
        croppedAreaPixels: null,
        croppedImageURL: null,
      };
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } else {
      alert('Maximum limit of 4 photos reached!');
    }
  };

  const removePhoto = async (index) => {
    const image = imageList[index];
    const filename = image.substring(image.lastIndexOf("/") + 1);
    handleRemoveImage(index, filename)
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    const inputElement = document.getElementById('file-input');
    inputElement.value = '';
  };

  const cropComplete = (index, croppedArea, croppedAreaPixels) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].croppedAreaPixels = croppedAreaPixels;
    setPhotos(updatedPhotos);
  };

  const cropImage = async (index) => {
    const photo = photos[index];
    try {
      const { file, url } = await getCroppedImg(
        photo.photoURL,
        photo.croppedAreaPixels,
        photo.rotation
      );
      const updatedPhotos = [...photos];
      updatedPhotos[index].file = file;
      updatedPhotos[index].photoURL = url;
      updatedPhotos[index].openCrop = false;
      updatedPhotos[index].croppedImageURL = url;
      setPhotos(updatedPhotos);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToCloud = async () => {
    console.log('Upload function started'); // Add this line
    const uploadPromises = photos.map(async (photo) => 
    {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      const image = new Image();
      image.src = photo.photoURL;
  
      const blob = await new Promise((resolve) => {
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
  
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/webp', 1);
        };
      });
      setLoading(true)
      const formdata = new FormData();
      const fileName = `${uuid()}.webp`
      const signedUrl = await axios({
        method: "POST",
        url: process.env.REACT_APP_MAIN_URL+"/offers/generateSignedUrl",
        data: {
          "fileName": fileName,
          "fileType": "image/webp"
        }
      });
      
      console.log("Signed URL response:", signedUrl);
  
      const { data } = await signedUrl;
      const _Object = new FormData();
      _Object.append("file",photo?.file)
      const config = {
        headers :  {
          'Content-Type' : `image/webp`,
          'Accept' : "*/*"
        },
      }
      const UploadImages = await axios.put(
        data,
        blob,
        config
      );
  
      const response = await UploadImages;
  
      if(response.status==200){
        const image_url = `https://storage.googleapis.com/dweera_bucket01/offers/${fileName}`
      
        return image_url;
      }
      else{
        return null;
      }
    });
  
    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log('Image URLs:', imageUrls); // Add this line
      setImageList(imageUrls);
    } catch (error) {
      console.log('Error:', error); // Add this line
    }
  };
  const handleRemoveImage = async (index, filename) => {
    const updatedImageList = [...imageList];
    updatedImageList.splice(index, 1);
    setImageList(updatedImageList);
  
    try {
      await axios.post(process.env.REACT_APP_MAIN_URL+"/offers/deleteImage", { filename });
      console.log("Image deleted from bucket");
    } catch (error) {
      console.error("Error deleting image from bucket:", error);
    }
  };

  const handleImages = async () => {
    let shouldCrop = false;
  
    // Check if any photos need cropping
    for (const photo of photos) {
      if (photo.openCrop) {
        shouldCrop = true;
        break;
      }
    }
  
    if (shouldCrop) {
      setLoading(true);
      const cropPromises = photos.map((photo, index) => {
        if (photo.openCrop) {
          return cropImage(index);
        }
        return Promise.resolve();
      });
  
      try {
        await Promise.all(cropPromises);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    if (photos.length !== 0) {
      uploadToCloud(); 
      handleNext();
    } else {
      alert('Add pictures');
    }
  };
  
  
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(addPhoto);
  };

  const handleCropChange = (index, crop) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].crop = crop;
    setPhotos(updatedPhotos);
  };

  const handleZoomChange = (index, zoom) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].zoom = zoom;
    setPhotos(updatedPhotos);
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  return (    <>
    <input type="file" onChange={handleFileChange} 
          id="file-input"
          accept="image/*" multiple  
          className="fileInput"
      />
     <div  style={{ display: 'flex',flexDirection: 'row', alignItems: 'center' }}>
                {photos?.map((photo, index) => (
                        <div key={index} style={{ margin:'6px' }}>
                            {photo.croppedImageURL && (
                                <center>
                                  <div style={{ alignItems: 'center' ,justifyContent:'center'}}>
                                    <img
                                      src={photo.croppedImageURL}
                                      alt="Cropped"
                                      style={{ maxWidth: '70px', borderRadius: '10px' }}
                                    />
                                    <button
                                      onClick={() => removePhoto(index)}
                                      style={{
                                        Width: '70px',
                                        padding: '4px',
                                        marginTop:'5px',
                                        borderRadius: '50%',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                </center>
                              )}
                      </div> ))}
        </div>

    {photos?.map((photo, index) => (
      <div key={index}>
        {photo.openCrop && (
          <>
            <div
              style={{
                background: '#333',
                position: 'relative',
                height: 400,
                width: 'auto',
                minWidth: '500px',
              }}
            >
              <Cropper
                image={photo.photoURL}
                crop={photo.crop}
                zoom={photo.zoom}
                rotation={photo.rotation}
                aspect={1}
                onZoomChange={(zoom) => handleZoomChange(index, zoom)}
                onCropChange={(crop) => handleCropChange(index, crop)}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  cropComplete(index, croppedArea, croppedAreaPixels)
                }
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '8px' }}>
              <div style={{ marginBottom: '8px' }}>
                Zoom: {zoomPercent(photo.zoom)}
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={photo.zoom}
                  onChange={(e) => handleZoomChange(index, parseFloat(e.target.value))}
                />
              </div>
              <div>
                <button onClick={() => removePhoto(index)}
                className="bg-lime-600 m-2 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >Remove</button>
                <button onClick={() => cropImage(index)}            
                className="bg-lime-600 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >Crop</button>
              </div>
            </div>
          </>
        )}
        
              
      </div>
    ))}
    <button
      onClick={handleImages}
      className="bg-lime-600 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      {loading ? (
        <ClipLoader color="#FFFF" loading={true} size={20} />
      ) : (
        t("Continue")
      )}
   </button>
  </>
);
};

export default CropEasy;

