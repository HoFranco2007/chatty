import { supabase } from "../../components/serverClient";
import { AuthButtonServer } from "./components/auth-button-server";

export default async function Home() {

  const {data: user} = await supabase.auth.getUser()
  const name = user.user?.user_metadata.full_name
  const email = user.user?.email
  const content = "MI ABUELO ES BENJA"

  const { data: contentData, error: contentError } = await supabase.from('content').select('id').eq('content', content).single();
  const contenido = contentData?.id

  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>
        {name + " " + email}
      </pre>
    </main>
  )
}