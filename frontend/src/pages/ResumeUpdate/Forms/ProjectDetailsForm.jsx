import React from "react";
import Input from "../../../components/inputs/Input";
import { LuTrash2, LuPlus, LuSparkles } from "react-icons/lu";
import useAIEnhance from "../../../hooks/useAIEnhance";

const ProjectDetailsForm = ({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  const { enhanceWithAI, isGenerating } = useAIEnhance();

  const handleAIEnhance = (index) => {
  enhanceWithAI(
    "project",
    { title: projectInfo[index]?.title }, // ✅ just title
    (result) => updateArrayItem(index, "description", result)
  );
};
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Projects
      </h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectInfo?.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Portfolio Website"
                  type="text"
                  value={project?.title || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "title", target.value)
                  }
                />
              </div>

              <div className="col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-600">
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
                  placeholder="Short description about the project"
                  className="form-input w-full mt-1"
                  rows={3}
                  value={project?.description || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>

              <Input
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                type="url"
                value={project?.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
              />

              <Input
                label="Live Demo URL"
                placeholder="https://yourproject.live"
                type="url"
                value={project?.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
              />
            </div>

            {projectInfo.length > 1 && (
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
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <LuPlus />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;