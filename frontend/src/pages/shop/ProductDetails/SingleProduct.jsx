import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStarts from '../../../component/RatingStarts';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCart from '../reviews/ReviewsCart';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useFetchProductByIdQuery(id);

    const sanPham = data?.product || {};
    const danhGiaSanPham = data?.reviews || [];

    const themVaoGioHang = (sanPham) => {
        dispatch(addToCart(sanPham));
    };

    if (isLoading) return <p className='text-center text-xl font-semibold text-gray-500'>Đang tải sản phẩm...</p>;
    if (error) return <p className='text-center text-xl font-semibold text-red-500'>Lỗi khi tải chi tiết sản phẩm.</p>;

    return (
        <>
            <section className='section__container py-6 border-b border-gray-200 bg-gray-50'>
                <div className='max-w-6xl mx-auto flex items-center gap-2 text-gray-600'>
                    <Link to="/" className='hover:text-primary transition duration-300'>Trang chủ</Link>
                    <i className="ri-arrow-right-s-line"></i>
                    <Link to="/shop" className='hover:text-primary transition duration-300'>Cửa hàng</Link>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='text-primary font-medium'>{sanPham?.name}</span>
                </div>
            </section>

            <section className='section__container py-10'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    <div className='w-full'>
                        <img className='rounded-lg shadow-md w-full' src={sanPham?.image} alt={sanPham?.name} />
                    </div>

                    <div className='space-y-5'>
                        <h3 className='text-3xl font-bold text-gray-800'>{sanPham?.name}</h3>
                        <p className='text-2xl text-primary font-semibold'>
                            Giá : 
                            {sanPham?.price ? ` ${sanPham?.price.toLocaleString('vi-VN')}₫` : 'Giá không xác định'}
                            {sanPham?.oldPrice && <s className='ml-2 text-gray-500 text-lg'>{sanPham?.oldPrice.toLocaleString('vi-VN')}₫</s>}
                        </p>



                        <div className='space-y-2'>
                            <p><strong>Danh mục:</strong> {sanPham?.category || 'Không xác định'}</p>
                            <p><strong>Màu sắc:</strong> {sanPham?.color || 'Không xác định'}</p>
                            <div className='flex items-center gap-2'>
                                <strong>Đánh giá:</strong>
                                <RatingStarts rating={sanPham?.rating} />
                            </div>
                        </div>

                        <p className='text-gray-600 leading-relaxed'>Mô tả: {sanPham?.description}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                themVaoGioHang(sanPham);
                            }}
                            className='mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition duration-300'
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </section>

            <section className='section__container py-10 border-t border-gray-200'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Đánh giá sản phẩm</h2>
                    <ReviewsCart productReviews={danhGiaSanPham} />
                </div>
            </section>
        </>
    );
};

export default SingleProduct;