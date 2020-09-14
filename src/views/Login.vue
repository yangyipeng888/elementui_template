<template>
    <div class="login-container">
        <el-image
                class="login_bg"
                :src="require('../assets/bg.jpg')"
                :fit="'cover'"></el-image>
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text"
                          v-model="ruleForm2.account"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                          show-password
                ></el-input>
            </el-form-item>
            <el-checkbox
                    v-model="checked1"
                    class="rememberme"
            >记住密码
            </el-checkbox>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import store from "../store";

    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    password: '',
                },
                rules2: {
                    account: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    password: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked1: false,
            }
        },
        methods: {
            handleSubmit(event) {
                this.$message({
                    message: '登录成功',
                    type: 'success'
                });
                this.$store.commit('updateLoginTimeOut', false);
                this.$router.push({name: 'mainView'});
                return
                this.$refs.ruleForm2.validate((valid) => {
                    let req = {
                        account: this.ruleForm2.account,
                        pwd: this.ruleForm2.password,
                        remember: this.checked1
                    }
                    if (valid) {


                        this.$api.login(req).then((res) => {
                            if (res && res.code == 200) {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                localStorage.setItem('loginData', JSON.stringify(res.data));
                                // this.$store.commit('updateLogindata', res.data);
                                this.$store.commit('updateLoginTimeOut', false);
                                this.$router.push({name: 'mainView'});

                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        })
                        // this.logining = true;
                    } else {
                        console.log('error submit!');
                        return false;
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .login-container {
        width: 100%;
        height: 100%;
        /*background: url("../assets/bg.jpg") no-repeat;*/
        /*background-size: cover;*/
        /*background-position: center 0;*/
        display: flex;
        justify-content: center;
        align-items: center;

        .login_bg {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }

    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        /*margin: 180px auto;*/
        width: 350px;
        height: 300px;
        padding: 35px 35px 15px;
        opacity: 0.8;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>