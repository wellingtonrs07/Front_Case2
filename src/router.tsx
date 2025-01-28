import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import clientRoutes from './pages/routes.tsx';

export const router = createBrowserRouter([
    {
        path: "/",
        loader: () => redirect('/client/dashboard/planos'), // Redireciona para user/dashboard/tarefas
        element: <App />,
    },
    ...clientRoutes,
]);
