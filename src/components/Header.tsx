import React from 'react';
import { FaRobot } from 'react-icons/fa';

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName, onLoginClick, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 flex items-center justify-center text-[#0074D9]">
              <img 
                src="/logo.png" 
                alt="My Impact Machine Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <FaRobot className="h-6 w-6 fallback-icon hidden" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-[#0074D9]">My Impact Machine</h1>
          </div>
          
          <nav className="flex space-x-4">
            <a href="/dashboard" className="text-gray-700 hover:text-[#0074D9] px-3 py-2 rounded-md transition-colors">
              Dashboard
            </a>
            <a href="/new-project" className="text-gray-700 hover:text-[#0074D9] px-3 py-2 rounded-md transition-colors">
              New Project
            </a>
            <button className="text-gray-700 hover:text-[#0074D9] px-3 py-2 rounded-md transition-colors">
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 