import http from '../util/http'
import axios from 'axios';
import CONST from '../util/const'

let Api = function () {
    // this.test2 = CONST.ip + "/wurenji/";
    this.test2 = CONST.ip;

    this.host = this.test2;
    this.login = function (data) {
        var method = "/user/login";
        return http.post(`${this.host}${method}`, data);
    }
    this.loginOut = function (data) {
        var method = "/logout";
        return http.post(`${this.host}${method}`, data);
    }
    this.resetPwdById = function (data) {
        var method = "/sysUser/resetPWDById";
        return http.get(`${this.host}${method}`, data);
    }
    /**
     * 删除工地by id
     * @param data
     * @returns {Promise<unknown>}
     */
    this.deleteGongdiById = function (data) {
        var method = "/project/deleteById";
        return http.get(`${this.host}${method}`, data);
    }
    // 新增工地
    this.addGongdi = function (data) {
        var method = "/project/projectAdd";
        return http.post(`${this.host}${method}`, data);
    }
    // 根据page查询工地
    this.getGongdiList = function (data) {
        var method = "/project/projectPageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 根据id查询工地
    this.getGongdiById = function (data) {
        var method = "/project/selectById";
        return http.get(`${this.host}${method}`, data);
    }
    // 修改工地
    this.updateGongdiById = function (data) {
        var method = "/project/updateById";
        return http.post(`${this.host}${method}`, data);
    }

    // 根据page查询计划
    this.getPlanList = function (data) {
        var method = "/flightPlan/flightPlanPageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 根据id查询计划
    this.getPlanById = function (data) {
        var method = "/flightPlan/selectById";
        return http.get(`${this.host}${method}`, data);
    }
    // 新增计划
    this.addPlan = function (data) {
        var method = "/flightPlan/flightPlanAdd";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改计划
    this.updatePlanById = function (data) {
        var method = "/flightPlan/updateById";
        return http.post(`${this.host}${method}`, data);
    }
    // 删除计划
    this.deletePlanById = function (data) {
        var method = "/flightPlan/deleteById";
        return http.get(`${this.host}${method}`, data);
    }
    // 审核计划
    this.approvalPlanById = function (data) {
        var method = "/flightPlan/updateApprovalById";
        return http.post(`${this.host}${method}`, data);
    }
    // 下载计划
    this.downloadFlightPlan = function (data) {
        let str = CONST.ip + `/wurenji/flightPlan/downloadFlightPlan?endDate=${data.endDate}&startDate=${data.startDate}&region=${data.region}`;
        window.open(str)
    }


    //查询成果图片by planId
    this.getPicByPlanId = function (data) {
        var method = "/flightImg/selectListByPlanId";
        return http.get(`${this.host}${method}`, data);
    }
    //上传图片
    this.uploadPic = function (data) {
        var method = "/flightImg/uploadImg";
        let reqUrl = `${this.host}${method}`;
        // let reqUrl = '${this.host}${method}'
        let instance = axios.create({
            timeOut: 5000
        });
        instance.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'multipart/form-data';
            // config.headers['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
            return config
        }, err => {
            console.log(err)
        })
        return new Promise((resolve, reject) => {
            instance({
                url: reqUrl,
                method: "post",
                data: data
            }).then(res => {
                resolve(res);
            }).catch(function (error) {
                reject(error.data);
            })
        })
    }

    // 查询成果
    this.getResultList = function (data) {
        var method = "/flightResults/flightResultsPageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 导出成果
    this.exportResultDoc = function (planIds) {
        let str = CONST.ip + "/wurenji/flightResults/downloadFlightResultsDoc?"
        for (let i = 0; i < planIds.length; i++) {
            let _str = `ids=${planIds[i]}&`;
            str += _str
        }
        window.open(str)

    }
    // 获取地图信息
    this.getMap = function () {
        var method = "/map/getProjectMapLocationInfo";
        return http.get(`${this.host}${method}`);
    }
    // 获取巡检次数
    this.getXunjianCiShu = function (data) {
        var method = "/dataStatistics/inspectionTimes";
        return http.get(`${this.host}${method}`, data);
    }
    // 获取违规次数（按违规种类分）
    this.getRegionWeiguiCiShu = function (data) {
        var method = "/dataStatistics/getRegionViolationTimes";
        return http.get(`${this.host}${method}`, data);
    }
    // 获取违规次数（按区域分）
    this.getWeiguiCiShu = function (data) {
        var method = "/dataStatistics/getViolationTimes";
        return http.get(`${this.host}${method}`, data);
    }
    // 违规季度环比
    this.getWeiguiHuanbi = function (data) {
        var method = "/dataStatistics/getQuarterRatio";
        return http.get(`${this.host}${method}`, data);
    }
    // 根据page查询用户
    this.getUserList = function (data) {
        var method = "/sysUser/sysUserPageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 新增用户
    this.addUser = function (data) {
        var method = "/sysUser/sysUserAdd";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改用户
    this.modifyUser = function (data) {
        var method = "/sysUser/updateById";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改用户密码
    this.modifyUserSecret = function (data) {
        var method = "/sysUser/updatePWDById";
        return http.get(`${this.host}${method}`, data);
    }
    // 根据id查询用户
    this.getUserById = function (data) {
        var method = "/sysUser/selectById";
        return http.get(`${this.host}${method}`, data);
    }
    // 根据id删除用户
    this.deleteUserById = function (data) {
        var method = "/sysUser/deleteById";
        return http.get(`${this.host}${method}`, data);
    }
    // 用户授予角色
    this.addRoleForUser = function (data) {
        var method = "/sysUser/addRoleForUser";
        return http.post(`${this.host}${method}`, data);
    }
    // 权限列表
    this.getAuthList = function (data) {
        var method = "/sysPermission/sysPermissionPageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改权限
    this.modifyAuth = function (data) {
        var method = "/sysPermission/updateById";
        return http.post(`${this.host}${method}`, data);
    }
    // 新增权限
    this.addAuth = function (data) {
        var method = "/sysPermission/sysPermissionAdd";
        return http.post(`${this.host}${method}`, data);
    }
    // 获取权限 by id
    this.getAuthById = function (data) {
        var method = "/sysPermission/selectById";
        return http.get(`${this.host}${method}`, data);
    }
    // 删除权限
    this.deleteAuthById = function (data) {
        var method = "/sysPermission/deleteById";
        return http.get(`${this.host}${method}`, data);
    }
    // 角色列表
    this.getRoleList = function (data) {
        var method = "/sysRole/sysRolePageList";
        return http.post(`${this.host}${method}`, data);
    }
    // 授权角色
    this.addRoleAuth = function (data) {
        var method = "/sysRole/addPermissionForRole";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改角色
    this.modifyRole = function (data) {
        var method = "/sysRole/updateById";
        return http.post(`${this.host}${method}`, data);
    }

    // 新增角色
    this.addRole = function (data) {
        var method = "/sysRole/sysRoleAdd";
        return http.post(`${this.host}${method}`, data);
    }
    // 获取角色 by id
    this.getRoleById = function (data) {
        var method = "/sysRole/selectById";
        return http.get(`${this.host}${method}`, data);
    }
    // 删除角色
    this.deleteRoleById = function (data) {
        var method = "/sysRole/deleteById";
        return http.get(`${this.host}${method}`, data);
    }
    // 操作日志分页列表
    this.getSysLogPageList = function (data) {
        var method = "/sysLog/getSysLogPageList";
        return http.post(`${this.host}${method}`, data);
    }

    // 入档
    this.addarchives = function (data) {
        var method = "/archives/addarchives";
        return http.post(`${this.host}${method}`, data);
    }
    // 获取目录
    this.getCatalogcode = function () {
        var data = {}
        var method = "/catalogcode/getcode";
        return http.post(`${this.host}${method}`, data);
    }
    // 添加目录
    this.addCatalogcode = function (data) {
        var method = "/catalog/addcatalog";
        return http.post(`${this.host}${method}`, data);
    }


    // 批量上传扫描
    this.uploadImgs = function (data) {
        var method = "/file/uploadImgs";
        let reqUrl = `${this.host}${method}`;
        // let reqUrl = '${this.host}${method}'
        let instance = axios.create({
            timeOut: 5000
        });
        instance.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'multipart/form-data';
            // config.headers['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
            return config
        }, err => {
            console.log(err)
        })
        return new Promise((resolve, reject) => {
            instance({
                url: reqUrl,
                method: "post",
                data: data
            }).then(res => {
                resolve(res);
            }).catch(function (error) {
                reject(error.data);
            })
        })
    }

    // 添加目录
    this.getcatalog = function (data) {
        var method = "/catalog/getcatalog";
        return http.post(`${this.host}${method}`, data);
    }

    // 导出数据
    this.downloaddata = function (data) {
        var method = "/file/downloaddata";
        return http.post(`${this.host}${method}`, data);
    }
    // 导入数据
    this.importdata = function (data) {
        var method = "/data/importdata";
        return http.post(`${this.host}${method}`, data);
    }
    // 查询档案列表
    this.getarchives = function (data) {
        var method = "/archives/getarchives";
        return http.post(`${this.host}${method}`, data);
    }
    // 查询导出档案列表
    this.getarchivesinfo = function (data) {
        var method = "/archives/getarchivesinfo";
        return http.post(`${this.host}${method}`, data);
    }
    // 更新档案
    this.updateboxno = function (data) {
        var method = "/archives/updateboxno";
        return http.post(`${this.host}${method}`, data);
    }
    // 删除档案
    this.deletearchives = function (data) {
        var method = "/archives/deletearchives";
        return http.post(`${this.host}${method}`, data);
    }
    // 查询目录列表
    this.getnocheckarchives = function (data) {
        var method = "/archives/getnocheckarchives";
        return http.post(`${this.host}${method}`, data);
    }
    //获取目录信息
    this.printcatalog = function (data) {
        var method = "/catalog/printcatalog";
        return http.post(`${this.host}${method}`, data);
    }
    // 质检目录
    this.passcheck = function (data) {
        var method = "/catalog/passcheck";
        return http.post(`${this.host}${method}`, data);
    }
    // 修改目录
    this.updatecatalog = function (data) {
        var method = "/catalog/updatecatalog";
        return http.post(`${this.host}${method}`, data);
    }
    // 档案馆-新增用户
    this.dag_adduser = function (data) {
        var method = "/user/adduser";
        return http.post(`${this.host}${method}`, data);
    }
    // 档案馆-查询用户列表
    this.dag_getusers = function (data) {
        var method = "/user/getusers";
        return http.post(`${this.host}${method}`, data);
    }
    // 档案馆-更新用户
    this.updatepwd = function (data) {
        var method = "/user/updatepwd";
        return http.post(`${this.host}${method}`, data);
    }
    // 档案馆-删除用户
    this.deleteuser = function (data) {
        var method = "/user/deleteuser";
        return http.post(`${this.host}${method}`, data);
    }
    // 按状态查询档案
    this.getarchivesbystate = function (data) {
        var method = "/archives/getarchivesbystate";
        return http.post(`${this.host}${method}`, data);
    }
    // 添加目录代码
    this.addcode = function (data) {
        var method = "/catalogcode/addcode";
        return http.post(`${this.host}${method}`, data);
    }
    // 添加目录代码
    this.getarchivesids = function (data) {
        var method = "/archives/getarchivesids";
        return http.post(`${this.host}${method}`, data);
    }
}

export default new Api();
