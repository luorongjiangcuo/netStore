<template>
    <image class="head-bg" :style="{'height': height}" :src="head"></image>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    export default {
        name: 'app-head',
	    props: {
            height: {
                type: String,
                default() {
                    return '360rpx';
                }
            },
			theme: String
        },
	    data() {
            return {
                head: '',
            }
	    },
        computed: {
            ...mapState({
                community: state => state.mallConfig.__wxapp_img.community,
            })
        },
        mounted() {
        	let that = this;
            that.head = that.community.a;
            switch(that.theme) {
                case 'b':
                    that.head = that.community.b;
                    break;
                case 'c':
                    that.head = that.community.c;
                    break;
                case 'd':
                    that.head = that.community.d;
                    break;
                case 'e':
                    that.head = that.community.e;
                    break;
                case 'g':
                    that.head = that.community.g;
                    break;
                case 'h':
                    that.head = that.community.h;
                    break;
                case 'i':
                    that.head = that.community.i;
                    break;
            }
        }
    }
</script>

<style scoped lang="scss">
    .head-bg {
        width: #{750rpx};
        height: #{360rpx};
    }
</style>