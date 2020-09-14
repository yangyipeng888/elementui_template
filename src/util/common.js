import $api from '../api/api'
import CONST from './const'

export default {
    filenos: [],
    getFilenos: function (states, refresh = false) {
        let filenos = this.filenos;
        if (!refresh && filenos && filenos.length) {
            return Promise.resolve(filenos);
        } else {
            return new Promise((resolve, reject) => {
                $api.getarchivesbystate({state: states}).then((res) => {
                    if (res && res.code == 200) {
                        let result = []
                        res.data.forEach((item) => {
                            result.push({value: item});
                        })
                        this.filenos = result;
                        resolve(this.filenos);
                    } else {
                        reject();
                    }
                })
            })

        }
    },
    textSearch(arr, queryString) {
        let results = []
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i];
            if (data.value.indexOf(queryString) != -1) {
                results.push(data)
            }
        }
        if (results.length) {
            return results;
        } else {
            return arr;
        }
    }

}