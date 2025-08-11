import React, { useEffect, useState } from 'react';
import CorsesService from '../../services/courses.js';
import CourseCard from '../../components/CourseCard';
import Astropng from '../../assets/fons/astro.png';

import Modal from '../../components/Modal';

const TeacherCabinet = () => {
    // for Modal
    const [editingCourse, setEditingCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'React JS Asoslari',
            category: 'frontend',
            category_name: 'Frontend',
            category_color: '#3B82F6',
            description:
                "Ushbu kursda siz React kutubxonasi bilan zamonaviy veb-ilovalar yaratishni o'rganasiz.",
            short_description: 'React asoslari, hooklar, componentlar',
            tags: ['React', 'JavaScript', 'Frontend'],
            price: 1200000,
            students: 54,
            poster: Astropng,
            isDraft: false,
            createdAt: '2025-07-15T12:30:00Z',
            duration: '20 soat',
            difficulty: "O'rta",
            role: 'teacher',
        },
        {
            id: 2,
            title: 'Python Dasturlash Asoslari',
            category: 'backend',
            category_name: 'Backend',
            category_color: '#10B981',
            description:
                'Python dasturlash tili orqali siz backend va avtomatlashtirish loyihalarini bajara olasiz.',
            short_description: 'Python sintaksisi, funksiyalar, OOP',
            tags: ['Python', 'Backend', 'Django'],
            price: 950000,
            students: 77,
            poster: Astropng,
            isDraft: false,
            createdAt: '2025-06-10T08:00:00Z',
            duration: '15 soat',
            difficulty: 'Boshlang‘ich',
            role: 'teacher',
        },
        {
            id: 3,
            title: 'Full Stack Web Dasturlash',
            category: 'fullstack',
            category_name: 'Full Stack',
            category_color: '#F59E0B',
            description:
                "Frontend va backendni birgalikda o'rganing va to'liq tizimli web ilovalar yarating.",
            short_description: 'React, Node.js, MongoDB, Auth',
            tags: ['Fullstack', 'MERN', 'Web'],
            price: 1800000,
            students: 35,
            poster: Astropng,
            isDraft: true,
            createdAt: '2025-05-28T15:45:00Z',
            duration: '30 soat',
            difficulty: 'Qiyin',
            role: 'teacher',
        },
    ]);

    const handleAdd = () => {
        setIsPosting(true);
        setIsModalOpen(true);
    };

    // Kursni o‘chirish funksiyasi
    const handleDelete = (course) => {
        const isConfirmed = window.confirm(
            `Haqiqatan ham "${course.title}" kursini o‘chirmoqchimisiz?`
        );
        if (isConfirmed) {
            setCourses((prevCourses) =>
                prevCourses.filter((c) => c.id !== course.id)
            );
        }
    };

    // for Modal
    const handleEdit = (course) => {
        setIsPosting(false);
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleModalSave = (updatedCourse) => {
        if (isPosting) {
            // Post axios
            // setIsPosting(false);
        } else {
            // Edit
            setCourses((prev) =>
                prev.map((course) =>
                    course.id === updatedCourse.id ? updatedCourse : course
                )
            );
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Component unmount bo‘lganda scroll tiklash
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            // Modal ochilganda tarixga push qilamiz
            window.history.pushState({ modal: true }, '');
        }

        const handlePopState = () => {
            if (isModalOpen) {
                setIsModalOpen(false);

                // Modal yopilgandan keyin yana push qilib tarixni o‘rnida qoldiramiz
                window.history.pushState(null, '', window.location.pathname);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isModalOpen]);

    return (
        <div className="container mx-auto p-2  sm:p-6 lg:px-8">
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Yangi kurs +
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 gap-y-8">
                {courses.length ? (
                    courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <h1 className="col-span-full text-center text-red-600 font-medium">
                        Ma'lumot joylanmagan!
                    </h1>
                )}
            </div>

            <Modal
                isPost={isPosting}
                isOpen={isModalOpen}
                onClose={closeModal}
                course={editingCourse}
                onSave={handleModalSave}
            />
        </div>
    );
};

export default TeacherCabinet;
