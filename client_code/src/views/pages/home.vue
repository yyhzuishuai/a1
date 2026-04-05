<template>
    <div class="home_box">
        <!-- Hero Banner -->
        <div class="hero-banner">
            <div class="sakura-container">
                <div class="sakura" style="left: 10%; width: 15px; height: 10px; animation-duration: 7s; animation-delay: 0s;"></div>
                <div class="sakura" style="left: 30%; width: 12px; height: 8px; animation-duration: 9s; animation-delay: 2s;"></div>
                <div class="sakura" style="left: 55%; width: 18px; height: 12px; animation-duration: 6s; animation-delay: 1s;"></div>
                <div class="sakura" style="left: 75%; width: 14px; height: 9px; animation-duration: 8s; animation-delay: 3s;"></div>
                <div class="sakura" style="left: 90%; width: 16px; height: 11px; animation-duration: 10s; animation-delay: 0.5s;"></div>
            </div>
            <div class="hero-content animate-fade-up">
                <h1 class="text-gradient">欢迎来到动漫周边商店</h1>
                <p>探索最全、最萌、最酷的动漫周边商品</p>
                <div class="hero-btns">
                    <el-button class="btn-gradient" @click="moreClick('dongmanshangpin')">立即探索</el-button>
                </div>
            </div>
        </div>

			<!-- 动漫商品推荐 -->
            <div class="recomList_view">
                <div class="tableName">
                    <span class="animate-fade-up">动漫商品推荐</span>
                </div>
                <div class="list">
                    <div v-for="(item,index) in dongmanshangpinRecomList" @click="detailClick('dongmanshangpin',item.id)" class="item animate-fade-up" :style="{animationDelay: index*0.08+'s'}">
                        <div class="img-box">
                            <img v-if="item.imgUrls" :src="item.imgUrls[0]" alt="">
                        </div>
                        <div class="content">
                            <div class="tag-row">
                                <span class="brand-tag">{{item.dongmanpinpai}}</span>
                                <div class="rating">
                                    <i class="iconfont icon-shoucang1" style="color: #FFB347;"></i>
                                    <span>{{item.score}}</span>
                                </div>
                            </div>
                            <div class="pricenumdiv">
                                <div class="price">
                                    <span class="unit">￥</span>
                                    <span class="number">{{item.price}}</span>
                                </div>
                                <div class="num-row">
                                    <div class="thumbsupnum" title="点赞">
                                        <span class="iconfont icon-thumb-up-line1"></span>
                                        <div class="num">{{item.thumbsupNumber}}</div>
                                    </div>
                                    <div class="storeupnum" title="收藏">
                                        <span class="iconfont icon-likeline4"></span>
                                        <div class="num">{{item.storeupNumber}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="gd">查看详情</div>
                        </div>
                    </div>
                </div>
                <div class="more btn-gradient animate-fade-up" @click="moreClick('dongmanshangpin')"><span>更多 ></span></div>
            </div>

			<!-- 周边定制首页展示 -->
            <div class="homeList_view">
<div class="tableName"><span class="animate-fade-up">周边定制展示</span></div>
<div class="list">
    <div v-for="(item,index) in zhoubiandingzhiHomeList" @click="detailClick('zhoubiandingzhi',item.id)" class="item glass-card animate-fade-up" :style="{animationDelay: index*0.08+'s'}">
        <img v-if="item.imgUrls" :src="item.imgUrls[0]" alt="">
        <div class="content">

<div class="title merchant-name">{{item.shangjiamingcheng}}</div>
<div class="title custom-price"><span class="price-label">定制价格：</span><span class="price-num text-gradient">￥{{item.dingzhijiage}}</span></div>

            <div class="num-row">



            </div>
        </div>
    </div>
</div>
<div class="more btn-gradient animate-fade-up" @click="moreClick('zhoubiandingzhi')"><span>查看更多 ></span></div>
            </div>
			<!-- 店铺活动首页展示 -->
            <div class="homeList_view">
<div class="tableName"><span class="animate-fade-up">店铺活动展示</span></div>
<div class="list">
    <div v-for="(item,index) in dianpuhuodongHomeList" @click="detailClick('dianpuhuodong',item.id)" class="item glass-card animate-fade-up" :style="{animationDelay: index*0.08+'s'}">
        <img v-if="item.imgUrls" :src="item.imgUrls[0]" alt="">
        <div class="content">

<div class="title activity-title">{{item.huodongbiaoti}}</div>
<div class="activity-time-tag">{{item.huodongshijian}}</div>
<div class="merchant-name">{{item.shangjiamingcheng}}</div>

            <div class="num-row">



            </div>
        </div>
    </div>
</div>
<div class="more btn-gradient animate-fade-up" @click="moreClick('dianpuhuodong')"><span>查看更多 ></span></div>
            </div>
			<!-- 动漫主题活动首页展示 -->
            <div class="homeList_view">
<div class="tableName"><span class="animate-fade-up">动漫主题活动展示</span></div>
<div class="list">
    <div v-for="(item,index) in dongmanzhutihuodongHomeList" @click="detailClick('dongmanzhutihuodong',item.id)" class="item glass-card animate-fade-up" :style="{animationDelay: index*0.08+'s'}">
        <img v-if="item.imgUrls" :src="item.imgUrls[0]" alt="">
        <div class="content">

<div class="title activity-name">{{item.huodongmingcheng}}</div>
<div class="info-item time"><i class="iconfont icon-shijian"></i><span>开始时间：{{item.kaishishijian}}</span></div>
<div class="info-item spots"><i class="iconfont icon-user1"></i><span>剩余名额：<em class="text-gradient">{{item.shengyuminge}}</em></span></div>

            <div class="num-row">



            </div>
        </div>
    </div>
</div>
<div class="more btn-gradient animate-fade-up" @click="moreClick('dongmanzhutihuodong')"><span>查看更多 ></span></div>
            </div>

			<!-- 系统公告 -->
			<div class="newsList_view">
<div class="tableName"><span class="animate-fade-up">系统公告</span></div>
<div class="list">
        <template v-for="(item,index) in newsList" :key="index">
            <div class="item glass-card animate-fade-up" @click="newsDetailClick(item)" :style="{animationDelay: index*0.08+'s'}">
                <div class="card-left">
                    <div class="dot pulse-glow"></div>
                </div>
                <div class="content">
                    <div class="title-row">
                        <div class="title text-one-row">{{item.title}}</div>
                        <div class="time-tag">{{moment(item.addtime).format('YYYY-MM-DD')}}</div>
                    </div>
                    <div class="intro text-two-row">{{item.introduction}}</div>
                </div>
            </div>
        </template>
        <div class="more btn-gradient animate-fade-up" @click="moreClick('news')"><span>查看更多 ></span></div>
</div>

			</div>



    </div>
    <formModel ref="newsFormModelRef"></formModel>
</template>

<script setup>
	import {
		ref,
        computed,
		getCurrentInstance
	} from 'vue';
    const moment = window.moment
	import {
		useRouter
	} from 'vue-router';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
    const baseUrl = ref(context.$config.url)
	//动漫商品推荐
	const dongmanshangpinRecomList = ref([])
	const getdongmanshangpinRecomList = () => {
		let autoSortUrl = 'dongmanshangpin/autoSort'
		let params = {
			sfsh: '是',
			page: 1,
			limit: 8,
            isShelves: 1,
		}
		context?.$http({
			url: autoSortUrl,
			method: 'get',
			params: params
		}).then(res => {
			dongmanshangpinRecomList.value = res.data.data.list
			dongmanshangpinRecomList.value.forEach(item=>{
				if(item.shangpintupian!=null){
					item.imgUrls = item.shangpintupian.split(',').map(item=>(isHttp(item)?'':context.$config.url)+item)
				}else{
                    item.imgUrls = []
                }
			})
		})
	}
	//周边定制首页展示
	const zhoubiandingzhiHomeList = ref([])
	const getzhoubiandingzhiHomeList = () => {
		let params = {
			page: 1,
			limit: 8,
            sort:'id',
            order:'desc',
		}
		context?.$http({
			url: 'zhoubiandingzhi/list',
			method: 'get',
			params: params
		}).then(res => {
			zhoubiandingzhiHomeList.value = res.data.data.list
			zhoubiandingzhiHomeList.value.forEach(item=>{
				if(item.yangpinzhanshi!=null){
					item.imgUrls = item.yangpinzhanshi.split(',').map(item=>(isHttp(item)?'':context.$config.url)+item)
				}else{
                    item.imgUrls = []
                }
			})
		})
	}
	//店铺活动首页展示
	const dianpuhuodongHomeList = ref([])
	const getdianpuhuodongHomeList = () => {
		let params = {
			page: 1,
			limit: 8,
            sort:'id',
            order:'desc',
		}
		context?.$http({
			url: 'dianpuhuodong/list',
			method: 'get',
			params: params
		}).then(res => {
			dianpuhuodongHomeList.value = res.data.data.list
			dianpuhuodongHomeList.value.forEach(item=>{
				if(item.tupian!=null){
					item.imgUrls = item.tupian.split(',').map(item=>(isHttp(item)?'':context.$config.url)+item)
				}else{
                    item.imgUrls = []
                }
			})
		})
	}
	//动漫主题活动首页展示
	const dongmanzhutihuodongHomeList = ref([])
	const getdongmanzhutihuodongHomeList = () => {
		let params = {
			page: 1,
			limit: 8,
            sort:'id',
            order:'desc',
		}
		context?.$http({
			url: 'dongmanzhutihuodong/list',
			method: 'get',
			params: params
		}).then(res => {
			dongmanzhutihuodongHomeList.value = res.data.data.list
			dongmanzhutihuodongHomeList.value.forEach(item=>{
				if(item.huodongtupian!=null){
					item.imgUrls = item.huodongtupian.split(',').map(item=>(isHttp(item)?'':context.$config.url)+item)
				}else{
                    item.imgUrls = []
                }
			})
		})
	}
	//系统公告弹窗
	import formModel from './news/formModel'
	const newsFormModelRef = ref(null)
	//系统公告
	const newsList = ref([])
	const getNewsList = () => {
		context?.$http({
			url: 'news/list',
			method: 'get',
			params:{
				page:1,
				limit: 5,
                sort:'id',
                order:'desc',
			}
		}).then(res=>{
			newsList.value = res.data.data.list
			newsList.value.forEach(item=>{
                let urls = item.picture.split(',')
                item.imgUrls = urls.map(url=>{
                    if(isHttp(url)){
                        return url
                    }else{
                        return baseUrl.value+url
                    }
                })
			})
		})
	}
	const newsDetailClick = (item) => {
		if (item && item.id){
			newsFormModelRef.value.init(item.id)
		}
	}
	//判断图片链接是否带http
	const isHttp = (str) => {
        return str && str.substr(0,4)=='http';
    }
	//跳转详情
	const detailClick = (table,id) => {
		router.push(`/index/${table}Detail?id=${id}`)
	}
	const moreClick = (table) => {
		router.push(`/index/${table}List`)
	}
	const init = () => {
		//动漫商品推荐
		getdongmanshangpinRecomList()
		//周边定制首页展示
		getzhoubiandingzhiHomeList()
		//店铺活动首页展示
		getdianpuhuodongHomeList()
		//动漫主题活动首页展示
		getdongmanzhutihuodongHomeList()
		//系统公告
		getNewsList()
	}
	init()
</script>

<style lang="scss">
.home_box {
    width: 100%;
    margin: 0 auto;
    padding: 0 0 50px;
    display: flex;
    flex-wrap: wrap;
    background: transparent;
}
.hero-banner {
    width: 100%;
    height: 450px;
    position: relative;
    background: linear-gradient(135deg, #FFE8F3 0%, #FFF3E0 50%, #E8F4FF 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: 0 0 40px 40px;
    
    .hero-content {
        position: relative;
        z-index: 2;
        
        h1 {
            font-size: 48px;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        
        p {
            font-size: 18px;
            color: var(--text-medium);
            margin-bottom: 30px;
            font-family: 'Noto Sans SC', sans-serif;
        }
    }
}
.recomList_view {
    width: 100%;
    margin: 30px auto 0;
    position: relative;
    order: 3;
    background: linear-gradient(180deg, rgba(255, 248, 245, 0) 0%, rgba(255, 240, 236, 0.5) 100%);
    padding: 60px 7%;
    border-radius: 40px;
}

.recomList_view .tableName {
    text-align: left;
    margin-bottom: 40px;
}

.recomList_view .tableName span {
    color: var(--text-dark) !important;
    font-size: 26px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    padding-top: 28px;
    font-family: 'Nunito', 'Noto Sans SC', sans-serif;
    
    &::before {
        content: 'Product_Recommendation';
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 800;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 1px;
        background: var(--gradient-main);
        padding: 2px 12px;
        border-radius: 20px;
        line-height: 1.4;
    }
}

.recomList_view .more {
    position: absolute;
    top: 60px;
    right: 7%;
    width: auto;
    height: auto;
    padding: 8px 24px;
    border: none;
    line-height: normal;
    z-index: 5;
    border-radius: 24px;
    background: var(--gradient-main);
    transition: var(--transition);
    cursor: pointer;
    
    span {
        color: #ffffff !important;
        font-size: 14px;
        font-weight: 600;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
    }
}

.recomList_view .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-top: 0;
}

.recomList_view .list .item {
    width: 100%;
    margin: 0;
    border-radius: 16px;
    overflow: hidden;
    background: #FFFFFF !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 4px 20px rgba(255, 107, 157, 0.10);
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 32px rgba(255, 107, 157, 0.20);
        border-color: var(--color-pink) !important;
        
        .img-box img {
            transform: scale(1.10);
        }
        
        .content .gd {
            background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB1 100%);
            transform: translateY(-1px);
            filter: brightness(1.05);
            color: #ffffff;
        }
    }
}

