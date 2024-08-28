import React from 'react'
import Image from 'next/image'
import ProductItem from './ProductItem'


const ProductList = ({productList}) => {
  return (
    <div className='mt-10  flex flex-col items-center justify-center'>
        <h2 className='text-primary font-bold text-xl mb-5'>Our Products</h2>  
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center'>
            {productList.map((product,index)=>index<=8&&(
              <div key={index} className='h-full'>
                <ProductItem product={product}/>
             </div>   
            ))}
        </div>
    </div>
  )
}

export default ProductList;