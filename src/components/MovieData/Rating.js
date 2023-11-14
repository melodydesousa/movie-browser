import { FaStar, FaStarHalf } from "react-icons/fa";

export default function Rating({ note, count }) {
  const stars = Array.from({ length: 10 }, (element, index) => {
    let ratingValue = Math.round(note) + 0.5;
    return (
      <span key={index}>
        {
          note >= index + 1 ? (
            <FaStar style={{ color: "#ffd966" }} />
          ) : note >= ratingValue ? (
            <FaStarHalf style={{ color: "#ffd966" }} />
          ) : (
            <FaStar style={{ color: "#ffd966", opacity: "0.2" }} />
          )
        }
      </span>
    );
  }
  );

  return (
    <>
      <div className="rating">{stars}</div>
      <p style={{ fontSize: "small", margin: 0 }}>({count} reviews)</p>
    </>
  );
};

