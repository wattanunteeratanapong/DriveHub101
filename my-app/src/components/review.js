import React, { useState, useEffect } from "react";

function RatingForm() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const path = window.location.pathname;
  const parts = path.split("/");
  const licensePlate = parts[parts.length - 1];

  useEffect(() => {
    handleGetReview();
  }, []);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleStarHover = (index) => {
    setHoveredRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleGetReview = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get_review_of_license?license=` + licensePlate);
      if (!response.ok) {
        throw new Error("Failed to fetch review");
      }

      const data = await response.json();
      if (data && data.Reviews) {
        const reviewsArray = Object.values(data.Reviews);
        setReviews(reviewsArray);
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      token,
      license: licensePlate,
      rating: rating,
      comments: comments,
    };
    console.log("Data to be sent:", requestData);
    try {
      const response = await fetch("http://localhost:8000/make_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      console.log("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>

      <p className="text-5xl mt-8 ml-10 " style={{ marginLeft: "48%", fontSize: "50px" }}>
        &#11088;{` ${rating}`}
      </p>
      <div className="rating" style={{ marginLeft: "47%", marginTop: "2%" }}>
        <input type="number" name="rating" hidden value={rating} />
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`bx ${index < (hoveredRating || rating) ? "bxs" : "bx"
              }-star star`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={() => handleStarLeave()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              width: "6%",
              scale: "200%",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
      <textarea
        name="opinion"
        cols="30"
        rows="5"
        placeholder="ความคิดเห็นของคุณ..."
        className="p-7 rounded-xl border-2"
        style={{ marginLeft: "30%", marginTop: "4%", width: "40%" }}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      ></textarea>
      <div className="btn-group text-center mt-4">
        <button
          type="button"
          className="bt submit bg-blue-500 rounded-xl  text-white"
          style={{
            paddingLeft: "3%",
            paddingRight: "3%",
            marginLeft: "50%",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
          onClick={handleSubmit}
        >
          ยืนยัน
        </button>
      </div>
      <div className="box-container" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {reviews.length > 0 &&
          reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="box" style={{ border: "2px solid #ccc", borderRadius: "10px", padding: "10px", marginBottom: "10px", width: "calc(33.33% - 20px)", maxWidth: "400px", marginRight: "20px", marginTop: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <p className="box" style={{ border: "none", lineHeight: "25px", width: "100%", height: "100px", margin: 0 }}>
                  Reviewer: {review.Reviewer}
                </p>
                <p className="box" style={{ border: "none", lineHeight: "25px", width: "100%", height: "100px", margin: 0 }}>
                  Rating: {review.Stars} &#9733;
                </p>
                <p className="box" style={{ border: "none", lineHeight: "25px", width: "100%", height: "100px", margin: 0 }}>
                  Comments: {review.Comments}
                </p>
              </div>
            </div>
          ))}
        {reviews.length === 0 && <p>No reviews yet</p>}
      </div>
    </div>
  );
}

export default RatingForm;
