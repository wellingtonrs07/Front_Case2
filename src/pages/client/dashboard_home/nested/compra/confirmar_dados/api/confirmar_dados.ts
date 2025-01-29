import { config } from "@/config/config";

export async function getClientData(): Promise<any> {
    let { apiBaseUrl } = config;
    let requestRoute = `/client/adress`; // Rota para pegar os dados do cliente
    
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
  
