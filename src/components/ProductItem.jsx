import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from './ProductItemDetail';


const ProductItem = ({product}) => {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center text-center gap-3 border rounded-lg h-full hover:scale-110 hover:shadow-md transition-all duration-500 ease-in-out'>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+product?.attributes?.images?.data[0]?.attributes?.url} width={500} height={200} className='w-[200px] h-[200px] object-contain' alt={product.attributes.name}/>
        <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
        <div className='flex gap-3'>
            <h2 className='line-through text-gray-400'>{product.attributes?.mrp ? '$'+product.attributes?.mrp : null}</h2>
            <h2 className='font-bold text-lg'>${product.attributes.sellingprice}</h2>
        </div>
        <Dialog>
          <DialogTrigger>
              <Button variant='outline' className='text-primary hover:text-white hover:bg-primary'>Add to cart</Button>
          </DialogTrigger>
          <DialogContent>
          <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <ProductItemDetail product={product}/>
          </DialogDescription>
          </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default ProductItem