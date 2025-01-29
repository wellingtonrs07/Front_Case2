import { redirect, RouteObject } from 'react-router-dom';
import { Dashboard } from './client/dashboard_home/dashboard_home.tsx';
import { PlansList } from './client/dashboard_home/nested/planos/planos.page.tsx';
import AboutUs from "./client/dashboard_home/nested/sobre_nos/sobre_nos.tsx"
import {Login} from "./client/auth/login/login.tsx"
import { checkToken } from './client/auth/token/api/CheckToken.ts';
import {Register} from './client/auth/register/register.tsx'

const routes: RouteObject[] = [
    {
        path: "/",
        loader: async () => {
          try {
            await checkToken(); 
            return redirect('/client/dashboard'); 
          } catch (error) {
            return redirect('/client/auth/login'); 
          }
        },
      },
      {
        path: "client/auth/login",
        element: <Login />,
        id: "login",
      },
      {
        path: "client/auth/register",
        element: <Register />,
        id: "register",
      },
    {
        path: "client/dashboard",
        element: <Dashboard />,
        id: "dashboard",
        loader: async () => {
            try {
              await checkToken();
              return null;
            } catch (error) {
              return redirect('/client/auth/login');
            }
          },
        children: [
            {
                index: true,
                loader: async () => redirect('/client/dashboard/planos'), // Redireciona para "planos" ao acessar "client/dashboard"
            },
            {
                path: "planos",
                element: <PlansList />,
                id: "planos"
            },
            {
                path: "sobre-nos",  // Nova rota para a página Sobre Nós
                element: <AboutUs />,
                id: "sobre-nos"
            }
        ]
    }
];

export default routes;

