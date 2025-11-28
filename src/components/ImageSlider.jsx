import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ImageSlider = ({ images, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
const nextIndex = Math.floor(Math.random() * images.length);

      if (imgRef.current) {

        gsap.to(imgRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => {
            setCurrentIndex(nextIndex);

            gsap.set(imgRef.current, { y: 10 });

            gsap.to(imgRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power1.out",
            });
          },
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, images, interval]);

  return (
    <img
      ref={imgRef}
      src={images[currentIndex]}
      alt="slideshow"
      style={{
        width: "75%",
        height: "auto",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        display: "block",
      }}
    />
  );
};

export default ImageSlider;
