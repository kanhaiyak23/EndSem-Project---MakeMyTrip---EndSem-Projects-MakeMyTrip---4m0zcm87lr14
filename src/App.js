import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Register from "./register";
import SignIn from "./signin";
import SearchPanel from "./searchpanel";
import HotelCard from "./hotelcard";

import "./css/main.css";

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

  useEffect(() => {
    if (city) {
      fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
        {
          headers: {
            projectId: "tytpcwxgpttd",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
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

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedHotels = [...hotels];

    if (option === "ratingHigh") {
      sortedHotels.sort((a, b) => b.rating - a.rating);
    } else if (option === "ratingLow") {
      sortedHotels.sort((a, b) => a.rating - b.rating);
    } else if (option === "priceHigh") {
      sortedHotels.sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
    } else if (option === "priceLow") {
      sortedHotels.sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
    }

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
                <div className="blue-background p-2 mb-4 text-white rounded-md">
                  Sort By:
                  <button
                    onClick={() => handleSortChange("ratingHigh")}
                    className={`sort-button btn ${sortOption === "ratingHigh" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  >
                    Rating (Highest First)
                  </button>
                  <button
                    onClick={() => handleSortChange("ratingLow")}
                    className={`sort-button btn ${sortOption === "ratingLow" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  >
                    Rating (Lowest First)
                  </button>
                  <button
                    onClick={() => handleSortChange("priceHigh")}
                    className={`sort-button btn ${sortOption === "priceHigh" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  >
                    Price (Highest First)
                  </button>
                  <button
                    onClick={() => handleSortChange("priceLow")}
                    className={`sort-button btn ${sortOption === "priceLow" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  >
                    Price (Lowest First)
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 grid-flow-dense">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
