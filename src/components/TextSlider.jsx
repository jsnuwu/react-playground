import { useState, useEffect, useRef } from "react";
import "../styles/TextSlider.css";

const TextSlider = ({
  texts = [],
  interval = 2500,
  className = "tipText-container",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  const timerRef = useRef(null);

  const showNextText = () => {
    setFadeState("fadeOut");

    setTimeout(() => {
      const nextIndex = Math.floor(Math.random() * texts.length);
      setCurrentIndex(nextIndex);
      setFadeState("fadeIn");
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(showNextText, interval);
    return () => clearInterval(timerRef.current);
  }, [texts, interval]);

  return (
    <div className={className}>
      <span className={`tipText ${fadeState}`}>{texts[currentIndex]}</span>
    </div>
  );
};

export default TextSlider;
