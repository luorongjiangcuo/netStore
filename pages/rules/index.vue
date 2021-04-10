<template>
    <view class="u-rules">
        <parse :content="html"></parse>
    </view>
</template>

<script>
    import parse from "../../components/basic-component/app-rich/parse.vue";
    export default {
        name: "index",
        data() {
            return {
                html: ''
            }
        },
        components: {
            parse
        },
        onLoad(options) {
            options.keys ? options.keys = JSON.parse(options.keys) : null;
            options.data ? options.data = JSON.parse(options.data) : null;
            this.request(decodeURIComponent(options.url), options.key, options.keys, options.data);
        },
        methods: {
            async request(url,key, keys, data) {
                const res = await this.$request({
                    url: url,
                    method: 'get',
                    data: data ? data : null
                });
                if (res.code === 0) {
                    if (keys && this.$validation.array(keys)) {
                        if (keys.length === 2) {
                            this.html = res.data[keys[0]][keys[1]];
                        }
                    } else {
                        this.html = res.data[key];
                    }
                } else {
                    uni.showModal({
                        title: '提示',
                        content: res.msg
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .u-rules {
        min-height: 100vh;
        background-color: #ffffff;
        padding: 24upx;
    }
</style>