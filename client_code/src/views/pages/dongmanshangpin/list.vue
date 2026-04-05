<template>
    <div class="list-page">
        <div class="breadcrumb-wrapper">
            <div class="bread_view">
                <el-breadcrumb separator="›" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="back_view" v-if="centerType">
                <el-button class="back_btn btn-gradient" @click="backClick">返回</el-button>
            </div>
        </div>
		<div class="list_search">
			<div class="search_view">
				<div class="search_label">
					商品名称
				</div>
				<div class="search_box">
					<el-input class="search_inp" v-model="searchQuery.shangpinmingcheng" placeholder="搜索商品名称..."
						clearable>
					</el-input>
				</div>
			</div>
            <div class="search_view">
                <div class="search_label">
                    商品类型
                </div>
                <div class="search_box">
                    <el-select
                        class="search_sel"
                        clearable
                        v-model="searchQuery.shangpinleixing"
                        placeholder="全部分类"
                    >
                        <el-option v-for="item in shangpinleixingLists" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
            </div>
			<div class="search_view">
				<div class="search_label">
					价格区间
				</div>
				<div class="search_box price_range">
					<el-input class="search_inp" v-model="searchQuery.priceStart" placeholder="最低"
						clearable>
					</el-input>
                    <span class="range_divider">-</span>
					<el-input class="search_inp" v-model="searchQuery.priceEnd" placeholder="最高"
						clearable>
					</el-input>
				</div>
			</div>
			<div class="search_btn_view">
				<el-button class="search_btn" @click="searchClick">
                    <el-icon><Search /></el-icon>
                    <span>搜索</span>
                </el-button>
				<el-button class="add_btn btn-gradient" v-if="btnAuth('dongmanshangpin','新增')" @click="addClick">新增</el-button>
			</div>
		</div>

        <div class="sort-wrapper">
            <el-button class="item price" @click="sortClick('price')" :class="{active:sortType=='price'}">
                <el-icon class="icon" v-if="sortType!='price'"><DCaret /></el-icon>
                <el-icon class="icon desc" v-else-if="sortOrder=='desc'"><SortDown /></el-icon>
                <el-icon class="icon asc" v-else><SortUp /></el-icon>
                <span :class="{'text-gradient': sortType=='price'}">价格</span>
            </el-button>
            <el-button class="item storeup" @click="sortClick('storeupNumber')" :class="{active:sortType=='storeupNumber'}">
                <el-icon class="icon" v-if="sortType!='storeupNumber'"><DCaret /></el-icon>
                <el-icon class="icon desc" v-else-if="sortOrder=='desc'"><SortDown /></el-icon>
                <el-icon class="icon asc" v-else><SortUp /></el-icon>
                <span :class="{'text-gradient': sortType=='storeupNumber'}">收藏数</span>
            </el-button>
            <el-button class="item thumbsup" @click="sortClick('thumbsupNumber')" :class="{active:sortType=='thumbsupNumber'}">
                <el-icon class="icon" v-if="sortType!='thumbsupNumber'"><DCaret /></el-icon>
                <el-icon class="icon desc" v-else-if="sortOrder=='desc'"><SortDown /></el-icon>
                <el-icon class="icon asc" v-else><SortUp /></el-icon>
                <span :class="{'text-gradient': sortType=='thumbsupNumber'}">点赞数</span>
            </el-button>
        </div>


                <div class="data_view">
                    <div class="item animate-fade-up" v-for="(item,index) in list" :key="item.id" @click.stop="detailClick(item.id)" :style="{animationDelay: index*0.08+'s'}">
                        <div class="img_box">
                            <img :src="item.imgUrls[0]" @click.stop="preViewClick(item.imgUrls[0])">
                        </div>
                        <div class="content">
                            <div class="tag-row">
                                <span class="brand-tag">{{item.dongmanpinpai}}</span>
                                <div class="rating">
                                    <i class="iconfont icon-shoucang1" style="color: #FFB347;"></i>
                                    <span>{{item.score}}</span>
                                </div>
                            </div>
                            <div class="data_price">
                                <span class="unit">￥</span>
                                <span class="price-num">{{item.price}}</span>
                            </div>
                            <div class="count-row">
                                <div class="data_like" title="点赞">
                                    <span class="iconfont icon-thumb-up-line1"></span>
                                    <div class="like_num">{{item.thumbsupNumber || 0}}</div>
                                </div>
                                <div class="data_collect" title="收藏">
                                    <span class="iconfont icon-likeline4"></span>
                                    <div class="collect_num">{{item.storeupNumber || 0}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


				<el-pagination
					background
					:layout="layouts.join(',')"
					:total="total"
					:page-size="listQuery.limit"
                    v-model:current-page="listQuery.page"
					prev-text="上一页"
					next-text="下一页"
					:hide-on-single-page="false"
					@size-change="sizeChange"
					@current-change="currentChange"/>


    </div>

    <el-dialog v-model="preViewVisible" :title="'查看大图'" width="40%" destroy-on-close>
        <div style="text-align:center">
            <img :src="preViewUrl" style="max-width: 100%;" alt="">
        </div>
    </el-dialog>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
        computed,
        inject,
	} from 'vue';
    const moment = window.moment
	import {
		useRoute,
		useRouter
	} from 'vue-router';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
	const route = useRoute()
    const baseUrl = ref(context.$config.url)
	//基础信息
	const tableName = 'dongmanshangpin'
	const formName = '动漫商品'
	//基础信息
	const breadList = ref([{
		name: formName
	}])
	const list = ref([])
	const listQuery = ref({
		page: 1,
		limit: 10
	})
	const total = ref(0)
	const listLoading = ref(false)
	//权限验证
	const btnAuth = (e,a)=>{
		if(centerType.value){
			return context?.$toolUtil.isBackAuth(e,a)
		}else{
			return context?.$toolUtil.isAuth(e,a)
		}
	}
	const addClick = () => {
		router.push('/index/dongmanshangpinAdd')
	}
	//判断是否从个人中心跳转
	const centerType = ref(false)
	//返回
	const backClick = () => {
		router.push(`/index/${context?.$toolUtil.storageGet('frontSessionTable')}Center`)
	}
	//搜索
	const searchQuery = ref({})
	//下拉列表
	const shangpinleixingLists = ref([])
	const getshangpinleixingLists = () => {
		context?.$http({
			url: 'option/shangpinleixing/shangpinleixing',
			method:'get',
		}).then(res=>{
			shangpinleixingLists.value = res.data.data
		})
	}
	getshangpinleixingLists()
	const searchClick = async() => {
		listQuery.value.page = 1
		getList()
	}
	//分页
	const layouts = ref(["total","prev","pager","next","sizes"])
	const sizeChange = (size) => {
		listQuery.value.limit = size
		getList()
	}
	const currentChange = (page) => {
		listQuery.value.page = page
		getList()
	}
	//分页
    const sortType = ref('')
    const sortOrder = ref('')
    const sortClick = (type)=>{
        if(sortType.value==type && sortOrder.value=='asc'){
            sortType.value = ''
            sortOrder.value = ''
        }else if(sortType.value==type && sortOrder.value=='desc'){
            sortOrder.value = 'asc'
        }else{
            sortType.value = type
            sortOrder.value = 'desc'
        }
        getList()
    }
	//列表
	const getList = () => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
        if(!centerType.value) {
            params.isShelves = 1
        }
		if(searchQuery.value.shangpinmingcheng&&searchQuery.value.shangpinmingcheng!=''){
			params.shangpinmingcheng = '%' + searchQuery.value.shangpinmingcheng + '%'
		}
		if(searchQuery.value.shangpinleixing&&searchQuery.value.shangpinleixing!=''){
			params.shangpinleixing = searchQuery.value.shangpinleixing
		}
		if (searchQuery.value.priceStart&&searchQuery.value.priceStart!='') {
			params.priceStart = searchQuery.value.priceStart
		}
		if (searchQuery.value.priceEnd&&searchQuery.value.priceEnd!='') {
			params.priceEnd = searchQuery.value.priceEnd
		}
		if(!centerType.value){
			params['sfsh'] = '是';
		} 
        if(sortType.value){
            params['sort'] = sortType.value
            params['order'] = sortOrder.value
        }
		context?.$http({
			url: `${tableName}/${centerType.value?'page':'list'}`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = Number(res.data.data.total)
            list.value.forEach(item=>{
                if(item.shangpintupian!=null){
                    item.imgUrls = item.shangpintupian.split(',').map(url=> {
                        if(url && url.substr(0,4)=='http'){
                            return url
                        }else{
                            return baseUrl.value + url
                        }
                    })
                }else{
                    item.imgUrls = []
                }
            })
		})
	}
	const detailClick = (id) => {
		router.push(`${tableName}Detail?id=` + id + (centerType.value?'&&centerType=1':''))
	}
	//下载文件
	const download = (file) =>{
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		const a = document.createElement('a');
		a.style.display = 'none';
		a.setAttribute('target', '_blank');
		file && a.setAttribute('download', file);
		a.href = context?.$config.url + file;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	// 查看大图
	const preViewUrl = ref('')
	const preViewVisible = ref(false)
	const preViewClick = (url) =>{
		preViewUrl.value = url
		preViewVisible.value = true
	}
    const isShelvesDisabled = (row)=>{
        if(!centerType.value) {
            return false
        }
        let pubPeople = 'shangjiazhanghao'
        if(store.getters['user/username'] == row[pubPeople]) {
            return true
        }
        return false
    }
    const isShelvesChange = (e,row)=>{
        context.$http.post('${tableName}/update',row)
    }
	const init = async() => {
		if(route.query.centerType){
			centerType.value = true
		}
        if(context.$toolUtil.storageGet('frontToken') && !user.value.id){
            await store.dispatch("user/getSession")
        }
		getList()
	}
	init()
</script>
<style lang="scss" scoped>
.list-page {
    background: transparent !important;
    min-height: 100vh;
    padding: 30px 7% 60px;
    width: 100%;
}

.breadcrumb-wrapper {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .breadcrumb {
        font-size: 15px;
        font-family: 'Nunito', 'Noto Sans SC', sans-serif;
        
        ::v-deep .el-breadcrumb__inner {
            color: var(--text-medium) !important;
            font-weight: 500;
            &.is-link:hover {
                color: var(--color-pink) !important;
            }
        }

        ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
            color: var(--color-pink) !important;
            font-weight: 700;
        }
        
        ::v-deep .el-breadcrumb__separator {
            color: var(--text-light) !important;
            margin: 0 8px;
        }
    }
}

