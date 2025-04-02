import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const categories = [
    { label: 'Chọn danh mục', value: '' },
    { label: 'Phụ kiện', value: 'Phụ kiện' },
    { label: 'Váy', value: 'Váy' },
    { label: 'Đồ trang sức', value: 'Đồ trang sức' },
    { label: 'Mỹ phẩm', value: 'Mỹ phẩm' },
    { label: 'Chăm sóc da', value: 'Chăm sóc da' },
]

const colors = [
    { label: 'Chọn màu', value: '' },
    { label: 'Đen', value: 'Đen' },
    { label: 'Đỏ', value: 'Đỏ' },
    { label: 'Vàng', value: 'Vàng' },
    { label: 'Xanh nước biển', value: 'Xanh nước biển' },
    { label: 'Bạc', value: 'Bạc' },
    { label: 'Be', value: 'Be' },
    { label: 'Xanh lá', value: 'Xanh lá' },
]

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        color: '',
    })
    const [image, setImage] = useState('')
    const [addProduct, { isLoading, error }] = useAddProductMutation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.color || !product.description || !product.price ) {
            Swal.fire({
                icon: "error",
                title: "Thất bại...",
                text: "Vui lòng nhập đầy đủ thông tin sản phẩm!",
              });
            return
        }
            try {
                await addProduct({...product, image, author: user?._id}).unwrap();
                Swal.fire({
                    title: "Thành công!",
                    text: "Thêm sản phẩm thành công!",
                    icon: "success"
                  });
                setProduct({  name: '',
                    price: '',
                    description: '',
                    category: '',
                    color: '',})
                    setImage('')
                    nav('/dashboard/manage-products')
            } catch (error) {
                console.log("failed to submit product", error);

            }

        }
        return (
            <div className='container mx-auto mt-8'>
                <h2 className='text-2xl font-bold mb-6'>Thêm sản phẩm</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <TextInput
                        label="Tên sản phẩm"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Tên sản phẩm"
                    />

                    <SelectInput
                        label="Danh mục"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        options={categories}
                    />
                    <SelectInput
                        label="Màu sắc"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        options={colors}
                        placeholder="Chọn màu"
                    />

                    <TextInput
                        label="Giá"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="50"
                    />

                    <UploadImage
                        name="image"
                        id="image"
                        value={e => setImage(e.target.value)}
                        placeholder="Hình ảnh"
                        setImage={setImage}
                    />

                    <div>
                        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Mô tả</label>
                        <textarea name="description" id="description" className='add-product-InputCSS' value={product.description} placeholder='Mô tả sản phẩm' onChange={handleChange}></textarea>
                        <div>
                            <button
                                type='submit'
                                className='add-product-btn'
                                disabled={isLoading}
                            >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

export default AddProduct
