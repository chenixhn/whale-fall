function _env() {
    /* var pathList = ['localhost'];
    var url = location.href;
    return url.indexOf(pathList) > -1; */
    return process.env.NODE_ENV || 'production';
}

const rootPath = '';
const devApi = {
    // 列表
    apiTableList: `${rootPath}/mock/table_list.json`,
    // 登录
    apiSubmitLogin: `${rootPath}/mock/login.json`,
    // 注册
    addUser: `${rootPath}/mock/adduser.json`,
    // 用户名校验
    checkName: `${rootPath}/mock/checkname.json`,
    // 删除
    apiDel: `${rootPath}/mock/common.json`,
    //修改
    apiModOrAdd: `${rootPath}/mock/common.json`
};

const proApi = {
    // 列表
    apiTableList: '/users/getList',
    // 登录
    apiSubmitLogin: '/users/login',
    // 注册
    addUser: '/users/addUser',
    // 用户名校验
    checkName: '/users/checkName',
    // 删除
    apiDel: '/users/mobileDel',
    // 添加修改
    apiModOrAdd: '/users/modOrAdd'
};
const api = _env() === 'development' ? devApi : proApi;
export default api;

