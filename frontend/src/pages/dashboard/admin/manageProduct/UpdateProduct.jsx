import React, { useEffect, useState } from 'react'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const {id} = useParams()
    const nav = useNavigate();
    const {user} = useSelector((state) => state.auth)
    const [product,setProduct] = useState({
      name: '',
      category: '',
      color: '',
      description: '',
      image: '',
      price: '',
    })
    const {data: productData, isLoading: isProductLoading, error: fetchError,refetch} = useFetchProductByIdQuery(id)

    const [newImage, setNewImage] = useState(null)

    const {name,category,color,description,image: imageURL, price} = productData?.product || {};

      const [updateProduct, {isLoading, error: updateError}] = useUpdateProductMutation();
      useEffect(() =>{
        if(productData){
          setProduct
        }
      },[])
  return (
    <div>
      
    </div>
  )
}

export default UpdateProduct
