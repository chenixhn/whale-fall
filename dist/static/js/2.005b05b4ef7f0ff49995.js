webpackJsonp([2],{Luci:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=s("yYtX"),o={data:function(){var e=this;return{vModel:"2",formLabelWidth:"4em",dialogFormVisible:!1,form:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},ruleForm2:{username:"",password:"",checkPass:""},rules2:{username:[{validator:function(e,r,s){r?Object(t.a)({username:r}).then(function(e){0==e.status?s():s(new Error(e.message))}):s(new Error("用户名不能为空"))},trigger:"blur"}],password:[{validator:function(r,s,t){""===s?t(new Error("请输入密码")):(""!==e.ruleForm2.checkPass&&e.$refs.ruleForm2.validateField("checkPass"),t())},trigger:"blur"}],checkPass:[{validator:function(r,s,t){""===s?t(new Error("请再次输入密码")):s!==e.ruleForm2.password?t(new Error("两次输入密码不一致!")):t()},trigger:"blur"}]}}},methods:{resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;sessionStorage.username="浩仔",sessionStorage.userId="1",r.$router.push({path:"/home"})})},doSubmitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;var s=r.ruleForm2;delete s.checkPass,Object(t.c)(s).then(function(e){r.dialogFormVisible=!1,r.$message({showClose:!0,message:e.message,type:"success"})})})}}},l={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"login_box"},[s("vue-particles",{staticClass:"lizi",attrs:{color:"#ecf5ff",particleOpacity:.7,particlesNumber:100,shapeType:"circle",particleSize:4,linesColor:"#ecf5ff",linesWidth:1,lineLinked:!0,lineOpacity:.4,linesDistance:150,moveSpeed:2,hoverEffect:!0,hoverMode:"grab",clickEffect:!0,clickMode:"push"}}),e._v(" "),s("div",{staticClass:"login"},[s("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"5rem"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{nativeOn:{keyup:function(r){if(!("button"in r)&&13!==r.keyCode)return null;e.submitForm("form")}},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password"},nativeOn:{keyup:function(r){if(!("button"in r)&&13!==r.keyCode)return null;e.submitForm("form")}},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("form")}}},[e._v("立即登录")])],1),e._v(" "),s("div",{staticClass:"insert_tip"},[e._v("\n                还没有账号?"),s("span",{on:{click:function(r){e.dialogFormVisible=!0}}},[e._v("立即注册！")])])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"注册账号","close-on-click-modal":!1,"close-on-press-escape":!1,top:"28vh",width:"36%",visible:e.dialogFormVisible},on:{close:function(r){e.resetForm("ruleForm2")},"update:visible":function(r){e.dialogFormVisible=r}}},[s("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{model:{value:e.ruleForm2.username,callback:function(r){e.$set(e.ruleForm2,"username",r)},expression:"ruleForm2.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm2.password,callback:function(r){e.$set(e.ruleForm2,"password",r)},expression:"ruleForm2.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm2.checkPass,callback:function(r){e.$set(e.ruleForm2,"checkPass",r)},expression:"ruleForm2.checkPass"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(r){e.doSubmitForm("ruleForm2")}}},[e._v("注 册")]),e._v(" "),s("el-button",{on:{click:function(r){e.resetForm("ruleForm2")}}},[e._v("重 置")])],1)],1)],1)},staticRenderFns:[]};var a=s("VU/8")(o,l,!1,function(e){s("aLZf")},"data-v-0389c1c4",null);r.default=a.exports},aLZf:function(e,r){}});