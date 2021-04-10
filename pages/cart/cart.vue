<template>
	<app-layout :overflow='false'>
		<view class="app-cart">
			<view class="app-announcement dir-left-nowrap main-between cross-center">
				<text class="app-announcement-text">商品库存有限，请尽快下单</text>
				<app-form-id @click="editSwitch">
					<text class="app-edit-text">{{editStatus ? '完成' : '编辑'}}</text>
				</app-form-id>
			</view>
			<view class="app-item" v-for="(mch, index) in listObj" :key="index" v-if="listObj.length > 0">
				<app-shop-product :theme="getTheme" @change="change" @update="update" :mch="mch"  :editStatus="editStatus" @changeSingleRadio="changeSingleRadio" @changeRadioAll="changeRadioAll" ></app-shop-product>
			</view>
			<view class="no-cart" v-if="listObj.length === 0">
				<view class="cart-icon">
					<image class="cart-image" src="../../static/image/icon/nav-icon-cart.png"></image>
				</view>
				<view class="cart-text">购物车还是空的哦</view>
			</view>
			<view>
				<app-empty-bottom backgroundColor="#f7f7f7" :botBool="botBool" :height="Number(100)"></app-empty-bottom>
			</view>
			<view v-if="!tabbarbool" :style="{background: 'white', position: 'fixed', bottom: 0, height: `${getEmpty}rpx`, width: '750rpx'}"></view>
			<view class="app-settlement dir-left-nowrap main-between cross-center" :style="{bottom:  `${tabbarbool ? BotHeight : getEmpty}rpx`}">
				<view class="app-radio dir-left-nowrap main-right cross-center">
					<app-radio type="round" :theme="getTheme" @click="setALl" v-model="all"></app-radio>
					<text class="app-all-text">全选</text>
					<text class="app-price" v-if="!editStatus" :class="getTheme + '-m-text ' + getTheme">总计: ￥{{priceNum}}</text>
				</view>
				<button :disabled="submitDis" :class="submitDis ?  'delete-disabled' : getTheme + '-m-text ' + getTheme"  class="app-delete" v-if="editStatus" @click="deleteProduct">
						删除
				</button>
				<button :disabled="submitDis" :class="submitDis ? 'disabled-background' : getTheme + '-m-back ' + getTheme" class="app-settlement-button" v-else @click="settlement">
						去结算
				</button>
			</view>
		</view>
	</app-layout>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
    import appShopProduct from './components/app-shop-product/app-shop-product.vue';
    import appRadio from '../../components/basic-component/app-radio/app-radio.vue';
    import appEmptyBottom from '../../components/basic-component/app-empty-bottom/app-empty-bottom.vue';
    
    export default {
        name: 'cart',
        components:{
            'app-shop-product': appShopProduct,
	        'app-radio': appRadio,
	        'app-empty-bottom': appEmptyBottom,
        },
        data() {
            return {
                editStatus: false,
	            listObj: [],
	            all: false,
                editList: [],
	            priceNum: 0,
	            edit: false,
                botBool: true,
                currentRoute: this.$platDiff.route(),
                tabbarbool: false,
                spike: -1,
                submitDis: true
            }
        },
        computed:{
            ...mapState({
                tabBarHeight: (state) => {
                  return state.gConfig.tabBarHeight;
                },
                iphoneHeight: (state) =>{
	                return  state.gConfig.iphoneHeight;
                },
	            iphone: (state) => {
                    return state.gConfig.iphone
	            }
            }),
            ...mapGetters('iPhoneX', {
                BotHeight: 'getBotHeight',
                getEmpty: 'getEmpty',
			}),
			...mapGetters('mallConfig', {
				getTheme: 'getTheme',
			}),
            ...mapState({
                tabBarNavs: state => state.mallConfig.navbar.navs,
				is_edit: state => state.cart.is_edit
            }),
        },
        methods: {
            update(good) {
                for(let idx in this.listObj) {
                    for(let index in this.listObj[idx].goods_list) {
                        if(this.listObj[idx].goods_list[index].sign == 'wholesale' && this.listObj[idx].goods_list[index].goods_id == good.goods_id) {
                            this.listObj[idx].goods_list[index] = good;
                            this.$set(this.listObj[idx].goods_list, index, good);
                            this.$forceUpdate();
                        }
                    }
                }
            },
            setALl(data) {
                this.selectAll(data);
            },
	        
            // 编辑
            editSwitch() {
                this.all = false;
                for (let i = 0; i < this.listObj.length; i++) {
                    this.listObj[i].is_active = false;
                    for (let j = 0; j < this.listObj[i].goods_list.length; j++) {
                        this.listObj[i].goods_list[j].is_active = false;
                        if(this.listObj[i].goods_list[j].sign === 'wholesale') {
                            for(let attr of this.listObj[i].goods_list[j].attr_arr) {
                                attr.is_active = false;
                            }
                        }
                    }
                }
                this.editStatus = !this.editStatus;
            },
	        
	        async getProductList() {

                uni.showLoading({
	                title: '加载中'
                });
                const res = await this.$request({
	                url: this.$api.cart.list,
	                method: 'get',
                });
                if (res.code === 0) {
                    this.listObj = res.data.list;
                    this.spikeTime(res.data.list);
                }
                uni.hideLoading();
	        },
	        
	        // 商城全选
            changeRadioAll(data) {
                for (let i = 0; i < this.listObj.length; i++) {
                    let {mch_id ,  goods_list } = this.listObj[i];
                    if (data.mch_id === mch_id) {
                        for (let j = 0; j < goods_list.length; j++) {
                            if (!this.editStatus) {
                                if (goods_list[j].new_status === 0) goods_list[j].is_active = !data.is_active;
                            } else {
                                goods_list[j].is_active = !data.is_active;
                            }
                            if(goods_list[j].sign === 'wholesale') {
                                goods_list[j].choose_num = goods_list[j].is_active ? goods_list[j].attrs.num : 0;
                                goods_list[j].discount = goods_list[j].is_active ? goods_list[j].attrs.discount : goods_list[j].plugin_data.discount_type == 1 ? 0 : 10;
                                for(let attr of goods_list[j].attr_arr) {
                                    attr.is_active = goods_list[j].is_active;
                                }
                            }
                        }
                        this.listObj[i].is_active = !data.is_active;
                    }
                }
            },
	        
	        // 单选
            changeSingleRadio(mch, item) {
                for (let i = 0; i < this.listObj.length; i++) {
                    if (this.listObj[i].mch_id === mch.mch_id) {
                        let goods_list_len = mch.goods_list.length;
                        let active_num = 0;
                        for (let j = 0; j < this.listObj[i].goods_list.length; j++) {
                            if(this.listObj[i].goods_list[j].sign === 'wholesale') {
                                this.listObj[i].goods_list[j].discount = this.listObj[i].goods_list[j].plugin_data.discount_type == 1 ? 0 : 10;
                                if(item.goods_id) {
                                    if (item.id === this.listObj[i].goods_list[j].id) {
                                        this.listObj[i].goods_list[j].is_active  = !this.listObj[i].goods_list[j].is_active;
                                        for(let attr of this.listObj[i].goods_list[j].attr_arr) {
                                            attr.is_active  = this.listObj[i].goods_list[j].is_active
                                        }
                                        if(!this.editStatus) {
                                            this.listObj[i].goods_list[j].choose_num = this.listObj[i].goods_list[j].is_active ? this.listObj[i].goods_list[j].attrs.num : 0;
                                            this.listObj[i].goods_list[j].discount = this.listObj[i].goods_list[j].is_active ? this.listObj[i].goods_list[j].attrs.discount : this.listObj[i].goods_list[j].plugin_data.discount_type == 1 ? 0 : 10;

                                        }
                                    }
                                }else {
                                    let choose = 0;
                                    this.listObj[i].goods_list[j].choose_num = 0;
                                    for(let attr of this.listObj[i].goods_list[j].attr_arr) {
                                        if (item.id === attr.id) {
                                            attr.is_active  = !attr.is_active;
                                        }
                                        if(attr.is_active) {
                                            choose++;
                                            this.listObj[i].goods_list[j].choose_num += +attr.num;
                                            for(let rule of this.listObj[i].goods_list[j].plugin_data.discount_rules) {
                                                if(!(+this.listObj[i].goods_list[j].choose_num < +rule.num)) {
                                                    this.listObj[i].goods_list[j].discount = rule.discount
                                                }
                                            }
                                        }
                                    }
                                    if(choose == this.listObj[i].goods_list[j].attr_arr.length) {
                                        this.listObj[i].goods_list[j].is_active = true;
                                    }else {
                                        this.listObj[i].goods_list[j].is_active = false;
                                    }
                                }
                            }else {
                                if (item.id === this.listObj[i].goods_list[j].id) {
                                    this.listObj[i].goods_list[j].is_active  = !this.listObj[i].goods_list[j].is_active;

                                }
                            }
                            
                            if (this.listObj[i].goods_list[j].is_active) {
                                active_num++;
                            }
                            
                            if (this.editStatus === false && this.listObj[i].goods_list[j].new_status !== 0) {
                                goods_list_len --;
                            }
                        }
                        if (goods_list_len === active_num) {
                            this.listObj[i].is_active = true;
                        } else {
                            this.listObj[i].is_active = false;
                        }
                    }
                }
            },
	        
            selectAll(bool) {
                this.listObj.map(item => {
                    item.is_active = bool;
                    item.goods_list.map(good => {
                        if (this.editStatus === false) {
                            if (item.new_status === 0 && good.new_status === 0) {
                                good.is_active = bool;
                                if(good.sign === 'wholesale') {
                                    good.choose_num = bool ? good.attrs.num : 0;
                                    good.discount = bool ? good.attrs.discount : good.plugin_data.discount_type == 1 ? 0 : 10;
                                    for(let attr of good.attr_arr) {
                                        attr.is_active = bool;
                                    }
                                }
                            }
                        } else {
                            good.is_active = bool;
                            if(good.sign === 'wholesale') {
                                good.choose_num = bool ? good.attrs.num : 0;
                                good.discount = bool ? good.attrs.discount : good.plugin_data.discount_type == 1 ? 0 : 10;
                                for(let attr of good.attr_arr) {
                                    attr.is_active = bool;
                                }
                            }
                        }
                    })
                });
            },
	        // 结算
            settlement() {
                let all_product = [];
                let is_miaosha = false;
                for (let i = 0; i < this.listObj.length; i++) {
                    let mch = {
                        mch_id: this.listObj[i].mch_id,
                        goods_list: [],
                    };
                    for (let j = 0; j < this.listObj[i].goods_list.length; j++) {
                        let good = this.listObj[i].goods_list[j];
                        if (good.new_status === 0) {
                            if(good.is_active) {
                                if (good.sign === 'miaosha') is_miaosha = true;
                                if(good.sign === 'wholesale') {
                                    for(let item of good.attr_arr) {
                                        if(item.num > 0 && item.is_active) {
                                           let product = {
                                                id: item.attr_info.goods_id,
                                                attr: [],
                                                num: item.num,
                                                cart_id: item.id,
                                                goods_attr_id: item.attr_id
                                            }
                                            for(let attr of item.attrs.attr) {
                                                let para = {
                                                    attr_id: attr.attr_id,
                                                    attr_group_id: attr.attr_group_id  
                                                }
                                                product.attr.push(para)
                                            }
                                            mch.goods_list.push(product);
                                        }
                                    }
                                }else {
                                    let product = {
                                        id: good.goods_id,
                                        attr: [
                                        ],
                                        num: good.num,
                                        cart_id: good.id,
                                        goods_attr_id: good.attr_id,
                                    };
                                    for (let n in good.attrs.attr) {
                                        let attr = {
                                            attr_id: good.attrs.attr[n].attr_id,
                                            attr_group_id: good.attrs.attr[n].attr_group_id,
                                        };
                                        product.attr.push(attr);
                                    }
                                    mch.goods_list.push(product);
                                }
                            }else {
                                if(good.sign === 'wholesale') {
                                    for(let item of good.attr_arr) {
                                        if(item.num > 0 && item.is_active) {
                                           let product = {
                                                id: item.attr_info.goods_id,
                                                attr: [],
                                                num: item.num,
                                                cart_id: item.id,
                                                goods_attr_id: item.attr_id
                                            }
                                            for(let attr of item.attrs.attr) {
                                                let para = {
                                                    attr_id: attr.attr_id,
                                                    attr_group_id: attr.attr_group_id  
                                                }
                                                product.attr.push(para)
                                            }
                                            mch.goods_list.push(product);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (mch.goods_list.length > 0) {
                        all_product.push(mch);
                    }
                }
                let jump_url = `/pages/order-submit/order-submit?mch_list=${JSON.stringify(all_product)}`;
                if (is_miaosha) {
                    jump_url += `&preview_url=${encodeURIComponent(this.$api.miaosha.order_preview)}&submit_url=${encodeURIComponent(this.$api.miaosha.order_submit)}`;
                }
                this.$jump({
	                open_type: 'navigate',
	                url: jump_url,
                });
                setTimeout(()=> {
					this.listObj = [];
				}, 1000);
            },
	        editNum() {
                let editList = [];
                for (let i = 0; i < this.listObj.length; i++) {
                    let goods = this.listObj[i].goods_list;
                    for (let j = 0; j < goods.length; j++) {
                        if (goods[j].new_status === 0) {
                            if(goods[j].sign === 'wholesale') {
                                for(let attr of goods[j].attr_arr) {
                                    editList.push({
                                        goods_id: attr.attr_info.goods_id,
                                        num: attr.num,
                                        attr: attr.attr_id,
                                    })
                                }
                            }else {
                                editList.push({
                                    goods_id: goods[j].goods_id,
                                    num: goods[j].num,
                                    attr: goods[j].attr_id,
                                })
                            }
                        }
                    }
                }
                this.$request({
                    method: 'post',
                    url: this.$api.cart.edit,
                    data: {
                        list: JSON.stringify(editList)
                    }
                }).then(() => {
					this.$store.dispatch('cart/is_edit', false);
                })
	        },
	        
	        // 删除商品
            async deleteProduct() {
                let product_list = [];
                
                for (let i = 0 ; i < this.listObj.length; i++) {
                    let goods = this.listObj[i].goods_list;
                    for (let j = 0 ; j < goods.length; j++) {
                        if (goods[j].is_active) {
                            if(goods[j].sign == 'wholesale') {
                                for(let item of goods[j].attr_arr) {
                                    product_list.push({
                                        mch_id: goods[j].mch_id,
                                        id: item.id,
                                    })
                                }
                            }else {
                                product_list.push({
                                    mch_id: goods[j].mch_id,
                                    id: goods[j].id,
                                })
                            }
                        }else {
                            if(goods[j].sign == 'wholesale') {
                                for(let item of goods[j].attr_arr) {
                                    if(item.is_active) {
                                        product_list.push({
                                            mch_id: goods[j].mch_id,
                                            id: item.id,
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
                
                if (!product_list.length) return;
                const res = await this.$request({
                    method: 'post',
	                url: this.$api.cart.delete,
                    data: {
                        cart_id_list: JSON.stringify(product_list),
                    }
                });
                if (res.code === 0) {
                    this.editStatus = false;
                    for (let j = 0; j < this.listObj.length; j++) {
                        for (let i = 0; i < product_list.length; i++) {
                            if (this.listObj[j].mch_id == product_list[i].mch_id) {
                                for (let k = 0; k < this.listObj[j].goods_list.length; k++) {
                                    if(this.listObj[j].goods_list[k].sign === 'wholesale') {
                                        for(let index in this.listObj[j].goods_list[k].attr_arr) {
                                            if (this.listObj[j].goods_list[k].attr_arr[index].id == product_list[i].id) {
                                                this.$delete(this.listObj[j].goods_list[k].attr_arr, index);
                                                if(this.listObj[j].goods_list[k].attr_arr.length == 0) {
                                                    this.$delete(this.listObj[j].goods_list, k);
                                                }
                                            }
                                        }
                                        this.count();
                                    }else {
                                        if (this.listObj[j].goods_list[k].id == product_list[i].id) {
                                            this.$delete(this.listObj[j].goods_list, k);
                                        }
                                    }
                                }
                                if (this.listObj[j].goods_list.length === 0) {
                                    this.$delete(this.listObj, j);
                                }
                            }
                        }
                    }
                }
            },
            b() {
                let currentRoute = this.currentRoute;
                for (let i = 0; i < this.tabBarNavs.length; i++) {
                    if(currentRoute.includes(this.tabBarNavs[i].url.split('?')[0])) {
                        return this.tabbarbool = true;
                    }
                }
                return  this.tabbarbool = false;
            },

            change(number, id, mch_id) {
                for (let i = 0; i < this.listObj.length; i++) {
                    if (this.listObj[i].mch_id === mch_id) {
                        for (let j = 0; j < this.listObj[i].goods_list.length; j++) {
                            if(this.listObj[i].goods_list[j].sign === 'wholesale' && this.listObj[i].goods_list[j].new_status != 3) {
                                for (let x = 0; x < this.listObj[i].goods_list[j].attr_arr.length; x++) {
                                    if (this.listObj[i].goods_list[j].attr_arr[x].id == id) {
                                        this.listObj[i].goods_list[j].attr_arr[x].num = Number(number);
                                        this.count();
                                        return;
                                    }
                                }
                            }else {
                                if (this.listObj[i].goods_list[j].id === id) {
                                    this.listObj[i].goods_list[j].num = Number(number);
                                    return;
                                }
                            }
                        }
                    }
                }
            },

            count() {
                let that = this;
                for(let item of that.listObj) {
                    for(let goods of item.goods_list) {
                        goods.price = 0;
                        if(goods.sign === 'wholesale' && (goods.new_status == 0 || goods.new_status == 6)) {
                            if(goods.plugin_data.discount_type == 0) {
                                goods.attrs.discount = 10
                            }else {
                                goods.attrs.discount = 0;
                            }
                            goods.attrs.num = 0;
                            let price = 0;
                            goods.choose_num = 0;
                            for(let attr of goods.attr_arr) {
                                price += (+attr.num * +attr.attrs.price)
                                goods.attrs.num += +attr.num
                                if(attr.is_active) {
                                    goods.choose_num += +attr.num
                                }
                            }
                            let chooseNum = 0;
                            for(let item of goods.attr_arr) {
                                if(item.is_active) {
                                    chooseNum += +item.num
                                }
                            }
                            for(let i of goods.plugin_data.discount_rules) {
                                if(!(+goods.attrs.num < +i.num)) {
                                    goods.attrs.discount = i.discount
                                }
                                if(!(+chooseNum < +i.num)) {
                                    goods.discount = i.discount
                                }
                            }
                            if(goods.plugin_data.discount_type == 0) {
                                goods.price = (price*(goods.attrs.discount/10)).toFixed(2);
                            }else {
                                goods.price = (price - (goods.attrs.discount*goods.attrs.num)).toFixed(2);
                            }
                            if(goods.attrs.num < goods.plugin_data.up_num) {
                                goods.new_status = 6;
                            }else {
                                goods.new_status = 0;
                            }
                        }
                    }
                }
            },
	        
	        setTime(data) {
                let is_spike = false;
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].goods_list.length; j++) {
                        if (data[i].goods_list[j].sign === 'miaosha' && data[i].goods_list[j].miaosha_status === 1) {
                            is_spike = true;
                            data[i].goods_list[j].miaosha_time--;
                            let second = parseInt(data[i].goods_list[j].miaosha_time);
                            let minute = 0;
                            let hour = 0;
                            if (second > 60) {
                                minute = parseInt(second / 60);
                                second = parseInt(second % 60);
                                if (minute > 60) {
                                    hour = parseInt(minute / 60);
                                    minute = parseInt(minute % 60);
                                }
                            }
                            let timeDaily = {
                                h: hour < 10 ? ('0' + hour) : hour,
                                m: minute < 10 ? ('0' + minute) : minute,
                                s: second < 10 ? ('0' + second) : second,
                            };
                            this.$set(this.listObj[i].goods_list[j], 'miaosha_string',  `${timeDaily.h + ':' + timeDaily.m + ':' + timeDaily.s}`);
                        }
                        if (data[i].goods_list[j].sign === 'flash_sale' && (data[i].goods_list[j].flash_sale_status === 1 || data[i].goods_list[j].flash_sale_status === 2)) {
							is_spike = true;
							data[i].goods_list[j].flash_sale_time--;
							let second = parseInt(data[i].goods_list[j].flash_sale_time);
							let minute = 0;
							let hour = 0;
							if (second > 60) {
								minute = parseInt(second / 60);
								second = parseInt(second % 60);
								if (minute > 60) {
									hour = parseInt(minute / 60);
									minute = parseInt(minute % 60);
								}
							}
							let timeDaily = {
								h: hour < 10 ? ('0' + hour) : hour,
								m: minute < 10 ? ('0' + minute) : minute,
								s: second < 10 ? ('0' + second) : second,
							};
							this.$set(this.listObj[i].goods_list[j], 'flash_sale_string',  `${timeDaily.h + ':' + timeDaily.m + ':' + timeDaily.s}`);
						}
                    }
                }
                return is_spike;
	        },
	        spikeTime(data) {
	            clearInterval(this.spike);
	            let is_spike = this.setTime(data);
	            if (!is_spike) return;
                this.spike = setInterval(() => {
                    let is_spike = this.setTime(data);
                    if (!is_spike) {
                        clearInterval(this.spike);
                    }
                }, 1000);
	        }
        },

	    onShow() {
            this.submitDis = true;
			this.listObj = [];
			setTimeout(() => {
				this.getProductList();
			}, 1000);
            this.all = false;
        },
        onHide() {
            this.editNum();
            clearInterval(this.spike);
        },
        onUnload() {
            this.editNum();
            clearInterval(this.spike);
        },
	    watch:{
            listObj: {
                handler(listObj) {
                    this.priceNum = 0;
                    let listNum = 0;
                    let activeIndex = 0;
                    let check = true;
                    for (let i = 0; i < listObj.length; i++) {
                        if(listObj[i].new_status == 0) {
                            listNum += listObj[i].goods_list.length;
                            let status = listObj[i].goods_list.length;
                            let newStatus = 0;
                            for (let j = 0; j < listObj[i].goods_list.length;j++) {
                                if (listObj[i].goods_list[j].new_status !== 0) {
                                    newStatus++;
                                }
                                if (this.editStatus === false && listObj[i].goods_list[j].new_status !== 0) {
                                    listNum --;
                                }
                                if (listObj[i].goods_list[j].is_active) {
                                    if(listObj[i].goods_list[j].sign === 'wholesale') {
                                        listNum += listObj[i].goods_list[j].attr_arr.length - 1;
                                        for(let item of listObj[i].goods_list[j].attr_arr) {
                                            if (!this.editStatus) {
                                                if(listObj[i].goods_list[j].plugin_data.discount_type == 0) {
                                                    let discount = listObj[i].goods_list[j].discount ? listObj[i].goods_list[j].discount : 10;
                                                    item.price = (+item.attrs.price*(+discount/10)).toFixed(2);
                                                }else {
                                                    let discount = listObj[i].goods_list[j].discount ? listObj[i].goods_list[j].discount : 0;
                                                    item.price = (+item.attrs.price - +discount).toFixed(2);
                                                }
                                            }
                                            if(item.is_active) {
                                                if (!this.editStatus) {
                                                    let num = Number(item.price) * Number(item.num);
                                                    this.priceNum += num;
                                                    if(!(listObj[i].goods_list[j].choose_num < listObj[i].goods_list[j].plugin_data.up_num)) {
                                                        activeIndex++;
                                                    }
                                                }else {
                                                    activeIndex++;
                                                }
                                            }
                                        }
                                    }else {
                                        if (!this.editStatus) {
                                            let num = Number(listObj[i].goods_list[j].attrs.price) * Number(listObj[i].goods_list[j].num);
                                            this.priceNum += num;
                                        }
                                        activeIndex++;
                                    }
                                }else {
                                    if(listObj[i].goods_list[j].sign === 'wholesale' && listObj[i].goods_list[j].new_status !== 3) {
                                        listNum += listObj[i].goods_list[j].attr_arr.length - 1;
                                        for(let item of listObj[i].goods_list[j].attr_arr) {
                                            if(listObj[i].goods_list[j].plugin_data.discount_type == 0) {
                                                let discount = listObj[i].goods_list[j].discount ? listObj[i].goods_list[j].discount : 10;
                                                item.price = (+item.attrs.price*(+discount/10)).toFixed(2);
                                            }else {
                                                let discount = listObj[i].goods_list[j].discount ? listObj[i].goods_list[j].discount : 0;
                                                item.price = (+item.attrs.price - +discount).toFixed(2);
                                            }
                                            if(item.is_active) {
                                                if (!this.editStatus) {
                                                    let num = Number(item.price) * Number(item.num);
                                                    this.priceNum += num;
                                                    if(!(listObj[i].goods_list[j].choose_num < listObj[i].goods_list[j].plugin_data.up_num)) {
                                                        activeIndex++;
                                                    }else {
                                                        check = false;
                                                    }
                                                }else {
                                                    activeIndex++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (status === newStatus) {
                                this.listObj[i].new_status = this.listObj[i].new_status == 0 ? 1 : this.listObj[i].new_status;
                            }
                        }
                    }
                    if (activeIndex === listNum) {
                        if (listNum === 0 && activeIndex === 0) {
                            this.all = false;
                        } else {
                            this.all = true;
                        }
                    } else {
                        this.all = false;
                    }
                    if (activeIndex > 0 && check) {
                        this.submitDis = false;
                    } else {
                        this.submitDis = true;
                    }
                    this.priceNum = this.priceNum.toFixed(2);
                },
	            deep: true,
            },
            tabBarNavs: {
                handler: function() {
                    this.b();
                },
                immediate: true,
            }
	    }
    }
</script>

<style lang="scss" scoped>
	.app-cart {
		background-color: #f7f7f7;
		position: absolute;
		top: 0;
		left: 0;
		width: #{750rpx};
		.app-announcement {
			width: 100%;
			height: #{72rpx};
			background-color: #ffffff;
			.app-announcement-text {
				font-size: #{26rpx};
				color: #999999;
				margin-left: #{24rpx};
			}
			.app-edit-text {
				font-size: #{26rpx};
				color: #353535;
				margin-right: #{32rpx};
			}
		}
		.app-settlement {
			width: 100%;
			height: #{100rpx};
			z-index: 1500;
			position: fixed;
			left: 0;
			border-top: #{1rpx} solid #e2e2e2;
			background-color: white;
			.app-radio {
				padding-left: #{23rpx};
				.app-price {
					margin-left: #{24rpx};
					font-size: #{28rpx};
				}
			}
			.app-all-text {
				margin-left: #{9rpx};
				font-size: #{25rpx};
				color: #3f3f3f;
			}
			.app-delete {
				width: #{140rpx};
				height: #{64rpx};
				line-height: #{64rpx};
				text-align: center;
				background-color: white;
				border-radius: #{32rpx};
				border: #{1rpx} solid ;
				font-size: #{28rpx};
				margin: #{0 24rpx 0 0};
				padding: 0;
			}
			.delete-disabled {
				color: #989898;
				border: #{1rpx} solid #989898;
			}
			.app-settlement-button {
				height: #{100rpx};
				width: #{250rpx};
				color: #ffffff;
				font-size: #{30rpx};
				line-height: #{100rpx};
				text-align: center;
				border-radius: 0;
				margin: 0;
				padding: 0;
				border: none;
			}
			
			.disabled-background {
				background-color: #989898;
			}
		}
		.no-cart {
			width: 100%;
			.cart-icon {
				width: #{160rpx};
				height: #{160rpx};
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.1);
				margin: #{150rpx auto 40rpx};
				.cart-image {
					height: #{80rpx};
					width: #{80rpx};
					margin: #{40rpx};
				}
			}
			.cart-text {
				font-size: #{30rpx};
				color: #888;
				text-align: center;
				
			}
		}
	}
</style>
