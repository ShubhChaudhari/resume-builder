import React from "react";
import Input from "../../../components/inputs/Input";
import { LuTrash2, LuPlus, LuSparkles } from "react-icons/lu";
import useAIEnhance from "../../../hooks/useAIEnhance";

const WorkExperienceForm = ({ workExperienceInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  const { enhanceWithAI, isGenerating } = useAIEnhance();

  const handleAIEnhance = (index) => {
    enhanceWithAI(
      "experience",
      { role: workExperienceInfo[index]?.role }, // ✅ just role
      (result) => updateArrayItem(index, "description", result)
    );
  };

  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Work Experience
      </h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {workExperienceInfo?.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="ABC Corp"
                type="text"
                value={experience?.company || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "company", target.value)
                }
              />

              <Input
                label="Role"
                placeholder="Frontend Developer"
                type="text"
                value={experience?.role || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "role", target.value)
                }
              />

              <Input
                label="Start Date"
                type="month"
                value={experience?.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
              />

              <Input
                label="End Date"
                type="month"
                value={experience?.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
              />
            </div>

            <div className="col-span-2 mt-4">
              <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-[13px] text-slate-600">
                Description
              </label>
                <button
                                    className="btn-small-light"
                                    onClick={() => handleAIEnhance(index)}
                                    disabled={isGenerating}
                                  >
                                    <LuSparkles className="text-[15px]" />
                                    <span className="hidden md:block">
                                      {isGenerating ? "Enhancing..." : "AI Enhance"}
                                    </span>
                                  </button>
              </div>
              <textarea
                placeholder="What did you do in this role?"
                className="form-input w-full mt-1"
                rows={3}
                value={experience?.description || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "description", target.value)
                }
              />
            </div>

            {workExperienceInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <LuPlus />
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;