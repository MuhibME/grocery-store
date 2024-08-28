import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProducList';
import GlobalApi from '@/utils/GlobalApi';
import React from 'react'

const ProductCategory =async ({params}) => {
  
  const productList = await GlobalApi.getProductsByCategory(params.categoryName).then(res => {return res.data.data})
  const topCategoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>
      {params.categoryName}
      </h2>
      <CategoryList categoryList={topCategoryList} selected={params.categoryName} title='Top Categories'/>
      <div className=''>
      <ProductList productList={productList}/>
      </div>
    </div>
  )
}

export default ProductCategory;