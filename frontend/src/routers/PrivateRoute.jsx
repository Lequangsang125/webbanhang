import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children, role}) => {
    const { user} = useSelector((state) => state.auth);
   const  location = useLocation();
   if(!user){
    alert("Bạn cần đăng nhập để truy cập trang này")
    return <Navigate to="/login" state={{from: location}} replace/>
   }
   if(role && user.role !== role){
    alert("Bạn không có quyền truy cập trang này")
    return <Navigate to="/login" state={{from: location}} replace/>
   }
    
    return children
}

export default PrivateRoute
