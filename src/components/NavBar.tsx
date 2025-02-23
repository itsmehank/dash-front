import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <NavLink
            to="/target"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-bold border-b-2 border-white pb-1'
                : 'text-gray-300 hover:text-white transition-colors'
            }
          >
            Target
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/single"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-bold border-b-2 border-white pb-1'
                : 'text-gray-300 hover:text-white transition-colors'
            }
          >
            Single
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dynamic"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-bold border-b-2 border-white pb-1'
                : 'text-gray-300 hover:text-white transition-colors'
            }
          >
            Dynamic
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;