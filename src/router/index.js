import Vue from 'vue' 
import Router from 'vue-router' 

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardAdminLayout.vue') 

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardAdminContents/${view}.vue`) 
}

const routes = [    
    { 
        path: '/', 
        component: DashboardLayout, 
        children: [ 
            { 
                name: 'User', 
                path: '', 
                component: loadView('userController') 
            }, 

            { 
                name: 'Barber', 
                path: '/dashboardAdminContents/barberController', 
                component: loadView('barberController') 
            },
            
            { 
                name: 'Hairstyle', 
                path: '/dashboardAdminContents/hairstyleController', 
                component: loadView('hairstyleController') 
            },
            
            { 
                name: 'Report', 
                path: '/dashboardAdminContents/reportController', 
                component: loadView('reportController') 
            } 

        ] 
    }, 
] 
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes}) 

export default router