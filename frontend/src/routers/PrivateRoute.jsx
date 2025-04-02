import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
// Component PrivateRoute dùng để bảo vệ các route, chỉ cho phép người dùng có quyền phù hợp truy cập.
const PrivateRoute = ({ children, role }) => {
    // Lấy thông tin user từ Redux store (state.auth).
    const { user } = useSelector((state) => state.auth);

    // Lấy thông tin vị trí hiện tại (current location) của route.
    const location = useLocation();

    // Nếu user chưa đăng nhập (user = null), hiển thị thông báo và chuyển hướng đến trang login.
    if (!user) {
        Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Bạn cần đăng nhập để truy cập trang này!",
        });
        return (
            <Navigate
                to="/login" // Chuyển hướng đến trang login.
                state={{ from: location }} // Lưu vị trí ban đầu để sau khi đăng nhập có thể quay lại.
                replace
            />
        );
    }

    // Nếu route yêu cầu vai trò (role) và user không có vai trò phù hợp, hiển thị thông báo và chuyển hướng.
    if (role && user.role !== role) {
        alert("Bạn không có quyền truy cập trang này, vui lòng đăng nhập tài khoản admin");
        return (
            <Navigate
                to="/" // Chuyển hướng đến trang login.
                state={{ from: location }} // Lưu vị trí ban đầu.
                replace
            />
        );
    }

    // Nếu tất cả điều kiện đều hợp lệ, render nội dung của route (children).
    return children;
};

export default PrivateRoute;
