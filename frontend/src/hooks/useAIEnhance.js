import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const useAIEnhance = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const enhanceWithAI = async (type, data, onSuccess) => {
    if (!data || Object.values(data).every(v => !v?.toString().trim())) {
      toast.error("Please write something first!");
      return;
    }

    try {
      setIsGenerating(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_AI, {
        type,
        data,
      });

      if (response?.data) {
        onSuccess(response.data);  // ✅ callback — caller decides what to do with result
        toast.success("Enhanced successfully!");
      } else {
        toast.error("Failed to enhance. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsGenerating(false);
    }
  };

  return { enhanceWithAI, isGenerating };
};

export default useAIEnhance;