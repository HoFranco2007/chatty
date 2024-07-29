"use client"

import { GitHubIcon, GoogleIcon } from "./icons"
import { type Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation";


export function AuthButton({session}: {session: Session | null} ){

    /* TENGO QUE, UNA VEZ QUE EL USUARIO SE LOGEE, BUSCAR EL URL DE LA PAGINA, PARA LUEGO CHEKEAR SI ESTE EXISTE O NO EN LA BASE DE DATOS. SI EL URL EXISTE, BUSCO EL CONTENT_ID PARA IR A LA TABLA DE CONTENT Y CONSEGUIR EL CONTENIDO. SI ESTE NO EXISTE, LLAMO A LA AI PARA QUE ANALICE LA PAGINA Y LUEGO, CON EL RESULTADO DE LA IA, CREO UNA ROW EN LA BASE DE DATOS, CON TODA LA INFO*/

    const router = useRouter()

    const supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    
    const handleSignInGoogle = async () => {
        await supabaseClient.auth.signInWithOAuth({
            provider:"google",
            options: {
                redirectTo: "http://localhost:3000/auth/callback"
            }
        })
    }
    const handleSignOut = async () => {
        await supabaseClient.auth.signOut()
        router.push("/")
    }
    return(
        <header>

            {
                session === null ? (
                    <button onClick={handleSignInGoogle}>Sign In</button>
                ): (
                    <button onClick={handleSignOut}>Sign out</button>
                )
            }

            
        </header>
    )
}