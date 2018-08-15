<template>
    <div>
        <div class="toolbar">
            <el-button type="primary" @click="reset('form')">添加</el-button>
            <el-input
                placeholder="请输入关键字检索"
                :clearable="true"
                prefix-icon="el-icon-search"
                v-model="input21">
            </el-input>
        </div>
        <el-table :data="list">
            <el-table-column
                align="center"
                v-for="(item,key) in tableData.title"
                :key="key"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="view(scope.row)" type="text">
                        编辑
                    </el-button>
                    <el-button @click="doDel(scope.row)" type="text">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagenation">
             <div class="inner">
                 <el-pagination
                     background
                     layout="prev, pager, next"
                     :total="1000">
                 </el-pagination>
             </div>
         </div>-->
        <el-dialog title="popup"
                   :visible.sync="dialog.dialogFormVisible">
            <el-form :model="dialog.form" :rules="dialog.rules" ref="form">
                <el-form-item label="手机号" :label-width="dialog.formLabelWidth" prop="mobile">
                    <el-input v-model="dialog.form.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="dialog.formLabelWidth" prop="name">
                    <el-input v-model="dialog.form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="dialog.formLabelWidth" prop="address">
                    <el-input v-model="dialog.form.address" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="doSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {fetchList, del, modOrAdd} from '@/service/get_data';

    // let originData = '';
    export default {
        name: 'page1',
        data: function () {
            return {
                input21: '',
                loading: false,
                tableData: {
                    title: [
                        {label: '手机号', prop: 'mobile'},
                        {label: '姓名', prop: 'name'},
                        {label: '地址', prop: 'address'}],
                    list: []
                },
                dialog: {
                    formLabelWidth: '5em',
                    dialogFormVisible: false,
                    form: {
                        id: '',
                        mobile: '',
                        name: '',
                        address: ''
                    },
                    rules: {
                        mobile: [{required: true, message: '输入手机号', trigger: 'blur'}],
                        name: [{required: true, message: '输入姓名', trigger: 'blur'}],
                        address: [{required: true, message: '输入地址', trigger: 'blur'}]
                    }
                }
            };
        },
        computed: {
            list: function () {
                return this.tableData.list.filter((item) => {
                    return item.name.indexOf(this.input21) > -1 || item.mobile.indexOf(this.input21) > -1 || item.address.indexOf(this.input21) > -1;
                });
            }
        },
        methods: {
            // 获取列表
            getList() {
                const params = {userId: Number(sessionStorage.userId)};
                fetchList(params)
                    .then((res) => {
                        this.tableData.list = res.data ? res.data.list : [];
                    });
            },
            // 窗口被关闭时,清空表单校验以及数据
            reset(formName) {
                // (originData) && (this.dialog.form = JSON.parse(originData));
                this.dialog.dialogFormVisible = true;
                this.$refs[formName] && this.$refs[formName].resetFields();
                this.dialog.form.id = '';
            },
            // 查看数据
            view(data) {
                // originData = JSON.stringify(this.dialog.form);
                this.dialog.dialogFormVisible = true;
                this.dialog.form.id = data.id;
                this.dialog.form.mobile = data.mobile;
                this.dialog.form.name = data.name;
                this.dialog.form.address = data.address;
            },
            // 删除
            doDel(params) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del({id: params.id}).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    });
                });
            },
            // 表单提交
            doSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = this.dialog.form;
                        params.userId = Number(sessionStorage.userId);
                        modOrAdd(params)
                            .then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                                this.dialog.dialogFormVisible = false;
                                params = null;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.getList();
        }
    };
</script>
<style lang="scss" scoped>
    .pagenation {
        margin-top: 10px;
        text-align: center;
        .inner {
            display: inline-block;
        }
    }

    .toolbar {
        margin: 8px 0 16px 0;
    }

</style>
