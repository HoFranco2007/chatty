"use client"

import { useState } from 'react';
import { LogoutModal } from './logout-modal';
import Link from "next/link"

export default function ConfiguracionGeneral() {
  const [modoAcceso, setModoAcceso] = useState('Modo A');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tema, setTema] = useState('oscuro');
  const idiomas = ['Español', 'Inglés', 'Francés'];

  return (
    <div className="h-[90vh] text-white flex items-start justify-center mt-[10vh]">
      <aside className="w-[20vw] h-[40vh] p-5 bg-black border rounded-lg mr-[5vw] border-[#cccccc]">
        <nav className="flex flex-col gap-4">
          <button className="text-purple-500 font-bold border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500">Configuración general</button>
          <Link className='border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500 hover:text-purple-500 flex items-center'href="/mi-cuenta"><button className='w-[100%]'>Mi cuenta</button></Link>
          <button className='border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500 hover:text-purple-500'>Contáctanos</button>
          <button  onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-purple-500 border rounded-lg p-2 border-[#cccccc] hover:border-white transition-all duration-500">Log out</button>
        </nav>
      </aside>
      <main className="w-[45vw] p-8 border h-[80vh] bg-black rounded-lg border-[#cccccc]">
        <h1 className="text-2xl font-bold mb-6">Configuración general</h1>
        <section className="mb-6">
          <h2 className="text-xl mb-4">Cómo acceder a Chatty</h2>
          {['Modo A', 'Modo B', 'Modo C'].map((modo) => (
            <div key={modo}>
              <label>
                <input
                  type="radio"
                  name="modo"
                  checked={modoAcceso === modo}
                  onChange={() => setModoAcceso(modo)}
                />
                <span className="ml-2">{modo}</span>
              </label>
            </div>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-xl mb-4">Idioma</h2>
          <select className='bg-black rounded-lg border-[#cccccc] p-2 border outline-none'>
            {idiomas.map((idioma) => (
              <option key={idioma} className='rounded-lg border-[#cccccc] p-2 border'>{idioma}</option>
            ))}
          </select>
        </section>
        <section>
          <h2 className="text-xl mb-4">Tema</h2>
          {['oscuro', 'claro'].map((t) => (
            <div key={t}>
              <label>
                <input
                  type="radio"
                  name="tema"
                  checked={tema === t}
                  onChange={() => setTema(t)}
                />
                <span className="ml-2">Modo {t}</span>
              </label>
            </div>
          ))}
        </section>
      </main>
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
