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
                    if (localStorage.getItem("type")==0) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'User', 
                path: '/admin/user', 
                component: loadView('userController'),
                meta: {title:'User'} 
            }, 

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==0) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Barber', 
                path: '/admin/barber', 
                component: loadView('barberController'),
                meta: {title:'Barber'} 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==0) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Hairstyle', 
                path: '/admin/hairstyle', 
                component: loadView('hairstyleController'),
                meta: {title:'Hairstyle'} 
            },

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==0) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Service', 
                path: '/admin/service', 
                component: loadView('serviceController'),
                meta: {title:'Service'}
            },

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==0) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Transaction', 
                path: '/admin/transaction', 
                component: loadView('transactionController'),
                meta: {title:'Transaction'}
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
                component: loadView3('Home'),
                meta: {title:'Home'}
            }, 

            { 
                name: 'About Us', 
                path: '/aboutus', 
                component: loadView3('AboutUs'), 
                meta: {title:'About Us'}
            },
            
            { 
                name: 'Signup', 
                path: '/signup', 
                component: loadView3('Signup'),
                meta: {title: 'Signup'} 
            },
            
            { 
                name: 'Login', 
                path: '/login', 
                component: loadView3('Login'),
                meta: {title:'Login'} 

            } 
        ] 
    }, 

    

    { 
        path: '/components/dashboardUserLayout.vue',
        component: DashboardUserLayout, 
        children: [ 
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'HomeUser', 
                path: '/user/home', 
                component: loadView2('HomeUser'),
                meta: {title:'Home'} 
            }, 

            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'About Us', 
                path: '/user/aboutus', 
                component: loadView2('AboutUsUser'),
                meta: {title:'About Us'} 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Booking', 
                path: '/user/booking', 
                component: loadView2('Booking'),
                meta: {title:'Booking'} 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'Transaction', 
                path: '/user/transaction', 
                component: loadView2('Transaction'),
                meta: {title:'Transaction'} 
            },
            
            { 
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("type")==1) {
                        next()
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem("type")
                        next({ path: '/login' })
                    }
                }, 
                name: 'User Profile', 
                path: '/user/profile', 
                component: loadView2('UserProfile'),
                meta: {title:'Profile'} 
            } 
        ] 
    },     
] 
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes}) 

export default router