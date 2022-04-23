import React from 'react'
import { useSelector } from 'react-redux'

const Product = () => {

    const products = useSelector((store) => store.product)
    

    return(
        <>
            <h2 className="text-2xl font-bold mb-8">Products</h2>
            {products.map( product => {
                return(
                    <h5 className='text-lg font-bold mb-4'>{product.title}</h5>
                )
            })}
        </>
    )
}

export default Product