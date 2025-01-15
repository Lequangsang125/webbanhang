import React, { useEffect, useState } from 'react';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import TextInput from '../addProduct/TextInput';
import { useSelector } from 'react-redux';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

const categories = [
  { label: 'Chọn danh mục', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Skin care', value: 'skin-care' },
];

const colors = [
  { label: 'Chọn màu', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' },
];

const UpdateProduct = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    color: '',
    description: '',
    image: '',
    price: '',
  });
  const [newImage, setNewImage] = useState(null);

  const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData && productData.product) {
      const { name, category, color, description, image: imageURL, price } = productData.product;
      setProduct({
        name: name || '',
        category: category || '',
        color: color || '',
        description: description || '',
        image: imageURL || '',
        price: price || '',
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage || product.image,
      author: user?._id || '',
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      Swal.fire({
        title: 'Good job!',
        text: 'Cập nhật thành công!',
        icon: 'success',
      });
      refetch();
      nav('/dashboard/manage-products');
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  if (isProductLoading) return <div>Đang tải sản phẩm...</div>;
  if (fetchError) return <div>Không thể tải sản phẩm. Vui lòng thử lại sau.</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Cập nhật sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Tên sản phẩm"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        />
        <SelectInput
          label="Danh mục"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />
        <UploadImage name="image" id="image" value={newImage || product.image} setImage={handleImageChange} />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full p-2 border rounded"
            value={product.description}
            placeholder="Mô tả"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isUpdating ? 'Đang cập nhật...' : 'Sửa sản phẩm'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
