import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'

const Product = () => {

    const products = useSelector((store) => store.product)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/')
        .then( response => {
            dispatch({
                type: 'populateProducts',
                payload: {
                    products: [...response.data]
                }
            })
        } )
    },[])

    return(
        <>
            <h2 className="text-2xl font-bold mb-8">Products</h2>
            {products.map( (product,index) => {
                return(
                    <h5 className='text-lg font-bold mb-4' key={`product- ${index}`}>{product.title}</h5>
                )
            })}
        </>
    )
}

export default Product