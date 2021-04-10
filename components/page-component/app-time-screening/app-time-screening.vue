<template>
    <view @touchmove.stop.prevent="" class="time-bg cross-center">
        <view class="time-dialog">
            <view class="dialog-title">筛选时间</view>
            <view class="flex-wrap main-between time-area">
                <view @click="change(0)" :class="[`${choose==0?`${theme + '-m-text ' + theme + ' ' + theme + '-m-border ' + theme}`:'time-area-item'}`]" class="dialog-choose-item">汇总</view>
                <view @click="change(1)" :class="[`${choose==1?`${theme + '-m-text ' + theme + ' ' + theme + '-m-border ' + theme}`:'time-area-item'}`]" class="dialog-choose-item">今日</view>
                <view @click="change(2)" :class="[`${choose==2?`${theme + '-m-text ' + theme + ' ' + theme + '-m-border ' + theme}`:'time-area-item'}`]" class="dialog-choose-item">昨日</view>
                <view @click="change(3)" :class="[`${choose==3?`${theme + '-m-text ' + theme + ' ' + theme + '-m-border ' + theme}`:'time-area-item'}`]" class="dialog-choose-item">7日</view>
                <view @click="change(4)" :class="[`${choose==4?`${theme + '-m-text ' + theme + ' ' + theme + '-m-border ' + theme}`:'time-area-item'}`]" class="dialog-choose-item">自定义</view>
                <view class="dialog-choose-item" style='border: 0'></view>
            </view>
            <view class="choose-time" v-if="custom">
                <view class="time-title">起始时间</view>
                <view class="year-1">年</view>
                <view class="month-1">月</view>
                <view class="day-1">日</view>
                <view class="year-2">年</view>
                <view class="month-2">月</view>
                <view class="day-2">日</view>
                <picker-view :value="start" :indicator-style="indicatorStyle" class="picker-view" @change="startChange">
                    <picker-view-column>
                        <view v-for="(item,idx) in years" :key="item"
                            :class="[`${startVal[0] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: startVal[0] === idx + 1 || startVal[0] === idx - 1 ? '#999999' : startVal[0] === idx + 2 || startVal[0] === idx - 2 ? '#cdcdcd': '', lineHeight: lineHeight }">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,idx) in months" :key="item"
                            :class="[`${startVal[1] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: startVal[1] === idx + 1 || startVal[1] === idx - 1 ? '#999999' : startVal[1] === idx + 2 || startVal[1] === idx - 2 ? '#cdcdcd': '', lineHeight: lineHeight }">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,idx) in endDays" :key="item"
                            :class="[`${startVal[2] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: startVal[2] === idx + 1 || startVal[2] === idx - 1 ? '#999999' : startVal[2] === idx + 2 || startVal[2] === idx - 2 ? '#cdcdcd': '', lineHeight: lineHeight }">{{item}}</view>
                    </picker-view-column>
                </picker-view>
                <view class="time-title">结束时间时间</view>
                <picker-view :value="end" :indicator-style="indicatorStyle" class="picker-view" @change="endChange">
                    <picker-view-column>
                        <view v-for="(item,idx) in years" :key="item"
                            :class="[`${endVal[0] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: endVal[0] === idx + 1 || endVal[0] === idx - 1 ? '#999999' : endVal[0] === idx + 2 || endVal[0] === idx - 2 ? '#cdcdcd': '' , lineHeight: lineHeight}">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,idx) in months" :key="item"
                            :class="[`${endVal[1] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: endVal[1] === idx + 1 || endVal[1] === idx - 1 ? '#999999' : endVal[1] === idx + 2 || endVal[1] === idx - 2 ? '#cdcdcd': '' , lineHeight: lineHeight}">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,idx) in endDays" :key="item"
                            :class="[`${endVal[2] === idx ?`${theme + '-m-text ' + theme}`: ''}`]"
                            :style="{ color: endVal[2] === idx + 1 || endVal[2] === idx - 1 ? '#999999' : endVal[2] === idx + 2 || endVal[2] === idx - 2 ? '#cdcdcd': '' , lineHeight: lineHeight}">{{item}}</view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="main-center btn-area">
                <view class="submit-btn" @click='cancel' style="color: #666;">取消</view>
                <view class="line"></view>
                <view class="submit-btn" :class="theme + '-m-text ' + theme" @click='click'>确认</view>
            </view>
        </view>
    </view>
