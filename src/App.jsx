import React, { useRef, useState } from "react";
import SplashCursor from "./components/SplashCursor";
import Headline from "./components/Headline";
import Bento from "./components/Bento";
import Nav from "./components/Nav";
import TeamPlanning from "./components/TeamPlanning";

function App() {
  const containerRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const items = [
    { label: "uno", href: "#" },
    { label: "dos", href: "#" },
    { label: "tres", href: "#" },
  ];

  const handleSearch = () => {
    if (!searchText) return;
    console.log("Search clicked:", searchText);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "500vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5vh",
        backgroundColor: "#0b0c1b",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Headline */}
      <div
        ref={containerRef}
        style={{
          zIndex: 2,
          textAlign: "center",
          marginBottom: "2vh",
        }}
      >
        <Headline
          label="HHHEEEAAADDDLLLIIINNNEEE"
          className="headline-demo"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />
      </div>

      {/* Navigation */}
      <div
        style={{
          marginBottom: "5vh",
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <Nav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Search Bar */}
      <div
        style={{
          marginBottom: "5vh",
          width: "90%",
          maxWidth: "600px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          style={{
            flex: 1,
            padding: "12px 20px",
            borderRadius: "30px",
            border: "2px solid #444",
            backgroundColor: "#1a1b2a",
            color: "#fff",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
          onBlur={(e) => (e.target.style.borderColor = "#444")}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#6c63ff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
        >
          Search
        </button>
      </div>

      {/* Bento */}
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          zIndex: 2,
        }}
      >
        <Bento />
      </div>

      {/* Team Planner */}
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          zIndex: 2,
        }}
      >
        <TeamPlanning />
      </div>

      {/* Splash Cursor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.8,
        }}
      >
        <SplashCursor />
      </div>
    </div>
  );
}

export default App;
