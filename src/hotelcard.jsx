import React from 'react';

const HotelCard = ({ hotel }) => {
  console.log(hotel);
  let a=Math.round(hotel.avgCostPerNight,0);

  const ratingWord = (rating) => {
    if (rating >= 0 && rating < 1) return 'Poor';
    if (rating >= 1 && rating < 2) return 'Fair';
    if (rating >= 2 && rating < 3) return 'Decent';
    if (rating >= 3 && rating < 4) return 'Good';
    if (rating >= 4 && rating <= 5) return 'Very Good';
    return '';
  };

  return (
    <div className="border p-4 mb-2 flex">
      <div className="flex-1 p-2">
       <div>
      <img src={hotel.images[0]} alt={hotel.name} className=" w-full h-20 object-cover" />
      </div>
        <div className="grid grid-cols-2 gap-2 p-2">
          {hotel.images.slice(1, 5).map((img, index) => (
            <img key={index} src={img} alt={`${hotel.name}-${index}`} className="w-full h-20 object-cover mb-1" />
          ))}
          {/* <div>{hotel.location}</div> */}

          
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-bold color text-blue-500">{hotel.name}</h3>
        <p>{hotel.city}</p>
        <p className="text-blue-500 bg-blue-100">{ratingWord(hotel.rating)} {hotel.rating}</p>
        {/* <p>{hotel.price}</p> */}
        <p>{hotel.amenities}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Book Now</button>
          
          
          <p>Price:{a}</p>
      </div>
    </div>
  );
};

export default HotelCard;
