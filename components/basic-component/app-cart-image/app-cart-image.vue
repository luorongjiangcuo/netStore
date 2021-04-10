<template>
    <image
            :style="{width: imageWidth,height: imageHeight}"
            :src="src" v-show="is_loading" @load="imgLoad" :class="sign !== 'gift' ? getTheme + '-m-back ' + getTheme : theme + '-background'"
    ></image>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "app-cart-image",

        data() {
            return {
                is_loading: false,
            }
        },

        props: {
            imageWidth: {
                type: String,
                default: '36rpx'
            },
            imageHeight: {
                type: String,
                default: '36rpx'
            },
            src: {
                type: String,
                default: '/static/image/icon/goods-cart.png'
            },
            sign: String,
            theme: String
        },

        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            })
        },
        methods: {
            imgLoad() {
                this.is_loading = true;
            }
        }

    }
</script>
