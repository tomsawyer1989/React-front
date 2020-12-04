import { baseUrl } from '../shared/baseUrl';

export const getInventarios = (params) => {    // Esto debería ser un GET con params serializado, en lugar de un POST con body.
    return fetch(baseUrl + 'inventarios', {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const putInventario = (pedido) => {
    const newPedido = {
        laboratorio_id: pedido.laboratorio_id,
        medicamento_id: pedido.medicamento_id,
        cantidad: pedido.cantidad,
        unidades: pedido.unidades,
    }
    return fetch(baseUrl + 'inventarios', {
        method: "PUT",
        body: JSON.stringify(newPedido),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}