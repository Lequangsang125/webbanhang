import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { logout } from '../../redux/features/auth/authSlice'

const navItems = [
  { path: '/dashboard', label: 'Bảng điều khiển người dùng' },
  { path: "/dashboard/orders", label: 'Đơn hàng' },
  { path: "/dashboard/payments", label: 'Thanh toán' },
  { path: "/dashboard/profile", label: 'Trang cá nhân' },
  { path: "/dashboard/reviews", label: 'Đánh giá sản phẩm' },
]

const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert("Logout successful")
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
          <p className='text-xs italic'>Bảng điều khiển người dùng</p>
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

export default UserDashboard
