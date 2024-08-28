'use client'
import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button';
import { LoaderCircle, ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/utils/GlobalApi';
import { toast } from 'sonner';
import { UpdateCartContext } from '@/context/UpdateCartContext';


const ProductItemDetail = ({product}) => {
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [loading, setLoading] = useState(false);
    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingprice
    );
    const router =useRouter();
    const [quantity, setQuantity] = useState(1);
    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);
    

    const data = {
        data:{
            quantity:quantity,
            total:(quantity*productTotalPrice),
            products:product.id,
            users_permissions_user:user?.id,
            userId: user.id,
        }
    };
    const addToCart = ()=>{
        setLoading(true);
        if(jwt){
           GlobalApi.addToCart(data,jwt).then(res=>{
            
            toast("Success");
            setUpdateCart(!updateCart)
            setLoading(false);
            
        },(e)=>{
            
            toast("error")
            setLoading(false);
        })
        
        }else{
            router.push('/auth/signin');
        }
    }


    return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
        <Image alt='image' width={300} height={300} src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+product.attributes.images.data[0]?.attributes.url} className='object-contain bg-slate-200 p-5 h-[320px] w-[300px] rounded-lg'/>
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
            <h2 className='text-sm text-gray-500'>{product.attributes.description}</h2>
            <div className='flex gap-3'>
            <h2 className='line-through text-gray-400 text-lg'>{product.attributes?.mrp ? '$'+product.attributes?.mrp : null}</h2>
            <h2 className='font-bold text-3xl'>${product.attributes.sellingprice}</h2>
            </div>
            <h2 className='font-medium text-lg'>Quantity: ({product.attributes.itemQuantityType})</h2>
            <div className='flex items-baseline flex-col gap-3'>
                <div className='flex gap-3 items-center'>
                <div className='p-2 border flex gap-10 items-center px-5'>
                    <Button disabled={quantity == 1} onClick={()=> setQuantity(quantity-1)}>-</Button>
                    <h2>{quantity}</h2>
                    <Button onClick={()=> setQuantity(quantity+1)}>+</Button>
                </div>
                <h2 className='font-bold text-lg'>=  ${(quantity * productTotalPrice).toFixed(2)}</h2>
                </div>
                <Button className='flex gap-3' onClick={addToCart} disabled={loading}>
                    <ShoppingBasket/>
                    {loading? <LoaderCircle className='animate-spin'/>: 'Add to cart'}
                    
                </Button>
            </div>
            <h2><span className='font-bold'>Category: </span> {product.attributes.categories.data[0].attributes.name}</h2>
        </div>
    </div>
  )
}

export default ProductItemDetail