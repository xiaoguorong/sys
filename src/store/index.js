import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
const state = {
    token: window.localStorage.getItem('sys-token') || '',
    orgId: window.localStorage.getItem('sys-orgid') || '',
    camId: window.localStorage.getItem('sys-camid') || '',
    isAdmin: window.localStorage.getItem('sys-campus-is-admin') || '',
    campusNum: window.localStorage.getItem('sys-campus-num') || '',
    headerName: ''
};

// getters
const getters = {
    getToken: state => state.token,
    isLogin: state => !!(state.token),
    getHeaderName: state => state.headerName,
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
    }
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
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
