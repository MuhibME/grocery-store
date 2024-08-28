'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import GlobalApi from '@/utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';


const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const router = useRouter();
    const [loader,setLoader]= useState();

    useEffect(()=>{
        const jwt = sessionStorage.getItem('jwt');
        if(jwt){
            
            router.push('/')
        }
    },[]);
    const onSignIn = ()=>{
        setLoader(true);
        GlobalApi.singinUser(email,password).then(res=>{
            sessionStorage.setItem('user',JSON.stringify(res.data.user));
            sessionStorage.setItem('jwt',res.data.jwt);
            toast('Login successful');
            setLoader(false);
            router.refresh();
            router.push('/');

        }).catch(error => {
            console.log(error);
            toast('Error');
            setLoader(false);
        });
    }
    return (
    <section className='flex justify-center items-baseline my-10'>
        <div className='flex p-10 bg-slate-100 border border-gray-100 flex-col items-center justify-center'>
            <Image src={'/logo.png'} width={200} height={200} />
            <h2 className='font font-bold text-3xl'>Sign In</h2>
            <h2 className='text-gray-500'>Enter email and password to Sign In</h2>
            <div className='w-full flex flex-col gap-5 mt-7'>
                
                <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <Input placeholder='Password' type='password' onChange={(e)=>setpassword(e.target.value)}/>
                <Button onClick={onSignIn} disabled={!email || !password}>{loader? <Loader2Icon className='animate-spin'/>:'Sign In'}</Button>
                <p>Create an account? <Link className='text-blue-500' href={'/auth/create-account'}>Click here</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignIn;