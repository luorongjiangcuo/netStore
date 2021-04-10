<template>
    <app-layout>
        <view class="poster-goods">
            <view id="head" class="head">
                <view class="main-center cross-center">
                    <!-- #ifdef MP-ALIPAY -->
                    <canvas id="poster2" style="width: 750px; height: 1334px;position: fixed;top: 100%;left: 100%"></canvas>
                    <!-- #endif -->
                    <canvas type="2d" id="poster" style="width: 300px; height: 533.6px;"></canvas>
                </view>
            </view>
            <view class="setting">
                <view class="dir-left-nowrap line">
                    <view class="box-grow-0 main-center cross-center label">
                        <icon :class="getTheme + '-m-back ' + getTheme"></icon>
                        <text>样式</text>
                    </view>
                    <view class="dir-left-wrap box-grow-1" :class="getTheme">
                        <view v-for="(item,key) in styleList" :key="key"
                              @click="changeStyle(item.value)"
                              v-if="config.activity_poster_style.indexOf(item.value.toString()) !== -1"
                              :class="item.value == selectForm.style ? 'active ' + getTheme + '-m-border ' + getTheme : ''"
                              class="style-input main-center cross-center"
                        >
                            <text>{{item.label}}</text>
                            <icon v-if="item.value == selectForm.style" class="icon-active"
                                  :class="getTheme + '-m-back ' + getTheme"></icon>
                        </view>
                    </view>
                </view>

                <view class="dir-left-nowrap line" style="margin-bottom:5rpx">
                    <view class="box-grow-0 main-center cross-center label">
                        <icon :class="getTheme + '-m-back ' + getTheme"></icon>
                        <text>类型</text>
                    </view>
                    <view class="dir-left-wrap box-grow-1" :class="getTheme">
                        <view v-for="(item,key) in typeList" :key="key"
                              @click="changeType(item.value)"
                              :class="item.value == selectForm.type ? 'active ' + getTheme + '-m-border ' + getTheme : ''"
                              class="style-input dir-left-nowrap main-center cross-center"
                        >
                            <view v-if="item.value === 1" class="type-pure"></view>
                            <view v-if="item.value === 2" class="type-gradient"></view>
                            <text>{{item.label}}</text>
                            <icon v-if="item.value == selectForm.type" class="icon-active"
                                  :class="getTheme + '-m-back ' + getTheme"></icon>
                        </view>
                    </view>
                </view>

                <view class="dir-left-nowrap line" v-if="selectForm.type == 1">
                    <view class="box-grow-0 main-center cross-center label" style="margin-top: 19rpx">
                        <icon :class="getTheme + '-m-back ' + getTheme"></icon>
                        <text>颜色</text>
                    </view>
                    <view class="dir-left-wrap box-grow-1">
                        <scroll-view scroll-x class="app-scroll" enable-flex="true">
                            <view v-for="(color,key) in config.color" :key="key"
                                  @click="changeColor(color)"
                                  class="color-bg"
                                  :style="{'background': `${color}`}">
                                <icon v-if="color == selectForm.color" class="icon-active"
                                      :class="getTheme + '-m-back ' + getTheme"></icon>
                            </view>
                        </scroll-view>
                    </view>
                </view>
                <view class="button main-center cross-center" @click="submitSave"
                      :class="getTheme + '-m-back ' + getTheme">保存图片
                </view>
            </view>
        </view>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "goods",
        data() {
            return {
                styleList: [{
                    label: '样式一',
                    value: 1,
                }, {
                    label: '样式二',
                    value: 2,
                }, {
                    label: '样式三',
                    value: 3,
                }, {
                    label: '样式四',
                    value: 4,
                }],
                typeList: [],
                selectForm: null,
                config: {
                    color: [],
                    activity_poster_style: [],
                },
                address: '',
                info: {},
                activity: {},
                middleman: {},
                rpx: 1,
                canvas: null,
                canvas2: null,
                ctx: null,
                activity_id: 0,
                middleman_id: 0,
            }
        },
        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            ...mapState({
                community: state => state.mallConfig.__wxapp_img.community,
            })
        },
        onLoad(options) {
            let that = this;
            that.activity_id = options.activity_id;
            that.middleman_id = options.middleman_id;
            uni.getSystemInfo({
                success(res) {
                    that.rpx = res.windowWidth/375;
                }
            })
            that.loadData();
        },

        methods: {
            drawText(rate,ctx,t,font,x,y,w,center){
                let moreText = false;
                if(t.indexOf('我在') == 0 || t.indexOf('提货地址') == 0) {
                    moreText = true;
                }
                var chr = t.split("");
                var temp = "";              
                var row = [];
                if(rate == 1) {
                    font = font*2  
                }
                ctx.font = font + 'px sans-serif'
                ctx.fillStyle = "#353535";
                ctx.textBaseline = "middle";
                for(var a = 0; a < chr.length; a++){
                    if( ctx.measureText(temp).width < w ){
                        ;
                    }
                    else{
                        row.push(temp);
                        temp = "";
                    }
                    temp += chr[a];
                }
                
                row.push(temp);
                // #ifdef MP-ALIPAY
                row.shift();
                if(!moreText && rate == 1) {
                    y = y + 20
                }
                // #endif
                if(row.length > 2) {
                    for(var b = 0; b < 2; b++){
                        if(center) {
                            ctx.textAlign = 'center';
                        }
                        var str = row[b];
                        if(str == undefined) {
                            str = ''
                        }
                        if(b == 1){
                            str = str.substring(0,str.length-1) + '...';
                        }
                        if(str !== '...') {
                            ctx.fillText(str,x,y+(b+1)*font*1.2);
                        }
                    }
                }else {
                    for(var b = 0; b < row.length; b++){
                        if(center) {
                            ctx.textAlign = 'center';
                        }
                        ctx.fillText(row[b],x,y+(b+1)*font*1.2);
                    }
                }
            },
            fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
                //圆的直径必然要小于矩形的宽高          
                if (2 * radius > width || 2 * radius > height) { return false; }

                cxt.save();
                cxt.translate(x, y);
                //绘制圆角矩形的各个边  
                this.drawRoundRectPath(cxt, width, height, radius);
                cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值  
                cxt.fill();
                cxt.restore();
            },
            strokeRoundRect(cxt, x, y, width, height, radius, lineWidth, strokeColor) {
                //圆的直径必然要小于矩形的宽高          
                if (2 * radius > width || 2 * radius > height) { return false; }

                cxt.save();
                cxt.translate(x, y);
                //绘制圆角矩形的各个边  
                this.drawRoundRectPath(cxt, width, height, radius);
                cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2  
                cxt.strokeStyle = strokeColor || "#000";
                cxt.stroke();
                cxt.restore();
            },

            drawRoundRectPath(cxt, width, height, radius) {
                cxt.beginPath(0);
                //从右下角顺时针绘制，弧度从0到1/2PI  
                cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

                //矩形下边线  
                cxt.lineTo(radius, height);

                //左下角圆弧，弧度从1/2PI到PI  
                cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

                //矩形左边线  
                cxt.lineTo(0, radius);

                //左上角圆弧，弧度从PI到3/2PI  
                cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

                //上边线  
                cxt.lineTo(width - radius, 0);

                //右上角圆弧  
                cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

                //右边线  
                cxt.lineTo(width, height - radius);
                cxt.closePath();
            },
            loadData() {
                const self = this;
                self.$request({
                    url: self.$api.community.poster,
                    data: {
                        activity_id: self.activity_id,
                        middleman_id: self.middleman_id
                    }
                }).then(info => {
                    self.$hideLoading();
                    if (info.code === 0) {
                        self.config = info.data.config;
                        self.info = info.data.info;
                        self.middleman = info.data.middleman;
                        self.activity = info.data.activity;
                        self.activity.goods_list = self.activity.goods_list.slice(0,6);
                        self.typeList = [{
                            label: '纯色',
                            value: 1,
                        }, {
                            label: '背景图',
                            value: 2,
                        }];
                        self.selectForm = {
                            color: self.config['color'][0],
                            style: self.config['activity_poster_style'][0],
                            type: 2,
                        }
                        setTimeout(() => {
                            const query = uni.createSelectorQuery()
                            query.select('#poster')
                                .fields({ node: true, size: true })
                                .exec((res) => {
                                    // #ifndef MP-ALIPAY
                                    self.canvas = res[0].node
                                    self.ctx = self.canvas.getContext('2d')
                                    const dpr = uni.getSystemInfoSync().pixelRatio
                                    self.canvas.width = res[0].width * dpr
                                    self.canvas.height = res[0].height * dpr
                                    self.ctx.scale(dpr, dpr)
                                    self.created(self.canvas,self.ctx, 0.4);
                                    // #endif
                                    // #ifdef MP-ALIPAY
                                    self.$showLoading({
                                        type: 'global',
                                        text: '生成中...'
                                    });
                                    self.activity.goods_list.forEach((item, index) => {
                                        my.getImageInfo({
                                            src: item.cover_pic,  
                                            success: function (res) {
                                                item.cover = res.path
                                                if(index == 5 || index == self.activity.goods_list.length -1) {
                                                    self.canvas = uni.createCanvasContext('poster');
                                                    self.normalCreated(self.canvas,0.4);
                                                    self.canvas2 = uni.createCanvasContext('poster2');
                                                    self.normalCreated(self.canvas2,1);
                                                }
                                            }
                                        })
                                    })
                                    // #endif
                                }
                            )
                        });
                    } else {
                        uni.showToast({title: info.msg,icon: 'none'});
                    }
                })
            },
            changeStyle(value) {
                const self = this;
                self.selectForm.style = value;
                setTimeout(() => {
                    // #ifndef MP-ALIPAY
                    self.created(self.canvas,self.ctx, 0.4);
                    // #endif
                    // #ifdef MP-ALIPAY
                    self.normalCreated(self.canvas, 0.4);
                    self.normalCreated(self.canvas2,1);
                    // #endif
                });
            },
            changeType(value) {
                const self = this;
                self.selectForm.type = value;
                setTimeout(() => {
                    // #ifndef MP-ALIPAY
                    self.created(self.canvas,self.ctx, 0.4);
                    // #endif
                    // #ifdef MP-ALIPAY
                    self.normalCreated(self.canvas, 0.4);
                    self.normalCreated(self.canvas2,1);
                    // #endif
                });
            },
            changeColor(value) {
                const self = this;
                self.selectForm.color = value;
                setTimeout(() => {
                    // #ifndef MP-ALIPAY
                    self.created(self.canvas,self.ctx, 0.4);
                    // #endif
                    // #ifdef MP-ALIPAY
                    self.normalCreated(self.canvas, 0.4);
                    self.normalCreated(self.canvas2,1);
                    // #endif
                });
            },
            submitSave: function () {
                const self = this;
                self.$showLoading({title: `正在保存图片`});
                uni.canvasToTempFilePath({
                  // #ifndef MP-ALIPAY
                  canvas: self.canvas,
                  // #endif
                  // #ifdef MP-ALIPAY
                  x: 0,
                  y: 0,
                  width: 750,
                  height: 1334,
                  destWidth: 750,
                  destHeight: 1334,
                  canvasId: 'poster2',
                  // #endif
                  success: function(res) {
                    // #ifndef MP-ALIPAY
                    uni.getImageInfo({
                        src: res.tempFilePath,
                        success: function (e) {
                            uni.saveImageToPhotosAlbum({
                                filePath: e.path,
                                success: function () {
                                    uni.showToast({title: '保存成功'});
                                },
                                fail: function (err) {
                                    if (err.errMsg) {
                                        uni.showModal({
                                            title: '提示',
                                            content: '您好,请先授权保存到相册权限',
                                            showCancel: false,
                                            success(res) {
                                                if (res.confirm) {
                                                    uni.openSetting({
                                                        success(settingdata) {
                                                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                                uni.saveImageToPhotosAlbum({
                                                                    filePath: e.tempFilePath,
                                                                    success: function () {
                                                                        uni.showToast({title: '保存成功'});
                                                                    },
                                                                })
                                                            } else {
                                                                uni.showModal({
                                                                    title: '提示',
                                                                    content: '授权失败，请稍后重新获取',
                                                                    showCancel: false,
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                },
                                complete: function (e) {
                                    self.$hideLoading();
                                }
                            });
                        },
                        fail: function (e) {
                            uni.showModal({
                                title: '图片下载失败',
                                content: e.errMsg,
                                showCancel: false,
                            });
                        },
                        complete: function (e) {
                            self.$hideLoading();
                        }
                    });
                    // #endif
                    // #ifdef MP-ALIPAY
                    my.saveImage({
                        url: res.tempFilePath,
                        success: () => {
                            my.hideLoading();
                            self.$hideLoading();
                            uni.showToast({
                                title: '保存成功',
                                duration: 3000,
                                icon: 'none',
                            });
                        },
                        fail() {
                            my.hideLoading();
                            self.$hideLoading();
                        },
                        complete() {
                        }
                    });
                    // #endif
                  }
                })
            },
            // #ifndef MP-ALIPAY
            created(canvas, ctx,rpx) {
                let that = this;
                that.$showLoading({
                    type: 'global',
                    text: '生成中...'
                });
                ctx.clearRect(0, 0, 750*rpx,1334*rpx)
                that.address = that.middleman.city+that.middleman.district;
                if(that.middleman.city != that.middleman.province) {
                    that.address = that.middleman.province + that.address
                }
                // 背景图
                if(that.selectForm.type == 1) {
                    // 填充颜色
                    ctx.fillStyle= that.selectForm.color;
                    ctx.fillRect(0, 0, 750*rpx,1334*rpx);
                    that.chooseStyle(canvas, ctx,rpx);
                }else {
                    // 填充图片
                    const bg = canvas.createImage();
                    bg.src = that.config.image_bg;
                    if(bg.src.indexOf('http://') == 0) {
                        bg.src.replace('http://','https://')
                    }
                    bg.onload = () => {
                        ctx.drawImage(bg, 0, 0, 750*rpx,1334*rpx)
                        that.chooseStyle(canvas, ctx,rpx)
                    }
                }
            },
            chooseStyle(canvas, ctx,rpx) {
                let that = this;
                const style = canvas.createImage();
                let x, y, size,textFont, textX, textY, textWidth,GoodsSize,infoX,infoY,infoSize,infoLeft,infoTop,qrX,qrY,qrWidth;
                // 样式一

                if(that.selectForm.style == 1) {
                    x = 78*rpx;
                    y = 133*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 195*rpx
                    textY = 130*rpx
                    textWidth = 480*rpx
                    GoodsSize = 370*rpx
                    infoX = 132*rpx
                    infoY = 1000*rpx
                    infoSize = 33*rpx
                    infoLeft = 64*rpx
                    infoTop = 1060*rpx
                    qrX = 440*rpx
                    qrY = 984*rpx
                    qrWidth = 240*rpx
                    style.src = that.community.style1;
                }else if(that.selectForm.style == 2) {
                    x = 80*rpx;
                    y = 810*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 197*rpx
                    textY = 807*rpx
                    textWidth = 480*rpx
                    GoodsSize = 180*rpx
                    infoX = 430*rpx
                    infoY = 985*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1045*rpx
                    qrX = 70*rpx
                    qrY = 945*rpx
                    qrWidth = 240*rpx
                    style.src = that.community.style2;
                }else if(that.selectForm.style == 3) {
                    x = 80*rpx;
                    y = 164*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 200*rpx
                    textY = 161*rpx
                    textWidth = 480*rpx
                    GoodsSize = 310*rpx
                    infoX = 430*rpx
                    infoY = 1040*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1100*rpx
                    qrX = 70*rpx
                    qrY = 1000*rpx
                    qrWidth = 240*rpx
                    style.src = that.community.style3;
                }else if(that.selectForm.style == 4) {
                    x = 56*rpx;
                    y = 124*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 192*rpx
                    textY = 121*rpx
                    textWidth = 480*rpx
                    GoodsSize = 464*rpx
                    infoX = 430*rpx
                    infoY = 1040*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1100*rpx
                    qrX = 70*rpx
                    qrY = 1000*rpx
                    qrWidth = 240*rpx
                    style.src = that.community.style4;
                }
                style.onload = () => {
                    ctx.drawImage(style, 0, 0, 750*rpx,1334*rpx)
                    // 头像
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(size / 2 + x, size / 2 + y, size / 2, 0, Math.PI * 2, false);
                    ctx.strokeStyle ='white';
                    ctx.stroke();
                    ctx.clip();

                    const avatar = canvas.createImage();
                    avatar.src = that.info.avatar;
                    avatar.onload = () => {
                        ctx.drawImage(avatar, x, y, size, size);
                        ctx.restore();
                        let tip = '我在'+that.address+that.middleman.location+'发现了一个超划算的团购！';
                        ctx.textAlign = 'left'
                        that.drawText(rpx,ctx,tip,textFont, textX, textY, textWidth);
                        // 商品
                        that.drawGoods(canvas, ctx,GoodsSize);
                        that.drawInfo(canvas, ctx,infoX,infoY,infoSize,infoLeft,infoTop,that.address)
                        // 二维码
                        const qrcode = canvas.createImage();
                        qrcode.src = that.activity.qrcode;
                        qrcode.onload = () => {
                            ctx.drawImage(qrcode,qrX, qrY, qrWidth, qrWidth);
                        }
                    }
                }
            },
            drawInfo(canvas, ctx,x,y,size,infoLeft,infoTop,address) {
                let that = this;
                let rpx = 0.26;
                // 团长头像
                const avatar = canvas.createImage();
                avatar.src = that.middleman.avatar;
                avatar.onload = () => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(size / 2 + x, size / 2 + y, size / 2, 0, Math.PI * 2, false);
                    ctx.strokeStyle ='white';
                    ctx.stroke();
                    ctx.clip();
                    ctx.drawImage(avatar, x, y, size, size);
                    ctx.restore();
                    ctx.textAlign = 'left';
                    ctx.font = '10px sans-serif';
                    ctx.fillStyle = "#353535";
                    ctx.fillText('团长:', infoLeft, infoTop-62*rpx);
                    ctx.fillText('结束时间: ' + that.activity.end_at, infoLeft, infoTop);
                    ctx.fillText(that.middleman.name, x+63*rpx, infoTop-62*rpx);
                    that.drawText(rpx,ctx,'提货地址: '+address+that.middleman.detail,11, infoLeft, infoTop+10*rpx,500*rpx);
                }
            },
            drawGoods(canvas, ctx,top) {
                let that = this;
                let rpx = 0.4;
                let delLeft;
                let delWidth;
                let left;
                let sum = 0;
                // 单个商品
                const cover = canvas.createImage();
                if(that.activity.goods_list.length == 1) {
                    cover.src = that.activity.goods_list[0].cover_pic;
                    if(cover.src.indexOf('http://') == 0) {
                        cover.src.replace('http://','https://')
                    }
                    cover.onload = () => {
                        ctx.drawImage(cover,195*rpx, top, 360*rpx, 360*rpx);
                        that.drawText(rpx,ctx,that.activity.goods_list[0].name,14, 370*rpx, top+360*rpx,590*rpx,true);
                        ctx.textAlign = 'center';
                        ctx.font = '14px sans-serif';
                        ctx.fillStyle = "#ff4544";
                        ctx.fillText('￥'+that.activity.goods_list[0].price, 370*rpx, top+490*rpx)
                        ctx.font = '13px sans-serif';
                        ctx.fillStyle = "#999999";
                        ctx.fillText('￥'+that.activity.goods_list[0].original_price, 370*rpx, top+520*rpx);
                        delWidth = (that.activity.goods_list[0].original_price.length + 1)*15+30;
                        delLeft = 375 - delWidth/2;
                        ctx.fillRect(delLeft*rpx,top+516*rpx,delWidth*rpx,1);
                        that.$hideLoading();
                    }
                // 两个商品
                }else if(that.activity.goods_list.length == 2) {
                    top = top+15*rpx;
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        that.activity.goods_list[i].cover = canvas.createImage();
                        that.activity.goods_list[i].cover.src = that.activity.goods_list[i].cover_pic;
                        if(that.activity.goods_list[i].cover.src.indexOf('http://') == 0) {
                            that.activity.goods_list[i].cover.src.replace('http://','https://')
                        }
                        that.activity.goods_list[i].cover.onload = () => {
                            if(sum == 1) {
                                left = 395*rpx;
                            }else {
                                left = 65*rpx;
                            }
                            that.strokeRoundRect(ctx, left, top, 290*rpx, 450*rpx, 8*rpx,2*rpx, '#e5e5e5');
                            ctx.beginPath();
                            ctx.save();
                            let width = 266*rpx;
                            let radius = 8*rpx;
                            let angleLine = 10*rpx;
                            let startTop = top + 2*rpx;
                            let startLeft = left + 2*rpx;
                            ctx.lineWidth = 1;
                            ctx.strokeStyle ='white';
                            ctx.moveTo(startLeft+angleLine,startTop);//出发点
                            ctx.lineTo(startLeft+angleLine+width,startTop);//顶部
                            ctx.arcTo(startLeft+angleLine*2+width,startTop,startLeft+angleLine*2+width,startTop+angleLine,radius);//右上角圆角
                            ctx.lineTo(startLeft+angleLine*2+width,startTop+angleLine*2+width);//到右下角
                            ctx.lineTo(startLeft,startTop+width+angleLine*2);//到左下角
                            ctx.lineTo(startLeft,startTop+angleLine);//到左上角
                            ctx.arcTo(startLeft,startTop,startLeft+angleLine,startTop,radius);//左上角圆角
                            ctx.closePath();
                            ctx.stroke();
                            ctx.clip();
                            ctx.drawImage(that.activity.goods_list[sum].cover,left+2*rpx, top+2*rpx, 286*rpx, 286*rpx);
                            ctx.restore();
                            that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, left+145*rpx, top+280*rpx,256*rpx,true);
                            ctx.textAlign = 'center';
                            ctx.font = '13px sans-serif';
                            ctx.fillStyle = "#ff4544";
                            ctx.fillText('￥'+that.activity.goods_list[sum].price, left+145*rpx, top+388*rpx)
                            ctx.font = '11px sans-serif';
                            ctx.fillStyle = "#999999";
                            ctx.fillText('￥'+that.activity.goods_list[sum].original_price, left+145*rpx, top+418*rpx);
                            delWidth = (that.activity.goods_list[sum].original_price.length + 1)*14+20;
                            ctx.textAlign = 'center';
                            delLeft = left+(145 - delWidth/2)*rpx
                            ctx.fillRect(delLeft,top+414*rpx,delWidth*rpx,2*rpx);
                            sum++
                            if(sum == 2) {
                                that.$hideLoading();
                            }
                        }
                    }
                // 三个商品
                }else if(that.activity.goods_list.length == 3) {
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        that.activity.goods_list[i].cover = canvas.createImage();
                        that.activity.goods_list[i].cover.src = that.activity.goods_list[i].cover_pic;
                        if(that.activity.goods_list[i].cover.src.indexOf('http://') == 0) {
                            that.activity.goods_list[i].cover.src.replace('http://','https://')
                        }
                        that.activity.goods_list[i].cover.onload = () => {
                            if(sum > 0) {
                                top = top + 182*rpx;
                            }
                            ctx.drawImage(that.activity.goods_list[sum].cover,65*rpx, top, 150*rpx, 150*rpx);
                            ctx.beginPath();
                            ctx.save();
                            let width = 130*rpx;
                            let radius = 8*rpx;
                            let angleLine = 10*rpx;
                            let startleft = 65*rpx;
                            ctx.lineWidth = 1;
                            ctx.strokeStyle ='white';
                            ctx.moveTo(startleft+angleLine,top);//出发点
                            ctx.arcTo(startleft+angleLine*2+width,top,startleft+angleLine*2+width,top+angleLine,radius);//右上角圆角
                            ctx.arcTo(startleft+angleLine*2+width,top+angleLine*2+width,startleft+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                            ctx.arcTo(startleft,top+width+angleLine*2,startleft,top+width+angleLine,radius);//左下角圆角
                            ctx.arcTo(startleft,top,startleft+angleLine*2,top,radius);//左上角圆角
                            ctx.closePath();
                            ctx.stroke();
                            ctx.clip();
                            ctx.restore();
                            ctx.textAlign = 'left';
                            that.drawText(rpx,ctx,that.activity.goods_list[sum].name,13, 239*rpx, top-15*rpx,450*rpx);
                            ctx.font = '13px sans-serif';
                            ctx.fillStyle = "#ff4544";
                            ctx.fillText('￥'+that.activity.goods_list[sum].price, 239*rpx, top+100*rpx)
                            ctx.font = '11px sans-serif';
                            ctx.fillStyle = "#999999";
                            ctx.fillText('￥'+that.activity.goods_list[sum].original_price, 239*rpx, top+137*rpx);
                            delWidth = (that.activity.goods_list[sum].original_price.length + 1)*15+12;
                            delLeft = 239;
                            ctx.fillRect(delLeft*rpx,top+135*rpx,delWidth*rpx,2*rpx);
                            sum++
                            if(sum == 3) {
                                that.$hideLoading();
                            }
                        }
                    }
                // 四个商品
                }else if(that.activity.goods_list.length == 4) {
                    top = top - 10*rpx;
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        that.activity.goods_list[i].cover = canvas.createImage();
                        that.activity.goods_list[i].cover.src = that.activity.goods_list[i].cover_pic;
                        if(that.activity.goods_list[i].cover.src.indexOf('http://') == 0) {
                            that.activity.goods_list[i].cover.src.replace('http://','https://')
                        }
                        that.activity.goods_list[i].cover.onload = () => {
                            if(sum > 0) {
                                top = top + 140*rpx;
                            }
                            ctx.beginPath();
                            ctx.save();
                            let width = 100*rpx;
                            let radius = 8*rpx;
                            let angleLine = 10*rpx;
                            let left = 65*rpx;
                            ctx.lineWidth = 1;
                            ctx.strokeStyle ='white';
                            ctx.moveTo(left+angleLine,top);//出发点
                            ctx.arcTo(left+angleLine*2+width,top,left+angleLine*2+width,top+angleLine,radius);//右上角圆角
                            ctx.arcTo(left+angleLine*2+width,top+angleLine*2+width,left+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                            ctx.arcTo(left,top+width+angleLine*2,left,top+width+angleLine,radius);//左下角圆角
                            ctx.arcTo(left,top,left+angleLine*2,top,radius);//左上角圆角
                            ctx.closePath();
                            ctx.stroke();
                            ctx.clip();
                            ctx.drawImage(that.activity.goods_list[sum].cover,65*rpx, top, 120*rpx, 120*rpx);
                            ctx.restore();
                            ctx.textAlign = 'left';
                            that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, 209*rpx, top-25*rpx,480*rpx);
                            ctx.font = '12px sans-serif';
                            ctx.fillStyle = "#ff4544";
                            ctx.fillText('￥'+that.activity.goods_list[sum].price, 209*rpx, top+80*rpx)
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = "#999999";
                            ctx.fillText('￥'+that.activity.goods_list[sum].original_price, 209*rpx, top+102*rpx);
                            delWidth = (that.activity.goods_list[sum].original_price.length + 1)*12+12;
                            delLeft = 212;
                            ctx.fillRect(delLeft*rpx,top+100*rpx,delWidth*rpx,2*rpx);
                            sum++
                            if(sum == 4) {
                                that.$hideLoading();
                            }
                        }
                    }
                // 五个商品
                }else if(that.activity.goods_list.length > 4) {
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        that.activity.goods_list[i].cover = canvas.createImage();
                        that.activity.goods_list[i].cover.src = that.activity.goods_list[i].cover_pic;
                        if(that.activity.goods_list[i].cover.src.indexOf('http://') == 0) {
                            that.activity.goods_list[i].cover.src.replace('http://','https://')
                        }
                        that.activity.goods_list[i].cover.onload = () => {
                            left = 48*rpx;
                            delLeft = 192
                            if(sum == 1 || sum == 3 || sum == 5) {
                                left = 398*rpx;
                                delLeft = 537;
                            }
                            if(sum == 0) {
                                top = top + 20*rpx;
                            }else if(sum == 2) {
                                top = top + 172*rpx;
                            }else if(sum == 4) {
                                top = top + 172*rpx;
                            }
                            ctx.beginPath();
                            ctx.save();
                            let width = 100*rpx;
                            let radius = 8*rpx;
                            let angleLine = 10*rpx;
                            ctx.lineWidth = 1;
                            ctx.strokeStyle ='white';
                            ctx.moveTo(left+angleLine,top);//出发点
                            ctx.arcTo(left+angleLine*2+width,top,left+angleLine*2+width,top+angleLine,radius);//右上角圆角
                            ctx.arcTo(left+angleLine*2+width,top+angleLine*2+width,left+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                            ctx.arcTo(left,top+width+angleLine*2,left,top+width+angleLine,radius);//左下角圆角
                            ctx.arcTo(left,top,left+angleLine*2,top,radius);//左上角圆角
                            ctx.closePath();
                            ctx.stroke();
                            ctx.clip();
                            ctx.drawImage(that.activity.goods_list[sum].cover,left, top, 120*rpx, 120*rpx);
                            ctx.restore();
                            ctx.textAlign = 'left';
                            that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, left+134*rpx, top-25*rpx,166*rpx);
                            ctx.font = '12px sans-serif';
                            ctx.fillStyle = "#ff4544";
                            ctx.fillText('￥'+that.activity.goods_list[sum].price, left+134*rpx, top+80*rpx)
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = "#999999";
                            ctx.fillText('￥'+that.activity.goods_list[sum].original_price, left+134*rpx, top+102*rpx);
                            delWidth = (that.activity.goods_list[sum].original_price.length + 1)*12+12;
                            ctx.fillRect(delLeft*rpx,top+100*rpx,delWidth*rpx,2*rpx);
                            sum++
                            if(sum == 5) {
                                that.$hideLoading();
                            }
                        }
                    }
                }
            },
            // #endif
            // #ifdef MP-ALIPAY
            normalCreated(ctx,rpx) {
                let that = this;
                that.$showLoading({
                    type: 'global',
                    text: '生成中...'
                });
                that.address = that.middleman.city+that.middleman.district;
                if(that.middleman.city != that.middleman.province) {
                    that.address = that.middleman.province + that.address
                }
                // 背景图
                if(that.selectForm.type == 1) {
                    // 填充颜色
                    ctx.fillStyle= that.selectForm.color;
                    ctx.fillRect(0, 0, 750*rpx,1334*rpx);
                    that.chooseNormalStyle(ctx,rpx)
                }else {
                    my.getImageInfo({
                        src: that.config.image_bg,  
                        success: function (res) {
                            ctx.drawImage(res.path, 0, 0, 750*rpx, 1334*rpx);
                            that.chooseNormalStyle(ctx,rpx)
                        }
                    })
                }
            },
            chooseNormalStyle(ctx,rpx) {
                let that = this;
                let x, y, size,textFont, textX, textY, textWidth,GoodsSize,infoX,infoY,infoSize,infoLeft,infoTop,qrX,qrY,qrWidth;
                let src = '';
                // 样式一
                if(that.selectForm.style == 1) {
                    x = 78*rpx;
                    y = 133*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 195*rpx
                    textY = 130*rpx
                    textWidth = 480*rpx
                    GoodsSize = 370*rpx
                    infoX = 132*rpx
                    infoY = 1000*rpx
                    infoSize = 33*rpx
                    infoLeft = 64*rpx
                    infoTop = 1060*rpx
                    qrX = 440*rpx
                    qrY = 984*rpx
                    qrWidth = 240*rpx
                    src = that.community.style1;
                }else if(that.selectForm.style == 2) {
                    x = 80*rpx;
                    y = 810*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 197*rpx
                    textY = 807*rpx
                    textWidth = 480*rpx
                    GoodsSize = 180*rpx
                    infoX = 430*rpx
                    infoY = 985*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1045*rpx
                    qrX = 70*rpx
                    qrY = 945*rpx
                    qrWidth = 240*rpx
                    src = that.community.style2;
                }else if(that.selectForm.style == 3) {
                    x = 80*rpx;
                    y = 164*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 200*rpx
                    textY = 161*rpx
                    textWidth = 480*rpx
                    GoodsSize = 310*rpx
                    infoX = 430*rpx
                    infoY = 1040*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1100*rpx
                    qrX = 70*rpx
                    qrY = 1000*rpx
                    qrWidth = 240*rpx
                    src = that.community.style3;
                }else if(that.selectForm.style == 4) {
                    x = 56*rpx;
                    y = 124*rpx;
                    size = 97*rpx;
                    textFont = 13
                    textX = 192*rpx
                    textY = 121*rpx
                    textWidth = 480*rpx
                    GoodsSize = 464*rpx
                    infoX = 430*rpx
                    infoY = 1040*rpx
                    infoSize = 33*rpx
                    infoLeft = 360*rpx
                    infoTop = 1100*rpx
                    qrX = 70*rpx
                    qrY = 1000*rpx
                    qrWidth = 240*rpx
                    src = that.community.style4;
                }
                ctx.drawImage(src, 0, 0, 750*rpx, 1334*rpx);
                // 头像
                ctx.save();
                ctx.beginPath();
                ctx.arc(size / 2 + x, size / 2 + y, size / 2, 0, Math.PI * 2, false);
                ctx.strokeStyle ='white';
                ctx.stroke();
                ctx.clip();
                let avatar = that.info.avatar;
                ctx.drawImage(avatar, x, y, size, size);
                ctx.restore();
                let tip = '我在'+that.address+that.middleman.location+'发现了一个超划算的团购！';
                ctx.textAlign = 'left';
                if(rpx == 1) {
                    textWidth = 350
                }
                that.drawText(rpx,ctx,tip,textFont, textX, textY, textWidth);
                // 商品
                that.drawNormalGoods(ctx,GoodsSize,rpx);
                let infoRpx = 1;
                if(rpx != 1) {
                    infoRpx = 0.26
                }
                that.drawNormalInfo(ctx,infoX,infoY,infoSize,infoLeft,infoTop,that.address,infoRpx)
                // 二维码
                my.getImageInfo({
                    src: that.activity.qrcode,  
                    success: function (res) {
                        ctx.drawImage(res.path,qrX, qrY, qrWidth, qrWidth);
                        ctx.draw();
                    }
                })
            },
            drawNormalGoods(ctx,top,rpx) {
                let that = this;
                let delLeft;
                let delWidth;
                let left;
                let goodsName;
                let sum = 0;
                // 单个商品
                let cover = '';
                if(that.activity.goods_list.length == 1) {
                    ctx.drawImage(that.activity.goods_list[0].cover,195*rpx, top, 360*rpx, 360*rpx);
                    if(rpx == 1) {
                        goodsName = 350*rpx
                    }else {
                        goodsName = 590*rpx
                    }
                    that.drawText(rpx,ctx,that.activity.goods_list[0].name,14, 370*rpx, top+360*rpx,goodsName,true);
                    ctx.textAlign = 'center';
                    ctx.font = rpx != 1 ? '14px sans-serif' : '28px sans-serif';
                    ctx.fillStyle = "#ff4544";
                    ctx.fillText('￥'+that.activity.goods_list[0].price, 370*rpx, top+490*rpx)
                    ctx.font = rpx != 1 ? '13px sans-serif' : '26px sans-serif';
                    ctx.fillStyle = "#999999";
                    ctx.fillText('￥'+that.activity.goods_list[0].original_price, 370*rpx, top+520*rpx);
                    delWidth = (that.activity.goods_list[0].original_price.length + 1)*15+30;
                    delLeft = 375 - delWidth/2;
                    ctx.fillRect(delLeft*rpx,top+516*rpx,delWidth*rpx,1);
                    that.$hideLoading();
                // 两个商品
                }else if(that.activity.goods_list.length == 2) {
                    top = top+15*rpx;
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        if(sum == 1) {
                            left = 395*rpx;
                        }else {
                            left = 65*rpx;
                        }
                        that.strokeRoundRect(ctx, left, top, 290*rpx, 450*rpx, 8*rpx,2*rpx, '#e5e5e5');
                        ctx.beginPath();
                        ctx.save();
                        let width = 266*rpx;
                        let radius = 8*rpx;
                        let angleLine = 10*rpx;
                        let startTop = top + 2*rpx;
                        let startLeft = left + 2*rpx;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ='white';
                        ctx.moveTo(startLeft+angleLine,startTop);//出发点
                        ctx.lineTo(startLeft+angleLine+width,startTop);//顶部
                        ctx.arcTo(startLeft+angleLine*2+width,startTop,startLeft+angleLine*2+width,startTop+angleLine,radius);//右上角圆角
                        ctx.lineTo(startLeft+angleLine*2+width,startTop+angleLine*2+width);//到右下角
                        ctx.lineTo(startLeft,startTop+width+angleLine*2);//到左下角
                        ctx.lineTo(startLeft,startTop+angleLine);//到左上角
                        ctx.arcTo(startLeft,startTop,startLeft+angleLine,startTop,radius);//左上角圆角
                        ctx.closePath();
                        ctx.stroke();
                        ctx.clip();
                        ctx.drawImage(that.activity.goods_list[sum].cover,left+2*rpx, top+2*rpx, 286*rpx, 286*rpx);
                        ctx.restore();
                        that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, left+145*rpx, top+280*rpx,256*rpx,true);
                        ctx.textAlign = 'center';
                        ctx.font = rpx != 1 ? '13px sans-serif' : '26px sans-serif';
                        ctx.fillStyle = "#ff4544";
                        ctx.fillText('￥'+that.activity.goods_list[sum].price, left+145*rpx, top+388*rpx)
                        ctx.font = rpx != 1 ? '11px sans-serif' : '22px sans-serif';
                        ctx.fillStyle = "#999999";
                        ctx.fillText('￥'+that.activity.goods_list[sum].original_price, left+145*rpx, top+418*rpx);
                        delWidth = (that.activity.goods_list[sum].original_price.length + 1)*14+20;
                        ctx.textAlign = 'center';
                        delLeft = left+(145 - delWidth/2)*rpx
                        ctx.fillRect(delLeft,top+414*rpx,delWidth*rpx,2*rpx);
                        sum++
                        if(sum == 2) {
                            that.$hideLoading();
                        }
                    }
                // 三个商品
                }else if(that.activity.goods_list.length == 3) {
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        if(sum > 0) {
                            top = top + 182*rpx;
                        }
                        ctx.drawImage(that.activity.goods_list[sum].cover,65*rpx, top, 150*rpx, 150*rpx);
                        ctx.beginPath();
                        ctx.save();
                        let width = 130*rpx;
                        let radius = 8*rpx;
                        let angleLine = 10*rpx;
                        let startleft = 65*rpx;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ='white';
                        ctx.moveTo(startleft+angleLine,top);//出发点
                        ctx.arcTo(startleft+angleLine*2+width,top,startleft+angleLine*2+width,top+angleLine,radius);//右上角圆角
                        ctx.arcTo(startleft+angleLine*2+width,top+angleLine*2+width,startleft+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                        ctx.arcTo(startleft,top+width+angleLine*2,startleft,top+width+angleLine,radius);//左下角圆角
                        ctx.arcTo(startleft,top,startleft+angleLine*2,top,radius);//左上角圆角
                        ctx.closePath();
                        ctx.stroke();
                        ctx.clip();
                        ctx.restore();
                        ctx.textAlign = 'left';
                        that.drawText(rpx,ctx,that.activity.goods_list[sum].name,13, 239*rpx, top-15*rpx,350*rpx);
                        ctx.font = rpx != 1 ? '13px sans-serif' : '26px sans-serif';
                        ctx.fillStyle = "#ff4544";
                        ctx.fillText('￥'+that.activity.goods_list[sum].price, 239*rpx, top+100*rpx)
                        ctx.font = rpx != 1 ? '11px sans-serif' : '22px sans-serif';
                        ctx.fillStyle = "#999999";
                        ctx.fillText('￥'+that.activity.goods_list[sum].original_price, 239*rpx, top+137*rpx);
                        delWidth = (that.activity.goods_list[sum].original_price.length + 1)*15+12;
                        delLeft = 239;
                        ctx.fillRect(delLeft*rpx,top+135*rpx,delWidth*rpx,2*rpx);
                        sum++
                        if(sum == 3) {
                            that.$hideLoading();
                        }
                    }
                // 四个商品
                }else if(that.activity.goods_list.length == 4) {
                    top = top - 10*rpx;
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        if(sum > 0) {
                            top = top + 140*rpx;
                        }
                        ctx.beginPath();
                        ctx.save();
                        let width = 100*rpx;
                        let radius = 8*rpx;
                        let angleLine = 10*rpx;
                        let left = 65*rpx;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ='white';
                        ctx.moveTo(left+angleLine,top);//出发点
                        ctx.arcTo(left+angleLine*2+width,top,left+angleLine*2+width,top+angleLine,radius);//右上角圆角
                        ctx.arcTo(left+angleLine*2+width,top+angleLine*2+width,left+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                        ctx.arcTo(left,top+width+angleLine*2,left,top+width+angleLine,radius);//左下角圆角
                        ctx.arcTo(left,top,left+angleLine*2,top,radius);//左上角圆角
                        ctx.closePath();
                        ctx.stroke();
                        ctx.clip();
                        ctx.drawImage(that.activity.goods_list[sum].cover,65*rpx, top, 120*rpx, 120*rpx);
                        ctx.restore();
                        ctx.textAlign = 'left';
                        that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, 209*rpx, top-25*rpx,350*rpx);
                        ctx.font = rpx != 1 ? '12px sans-serif' : '24px sans-serif';
                        ctx.fillStyle = "#ff4544";
                        ctx.fillText('￥'+that.activity.goods_list[sum].price, 209*rpx, top+80*rpx)
                        ctx.font = rpx != 1 ? '10px sans-serif' : '20px sans-serif';
                        ctx.fillStyle = "#999999";
                        ctx.fillText('￥'+that.activity.goods_list[sum].original_price, 209*rpx, top+102*rpx);
                        delWidth = (that.activity.goods_list[sum].original_price.length + 1)*12+12;
                        delLeft = 212;
                        ctx.fillRect(delLeft*rpx,top+100*rpx,delWidth*rpx,2*rpx);
                        sum++
                        if(sum == 4) {
                            that.$hideLoading();
                        }
                    }
                // 五个商品
                }else if(that.activity.goods_list.length > 4) {
                    for (var i = 0; i < that.activity.goods_list.length; i++){
                        left = 48*rpx;
                        delLeft = 192
                        if(sum == 1 || sum == 3 || sum == 5) {
                            left = 398*rpx;
                            delLeft = 537;
                        }
                        if(sum == 0) {
                            top = top + 20*rpx;
                        }else if(sum == 2) {
                            top = top + 172*rpx;
                        }else if(sum == 4) {
                            top = top + 172*rpx;
                        }
                        ctx.beginPath();
                        ctx.save();
                        let width = 100*rpx;
                        let radius = 8*rpx;
                        let angleLine = 10*rpx;
                        ctx.lineWidth = 1;
                        ctx.strokeStyle ='white';
                        ctx.moveTo(left+angleLine,top);//出发点
                        ctx.arcTo(left+angleLine*2+width,top,left+angleLine*2+width,top+angleLine,radius);//右上角圆角
                        ctx.arcTo(left+angleLine*2+width,top+angleLine*2+width,left+angleLine+width,top+angleLine*2+width,radius);//右下角圆角
                        ctx.arcTo(left,top+width+angleLine*2,left,top+width+angleLine,radius);//左下角圆角
                        ctx.arcTo(left,top,left+angleLine*2,top,radius);//左上角圆角
                        ctx.closePath();
                        ctx.stroke();
                        ctx.clip();
                        ctx.drawImage(that.activity.goods_list[sum].cover,left, top, 120*rpx, 120*rpx);
                        ctx.restore();
                        ctx.textAlign = 'left';
                        that.drawText(rpx,ctx,that.activity.goods_list[sum].name,12, left+134*rpx, top-35*rpx,166*rpx);
                        ctx.font = rpx != 1 ? '12px sans-serif' : '24px sans-serif';
                        ctx.fillStyle = "#ff4544";
                        ctx.fillText('￥'+that.activity.goods_list[sum].price, left+134*rpx, top+80*rpx)
                        ctx.font = rpx != 1 ? '10px sans-serif' : '20px sans-serif';
                        ctx.fillStyle = "#999999";
                        ctx.fillText('￥'+that.activity.goods_list[sum].original_price, left+134*rpx, top+102*rpx);
                        delWidth = (that.activity.goods_list[sum].original_price.length + 1)*12+12;
                        ctx.fillRect(delLeft*rpx,top+100*rpx,delWidth*rpx,2*rpx);
                        sum++
                        if(sum == 5) {
                            that.$hideLoading();
                        }
                    }
                }
            },
            drawNormalInfo(ctx,x,y,size,infoLeft,infoTop,address,rpx) {
                let that = this;
                // 团长头像
                let avatar = that.middleman.avatar;
                ctx.save();
                ctx.beginPath();
                ctx.arc(size / 2 + x, size / 2 + y, size / 2, 0, Math.PI * 2, false);
                ctx.strokeStyle ='white';
                ctx.stroke();
                ctx.clip();
                ctx.drawImage(avatar, x, y, size, size);
                ctx.restore();
                let nameRpx = rpx;
                if(rpx == 1) {
                    nameRpx = 0.65
                }
                ctx.textAlign = 'left';
                ctx.fillStyle = "#353535";
                if(rpx == 1) {
                    ctx.font = '20px sans-serif'
                }else {
                    ctx.font = '10px sans-serif'
                }
                ctx.fillText('团长:', infoLeft, infoTop-62*nameRpx);
                ctx.fillText('结束时间: ' + that.activity.end_at, infoLeft, infoTop);
                ctx.fillText(that.middleman.name, x+63*nameRpx, infoTop-62*nameRpx);
                let addressWidth = 500*rpx;
                if(rpx == 1) {
                    addressWidth = 300
                }
                that.drawText(rpx,ctx,'提货地址: '+address+that.middleman.detail,11, infoLeft, infoTop+10*rpx,addressWidth);
            },
            // #endif
        },
    }
