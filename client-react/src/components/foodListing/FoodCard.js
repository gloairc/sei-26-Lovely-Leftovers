import React, { useState } from "react";

// import "./style.css";

const FoodCard = ({ data }) => {
  const [formData, setFormData] = useState({
    title: "Food item 1",
    quantity: 5,
    category: "Canned stuff",
    isHalal: true,
    isVegetarian: false,
    description: "This is a can of food",
    bestBefore: "10/03/2666",
    collectionAddress: "Middle of nowhere Road",
    contactName: "Some Guy",
    contactNumber: "666666",
  });

  return (
    <div>
      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spinach-1580403191.jpg?crop=1xw:0.998589562764457xh;center,top&resize=120:*"></img>
      <div>
        <h3>
          {formData.title} ({formData.quantity})
        </h3>
      </div>
      <div>
        <p>Best Before : {formData.bestBefore}</p>
      </div>
    </div>
  );
};

export default FoodCard;
