import { config } from '../../../../../../config/config.ts';

export async function postRequest<T>(route: string, method: string = 'POST', body?: any): Promise<T> {
    const { apiBaseUrl } = config;

    const options: RequestInit = {
        method, // O método POST
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Inclui cookies na requisição
    };

    // Adiciona o corpo da requisição, se necessário
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(apiBaseUrl + route, options);

        // Se o status da resposta for 204 No Content, retorna um objeto vazio
        if (response.status === 204) {
            return {} as T; // Retorna um objeto vazio
        }

        // Valida se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        // Retorna o JSON da resposta
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${route}:`, error);
        throw error; // Repropaga o erro para o chamador lidar
    }
}
