import Vue from 'vue';

const state = {
    auth_page: {},
    bar_title: {},
    cat_style: {},
    copyright: {},
    mall: {
        setting: {
            theme_color: 'classic-red'
        }
    },
    navbar: {
        navs: []
    },
    plugin: {
        vip_card: {
            setting: {
                background: '#f7f7f7'
            }
        }
    },
    share_setting: [],
    share_setting_custom: {},
    user_center: {},
    __wxapp_img: {},
    theme: "classic-red",
    windowHeight: {
        height: 0,
        width: 0,
        boolean: false
    },
};

const getters = {
    getNavBar(state) {
        return state.navbar;
    },
    getNavBarNavs(state) {
        for (let i = 0, len = state.navbar.navs.length; i < len; i++) {
        }
    },
    getUserCenter(state) {
        return state.user_center;
    },
    getWxappImg(state) {
        return state.__wxapp_img;
    },
    getCatStyle(state) {
        return state.cat_style;
    },
    getVip(state) {
        return state.plugin.vip_card;
    },
    getVideo(state) {
        return state.mall.setting.is_goods_video;
    },
    getShowCart(state) {
        return state.mall.setting.is_show_cart;
    },
    getTheme(state) {
        return state.mall.setting.theme_color;
    },
    getSetting(state) {
        return state.mall.setting;
    }
};

const mutations = {
    mutSetConfig(state, data) {
        for (let item in data) {
            if (item === 'navbar') {
                for (let i = 0; i < data[item].navs.length; i++) {
                    data[item].navs[i].id = i;
                }
            }
            state[item] = data[item];
        }
    },
    mutSetHeight(state, data) {
        state.windowHeight = data;
    }
};

const actions = {
    actionGetConfig(context) {
        Vue.prototype.$mallConfig.getConfig().then(response => {
            context.commit('mutSetConfig', response);
        }).catch(() => {
        });
    },
    actionHeight(context, data) {
        context.commit("mutSetHeight", data);
    },
    actionResetConfig(context) {
        Vue.prototype.$mallConfig.resetConfig();
        Vue.prototype.$mallConfig.getConfig().then(response => {
            context.commit('mutSetConfig', response);
        }).catch(() => {
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

