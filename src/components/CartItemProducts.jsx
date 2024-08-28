import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TrashIcon } from 'lucide-react'
import { Button } from './ui/button'
import GlobalApi from '@/utils/GlobalApi'


const CartItemList = ({cartItemList,ondeleteItem}) => {
    const [subTotal , setSubTotal] = useState(0);
   
    

  
    return (
    <div>
        <div className='overflow-auto h-[80%]'>
            {cartItemList.map((cart,index)=>(
                <div key={index} className='flex justify-between items-center p-2 mb-5 w-full'>
                    <div className='flex gap-6 items-center'>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image} width={90} height={90} alt={cart.name} className='border p-2 object-contain h-[90px] w-[90px]'/>
                    <div className='flex-1'>
                        <h2 className='font-bold'>{cart.name}</h2>
                        <h2>Quantity: {cart.quantity}</h2>
                        <h2 className='text-lg font-bold'>$: {cart.amount}</h2>
                    </div>
                    </div>
                    <TrashIcon className='cursor-pointer' onClick={()=>ondeleteItem(cart.id)}/>
                </div>
            ))}
        </div>
            
    </div>
  )
}

export default CartItemList;