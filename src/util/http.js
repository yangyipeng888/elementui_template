import axios from 'axios';
import store from '../store'

axios.defaults.timeout = 1000000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

axios.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'application/json';
        return config;

    },
    function (error) {
        return Promise.error(error);
    }
)

axios.interceptors.response.use(
    function (response) {
        if (response && response.data.code == 401) {
            store.commit('updateLoginTimeOut', true);
        }
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    function (error) {
        console.log("数据传输错误！");
    }
)

const http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    },

    post(url, params) {
        return new Promise(function (resolve, reject) {
            axios({
                method: "POST",
                url: url,
                data: JSON.stringify(params),
            })
                .then(function (response) {
                    resolve(response.data);
                }).catch(function (error) {
                reject(error.data);
            })
        })
    },

    async syncGet(url, params) {
        var res = await axios.get(url, {
            params: params
        });
        res = res.data;
        return new Promise((resolve, reject) => {
            resolve(res);
        });
    },

    async syncPost(url, params) {
        var res = await axios.post(url, JSON.stringify(params));
        res = res.data;

        return res;
    }
}

export default http;