.recomList_view .img-box {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.recomList_view .item img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.recomList_view .item .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.recomList_view .tag-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .brand-tag {
        background: #FFF0EC;
        color: var(--color-pink);
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 6px;
        font-weight: 600;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: var(--text-medium);
        font-weight: 700;
        
        i {
            font-size: 14px;
        }
    }
}

.recomList_view .pricenumdiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
}

.recomList_view .price {
    color: var(--color-pink);
    font-family: 'Nunito', sans-serif;
    
    .number {
        font-size: 22px;
        font-weight: 800;
    }
    .unit {
        font-size: 14px;
        margin-right: 1px;
        font-weight: 700;
    }
}

.recomList_view .num-row {
    display: flex;
    gap: 12px;
    
    .thumbsupnum, .storeupnum {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-light);
        font-size: 12px;
        transition: var(--transition);
        
        &:hover {
            color: var(--color-pink);
        }
        
        i {
            font-size: 14px;
        }
    }
}

.recomList_view .content .gd {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB1 100%);
    border-radius: 10px;
    margin-top: 4px;
    transition: all 0.3s ease;
}
.homeList_view {
    width: 100%;
    margin: 30px auto 0;
    position: relative;
    order: 4;
    background: transparent;
    padding: 40px 7%;
}

.homeList_view .tableName {
    text-align: left;
    margin-bottom: 20px;
}

