
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer"
import "../globals.css";
import Card from "@/components/card";
import { supabase } from "@/components/navbar/supabase/serverClient";
import Configuracion from "@/components/home/config-general";
import Separator from "@/components/page/separator";

export default async function Home() {

  const { data, error } = await supabase.auth.getUser()
  const name = data.user?.user_metadata.full_name
  const email = data.user?.email
  const avatar = data.user?.user_metadata.avatar_url

  return (
    <>
      <Configuracion/>
    </>
  );
}
