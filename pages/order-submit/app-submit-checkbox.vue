<template>
    <view class="app-submit-checkbox"
          :class="[{'round' : round}, iValue === activeValue ? 'active' : 'inactive', iValue === activeValue ? themeBgClass : '']"
          :style="{'width': `${width}rpx`, 'height': `${height}rpx`, borderColor: borderColor}"
          @click.stop="handleClick">
    </view>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "app-submit-checkbox",
        props: {
            value: {
                default: true,
            },
            activeValue: {
                default: true,
            },
            inactiveValue: {
                default: false,
            },
            width: {
                default: 40
            },
            height: {
                default: 40
            },
            sign: {
                default: null,
            },
            borderColor: {
                default: '#cccccc',
            },
            round: {
                default: false,
            },
            theme: {
                default: null,
            },
        },
        data() {
            return {
                iValue: this.value,
                iTheme: this.theme,
            };
        },
        computed: {
            ...mapGetters('mallConfig', {
                defaultTheme: 'getTheme',
            }),
            cTheme() {
                return this.iTheme ? this.iTheme : this.defaultTheme;
            },
            themeBgClass() {
                if (this.cTheme.indexOf('gift') >= 0) {
                    return `${this.cTheme} ${this.cTheme}-background`;
                } else {
                    return `${this.cTheme} ${this.cTheme}-m-back`;
                }
            },
            themeBorderClass() {
                if (this.cTheme.indexOf('gift') >= 0) {
                    return `${this.cTheme} ${this.cTheme}-background`;
                } else {
                    return `${this.cTheme} ${this.cTheme}-m-back`;
                }
            },
        },
        watch: {
            value(v) {
                this.iValue = v;
            },
            theme(v) {
                this.iTheme = v;
            },
        },
        methods: {
            handleClick() {
                this.iValue = this.iValue === this.activeValue ? this.inactiveValue : this.activeValue;
                this.$emit('input', this.iValue, this.sign);
                this.$emit('change', this.iValue, this.sign);
            },
        },
    }
</script>

<style scoped lang="scss">
    .app-submit-checkbox {
        border: #{1rpx} solid;
        display: inline-block;
    }

    .app-submit-checkbox.inactive {
        background: #fff;
    }

    .app-submit-checkbox.round {
        border-radius: #{10000rpx};
    }

    .app-submit-checkbox.active {
        border: none;
        background-image: url("../../static/image/icon/yes-radio.png");
        background-size: 100% 100%;
    }
</style>