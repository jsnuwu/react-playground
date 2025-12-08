import React, { useRef } from "react";
import SplashCursor from "./pages/SplashCursor";
import Headline from "./pages/Headline";
import Bento from "./pages/Bento";
import TeamPlanning from "./pages/TeamPlanning";
import StatPage from "./pages/StatPage";
import { PlayerProvider } from "./Data/PlayerContext";
import AddNewPlayer from "./pages/AddNewPlayer";
import EasterEgg from "./components/EasterEgg";
import BackToTop from "./components/BackToTopButton";

function App() {
  const containerRef = useRef(null);
  const statPageRef = useRef(null);

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
          marginTop: "2vh",
          marginBottom: "4vh",
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
        <div style={{ width: "100%", minHeight: "auto", marginBottom: "14vh" }}>
          {" "}
          <StatPage ref={statPageRef} />{" "}
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
            marginBottom: "10vh",
          }}
        >
          <TeamPlanning />
        </div>

        <Headline
          label="Add new Player"
          className="headline-demo"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />

        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "900px",
            zIndex: 2,
          }}
        >
          <AddNewPlayer />
        </div>
      </PlayerProvider>

      {/* EasterEgg */}
      <EasterEgg
        gifSrc="/assets/meme.gif"
        key1="Shift"
        key2="g"
        duration={2500}
      />

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

      <div
        style={{
          width: "100%",
          minHeight: "auto",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "5vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* BackToTopButton */}
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
