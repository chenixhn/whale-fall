<template>
    <div class="login_box">
        <vue-particles
        color="#ecf5ff"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#ecf5ff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
        <div class="login">
            <el-form :model="form" :rules="rules" ref="form" label-width="5rem">
                <el-form-item label="用户名" prop="username">
                    <el-input @keyup.native.13="submitForm('form')" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input @keyup.native.13="submitForm('form')" v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即登录</el-button>
                </el-form-item>
                <div class="insert_tip">
                    还没有账号?<span @click="dialogFormVisible=true">立即注册！</span>
                </div>
            </el-form>
        </div>
        <el-dialog title="注册账号"
                   @close="resetForm('ruleForm2')"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   top="28vh"
                   width="36%"
                   :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm2.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" style="margin-left: 10px;" @click="doSubmitForm('ruleForm2')">注 册</el-button>
                <el-button @click="resetForm('ruleForm2')">重 置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {doAddUser, CheckName} from '@/service/get_data';

    export default {
        data() {
            const checkAge = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('用户名不能为空'));
                } else {
                    CheckName({username: value})
                        .then((res) => {
                            if (res.status == 0) {
                                callback();
                            } else {
                                callback(new Error(res.message));
                            }
                        });
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                vModel: '2',
                formLabelWidth: '4em',
                dialogFormVisible: false,
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                ruleForm2: {
                    username: '',
                    password: '',
                    checkPass: ''
                },
                rules2: {
                    username: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        sessionStorage.username = '浩仔';
                        sessionStorage.userId = '1';
                        this.$router.push({path: '/home'});
                        // login(this.form)
                        //     .then((res) => {
                        //         sessionStorage.username = res.data.username;
                        //         sessionStorage.userId = res.data.id;
                        //         this.$router.push({path: '/home'});
                        //     });
                    } else {
                        return false;
                    }
                });
            },
            doSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = this.ruleForm2;
                        delete params.checkPass;
                        doAddUser(params)
                            .then((res) => {
                                console.log(res);
                                this.dialogFormVisible = false;
                                this.$message({
                                    showClose: true,
                                    message: res.message,
                                    type: 'success'
                                });
                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .login_box {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1) url("~@/assets/images/bg_login3.jpg") center no-repeat;
        background-size: cover;
    }

    .login {
        width: 380px;
        padding: 18px 20px 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        & /deep/ .el-form-item.is-required .el-form-item__label:before {
            display: none;
        }
        & /deep/ .el-input__inner {
            color: #fff;
            background-color: rgba(0, 0, 0, 0);
            border-color: #4a90d8;
        }
        & /deep/ .el-form-item.is-error .el-input__inner {
            border-color: #f56c6c;
        }
        & /deep/ .el-form-item__label {
            color: #ecf5ff;
        }
        .insert_tip {
            span {
                color: #419efb;
                cursor: pointer;
            }

            color: #ecf5ff;
            padding-left: 63%;
            font-size: 13px;
        }
    }

    div.dialog-footer {
        text-align: center;
    }
</style>
