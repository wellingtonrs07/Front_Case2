import { config } from '../../../../../../config/config.ts';

export async function getPlansRequest<T>(route: string, method: string = 'GET', body?: any): Promise<T> {
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


export async function getPlanByIdRequest<T>(planId: string): Promise<T> {
    const { apiBaseUrl } = config;
    const route = `/client/get-plan/${planId}`; // Rota para pegar o plano com um id específico

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

export async function updateCartRequest<T>(cartData: any): Promise<T> {
    const { apiBaseUrl } = config;
    const route = '/client/edit-cart'; // A rota para editar o carrinho do cliente

    const options: RequestInit = {
        method: 'PUT', // Usando PUT para atualizar o carrinho
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Inclui cookies na requisição
        body: JSON.stringify(cartData), // Passa os dados do carrinho como corpo da requisição
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
        console.error(`Failed to update cart ${route}:`, error);
        throw error; // Repropaga o erro para o chamador lidar
    }
}
