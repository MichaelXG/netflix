const getLabelProps = (rating) => {
  if (rating >= 8) return { label: "+12", bgColor: "#dc3545" };
  if (rating >= 6) return { label: "+10", bgColor: "#fbbf24" };
  return { label: "L", bgColor: "#28a745" };
};

const RatingBadge = ({ rating = 0, className = "" }) => {
  const { label, bgColor } = getLabelProps(rating);

  //  se tiver parameto no className usalo semnao usao o que esta nele
  className = className || "absolute top-2 left-2 text-gray-800 py-1 px-2 rounded-full";
  // se o className estiver vazio, usar a cor padrão  

  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor: bgColor,
        fontSize: "0.8em",
        fontWeight: "bold",
      }}
    >
      {label}
    </div>
  );
};

export default RatingBadge;
