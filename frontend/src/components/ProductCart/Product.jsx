import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
import './Product.css'

const Product = ({product}) => {
  const navigate = useNavigate()
  return (
    <div key={product.id} className='product-card'>
      <img src={product.image_url} alt={product.name} className='product-image' />
      <div className='product-details'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <p className='category-btn'>{product.category}</p>
          <h3 className='price-tag'>₹{product.price}</h3>
        </div>
        <div style={{display:'flex', gap:'5px', flexDirection: 'column'}}>
            <h1 className='product-head'>{product.name}</h1>
            <p className='short-desc'>{product.short_desc}</p>
        </div>
        <button style={{cursor: 'pointer'}} onClick={() => {navigate(`/product/${product.id}`)}} className='view-btn'>
          View Details <FaArrowRight className='arrow-icon' />
        </button>
      </div>
    </div>
  )
}

export default Product