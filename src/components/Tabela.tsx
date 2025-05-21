import React, { useState, useEffect } from 'react';

interface Filtros {
    cliente: string;
    produto: string;
    status: string;
    dataCriacao: string;
}

interface Pedido {
    id: string;
    cliente: string;
    produto: string;
    valor: string;
    status: string;
    dataCriacao: string;
}

interface TabelaProps {
    filtros: Filtros;
}

const Tabela: React.FC<TabelaProps> = ({ filtros }) => {
    const [dados, setDados] = useState<Pedido[]>([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
    const [modoEdicao, setModoEdicao] = useState<boolean>(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [confirmarExclusao, setConfirmarExclusao] = useState<Pedido | null>(null);
    const [carregandoLocal, setCarregandoLocal] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const buscarPedidos = async () => {
            try {
                const response = await fetch('http://localhost:5024/api/orders');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const data = await response.json();
                setDados(data); // Certifique-se de que o formato do `data` corresponde ao tipo `Pedido[]`
            } catch (err: any) {
                setErro(err.message || 'Erro desconhecido');
            } finally {
                setCarregandoLocal(false);
            }
        };

        buscarPedidos();
    }, []);

    const dadosFiltrados = dados.filter((item) =>
        item.cliente.toLowerCase().includes(filtros.cliente.toLowerCase()) &&
        item.produto.toLowerCase().includes(filtros.produto.toLowerCase()) &&
        String(item.status).toLowerCase().includes(filtros.status.toLowerCase()) &&
        item.dataCriacao.includes(filtros.dataCriacao)
    );


    const abrirDetalhes = (pedido: Pedido) => {
        setPedidoSelecionado(pedido);
        setModoEdicao(false);
        setMostrarModal(true);
    };

    const abrirEdicao = (pedido: Pedido) => {
        setPedidoSelecionado(pedido);
        setModoEdicao(true);
        setMostrarModal(true);
    };

    const atualizarPedido = async () => {
        if (pedidoSelecionado) {
            try {
                const response = await fetch(`http://localhost:5024/api/orders/${pedidoSelecionado.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pedidoSelecionado),
                });

                if (!response.ok) {
                    throw new Error('Erro ao atualizar pedido');
                }

                // Atualiza o estado local após sucesso
                setDados((prev) =>
                    prev.map((item) =>
                        item.id === pedidoSelecionado.id ? pedidoSelecionado : item
                    )
                );
                setMostrarModal(false);
            } catch (err: any) {
                alert('Erro ao atualizar pedido: ' + err.message);
            }
        }
    };


    const confirmarDelete = (pedido: Pedido) => {
        setConfirmarExclusao(pedido);
    };

    const deletarPedido = async () => {
        if (confirmarExclusao) {
            try {
                const response = await fetch(`http://localhost:5024/api/orders/${confirmarExclusao.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar pedido');
                }

                // Remove do estado local após exclusão
                setDados((prev) => prev.filter((item) => item.id !== confirmarExclusao.id));
                setConfirmarExclusao(null);
            } catch (err: any) {
                alert('Erro ao deletar pedido: ' + err.message);
            }
        }
    };

    const formatarData = (isoString: string) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    };


    return (
        <div className="px-4 overflow-x-auto">

            {/* MENSAGEM DE LOADING OU ERRO */}
            {carregandoLocal ? (
                <p className="text-center text-gray-500 py-4">Carregando pedidos...</p>
            ) : erro ? (
                <p className="text-center text-red-500 py-4">Erro: {erro}</p>
            ) : null}
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Criação</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {dadosFiltrados.length > 0 ? (
                        dadosFiltrados.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.cliente}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.produto}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.valor}</td>
                                <td className={`px-2 py-1 rounded text-xs font-semibold 
                                ${item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                                        item.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                                    {item.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatarData(item.dataCriacao)}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => abrirDetalhes(item)}
                                    >
                                        Ver
                                    </button>
                                    <button
                                        className="text-yellow-600 hover:underline"
                                        onClick={() => abrirEdicao(item)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => confirmarDelete(item)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">
                                Nenhum resultado encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de Detalhes / Edição */}
            {mostrarModal && pedidoSelecionado && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-6 shadow-md w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {modoEdicao ? 'Editar Pedido' : 'Detalhes do Pedido'}
                        </h2>
                        <div className="space-y-2">
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={pedidoSelecionado.cliente}
                                onChange={(e) =>
                                    setPedidoSelecionado({ ...pedidoSelecionado, cliente: e.target.value })
                                }
                                readOnly={!modoEdicao}
                            />
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={pedidoSelecionado.produto}
                                onChange={(e) =>
                                    setPedidoSelecionado({ ...pedidoSelecionado, produto: e.target.value })
                                }
                                readOnly={!modoEdicao}
                            />
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={pedidoSelecionado.valor}
                                onChange={(e) =>
                                    setPedidoSelecionado({ ...pedidoSelecionado, valor: e.target.value })
                                }
                                readOnly={!modoEdicao}
                            />
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={pedidoSelecionado.status}
                                onChange={(e) =>
                                    setPedidoSelecionado({ ...pedidoSelecionado, status: e.target.value })
                                }
                                readOnly={!modoEdicao}
                            />
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={formatarData(pedidoSelecionado.dataCriacao)}
                                onChange={(e) =>
                                    setPedidoSelecionado({ ...pedidoSelecionado, dataCriacao: e.target.value })
                                }
                                readOnly={!modoEdicao}
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            {modoEdicao && (
                                <button
                                    onClick={atualizarPedido}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Atualizar
                                </button>
                            )}
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {confirmarExclusao && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-6 shadow-md w-full max-w-sm text-center">
                        <p className="text-lg mb-4">
                            Tem certeza que deseja excluir o pedido <strong>{confirmarExclusao.id}</strong>?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={deletarPedido}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Excluir
                            </button>
                            <button
                                onClick={() => setConfirmarExclusao(null)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { Tabela };
