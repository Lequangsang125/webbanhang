import React, { useEffect, useState } from 'react'

import productsData from "../../data/products.json"
import ProductCarts from './ProductCarts'
import ShopFiltering from './ShopFiltering'

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },

    ]
}

const ShopPage = () => {
    const [products, setProducts] = useState(productsData)
    const [filtersState,setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })
//filtering functions

const applyFilters = ()=>{
    let filterdProducts = productsData;

    //filter by category
    if(filtersState.category && filtersState.category !== 'all'){
        filterdProducts = filterdProducts.filter(product => product.category === filtersState.category)
    }

    //filter by color
    if(filtersState.color && filtersState.color !== 'all' ){
        filterdProducts = filterdProducts.filter(product => product.color === filtersState.color)
    }

    //filter by price
    if(filtersState.priceRange){
     const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
     filterdProducts = filterdProducts.filter(product => product.price >= minPrice &&
        product.price <= maxPrice)
    }
    setProducts(filterdProducts)
}

    useEffect(()=>{
        applyFilters()
    },[filtersState])
    //clear the filter
    const clearFilters = ()=>{
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRanges: ''
        })
    }
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Shop page</h2>
                <p className='section__subheader'>iiiiiiiiiiiiiiiiiiiiiiii</p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap:8'>
                    {/**left side */}
                    <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters}/>
                    {/**right side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>Products availiable : {products.length}</h3>
                        <ProductCarts products={products}/>
                    </div>
                </div>
            </section>
        </> 
    )
}

export default ShopPage
