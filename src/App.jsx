import React, { useRef } from 'react';
import SplashCursor from './components/SplashCursor';
import Headline from './components/Headline';
import Bento from './components/Bento';

function App() {
  const containerRef = useRef(null);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>

      {/* Überschrift */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '10%',       
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          textAlign: 'center', 
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

        {/* Bento  */}
        <div  style={{
          position: 'absolute',
          top: '20%',          
          left: '60%',
          transform: 'translateX(-50%)',
          width: '80%',        
          zIndex: 2,
        }}> 
          <Bento />
        </div>

      {/* Splash Cursor */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.8
      }}>
        <SplashCursor />
      </div>
    </div>
  );
}

export default App;
