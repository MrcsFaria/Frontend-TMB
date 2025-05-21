// src/pages/MinhaPagina.tsx
import React, { useState } from 'react';
import { Faixa } from '../components/BarraSuperior.tsx';
import { Toolbar } from '../components/Toolbar.tsx';
import { Tabela } from '../components/Tabela.tsx';
import FormularioPedido from '../components/Formulario.tsx';
import { useSignalR } from '../Hooks/useSignalR.ts';

const MinhaPagina: React.FC = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario((prev) => !prev);
  };

  const [filtros, setFiltros] = useState({
    cliente: '',
    produto: '',
    status: '',
    dataCriacao: '',
  });

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  useSignalR((pedidoAtualizado) => {
    alert(`📦 Pedido ${pedidoAtualizado.id} mudou para: ${pedidoAtualizado.status}`);
    if (pedidoAtualizado.status === "Finalizado") {
      window.location.reload();
    }

    // Aqui você pode atualizar a Tabela, fazer um fetch de dados ou atualizar localmente o estado
  });


  return (
    <div className="min-h-screen bg-gray-100">
      <Faixa />
      <Toolbar
        onToggleFormulario={toggleFormulario}
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
      />


      {/* Formulário centralizado */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded shadow-lg">
            {/* Botão Fechar */}
            <button
              onClick={toggleFormulario}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <FormularioPedido />
          </div>
        </div>
      )}

      <div className="px-4 mt-10">
        <Tabela filtros={filtros} />
      </div>
    </div>
  );
};

export default MinhaPagina;
