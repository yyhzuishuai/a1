<template>
	<div class="menu_wrapper" :class="{'menu_wrapper_collapse':collapse}">
		<el-scrollbar wrap-class="scrollbar-wrapper" class="menu_scrollbar">
			<el-menu :default-openeds="[]" :unique-opened="true" :default-active="menuIndex" class="menu_view"
				:collapse="collapse">
				<el-menu-item class="first-item home-item" index="/" @click="menuHandler('')">
					<i class="iconfont icon-zhuye2" v-if="collapse?false:true"></i>
					<template #title>
						<span class="menu-text">首页</span>
                        <i class="decoration-dot" v-if="!collapse"></i>
					</template>
				</el-menu-item>
                <template v-for=" (item,index) in menuList.backMenu">
                    <el-sub-menu v-if="item.child.length>1"  class="first-item" :index="item.menu">
                        <template #title>
                            <i class="iconfont" :class="item.fontClass" v-if="collapse?false:true"></i>
                            <span class="menu-text">{{ item.menu }}</span>
                        </template>
                        <el-menu-item class="second-item" v-for=" (child,sort) in item.child" :key="sort"
                            :index="getPath(child.classname||child.tableName,child.menuJump)"
                            @click="menuHandler(child.classname||child.tableName,child.menuJump)">
                            <span class="menu-text">{{ child.menu }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else class="first-item"
                                  :index="getPath(item.child[0].classname||item.child[0].tableName,item.child[0].menuJump)"
                                  @click="menuHandler(item.child[0].classname||item.child[0].tableName,item.child[0].menuJump)">
                        <i class="iconfont" :class="item.fontClass" v-if="collapse?false:true"></i>
                        <template #title>
                            <span class="menu-text">{{ item.child[0].menu }}</span>
                        </template>
                    </el-menu-item>
                </template>
			</el-menu>
		</el-scrollbar>
        <!-- 侧边栏底部用户信息卡片 -->
        <div class="menu-user-card" v-if="!collapse">
            <div class="user-info">
                <img class="user-avatar" :src="store.getters['user/avatar'] || require('@/assets/img/avatar.png')">
                <div class="user-details">
                    <div class="user-name">{{adminName}}</div>
                    <div class="user-role">{{role}}</div>
                </div>
            </div>
        </div>
	</div>
</template>

<script setup>
	import menu from '@/utils/menu'
	import {
		ref,
		toRefs,
		getCurrentInstance,
		nextTick,
        watch,
        computed
	} from 'vue';
	import { useStore } from 'vuex'
	const store = useStore()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
    const adminName = context.$toolUtil.storageGet('adminName')
	//props
	const props = defineProps({
		collapse: Boolean
	})
	const {
		collapse
	} = toRefs(props)
	//data
	const menuList = ref([])
	const role = ref('')
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	const init = () => {
		const menus = menu.list()
		if (menus) {
			menuList.value = menus
		}
		role.value = context?.$toolUtil.storageGet('role')

		for (let i = 0; i < menuList.value.length; i++) {
			if (menuList.value[i].roleName == role.value) {
				menuList.value = menuList.value[i];
				break;
			}
		}
	}
    // 默认菜单index
    const menuIndex = ref('')
    watch(() => context.$router.currentRoute.value,(value, oldValue) => {
        menuIndex.value = decodeURIComponent(value.fullPath)
    },{
        immediate:true
    })
	const getPath = (name,menuJump) => {
        if(name == 'center'){
            return `/${role.value}Center`
        }else if(name == 'storeup'){
            return `/storeup?type=${menuJump}`
        }else if(name == 'exampaper' && menuJump == '12'){
            return '/exampaperlist'
        }else if(name == 'examrecord' && menuJump == '22'){
            return '/examfailrecord'
        }else{
            return `/${name}${menuJump?'?menuJump='+menuJump:''}`
        }
	}
    const menuHandler = (name,menuJump) => {
        let url = getPath(name,menuJump)
        context.$router.push(url)
    }
	init()
</script>

<style lang="scss">
/* 侧边栏容器 */
.menu_wrapper {
    width: 210px;
    position: fixed;
    top: 139px;
    left: 0;
    height: calc(100vh - 138px);
    padding: 0;
    z-index: 999;
    --el-menu-item-height: 50px;
    --el-menu-sub-item-height: 46px;
    background-color: #FFFAF7 !important; /* 极浅暖米色 */
    border-right: none !important;
    box-shadow: 2px 0 12px rgba(255,107,53,0.08) !important;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

.menu_wrapper.menu_wrapper_collapse {
    width: 64px;
}

.menu_wrapper .menu_scrollbar {
    flex: 1;
}

.menu_wrapper .menu_view {
    background-color: transparent !important;
    border-right: none;
    padding: 10px 0;
}

/* 菜单文字 */
.menu_wrapper .menu-text {
    font-size: 14px;
    margin-left: 12px;
    font-weight: 500;
}

/* 首页项特殊装饰 */
.menu_wrapper .home-item .menu-text {
    font-weight: 700;
}
.menu_wrapper .decoration-dot {
    width: 6px;
    height: 6px;
    background: #FF6B35;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 10px;
    box-shadow: 0 0 8px rgba(255,107,53,0.4);
}

/* 一级菜单样式 */
.menu_wrapper .el-menu-item,
.menu_wrapper .el-sub-menu__title {
    color: #3D2B1F !important;
    height: var(--el-menu-item-height) !important;
    line-height: var(--el-menu-item-height) !important;
    margin: 4px 0;
    transition: all 0.3s ease !important;
    border-left: 3px solid transparent !important;
    position: relative;
    overflow: hidden;
}

/* 菜单 Hover 动画 (从右向左展开浅橙背景) */
.menu_wrapper .el-menu-item:hover,
.menu_wrapper .el-sub-menu__title:hover {
    color: #FF6B35 !important;
    background: linear-gradient(to left, #FFF3EE 0%, transparent 100%) !important;
}

/* 激活项样式 */
.menu_wrapper .el-menu-item.is-active,
.menu_wrapper .el-sub-menu.is-active > .el-sub-menu__title {
    color: #FF6B35 !important;
    background-color: #FFF3EE !important;
    border-left: 3px solid #FF6B35 !important;
    border-radius: 0 25px 25px 0; /* 右侧圆角 */
    font-weight: 700;
}

/* 二级菜单容器 */
.menu_wrapper .el-menu--inline {
    background: transparent !important;
    position: relative;
}

/* 二级菜单层级连接线 */
.menu_wrapper .el-menu--inline::before {
    content: "";
    position: absolute;
    left: 28px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #FFD6C0;
    z-index: 1;
}

/* 二级菜单项 */
.menu_wrapper .second-item {
    padding-left: 48px !important;
    height: var(--el-menu-sub-item-height) !important;
    line-height: var(--el-menu-sub-item-height) !important;
    font-size: 13px !important;
    color: #666 !important;
}

.menu_wrapper .second-item::before {
    content: "";
    position: absolute;
    left: 28px;
    top: 50%;
    width: 12px;
    height: 1px;
    background: #FFD6C0;
}

/* 箭头旋转动画 */
.menu_wrapper .el-sub-menu .el-sub-menu__icon-arrow {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    font-weight: 700 !important;
}

/* 图标颜色 */
.menu_wrapper .iconfont {
    color: inherit !important;
    font-size: 18px !important;
    width: 20px;
    text-align: center;
}

/* 用户信息卡片 */
.menu_wrapper .menu-user-card {
    padding: 15px;
    border-top: 1px solid #FFD6C0;
    background: #FFFAF7;
}

.menu_wrapper .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(255,107,53,0.05);
    border: 1px solid #FFF3EE;
}

.menu_wrapper .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #FFF3EE;
    object-fit: cover;
}

.menu_wrapper .user-details {
    flex: 1;
    min-width: 0;
}

.menu_wrapper .user-name {
    font-size: 13px;
    font-weight: 700;
    color: #3D2B1F;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.menu_wrapper .user-role {
    font-size: 11px;
    color: #FF8C42;
    margin-top: 2px;
}
</style>