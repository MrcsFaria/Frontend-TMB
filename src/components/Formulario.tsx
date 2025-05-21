import React, { useState } from 'react';


const FormularioPedido: React.FC = () => {
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState('Pendente');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoPedido = {
            cliente,
            produto,
            valor: parseFloat(valor),
            status
        };

        try {
            const response = await fetch('http://localhost:5024/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoPedido),
            });

            if (!response.ok) {
                const erroTexto = await response.text();
                throw new Error(`Erro ao criar pedido: ${erroTexto}`);
            }

            alert('Pedido criado com sucesso!');
            setCliente('');
            setProduto('');
            setValor('');
            setStatus('Pendente');
            window.location.reload()

        } catch (error: any) {
            alert(error.message || 'Erro desconhecido');
        }
    };

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Novo Pedido</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">Cliente</label>
                    <input
                        type="text"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Produto</label>
                    <input
                        type="text"
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Valor</label>
                    <input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="..."
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Processando">Processando</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Salvar Pedido
                </button>
            </form>
        </div>
    );
};

export default FormularioPedido;
