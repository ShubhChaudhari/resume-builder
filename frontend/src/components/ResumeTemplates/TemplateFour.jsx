import React, { useEffect, useRef, useState } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuGithub,
  LuRss,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import { formatYearMonth } from "../../utils/helper";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const SectionTitle = ({ text, accentColor }) => (
  <div
    className="text-base font-bold uppercase tracking-widest mb-3 pb-1 border-b-2"
    style={{ color: accentColor, borderColor: accentColor }}
  >
    {text}
  </div>
);

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualBaseWidth);
      const newScale = containerWidth ? containerWidth / actualBaseWidth : 1;
      setScale(newScale);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="bg-white p-10"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* ── HEADER ── */}
      <header
        className="text-center mb-6 pb-5 border-b-2"
        style={{ borderColor: themeColors[3] }}
      >
        {/* Profile Photo */}
        <div className="flex justify-center mb-3">
          <div
            className="w-[90px] h-[90px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: themeColors[1] }}
          >
            {resumeData?.profileInfo?.profilePreviewUrl ? (
              <img
                src={resumeData.profileInfo.profilePreviewUrl}
                className="w-[84px] h-[84px] rounded-full object-cover"
              />
            ) : (
              <div
                className="text-5xl flex items-center justify-center w-full h-full rounded-full"
                style={{ color: themeColors[4] }}
              >
                <LuUser />
              </div>
            )}
          </div>
        </div>

        {/* Name & Designation */}
        <h1
          className="text-3xl font-bold mb-1"
          style={{ color: themeColors[3] }}
        >
          {resumeData?.profileInfo?.fullName}
        </h1>
        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
          {resumeData?.profileInfo?.designation}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mt-3">
          {resumeData?.contactInfo?.email && (
            <span className="flex items-center gap-1">
              <LuMail /> {resumeData.contactInfo.email}
            </span>
          )}
          {resumeData?.contactInfo?.phone && (
            <span className="flex items-center gap-1">
              <LuPhone /> {resumeData.contactInfo.phone}
            </span>
          )}
          {resumeData?.contactInfo?.location && (
            <span className="flex items-center gap-1">
              <LuMapPinHouse /> {resumeData.contactInfo.location}
            </span>
          )}
          {resumeData?.contactInfo?.linkedin && (
            <span className="flex items-center gap-1">
              <RiLinkedinLine /> {resumeData.contactInfo.linkedin}
            </span>
          )}
          {resumeData?.contactInfo?.github && (
            <span className="flex items-center gap-1">
              <LuGithub /> {resumeData.contactInfo.github}
            </span>
          )}
          {resumeData?.contactInfo?.website && (
            <span className="flex items-center gap-1">
              <LuRss /> {resumeData.contactInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="space-y-5">

        {/* Professional Summary */}
        {resumeData?.profileInfo?.summary && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Professional Summary" accentColor={themeColors[3]} />
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.profileInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {resumeData?.workExperience?.length > 0 && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Work Experience" accentColor={themeColors[3]} />
            <div className="space-y-4">
              {resumeData.workExperience.map((exp, index) => (
                <div
                  key={`work_${index}`}
                  className="pl-4 border-l-2 page-break-inside-avoid"
                  style={{ borderColor: themeColors[3] }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-600 font-medium">{exp.company}</p>
                    </div>
                    <span
                      className="text-xs font-medium whitespace-nowrap ml-2"
                      style={{ color: themeColors[4] }}
                    >
                      {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData?.projects?.length > 0 && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Projects" accentColor={themeColors[3]} />
            <div className="space-y-3">
              {resumeData.projects.map((proj, index) => (
                <div
                  key={`proj_${index}`}
                  className="pl-4 border-l-2 page-break-inside-avoid"
                  style={{ borderColor: themeColors[2] }}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                    {proj.github && (
                      <a
                        href={proj.github}
                        className="text-xs flex items-center gap-1"
                        style={{ color: themeColors[3] }}
                      >
                        <LuGithub size={12} /> GitHub
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a
                        href={proj.liveDemo}
                        className="text-xs flex items-center gap-1"
                        style={{ color: themeColors[3] }}
                      >
                        <LuRss size={12} /> Live
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData?.education?.length > 0 && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Education" accentColor={themeColors[3]} />
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div
                  key={`edu_${index}`}
                  className="flex justify-between items-start page-break-inside-avoid"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData?.skills?.length > 0 && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Skills" accentColor={themeColors[3]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </section>
        )}

        {/* Certifications */}
        {resumeData?.certifications?.length > 0 && (
          <section className="page-break-inside-avoid">
            <SectionTitle text="Certifications" accentColor={themeColors[3]} />
            <div className="space-y-2">
              <CertificationInfo
                certifications={resumeData.certifications}
                bgColor={themeColors[2]}
              />
            </div>
          </section>
        )}

        {/* Languages + Interests */}
        <div className="grid grid-cols-2 gap-6">
          {resumeData?.languages?.length > 0 && (
            <section className="page-break-inside-avoid">
              <SectionTitle text="Languages" accentColor={themeColors[3]} />
              <div className="flex flex-wrap gap-2">
                {resumeData.languages.map((lang, index) => (
                  <span
                    key={`lang_${index}`}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: themeColors[2], color: themeColors[4] }}
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {resumeData?.interests?.length > 0 && resumeData.interests[0] !== "" && (
            <section className="page-break-inside-avoid">
              <SectionTitle text="Interests" accentColor={themeColors[3]} />
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((interest, index) => {
                  if (!interest) return null;
                  return (
                    <span
                      key={`interest_${index}`}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: themeColors[2], color: themeColors[4] }}
                    >
                      {interest}
                    </span>
                  );
                })}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default TemplateFour;