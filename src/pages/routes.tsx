import { redirect, RouteObject } from 'react-router-dom';
import { Dashboard } from './client/dashboard_home/dashboard_home.tsx';
import {Dashboard_Compra} from './client/dashboard_compra/dashboard_compra.tsx'
import { PlansList } from './client/dashboard_home/nested/planos/planos.page.tsx';
import AboutUs from "./client/dashboard_home/nested/sobre_nos/sobre_nos.tsx";
import { ClientLogin } from "./client/auth/login/login.tsx";
import { DirectorLogin } from "./director/auth/login.tsx";
import { checkToken } from './client/auth/token/api/CheckToken.ts';
import { Register } from './client/auth/register/register.tsx';
import { EditClientAddress } from './client/dashboard_compra/nested/confirmar_dados/confirmar_dados.tsx';
import { DirectorDashboard } from './director/dashboard/dashboard.tsx';
import {DirPlansList} from './director/dashboard/nested/planos/planos.page.tsx'

const routes: RouteObject[] = [
    {
        path: "/",
        loader: async () => {
            return redirect('/client/dashboard'); 
          }
        },
      {
        path: "client/auth/login",
        element: <ClientLogin />,
        id: "client-login",
      },
      {
        path: "director/auth/login",
        element: <DirectorLogin />,
        id: "director-login",
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
            },
            {
                path: "compra/confirmar-dados", 
                element: <EditClientAddress />,
                id: "confirmar-dados"
            }
        ]
    },
    {
        path: "client/dashboard-compra",
        element: <Dashboard_Compra />,
        id: "dashboard-compra",
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
                loader: async () => redirect('/client/dashboard-compra/confirmar-dados'), // Redireciona para "planos" ao acessar "client/dashboard"
            },

        ]
    },
        {
            path: "director/dashboard",
            element: <DirectorDashboard />,
            id: "director-dashboard",
            loader: async () => {
              try {
                await checkToken();
                return null;
              } catch (error) {
                return redirect('/director/auth/login');
              }
            },
            children:[
                {path: "planos-dir",
                element: <DirPlansList />,
                id: "planos-dir"}
            ]
            },

];

export default routes;

