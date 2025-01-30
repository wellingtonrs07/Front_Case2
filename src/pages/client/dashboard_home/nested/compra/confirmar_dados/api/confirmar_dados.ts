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
  

  export async function postContract(contractData: any): Promise<any> {
    let { apiBaseUrl } = config;
    let requestRoute = `/client/create-contract`; // Rota para criar um novo contrato
    
    let options = {
      method: "POST", // Definindo o método como POST
      headers: {
        "Content-Type": "application/json", // Definindo o tipo de conteúdo como JSON
      },
      credentials: "include" as RequestCredentials, // Mantém a sessão do usuário
      body: JSON.stringify(contractData), // Convertendo o corpo da requisição para JSON
    };
  
    let response = await fetch(apiBaseUrl + requestRoute, options);
  
    if (!response.ok) {
      throw new Error("Erro ao criar o contrato");
    }
  
    let data = await response.json();
    console.log("Contrato criado com sucesso:", data);
  
    return data; // Retorna a resposta do contrato criado
  }