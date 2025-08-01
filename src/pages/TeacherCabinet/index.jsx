import React from 'react';
import CorsesService from '../../services/courses.js';

const TeacherCabinet = () => {
    const handleClick = async () => {
        try {
            const res = await CorsesService.get();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Kurslarim</h1>
            <button
                className="btn bg-[blue] text-white p-2 "
                onClick={handleClick}
            >
                Get ...
            </button>
        </div>
    );
};

export default TeacherCabinet;
