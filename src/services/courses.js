import axiosInstance from './index';

const ep = 'manage/courses/';

const get = () => {
    return axiosInstance.get(ep);
};

const CorsesService = { get };

export default CorsesService;