</script>

<style scoped lang="scss">
    $box: #f7f7f7;

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
    }

    .app-scroll {
        width: 100%;
        white-space: nowrap;
        padding: 0 #{14rpx};
    }

    .poster-goods {
        .head {
            width: 100%;
            view {
                margin: #{50rpx} auto;
            }
        }

        .setting {
            padding-top: #{20rpx};
            font-size: #{24rpx};
            color: #353535;
            background: #FFFFFF;
            padding-bottom: #{48rpx};

            .line {
                margin-bottom: #{24rpx};

                .label {
                    height: #{56rpx};

                    icon {
                        background-image: url("../../../static/image/poster/mark.png");
                        background-size: 100% 100%;
                        height: #{21rpx};
                        width: #{21rpx};
                        background-repeat: no-repeat;
                        margin-left: #{24rpx};
                        border-radius: 50%;
                    }

                    text {
                        line-height: 1;
                        padding-left: #{12rpx};
                        padding-right: #{26rpx - 14rpx};
                    }
                }

                .style-input {
                    position: relative;
                    height: #{56rpx};
                    padding: 0 #{20rpx};
                    background: $box;
                    border-radius: #{5rpx};
                    margin: 0 #{14rpx};

                    .type-pure {
                        height: #{32rpx};
                        width: #{32rpx};
                        margin-right: #{10rpx};
                        background: #d8d8d8;
                    }

                    .type-gradient {
                        height: #{32rpx};
                        width: #{32rpx};
                        margin-right: #{10rpx};
                        background-image: url("./../image/icon.png");
                        background-size: 100% 100%;
                    }

                }
            }

            .active {
                border-width: #{3rpx};
                border-style: solid;
                background: #FFFFFF !important;
            }

            .icon-active {
                background-image: url("../../../static/image/poster/input-active.png");
                height: #{38rpx};
                width: #{38rpx};
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: #{-19rpx};
                right: #{-19rpx};
                z-index: 10;
                border-radius: 50%;
            }

            .line-input {
                position: relative;
                border-radius: #{5rpx};
                margin: 0 #{14rpx} #{14rpx};
                background: $box;
                width: #{140rpx};
                height: #{56rpx};

                .icon-square {
                    background-size: 100% 100%;
                    height: #{32rpx};
                    width: #{32rpx};
                    background-repeat: no-repeat;
                }

                text {
                    margin-left: #{10rpx};
                }
            }

            .color-bg {
                position: relative;
                display: inline-block;
                height: #{60rpx};
                width: #{60rpx};
                border-radius: #{5rpx};
                border: 1px solid #e5e5e5;
                margin-right: #{26rpx};
                margin-top: #{19rpx};
            }
        }

        .button {
            font-size: #{32rpx};
            border-radius: #{40rpx};
            height: #{68rpx};
            margin: #{34rpx} auto 0;
            color: #ffffff;
            width: #{500rpx};
        }
    }
</style>