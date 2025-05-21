import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

interface Pedido {
    id: string;
    cliente: string;
    produto: string;
    valor: number;
    status: string;
    dataCriacao: string;
}

export function useSignalR(onPedidoAtualizado: (pedido: Pedido) => void) {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5024/pedidoHub", {
                withCredentials: true
            }) // ajuste para seu backend
            .withAutomaticReconnect()
            .build();

        connection.on("PedidoAtualizado", onPedidoAtualizado);

        connection
            .start()
            .then(() => console.log("✅ Conectado ao SignalR"))
            .catch(console.error);

        return () => {
            connection.stop();
        };
    }, [onPedidoAtualizado]);
}
