import HomePage from './pages/home/homePage'
import productAddPage from './pages/productAdd/productAdd'
import ClassPage from './pages/class/class'
import User from './pages/user/user'
import Order from './pages/order/order'
export const router = [
    {
        path:'/',
        component:HomePage,
        exact:true
    },
    {
        path:'/productAdmin',
        component:productAddPage,
        exact:true
    },
    {
        path:'/class',
        component:ClassPage,
        exact:true
    },
    {
        path:'/user',
        component:User,
        exact:true
    },
    {
        path:'/orderLists',
        component:Order,
        exact:true
    }
]