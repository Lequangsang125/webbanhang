import React, { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi'
import { formatDate } from '../../../../utils/formatDate'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(12)
    const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage
    })

    //pagination 
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }
    const [deleteProduct] = useDeleteProductMutation()
    const handleDeleteProduct = async (id) => {

        const result = await Swal.fire({
            title: 'Bạn chắc chắn muốn xóa sản phẩm này?',
            text: 'Thao tác này không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                const res = await deleteProduct(id).unwrap();
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

    return (
        <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>Error loading products...</div>
            }
            {/* <!-- component --> */}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Tất cả sản phẩm </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div>
                            </div>
                            <h3>Hiển thị {startProduct} đến {endProduct}  trong {totalProducts} sản phẩm </h3>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STT
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên sản phẩm
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Giá sản phẩm
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Ngày tạo
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
                                        products && products.map((product, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {product.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                       {product.price.toLocaleString('vi-VN')}₫
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {formatDate(product?.createdAt)}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <Link to={`/dashboard/update-product/${product._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-700"><i className="ri-edit-line"></i>Cập nhật</Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
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
                {/**pagination controls */}
                <div className='mt-6 flex justify-center'>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'><i className="ri-arrow-left-line"></i> </button>

                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 px-2 ${currentPage === index + 1 ?
                                    'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
                                     rounded-md mx-1
                                     `}
                            >{index + 1}</button>
                        ))
                    }

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'><i className="ri-arrow-right-line"></i></button>
                </div>

            </section>


        </>
    )
}

export default ManageProduct