// src/components/Toolbar.tsx
import React from 'react';

interface ToolbarProps {
  onToggleFormulario: () => void;
  filtros: {
    cliente: string;
    produto: string;
    status: string;
    dataCriacao: string;
  };
  onFiltroChange: (campo: string, valor: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToggleFormulario, filtros, onFiltroChange }) => {
  return (
    <div className="flex flex-row justify-around items-center bg-white h-[100px] w-full px-4 gap-2
                max-[950px]:flex-col max-[950px]:h-[350px] max-[950px]:items-start max-[950px]:px-6 max-[950px]:gap-1">
      <button onClick={onToggleFormulario} className="bg-black text-white px-4 py-2 rounded max-[950px]:w-full">
        Criar Pedido
      </button>
      <input
        type="text"
        placeholder="Pesquisar Cliente"
        value={filtros.cliente}
        onChange={(e) => onFiltroChange("cliente", e.target.value)}
        className="border px-2 py-1 rounded max-[950px]:w-full"
      />
      <input
        type="text"
        placeholder="Pesquisar Produto"
        value={filtros.produto}
        onChange={(e) => onFiltroChange("produto", e.target.value)}
        className="border px-2 py-1 rounded max-[950px]:w-full"
      />
      <input
        type="text"
        placeholder="Pesquisar Status"
        value={filtros.status}
        onChange={(e) => onFiltroChange("status", e.target.value)}
        className="border px-2 py-1 rounded max-[950px]:w-full"
      />
      <input
        type="text"
        placeholder="Data de Criação"
        value={filtros.dataCriacao}
        onChange={(e) => onFiltroChange("dataCriacao", e.target.value)}
        className="border px-2 py-1 rounded max-[950px]:w-full"
      />
    </div>


  );
};

export { Toolbar };

