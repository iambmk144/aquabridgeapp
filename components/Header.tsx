import React from 'react';

const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 33C10.8203 33 5.25 27.4297 5.25 20.25C5.25 14.4375 12.375 4.5 18 3C23.625 4.5 30.75 14.4375 30.75 20.25C30.75 27.4297 25.1797 33 18 33Z" className="fill-sky-500"/>
        <path d="M18 33C16.3359 33 15.1875 27.1875 15.1875 20.25C15.1875 13.3125 16.3359 3 18 3C19.6641 3 20.8125 13.3125 20.8125 20.25C20.8125 27.1875 19.6641 33 18 33Z" className="fill-sky-700"/>
        <path d="M5.33594 21.375C10.5469 18.0469 25.4531 18.0469 30.6641 21.375C29.4844 28.0781 24.3281 33 18 33C11.6719 33 6.51562 28.0781 5.33594 21.375Z" className="fill-sky-600"/>
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
  

interface HeaderProps {
    onLogout: () => void;
    isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isAdmin }) => {
  return (
    <header className="bg-white border-b border-slate-200 flex-shrink-0 shadow-sm z-20">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <LogoIcon />
            <div>
                <h1 className="text-lg font-bold text-gray-800">Aqua Bridge</h1>
                <p className="text-sm text-gray-500">{isAdmin ? 'Welcome, Admin!' : 'Welcome, Farmer!'}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
                <NotificationIcon />
                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <button onClick={onLogout} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Logout">
                <LogoutIcon />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;