import TeacherCabinet from '../pages/TeacherCabinet';
import Statistics from '../pages/Statistics';
import Billing from '../pages/Billing';
import CardDetail from '../pages/CardDetail';

const routes = [
    {
        id: 1,
        titleID: 'Teacher dashboard',
        path: '/teacher-cabinet',
        element: TeacherCabinet,
        role: ['teacher'],
    },
    {
        id: 1.1,
        titleID: 'Teacher dashboard',
        path: '/teacher-cabinet/:id',
        element: CardDetail,
        role: ['teacher'],
    },
    {
        id: 2,
        titleID: 'Teacher dashboard',
        path: '/statistics',
        element: Statistics,
        role: ['teacher'],
    },
    {
        id: 3,
        titleID: 'Teacher dashboard',
        path: '/billing',
        element: Billing,
        role: ['teacher'],
    },
];

export default routes;
