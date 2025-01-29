import { config } from "@/config/config";

export async function registerRequest(formData: {
    name: string,
    email: string,
    password: string,
    cpf: string, // Adicionando cpf ao estado
    phone: string,
    birth_date: string, // Alterando para string no formato 'YYYY-MM-DD'
    city: string,
    cep: string,
    street_number: string,
}): Promise<Response> {
  let { apiBaseUrl } = config;
  let requestRoute = '/client/auth/register';

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  let response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    throw new Error('Erro ao realizar o cadastro');
  }

  return response;
}
