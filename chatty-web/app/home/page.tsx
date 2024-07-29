import React from 'react'
import { AuthButtonServer } from "../../components/supabase/auth-button-server";
import { supabase } from '@/components/supabase/serverClient';
import { type Session } from "@supabase/supabase-js";
import { redirect } from 'next/navigation'

export default async function Home() {
    const {data: { user }} = await supabase.auth.getUser()
    const name = user?.user_metadata?.full_name || 'Guest';
    const email = user?.email || 'No email provided';

    if (!user) {
        redirect('http://localhost:3000/');
        return null;
    }

  return (
    <>
        <div className='h-full w-full flex align-center justify-center flex-col p-6'>
            <AuthButtonServer />
            <div>
                <h1 className='text-3xl font-bold text-black'>Welcome {name}</h1>
                <p className='text-black'>Your email is {email}</p>
            </div>
        </div>
    </>
  )
}