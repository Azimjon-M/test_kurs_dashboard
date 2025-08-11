import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    console.log(path);

    return (
        <div className="flex justify-start items-center px-4 py-[18px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Kurslarim
            </h1>
        </div>
    );
};

export default Navbar;
