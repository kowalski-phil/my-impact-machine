import React from 'react';
import { FaLinkedin, FaHeart, FaRobot } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            © Bytes & Budgets {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500 mx-1" />
            <span>by</span>
            <FaRobot className="text-primary ml-1" />
            <span className="ml-1">Cursor AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 