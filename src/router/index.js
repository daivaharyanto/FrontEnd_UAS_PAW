import Vue from 'vue' 
import Router from 'vue-router' 

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')
const DashboardAdminLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardAdminLayout.vue') 
const DashboardUserLayout = () =>import(/* webpackChunkName: "dashboard" */ '../components/dashboardUserLayout.vue')

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardAdminContents/${view}.vue`) 
}

function loadView2(view) {
    return() => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardUserContents/${view}.vue`)
}

function loadView3(view) {
    return() => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`)
}

const routes = [    
    { 
        path: '/', 
        component: DashboardAdminLayout, 
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
    
    { 
        path: '/components/dashboardLayout.vue', 
        component: DashboardLayout, 
        children: [ 
            { 
                name: 'Home', 
                path: '', 
                component: loadView3('Home') 
            }, 

            { 
                name: 'Contact Us', 
                path: '/dashboardContents/ContactUs', 
                component: loadView3('ContactUs') 
            },
            
            { 
                name: 'Signup', 
                path: '/dashboardContents/Signup', 
                component: loadView3('Signup') 
            },
            
            { 
                name: 'Login', 
                path: '/dashboardContents/Login', 
                component: loadView3('Login') 
            } 
        ] 
    }, 

    

    { 
        path: '/components/dashboardUserLayout.vue', 
        component: DashboardUserLayout, 
        children: [ 
            { 
                name: 'HomeUser', 
                path: '', 
                component: loadView2('HomeUser') 
            }, 

            { 
                name: 'Contact Us', 
                path: '/dashboardUserContents/ContactUsUser', 
                component: loadView2('ContactUsUser') 
            },
            
            { 
                name: 'Booking', 
                path: '/dashboardUserContents/Booking', 
                component: loadView2('Booking') 
            },
            
            { 
                name: 'Transaction', 
                path: '/dashboardUserCont`ents/Transaction', 
                component: loadView2('Transaction') 
            },
            
            { 
                name: 'User Profile', 
                path: '/dashboardUserContents/UserProfile', 
                component: loadView2('UserProfile') 
            } 
        ] 
    },     
] 
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes}) 

export default router