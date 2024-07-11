"use client"

import { supabaseClient } from "./clientClient";
import { GitHubIcon, GoogleIcon } from "./icons"
import { type Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function AuthButton({session}: {session: Session | null} ){

    /* TENGO QUE, UNA VEZ QUE EL USUARIO SE LOGEE, BUSCAR EL URL DE LA PAGINA, PARA LUEGO CHEKEAR SI ESTE EXISTE O NO EN LA BASE DE DATOS. SI EL URL EXISTE, BUSCO EL CONTENT_ID PARA IR A LA TABLA DE CONTENT Y CONSEGUIR EL CONTENIDO. SI ESTE NO EXISTE, LLAMO A LA AI PARA QUE ANALICE LA PAGINA Y LUEGO, CON EL RESULTADO DE LA IA, CREO UNA ROW EN LA BASE DE DATOS, CON TODA LA INFO*/

    const router = useRouter()
    
    const handleSignInGoogle = async () => {
        await supabaseClient.auth.signInWithOAuth({
            provider:"google",
            options: {
                redirectTo: "http://localhost:3000/auth/callback"
            }
        })
    }
    const handelSignOut = async () => {
        await supabaseClient.auth.signOut()
        router.refresh()
    }
    return(
        <header>

            {
                session === null ? (
                    <>
                        <button onClick={handleSignInGoogle} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                            <GoogleIcon className="w-4 h-4 mr-2" />
                            Sign in with Google
                        </button>
                    </>
                    
                ): (
                    <button onClick={handelSignOut}>Sign out</button>
                )
            }

            
        </header>
    )
}