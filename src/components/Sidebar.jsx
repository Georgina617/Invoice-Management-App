import React from 'react';
import logo from '../assets/oval.svg';
import user from '../assets/user.svg';

const Sidebar = ({ dark, setDark }) => {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] flex-col bg-[#373B53] rounded-r-[20px] overflow-hidden z-[1000]">
        {/* LOGO */}
        <div className="h-[103px] bg-gradient-to-b from-[#7C5DFA] to-[#9277FF] flex items-center justify-center relative rounded-br-[20px]">
          <div className="absolute bottom-0 w-full h-1/2 bg-[#9277FF] rounded-tl-[20px]" />
          <img src={logo} alt="logo" className="w-7 h-7 relative z-10" />
        </div>

        {/* BOTTOM */}
        <div className="mt-auto flex flex-col items-center pb-5">
          {/* TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="text-[#7C5DFA] hover:opacity-80 transition mb-4"
          >
            {dark ? (
              <svg width="20" height="20" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor">
                <path d="M21 12.79A9 9 0 0111.21 3c0 .45.05.89.13 1.32A7 7 0 1019.68 19c.43.08.87.13 1.32.13z" />
              </svg>
            )}
          </button>

          <div className="w-full border-t border-[#494E6E]" />

          <div className="pt-4">
            <img src={user} alt="user" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="flex md:hidden fixed top-0 left-0 w-full h-[72px] bg-[#373B53] items-center justify-between px-4 z-[1000]">
        <div className="w-[72px] h-[72px] bg-gradient-to-b from-[#7C5DFA] to-[#9277FF] flex items-center justify-center relative rounded-br-[20px]">
          <div className="absolute bottom-0 w-full h-1/2 bg-[#9277FF] rounded-tl-[20px]" />
          <img src={logo} alt="logo" className="w-7 h-7 relative z-10" />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setDark(!dark)} className="text-[#7C5DFA]">
            {dark ? (
              <svg width="20" height="20" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor">
                <path d="M21 12.79A9 9 0 0111.21 3c0 .45.05.89.13 1.32A7 7 0 1019.68 19c.43.08.87.13 1.32.13z" />
              </svg>
            )}
          </button>

          <div className="h-8 w-[1px] bg-[#494E6E]" />

          <img src={user} alt="user" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
