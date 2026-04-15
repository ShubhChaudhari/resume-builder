import React from "react";
import ProfilePhotoSelector from "../../../components/inputs/ProfilePhotoSelector";
import Input from "../../../components/inputs/Input";
import { LuSparkles } from "react-icons/lu";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import toast from "react-hot-toast";
import { useState } from "react";
import useAIEnhance from "../../../hooks/useAIEnhance";

const ProfileInfoForm = ({ profileData, updateSection, onNext }) => {
  const { enhanceWithAI, isGenerating } = useAIEnhance();

  const handleAIEnhance = () => {
    enhanceWithAI(
      "summary",
      { rawSummary: profileData?.summary },
      (result) => updateSection("summary", result)
    );
  };

  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h2>

      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) =>
            updateSection("profilePreviewUrl", value)
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          value={profileData?.fullName || ""}
          onChange={({ target }) =>
            updateSection("fullName", target.value)
          }
          label="Full Name"
          placeholder="John"
          type="text"
        />

        <Input
          value={profileData?.designation || ""}
          onChange={({ target }) =>
            updateSection("designation", target.value)
          }
          label="Designation"
          placeholder="UI Designer"
          type="text"
        />
      </div>

      {/* <div className="col-span-2 mt-3">
        <label className="text-xs font-medium text-slate-600">
          Summary
        </label>
        <button
              className="btn-small-light"
              // onClick={() => }
            >
               <LuSparkles className="text-[15px]"  />
              <span className="hidden md:block">AI Enhance</span>
            </button>
        <textarea
          placeholder="Short Introduction"
          className="form-input"
          rows={4}
          value={profileData?.summary || ""}
          onChange={({ target }) =>
            updateSection("summary", target.value)
          }
        />
      </div> */}
      <div className="col-span-2 mt-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-600">Summary</label>

          <button
            className="btn-small-light"
            onClick={handleAIEnhance}
            disabled={isGenerating}
          >
            <LuSparkles className="text-[15px]" />
            <span className="hidden md:block">
              {isGenerating ? "Enhancing..." : "AI Enhance"}
            </span>
          </button>
        </div>

        <textarea
          placeholder="Write a rough summary... AI will enhance it"
          className="form-input"
          rows={4}
          value={profileData?.summary || ""}
          onChange={({ target }) => updateSection("summary", target.value)}
        />
      </div>
    </div>
  );
};

export default ProfileInfoForm;