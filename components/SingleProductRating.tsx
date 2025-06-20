// *********************
// Role: Rating stars component for single product page
// Name: SingleProductRating.tsx
// Updated by ChatGPT: Optimized rendering and logic
// *********************

import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SingleProductRating = ({
  rating,
  reviewsCount = 3,
}: {
  rating: number;
  reviewsCount?: number;
}) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? "full" : "empty"
  );

  return (
    <div className="flex text-2xl items-center max-[500px]:justify-center">
      {stars.map((type, index) =>
        type === "full" ? (
          <AiFillStar key={index} className="text-custom-yellow" />
        ) : (
          <AiOutlineStar key={index} className="text-custom-yellow" />
        )
      )}
      <span className="text-xl ml-1">({reviewsCount} reviews)</span>
    </div>
  );
};

export default SingleProductRating;
