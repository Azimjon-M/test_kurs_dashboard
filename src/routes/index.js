import TeacherCabinet from '../pages/TeacherCabinet';

const routes = [
    {
        id: 1,
        titleID: 'Teacher dashboard',
        path: '/teacher-cabinet',
        element: TeacherCabinet,
        role: ['teacher'],
    },
];

export default routes;
