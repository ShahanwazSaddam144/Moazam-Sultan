"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [errorSessions, setErrorSessions] = useState("");

  const handleLogin = () => {
    if (
      login.username === process.env.NEXT_PUBLIC_DASHBOARD_USER &&
      login.password === process.env.NEXT_PUBLIC_DASHBOARD_PASS
    ) {
      setLoggedIn(true);
      fetchSessions();
    } else {
      setPopup({ show: true, message: "Incorrect username or password" });
    }
  };

  const fetchSessions = async () => {
    setLoadingSessions(true);
    setErrorSessions("");
    try {
      const res = await fetch("/api/bookSession");
      const data = await res.json();

      if (data.success) {
        setSessions(data.sessions);
      } else {
        setErrorSessions(data.message || "Failed to load sessions");
      }
    } catch (err) {
      console.error(err);
      setErrorSessions("Server error. Please try again later.");
    } finally {
      setLoadingSessions(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center py-20 px-4">
        {!loggedIn ? (
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-300 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>

            <h2 className="text-4xl font-extrabold text-amber-800 text-center mb-2">Client Login</h2>
            <p className="text-gray-600 text-center mb-8">Enter credentials to access booked sessions</p>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                className="w-full rounded-xl border border-amber-200 px-5 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition shadow-sm"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-5 py-3 focus:ring-2 focus:ring-amber-400 outline-none pr-12 shadow-sm transition"
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition text-lg shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-amber-800 mb-10 text-center">Booked Sessions</h2>

            {loadingSessions ? (
              <p className="text-center text-gray-600 text-lg">Loading sessions...</p>
            ) : errorSessions ? (
              <p className="text-center text-red-600 text-lg">{errorSessions}</p>
            ) : sessions.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No sessions booked yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sessions.map((s) => (
                  <div
                    key={s._id}
                    className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
                  >
                    <h3 className="text-xl font-bold text-amber-800 mb-3">{s.name}</h3>
                    <p className="text-gray-700"><strong>Email:</strong> {s.email}</p>
                    <p className="text-gray-700"><strong>Grade:</strong> {s.grade}</p>
                    <p className="text-gray-700"><strong>Day:</strong> {s.day}</p>
                    <p className="text-gray-700"><strong>Time:</strong> {s.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {popup.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <button
                onClick={() => setPopup({ show: false, message: "" })}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X />
              </button>
              <h4 className="text-lg font-semibold text-amber-700">Notification</h4>
              <p className="mt-3 text-gray-600">{popup.message}</p>
              <button
                onClick={() => setPopup({ show: false, message: "" })}
                className="mt-5 w-full rounded-xl bg-amber-600 py-2 font-medium text-white hover:bg-amber-700 transition"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
