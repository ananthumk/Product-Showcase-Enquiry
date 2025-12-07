import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AppContext from '../../context/AppContext';
import Product from '../../components/ProductCart/Product';
import axios from 'axios';
import './Home.css'

const Home = () => {
    const [filterQuery, setFilterQuery] = useState({
        search: '', category: '', page: 1
    })
    const [totalPages, setTotalPages] = useState(null)
    const [products, setProducts] = useState([])
    const [errMsg, setErrMsg] = useState('')

    const {url} = useContext(AppContext)

    const handleFilter = (e) => {
        const {name, value} = e.target 
        setFilterQuery(prev => ({
            ...prev, 
            [name]: value,
            page: 1
        }))
    }

    const decreasePageCount = () => {
        if (filterQuery.page > 1) {
            setFilterQuery(prev => ({
                ...prev,
                page: prev.page - 1 
            }))
        }
    }
    
    const increasePageCount = () => {
        if (totalPages && filterQuery.page < totalPages) {
            setFilterQuery(prev => ({
                ...prev,
                page: prev.page + 1 
            }))
        }
    }
    
    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const response = await axios.get(`${url}/products/?search=${filterQuery.search}&category=${filterQuery.category}&page=${filterQuery.page}`)
                if(response.status === 200 || response.status === 201){
                     setProducts(response.data.data)
                     setTotalPages(response.data.pagination?.totalPages || null)
                     setErrMsg('')
                } else {
                    setErrMsg(response.data.message)
                    console.log(response)
                    setTotalPages(null)
                }
            } catch (error) {
                console.log(error.message)
                setErrMsg(error.message)
                setTotalPages(null)
            }
        }
        fetchProducts()
    }, [url, filterQuery])
    
  return (
    <div className='home-page'>
        <Header />
        <div className='product-container'>
            <h1 className='heading'>Our Products</h1>

            <div className='filter-conatiner'>
                <div className='search-container'>
                    <FaSearch className='icon' />
                    <input type='search' onChange={handleFilter} value={filterQuery.search} name="search" className='search-input' placeholder='search by product' />
                </div>
                <select onChange={handleFilter} value={filterQuery.category} name="category" className='select-category'>
                    <option value="">All Categories</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                </select>
            </div>

            <div className='product-section'>
               {products.map((product) => (
                 <Product product={product} />
               ))}
            </div>
            <div className='pagination-container'>
                <button 
                    className='arrow-btn' 
                    onClick={decreasePageCount}
                    disabled={filterQuery.page === 1}
                >
                    <FaArrowLeft className='arrow-icon' />
                </button>
                <p className='page-count'>{filterQuery.page}</p>
                <button 
                    className='arrow-btn' 
                    onClick={increasePageCount}
                    disabled={totalPages && filterQuery.page >= totalPages}
                >
                    <FaArrowRight className='arrow-icon' />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home
