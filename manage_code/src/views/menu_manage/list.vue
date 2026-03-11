<template>
    <div class="menu-manage-container">
        <div class="center_view" v-if="btnAuth('menu','菜单管理')||btnAuth('menu','修改')">
            <!-- 固定在右上角的保存按钮 -->
            <div class="save-toolbar">
                <el-button type="primary" class="save-btn" @click="save" :loading="saving" icon="Check">
                    {{ saving ? '正在保存...' : '保存修改' }}
                </el-button>
            </div>

            <!-- 胶囊形角色切换Tab -->
            <el-tabs class="role-tabs" v-model="role_index" @tab-change="tabClick">
                <template v-for="(role,r_index) in menus" :key="role.roleName">
                    <el-tab-pane :label="role.roleName" :name="r_index">
                        <div class="permission-content" v-if="r_index==role_index">
                            <el-collapse v-model="collapse_default" class="custom-collapse">
                                <el-collapse-item v-for="(table,t_index) in role.backMenu" :name="table.menu" class="group-card">
                                    <template #title>
                                        <div class="group-header">
                                            <div class="group-title-view">
                                                <el-icon class="group-icon"><FolderOpened /></el-icon>
                                                <span class="group-title">{{table.menu}}</span>
                                            </div>
                                            <div class="group-actions">
                                                <el-button size="small" class="outline-btn" @click.stop="moveUp(role.backMenu,t_index)" icon="Top">
                                                    上移
                                                </el-button>
                                                <el-button size="small" class="outline-btn" @click.stop="changeName(table,role.backMenu)" icon="Edit">
                                                    修改菜单名
                                                </el-button>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="table-wrapper">
                                        <el-table
                                            :data="table.child"
                                            :show-header="false"
                                            class="permission-table">
                                            <el-table-column prop="menu" label="菜单名" width="180">
                                                <template #default="scope">
                                                    <span class="sub-menu-name">{{scope.row.menu}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="权限">
                                                <template #default="scope">
                                                    <el-checkbox-group v-model="scope.row.buttons" class="custom-checkbox-group">
                                                        <el-checkbox v-for="item in scope.row.allButtons" :label="item" :value="item" />
                                                    </el-checkbox-group>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作" width="280">
                                                <template #default="scope">
                                                    <div class="row-actions">
                                                        <el-button size="small" class="outline-btn" @click="moveUp(table.child,scope.$index)" icon="Top">
                                                            上移
                                                        </el-button>
                                                        <el-button size="small" class="outline-btn" @click="changeName(scope.row,table.child)" icon="Edit">
                                                            修改
                                                        </el-button>
                                                        <el-button size="small" class="outline-btn secondary" @click="toMove(t_index,scope.$index)" icon="Rank">
                                                            调级
                                                        </el-button>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
        
        <el-dialog title="修改父级菜单" v-model="dialogVisible" width="400px" custom-class="custom-dialog">
            <div class="dialog-body">
                <span class="label">目标父级：</span>
                <el-select v-model="n_first_index" placeholder="请选择父级菜单" style="width: 220px">
                    <el-option v-for="(item,index) in menus[role_index].backMenu" :key="item.menu" :label="item.menu" :value="index" />
                </el-select>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="moveTo" class="confirm-btn">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {getCurrentInstance,ref} from "vue";

const context = getCurrentInstance()?.appContext.config.globalProperties;

//权限验证
const btnAuth = (e,a)=>{
    return context?.$toolUtil.isAuth(e,a)
}

const menus = ref([])
const role_index = ref(0)   //当前选中的角色index
const first_index = ref(0) //当前选中的一级菜单index
const collapse_default = ref([])    //展开的collapse
const saving = ref(false)

const getMenus = ()=>{
    context.$http.get('menu/lists').then(res=>{
        menus.value = JSON.parse(res.data.data[0].menujson)
        collapse_default.value = menus.value[role_index.value].backMenu.map(item=>item.menu)
    })
}
getMenus()

const tabClick = ()=>{
    collapse_default.value = menus.value[role_index.value].backMenu.map(item=>item.menu)
}

const save = ()=>{
    saving.value = true
    context.$http.post('menu/update',{
        id:1,
        menujson:JSON.stringify(menus.value)
    }).then(res=>{
        if(res.data.code==0){
            ElMessage({
                message: '保存成功，重新登录后生效',
                type: 'success',
                duration: 2000,
                customClass: 'save-success-message'
            })
        }
        saving.value = false
    }).catch(() => {
        saving.value = false
    })
}

const dialogVisible = ref(false)
const n_first_index = ref(null)     //选中的父级菜单
const o_index = ref(0)      //需要移动的二级菜单的index
const toMove = (t_index,index)=>{
    first_index.value = t_index
    n_first_index.value = t_index
    o_index.value = index
    dialogVisible.value = true
}
const moveTo = ()=>{
    let items = menus.value[role_index.value].backMenu[first_index.value].child.splice(o_index.value,1)
    menus.value[role_index.value].backMenu[n_first_index.value].child.push(...items)
    dialogVisible.value = false
}
const changeName = (row,arr)=>{
    ElMessageBox.prompt('请输入新菜单名','修改菜单名',{
        inputValidator:(value)=>{
            if(!value || !value.trim())return '请输入菜单名'
            if(arr.find(item=>item.menu==value.trim())){
                return '该菜单名已存在'
            }
        },
    }).then(({value})=>{
        row.menu = value.trim()
    }).catch(()=>{})
}
const moveUp = (arr,index)=>{
    if(index==0)return
    arr.splice(index-1,0, ...arr.splice(index,1))
    arr = JSON.parse(JSON.stringify(arr))
}

</script>

<style scoped lang="scss">
.menu-manage-container {
    padding: 20px;
    position: relative;
}

/* 保存按钮工具栏 */
.save-toolbar {
    position: sticky;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding: 10px 0;
    background: transparent;
}

.save-btn {
    min-width: 120px;
    height: 44px;
    background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
    border: none;
    border-radius: 22px;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        filter: brightness(1.05);
    }
    &:active {
        transform: translateY(0);
    }
}

