import { redirect, RouteObject } from 'react-router-dom';
import { Dashboard } from './client/dashboard_home/dashboard_home.tsx';
import {ConfirmCompra} from './client/dashboard_home/nested/compra/confirmar_dados/confirmar_dados.tsx'
import { PlansList } from './client/dashboard_home/nested/planos/planos.page.tsx';
import AboutUs from "./client/dashboard_home/nested/sobre_nos/sobre_nos.tsx";
import { ClientLogin_Data } from "./client/auth/login/login_dados.tsx";
import { DirectorLogin } from "./director/auth/login.tsx";
import { checkToken } from './client/auth/token/api/CheckToken.ts';
import { Register } from './client/auth/register/register.tsx';
import { DirectorDashboard } from './director/dashboard/dashboard.tsx';
import {DirPlansList} from './director/dashboard/nested/planos/planos.page.tsx'
import { checkTokenDirector } from './director/auth/token/api/CheckToken.ts';
import {CreatePlanForm} from './director/dashboard/nested/criar_planos/criar_planos.tsx'
import {UserServicesPage} from './client/dashboard_dados/nested/meus_planos/meus_planos.tsx';
import { DashboardDados } from './client/dashboard_dados/dashboard_dados.tsx';
import{DirPromotionsList} from './director/dashboard/nested/promocoes/promocoes.tsx'
import {DirPromotionsCreate} from './director/dashboard/nested/criar_promocoes/criar_promocoes.tsx'
import { ClientLoginCompra } from "./client/auth/login/login_compra.tsx";
import {PlanDistributionChart} from './director/dashboard/nested/ver_graficos/ver_graficos.tsx'


const routes: RouteObject[] = [
    {
        path: "/",
        loader: async () => {
            return redirect('/client/dashboard'); 
          }
        },
      {
        path: "client/auth/login-data",
        element: <ClientLogin_Data />,
        id: "client-login-data",
      },
      {
        path: "client/auth/login-compra",
        element: <ClientLoginCompra />,
        id: "client-login-compra",
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
                element: <ConfirmCompra />,
                id: "confirmar-dados",
                loader: async () => {
                    try {
                      await checkToken();
                      return null;
                    } catch (error) {
                      return redirect('/client/auth/login-compra');
                    }
                  },
            }
        ]
    },

        {
            path: "director/dashboard",
            element: <DirectorDashboard />,
            id: "director-dashboard",
            loader: async () => {
              try {
                await checkTokenDirector();
                return null;
              } catch (error) {
                return redirect('/director/auth/login');
              }
            },
            children:[
                {
                    index: true,
                    loader: async () => redirect('/director/dashboard/planos-dir'), // Redireciona para "planos" ao acessar "client/dashboard"
                },
                {path: "planos-dir",
                element: <DirPlansList />,
                id: "planos-dir"},
                {path: "criar-planos",
                element: <CreatePlanForm />,
                id: "criar-planos"},
                {path: "promocoes",
                element: <DirPromotionsList />,
                id: "promocoes"},
                {path: "criar-promocoes",
                element: <DirPromotionsCreate />,
                id: "criar-promocoes"},
                {path: "ver-graficos",
                element: <PlanDistributionChart />,
                id: "ver-graficos"}
            ]
            },
            {
                path:"client/dashboard-dados",
                element:<DashboardDados/>,
                id:"dashboard-dados",
                loader: async () => {
                    try {
                      await checkToken();
                      return null;
                    } catch (error) {
                      return redirect('/client/auth/login-data');
                    }
                  },
                  children:[
                    {
                        index: true,
                        loader: async () => redirect('/client/dashboard-dados/meus-planos'), // Redireciona para "planos" ao acessar "client/dashboard"
                    },
                    {path: "meus-planos",
                    element: < UserServicesPage/>,
                    id: "meus-planos"},
                  ]
            }

];

export default routes;

