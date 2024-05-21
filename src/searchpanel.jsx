import React, { useState, useEffect } from 'react';

const SearchPanel = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/city?limit=50', {
        headers: {
          'projectId': 'tytpcwxgpttd',
        },
      });
      const data = await response.json();
      setCities(data.data.cities);
    };
    fetchCities();
  }, []);

  const handleSelect = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCitySelect(city);
  };

  return (
   
    <div className="bg-blue-500 flex justify-center   gradient-bg-tb">
      <select onChange={handleSelect} value={selectedCity} className="border p-2 color-blue text-blue-500">
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city._id} value={city.cityState}>
            {city.cityState.split(',')[0]}          
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchPanel;
