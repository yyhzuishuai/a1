<template>
	<div class="register-container">
		<div class="register-left">
			<svg class="left-deco" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
				<!-- 大装饰圆 -->
				<circle cx="200" cy="250" r="130" fill="rgba(255,255,255,0.15)" />
				<!-- 中圆环 -->
				<circle cx="200" cy="250" r="100" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
				<!-- 星形/花瓣装饰 -->
				<circle cx="80" cy="80" r="18" fill="rgba(255,255,255,0.20)" />
				<circle cx="320" cy="100" r="12" fill="rgba(255,255,255,0.15)" />
				<circle cx="60" cy="380" r="22" fill="rgba(255,255,255,0.18)" />
				<circle cx="350" cy="400" r="14" fill="rgba(255,255,255,0.12)" />
				<circle cx="180" cy="60" r="8" fill="rgba(255,255,255,0.25)" />
				<circle cx="300" cy="320" r="10" fill="rgba(255,255,255,0.20)" />
				<!-- 中心文字图标 -->
				<text x="200" y="235" text-anchor="middle" font-size="64" fill="rgba(255,255,255,0.55)">✦</text>
				<text x="200" y="285" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.70)"
					font-family="Arial">动漫周边商店</text>
				<text x="200" y="308" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.50)"
					font-family="Arial">ANIME STORE</text>
				<!-- 小飘落圆点 -->
				<circle cx="140" cy="160" r="5" fill="rgba(255,255,255,0.30)" />
				<circle cx="260" cy="180" r="4" fill="rgba(255,255,255,0.25)" />
				<circle cx="150" cy="340" r="6" fill="rgba(255,255,255,0.20)" />
				<circle cx="270" cy="360" r="3" fill="rgba(255,255,255,0.30)" />
			</svg>
		</div>
		<div class="register-right">
			<div class="register-card">
				<div class="register-title">{{projectName}}注册</div>
				<div class="register-title-line"></div>
				<div class="register_form merchant-form">
					<div class="form-group el-form-item">
						<label class="form-label">商家账号：</label>
						<el-input v-model="registerForm.shangjiazhanghao" placeholder="请输入商家账号" type="text" />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">商家密码：</label>
						<el-input v-model="registerForm.shangjiamima" placeholder="请输入商家密码" type="password"
							show-password />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">确认商家密码：</label>
						<el-input v-model="registerForm.shangjiamima2" type="password" placeholder="请输入确认商家密码"
							show-password />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">商家名称：</label>
						<el-input v-model="registerForm.shangjiamingcheng" placeholder="请输入商家名称" type="text" />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">头像：</label>
						<div class="avatar-upload-area">
							<div class="avatar-upload-box" @click="triggerUpload('touxiang')">
								<img v-if="registerForm.touxiang" :src="context.$config.url + registerForm.touxiang"
									class="avatar-preview" />
								<span v-else class="plus-icon">+</span>
							</div>
							<span class="avatar-upload-hint">点击上传头像<br />支持 JPG/PNG</span>
							<uploads ref="touxiangUploadRef" style="display: none;" action="file/upload" tip="请上传头像"
								:fileUrls="registerForm.touxiang?registerForm.touxiang:''" @change="touxiangUploadSuccess">
							</uploads>
						</div>
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">邮箱：</label>
						<el-input v-model="registerForm.youxiang" placeholder="请输入邮箱" type="text" />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">联系方式：</label>
						<el-input v-model="registerForm.lianxifangshi" placeholder="请输入联系方式" type="text" />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">身份证：</label>
						<el-input v-model="registerForm.shenfenzheng" placeholder="请输入身份证" type="text" />
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">营业资质：</label>
						<div class="avatar-upload-area">
							<div class="avatar-upload-box" @click="triggerUpload('yingyezizhi')">
								<img v-if="registerForm.yingyezizhi"
									:src="context.$config.url + registerForm.yingyezizhi.split(',')[0]" class="avatar-preview" />
								<span v-else class="plus-icon">+</span>
							</div>
							<span class="avatar-upload-hint">点击上传营业资质<br />支持 JPG/PNG</span>
							<uploads ref="yingyezizhiUploadRef" style="display: none;" type="file" action="file/upload"
								tip="请上传营业资质" :limit="3" :fileUrls="registerForm.yingyezizhi?registerForm.yingyezizhi:''"
								@change="yingyezizhiUploadSuccess">
							</uploads>
						</div>
					</div>
					<div class="form-group el-form-item">
						<label class="form-label">地址：</label>
						<el-input v-model="registerForm.fulladdress" placeholder="请输入地址" type="text"
							@click.native="mapClick" />
					</div>
				</div>
				<div class="btn_view">
					<el-button class="btn-register" @click="handleRegister">注册</el-button>
					<div class="login-link" @click="close">已有账号，直接登录</div>
				</div>
			</div>
		</div>
		<locationForm ref="location" :position="registerForm" @mapData="getAddress"></locationForm>
	</div>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	//获取注册类型
	import { useRoute } from 'vue-router';
	const route = useRoute()
	const tableName = ref('shangjia')
	
	//公共方法
	const getUUID=()=> {
		return new Date().getTime();
	}
	const registerForm = ref({
	})
	const init=()=>{
		registerForm.value.zhuceshijian = context?.$toolUtil.getCurDateTime()
	}
    const touxiangUploadSuccess=(fileUrls)=> {
        registerForm.value.touxiang = fileUrls;
    }
    const yingyezizhiUploadSuccess=(fileUrls)=> {
        registerForm.value.yingyezizhi = fileUrls;
    }

	const touxiangUploadRef = ref(null)
	const yingyezizhiUploadRef = ref(null)
	const triggerUpload = (type) => {
		if (type == 'touxiang') {
			nextTick(() => {
				const uploadEl = touxiangUploadRef.value?.$el.querySelector('input[type="file"]')
				if (uploadEl) {
					uploadEl.click()
				}
			})
		} else if (type == 'yingyezizhi') {
			nextTick(() => {
				const uploadEl = yingyezizhiUploadRef.value?.$el.querySelector('input[type="file"]')
				if (uploadEl) {
					uploadEl.click()
				}
			})
		}
	}

    import locationForm from '@/components/common/location.vue'

    const location = ref(null)

    const mapClick = () => {
        location.value.mapShow()
    }

    const getAddress = (e) => {
        registerForm.value.longitude = e.lng
        registerForm.value.latitude = e.lat
        registerForm.value.fulladdress = e.fulladdress
    }
	//注册按钮
	const handleRegister = () => {
		let url = tableName.value +"/register";
		if((!registerForm.value.shangjiazhanghao)){
			context?.$toolUtil.message(`商家账号不能为空`,'error')
			return false
		}
		if((!registerForm.value.shangjiamima)){
			context?.$toolUtil.message(`商家密码不能为空`,'error')
			return false
		}
		if(registerForm.value.shangjiamima!=registerForm.value.shangjiamima2){
			context?.$toolUtil.message('两次密码输入不一致','error')
			return false
		}
		if((!registerForm.value.shangjiamingcheng)){
			context?.$toolUtil.message(`商家名称不能为空`,'error')
			return false
		}
		if(registerForm.value.touxiang!=null){
			registerForm.value.touxiang = registerForm.value.touxiang.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if((!registerForm.value.touxiang)){
			context?.$toolUtil.message(`头像不能为空`,'error')
			return false
		}
		if((!registerForm.value.youxiang)){
			context?.$toolUtil.message(`邮箱不能为空`,'error')
			return false
		}
		if(registerForm.value.youxiang&&(!context?.$toolUtil.isEmail(registerForm.value.youxiang))){
			context?.$toolUtil.message(`邮箱应输入邮件格式`,'error')
			return false
		}
		if((!registerForm.value.lianxifangshi)){
			context?.$toolUtil.message(`联系方式不能为空`,'error')
			return false
		}
		if(registerForm.value.lianxifangshi&&(!context?.$toolUtil.isMobile(registerForm.value.lianxifangshi))){
			context?.$toolUtil.message(`联系方式应输入手机格式`,'error')
			return false
		}
		if((!registerForm.value.shenfenzheng)){
			context?.$toolUtil.message(`身份证不能为空`,'error')
			return false
		}
		if(registerForm.value.shenfenzheng&&(!context?.$toolUtil.checkIdCard(registerForm.value.shenfenzheng))){
			context?.$toolUtil.message(`身份证应输入身份证格式`,'error')
			return false
		}
		if(registerForm.value.yingyezizhi!=null){
			registerForm.value.yingyezizhi = registerForm.value.yingyezizhi.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if(registerForm.value.maxPasswordWrong&&(!context?.$toolUtil.isIntNumer(registerForm.value.maxPasswordWrong))){
			context?.$toolUtil.message(`最大密码输错次数应输入整数`,'error')
			return false
		}
		if(registerForm.value.isLocked&&(!context?.$toolUtil.isIntNumer(registerForm.value.isLocked))){
			context?.$toolUtil.message(`用户锁定状态应输入整数`,'error')
			return false
		}
		if(registerForm.value.longitude&&(!context?.$toolUtil.isNumber(registerForm.value.longitude))){
			context?.$toolUtil.message(`经度应输入数字`,'error')
			return false
		}
		if(registerForm.value.latitude&&(!context?.$toolUtil.isNumber(registerForm.value.latitude))){
			context?.$toolUtil.message(`纬度应输入数字`,'error')
			return false
		}
		context?.$http({
			url:url,
			method:'post',
			data:registerForm.value
		}).then(res=>{
			context?.$toolUtil.message('注册成功','success', obj=>{
				context?.$router.push({
					path: "/login"
				});
			})
		})
	}
	//返回登录
	const close = () => {
		context?.$router.push({
			path: "/login"
		});
	}
	init()
	onMounted(()=>{

	})
</script>
<style lang="scss" scoped>
/* ===== A: 页面布局 ===== */
.register-container {
	display: flex;
	min-height: 100vh;
	background: #F0FAF5;
}

.register-left {
	width: 40%;
	background: linear-gradient(160deg, #C8EDD8 0%, #A8DFC0 40%, #7EC8A4 100%);
	border-radius: 0 32px 32px 0;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	/* 装饰大圆 */
	&::before {
		content: '';
		position: absolute;
		width: 320px;
		height: 320px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
		top: -80px;
		left: -80px;
	}

	/* 装饰小圆 */
	&::after {
		content: '';
		position: absolute;
		width: 180px;
		height: 180px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		bottom: -40px;
		right: -40px;
	}
}

.left-deco {
	width: 80%;
	max-width: 320px;
	position: relative;
	z-index: 1;
}

.register-right {
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px 20px;
	overflow-y: auto;
}

.register-card {
	background: #ffffff;
	border-radius: 20px;
	box-shadow: 0 8px 40px rgba(126, 200, 164, 0.18);
	padding: 36px 44px;
	width: 100%;
	max-width: 480px;
}

/* ===== B: 标题 ===== */
.register-title {
	font-size: 20px;
	font-weight: 600;
	color: #2d2d2d;
	text-align: center;
	margin-bottom: 8px;
	line-height: 1.4;
}

.register-title-line {
	width: 40px;
	height: 3px;
	background: linear-gradient(90deg, #7EC8A4, #B8E8CC);
	margin: 0 auto 28px;
	border-radius: 2px;
}

/* ===== B: 表单组 & 标签 ===== */
.form-group {
	margin-bottom: 16px;
	display: flex;
	align-items: center;

	label {
		display: block;
		font-size: 13px;
		color: #888888;
		margin-bottom: 0;
		font-weight: 400;
		width: 80px;
		flex-shrink: 0;
		text-align: left;
	}

	&.el-form-item {
		border: none;
		margin-bottom: 16px;
	}

	/* ===== B: 输入框 (Element Plus 深度选择器适配) ===== */
	:deep(.el-input) {
		flex: 1;
	}
	:deep(.el-input__wrapper) {
		width: 100%;
		height: 38px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background: #fafafa;
		padding: 0 12px;
		outline: none;
		transition: border-color 0.2s, box-shadow 0.2s;
		box-sizing: border-box;
		box-shadow: none !important;

		&.is-focus {
			border-color: #7EC8A4;
			background: #FAFFFC;
			box-shadow: 0 0 0 3px rgba(126, 200, 164, 0.18) !important;
		}
	}

	:deep(.el-input__inner) {
		color: #333333;
		font-size: 14px;

		&::placeholder {
			color: #c0c0c0;
			font-size: 13px;
		}
	}

	/* ===== C: 头像上传 (适配已有 uploads 组件) ===== */
	.avatar-upload-area {
		display: flex;
		align-items: center;
		gap: 14px;
		flex: 1;
	}

	.avatar-upload-box {
		width: 68px;
		height: 68px;
		border: 1.5px dashed #7EC8A4;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background: #F5FDF9;
		flex-shrink: 0;
		transition: all 0.2s;
		overflow: hidden;

		&:hover {
			border-color: #5BAE8A;
			background: #EDFAF3;
		}

		.plus-icon {
			font-size: 24px;
			color: #7EC8A4;
			line-height: 1;
		}

		.avatar-preview {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.avatar-upload-hint {
		font-size: 12px;
		color: #aaaaaa;
		line-height: 1.6;
	}
}

/* ===== C: 注册按钮 ===== */
.btn-register {
	width: 100%;
	height: 42px;
	background: linear-gradient(135deg, #5BAE8A, #7EC8A4);
	border: none;
	border-radius: 21px;
	color: #ffffff;
	font-size: 15px;
	font-weight: 600;
	cursor: pointer;
	margin-top: 8px;
	transition: transform 0.15s, box-shadow 0.15s;
	letter-spacing: 0.5px;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(91, 174, 138, 0.40);
	}

	&:active {
		transform: translateY(0);
	}
}

.login-link {
	color: #5BAE8A;
	font-size: 13px;
	text-align: center;
	margin-top: 12px;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		text-decoration: underline;
	}
}
</style>