import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const MasterRoute: Routes = [


    {
        key: 'MasterMenu.Sub1',
        path: '/Master-menu-Sub1',
        component: lazy(() => import('@/views/MasterSettings/Sub1/Sub1')),
        authority: [],
    },
    {
        key: 'MasterMenu.Sub2',
        path: '/Master-menu-Sub2',
        component: lazy(() => import('@/views/MasterSettings/Sub2/Sub2')),
        authority: [],
    },
    {
        key: 'MasterMenu.Sub3',
        path: '/Master-menu-Sub3',
        component: lazy(() => import('@/views/MasterSettings/Sub3/Sub3')),
        authority: [],
    },
    {
        key: 'MasterMenu.Sub4',
        path: '/Master-menu-Sub4',
        component: lazy(() => import('@/views/MasterSettings/Sub4/Sub4')),
        authority: [],
    },
    {
        key: 'MasterMenu.HR',
        path: '/Master-menu-HR',
        component: lazy(() => import('@/views/MasterSettings/HR/HR')),
        authority: [],
    },

]

export default MasterRoute