import { getToken } from './auth';

// Interfaces para los tipos de datos
export interface Item {
    _id: string;
    nombre: string;
    usuario: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
}

const API_BASE_URL = '/api/items';

// Manejo de respuesta y errores
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData: ApiResponse<null> = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error en la solicitud');
    }
    const data: ApiResponse<T> = await response.json();
    return data.data || (data as unknown as T);
}

// GET - Obtener items del usuario autenticado
export async function getItems(): Promise<Item[]> {
    const token = getToken();
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return handleResponse<Item[]>(response);
}

// POST - Crear item
export async function createItem(nombre: string): Promise<Item> {
    const token = getToken();
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre })
    });
    return handleResponse<Item>(response);
}

// PUT - Actualizar item
export async function updateItem(id: string, nombre: string): Promise<Item> {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre })
    });
    return handleResponse<Item>(response);
}

// DELETE - Eliminar item
export async function deleteItem(id: string): Promise<{ success: boolean; message?: string }> {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return handleResponse<{ success: boolean; message?: string }>(response);
}
