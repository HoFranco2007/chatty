import { AuthButton } from "./auth-button-client";
import { supabase } from "./serverClient";

export async function AuthButtonServer () {

      const {data: { session }} = await supabase.auth.getSession()

      return <AuthButton session={session} />
}