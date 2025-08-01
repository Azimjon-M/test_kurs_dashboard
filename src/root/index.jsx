import React from 'react';
import { Outlet } from 'react-router-dom';
import Asidebar from '../components/Asidebar';

const Root = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="flex flex-1 relative">
            <Asidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
                className={`flex-1 ${
                    isOpen ? 'ml-[200px]' : 'ml-[60px]'
                } transition-[margin] duration-300 ease-in-out`}
                onClick={() => isOpen && setIsOpen(false)}
            >
                <Outlet />
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Root;
