<template>
    <image
            class="cats"
            v-show="is_loading" @load="imgLoad"
            src="./image/cats.png"  :class="theme + '-m-back ' + theme"
    ></image>
</template>

<script>
    export default {
        name: "cats-image",

        props: {
            theme: String
        },

        data() {
            return {
                is_loading: false
            }
        },

        methods: {
            imgLoad() {
                this.is_loading = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .cats {
        width:#{56rpx};
        height:#{56rpx};
    }
</style>

