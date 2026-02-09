"use client";

import React from "react";
import { GraduationCap, Award, Trophy } from "lucide-react";

const data = [
  {
    title: "Academic Qualifications",
    icon: GraduationCap,
    points: [
      "Bachelor’s Degree in Mathematics",
      "My Insitute is University of Lahore",
      "Strong Academic Record",
    ],
  },
  {
    title: "Achievements",
    icon: Award,
    points: [
      "500+ Students Successfully Taught",
      "Consistent A & A+ Results",
      "Excellent Student Feedback",
    ],
  },
  {
    title: "Teaching Experience",
    icon: Trophy,
    points: [
      "4+ Years of Teaching Experience",
      "Online & One-on-One Classes",
      "Exam-Oriented Teaching Style",
    ],
  },
];

const Qualification = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800">
            Qualifications & Achievements
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            A strong academic foundation with proven teaching success
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border-2 border-gray-200 hover:border-amber-200 
                active:border-amber-200 p-8 text-center shadow-sm hover:shadow-lg 
                transition active:shadow-lg cursor-pointer"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <Icon className="h-7 w-7 text-amber-700" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <ul className="mt-4 space-y-2 text-gray-600">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Qualification;
