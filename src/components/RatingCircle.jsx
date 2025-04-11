import { useEffect, useRef } from "react";

const RatingCircle = ({ value = 0, size = 55 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof value !== "number") return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const percent = Math.max(0, Math.min(value, 100)); // garante de 0 a 100
    const radius = canvas.width / 2;
    const startAngle = 1.5 * Math.PI;
    const endAngle = startAngle + (percent / 100) * 2 * Math.PI;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // fundo
    context.beginPath();
    context.arc(radius, radius, radius - 5, 0, Math.PI * 2);
    context.lineWidth = 5;
    context.strokeStyle = "#423d0f";
    context.stroke();

    // cor do progresso
    let progressColor = "#d2d531";
    if (percent >= 70) progressColor = "#28a745";
    else if (percent <= 30 && percent > 0) progressColor = "#dc3545";
    else if (percent === 0) progressColor = "#888";

    context.beginPath();
    context.arc(radius, radius, radius - 5, startAngle, endAngle, false);
    context.lineWidth = 5;
    context.strokeStyle = progressColor;
    context.stroke();

    // texto
    context.font = "bold 14px Arial";
    context.fillStyle = "#fff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${Math.round(percent)}%`, radius, radius);
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
};

export default RatingCircle;
