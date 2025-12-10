import React, { useState, useEffect, useRef, useMemo } from "react";
import gifSrc from "../assets/EasterEgg/EasterEgg.gif";
import "../styles/easteregg.css"

const normalizeKey = (k) => (typeof k === "string" ? k.toLowerCase() : k);

const EasterEgg = ({ key1 = "shift", key2 = "f", duration = 200 }) => {
  const [visible, setVisible] = useState(false);
  const pressed = useRef(new Set());
  const timeoutRef = useRef(null);

  const key1Norm = useMemo(() => normalizeKey(key1), [key1]);
  const key2Norm = useMemo(() => normalizeKey(key2), [key2]);

  useEffect(() => {
    const handleKeyDown = (e) => {

        const k = normalizeKey(e.key);
      pressed.current.add(k);

      if (pressed.current.has(key1Norm) && pressed.current.has(key2Norm)) {
        if (!visible) {
          setVisible(true);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setVisible(false);
            timeoutRef.current = null;
          }, duration);
        }
      }
    };

    const handleKeyUp = (e) => {
      const k = normalizeKey(e.key);
      pressed.current.delete(k);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [key1Norm, key2Norm, duration]);

  const src = gifSrc || defaultEgg;

  return (
    <>
      {visible && (
        <>
          <img
            className="easteregg-img left mirror"
            src={src}
            alt="Easter Egg left"
            draggable={false}
          />
          <img
            className="easteregg-img right"
            src={src}
            alt="Easter Egg right"
            draggable={false}
          />
        </>
      )}
    </>
  );
};

export default EasterEgg;
