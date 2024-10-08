import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitbutton = () => {
    // Assuming validation is already done
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ email, password, name })
    );
    console.log("User registered successfully");
    // Redirect or navigate to the login page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "tytpcwxgpttd",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          appType: "bookingportals",
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      
      alert("User registered successfully");
      onRegister();
    } else {
      alert("User already existed");
    }
  };

  return (
    <div className="flex justify-center   bg-white-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm font-bold"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm  text-gray-700 mb-2 ">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border  border-blue-5000 rounded-lg py-2 px-3 w-full  focus: border-blue-5000"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          onClick={handleSubmitbutton}
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 hover:underline transition hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
//
//
