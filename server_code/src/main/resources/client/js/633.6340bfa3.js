"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[633],{

/***/ 633:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ register; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(3751);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(6166);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/yonghu/register.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "register-container"
};
const _hoisted_2 = {
  class: "register-right"
};
const _hoisted_3 = {
  class: "register-card"
};
const _hoisted_4 = {
  class: "register-title"
};
const _hoisted_5 = {
  class: "register_form"
};
const _hoisted_6 = {
  class: "form-group"
};
const _hoisted_7 = {
  class: "form-group"
};
const _hoisted_8 = {
  class: "form-group"
};
const _hoisted_9 = {
  class: "form-group"
};
const _hoisted_10 = {
  class: "form-group"
};
const _hoisted_11 = {
  class: "gender-group"
};
const _hoisted_12 = {
  class: "form-group"
};
const _hoisted_13 = {
  class: "avatar-upload-area"
};
const _hoisted_14 = ["src"];
const _hoisted_15 = {
  key: 1,
  class: "plus-icon"
};
const _hoisted_16 = {
  class: "form-group"
};
const _hoisted_17 = {
  class: "form-group"
};
const _hoisted_18 = {
  class: "form-group"
};
const _hoisted_19 = {
  class: "btn_view"
};


/* harmony default export */ var registervue_type_script_setup_true_lang_js = ({
  __name: 'register',
  setup(__props) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const projectName = context.$project.projectName;
    //获取注册类型
    const route = (0,vue_router_esm_bundler/* useRoute */.lq)();
    const tableName = (0,reactivity_esm_bundler/* ref */.KR)('yonghu');

    //公共方法
    const getUUID = () => {
      return new Date().getTime();
    };
    const registerForm = (0,reactivity_esm_bundler/* ref */.KR)({
      xingbie: '男'
    });
    const yonghuxingbieLists = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const init = () => {
      yonghuxingbieLists.value = "男,女".split(',');
      registerForm.value.zhuceshijian = context?.$toolUtil.getCurDateTime();
    };
    const touxiangUploadSuccess = fileUrls => {
      registerForm.value.touxiang = fileUrls;
    };
    const touxiangUploadRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const triggerUpload = type => {
      if (type == 'touxiang') {
        (0,runtime_core_esm_bundler/* nextTick */.dY)(() => {
          const uploadEl = touxiangUploadRef.value?.$el.querySelector('input[type="file"]');
          if (uploadEl) {
            uploadEl.click();
          }
        });
      }
    };

    //注册按钮
    const handleRegister = () => {
      let url = tableName.value + "/register";
      if (!registerForm.value.yonghuzhanghao) {
        context?.$toolUtil.message(`用户账号不能为空`, 'error');
        return false;
      }
      if (!registerForm.value.mima) {
        context?.$toolUtil.message(`密码不能为空`, 'error');
        return false;
      }
      if (registerForm.value.mima != registerForm.value.mima2) {
        context?.$toolUtil.message('两次密码输入不一致', 'error');
        return false;
      }
      if (!registerForm.value.nicheng) {
        context?.$toolUtil.message(`昵称不能为空`, 'error');
        return false;
      }
      if (!registerForm.value.xingbie) {
        context?.$toolUtil.message(`性别不能为空`, 'error');
        return false;
      }
      if (registerForm.value.touxiang != null) {
        registerForm.value.touxiang = registerForm.value.touxiang.replace(new RegExp(context?.$config.url, "g"), "");
      }
      if (!registerForm.value.touxiang) {
        context?.$toolUtil.message(`头像不能为空`, 'error');
        return false;
      }
      if (!registerForm.value.youxiang) {
        context?.$toolUtil.message(`邮箱不能为空`, 'error');
        return false;
      }
      if (registerForm.value.youxiang && !context?.$toolUtil.isEmail(registerForm.value.youxiang)) {
        context?.$toolUtil.message(`邮箱应输入邮件格式`, 'error');
        return false;
      }
      if (!registerForm.value.shouji) {
        context?.$toolUtil.message(`手机不能为空`, 'error');
        return false;
      }
      if (registerForm.value.shouji && !context?.$toolUtil.isMobile(registerForm.value.shouji)) {
        context?.$toolUtil.message(`手机应输入手机格式`, 'error');
        return false;
      }
      if (!registerForm.value.shenfenzheng) {
        context?.$toolUtil.message(`身份证不能为空`, 'error');
        return false;
      }
      if (registerForm.value.shenfenzheng && !context?.$toolUtil.checkIdCard(registerForm.value.shenfenzheng)) {
        context?.$toolUtil.message(`身份证应输入身份证格式`, 'error');
        return false;
      }
      if (registerForm.value.maxPasswordWrong && !context?.$toolUtil.isIntNumer(registerForm.value.maxPasswordWrong)) {
        context?.$toolUtil.message(`最大密码输错次数应输入整数`, 'error');
        return false;
      }
      if (registerForm.value.isLocked && !context?.$toolUtil.isIntNumer(registerForm.value.isLocked)) {
        context?.$toolUtil.message(`用户锁定状态应输入整数`, 'error');
        return false;
      }
      if (registerForm.value.money && !context?.$toolUtil.isNumber(registerForm.value.money)) {
        context?.$toolUtil.message(`余额应输入数字`, 'error');
        return false;
      }
      context?.$http({
        url: url,
        method: 'post',
        data: registerForm.value
      }).then(res => {
        context?.$toolUtil.message('注册成功', 'success', obj => {
          context?.$router.push({
            path: "/login"
          });
        });
      });
    };
    //返回登录
    const close = () => {
      context?.$router.push({
        path: "/login"
      });
    };
    init();
    (0,runtime_core_esm_bundler/* onMounted */.sV)(() => {});
    return (_ctx, _cache) => {
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-input");
      const _component_uploads = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("uploads");
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [_cache[24] || (_cache[24] = (0,runtime_core_esm_bundler/* createStaticVNode */.Fv)("<div class=\"register-left\" data-v-d9868560><svg class=\"left-deco\" viewBox=\"0 0 400 500\" xmlns=\"http://www.w3.org/2000/svg\" data-v-d9868560><circle cx=\"200\" cy=\"250\" r=\"130\" fill=\"rgba(255,255,255,0.15)\" data-v-d9868560></circle><circle cx=\"200\" cy=\"250\" r=\"100\" fill=\"none\" stroke=\"rgba(255,255,255,0.25)\" stroke-width=\"2\" data-v-d9868560></circle><circle cx=\"80\" cy=\"80\" r=\"18\" fill=\"rgba(255,255,255,0.20)\" data-v-d9868560></circle><circle cx=\"320\" cy=\"100\" r=\"12\" fill=\"rgba(255,255,255,0.15)\" data-v-d9868560></circle><circle cx=\"60\" cy=\"380\" r=\"22\" fill=\"rgba(255,255,255,0.18)\" data-v-d9868560></circle><circle cx=\"350\" cy=\"400\" r=\"14\" fill=\"rgba(255,255,255,0.12)\" data-v-d9868560></circle><circle cx=\"180\" cy=\"60\" r=\"8\" fill=\"rgba(255,255,255,0.25)\" data-v-d9868560></circle><circle cx=\"300\" cy=\"320\" r=\"10\" fill=\"rgba(255,255,255,0.20)\" data-v-d9868560></circle><text x=\"200\" y=\"235\" text-anchor=\"middle\" font-size=\"64\" fill=\"rgba(255,255,255,0.55)\" data-v-d9868560>✦</text><text x=\"200\" y=\"285\" text-anchor=\"middle\" font-size=\"16\" fill=\"rgba(255,255,255,0.70)\" font-family=\"Arial\" data-v-d9868560>动漫周边商店</text><text x=\"200\" y=\"308\" text-anchor=\"middle\" font-size=\"12\" fill=\"rgba(255,255,255,0.50)\" font-family=\"Arial\" data-v-d9868560>ANIME STORE</text><circle cx=\"140\" cy=\"160\" r=\"5\" fill=\"rgba(255,255,255,0.30)\" data-v-d9868560></circle><circle cx=\"260\" cy=\"180\" r=\"4\" fill=\"rgba(255,255,255,0.25)\" data-v-d9868560></circle><circle cx=\"150\" cy=\"340\" r=\"6\" fill=\"rgba(255,255,255,0.20)\" data-v-d9868560></circle><circle cx=\"270\" cy=\"360\" r=\"3\" fill=\"rgba(255,255,255,0.30)\" data-v-d9868560></circle></svg></div>", 1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, (0,shared_esm_bundler/* toDisplayString */.v_)((0,reactivity_esm_bundler/* unref */.R1)(projectName)) + "注册", 1), _cache[23] || (_cache[23] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "register-title-line"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_6, [_cache[10] || (_cache[10] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "用户账号：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.yonghuzhanghao,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => registerForm.value.yonghuzhanghao = $event),
        placeholder: "请输入用户账号",
        type: "text"
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_7, [_cache[11] || (_cache[11] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "密码：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.mima,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => registerForm.value.mima = $event),
        placeholder: "请输入密码",
        type: "password",
        "show-password": ""
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_8, [_cache[12] || (_cache[12] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "确认密码：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.mima2,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => registerForm.value.mima2 = $event),
        type: "password",
        placeholder: "请输入确认密码",
        "show-password": ""
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_9, [_cache[13] || (_cache[13] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "昵称：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.nicheng,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => registerForm.value.nicheng = $event),
        placeholder: "请输入昵称",
        type: "text"
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_10, [_cache[16] || (_cache[16] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "性别：", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_11, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
        type: "radio",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => registerForm.value.xingbie = $event),
        value: "男"
      }, null, 512), [[runtime_dom_esm_bundler/* vModelRadio */.XL, registerForm.value.xingbie]]), _cache[14] || (_cache[14] = (0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 男"))]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
        type: "radio",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => registerForm.value.xingbie = $event),
        value: "女"
      }, null, 512), [[runtime_dom_esm_bundler/* vModelRadio */.XL, registerForm.value.xingbie]]), _cache[15] || (_cache[15] = (0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 女"))])])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_12, [_cache[18] || (_cache[18] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "头像：", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_13, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "avatar-upload-box",
        onClick: _cache[6] || (_cache[6] = $event => triggerUpload('touxiang'))
      }, [registerForm.value.touxiang ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("img", {
        key: 0,
        src: (0,reactivity_esm_bundler/* unref */.R1)(context).$config.url + registerForm.value.touxiang,
        class: "avatar-preview"
      }, null, 8, _hoisted_14)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_15, "+"))]), _cache[17] || (_cache[17] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
        class: "avatar-upload-hint"
      }, [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("点击上传头像"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("br"), (0,runtime_core_esm_bundler/* createTextVNode */.eW)("支持 JPG/PNG")], -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_uploads, {
        ref_key: "touxiangUploadRef",
        ref: touxiangUploadRef,
        style: {
          "display": "none"
        },
        action: "file/upload",
        tip: "请上传头像",
        fileUrls: registerForm.value.touxiang ? registerForm.value.touxiang : '',
        onChange: touxiangUploadSuccess
      }, null, 8, ["fileUrls"])])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_16, [_cache[19] || (_cache[19] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "邮箱：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.youxiang,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => registerForm.value.youxiang = $event),
        placeholder: "请输入邮箱",
        type: "text"
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_17, [_cache[20] || (_cache[20] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "手机：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.shouji,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => registerForm.value.shouji = $event),
        placeholder: "请输入手机",
        type: "text"
      }, null, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_18, [_cache[21] || (_cache[21] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", null, "身份证：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
        modelValue: registerForm.value.shenfenzheng,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => registerForm.value.shenfenzheng = $event),
        placeholder: "请输入身份证",
        type: "text"
      }, null, 8, ["modelValue"])])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_19, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
        class: "btn-register",
        onClick: handleRegister
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[22] || (_cache[22] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("注册")])),
        _: 1,
        __: [22]
      }), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "login-link",
        onClick: close
      }, "已有账号，直接登录")])])])]);
    };
  }
});
;// ./src/views/pages/yonghu/register.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/yonghu/register.vue?vue&type=style&index=0&id=d9868560&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// ./src/views/pages/yonghu/register.vue?vue&type=style&index=0&id=d9868560&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6262);
;// ./src/views/pages/yonghu/register.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)(registervue_type_script_setup_true_lang_js, [['__scopeId',"data-v-d9868560"]])

/* harmony default export */ var register = (__exports__);

/***/ })

}]);
//# sourceMappingURL=633.6340bfa3.js.map