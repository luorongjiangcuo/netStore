<template>
    <app-layout>
        <view class="poster">
            <view id="head" class="head">
                <view class="main-center cross-center">
                    <!-- #ifdef MP-WEIXIN -->
                    <canvas type="2d" id="poster" style="width: 300px; height: 533.6px;"></canvas>
                    <!-- #endif -->
                    <!-- #ifndef MP-WEIXIN -->
                    <canvas id="poster" :width="300*dpr" :height="533.6*dpr" style="width: 300px; height: 533.6px;"></canvas>
                    <!-- #endif -->
                </view>
            </view>
            <view class="button main-center cross-center" @click="submitSave"
                  :class="getTheme + '-m-back ' + getTheme">保存图片
            </view>
        </view>
    </app-layout>
</template>

<script>
    import { mapState,mapGetters } from "vuex";

    export default {
        data() {
            return {
                card_id: 0,
                coupon_id: 0,
                rpx: 1,
                show: false,
                info: {},
                canvas: null,
                dpr: 2,
            }
        },
        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            ...mapState({
                poster_img: state => state.mallConfig.__wxapp_img.poster,
            })
        },
        methods: {
            imgLoad(img) {
                return new Promise((resolve, reject) => {
                    // #ifdef MP-WEIXIN
                    img.onload = () => {
                        resolve(img);
                    }
                    img.onerror = () => {
                        reject(2);
                    }
                    // #endif
                    // #ifndef MP-WEIXIN
                    uni.downloadFile({
                        url: img,
                        success(res) {
                            resolve(res.tempFilePath);
                        },
                        fail(res) {
                            reject(2);
                        }
                    })
                    // #endif
                })
            },

            async createdImg(canvas, ctx, url, x, y, w, h, color, is_radius = false) {
                // #ifdef MP-WEIXIN
                let img = canvas.createImage();
                img.src = url;
                await this.imgLoad(img).then(e => {
                    ctx.beginPath();
                    if (is_radius) {
                        ctx.arc(w / 2 + x, h / 2 + y, w / 2, 0, Math.PI * 2, false);
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        ctx.clip();
                    }
                    ctx.drawImage(img, x, y, w, h);
                    ctx.restore();
                    ctx.closePath();
                    ctx.save();
                });
                // #endif
                // #ifndef MP-WEIXIN
                await this.imgLoad(url).then(e => {
                    ctx.strokeStyle = color;
                    ctx.save();
                    ctx.beginPath();
                    if (is_radius) {
                        ctx.arc(w / 2 + x, h / 2 + y, w / 2, 0, Math.PI * 2, false);
                        ctx.stroke();
                        ctx.clip();
                    }
                    ctx.drawImage(e, x, y, w, h);
                    ctx.restore();
                    ctx.closePath();
                });
                // #endif
            },
            createdText(canvas, ctx, text, x, y, font, textAlign, color) {
                // #ifdef MP-WEIXIN
                ctx.beginPath();
                ctx.textAlign = textAlign;
                ctx.font = font;
                ctx.fillStyle = color;
                ctx.fillText(text, x, y); // 需要算上文字的高度
                ctx.stroke();
                ctx.closePath();
                ctx.save();
                // #endif
                // #ifndef MP-WEIXIN
                ctx.textAlign = textAlign;
                ctx.font = font;
                ctx.fillStyle = color;
                ctx.fillText(text, x, y); // 需要算上文字的高度
                ctx.stroke();
                // #endif
            },
            createdEllipse(canvas, ctx, x, y, w, h, color) {
                let r = h / 2; // 圆半径
                let l_w = Math.abs(w - h); // 线长度
                // #ifdef MP-WEIXIN
                ctx.beginPath();
                ctx.moveTo(x+r, y);           // 创建开始点
                ctx.lineTo(x+r+l_w,y);          // 创建水平线
                ctx.arcTo(x+w,y,x+w,y+r,r); // 创建弧
                ctx.arcTo(x+w,y+h,x+r+l_w,y+h,r); // 创建弧
                ctx.lineTo(x+r,y+h);         // 创建垂直线
                ctx.arcTo(x,y+h,x,y+r,r); // 创建弧
                ctx.arcTo(x,y,x+r,y,r); // 创建弧
                ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
                ctx.stroke();
                ctx.clip();
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();
                ctx.closePath();
                ctx.save();
                // #endif
                // #ifndef MP-WEIXIN
                ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x+r, y);           // 创建开始点
                ctx.lineTo(x+r+l_w,y);          // 创建水平线
                ctx.arcTo(x+w,y,x+w,y+r,r); // 创建弧
                ctx.arcTo(x+w,y+h,x+r+l_w,y+h,r); // 创建弧
                ctx.lineTo(x+r,y+h);         // 创建垂直线
                ctx.arcTo(x,y+h,x,y+r,r); // 创建弧
                ctx.arcTo(x,y,x+r,y,r); // 创建弧
                ctx.stroke();
                ctx.clip();
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();
                ctx.closePath();
                // #endif
            },
            async created(canvas, ctx, rpx) {
                let color = '#353535';
                let font_fimaly = 'sans-serif';
                // 背景图
                await this.createdImg(canvas, ctx, this.info.poster_bg , 0, 0, 750*rpx, 1334*rpx, 'white', false);

                // 头像
                await this.createdImg(canvas, ctx, this.info.avatar , 310*rpx, 66*rpx, 130*rpx, 130*rpx, 'white', true);

                // 名称
                this.createdText(canvas, ctx, this.info.nickname, 376*rpx, 252*rpx, 28*rpx + 'px ' + font_fimaly, 'center', 'white');

                if (this.card_id > 0) {
                    // 卡券图片
                    await this.createdImg(canvas, ctx, this.info.pic_url , 76*rpx, 394*rpx, 120*rpx, 120*rpx, 'white', true);

                    // 卡券名称
                    let name = this.info.name;
                    let font = 33*rpx + 'px ' + font_fimaly;
                    if (name.length > 20) {
                        this.createdText(canvas, ctx, name.substring(0,10), 220*rpx, 439*rpx, font, 'left', color);
                        this.createdText(canvas, ctx, name.substring(11,20) + '...', 220*rpx, 490*rpx, font, 'left', color);
                    } else if (name.length > 10) {
                        this.createdText(canvas, ctx, name.substring(0,10), 220*rpx, 439*rpx, font, 'left', color);
                        this.createdText(canvas, ctx, name.substring(11,name.length), 220*rpx, 490*rpx, font, 'left', color);
                    } else {
                        this.createdText(canvas, ctx, name, 220*rpx, 465*rpx, font, 'left', color);
                    }
                } else {
                    // 优惠方式
                    if (this.info.type === 1) {
                        this.createdText(canvas, ctx, this.info.discount, 100*rpx, 470*rpx, 58*rpx + 'px ' + font_fimaly, 'left', 'white');
                        this.createdText(canvas, ctx, '折', 185*rpx, 470*rpx, 33*rpx + 'px ' + font_fimaly, 'left', 'white');
                    } else {
                        let x = 129;
                        let length = (this.info.sub_price + '').length;
                        if (length > 1) {
                            x -= (length - 1) * 15;
                        }
                        this.createdText(canvas, ctx, '￥', x*rpx, 470*rpx, 33*rpx + 'px ' + font_fimaly, 'left', 'white');
                        this.createdText(canvas, ctx, this.info.sub_price, (x+30)*rpx, 470*rpx, 58*rpx + 'px ' + font_fimaly, 'left', 'white');
                    }
                    // 门槛
                    let min_price = '无门槛使用';
                    if(this.info.min_price > 0) {
                        min_price = '满'+this.info.min_price+'可用'
                    }
                    this.createdText(canvas, ctx, min_price, 286*rpx, 439*rpx, 33*rpx + 'px ' + font_fimaly, 'left', color);
                    // 使用场景
                    this.createdText(canvas, ctx, this.info.appoint_type, 286*rpx, 490*rpx, 28*rpx + 'px ' + font_fimaly, 'left', color);
                    // 有效日期
                    let day = '';
                    if (this.info.expire_type == 1) {
                        day = `有效期：领取后${this.info.expire_day}天内有效`
                    } else {
                        day = `有效期：${this.info.begin_time}-${this.info.end_time}`;
                    }
                    let text_font = parseInt(24*rpx);
                    ctx.font = text_font + 'px ' + font_fimaly;
                    let text_w = ctx.measureText(day).width;
                    this.createdEllipse(canvas, ctx, (750*rpx- text_w)/2-text_font, 882*rpx, text_w+48*rpx, 60*rpx, 'rgba(0, 0, 0, 0.2)');
                    this.createdText(canvas, ctx, day, 375*rpx, 920*rpx, text_font + 'px ' + font_fimaly, 'center', 'white');
                }
                // 二维码
                await this.createdImg(canvas, ctx, this.info.qrcode , 255*rpx, 964*rpx, 240*rpx, 240*rpx, 'white', true);
                ctx.draw();
                return null;
            },
            submitSave() {
                const self = this;
                self.$showLoading({text: `正在保存图片`});
                uni.canvasToTempFilePath({
                  canvas: self.canvas,
                  success: function(res) {
                    // 在H5平台下，tempFilePath 为 base64
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
                                                                    filePath: e.path,
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
                  }
                })
            },
            getList() {
                let that = this;
                let url;
                let para;
                if(that.card_id > 0) {
                    url = that.$api.poster.card;
                    para = {
                        cardId: that.card_id
                    }
                }
                if(that.coupon_id > 0) {
                    url = that.$api.poster.coupon;
                    para = {
                        coupon_id: that.coupon_id
                    }
                }
                that.$request({
                    url: url,
                    data: para
                }).then(response=>{
                    if(response.code == 0) {
                        that.info = response.data;
                        that.$hideLoading();
                        setTimeout(() => {
                            const query = uni.createSelectorQuery()
                            query.select('#poster')
                                .fields({ node: true, size: true })
                                .exec((res) => {
                                    const dpr = uni.getSystemInfoSync().pixelRatio
                                    // #ifdef MP-WEIXIN
                                    that.canvas = res[0].node
                                    const ctx = that.canvas.getContext('2d')
                                    that.canvas.width = res[0].width * dpr
                                    that.canvas.height = res[0].height * dpr
                                    // #endif
                                    // #ifndef MP-WEIXIN
                                    that.canvas = uni.createCanvasContext('poster');
                                    const ctx = that.canvas;
                                    // #endif
                                    ctx.scale(dpr, dpr)
                                    that.created(that.canvas,ctx, 0.4);
                                }
                            )
                        }, 100);
                    }else {
                        that.$hideLoading();
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(response => {
                    that.$hideLoading();
                });
            },
        },

        onLoad(options) {
            let that = this;
            this.dpr = uni.getSystemInfoSync().pixelRatio
            if(options.card_id > 0) {
                that.card_id = options.card_id
            }
            if(options.coupon_id > 0) {
                that.coupon_id = options.coupon_id
            }
            uni.getSystemInfo({
                success(res) {
                  that.rpx = res.windowWidth/375;
                },
            })
            that.$showLoading({text: '生成中'});
            that.getList();
        }
    }
</script>

<style scoped lang="scss">
    .poster {
        .poster {
            width: 1500rpx;
            height: 2668rpx;
            position: fixed;
            left: 100%;
            top: 150%;
        }
        .head {
            width: 100%;
            view {
                margin: 50rpx auto;
            }
        }

        .button {
            font-size: #{32rpx};
            border-radius: #{40rpx};
            height: #{68rpx};
            margin: 0 auto #{50rpx};
            color: #ffffff;
            width: #{500rpx};
        }
    }
</style>
