import { redirect, RouteObject } from 'react-router-dom';
import { Dashboard } from './client/dashboard/dashboard.tsx';
import { PlansList } from './client/dashboard/nested/planos/planos.page.tsx';
import AboutUs from "./client/dashboard/nested/sobre_nos/sobre_nos.tsx"

const routes: RouteObject[] = [
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
            }
        ]
    }
];

export default routes;

