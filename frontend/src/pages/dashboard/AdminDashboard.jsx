import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';

const AdminDashboard = () => {
    const navItems = [
        { path: '/dashboard/admin', label: 'Bảng điều khiển Admin' },
        { path: "/dashboard/add-product", label: 'Thêm sản phảm' },
        { path: "/dashboard/manage-products", label: 'Quản lý sản phẩm' },
        { path: "/dashboard/users", label: 'Quản lý người dùng' },
        { path: "/dashboard/manage-orders", label: 'Quản lý đơn hàng' },
      
      ]

    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const nav = useNavigate()
    
    const handleLogout = async () => {
      try {
        await logoutUser().unwrap();
        dispatch(logout());
        alert("Đăng xuất thành công")
        nav("/")
      } catch (error) {
        console.error("faild to logout", error)
      }
    }
  return (
    <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
    <div>
      <div className='nav__logo'>
        <Link to={"/"}>Lebaba <span>.</span></Link>
        <p className='text-xs italic'>Bảng điều khiển của ADMIN</p>
      </div>
      <hr className='mt-5' />
      <ul className='space-y-5 mt-5'>
        {
          navItems.map((item) => (
            <li key={item.path}>
              <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-bold" : 'text-black'} end to={item.path}>
                {item.label}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
    <div className='mb-3'>
      <hr className='mb-3' />
      <button
        onClick={handleLogout}
        className='text-white bg-primary font-medium px-5 py-1 rounded-sm'>Đăng xuất</button>
    </div>
  </div>
  )
}

export default AdminDashboard
