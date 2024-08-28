'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlobalApi from '@/utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useEffect } from 'react';

const CreateAccount = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const router = useRouter();

    useEffect(()=>{
        const jwt = sessionStorage.getItem('jwt');
        if(jwt){
            router.push('/')
        }
    },[]);
    const onCreateAccount = async()=>{
        await GlobalApi.registerUser(username,email,password).then(res=>{
            console.log(res.data.user);
            console.log(res.data.jwt);
            sessionStorage.setItem('user',JSON.stringify(res.data.user));
            sessionStorage.setItem('jwt',res.data.jwt);
            toast('Account created');
            router.push('/');
        }).catch(error => {
            toast(error?.response?.data?.error?.message);
        });
    }
    return (
    <section className='flex justify-center items-baseline my-10'>
        <div className='flex p-10 bg-slate-100 border border-gray-100 flex-col items-center justify-center'>
            <Image src={'/logo.png'} width={200} height={200} />
            <h2 className='font font-bold text-3xl'>Create Account</h2>
            <h2 className='text-gray-500'>Enter email and password to create account</h2>
            <div className='w-full flex flex-col gap-5 mt-7'>
                <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <Input placeholder='Password' type='password' onChange={(e)=>setpassword(e.target.value)}/>
                <Button onClick={onCreateAccount} disabled={!username || !email || !password}>Create Account</Button>
                <p>Already have an account? <Link className='text-blue-500' href={'/auth/signin'}>Click here</Link></p>
            </div>
        </div>
    </section>
  )
}

export default CreateAccount;