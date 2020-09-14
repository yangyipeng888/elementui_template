<template>
    <div>

        <div class="treeBox">
            <el-form :rules="rules2" ref="personForm" :model="modifyForm" label-width="80px">
                <el-form-item prop="account" label="账号">
                    <el-input disabled placeholder="账号" v-model="modifyForm.account"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="昵称">
                    <el-input disabled placeholder="昵称" v-model="modifyForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="pwd" label="修改密码">
                    <el-input type="password" placeholder="密码" v-model="modifyForm.pwd"></el-input>
                </el-form-item>
                <el-form-item prop="pwd2" label="确认密码">
                    <el-input @input="change($event)" type="password" placeholder="再次输入密码"
                              v-model="modifyForm.pwd2"></el-input>
                </el-form-item>

            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="submit()">保存</el-button>
                <!--                <el-button type="primary" @click="initForm">重置</el-button>-->
                <el-button type="primary" @click="close">取消</el-button>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "PersonUser",
        mounted() {
            this.initForm();
        },
        data() {
            var validatePwd2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入确认密码'));
                } else if (this.modifyForm.pwd === this.modifyForm.pwd2) {
                    callback();
                } else {
                    callback(new Error('确认密码不正确，请重新输入'));
                }
            };
            return {
                rules2: {
                    pwd: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    pwd2: [{validator: validatePwd2, trigger: 'blur'}],
                },
                modifyForm: {},
            }
        },
        methods: {
            submit() {
                this.$refs.personForm.validate((valid) => {
                    if (valid) {
                        this.modifyForm.usertype = this.const.getUserType();
                        this.$api.updatepwd(this.modifyForm).then((res) => {
                            if (res) {
                                if (res.code == 200) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            change(e) {
                this.$forceUpdate();
            },
            initForm() {
                let loginData = localStorage.getItem('loginData');
                if (loginData) {
                    let data = JSON.parse(loginData);
                    this.modifyForm = this._.clone(data);
                }

            },
            close() {
                this.$emit('PersonUserClose');
            },
        }
    }
</script>

<style scoped>

</style>