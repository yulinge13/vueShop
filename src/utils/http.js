import {
    httpGet,
    httpPost
} from './axios'
const handleHttp = (res) => {
    return new Promise((reslove, reject) => {
        reslove(res)
    })
}
const httpLists = {
    containHttp: {
        //获取菜单
        async getMenuLists() {
            const res = await httpGet({
                url: '/getMenuLists',
                data: {}
            })
            return handleHttp(res)
        },
        //获取所有的商品
        async getAllProduct(data) {
            const res = await httpGet({
                url: '/findLists',
                data: {
                    ...data
                }
            })
            return handleHttp(res)
        },
        //获取所有的分类
        async getAllClass(data) {
            const res = await httpGet({
                url: '/getClass',
                data
            })
            return handleHttp(res)
        },
        //添加分类
        async addClass(data) {
            console.log(data)
            const res = await httpPost({
                url: '/addClass',
                data
            })
            return handleHttp(res)
        },
        //获取一级分类
        async getFirstClass() {
            const res = await httpGet({
                url: '/getFirstClass',
                data: {}
            })
            return handleHttp(res)
        },
        //添加商品
        async addProduct(data) {
            const res = await httpPost({
                url: '/addProduct',
                data
            })
            return handleHttp(res)
        },
        //删除商品
        async removeList(id) {
            const res = await httpPost({
                url: '/removeProduct',
                data: {
                    id
                }
            })
            return handleHttp(res)
        },
        //用户注册
        async addUserInfo(data) {
            const res = await httpPost({
                url: '/addUserInfo',
                data
            })
            return handleHttp(res)
        },
        //用户登陆
        async login(data) {
            const res = await httpPost({
                url: '/login',
                data
            })
            return handleHttp(res)
        },
        //添加订单
        async addOrder(data) {
            const res = await httpPost({
                url: '/addOrder',
                data
            })
            return handleHttp(res)
        },
        //获取列表
        async getOrderLists(data) {
            const res = await httpGet({
                url: '/orderLists',
                data
            })
            return handleHttp(res)
        },
        //支付
        async orderPay(data) {
            const res = await httpPost({
                url: '/orderPay',
                data
            })
            return handleHttp(res)
        }
    }
}
export default httpLists