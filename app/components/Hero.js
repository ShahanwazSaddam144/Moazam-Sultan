"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Youtube, Instagram, BadgeCheck } from "lucide-react";

const Hero = () => {
  // Split text for color styling
  const text1 = "Master Mathematics ";
  const text2 = "With Confidence";
  const fullText = text1 + text2;

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Continuous Typewriter Effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 50;
    const pauseTime = 1200;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(index + 1);

        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayedText(fullText.slice(0, index - 1));
        setIndex(index - 1);

        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  // Stats Data
  const stats = [
    {
      icon: <Youtube className="text-red-500 w-6 h-6" />,
      title: "YouTube Subscribers",
      value: "2.85K+",
    },
    {
      icon: <Youtube className="text-red-500 w-6 h-6" />,
      title: "YouTube Videos",
      value: "336+",
    },
    {
      icon: <Instagram className="text-pink-500 w-6 h-6" />,
      title: "Instagram Followers",
      value: "22K+",
    },
    {
      icon: <BadgeCheck className="text-amber-600 w-6 h-6" />,
      title: "Verified Expertise",
      value: "Professional Cambridge Teacher",
    },
  ];

  // Swipe / Drag Logic
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    sliderRef.current.style.cursor = "grabbing";
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section
      className="min-h-screen pt-24 bg-gradient-to-b from-amber-50 to-orange-100 overflow-hidden"
      id="hero"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-10 sm:mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-14">

          {/* Text */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight min-h-[120px]">
              <span className="text-amber-800">
                {displayedText.slice(0, text1.length)}
              </span>
              <span className="text-orange-500">
                {displayedText.slice(text1.length)}
              </span>
              <span className="border-r-4 border-orange-500 animate-pulse ml-1"></span>
            </h1>

            <p className="mt-4 text-gray-700 text-lg">
              Personalized math tutoring for school, college, and competitive
              exams. Learn concepts clearly, solve faster, and score higher.
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-4 justify-center md:justify-start text-gray-600">
              <div className="bg-amber-100 border-2 border-amber-600 px-4 py-2 rounded-lg font-medium text-sm">
                O/A Level
              </div>
              <div className="bg-amber-100 border-2 border-amber-600 px-4 py-2 rounded-lg font-medium text-sm">
                Punjab Board
              </div>
              <div className="bg-amber-100 border-2 border-amber-600 px-4 py-2 rounded-lg font-medium text-sm">
                Calculus
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col mb-5 sm:flex-row gap-4 justify-center md:justify-start">
              <Link href={"#bookSession"}>
                <button className="rounded-xl cursor-pointer bg-amber-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-amber-700 transition">
                  Book a Session
                </button>
              </Link>

              <Link href={"#services"}>
                <button className="rounded-xl border-2 cursor-pointer border-amber-600 px-6 py-3 text-amber-700 font-semibold hover:bg-amber-100 transition">
                  View Services
                </button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center md:justify-end w-full md:w-auto">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-40 animate-pulse"></div>
            <div className="animate-float">
              <Image
                src="/hero.avif"
                alt="Math Tutor"
                width={280}
                height={280}
                priority
                className="relative rounded-full border-4 border-white shadow-xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Sliding Stats Section */}
      <div className="mt-16 bg-white/70 backdrop-blur-md py-6 border-t border-amber-200 overflow-hidden">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 whitespace-nowrap overflow-x-auto cursor-grab ${
            !isDragging ? "animate-scroll" : ""
          }`}
        >
          {[...stats, ...stats].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-6 py-4 rounded-xl shadow-sm min-w-auto"
            >
              {stat.icon}
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="font-bold text-amber-700 text-lg">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
