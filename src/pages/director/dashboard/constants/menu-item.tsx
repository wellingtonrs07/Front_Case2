import { House } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';
import { Money } from '@phosphor-icons/react';
import { Clock } from '@phosphor-icons/react';
import { Calculator } from '@phosphor-icons/react';
import styled from 'styled-components';

export const menuItems = [
    {
        label: 'Dashboard',
        href: '/director/dashboard/ver-graficos',
    },
    {
        label: 'Planos',
        href: '/director/dashboard/planos-dir',
    },
    {
        label: 'Criar Planos',
        href: '/director/dashboard/criar-planos',
    },

    {
        label: 'Promoções',
        href: '/director/dashboard/promocoes',
    },

    {
        label: 'Criar Promoções',
        href: '/director/dashboard/criar-promocoes',
    },

    {
        label: 'Página Inicial',
        href: '/client/dashboard/',
    },

];

const MenuStyles = styled.div`
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #1c2434;
    padding: 20px 30px;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 1.8rem;
        margin-bottom: 25px;
        margin-left: 10px;
        font-weight: 650;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 15px;

        .icon {
            font-size: 2.0rem;
            color: #ffffff;
            background-color: #3c50e0;
            border-radius: 15%;
            margin-top: 3px;
            padding: 2px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    }

    a { 
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 1.0rem;
        font-weight: 500;
        color: #3c50e0;
        text-decoration: none;
        background: none;
        background-color: #3c50e0;
        color: #ffffff;
        transition: background-color 0.3s ease, color 0.3s ease;

        svg {
            font-size: 1.5rem;
        }

        &:hover {
            background-color: #3c50e0;
            color: #ffffff;
        }
    }


`;
