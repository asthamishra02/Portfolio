"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Poppins, Mukta } from "next/font/google";

// Poppins Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "800"],
});

// Mukta Font
const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200"],
});

export default function Home() {
  // Separate words
  const leftWord = "Astha";
  const rightWord = "Mishra";

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  // Screen controls
  const [showName, setShowName] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Smooth Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Left Scramble Reveal
  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setLeftText(
        leftWord
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return leftWord[index];
            }

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= leftWord.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Right Scramble Reveal
  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setRightText(
        rightWord
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return rightWord[index];
            }

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= rightWord.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Timing Flow
  useEffect(() => {
    // Intro disappears
    const introTimer = setTimeout(() => {
      setShowName(false);
      setShowLoader(true);
    }, 3000);

    // Loader disappears
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 6500);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-y-auto bg-[#263240] text-white ${poppins.className}`}
    >
      <AnimatePresence mode="wait">
        {/* INTRO SCREEN */}
        {showName ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              transition: {
                duration: 1.2,
              },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-6 md:gap-10">
              {/* Astha */}
              <motion.h1
                initial={{
                  x: -300,
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                }}
                className="text-5xl md:text-8xl font-semibold tracking-wide text-zinc-200"
              >
                {leftText}
              </motion.h1>

              {/* Mishra */}
              <motion.h1
                initial={{
                  x: 300,
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                }}
                className="text-5xl md:text-8xl font-semibold tracking-wide text-zinc-200"
              >
                {rightText}
              </motion.h1>
            </div>
          </motion.div>
        ) : showLoader ? (
          /* LOADER SCREEN */
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Blob 1 */}
            <motion.div
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -40, 40, 0],
                scale: [1, 1.2, 0.9, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-40 h-40 bg-blue-400/40 rounded-full blur-3xl"
            />

            {/* Blob 2 */}
            <motion.div
              animate={{
                x: [0, -50, 50, 0],
                y: [0, 50, -50, 0],
                scale: [1, 0.8, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-40 h-40 bg-orange-400/40 rounded-full blur-3xl"
            />

            {/* Blob 3 */}
            <motion.div
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"
            />
          </motion.div>
        ) : (
          /* MAIN PORTFOLIO SCREEN */
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative min-h-screen"
          >
            {/* Navbar */}
<motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.01, duration: 1 }}
  // Reduced top padding on mobile (pt-4) and added side padding (px-4) to avoid edge clipping
  className="sticky top-0 z-50 flex justify-center pt-4 md:pt-10 px-4"
>
  {/* 
    Key Changes for Mobile:
    - flex-wrap: Allows links to wrap to a new line on narrow phone screens
    - gap-x-4 md:gap-x-8 & gap-y-2.5: Compact spacing horizontally, clean gap vertically when wrapped
    - text-xs md:text-base: Scaled down text size
    - px-6 md:px-8 & py-3 md:py-4: Scaled down padding
    - rounded-[20px] md:rounded-full: Clean border radius on mobile that supports wrapping beautifully
  */}
  <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-2.5 text-zinc-200 text-xs md:text-base font-medium backdrop-blur-md bg-white/5 px-6 md:px-8 py-3 md:py-4 rounded-[20px] md:rounded-full border border-white/10 max-w-md md:max-w-none">
    <button
      onClick={() => scrollToSection("skills")}
      className="hover:text-white transition duration-300"
    >
      Skills
    </button>
    <button
      onClick={() => scrollToSection("education")}
      className="hover:text-white transition duration-300"
    >
      Education
    </button>
    <button
      onClick={() => scrollToSection("experience")}
      className="hover:text-white transition duration-300"
    >     
      Experience
    </button>
    <button
      onClick={() => scrollToSection("publications")}
      className="hover:text-white transition duration-300"
    >
      Publications
    </button>
    <button
      onClick={() => scrollToSection("projects")}
      className="hover:text-white transition duration-300"
    >
      Projects
    </button>
    <a
      href="/Astha_Mishra_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition duration-300"
    >
      Resume
    </a>
  </div>
</motion.nav>

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between px-10 lg:px-20 mt-16 gap-16">
              {/* LEFT PROFILE SECTION */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                {/* Circular Image */}
                <div className="w-72 h-72 rounded-full overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md">
                  <img
                    src="/astha2.png"
                    alt="Astha Mishra"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h1
                  className={`mt-5 ml-12 text-4xl tracking-wide text-zinc-100 ${mukta.className}`}
                >
                  Astha Mishra
                </h1>

                {/* Social Icons */}
                {/* <div className="flex gap-5 mt-5"> */}
                <div className="flex gap-5 mt-8 ml-20">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/astha-mishra-81045224a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition duration-300 hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/asthamishra02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition duration-300 hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.765-1.59 8.19-6.084 8.19-11.382 0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>

                {/* MailId */}
                <a
  href="mailto:astham2003@gmail.com"
  className="text-zinc-300 hover:text-white transition duration-300 hover:scale-110"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-7 h-7"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-1 16.5c0 .83-.67 1.5-1.5 1.5h-9C6.67 18 6 17.33 6 16.5v-9C6 6.67 6.67 6 7.5 6h9c.83 0 1.5.67 1.5 1.5v9zm-1.75-7.75l-4.25 2.83-4.25-2.83v-1.17l4.25 2.83 4.25-2.83v1.17z" />
  </svg>
</a>


                </div>
              </motion.div>

              {/* RIGHT TEXT SECTION */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1.2 }}
                className="max-w-3xl text-zinc-300"
              >
                <div
                  className={`space-y-8 text-lg md:text-xl leading-10 ${mukta.className}`}
                >
                  <p>
                     &gt; Hi, I’m a Computer Science student
                  interested in Machine Learning and
                     Software Development. I’ve worked on projects involving
                     satellite image analysis, plant segmentation, biomass
                     prediction, and computer vision applications.
                  </p>

                   <p>
                     &gt; I completed an internship at ISRO, where I worked on
                    real-world research and data analysis tasks. Alongside
                     AI/ML projects, I enjoy building practical, problem-focused
                    applications.
                   </p>

                  <p>
                     &gt; Currently, I’m focused on improving my software
                    engineering skills and exploring scalable AI solutions.
                  </p>


                </div>
              </motion.div>
            </div>

{/* SKILLS SECTION */}
<motion.section
  id="skills"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative z-10 px-10 lg:px-20 py-20 max-w-4xl"
>
  <h2
    className={`text-4xl md:text-5xl text-zinc-100 mb-8 text-left tracking-wide ${mukta.className}`}
  >
    Skills
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-5 place-items-start">

    {/* Python */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        alt="Python"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        Python
      </p>
    </div>
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        alt="React"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        React
      </p>
    </div>

    {/* NumPy */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"
        alt="NumPy"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        NumPy
      </p>
    </div>

    {/* Pandas */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
        alt="Pandas"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        Pandas
      </p>
    </div>

    {/* SQL */}
    {/* <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
        alt="SQL"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        SQL
      </p>
    </div> */}
    {/* SQL */}
{/* <div className="flex flex-col items-center gap-1 group cursor-pointer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
    alt="SQL"
    className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
  />
  <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
    SQL
  </p>
</div> */}
<div className="flex flex-col items-center gap-1 group cursor-pointer">
  {/* Modern 3-Layered Database SVG */}
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-11 h-11 text-zinc-500 opacity-70 transition duration-300 group-hover:opacity-100 group-hover:text-zinc-300 group-hover:scale-110"
  >
    <path d="M12,2A10,3 0 0,0 2,5V19A10,3 0 0,0 12,22A10,3 0 0,0 22,19V5A10,3 0 0,0 12,2zM12,4C16.41,4 20,4.89 20,6C20,7.11 16.41,8 12,8C7.59,8 4,7.11 4,6C4,4.89 7.59,4 12,4ZM20,19C20,20.11 16.41,21 12,21C7.59,21 4,20.11 4,19V17C4,18.11 7.59,19 12,19C16.41,19 20,18.11 20,17V19ZM20,14C20,15.11 16.41,16 12,16C7.59,16 4,15.11 4,14V12C4,13.11 7.59,14 12,14C16.41,14 20,13.11 20,12V14Z" />
  </svg>
  
  {/* Text Label */}
  <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
    SQL
  </p>
</div>

    {/* OpenCV */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
        alt="OpenCV"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        OpenCV
      </p>
    </div>

    {/* Scikit-Learn */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
        alt="Scikit-Learn"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        Scikit-Learn
      </p>
    </div>

    {/* Docker */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        alt="Docker"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        Docker
      </p>
    </div>

    {/* FastAPI */}
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
        alt="FastAPI"
        className="w-11 h-11 opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
      />
      <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
        FastAPI
      </p>
    </div>

    <div className="flex flex-col items-center gap-1 group cursor-pointer">
  {/* Modern Sliders/Tuning Icon for Hyperparameter Optimization */}
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-11 h-11 text-zinc-500 opacity-70 transition duration-300 group-hover:opacity-100 group-hover:text-zinc-300 group-hover:scale-110"
  >
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="2" y1="14" x2="6" y2="14" />
    <line x1="10" y1="8" x2="14" y2="8" />
    <line x1="18" y1="16" x2="22" y2="16" />
  </svg>
  
  {/* Text Label */}
  <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
    Optuna
  </p>
</div>

<div className="flex flex-col items-center gap-1 group cursor-pointer">
  {/* Geospatial Globe Icon for GDAL */}
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-11 h-11 text-zinc-500 opacity-70 transition duration-300 group-hover:opacity-100 group-hover:text-zinc-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
  
  {/* Text Label */}
  <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
    GDAL
  </p>
</div>

<div className="flex flex-col items-center gap-1 group cursor-pointer">
  {/* Multi-layered Geospatial Raster/Band Icon */}
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-11 h-11 text-zinc-500 opacity-70 transition duration-300 group-hover:opacity-100 group-hover:text-zinc-300 group-hover:scale-110"
  >
    {/* Top Layer (Raster Grid Representation) */}
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <line x1="12" y1="2" x2="12" y2="12" />
    <line x1="2" y1="7" x2="22" y2="7" />
    
    {/* Stacked Underneath GIS Layers */}
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
  
  {/* Text Label */}
  <p className="text-sm tracking-wide text-zinc-500 group-hover:text-zinc-300 transition duration-300">
    Rasterio
  </p>
</div>

  </div>
{/* EDUCATION SECTION */}
<motion.section
  id="education"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative z-10 ml-0 md:-ml-1 lg:-ml-2 py-20"
>
  <h2
    className={`text-4xl md:text-4xl lg:text-5xl text-zinc-100 mb-12 tracking-wide ${mukta.className}`}
  >
    Education
  </h2>

  <div className="space-y-10">

    {/* College */}
    <div className="flex flex-col sm:flex-row sm:items-center border-l border-zinc-600 pl-6 gap-4 sm:gap-8 group">
      
      {/* Left Side: University Logo (Static - removed transitions, scales, and border/shadow updates) */}
      <div className="flex-shrink-0 self-start sm:self-center">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-3.5 border border-zinc-200/85 shadow-xl">
          <img
            src="/university-logo.png"
            alt="Sister Nivedita University Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Details */}
      <div className="flex-1">
        <p className="text-sm tracking-[0.2em] uppercase text-zinc-500 mb-2">
          2021 — 2025
        </p>

        <h3 className="text-2xl text-zinc-100 font-medium group-hover:text-zinc-50 transition-colors duration-300">
          B.Tech in Computer Science & Engineering
        </h3>

        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 mt-2 font-medium italic">
          Sister Nivedita University
        </p>

        {/* --- ADDED HIGH-IMPACT DETAILS BELOW --- */}
        <div className="mt-4 space-y-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          <p>
            <span className="text-zinc-400">Key Coursework:</span> Data Structures & Algorithms, Machine Learning, Operating Systems, Database Systems.
          </p>
          <p>
            <span className="text-zinc-400">Capstone Project:</span> Built an AI-powered yoga posture detection web application using computer vision and deep learning models such as OpenPose, PoseNet, and MobileNet for real-time pose analysis. The system provides live posture feedback alongside step-by-step guided instructions through an interactive web interface built with HTML, CSS, JavaScript, and Python.
          </p>
          <p>
            <span className="text-zinc-400">Academic Standing:</span> CGPA 8.3/10 
          </p>
        </div>
      </div>

    </div>

    {/* School */}
    <div className="flex flex-col sm:flex-row sm:items-center border-l border-zinc-600 pl-6 gap-4 sm:gap-8 group">
      
      {/* Left Side: School Logo (Static - removed transitions, scales, and border/shadow updates) */}
      <div className="flex-shrink-0 self-start sm:self-center">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-3.5 border border-zinc-200/85 shadow-xl">
          <img
            src="/school logo.png"
            alt="Narayana Schools Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Details */}
      <div className="flex-1">
        <p className="text-sm tracking-[0.2em] uppercase text-zinc-500 mb-2">
          2019 — 2021
        </p>

        <h3 className="text-2xl text-zinc-100 font-medium group-hover:text-zinc-50 transition-colors duration-300">
          Higher Secondary Education
        </h3>

        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 mt-3 italic">
          Narayana Schools
        </p>

        <div className="mt-4 space-y-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          <p>
            <span className="text-zinc-400">Key Coursework:</span> Physics, Chemistry, Mathematics, English and Physical Education
          </p>
          <p>
            <span className="text-zinc-400">Academic Standing:</span> Percentage: 92.6%
          </p>
        </div>
      </div>

    </div>

  </div>
</motion.section>

<motion.section
  id="experience"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative z-10 ml-0 md:-ml-4 lg:-ml-2 pt-2 pb-18"
>
  <h2
    className={`text-4xl md:text-4xl lg:text-5xl text-zinc-100 mb-12 tracking-wide ${mukta.className}`}
  >
    Experience
  </h2>

  <div className="space-y-10">

    {/* ISRO Internship */}
    {/* Changed sm:items-center to sm:items-start to align children to the top */}
    <div className="flex flex-col sm:flex-row sm:items-start border-l border-zinc-600 pl-6 gap-4 sm:gap-8 group">
      
      {/* Left Side: ISRO Logo (Static, aligned to the top with a subtle top margin) */}
      <div className="flex-shrink-0 self-start sm:mt-1">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-3.5 border border-zinc-200/85 shadow-xl">
          <img
            src="/isro-logo2.png"
            alt="ISRO Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Details */}
      <div className="flex-1">
        <p className="text-sm tracking-[0.2em] uppercase text-zinc-500 mb-2">
          September 2024 - May 2025
        </p>

        <h3 className="text-2xl text-zinc-100 font-medium group-hover:text-zinc-50 transition-colors duration-300">
          Research Intern
        </h3>

        <p className="text-zinc-400 italic mt-2">
          Indian Space Research Organisation (ISRO)
        </p>

        {/* Description */}
        <div className="mt-5 space-y-3 text-zinc-400 leading-8 font-light antialiased tracking-wide">
          <p>
            &gt; Project Objective: Estimated Above-Ground Biomass (AGB) and critical biophysical parameters in the Indian Sundarbans 
            (UNESCO World Heritage site) to support global climate change mitigation and REDD+ environmental programs.
          </p>

          <p>
            &gt; Data Integration: Engineered a high-dimensional dataset by fusing field-collected ground-truth targets (Tree Height, Canopy Diameter, Basal Area) 
            across 7 mangrove communities with multi-band SAR remote sensing data (polarimetric backscatter, texture metrics, and vegetation indices).
          </p>

          <p>
            &gt; Machine Learning Framework: Developed and benchmarked three distinct machine learning architectures: XGBoost, Random Forest, and Support Vector Regression (SVR)
            to accurately map and predict non-linear environmental attributes from satellite imagery.
         </p>

         <p>
            &gt; Hyperparameter Optimization: Utilized the Optuna framework to automate fine-tuning and mitigate overfitting, systematically optimizing architectural complexities including tree depth, learning rates, regularization penalties (L1/L2), and kernel influences.
         </p>

          <p>
            &gt; Feature Importance & Fusion: Conducted feature relevance analysis using Gini Importance and Gain metrics, proving that Multi-Source Feature Fusion (retaining all SAR, texture, and vegetation features simultaneously) 
            yielded superior model generalization compared to feature elimination.
         </p>

          <p>
            &gt; Data Augmentation: Overcame field data scarcity limitations by implementing a synthetic data generation strategy using Nearest Neighbor interpolation, 
            drastically reducing model overfitting and stabilizing performance in data-poor conditions.
         </p>

          <p>
            &gt; Results & Block Deployment: Achieved high predictive accuracy with XGBoost emerging as the top model (R2_scores up to 0.96–0.97). Engineered a scalable deployment pipeline using the Rasterio library to process 
            large satellite scenes in memory-efficient spatial blocks and output production-grade GeoTIFF maps.
         </p>
        </div>
      </div>

    </div>

  </div>
</motion.section>

<motion.section
  id="publications"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative z-10 ml-0 md:-ml-5 lg:-ml-2 pt-8 pb-20"
>
  <h2
    className={`text-4xl md:text-4xl lg:text-5xl text-zinc-100 mb-12 tracking-wide ${mukta.className}`}
  >
    Publications
  </h2>

  <div className="space-y-10">

    {/* Publication */}
    <div className="border-l border-zinc-600 pl-6">

      <p className="text-sm tracking-[0.2em] uppercase text-zinc-500 mb-2">
        2025
      </p>

      <h2 className="text-[1.35rem] text-zinc-100 font-medium leading-relaxed">
        Estimating Biophysical Parameters of Mangrove Forests of Indian Sundarbans using 
        Extreme Gradient Boosting with C-band SAR data and Ground Measurements
      </h2>

      <p className="text-zinc-400 italic mt-3">
        ISG–ISRS National Symposium 2025 – Abstract Proceedings · Nov 25, 2025
      </p>

      <div className="mt-5 space-y-3 text-zinc-400 leading-8">

        <p>
          Published abstract focusing on the estimation of mangrove forest biophysical parameters 
         (Basal Area, Tree Height, and Canopy Diameter) in the Indian Sundarbans using Extreme Gradient Boosting (XGBoost) 
          and C-band SAR data (RISAT-1A).
        </p>

        <p>
The study integrates polarimetric SAR features, textural measures, and 
biophysical indices with ground measurements to achieve reliable parameter estimation.
        </p>

      </div>

    </div>

  </div>
</motion.section>
</motion.section>

{/* <motion.section
  id="projects"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  // className="relative z-10 ml-0 md:-ml-5 lg:-ml-2 pt-8 pb-24"
  // className="relative z-10 ml-4 md:ml-10 lg:ml-15 pt-8 pb-24"
  className="relative z-10 ml-4 md:ml-12 lg:ml-18 -mt-14 pt-8 pb-24"
> */}

<motion.section
  id="projects"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 -mt-28 pt-8 pb-24"
>
  {/* Replaced -ml-2 md:-ml-4 with text-center to center the Projects heading */}
<h2
  className={`text-4xl md:text-4xl lg:text-5xl text-zinc-100 mb-12 -ml-3 md:-ml-9 tracking-wide ${mukta.className}`}
>
  Projects
</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Project Card 1 */}
    <div className="group h-full">
      <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-7 transition duration-300 hover:bg-white/15 hover:border-white/20 shadow-xl">

        {/* GitHub Icon */}
        <a
          href="https://github.com/asthamishra02/Santhe-Connect"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/20 transition duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.097 24 17.603 24 12.297 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <h3 className="text-2xl text-zinc-100 font-medium mb-4 group-hover:text-white transition duration-300">
          Santhe Connect
        </h3>

        <ul className="list-disc pl-5 text-zinc-400 space-y-2 text-[15px] leading-8 flex-1">
          <li>Smart tourism and local discovery platform to find authentic weekly markets (Santhes), local eateries, and small hospitality businesses.</li>
          <li>Provides an interactive map layout and GPS-based location discovery for real-time navigation.</li>
          <li>Features day-wise filtering, user reviews, and AI-generated descriptions to make local travel experiences accessible.</li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            React.js
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Firebase
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Geoapify API
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            OpenStreetMap (OSM)
          </span>
        </div>

      </div>
    </div>

    {/* Project Card 2 */}
    <div className="group h-full">
      <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-7 transition duration-300 hover:bg-white/15 hover:border-white/20 shadow-xl">

        {/* GitHub Icon */}
        <a
          href="https://github.com/asthamishra02/StockStream-Pipeline"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/20 transition duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.097 24 17.603 24 12.297 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <h3 className="text-2xl text-zinc-100 font-medium mb-4 group-hover:text-white transition duration-300">
          StockStream Pipeline
        </h3>

        <ul className="list-disc pl-5 text-zinc-400 space-y-2 text-[15px] leading-8 flex-1">
          <li>Automated data engineering project designed to collect, process, and store real-time stock market data.</li>
          <li>Orchestrates scheduled workflows with Apache Airflow to query external sources and maintain database updates.</li>
          <li>Leverages Docker containerization for all pipeline services to ensure portability, scalability, and simplified deployment.</li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Python
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Docker
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Airflow DAGs
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            SQL
          </span>
        </div>

      </div>
    </div>

    {/* Project Card 3 */}
    <div className="group h-full">
      <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-7 transition duration-300 hover:bg-white/15 hover:border-white/20 shadow-xl">

        {/* GitHub Icon */}
        <a
          href="https://github.com/yourusername/project1"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-8 right-5 p-2 rounded-full bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/20 transition duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.097 24 17.603 24 12.297 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <h3 className="text-2xl text-zinc-100 font-medium mb-4 pr-12 group-hover:text-white transition duration-300">
          Machine Learning Approach for Plant Density Estimation 
        </h3>

        <ul className="list-disc pl-5 text-zinc-400 space-y-2 text-[15px] leading-8 flex-1">
          <li>Developed an ML model workflow to calculate crop layout density using high-resolution satellite imagery.</li>
          <li>Converted RGB band data to the HSV color space to optimize accuracy during vegetation segmentation steps.</li>
          <li>Trained and evaluated multiple classifiers, with Support Vector Machine and Random Forest providing top results.</li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Python
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Scikit-learn
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            GDAL
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Matplotlib
          </span>
        </div>

      </div>
    </div>

    {/* Project Card 4 */}
    <div className="group h-full">
      <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-7 transition duration-300 hover:bg-white/15 hover:border-white/20 shadow-xl">

        {/* GitHub Icon */}
        <a
          href="https://github.com/asthamishra02/Yoga-Posture-Detection"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/20 transition duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.097 24 17.603 24 12.297 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <h3 className="text-2xl text-zinc-100 font-medium mb-4 group-hover:text-white transition duration-300">
          Yoga Posture Detection
        </h3>

        <ul className="list-disc pl-5 text-zinc-400 space-y-2 text-[15px] leading-8 flex-1">
          <li>Built an AI-powered yoga posture detection system utilizing computer vision and deep learning techniques.</li>
          <li>Utilized keypoint estimation networks (ResNet, PoseNet, MobileNet) to calculate pose boundaries.</li>
          <li>Calculates and outputs real-time user-corrective guidance over an interactive React/Python web client.</li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            Python
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-sm">
            OpenCV
          </span>
        </div>

      </div>
    </div>

  </div>

  <div className="flex justify-center mt-8">
    <a
      href="https://github.com/asthamishra02?tab=repositories"
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-400 hover:text-zinc-100 transition duration-300 text-lg tracking-wide underline underline-offset-4"
    >
      Other Academic Projects →
    </a>
  </div>
</motion.section>
{/* Footer */}
<div className="flex justify-center items-center py-12 mt-12 border-t border-white/5">
  <p className="text-xs md:text-sm text-zinc-500 hover:text-zinc-400 transition duration-300 tracking-[0.15em] uppercase">
    Created by Astha Mishra © 2026
  </p>
</div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}