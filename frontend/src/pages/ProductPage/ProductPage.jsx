import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { FaRegMessage } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Enquire from '../../components/Enquire/Enquire'
import axios from 'axios'
import './ProductPage.css'

const ProductPage = () => {
    const [product, setProduct] = useState({})
    const [errMsg, setErrMsg] = useState('')
    const [showEnquire, setShowEnquire] = useState(false)
    const { id } = useParams()
    const { url } = useContext(AppContext)

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`${url}/products/${id}`)
                if (response.status === 200 || response.status === 201) {
                    setProduct(response.data.data)
                    setErrMsg('')
                } else {
                    setErrMsg(response.data.message)
                }
            } catch (error) {
                setErrMsg(error.message)
            }

        }
        fetchProductById()
    }, [url, id])

    return (
        <div className='product-page'>
            <Header />
            <div className='product-page-section'>
                <img src={product.image_url} alt={product.name} className='img-product' />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p className='category-btn'>{product.category}</p>
                    <h2 className='product-title'>{product.name}</h2>
                    <p className='amount'>₹{product.price}</p>
                    <p className='decription'>{product.long_desc}</p>
                    <button className='enquiry-btn' onClick={() => setShowEnquire(true)}> <FaRegMessage className='icon' /> Enquire Now</button>
                </div>
            </div>
            {showEnquire && <Enquire product={product} onClose={() => setShowEnquire(false)} />}
        </div>
    )
}

export default ProductPage
