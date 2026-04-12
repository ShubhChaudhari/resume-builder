import TEMPLATE_ONE_IMG from "../assets/template-one.png";
import TEMPLATE_TWO_IMG from "../assets/template-two.png";
import TEMPLATE_THREE_IMG from "../assets/template-three.png";

export const resumeTemplates = [
  {
    id: "01",
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: "themeOne",
  },
  {
    id: "02",
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: "themeTwo",
  },
  {
    id: "03",
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: "themeThree",
  },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEF4FE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#E6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],

    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#64B5F6", "#1E88E5", "#0D47A1"],
  ],
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profilePreviewUrl: null,
    fullName: "Rahul Sharma",
    designation: "Frontend Developer",
    summary:
      "Passionate frontend developer with 2+ years of experience building responsive web applications using React, JavaScript, and Tailwind CSS.",
  },

  contactInfo: {
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/rahulsharma",
    github: "https://github.com/rahulsharma",
    website: "https://rahulportfolio.dev",
  },

  workExperience: [
    {
      company: "Tech Solutions Pvt Ltd",
      role: "Frontend Developer",
      startDate: "2023-01",
      endDate: "2025-02",
      description:
        "Developed and maintained responsive web applications using React. Collaborated with backend team to integrate APIs and improved UI performance by 30%.",
    },
    {
      company: "CodeCraft Labs",
      role: "Junior Developer",
      startDate: "2022-01",
      endDate: "2022-12",
      description:
        "Worked on UI components, fixed bugs, and enhanced user experience. Assisted in building reusable components.",
    },
  ],

  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "Mumbai University",
      startDate: "2018",
      endDate: "2022",
    },
  ],

  skills: [
    { name: "React", progress: 70 },
    { name: "JavaScript", progress: 60 },
    { name: "HTML/CSS", progress: 90 },
    { name: "Tailwind CSS", progress: 100 },
    { name: "Git", progress: 60 },
  ],

  projects: [
    {
      title: "Resume Builder App",
      description:
        "A dynamic resume builder with multiple templates, live preview, and PDF export functionality.",
      github: "https://github.com/rahulsharma/resume-builder",
      liveDemo: "https://resume-builder-demo.netlify.app",
    },
    {
      title: "E-commerce UI",
      description:
        "Responsive e-commerce frontend with product filtering, cart functionality, and API integration.",
      github: "https://github.com/rahulsharma/ecommerce-ui",
      liveDemo: "https://ecommerce-ui-demo.netlify.app",
    },
  ],

  certifications: [
    {
      title: "React Developer Certification",
      issuer: "Udemy",
      year: "2023",
    },
    {
      title: "JavaScript Essentials",
      issuer: "Coursera",
      year: "2022",
    },
  ],

  languages: [
    { name: "English", progress: 100 },
    { name: "Hindi", progress: 80 },
  ],

  interests: ["Reading", "Traveling", "Coding", "Photography"],
};