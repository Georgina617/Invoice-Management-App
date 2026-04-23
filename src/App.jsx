import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* 🔥 Sidebar (always fixed) */}
      <Sidebar dark={dark} setDark={setDark} />

      {/* 🔥 Main Content */}
      <main
        className={`
          flex-1 flex justify-center
          px-4 md:px-6
          
          /* 🔥 MOBILE TOP SPACING (navbar height) */
          pt-[80px] md:pt-10
          
          /* 🔥 DESKTOP LEFT OFFSET (sidebar width) */
          md:ml-[72px]

          transition-colors duration-300
          ${dark ? 'bg-[#141625]' : 'bg-[#f8f8fb]'}
        `}
      >
        <Home dark={dark} />
      </main>
    </div>
  );
}

export default App;
