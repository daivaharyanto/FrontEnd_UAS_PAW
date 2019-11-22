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
        path: '/admin', 
        component: DashboardAdminLayout, 
        children: [ 
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'User', 
                path: '/admin/user', 
                component: loadView('userController') 
            }, 

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Barber', 
                path: '/admin/barber', 
                component: loadView('barberController') 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Hairstyle', 
                path: '/admin/hairstyle', 
                component: loadView('hairstyleController') 
            },

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Service', 
                path: '/admin/service', 
                component: loadView('serviceController') 
            },

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Transaction', 
                path: '/admin/transaction', 
                component: loadView('transactionController') 
            }
        ] 
    }, 
    
    { 
        path: '/', 
        component: DashboardLayout, 
        children: [ 
            { 
                name: 'Home', 
                path: '/', 
                component: loadView3('Home') 
            }, 

            { 
                name: 'Contact Us', 
                path: '/contactus', 
                component: loadView3('ContactUs') 
            },
            
            { 
                name: 'Signup', 
                path: '/signup', 
                component: loadView3('Signup') 
            },
            
            { 
                name: 'Login', 
                path: '/login', 
                component: loadView3('Login') 
            } 
        ] 
    }, 

    

    { 
        path: '/components/dashboardUserLayout.vue',
        component: DashboardUserLayout, 
        children: [ 
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==2) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'HomeUser', 
                path: '/user/home', 
                component: loadView2('HomeUser') 
            }, 

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==2) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Contact Us', 
                path: '/user/contactus', 
                component: loadView2('ContactUsUser') 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==2) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Booking', 
                path: '/user/booking', 
                component: loadView2('Booking') 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==2) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'Transaction', 
                path: '/user/transaction', 
                component: loadView2('Transaction') 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==2) {
                        next()
                    } else {
                        localStorage.setItem("type",0)
                        next({ path: '/login' })
                    }
                }, 
                name: 'User Profile', 
                path: '/user/profile', 
                component: loadView2('UserProfile') 
            } 
        ] 
    },     
] 
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes}) 

export default router