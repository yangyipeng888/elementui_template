let apiIp = process.env.NODE_ENV == 'development' ? 'http://192.168.1.28:8080' : ''; //线上


export default {
    ip: apiIp,
    picSite: apiIp + '/wurenji/profile/',
    problemsOpt: [
        {
            value: 0,
            label: '围蔽情况',
            children: [
                {value: 0, label: '未进行围蔽'},
                {value: 1, label: '围蔽完整'},
                {value: 2, label: '围蔽缺失'},
            ]
        },
        {
            value: 1,
            label: '工程进度',
            children: [
                {value: 0, label: '主体结构及局部桩基础施工'},
                {value: 1, label: '桩基础施工'},
                {value: 2, label: '“三通一平”施工'},
                {value: 3, label: '施工队未进场'},
                {value: 4, label: '停工状态'},
                {value: 5, label: '主体结构施工'},
                {value: 6, label: '桩基础及局部主体结构施工'},
            ]
        },
        {
            value: 2,
            label: '非作业面裸土覆盖情况',
            children: [
                {value: 0, label: '现场已无土方作业'},
                {value: 1, label: '非作业面裸露土未100%覆盖'},
                {value: 2, label: '非作业面裸露土未覆盖'},
                {value: 3, label: '非作业面裸露土已覆盖'},
            ]
        },
        {
            value: 3,
            label: '建筑废弃物情况',
            children: [
                {value: 0, label: '建筑废弃物未及时清理'},
            ]
        },
        {
            value: 4,
            label: '建筑材料情况',
            children: [
                {value: 0, label: '建筑材料堆放混乱'},
                {value: 1, label: '建筑材料堆放整洁'},
            ]
        },
        {
            value: 5,
            label: '作业面工作情况',
            children: [
                {value: 0, label: '作业面已做喷淋'},
                {value: 1, label: '作业面降尘措施不足'},
            ]
        },
    ],
    weiguiName(value) {
        let name = '';
        for (let i = 0; i < this.problemsOpt.length; i++) {
            let item = this.problemsOpt[i];
            if (value == item.value) {
                name = item.label;
            }
        }
        return name;
    },
    weiguiDesc(arr) {
        let desc = [];
        for (let i = 0; i < arr.length; i++) {
            let index1 = arr[i][0];
            let index2 = arr[i][1];
            let lev1 = this.problemsOpt[index1].children;
            let _desc = lev1[index2].label;
            desc.push(_desc);
        }
        return desc.join(',');
    },
    areaOpt: [
        {
            value: '海珠区',
            label: '海珠区',
        }, {
            value: '越秀区',
            label: '越秀区',
        }, {
            value: '番禺区',

            label: '番禺区',
        }, {
            value: '南沙区',
            label: '南沙区',
        }, {
            value: '荔湾区',
            label: '荔湾区',
        }, {
            value: '从化区',
            label: '从化区',
        }, {
            value: '黄埔区',
            label: '黄埔区',
        }, {
            value: '萝岗区',
            label: '萝岗区',
        }, {
            value: '增城区',
            label: '增城区',
        }, {
            value: '天河区',
            label: '天河区',
        }, {
            value: '白云区',
            label: '白云区',
        }, {
            value: '花都区',
            label: '花都区',
        },],
    stateOpt: [
        {
            value: "",
            label: '全部',
        }, {
            value: 0,
            label: '未上传',
        }, {
            value: 1,
            label: '待审批',
        }, {
            value: 2,
            label: '已审批',
        },],
    logOpt: [
        {
            value: "",
            label: '全部',
        }, {
            value: '新增',
            label: '新增',
        }, {
            value: '修改',
            label: '修改',
        }, {
            value: '删除',
            label: '删除',
        },],
    toFixed:
        function (num) {
            num = String(num).replace(/^(.*\..{5}).*$/, "$1");
            return Number(num);
        },
    getUserType:
        function () {
            let loginData = localStorage.getItem('loginData');
            if (loginData) {
                let d = JSON.parse(loginData);
                return d.type;
            }
        },
    menuOpt: [
        {value: 'menu', label: 'menu',},
        {value: 'button', label: 'button',},
    ],
    // 0:刚入档  1:归档 2:待质检 3:已质检 4:已上传
    DANGAN_STATE: {
        jirudang: 0,
        guidang: 1,
        daizhijian: 2,
        yizhijian: 3,
        yishangchuan: 4,
    },
    USER_TYPE: {
        admin: 0,//管理员
        user: 1,//普通用户
    },
    getUserTypeDesc(right) {
        let USER_TYPE_DESC = {
            [this.USER_TYPE.user]: '普通用户',//管理员
            [this.USER_TYPE.admin]: '管理员',//管理员
        }
        return USER_TYPE_DESC[right];
    },
    hasRight:
        function (needRight) {
            let USER_TYPE_LEVEL = {
                [this.USER_TYPE.user]: 0,//管理员
                [this.USER_TYPE.admin]: 1,//管理员
            }
            let curRight = this.getUserType();
            let curLevel = USER_TYPE_LEVEL[curRight];
            let needLevel = USER_TYPE_LEVEL[needRight];
            return curLevel >= needLevel;
        },


}
