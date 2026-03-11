<template>
	<div class="login_view">
		<div class="login_box">
			<div class="title_view">
				<h1 class="projectName">{{projectName}}</h1>
				<div class="title_line"></div>
			</div>
			<div class="login_form">
				<div class="form-item roles" v-if="userList.length>1">
					<div class="label">用户类型</div>
					<el-select v-model="loginForm.role" placeholder="请选择用户类型" class="form-control">
						<el-option v-for="(item,index) in userList" :key="index" :label="item.roleName" :value="item.roleName"></el-option>
					</el-select>
				</div>

				<div class="form-item userName" v-if="loginType==1">
					<div class="label">账号</div>
					<el-input class="item-input form-control" v-model="loginForm.username" placeholder="请输入账号" name="username" />
				</div>

				<div class="form-item password" v-if="loginType==1">
					<div class="label">密码</div>
					<el-input class="item-input form-control" v-model="loginForm.password" type="password" show-password placeholder="请输入密码" @keydown.enter.native="handleLogin" />
				</div>

				<div class="remember_view" v-if="loginType==1">
					<el-checkbox v-model="rememberPassword" label="记住密码" size="large" />
				</div>

				<div class="login-row">
					<el-button class="login_btn" v-if="loginType==1" @click="handleLogin">登 录</el-button>
				</div>

				<div class="register-row">
					<span class="register_link" @click="handleRegister('shangjia')">注册商家</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
		onUnmounted,
	} from "vue";
	import { useStore } from 'vuex'
	const store = useStore()
	const projectName = ref("基于springboot的动漫周边网络商店管理系统的设计与实现")
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	//是否记住密码
	const rememberPassword = ref(true)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//注册
    const handleRegister = (tableName) => {
    	context?.$router.push(`/${tableName}Register`)
    }
	const handleLogin = () => {
		if (!loginForm.value.username) {
			context?.$toolUtil.message('请输入用户名', 'error')
			
			return;
		}
		if (!loginForm.value.password) {
			context?.$toolUtil.message('请输入密码', 'error')
			return;
		}
		if (userList.value.length > 1) {
			if (!loginForm.value.role) {
				context?.$toolUtil.message('请选择角色', 'error')
				verifySlider.value.reset()
				return;
			}
			for (let i = 0; i < menus.value.length; i++) {
				if (menus.value[i].roleName == loginForm.value.role) {
					tableName.value = menus.value[i].pathName||menus.value[i].tableName;
				}
			}
		} else {
			tableName.value = userList.value[0].pathName||userList.value[0].tableName;
			loginForm.value.role = userList.value[0].roleName;
		}
		login()
	}
	const login = () => {
		context?.$http({
			url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
			method: 'post'
		}).then(res => {
			//是否保存当前账号密码至缓存
			if (rememberPassword.value) {
				let loginForm1 = JSON.parse(JSON.stringify(loginForm.value))
				delete loginForm1.code
				context?.$toolUtil.storageSet("loginForm", JSON.stringify(loginForm1));
			} else {
				context?.$toolUtil.storageRemove("loginForm")
			}
			context?.$toolUtil.storageSet("Token", res.data.token);
			context?.$toolUtil.storageSet("role", loginForm.value.role);
			context?.$toolUtil.storageSet("sessionTable", tableName.value);
			context?.$toolUtil.storageSet("adminName", loginForm.value.username);
            //vuex中获取用户信息并保存
			store.dispatch('user/getSession').then(res=>{
                context?.$router.push('/')
            })
		}, err => {
		})
	}
	//获取菜单
	const getMenu=()=> {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id',
      }

      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
          menus.value = JSON.parse(res.data.data.list[0].menujson)
          for (let i = 0; i < menus.value.length; i++) {
            if (menus.value[i].hasBackLogin=='是') {
              userList.value.push(menus.value[i])
            }
          }
			//获取缓存是否有保存的账号密码
			let form = context?.$toolUtil.storageGet('loginForm')
			if (form) {
				
			}else {
				loginForm.value.role = userList.value[0].roleName
			}
          context?.$toolUtil.storageSet("menus", JSON.stringify(menus.value));
      })
    }
	//初始化
	const init = () => {
		getMenu();
		//获取缓存是否有保存的账号密码
		let form = context?.$toolUtil.storageGet('loginForm')
		if (form) {
			loginForm.value = JSON.parse(form)
		}
	}
	onMounted(()=>{
		init()


	})
</script>

<style lang="scss">
	.login_view {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: url(../assets/img/beijing24.jpg) !important;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		font-family: "PingFang SC", "HarmonyOS Sans", "Microsoft YaHei", sans-serif;

		.login_box {
			width: 90%;
			max-width: 400px;
			padding: 40px;
			background: rgba(255, 255, 255, 0.8);
			backdrop-filter: blur(15px);
			border-radius: 20px;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(255, 165, 0, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.3);
			animation: fadeIn 0.8s ease-out;

			.title_view {
				text-align: center;
				.projectName {
					font-size: 20px;
					color: #ff6b35;
					font-weight: 700;
					margin-bottom: 8px;
					line-height: 1.4;
				}
				.title_line {
					border-bottom: 2px solid #ff9a44;
					width: 60px;
					margin: 0 auto 20px;
				}
			}

			.login_form {
				.form-item {
					margin-bottom: 20px;
					
					.label {
						font-size: 14px;
						color: #666;
						margin-bottom: 8px;
						font-weight: 500;
					}

					.form-control {
						width: 100%;
						background: rgba(255, 255, 255, 0.9);
						border: 2px solid transparent;
						border-radius: 10px;
						transition: all 0.25s ease;

						.el-input__wrapper, .el-select__wrapper {
							background: transparent !important;
							box-shadow: none !important;
							border: none !important;
							padding: 4px 12px;
							height: 44px;
						}

						&.is-focus, &:focus-within {
							border-color: #ff9a44;
							background: #ffffff;
						}

						.el-input__inner {
							font-size: 14px;
							&::placeholder {
								color: #aaa;
							}
						}
					}
				}

				/* 用户类型下拉框自定义样式 */
				.el-select.form-control {
					.el-select__wrapper {
						appearance: none;
						background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff9a44'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
						background-repeat: no-repeat;
						background-position: right 12px center;
						background-size: 20px;
						padding-right: 40px;
					}
					.el-icon {
						display: none !important;
					}
				}

				.remember_view {
					margin-bottom: 20px;
					.el-checkbox {
						accent-color: #ff6b35;
						.el-checkbox__label {
							color: #666;
							font-size: 14px;
						}
						&.is-checked .el-checkbox__inner {
							background-color: #ff6b35;
							border-color: #ff6b35;
						}
					}
				}

				.login-row {
					margin-bottom: 20px;
					.login_btn {
						width: 100%;
						height: 48px;
						background: linear-gradient(135deg, #ff9a44, #ff6b35);
						border: none;
						border-radius: 10px;
						color: white;
						font-size: 16px;
						font-weight: 600;
						letter-spacing: 6px;
						cursor: pointer;
						transition: all 0.25s ease;

						&:hover {
							transform: translateY(-2px);
							box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
							filter: brightness(1.05);
						}

						&:active {
							transform: translateY(0);
						}
					}
				}

				.register-row {
					text-align: center;
					.register_link {
						font-size: 13px;
						color: #999;
						cursor: pointer;
						transition: all 0.3s ease;

						&:hover {
							color: #ff6b35;
							text-decoration: underline;
						}
					}
				}
			}
		}
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* 适配移动端 */
	@media (max-width: 480px) {
		.login_view .login_box {
			width: 90%;
			padding: 30px 20px;
		}
	}
</style>
