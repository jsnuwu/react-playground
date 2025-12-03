import React, { useRef } from "react";
import SplashCursor from "./pages/SplashCursor";
import Headline from "./pages/Headline";
import Bento from "./pages/Bento";
import TeamPlanning from "./pages/TeamPlanning";
import StatPage from "./pages/StatPage";
import { PlayerProvider } from "./Data/PlayerContext";
function App() {
  const containerRef = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "auto",
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
          label="League Of Legends @adesso"
          className="headline-demo"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />
      </div>
      <PlayerProvider>
        {/* Bento */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            zIndex: 2,
          }}
        >
          <Bento />
        </div>

        {/* Stats */}
        <div style={{ width: "100%", minHeight: "auto" }}>
          {" "}
          <StatPage />{" "}
        </div>

        <div
          ref={containerRef}
          style={{
            zIndex: 2,
            textAlign: "center",
            marginBottom: "2vh",
          }}
        >
          <Headline
            label="Assign the lanes"
            className="headline-demo"
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            radius={100}
            falloff="linear"
          />
        </div>

        {/* Team Planner */}
        <div
          style={{
            width: "100%",
            maxWidth: "auto",
            zIndex: 2,
          }}
        >
          <TeamPlanning />
        </div>
      </PlayerProvider>

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
