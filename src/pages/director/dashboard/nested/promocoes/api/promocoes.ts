import { config } from '../../../../../../config/config.ts';

// Função para obter promoções
export async function getPromotionsRequest<T>(route: string, method: string = 'GET', body?: any): Promise<T> {
    const { apiBaseUrl } = config;

    const options: RequestInit = {
        method,
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

        // Se o status da resposta for 204 No Content, retorna uma lista vazia
        if (response.status === 204) {
            return [] as T; // Retorna uma lista vazia
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

// Função para deletar promoções
export async function deletePromotionsRequest<T>(route: string, method: string = 'DELETE', body?: any): Promise<T> {
    const { apiBaseUrl } = config;

    const options: RequestInit = {
        method, // O método DELETE
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

// Função para adicionar ou atualizar promoções
export async function postPromotionsRequest<T>(route: string, method: string = 'POST', body?: any): Promise<T> {
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


export async function getPlanByIdRequest<T>(planId: string): Promise<T> {
    const { apiBaseUrl } = config;
    
    // A URL agora recebe o ID do plano diretamente
    const route = `/client/get-plan/${planId}`; // Ajuste a rota conforme sua API

    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Inclui cookies na requisição
    };

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
