import http from '@/utils/request';
import api from './_api';

const {apiTableList, apiSubmitLogin, apiDel, apiModOrAdd, addUser, checkName} = api;

/**
 * 登录
 * @param data
 */
export function login(data) {
    return http({
        url: apiSubmitLogin,
        method: 'post',
        data
    });
}

/**
 * 注册
 * @param data
 */
export function doAddUser(data) {
    return http({
        url: addUser,
        method: 'post',
        data
    });
}

/**
 * 校验用户名
 * @param data
 */
export function CheckName(data) {
    return http({
        url: checkName,
        method: 'post',
        data
    });
}

/**
 * 请求列表
 * @param data
 */
export function fetchList(data) {
    return http({
        url: apiTableList,
        method: 'post',
        data
    });
}

/**
 * 添加 & 修改
 * @param data
 */
export function modOrAdd(data) {
    console.log(data);
    return http({
        url: apiModOrAdd,
        method: 'post',
        data
    });
}

/**
 * 删除
 * @param data
 */
export function del(data) {
    return http({
        url: apiDel,
        method: 'post',
        data
    });
}

