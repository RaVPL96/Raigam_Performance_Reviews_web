import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const Masternavigationconfig: NavigationTree[] = [
  
    {
        key: 'Master Settings',
        path: '',
        title: 'Mark Evaluation',
        translateKey: 'nav.MasterMenu.MasterMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'Demarcation',
                path: '/Master-menu-sub1',
                title: 'Sub Heading 1',
                translateKey: 'nav.MasterMenu.Demarcation',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Distributor Mapping',
                path: '/Master-menu-sub2',
                title: 'Sub Heading 2',
                translateKey: 'nav.MasterMenu.DistributorMapping',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Final Geography Mapping',
                path: '/Master-menu-sub3',
                title: 'Sub Heading 3',
                translateKey: 'nav.MasterMenu.FinalGeography',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },

            {
                key: 'Final Geography Mapping',
                path: '/Master-menu-sub4',
                title: 'Sub Heading 4',
                translateKey: 'nav.MasterMenu.FinalGeography',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Final Geography Mapping',
                path: '/Master-menu-HR',
                title: 'HR',
                translateKey: 'nav.MasterMenu.FinalGeography',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]
export default Masternavigationconfig