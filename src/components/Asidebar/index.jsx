import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaBars,
    FaTimes,
    FaBook,
    FaSignOutAlt,
    FaChartBar,
    FaCalculator,
} from 'react-icons/fa';

const menuItems = [
    { path: '/teacher-cabinet', label: 'Kurslar', icon: <FaBook /> },
    { path: '/statistics', label: 'Statistika', icon: <FaChartBar /> },
    { path: '/billing', label: 'Hisob-kitob', icon: <FaCalculator /> },
];

const Asidebar = ({ isOpen, setIsOpen }) => {
    const handleLogout = () => {
        console.log('Log out clicked');
        // logout funksiyangni shu yerda yoz:
        // masalan: localStorage.clear(), navigate('/login') va h.k.
    };

    return (
        <aside
            className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
            transition-all duration-300 ease-in-out 
            ${isOpen ? 'w-[200px] items-start' : 'w-[60px] items-center'} 
            fixed top-0 left-0 z-40 overflow-hidden`}
        >
            {/* Toggle Button */}
            <div
                className={`flex items-center h-16 border-b border-gray-200 dark:border-gray-700 w-full px-2 ${
                    isOpen ? 'justify-end' : 'justify-center'
                }`}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 dark:text-gray-200 text-xl mx-2"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Menu Items */}
            {isOpen && (
                <nav className="flex flex-col gap-2 p-4 w-full">
                    {menuItems.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 w-full
                                ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800'
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span className="whitespace-nowrap">
                                {item.label}
                            </span>
                        </NavLink>
                    ))}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 w-full text-[red] hover:bg-red-100 dark:hover:bg-red-900"
                    >
                        <FaSignOutAlt />
                        <span className="whitespace-nowrap">Chiqish</span>
                    </button>
                </nav>
            )}
        </aside>
    );
};

export default Asidebar;