/* 角色 Tab 胶囊样式 */
.role-tabs {
    :deep(.el-tabs__header) {
        background: transparent !important;
        border: none !important;
        margin-bottom: 30px;
    }
    :deep(.el-tabs__nav-wrap::after) {
        display: none;
    }
    :deep(.el-tabs__nav) {
        border: none !important;
        gap: 12px;
    }
    :deep(.el-tabs__item) {
        height: 40px;
        line-height: 40px;
        padding: 0 30px !important;
        border-radius: 20px !important;
        border: 1.5px solid #FF6B35 !important;
        color: #FF6B35 !important;
        background: #fff !important;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &.is-active {
            background: #FF6B35 !important;
            color: #fff !important;
            box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
        }
        &:hover:not(.is-active) {
            background: #FFF3EE !important;
        }
    }
    :deep(.el-tabs__content) {
        padding: 0 !important;
    }
}

/* 权限分组卡片 */
.custom-collapse {
    border: none !important;
    
    .group-card {
        background: #fff;
        border-radius: 12px;
        margin-bottom: 16px;
        overflow: hidden;
        border: 1px solid #F0ECE8;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        
        :deep(.el-collapse-item__header) {
            height: 60px;
            padding: 0 20px;
            border-bottom: 1px solid #F0ECE8;
            background: #fff;
            &:hover {
                background: #FFFAF7;
            }
        }
        :deep(.el-collapse-item__wrap) {
            border: none;
        }
        :deep(.el-collapse-item__content) {
            padding: 0;
        }
    }
}

.group-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
}

.group-title-view {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .group-icon {
        color: #FF6B35;
        font-size: 20px;
    }
    .group-title {
        font-weight: 700;
        font-size: 16px;
        color: #3D2B1F;
    }
}

/* 描边操作按钮 */
.outline-btn {
    background: #fff !important;
    color: #FF6B35 !important;
    border: 1px solid #FF6B35 !important;
    border-radius: 15px !important;
    padding: 0 12px !important;
    height: 28px !important;
    transition: all 0.2s ease;
    
    &:hover {
        background: #FF6B35 !important;
        color: #fff !important;
        transform: translateY(-1px);
    }
    
    &.secondary {
        color: #A0887A !important;
        border-color: #A0887A !important;
        &:hover {
            background: #A0887A !important;
            color: #fff !important;
        }
    }
}

/* 权限表格美化 */
.table-wrapper {
    padding: 10px 20px 20px;
    background: #FFFAF7;
}

.permission-table {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #F0ECE8;
    
    :deep(.el-table__row) {
        background: #fff !important;
    }
}

.sub-menu-name {
    font-weight: 500;
    color: #666;
}

/* 自定义复选框样式 */
.custom-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    
    :deep(.el-checkbox) {
        margin-right: 0;
        
        .el-checkbox__inner {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            border-color: #DCDFE6;
            transition: all 0.2s ease;
        }
        
        &.is-checked {
            .el-checkbox__inner {
                background-color: #FF6B35 !important;
                border-color: #FF6B35 !important;
            }
            .el-checkbox__label {
                color: #FF6B35 !important;
                font-weight: 600;
            }
        }
        
        &:hover .el-checkbox__inner {
            border-color: #FF6B35;
        }
    }
}

.row-actions {
    display: flex;
    gap: 8px;
}

/* 弹窗样式 */
.dialog-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    
    .label {
        font-weight: 500;
        color: #666;
    }
}

.confirm-btn {
    background: #FF6B35 !important;
    border-color: #FF6B35 !important;
    border-radius: 18px !important;
    padding: 0 25px !important;
}
</style>