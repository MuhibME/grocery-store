'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { LayoutGrid, Search, ShoppingBag, UserCircle2Icon } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import GlobalApi from '@/utils/GlobalApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '@/context/UpdateCartContext';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CartItemList from './CartItemProducts';
import { toast } from 'sonner';


const Header = () => {
    const router = useRouter();
    const [categoryList, setCategoryList] = useState([]);
    const [isLogin, setIsLogin] = useState();
    const [totalCartItem, setTotalCartItem] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);
    const [cartItemList,setCartItemList] = useState([]);
    let jwt;
    jwt = sessionStorage.getItem('jwt');
    useEffect(()=>{
        getCartItems();
    },[updateCart]);
    const getCartItems = async ()=>{
        const cartItemList_ = await GlobalApi.getCartItems(user.id,jwt)
        console.log(cartItemList_);
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_);
    }   
    
    useEffect(()=>{
        
        setIsLogin(!!jwt);
        getCategoryList();
    },[])
    
    
    const getCategoryList = ()=>{
        GlobalApi.getCategory().then(
            resp => {
                setCategoryList(resp.data.data)
                
            }
        )
    }    
    
    const logOut=()=>{
        sessionStorage.clear();
        router.refresh();
    }
    const onDeleteItem =  (id)=>{
         GlobalApi.deleteCartItem(id,jwt).then(res=>{
            console.log(res);
            toast('item removed');
            getCartItems()
        });
    }

    useEffect(()=>{
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount;
        });
        setSubTotal(total.toFixed(2));
    },[cartItemList]);


    return (
        <header className='gap-5 p-5 shadow-md flex justify-between'>
        <div className='flex items-center justify-between gap-5'>
        <Image src={'/logo.png'} width={150} height={150} alt='logo'/>
        
        <div className='md:flex hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <h2 className='flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                        <LayoutGrid/>
                        Categories
                    </h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel className='text-lg'>
                    Browse Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {categoryList.map((category,index)=>(
                    <DropdownMenuItem key={index} className='flex gap-3 items-center cursor-pointer'> 
                    <Link className='flex items-center gap-3' href={`/products-category/${category.attributes.name}`}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category.attributes.icon?.data?.[0]?.attributes?.url} alt='icon' width={30} height={30} unoptimized/>
                    <h2 className='text-lg'>{category.attributes.name}</h2>
                    </Link>
                    </DropdownMenuItem>
                ))}
                
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className='hidden md:flex gap-3 items-center border rounded-full p-2 px-5'>
            <Search/>
            <input type="text" placeholder='search' className='outline-none'/>
        </div>
        </div>
        <div className='flex gap-5 items-center'>
            <Sheet>
            <SheetTrigger>
                <h2 className='flex gap-2 items-center text-lg'><ShoppingBag/> <span className='bg-primary text-white rounded-full px-2'>{totalCartItem}</span></h2>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader className='my-5' >
                <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
                <SheetDescription>
                    <div>
                        <CartItemList cartItemList={cartItemList} ondeleteItem={onDeleteItem}/>
                    </div>
                    
                </SheetDescription>
                </SheetHeader>
                <SheetClose>
                <div className='absolute w-[90%] bottom-6 flex flex-col'>
                    <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>$ {subTotal}</span></h2>
                    <Button onClick={()=>router.push(jwt? '/checkout':'/signin')}>Check Out</Button>
                </div>
                </SheetClose>
            </SheetContent>
            </Sheet>
            
            <Link href={'/auth/signin'}>
            {isLogin? 
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <UserCircle2Icon className='p-2 rounded-full text-primary h-12 w-12 bg-green-200'/> 
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={logOut}>LogOut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            
            : <Button>Login</Button>}
            </Link>
        </div>
    </header>
  )
}

export default Header;