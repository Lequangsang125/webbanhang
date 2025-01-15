import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import UpdateUserModal from './UpdateUserModal'

const ManageUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser,setSelectedUser] = useState(null);
    const {data: users = [] ,error , isLoading, refetch} = useGetUserQuery()
    console.log(users);

    const [deleteUser] = useDeleteUserMutation()

    const handleDelete = async (id) =>{
          const result = await Swal.fire({
                   title: 'Bạn chắc chắn muốn xóa người dùng này?',
                   text: 'Thao tác này không thể hoàn tác!',
                   icon: 'warning',
                   showCancelButton: true,
                   confirmButtonText: 'Xóa',
                   cancelButtonText: 'Hủy',
               });
           
               if (result.isConfirmed) {
                   try {
                       const res = await deleteUser(id).unwrap();
                       Swal.fire({
                           title: "Good job!",
                           text: "Xóa thành công!",
                           icon: "success"
                       });
                       await refetch();
                   } catch (error) {
                       console.error("Lỗi ", error);
                   }
               }
    }

    const handleEdit = (user) =>{
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }


  return (
           <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>Error loading users data...</div>
            }
           
            {/* <!-- component --> */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Tất cả người dùng  </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div>
                            </div>
                          
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STT 
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email người dùng 
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Chức năng 
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Cập nhật 
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                           Xóa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.map((user,index) =>(
                                            <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index+1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {user?.email || 'N/A'}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              <span className={`rounded-full py-[2xl] px-3 ${user.role === "admin" ? "bg-blue-500 text-white" : " bg-yellow-500"}`}>{user?.role}</span>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-700"><i className="ri-edit-line"></i>Cập nhật</button>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              <button
                                              onClick={() => handleDelete(user._id)}
                                              className='bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-700'>Xoá</button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                 

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
               
            </section>
            {
                isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal}
                onRoleUpdate={refetch}/>
            }

        </>
  )
}
export default ManageUser
