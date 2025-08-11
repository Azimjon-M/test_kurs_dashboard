import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export default function CourseModal({
    isPost,
    isOpen,
    onClose,
    onSave,
    initialData,
}) {
    const [preview, setPreview] = useState('');

    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',
            category_name: initialData?.category_name || '',
            description: initialData?.description || '',
            short_description: initialData?.short_description || '',
            tags: initialData?.tags || '',
            price: initialData?.price || '',
            difficulty: initialData?.difficulty || '',
            poster: initialData?.poster || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            category_name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            short_description: Yup.string().required('Required'),
            tags: Yup.string().required('Required'),
            price: Yup.number().required('Required'),
            difficulty: Yup.string()
                .oneOf(['beginner', 'medium', 'master'])
                .required('Required'),
        }),
        onSubmit: (values) => {
            onSave(values);
        },
    });

    useEffect(() => {
        if (formik.values.poster instanceof File) {
            const fileReader = new FileReader();
            fileReader.onload = () => setPreview(fileReader.result);
            fileReader.readAsDataURL(formik.values.poster);
        } else {
            setPreview(formik.values.poster);
        }
    }, [formik.values.poster]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Kursni Tahrirlash</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        placeholder="Title"
                        className="input w-full"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <input
                        name="category_name"
                        placeholder="Category"
                        className="input w-full"
                        onChange={formik.handleChange}
                        value={formik.values.category_name}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="textarea w-full"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    ></textarea>
                    <textarea
                        name="short_description"
                        placeholder="Short Description"
                        className="textarea w-full"
                        onChange={formik.handleChange}
                        value={formik.values.short_description}
                    ></textarea>
                    <input
                        name="tags"
                        placeholder="Tags (comma separated)"
                        className="input w-full"
                        onChange={formik.handleChange}
                        value={formik.values.tags}
                    />
                    <input
                        name="price"
                        placeholder="Price"
                        type="number"
                        className="input w-full"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />

                    <select
                        name="difficulty"
                        className="select w-full"
                        onChange={formik.handleChange}
                        value={formik.values.difficulty}
                    >
                        <option value="">Select Difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="medium">Medium</option>
                        <option value="master">Master</option>
                    </select>

                    <input
                        name="poster"
                        type="file"
                        accept="image/*"
                        className="file-input w-full"
                        onChange={(e) =>
                            formik.setFieldValue(
                                'poster',
                                e.currentTarget.files[0]
                            )
                        }
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Poster Preview"
                            className="w-full h-48 object-cover rounded"
                        />
                    )}

                    <button
                        type="submit"
                        className="btn bg-blue-600 text-white w-full"
                    >
                        {isPost ? 'Post' : 'Edit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
