import React from 'react'
import { AuthButtonServer } from "../../components/supabase/auth-button-server";
import { supabase } from '@/components/supabase/serverClient';
import { type Session } from "@supabase/supabase-js";
import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function Home() {

    const cookieStore = cookies()
    cookieStore.getAll()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value, ...options })
              } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
            remove(name: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value: '', ...options })
              } catch (error) {
                // The `delete` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      )

    const {data: user} = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    const email = user.user?.email
    const name = user?.user?.user_metadata?.full_name

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