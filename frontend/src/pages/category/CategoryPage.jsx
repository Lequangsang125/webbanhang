import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCarts from '../shop/ProductCarts';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
    // Lấy danh sách sản phẩm từ Redux API
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});
    
    // Lấy category từ URL
    const { categoryName } = useParams();
    const decodedCategory = decodeURIComponent(categoryName).toLowerCase().trim();

    // State để lưu sản phẩm sau khi lọc
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Cập nhật danh sách sản phẩm mỗi khi category hoặc products thay đổi
    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter((product) =>
                product.category.toLowerCase().trim() === decodedCategory
            );
            setFilteredProducts(filtered);
        }
    }, [decodedCategory, products]); // Lắng nghe cả `products`

    // Cuộn lên đầu trang khi thay đổi danh mục
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [decodedCategory]);

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{decodedCategory}</h2>
            </section>

            {/* Hiển thị sản phẩm */}
            <div className='section__container'>
                {isLoading ? <p>Đang tải sản phẩm...</p> : <ProductCarts products={filteredProducts} />}
            </div>
        </>
    );
};

export default CategoryPage;
