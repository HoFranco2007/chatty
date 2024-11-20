"use client"

import Link from 'next/link';
import { LogoutModal } from '../../components/home/logout-modal';
import { useState } from 'react';

export default function MiCuenta() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-[90vh] text-white flex items-start justify-center mt-[10vh]">
      <aside className="w-[20vw] h-[40vh] p-5 bg-black border rounded-lg mr-[5vw] border-[#cccccc]">
        <nav className="flex flex-col gap-4">
          <Link className='border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500 hover:text-purple-500 flex items-center'href="/home"><button className='w-[100%]'>Configuracion General</button></Link>
          <button className="text-purple-500 font-bold border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500">Mi Cuenta</button>
          <button className='border rounded-lg p-2 mb-1 border-[#cccccc] hover:border-white transition-all duration-500 hover:text-purple-500'>Contáctanos</button>
          <button  onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-purple-500 border rounded-lg p-2 border-[#cccccc] hover:border-white transition-all duration-500">Log out</button>
        </nav>  
      </aside>
      <main className="w-[45vw] p-8 border h-[80vh] bg-black rounded-lg border-[#cccccc]">
        <h1 className="text-2xl font-bold mb-6">Mi cuenta</h1>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
          <div className="ml-4">
            <h2 className="text-xl">apodo</h2>
            <p className="text-gray-400">Apodo del usuario</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl mb-4">Correo Electrónico</h2>
          <p className="text-gray-400">usuario@gmail.com</p>
        </div>
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
