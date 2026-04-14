import React from "react";

const CertificationInfo = ({ certifications, bgColor }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {certifications?.map((cert, index) => (
        <div key={`cert_${index}`} className="page-break-inside-avoid">
          <h3 className="text-[13px] font-semibold text-gray-900">{cert.title}</h3>
          <div className="flex items-center gap-2">
            {cert.year && (
              <div
                className="text-[11px] font-bold text-gray-800 px-3 py-0.5 inline-block mt-2 rounded-lg"
                style={{ backgroundColor: bgColor }}
              >
                {cert.year}
              </div>
            )}
            <p className="text-[12px] text-gray-700 font-medium mt-1">{cert.issuer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationInfo;