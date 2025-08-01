import axiosInstance from './index';

const ep = 'manage/login/';

const post = (item) => {
    return axiosInstance.post(ep, item);
};

const LoginService = { post };

export default LoginService;
