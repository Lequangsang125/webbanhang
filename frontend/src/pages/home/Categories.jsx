import React from 'react';
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";
import category5 from "../../assets/category-5.jpg";

import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        { name: 'Phụ kiện', path: 'Phụ kiện', image: category1 },
        { name: 'Váy', path: 'Váy', image: category2 },
        { name: 'Đồ trang sức', path: 'Đồ trang sức', image: category3 },
        { name: 'Mỹ phẩm', path: 'Mỹ phẩm', image: category4 },
        { name: 'Chăm sóc da', path: 'Chăm sóc da', image: category5 },
    ];

    return (
        <div>
            <section className='section__container product__container'>
    <h2 className='section__header'>Danh mục sản phẩm</h2>
    </section>
            <div className='product__grid'>
                {categories.map((category) => (
                    <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                        <img src={category.image} alt={category.name} />
                        <h4>{category.name}</h4>
                    </Link>
                ))}
            </div>
        </div>
     
    );
};

export default Categories;
