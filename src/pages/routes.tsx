import { redirect, RouteObject } from 'react-router-dom';
import { Dashboard } from './client/dashboard/dashboard.tsx';
import { PlansList } from './client/dashboard/nested/planos/planos.page.tsx';
import AboutUs from "./client/dashboard/nested/sobre_nos/sobre_nos.tsx"
import {Login} from "./client/auth/login/login.tsx"
import { checkToken } from './client/auth/token/api/CheckToken.ts';

const routes: RouteObject[] = [
    {
        path: "/",
        loader: async () => {
          try {
            await checkToken(); 
            return redirect('/user/dashboard'); 
          } catch (error) {
            return redirect('/user/auth/login'); 
          }
        },
      },
      {
        path: "user/auth/login",
        element: <Login />,
        id: "login",
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
              return redirect('/user/auth/login');
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

