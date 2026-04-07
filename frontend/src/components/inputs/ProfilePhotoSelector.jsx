import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="">
      <imput
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className={""}
      />

      {!image ? (
        <div className="">
          <LuUser className="" />

          <button type="button" className="" onClick={onChooseFile}>
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="">
          <img src={preview || previewUrl} alt="profile photo" className="" />
          <button className="" type="button" onClick={handleRemoveImage}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
