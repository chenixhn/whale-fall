webpackJsonp([1],{Umph:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("yYtX"),l={name:"page1",data:function(){return{input21:"",loading:!1,tableData:{title:[{label:"手机号",prop:"mobile"},{label:"姓名",prop:"name"},{label:"地址",prop:"address"}],list:[]},dialog:{formLabelWidth:"5em",dialogFormVisible:!1,form:{id:"",mobile:"",name:"",address:""},rules:{mobile:[{required:!0,message:"输入手机号",trigger:"blur"}],name:[{required:!0,message:"输入姓名",trigger:"blur"}],address:[{required:!0,message:"输入地址",trigger:"blur"}]}}}},computed:{list:function(){var e=this;return this.tableData.list.filter(function(t){return t.name.indexOf(e.input21)>-1||t.mobile.indexOf(e.input21)>-1||t.address.indexOf(e.input21)>-1})}},methods:{getList:function(){var e=this,t={userId:Number(sessionStorage.userId)};Object(o.d)(t).then(function(t){e.tableData.list=t.data?t.data.list:[]})},reset:function(e){this.dialog.dialogFormVisible=!0,this.$refs[e]&&this.$refs[e].resetFields(),this.dialog.form.id=""},view:function(e){this.dialog.dialogFormVisible=!0,this.dialog.form.id=e.id,this.dialog.form.mobile=e.mobile,this.dialog.form.name=e.name,this.dialog.form.address=e.address},doDel:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.b)({id:e.id}).then(function(){t.$message({type:"success",message:"删除成功!"}),t.getList()})})},doSubmit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var i=t.dialog.form;i.userId=Number(sessionStorage.userId),Object(o.g)(i).then(function(){t.$message({type:"success",message:"操作成功!"}),t.getList(),t.dialog.dialogFormVisible=!1,i=null})})}},mounted:function(){this.getList()}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"toolbar"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.reset("form")}}},[e._v("添加")]),e._v(" "),i("el-input",{attrs:{placeholder:"请输入关键字检索",clearable:!0,"prefix-icon":"el-icon-search"},model:{value:e.input21,callback:function(t){e.input21=t},expression:"input21"}})],1),e._v(" "),i("el-table",{attrs:{data:e.list}},[e._l(e.tableData.title,function(e,t){return i("el-table-column",{key:t,attrs:{align:"center",prop:e.prop,label:e.label}})}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){e.view(t.row)}}},[e._v("\n                    编辑\n                ")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.doDel(t.row)}}},[e._v("\n                    删除\n                ")])]}}])})],2),e._v(" "),i("el-dialog",{attrs:{title:"popup",visible:e.dialog.dialogFormVisible},on:{"update:visible":function(t){e.$set(e.dialog,"dialogFormVisible",t)}}},[i("el-form",{ref:"form",attrs:{model:e.dialog.form,rules:e.dialog.rules}},[i("el-form-item",{attrs:{label:"手机号","label-width":e.dialog.formLabelWidth,prop:"mobile"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.dialog.form.mobile,callback:function(t){e.$set(e.dialog.form,"mobile",t)},expression:"dialog.form.mobile"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"姓名","label-width":e.dialog.formLabelWidth,prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.dialog.form.name,callback:function(t){e.$set(e.dialog.form,"name",t)},expression:"dialog.form.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"地址","label-width":e.dialog.formLabelWidth,prop:"address"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.dialog.form.address,callback:function(t){e.$set(e.dialog.form,"address",t)},expression:"dialog.form.address"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialog.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.doSubmit("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")(l,a,!1,function(e){i("wDwo")},"data-v-5656244a",null);t.default=r.exports},wDwo:function(e,t){}});