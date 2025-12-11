import React, { useEffect, useState } from "react";

const FooterBanner = ({ intervalMs = 3000, maxWidth = "1200px" }) => {
  const images = [
    "/images/Ad.png",
    "/images/p1.jpg",
    "/images/p2.jpg",
    "/images/p3.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = previous

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [index]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          position: "relative",
          overflow: "hidden",
          borderRadius: 10,
          aspectRatio: "16/9",
          backgroundColor: "#fff",
        }}
      >
        {images.map((src, i) => (
          <img
            key={src + "-" + i}
            src={src}
            alt={`slide-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === index ? 1 : 0,
              transform:
                i === index
                  ? "translateX(0)"
                  : `translateX(${direction === 1 ? "-20px" : "20px"})`,
              transition: "opacity 600ms ease, transform 600ms ease",
            }}
          />
        ))}

        {/* Arrow Left */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "45%",
            transform: "translateX(-100%)",
            zIndex: 20,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ‹
        </button>

        {/* Arrow Right */}
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "55%",
            transform: "translateX(0%)",
            zIndex: 20,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ›
        </button>

        {/* Dot Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%) translateY(40px)",
            display: "flex",
            gap: 8,
          }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                cursor: "pointer",
                background: i === index ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