.homeList_view .tableName span {
    color: var(--text-dark) !important;
    font-size: 26px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    padding-top: 28px;
    font-family: 'Nunito', 'Noto Sans SC', sans-serif;
    
    &::before {
        content: 'Product_Display';
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 800;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 1px;
        background: var(--gradient-main);
        padding: 2px 12px;
        border-radius: 20px;
        line-height: 1.4;
    }
    
    &::after {
        display: none;
    }
}

.homeList_view .more {
    position: absolute;
    top: 40px;
    right: 7%;
    width: auto;
    height: auto;
    padding: 8px 20px;
    border: none;
    line-height: normal;
    
    span {
        color: #ffffff !important;
        font-size: 14px;
    }
}

.homeList_view .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 40px;
}

.homeList_view .list .item {
    width: 100%;
    margin: 0;
    border-radius: 16px;
    overflow: hidden;
    background: #FFFFFF !important;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 20px rgba(255, 107, 157, 0.08);
    transition: var(--transition);
    
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 32px rgba(255, 107, 157, 0.15);
        border-color: var(--color-pink);
    }
}

.homeList_view .item img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.homeList_view .item:hover img {
    transform: scale(1.08);
}

.homeList_view .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.homeList_view .title {
    color: var(--text-dark) !important;
}

.homeList_view .merchant-name {
    color: var(--text-medium) !important;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
}