</template>

<script>

	import {mapState} from 'vuex';
    const date = new Date()
    const years = []
    const months = []
    const bigDays = []
    const smallDays = []
    const secDays = []
    const otherDays = []

    for (let i = 2015; i <= date.getFullYear(); i++) {
        years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }

    for (let i = 1; i <= 31; i++) {
        bigDays.push(i)
    }
    for (let i = 1; i <= 30; i++) {
        smallDays.push(i)
    }
    for (let i = 1; i <= 28; i++) {
        secDays.push(i)
    }
    for (let i = 1; i <= 29; i++) {
        otherDays.push(i)
    }
	
    export default {
        name: "app-time-screening",
	    props: {
            startDate: String,
            endDate: String,
            time: {
                type: Number,
                default() {
                    return 0;
                }
            },
            theme: String,
	    },
        data() {
            return {
                lineHeight: '72rpx',
                indicatorStyle: '',
                choose: 0,
                today: '',
                yesterday: '',
                weekday: '',
                date_end: '',
                date_start: '',
                years: years,
                months: months,
                startDays: bigDays,
                endDays: bigDays,
                bigDays: bigDays,
                smallDays: smallDays,
                secDays: secDays,
                otherDays: otherDays,
                start: [],
                end: [],
                startVal: [],
                endVal: [],
                custom: false,
            }
        },
        methods: {
            click() {
                let that = this;
                if (that.choose != 4) {
                    that.date_start = '';
                    that.date_end = that.today + ' 23:59:59';
                    switch (that.choose.toString()) {
                        case '0':
                            that.date_start = '';
                            that.date_end = '';
                            break;
                        case '1':
                            that.date_start = that.today;
                            break;
                        case '2':
                            that.date_start = that.yesterday;
                            that.date_end = that.yesterday + ' 23:59:59';
                            break;
                        case '3':
                            that.date_start = that.weekday;
                            break;
                    }
                    that.$emit('click', that.date_start,that.date_end,that.choose);
                } else {
                    let endTime = that.date_end.substring(0, 10)
                    let startTime = that.date_start.substring(0, 10)
                    let end = endTime.split("-");
                    let start = startTime.split("-");
                    if (+end[0] < +start[0]) {
                        uni.showToast({
                            title: '结束时间不应早于开始时间',
                            icon: 'none',
                            duration: 1000
                        })
                    } else if (+end[0] == +start[0]) {
                        if (+end[1] < +start[1]) {
                            uni.showToast({
                                title: '结束时间不应早于开始时间',
                                icon: 'none',
                                duration: 1000
                            })
                        } else if (+end[1] == +start[1]) {
                            if (+end[2] < +start[2]) {
                                uni.showToast({
                                    title: '结束时间不应早于开始时间',
                                    icon: 'none',
                                    duration: 1000
                                })
                            }else {
                                that.$emit('click', that.date_start,that.date_end,that.choose);
                            }
                        }else {
                            that.$emit('click', that.date_start,that.date_end,that.choose);
                        }
                    }else {
                        that.$emit('click', that.date_start,that.date_end,that.choose);
                    }
                }
            },
            cancel() {
                this.$emit('cancel');
            },
            change(e) {
                let that = this;
                that.choose = e;
                that.custom = false;
                if (that.choose == 4) {
                    that.custom = true;
                    that.date_end = that.today;
                    that.date_start = that.today + ' 00:00:00';
                }
            },
            startChange: function(e) {
                const val = e.detail.value;
                this.startVal = e.detail.value;
                let years = this.years;
                let year = this.years[val[0]];
                let month = this.months[val[1]];
                if(month == 2) {
                    if(year%4 == 0 && year %400 != 0) {
                        this.startDays = this.otherDays
                    }else {
                        this.startDays = this.secDays
                    }
                }else if((month < 8 && month%2 == 1) || (month > 7 && month%2 == 0)) {
                    this.startDays = this.bigDays
                }else {
                    this.startDays = this.smallDays
                }
                let day = this.startDays[val[2]];
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 1 && day <= 9) {
                    day = "0" + day;
                }
                this.date_start = year + '-' + month + '-' + day;
            },
            endChange: function(e) {
                const val = e.detail.value;
                this.endVal = e.detail.value;
                let year = this.years[val[0]];
                let month = this.months[val[1]];
                if(month == 2) {
                    if(year%4 == 0 && year %400 != 0) {
                        this.endDays = this.otherDays
                    }else {
                        this.endDays = this.secDays
                    }
                }else if((month < 8 && month%2 == 1) || (month > 7 && month%2 == 0)) {
                    this.endDays = this.bigDays
                }else {
                    this.endDays = this.smallDays
                }
                let day = this.endDays[val[2]];
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 1 && day <= 9) {
                    day = "0" + day;
                }
                this.date_end = year + '-' + month + '-' + day + " 23:59:59";
            },
        },
        created() {
            let that = this;
            let screenWidth = uni.getSystemInfoSync().windowWidth;
            let p = 375 / screenWidth;
            this.lineHeight = 72*p + 'rpx'
            that.choose = that.time;
            if(that.choose == 4) {
                 that.custom = true
            }
            that.date_start = that.startDate;
            that.date_end = that.endDate;
            that.indicatorStyle =  'height: 36px;font-size:14px;';
            var myDate = new Date();
            // 今天
            let year = myDate.getFullYear();
            let month = myDate.getMonth() + 1;
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            let now = myDate.getDate();
            that.today = year + "-" + month + "-" + now;
            var timestamp = Date.parse(new Date());
            // 昨天
            let yesterTime = (timestamp / 1000 - 24 * 60 * 60) * 1000;
            let yesterDate = new Date(yesterTime)
            let yester_year = yesterDate.getFullYear();
            let yester_month = yesterDate.getMonth() + 1;
            if (yester_month >= 1 && yester_month <= 9) {
                yester_month = "0" + yester_month;
            }
            let yester_now = yesterDate.getDate();
            that.yesterday = yester_year + "-" + yester_month + "-" + yester_now;
            // 7天
            let weekTime = (timestamp / 1000 - 24 * 60 * 60 * 7) * 1000;
            let weekDate = new Date(weekTime)
            let week_year = weekDate.getFullYear();
            let week_month = weekDate.getMonth() + 1;
            if (week_month >= 1 && week_month <= 9) {
                week_month = "0" + week_month;
            }
            let week_now = weekDate.getDate();
            that.weekday = week_year + "-" + week_month + "-" + week_now;
            that.start = [];
            that.end = [];
            let startDay;
            let endDay;
            if (that.date_start) {
                startDay = that.date_start;
            } else {
                startDay = that.today;
            }
            if (that.date_end) {
                endDay = that.date_end;
            } else {
                endDay = that.today;
            }
            for(let i in that.years) {
                if (startDay.substring(0, 4) == that.years[i]) {
                    that.start[0] = +i
                }
            }
            for(let i in that.months) {
                if (startDay.substring(5, 7) == that.months[i]) {
                    that.start[1] = +i
                }
            }
            let startMonth = +that.start[1] + 1;
            if(startMonth == 2) {
                if(year%4 == 0 && year %400 != 0) {
                    that.startDays = that.otherDays
                }else {
                    that.startDays = that.secDays
                }
            }else if((startMonth < 8 && startMonth%2 == 1) || (startMonth > 7 && startMonth%2 == 0)) {
                that.startDays = that.bigDays
            }else {
                that.startDays = that.smallDays
            }
            for(let i in that.startDays) {
                if (startDay.substring(8, 10) == that.startDays[i]) {
                    that.start[2] = +i
                }
            }
            that.startVal = that.start;
            if (that.date_end) {
                endDay = that.date_end
            }
            for(let i in that.years) {
                if (endDay.substring(0, 4) == that.years[i]) {
                    that.end[0] = +i
                }
            }
            for(let i in that.months) {
                if (endDay.substring(5, 7) == that.months[i]) {
                    that.end[1] = +i
                }
            }
            let endMonth = +that.end[1] + 1;
            if(endMonth == 2) {
                if(year%4 == 0 && year%400 != 0) {
                    that.endDay = that.otherDays
                }else {
                    that.endDay = that.secDays
                }
            }else if((endMonth < 8 && endMonth%2 == 1) || (endMonth > 7 && endMonth%2 == 0)) {
                that.endDays = that.bigDays
            }else {
                that.endDays = that.smallDays
            }
            for(let i in that.endDays) {
                if (endDay.substring(8, 10) == that.endDays[i]) {
                    that.end[2] = +i
                }
            }
            that.endVal = that.end;
        },
    }
