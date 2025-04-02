import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Trang không tồn tại</h2>
            <p className="text-gray-600 mt-2">Có vẻ như bạn đã nhập sai địa chỉ hoặc trang này không còn tồn tại.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition duration-300">
                Quay lại trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