.homeList_view .custom-price {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    .price-label {
        color: var(--text-light) !important;
    }
    
    .price-num {
        font-size: 22px;
        font-weight: 800;
        background: var(--gradient-main);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

.homeList_view .activity-title {
    color: var(--text-dark) !important;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
}

.homeList_view .activity-time-tag {
    background: #FFF0EC;
    color: var(--color-pink) !important;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    padding: 4px 12px;
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 600;
}

.homeList_view .activity-name {
    color: var(--text-dark) !important;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 12px;
}

.homeList_view .info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-medium);
    font-size: 13px;
    margin-bottom: 6px;

    i {
        font-size: 14px;
        color: var(--color-pink);
    }

    em {
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        background: var(--gradient-main);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.newsList_view {
    width: 100%;
    margin: 30px auto 0;
    position: relative;
    order: 5;
    background: transparent;
    padding: 40px 7%;
}

.newsList_view .tableName {
    text-align: left;
    margin-bottom: 20px;
}

.newsList_view .tableName span {
    color: var(--text-dark) !important;
    font-size: 26px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    padding-top: 28px;
    font-family: 'Nunito', 'Noto Sans SC', sans-serif;
    
    &::before {
        content: 'System_Announcements';
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 800;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 1px;
        background: var(--gradient-main);
        padding: 2px 12px;
        border-radius: 20px;
        line-height: 1.4;
    }
    
    &::after {
        display: none;
    }
}

.newsList_view .more {
    position: absolute;
    top: 40px;
    right: 7%;
    width: auto;
    height: auto;
    padding: 8px 20px;
    border: none;
    line-height: normal;
    
    span {
        color: #ffffff !important;
        font-size: 14px;
    }
}

.newsList_view .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 40px;
}

.newsList_view .list .item {
    display: flex;
    align-items: center;
    padding: 24px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(255, 107, 157, 0.06);
    border-left: 4px solid var(--color-pink);
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
        transform: translateX(8px);
        box-shadow: 0 8px 32px rgba(255, 107, 157, 0.12);
        
        .title {
            color: var(--color-pink);
        }
    }
    
    .card-left {
        margin-right: 16px;
        display: flex;
        align-items: center;
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--gradient-main);
            animation: pulse-glow 2s infinite;
        }
    }
    
    .content {
        flex: 1;
        overflow: hidden;
        
        .title-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            
            .title {
                color: var(--text-dark);
                font-weight: 700;
                font-size: 16px;
                transition: var(--transition);
            }
            
            .time-tag {
                background: #F5F0FF;
                color: var(--text-light);
                border: none;
                border-radius: 50px;
                font-size: 12px;
                padding: 2px 12px;
                white-space: nowrap;
            }
        }
        
        .intro {
            color: var(--text-medium);
            font-size: 14px;
            line-height: 1.6;
        }
    }
}
</style>