</script>

<style scoped lang="scss">
    .time-bg {
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
        .time-dialog {
            width: #{620rpx};
            border-radius: #{16rpx};
            margin: 0 auto;
            background-color: #fff;
            z-index: 20;
            .dialog-title {
                font-size: #{32rpx};
                color: #353535;
                width: #{620rpx};
                margin: #{32rpx} auto #{40rpx};
                text-align: center;
            }
            .time-area {
                margin-bottom: #{24rpx};
                padding: 0 #{32rpx};
                .dialog-choose-item {
                    width: #{170rpx};
                    height: #{68rpx};
                    line-height: #{68rpx};
                    text-align: center;
                    border-radius: #{34rpx};
                    border: #{2rpx} solid;
                    font-size: #{28rpx};
                    margin-bottom: #{16rpx};
                    &.time-area-item {
                        border-color: #ddd;
                        color: #666;
                    }
                }
            }
            .choose-time {
                position: relative;
                .time-title {
                    margin-left: #{32rpx};
                    color: #666;
                    font-size: #{28rpx};
                    margin-bottom: #{20rpx};
                }
                .year-1 {
                    position: absolute;
                    left: #{192rpx};
                    top: #{146rpx};
                }
                .month-1 {
                    position: absolute;
                    left: #{380rpx};
                    top: #{146rpx};
                }
                .day-1 {
                    position: absolute;
                    right: #{32rpx};
                    top: #{146rpx};
                }
                .year-2 {
                    position: absolute;
                    left: #{192rpx};
                    bottom: #{88rpx};
                }
                .month-2 {
                    position: absolute;
                    left: #{380rpx};
                    bottom: #{88rpx};
                }
                .day-2 {
                    position: absolute;
                    right: #{32rpx};
                    bottom: #{88rpx};
                }
                .picker-view {
                    width: #{556rpx};
                    height: #{216rpx};
                    margin: 0 auto #{20rpx};
                    text-align: center;
                    view {
                        line-height: #{72rpx};
                    }
                }
            }
            .btn-area {
                height: #{88rpx};
                position: relative;
                border-top: #{2rpx} solid #e2e2e2;
                &.other-btn-area {
                    margin-top: #{10rpx};
                }
                .line {
                    height: #{32rpx};
                    width: #{1rpx};
                    background-color: #e2e2e2;
                    position: absolute;
                    top: #{28rpx};
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }
                .submit-btn {
                    height: #{88rpx};
                    line-height: #{88rpx};
                    font-size: #{32rpx};
                    width: #{310rpx};
                    text-align: center;
                }
            }
        }
    }
</style>