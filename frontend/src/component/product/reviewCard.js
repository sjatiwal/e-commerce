import React from "react";

import { Rating } from "@material-ui/lab";

function ReviewCard({ review }) {
  const options = {
    value: review.rating,
    precision: 0.5,
    size: "large",
    readOnly: true,
  };

  return (
    <div className="reviewCard">
      <div>{review.name}</div>
      <Rating {...options} />
      <span className="reviewCard-span">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
