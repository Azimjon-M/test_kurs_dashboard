import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CourseCard = ({ course, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition duration-200 flex flex-col">
            {/* Poster */}
            <div className="w-full aspect-video overflow-hidden">
                <img
                    src={course.poster}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Category + Actions */}
                <div className="flex justify-between items-start">
                    <span
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: course.category_color }}
                    >
                        {course.category_name}
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit?.(course)}
                            className="p-2 cursor-pointer rounded hover:bg-gray-100 transition"
                            title="Tahrirlash"
                        >
                            <FiEdit className="text-gray-600 text-lg" />
                        </button>
                        <button
                            onClick={() => onDelete?.(course)}
                            className="p-2 cursor-pointer rounded hover:bg-red-100 transition"
                            title="O‘chirish"
                        >
                            <FiTrash2 className="text-red-500 text-lg" />
                        </button>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {course.title}
                </h2>

                {/* Short Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {course.short_description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>👤 {course.students} talaba</span>
                    <span>⏱ {course.duration}</span>
                    <span>⭐️ {course.difficulty}</span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-blue-600 font-bold text-lg">
                        {course.price ? `${course.price} so'm` : 'Bepul'}
                    </span>
                    <button className="px-4 py-2 cursor-pointer text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Batafsil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