.list_search {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
    background: #FFFFFF !important;
    border: none;
    border-radius: 20px;
    padding: 24px 32px;
    box-shadow: 0 2px 16px rgba(255, 107, 157, 0.08);
    
    .search_view {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .search_label {
            color: var(--text-dark);
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
        }
        
        .search_box {
            width: 180px;
            
            &.price_range {
                width: auto;
                display: flex;
                align-items: center;
                gap: 8px;
                
                .range_divider {
                    color: var(--color-pink);
                    font-weight: bold;
                }
                
                .search_inp {
                    width: 100px;
                }
            }
        }
    }
    
    ::v-deep .el-input__wrapper, ::v-deep .el-select__wrapper {
        background: var(--bg-primary) !important;
        box-shadow: none !important;
        border: 1.5px solid var(--border-color) !important;
        border-radius: 12px;
        padding: 0 12px;
        transition: var(--transition);
        height: 40px;
        
        &.is-focus {
            border-color: var(--color-pink) !important;
            box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1) !important;
        }
        
        .el-input__inner, .el-select__placeholder {
            color: var(--text-dark) !important;
            font-size: 14px;
            &::placeholder {
                color: #C4B0CE !important;
            }
        }
    }

    ::v-deep .el-select__caret {
        color: var(--color-pink) !important;
        /* 这里可以进一步通过 CSS content 替换图标，但通常 Element Plus 使用 svg，建议保持色值 */
    }

    .search_btn_view {
        margin-left: auto;
        display: flex;
        gap: 12px;

        .search_btn {
            background: var(--gradient-main);
            border: none;
            border-radius: 12px;
            color: #ffffff;
            padding: 0 24px;
            height: 40px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition);
            cursor: pointer;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
                filter: brightness(1.05);
            }
        }
    }
}

