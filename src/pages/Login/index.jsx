import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginService from '../../services/login.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Kamida 3ta belgi')
                .required('Foydalanuvchi nomi majburiy'),
            password: Yup.string()
                .min(6, 'Kamida 6 ta belgi')
                .required('Parol majburiy'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setError('');
            try {
                const response = await LoginService.post(values);
                if (response.data.access && response.data.success) {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem(
                        'refresh_token',
                        response.data.refresh
                    );
                    localStorage.setItem(
                        'role',
                        JSON.stringify(response.data.user.role)
                    );
                    navigate('/teacher-cabinet');
                } else {
                    setError('Kirishda xatolik');
                }
            } catch (err) {
                setError(err.response.data.error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex-1 bg-gray-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        Hisobga kirish
                    </h2>
                    <br />
                    {error && (
                        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700"
                                htmlFor="username"
                            >
                                Foydalanuvchi nomi
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
                                    placeholder="foydalanuvchi123"
                                />
                                <FaUser className="absolute left-3 top-4 text-gray-400" />
                            </div>
                            {formik.touched.username &&
                                formik.errors.username && (
                                    <div className="text-sm text-red-500 mt-1">
                                        {formik.errors.username}
                                    </div>
                                )}
                        </div>

                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700"
                                htmlFor="password"
                            >
                                Parol
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
                                    placeholder="••••••••"
                                />
                                <FaLock className="absolute left-3 top-4 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute right-3 top-4 text-gray-400 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <div className="text-sm text-red-500 mt-1">
                                        {formik.errors.password}
                                    </div>
                                )}
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                            disabled={formik.isSubmitting}
                        >
                            Kirish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
