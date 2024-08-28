import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CategoryList = ({categoryList,title = 'Shop by Category',selected}) => {
  return (
    <div className='mt-5 flex flex-col items-center'>
        <h2 className='text-primary font-bold text-xl'>{title}</h2>
        <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-2'>
            {categoryList.map((category,index)=>(
                <Link key={index} href={`/products-category/${category.attributes.name}`}>
                <div className={`group flex flex-col text-center items-center justify-center bg-green-50 gap-2 p-4 rounded-lg hover:bg-green-300 h-full ${selected === category.attributes.name &&'bg-green-600 text-white'}`}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category.attributes.icon?.data?.[0]?.attributes?.url} alt='icon' height={50} width={50} className='group-hover:scale-125 transition-all'/>
                    <h2 className='font-bold'>{category.attributes.name}</h2>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}
export default CategoryList;