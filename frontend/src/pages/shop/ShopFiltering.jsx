import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
        <div className='space-y-5 p-5 bg-gray-100 rounded-lg shadow-md w-full md:w-1/4'>
            <h3 className='text-xl font-semibold text-gray-800'>Bộ lọc sản phẩm</h3>
            
            {/* Danh mục */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg text-gray-700'>Danh mục</h4>
                <hr className='border-gray-300' />
                {filters.categories.map((category) => (
                    <label key={category} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input type="radio" name="category" value={category}
                            checked={filtersState.category === category}
                            onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                            className='cursor-pointer'
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* Màu sắc */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg text-gray-700'>Màu sắc</h4>
                <hr className='border-gray-300' />
                {filters.colors.map((color) => (
                    <label key={color} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input type="radio" name="color" value={color}
                            checked={filtersState.color === color}
                            onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
                            className='cursor-pointer'
                        />
                        <span>{color}</span>
                    </label>
                ))}
            </div>

            {/* Khoảng giá */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg text-gray-700'>Khoảng giá</h4>
                <hr className='border-gray-300' />
                {filters.priceRanges.map((range) => (
                    <label key={range.label} className='capitalize cursor-pointer flex items-center gap-2'>
                        <input type="radio" name="priceRange"
                            value={`${range.min}-${range.max}`}
                            checked={filtersState.priceRange === `${range.min}-${range.max}`}
                            onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                            className='cursor-pointer'
                        />
                        <span>{range.label}</span>
                    </label>
                ))}
            </div>

            {/* Xóa bộ lọc */}
            <button onClick={clearFilters} className='bg-red-500 py-2 px-4 text-white rounded-lg shadow hover:bg-red-600 transition duration-300'>
                Xóa tất cả bộ lọc
            </button>
        </div>
    );
};

export default ShopFiltering;