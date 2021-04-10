import user from '../../core/user.js';

const state = {
    accessToken: null,
    info: null,
    showLoginModal: false,
    tempParentId: 0,
};

const getters = {
    accessToken(state) {
        return state.accessToken;
    },
    info(state) {
        return state.info;
    },
    showLoginModal(state) {
        return state.showLoginModal;
    },
    tempParentId(state) {
        return state.tempParentId;
    },
    is_vip(state) {
        return state.is_vip_card_user;
    }
};

const mutations = {
    accessToken(state, data) {
        state.accessToken = data;
    },
    info(state, data) {
        state.info = data;
    },
    showLoginModal(state, data) {
        state.showLoginModal = data;
    },
    tempParentId(state, data) {
        state.tempParentId = data;
    },
};

const actions = {
    accessToken(context) {
        if (!user.isLogin()) {
            context.commit('accessToken', null);
        }
        user.getAccessToken().then(accessToken => {
            context.commit('accessToken', accessToken);
        });
    },
    info(context, options) {
        if (!user.isLogin()) {
            context.commit('accessToken', null);
        }
        user.getAccessToken().then(accessToken => {
            context.commit('accessToken', accessToken);
            user.getInfo(options).then(data => {
                context.commit('info', data);
            });
        });
    },
    refreshInfo(context) {
        context.commit('accessToken', null);
    },
    refresh(context) {
        if (!user.isLogin()) {
            context.commit('accessToken', null);
        }
        user.getAccessToken().then(accessToken => {
            context.commit('accessToken', accessToken);
            user.getInfo({
                refresh: true,
            }).then(data => {
                context.commit('info', data);
            }).catch(e => {
            });
        }).catch(e => {
        });
    },
    setTempParentId(context, data) {
        context.commit('tempParentId', data);
    },
    loadAccessTokenFormCache(context) {
        if (context.accessToken) return;
        user.getAccessToken({
            cacheOnly: true,
        }).then(e => {
            if (!e) return;
            context.commit('accessToken', e);
        });
    },
    logout(context) {
        context.commit('accessToken', null);
        user.loginByToken(null);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
