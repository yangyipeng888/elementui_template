<template>
    <div id="mainView">
        <el-header class="header">
            <div class="h_name">智慧档案系统</div>
            <div class="link_panel">
                <span style="font-size: 20px">欢迎使用</span>
                <a class="header_link"
                   @click="personal"
                >,{{userName}}</a>
                <a class="header_link"
                   @click="loginOut"
                >登出</a>
            </div>

        </el-header>
        <el-container class="bottom">
            <el-container>
                <el-aside class="aside">
                    <el-menu
                            style="height: 100%"
                            :default-active="path"
                            :router="true"
                            class=" menu el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">

                        <el-submenu v-if="menuHasRigth(menu)" :index="`${index}`" v-for="(menu,index) in menuItems">
                            <template slot="title">
                                <i :class="menu.bigTitleIcon"></i>
                                <span>{{menu.bigTitle}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-if="hasRight(item.right)" :index="item.route"
                                              v-for="item in menu.items">
                                    <i :class="item.icon"></i>
                                    <span slot="title">{{item.title}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>

            </el-container>
        </el-container>
        <el-dialog
                title="个人信息"
                :visible.sync="dialogVisible"
                width="30%"
                :destroy-on-close="true"
        >
            <PersonUser @PersonUserClose="handlerClose"></PersonUser>

        </el-dialog>
    </div>
</template>
<script>
    import PersonUser from "../components/user/PersonUser";

    export default {
        components: {
            PersonUser
        },
        data() {
            return {
                dialogVisible: false,
                path: '/AddCheckout',
                menuItems: [
                    {
                        bigTitle: '档案管理',
                        bigTitleIcon: 'el-icon-folder',
                        items: [
                            {
                                route: '/AddCheckout',
                                right: this.const.USER_TYPE.user,
                                title: '档案入档',
                                auth: "flightPlan:view",
                                icon: "el-icon-folder-add",
                            },
                            {
                                route: '/CheckoutList',
                                right: this.const.USER_TYPE.user,
                                title: '档案列表',
                                auth: "flightPlan:view",
                                icon: "el-icon-tickets",
                            },
                            {
                                route: '/PrintProgress',
                                right: this.const.USER_TYPE.user,
                                title: '打印清单',
                                auth: "flightPlan:view",
                                icon: "el-icon-set-up",
                            },
                        ]
                    },
                    {
                        bigTitle: '目录管理',
                        bigTitleIcon: 'el-icon-notebook-2',
                        items: [
                            {
                                route: '/AddCatalog',
                                right: this.const.USER_TYPE.user,
                                title: '添加目录',
                                auth: "flightResults:view",
                                icon: "el-icon-document-add",
                            },
                            {
                                route: '/AddCataCode',
                                right: this.const.USER_TYPE.user,
                                title: '目录代码',
                                auth: "flightResults:view",
                                icon: "el-icon-eleme",
                            },
                            {
                                route: '/PrintCatalog',
                                right: this.const.USER_TYPE.user,
                                title: '打印目录',
                                auth: "flightResults:view",
                                icon: "el-icon-printer",
                            },
                            {
                                route: '/CatalogList',
                                right: this.const.USER_TYPE.admin,
                                title: '质检目录',
                                auth: "flightResults:view",
                                icon: "el-icon-s-check",
                            },
                            {
                                route: '/ModifyCatalog',
                                right: this.const.USER_TYPE.admin,
                                title: '编辑目录',
                                auth: "flightResults:view",
                                icon: "el-icon-edit-outline",
                            },
                        ]
                    },
                    {
                        bigTitle: '扫描管理',
                        bigTitleIcon: 'el-icon-money',

                        items: [
                            {
                                route: '/AddScan',
                                right: this.const.USER_TYPE.user,
                                title: '扫描上传',
                                auth: "dataStatistics:view",
                                icon: "el-icon-upload",
                            },
                            {
                                route: '/ModifyScan',
                                right: this.const.USER_TYPE.user,
                                title: '扫描查询',
                                auth: "dataStatistics:view",
                                icon: "el-icon-picture",
                            },
                        ]
                    },
                    {
                        bigTitle: '数据管理',
                        bigTitleIcon: 'el-icon-data-line',
                        items: [
                            {
                                route: '/ExportView',
                                right: this.const.USER_TYPE.user,
                                title: '数据导出',
                                auth: "project:view",
                                icon: "el-icon-download",
                            },
                            {
                                route: '/ImportView',
                                right: this.const.USER_TYPE.user,
                                title: '数据导入',
                                auth: "project:view",
                                icon: "el-icon-upload2",
                            },
                        ]
                    },
                    {
                        bigTitle: '用户管理',
                        bigTitleIcon: 'el-icon-s-custom',

                        items: [
                            {
                                route: '/AddDanganUser',
                                right: this.const.USER_TYPE.admin,
                                title: '添加用户',
                                auth: "project:view",
                                icon: "el-icon-user",
                            },
                            {
                                route: '/DanganUserList',
                                right: this.const.USER_TYPE.admin,
                                title: '用户列表',
                                auth: "project:view",
                                icon: "el-icon-search",
                            },
                        ]
                    },
                ],
                // sysItems: [
                //     {route: '/user', title: '用户配置', auth: "userInfo:view", icon: "el-icon-setting",},
                //     {route: '/role', title: '角色配置', auth: "role:view", icon: "el-icon-setting",},
                //     {route: '/authority', title: '权限配置', auth: "permission:view", icon: "el-icon-setting",},
                //     {route: '/log', title: '操作日志', auth: "sysLog:view", icon: "el-icon-setting",},
                //
                // ]
            }
        },

        watch: {
            $route: {
                handler: function (newVal, oldVal) {
                    let path = newVal.path;
                    for (let i = 0; i < this.menuItems.length; i++) {
                        let items = this.menuItems[i].items;
                        for (let j = 0; j < items.length; j++) {
                            let route = items[j].route;
                            if (path.indexOf(route) != -1) {
                                this.path = route;
                                return;
                            }
                        }

                    }
                },
                immediate: true,
            },
        },
        computed: {
            showSys() {
                for (let i = 0; i < this.sysItems.length; i++) {
                    let auth = this.sysItems[i].auth;
                    if (this.$isShow(auth)) {
                        return true;
                    }
                }
                return false;
            },
            userName() {
                let loginData = localStorage.getItem('loginData');
                if (loginData) {
                    let d = JSON.parse(loginData);
                    return d.name;
                }

            },

        },
        mounted() {

        },
        methods: {
            menuHasRigth(menu) {
                let items = menu.items;
                for (let i = 0; i < items.length; i++) {
                    let has = this.const.hasRight(items[i].right);
                    if (has) {
                        return true;
                    }
                }
                return false;
            },
            hasRight(right) {
                // let has = this.const.hasRight(right);
                // return has;
                return true
            },
            handleOpen() {

            },
            handleClose() {

            },
            personal() {
                this.dialogVisible = true;
            },
            loginOut() {
                this.$router.push('/');
                localStorage.removeItem('loginData');


            },
            handlerClose() {
                this.dialogVisible = false;
            }
        }
    }
</script>
<style lang="scss">
    #mainView {
        height: 100% !important;
        width: 100%;
        margin: 0rem;
        padding: 0rem;


        .header {
            height: 5% !important;
            width: 100%;
            background-image: url("../assets/header.png");
            /*background-color: #409eff;*/
            font-size: 25px;
            margin: 0;
            padding: 0;
            position: relative;
            color: white;
            display: flex;

            .h_name {
                line-height: 2rem;
                font-style: italic;
                font-size: 22px;
                padding-left: 1rem;
                width: 80%;
            }

            .link_panel {
                width: 20%;
                text-align: right;

                .header_link {
                    text-decoration: underline;
                    margin-right: 0.3rem;
                    cursor: pointer;
                    font-size: 15px;
                }
            }

        }

        .bottom {
            height: 95%;
            width: 100%;

            .aside {
                width: 12% !important;
                min-width: 10rem;
                overflow-x: hidden;

                .menu {
                    .menuIcon {
                        height: 1.2rem;
                        width: 1.2rem;
                        margin-right: 0.6rem;
                    }
                }
            }

            .main {
                /*width: 75%;*/
                height: 100%;
                padding: 0;
                margin: 0;
            }
        }


    }
</style>