.sort-wrapper {
    background: transparent;
    padding: 0;
    margin-bottom: 30px;
    display: flex;
    gap: 12px;
    
    .item {
        background: #FFF0EC;
        border: none;
        color: var(--color-pink);
        font-size: 14px;
        font-weight: 600;
        transition: var(--transition);
        padding: 8px 20px;
        height: auto;
        border-radius: 8px;
        margin: 0;
        
        &:hover {
            background: var(--gradient-main);
            color: #ffffff;
            
            .icon {
                color: #ffffff !important;
            }
            span {
                background: none !important;
                -webkit-text-fill-color: #ffffff !important;
            }
        }
        
        &.active {
            background: var(--gradient-main);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
            
            .icon {
                color: #ffffff !important;
            }
            span {
                background: none !important;
                -webkit-text-fill-color: #ffffff !important;
            }
        }
        
        .icon {
            margin-right: 6px;
            color: var(--color-pink);
        }
    }
}

.data_view {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 30px !important;
    margin: 0 0 50px !important;
    width: 100% !important;
    
    .item {
        background: #FFFFFF !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 16px !important;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(255, 107, 157, 0.08);
        cursor: pointer;
        position: relative;
        width: 100% !important;
        margin: 0 !important;
        display: flex;
        flex-direction: column;
        
        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(255, 107, 157, 0.15);
            border-color: var(--color-pink) !important;
            
            .img_box img {
                transform: scale(1.10);
            }
        }
        
        .img_box {
            width: 100% !important;
            height: 200px;
            overflow: hidden;
            display: block;
            
            img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover;
                display: block;
                transition: transform 0.4s ease;
            }
        }
        
        .content {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            
            .tag-row {
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
                }
            }
            
            .data_price {
                margin: 4px 0;
                color: var(--color-pink);
                font-family: 'Nunito', sans-serif;
                
                .unit {
                    font-size: 14px;
                    font-weight: 700;
                }
                
                .price-num {
                    background: var(--gradient-main);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 24px;
                    font-weight: 800;
                    display: inline-block;
                }
            }
            
            .count-row {
                display: flex;
                gap: 12px;
                margin-top: 4px;
                
                .data_like, .data_collect {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--text-light);
                    font-size: 12px;
                    transition: var(--transition);
                    
                    &:hover {
                        color: var(--color-pink);
                    }
                }
            }
        }
    }
}

::v-deep .el-pagination {
    justify-content: center;
    .el-pager li {
        background: #FFFFFF !important;
        color: var(--text-medium) !important;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        margin: 0 4px;
        font-weight: 600;
        &:hover {
            color: var(--color-pink) !important;
            border-color: var(--color-pink);
        }
        &.is-active {
            background: var(--gradient-main) !important;
            color: #ffffff !important;
            border: none;
            box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
        }
    }
    .btn-prev, .btn-next {
        background: #FFFFFF !important;
        color: var(--text-medium) !important;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 0 12px;
        &:hover {
            color: var(--color-pink) !important;
            border-color: var(--color-pink);
        }
        &:disabled {
            opacity: 0.4;
        }
    }
}

.text-one-row {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>