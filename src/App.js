import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Register from "./register";
import SignIn from "./signin";
import SearchPanel from "./searchpanel";
import HotelCard from "./hotelcard";

import "./css/main.css";
import { useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    navigate("/signin");
  };

  // "https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"mumbai, Maharastra"}"

  useEffect(() => {
    if (city) {
      // \"location":{${city}}
      fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`, 
        {
          headers: {
            "projectId": "tytpcwxgpttd",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data.hotels);
          setHotels(data.data.hotels);
        })
        .catch((error) => {
          setHotels([]);
          console.error("Error fetching hotels:", error);
        });
    }
  }, [city]);

  const handleCitySelect = async (city) => {
    setCity(city);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedHotels = [...hotels].sort((a, b) => {
      if (option === "rating") return b.rating - a.rating;
      if (option === "price") return a.avgCostPerNight - b.avgCostPerNight;
      return 0;
    });

    setHotels(sortedHotels);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route
          path="/register"
          element={<Register onRegister={() => navigate("/signin")} />}
        />
        <Route
          path="/"
          element={
            <div>
              <SearchPanel onCitySelect={handleCitySelect} />
              <div className="p-4">
                <select
                  onChange={handleSortChange}
                  value={sortOption}
                  className="border p-2 mb-4"
                >
                  <option value="">Sort By</option>
                  <option value="rating">Rating</option>
                  <option  onClick={handleSortChange} value="price">Price</option>
                  
                </select>
                <div className="grid grid-cols-3 gap-4 p-4 grid-flow-dense ">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}</div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
