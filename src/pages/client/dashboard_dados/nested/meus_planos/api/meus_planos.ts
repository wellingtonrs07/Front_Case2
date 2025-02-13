import { config } from '../../../../../../config/config.ts';

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

export async function getContractByIdRequest<T>(contractId: string): Promise<T> {
    const { apiBaseUrl } = config;
    const route = `/client/get-contract/${contractId}`; // Rota para pegar o contrato com um id específico

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

export async function getServicesRequest<T>(): Promise<T> {
    const { apiBaseUrl } = config;
    const route = `/client/services`; // Rota para pegar todos os serviços

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

export async function getClientContractsByIdRequest<T>(clientId: string): Promise<T> {
    const { apiBaseUrl } = config;
    const route = `/client/get-client-contracts/${clientId}`; // Rota para pegar os contratos do cliente com um id específico

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
    export async function getClientData(): Promise<any> {
        let { apiBaseUrl } = config;
        let requestRoute = `/client/cart`; // Rota para pegar os dados do cliente
        
        let options = {
        method: "GET",
        credentials: "include" as RequestCredentials, // Mantém a sessão do usuário
        };
    
        let response = await fetch(apiBaseUrl + requestRoute, options);
    
        if (!response.ok) {
        throw new Error("Erro ao obter os dados do cliente");
        }
    
        let data = await response.json();
        console.log("Dados do cliente obtidos com sucesso:", data);
    
        return data; // Retorna a resposta do cliente diretamente, sem envolver o `response` separadamente
    }