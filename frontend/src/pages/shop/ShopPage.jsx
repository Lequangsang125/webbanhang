import React, { useEffect, useState } from 'react'

import ProductCarts from './ProductCarts'
import ShopFiltering from './ShopFiltering'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const filters = {
    categories: ['Tất cả', 'Phụ kiện', 'Váy', 'Đồ trang sức', 'Mỹ phẩm','Chăm sóc da'],
    colors: ['Tất cả', 'Đen', 'Đỏ', 'Vàng', 'Xanh biển', 'Bạc', 'Be', 'Xanh lá'],
    priceRanges: [
        { label: 'Dưới 100.000 vnđ', min: 0, max: 100000 },
        { label: 'Từ 100.000 - 200.000 vnđ', min: 100000, max: 200000 },
        { label: 'Từ 200.000 - 500.000 vnđ', min: 200000, max: 500000 },
        { label: 'Trên 500.000 vnđ', min: 500000, max: Infinity },

    ]
}

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'Tất cả',
        color: 'Tất cả',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'Tất cả' ? category : '',
        color: color !== 'Tất cả' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage
        
    })
    const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    //clear the filter
    const clearFilters = () => {
        setFiltersState({
            category: 'Tất cả',
            color: 'Tất cả',
            priceRange: ''
        })
    }

    //handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    if (isLoading) return <div>Đang tải sản phẩm...</div>
    if (error) return <div>Lỗi tải sản phẩm lên...</div>

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Cửa hàng</h2>
                <p className='section__subheader'></p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap:8'>
                    {/**left side */}
                    <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters} />
                    {/**right side */}
                    <div>
                        <h3
                            className='text-xl font-medium mb-4'>
                                Hiển thị {startProduct} đến {endProduct} trong {totalProducts} sản phẩm

                        </h3>
                        <ProductCarts products={sortedProducts} />

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
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
