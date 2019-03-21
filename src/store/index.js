import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
const state = {
    token: window.localStorage.getItem('sys-token') || '',//token
    orgId: window.localStorage.getItem('sys-orgid') || '',//机构id
    camId: window.localStorage.getItem('sys-camid') || '',//校区id
    isAdmin: window.localStorage.getItem('sys-campus-is-admin') || '',//是否为校区管理员
    campusNum: window.localStorage.getItem('sys-campus-num') || '',//账号下校区数量
    authList: window.localStorage.getItem('sys-auth-list') || '',//账号所拥有的权限列表
    authApi: window.localStorage.getItem('sys-auth-api') || '',//移动端的所有权限列表
    headerName: '',
};
// getters
const getters = {
    getToken: state => state.token,
    isLogin: state => !!(state.token),
    getHeaderName: state => state.headerName,
    getAuthList: state => state.authList,
};

// actions
const actions = {
    setToken({dispatch, commit, state}, token) {
        window.localStorage.setItem('sys-token', token);
        commit('login', token);
    },
    clearToken({commit, state}) {
        window.localStorage.removeItem('sys-token');
        window.localStorage.removeItem('sys-orgid');
        window.localStorage.removeItem('sys-camid');
        commit('logout');
    },
    setOrgId({dispatch, commit, state}, orgid) {
        window.localStorage.setItem('sys-orgid', orgid);
        commit('updateOrgId', orgid);
    },
    setCamId({dispatch, commit, state}, camid) {
        window.localStorage.setItem('sys-camid', camid);
        commit('updateCamId', camid);
    },
    setHeaderName({dispatch, commit}, headerName){
        commit('updateHeaderName', headerName);
    },
    setAuthList({dispatch, commit, state}, authList) {
        window.localStorage.setItem('sys-auth-list', authList);
        commit('updateAuthList', authList);
    },
    setAuthApi({dispatch, commit, state}, authApi) {
        window.localStorage.setItem('sys-auth-api', authApi);
        commit('updateAuthApi', authApi);
    },
};

// mutations
const mutations = {
    login(state, token) {
        state.token = token;
    },
    logout(state, token) {
        state.token = '';
        state.orgId = '';
        state.camId = '';
    },
    updateHeaderName(state, headerName){
        state.headerName = headerName;
    },
    updateOrgId(state, orgId){
        state.orgId = orgId;
    },
    updateCamId(state, camId){
        state.camId = camId;
    },
    updateAuthApi(state, authApi){
        state.authApi = authApi;
    },
    updateAuthList(state, authList){
        state.authList = authList;
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
