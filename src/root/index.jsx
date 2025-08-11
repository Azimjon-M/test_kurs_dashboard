import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Asidebar from '../components/Asidebar';
import Navbar from '../components/Navbar';

const Root = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsOpen(width >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-1 relative">
            <Asidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
                className={`flex-1 ${
                    isOpen ? 'sm:ml-[200px]' : 'sm:ml-[60px]'
                } ml-[60px] transition-[margin] duration-300 ease-in-out`}
                onClick={() => isOpen && setIsOpen(false)}
            >
                <div>
                    <Navbar />
                    <Outlet />
                </div>
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
