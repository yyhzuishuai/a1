"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[465],{

/***/ 465:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ shop_order_confirm; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(3725);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.filter.js
var esnext_iterator_filter = __webpack_require__(5019);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.find.js
var esnext_iterator_find = __webpack_require__(2598);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.for-each.js
var esnext_iterator_for_each = __webpack_require__(9838);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
// EXTERNAL MODULE: ./src/views/pages/shop_address/formModel.vue + 2 modules
var formModel = __webpack_require__(5604);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(6166);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(6278);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/shop_order/confirm.vue?vue&type=script&setup=true&lang=js





const _hoisted_1 = {
  class: "confirm-page"
};
const _hoisted_2 = {
  class: "add_view"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = {
  key: 0,
  style: {
    "width": "100%",
    "padding": "12px",
    "box-sizing": "border-box",
    "display": "flex",
    "align-items": "center"
  }
};
const _hoisted_5 = {
  class: "order_confirm_btn"
};
const _hoisted_6 = {
  class: "order_confirm_price"
};
const _hoisted_7 = {
  class: "number"
};
const _hoisted_8 = {
  class: "coupon_list"
};
const _hoisted_9 = {
  key: 0
};
const _hoisted_10 = {
  class: "coupon_left"
};
const _hoisted_11 = {
  class: "name"
};
const _hoisted_12 = {
  class: "name"
};
const _hoisted_13 = {
  class: "date"
};
const _hoisted_14 = {
  class: "date"
};
const _hoisted_15 = {
  key: 0,
  class: "date1"
};
const _hoisted_16 = {
  key: 1,
  class: "date1"
};
const _hoisted_17 = {
  class: "coupon_right"
};
const _hoisted_18 = {
  class: "price"
};
const _hoisted_19 = {
  class: "num"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = {
  key: 1,
  class: "btn"
};
const _hoisted_22 = {
  key: 1,
  class: "noList"
};




const tableName = 'orders';
const formName = '订单提交';
//基础信息
// 返回

/* harmony default export */ var confirmvue_type_script_setup_true_lang_js = ({
  __name: 'confirm',
  setup(__props) {
    const moment = window.moment;
    const store = (0,vuex_esm_bundler/* useStore */.Pj)();
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const router = (0,vue_router_esm_bundler/* useRouter */.rd)();
    const route = (0,vue_router_esm_bundler/* useRoute */.lq)();
    //基础信息
    const backClick = () => {
      history.back();
    };
    const list = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const remark = (0,reactivity_esm_bundler/* ref */.KR)('');
    //付款类型
    const payType = (0,reactivity_esm_bundler/* ref */.KR)(1);
    //获取收货地址
    const addressIndex = (0,reactivity_esm_bundler/* ref */.KR)(-1);
    const addressList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const getAddressList = () => {
      context.$http.get('address/page?limit=99').then(res => {
        for (let x in res.data.data.list) {
          if (res.data.data.list[x].isdefault == '是') {
            addressIndex.value = Number(x);
          }
        }
        addressList.value = res.data.data.list;
      });
    };
    //新增收货地址
    const formModelRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const addressAdd = () => {
      formModelRef.value.init(null, '新增收货地址');
    };
    const formModelChange = () => {
      getAddressList();
    };
    //统计总价
    const totalPrice = (0,runtime_core_esm_bundler/* computed */.EW)(() => {
      let price = 0;
      list.value.forEach(item => {
        price += item.realPrice * item.buynumber;
      });
      if (coupon_selected.value.id) {
        price -= coupon_selected.value.discountAmount;
      }
      return Number(price).toFixed(2);
    });
    //获取订单id
    const createOrder = () => {
      return moment().format('YYYYMMDDHHmmssSSS') + Math.random().toString().slice(2, 5);
    };
    //正常支付
    const payClick = async () => {
      //是否选择收货地址
      if (addressIndex.value == -1) {
        context.$toolUtil.message('请选择收货地址', 'error');
        return false;
      }
      let orderNo = createOrder() + 1;
      let orders = [];
      for (let i in list.value) {
        let item = list.value[i];
        let res = await context.$http.get(`${item.tablename}/info/${item.goodid}`);
        let data = res.data.data;
        let orderid = createOrder();
        orders.push({
          orderid: orderid,
          tablename: item.tablename,
          userid: user.value.id,
          role: context.$toolUtil.storageGet('frontSessionTable'),
          goodid: item.goodid,
          goodname: item.goodname,
          shangjiazhanghao: item.shangjiazhanghao,
          picture: item.picture,
          buynumber: item.buynumber,
          discountprice: item.realPrice,
          discounttotal: Number(item.realPay.toFixed(2)),
          price: item.realPrice,
          total: Number(item.realPay.toFixed(2)),
          type: payType.value,
          //收货地址
          address: addressList.value[addressIndex.value].address,
          tel: addressList.value[addressIndex.value].phone,
          consignee: addressList.value[addressIndex.value].name,
          fulladdress: addressList.value[addressIndex.value].address,
          longitude: addressList.value[addressIndex.value].longitude,
          latitude: addressList.value[addressIndex.value].latitude,
          remark: remark.value,
          status: '未支付',
          orderNo: orderNo,
          goods: data
        });
      }
      if (coupon_selected.value.id) {
        orders.forEach(order => {
          order.couponNumber = coupon_selected.value.couponNumber;
          order.discountamount = coupon_selected.value.discountamount;
        });
        coupon_selected.value.status = '已使用';
        context.$http.post(`mycoupon/update`, coupon_selected.value);
      }
      //新增订单
      Promise.all(orders.map(order => {
        //批量下单，返回primise数组，等待所有请求都完成
        return context.$http.post('orders/add', order);
      })).then(resArr => {
        //如果存在id。说明从购物车跳转,需要删除已下单的商品
        list.value.forEach(item => {
          if (item.id) {
            context.$http({
              url: 'cart/delete',
              method: 'post',
              data: [item.id]
            });
          }
        });
        let total = 0;
        orders.forEach(order => {
          total += Number(order.total);
        });
        //判断用户余额是否充足
        if (Number(user.value.money) < Number(total.toFixed(2))) {
          context.$toolUtil.message(`余额不足，请先充值`, 'error', () => {
            router.push(`/index/${context.$toolUtil.storageGet('frontSessionTable')}Center`);
          });
          return false;
        }
        //减去用户余额
        user.value.money = (parseFloat(user.value.money) - parseFloat(total)).toFixed(2);
        context.$http.post(`${context.$toolUtil.storageGet('frontSessionTable')}/update`, user.value);
        orders.forEach(order => {
          //如果商品有库存 减去商品库存
          if (order.goods.hasOwnProperty('alllimittimes')) {
            order.goods.alllimittimes = order.goods.alllimittimes - order.buynumber;
            if (order.goods.alllimittimes == 0) {
              order.goods.isShelves = 0;
            }
          }
          context.$http.post(`${order.tablename}/update`, order.goods);
          //更新订单状态
          context.$http.get('orders/list', {
            params: {
              page: 1,
              limit: 1,
              orderid: order.orderid
            }
          }).then(res => {
            res.data.data.list[0].status = '已支付';
            context.$http.post('orders/update', res.data.data.list[0]);
          });
        });
        //下单完成，跳转订单
        context.$toolUtil.message('购买成功', 'success', () => {
          router.push('/index/ordersList');
        });
      });
    };

    //获取个人信息
    const user = (0,reactivity_esm_bundler/* ref */.KR)({});
    const couponVisible = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const coupon_selected = (0,reactivity_esm_bundler/* ref */.KR)({});
    const couponList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const clearCoupon = () => {
      coupon_selected.value = {};
    };
    const o_priceTotal = (0,runtime_core_esm_bundler/* computed */.EW)(() => {
      let total = 0;
      list.value.forEach(item => {
        total += item.price * item.buynumber;
      });
      return total;
    });
    const checkCondition = coupon => {
      if (coupon.shangjiazhanghao && list.value.find(item => item.shangjiazhanghao != coupon.shangjiazhanghao)) return false;
      if (o_priceTotal.value < coupon.fullAmount) return false;
      if (coupon.status == '可使用') return true;
    };
    const useCoupon = coupon => {
      coupon_selected.value = coupon;
      couponVisible.value = false;
      let quota = coupon.discountAmount;
      list.value.forEach((item, index) => {
        let d = 0;
        let t = item.price * item.buynumber;
        if (index < list.value.length - 1) {
          d = t / o_priceTotal.value * coupon.discountAmount;
          quota -= d;
        } else {
          //最后一个商品占用剩余优惠额度
          d = quota;
        }
        item.realPay = Number((t - d).toFixed(2));
      });
    };
    const changeCoupon = () => {
      couponVisible.value = true;
      getMyList();
    };
    const getMyList = () => {
      context.$http.get('mycoupon/page').then(res => {
        if (res.data && res.data.code == 0) {
          res.data.data.list.forEach(item => {
            if (moment() < moment(item.effectTime) || moment() > moment(item.expireTime)) {
              //当前时间<生效时间||当前时间>过期时间
              return false;
            }
          });
          couponList.value = res.data.data.list.filter(item => item.status == '可使用');
        }
      });
    };
    //初始化
    const init = () => {
      getAddressList();
      if (route.query.type) {
        payType.value = route.query.type;
      }
      store.dispatch('user/getSession').then(res => {
        user.value = res.data.data;
        list.value = JSON.parse(context.$toolUtil.storageGet('orders_good'));
        list.value.forEach(item => {
          item.realPrice = item.price;
          item.realPay = Number(item.realPrice * item.buynumber);
        });
      });
    };
    init();
    return (_ctx, _cache) => {
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      const _component_el_divider = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-divider");
      const _component_el_radio = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-radio");
      const _component_el_table_column = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-table-column");
      const _component_el_table = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-table");
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-input");
      const _component_el_card = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-card");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "section_title"
      }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, (0,shared_esm_bundler/* toDisplayString */.v_)(formName))]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_card, {
        style: {
          "width": "100%"
        }
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          onClick: backClick
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[3] || (_cache[3] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("返回")])),
          _: 1,
          __: [3]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_divider, {
          "content-position": "center"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[4] || (_cache[4] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("地址")])),
          _: 1,
          __: [4]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table, {
          stripe: false,
          data: addressList.value
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "选择",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_radio, {
              label: scope.$index,
              modelValue: addressIndex.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => addressIndex.value = $event)
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[5] || (_cache[5] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" ")])),
              _: 2,
              __: [5]
            }, 1032, ["label", "modelValue"])]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "联系人",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.name), 1)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "联系电话",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.phone), 1)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "地址",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.address), 1)]),
            _: 1
          })]),
          _: 1
        }, 8, ["data"]), _cache[16] || (_cache[16] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("br", null, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "addressAdd_btn",
          onClick: addressAdd,
          type: "success"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[6] || (_cache[6] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("新增地址")])),
          _: 1,
          __: [6]
        })]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_divider, {
          "content-position": "center"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[7] || (_cache[7] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("商品清单")])),
          _: 1,
          __: [7]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table, {
          data: list.value,
          stripe: false
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "商品名称",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.goodname), 1)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "商品图片",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
              src: scope.row.picture ? (scope.row.picture.startsWith('http') ? '' : _ctx.$config.url) + scope.row.picture : '',
              alt: "",
              style: {
                "width": "150px",
                "height": "150px"
              }
            }, null, 8, _hoisted_3)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "价格",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [_cache[8] || (_cache[8] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
              style: {
                "font-size": "12px"
              }
            }, "￥", -1)), (0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.realPrice), 1)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "数量",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(scope.row.buynumber), 1)]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
            label: "总价",
            resizable: true,
            align: "center",
            "header-align": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [_cache[9] || (_cache[9] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
              style: {
                "font-size": "12px"
              }
            }, "￥", -1)), (0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)((scope.row.realPrice * scope.row.buynumber).toFixed(2)), 1)]),
            _: 1
          })]),
          _: 1
        }, 8, ["data"]), payType.value != 2 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_4, [_cache[11] || (_cache[11] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
          style: {
            "width": "80px",
            "font-size": "14px"
          }
        }, "优惠券：", -1)), !coupon_selected.value.id ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_button, {
          key: 0,
          onClick: changeCoupon
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[10] || (_cache[10] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("选择优惠券")])),
          _: 1,
          __: [10]
        })) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), coupon_selected.value.id ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_button, {
          key: 1,
          type: "success",
          onClick: changeCoupon
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("满" + (0,shared_esm_bundler/* toDisplayString */.v_)(coupon_selected.value.fullAmount) + "减" + (0,shared_esm_bundler/* toDisplayString */.v_)(coupon_selected.value.discountAmount), 1)]),
          _: 1
        })) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_divider, {
          "content-position": "center"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[12] || (_cache[12] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("备注")])),
          _: 1,
          __: [12]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
          modelValue: remark.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => remark.value = $event),
          placeholder: "请输入备注",
          type: "textarea"
        }, null, 8, ["modelValue"]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_6, [_cache[13] || (_cache[13] = (0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 总价：")), _cache[14] || (_cache[14] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
          class: "unit"
        }, "￥", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_7, (0,shared_esm_bundler/* toDisplayString */.v_)(totalPrice.value), 1)]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "pay_btn",
          onClick: payClick,
          type: "success"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[15] || (_cache[15] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("余额支付")])),
          _: 1,
          __: [15]
        })])]),
        _: 1,
        __: [16]
      }), _cache[19] || (_cache[19] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("br", null, null, -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)((0,reactivity_esm_bundler/* unref */.R1)(formModel/* default */.A), {
        ref_key: "formModelRef",
        ref: formModelRef,
        onFormModelChange: formModelChange
      }, null, 512), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dialog, {
        title: "优惠券",
        modelValue: couponVisible.value,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => couponVisible.value = $event),
        width: "85%"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_8, [coupon_selected.value.id ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_9, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          onClick: clearCoupon,
          size: "mini"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[17] || (_cache[17] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("不使用优惠券")])),
          _: 1,
          __: [17]
        })])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), ((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(couponList.value, (item, index) => {
          return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
            class: (0,shared_esm_bundler/* normalizeClass */.C4)(["coupon", !checkCondition(item) ? 'coupons' : '']),
            key: index
          }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_10, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_11, (0,shared_esm_bundler/* toDisplayString */.v_)(item.couponName), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_12, "满" + (0,shared_esm_bundler/* toDisplayString */.v_)(item.fullAmount) + "减" + (0,shared_esm_bundler/* toDisplayString */.v_)(item.discountAmount), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_13, (0,shared_esm_bundler/* toDisplayString */.v_)(item.effectTime) + "-" + (0,shared_esm_bundler/* toDisplayString */.v_)(item.expireTime), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_14, (0,shared_esm_bundler/* toDisplayString */.v_)(item.remark), 1), item.shangjiazhanghao ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_15, "仅限 " + (0,shared_esm_bundler/* toDisplayString */.v_)(item.shangjiazhanghao) + " 商品使用", 1)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_16, "全品类商品可使用"))]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_17, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_18, [_cache[18] || (_cache[18] = (0,runtime_core_esm_bundler/* createTextVNode */.eW)("￥")), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_19, (0,shared_esm_bundler/* toDisplayString */.v_)(item.discountAmount), 1)]), checkCondition(item) ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
            key: 0,
            class: "btn",
            onClick: $event => useCoupon(item)
          }, " 立即使用 ", 8, _hoisted_20)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_21, " 不满条件 "))])], 2);
        }), 128)), !couponList.value.length ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_22, " 暂无优惠券 ")) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)])]),
        _: 1
      }, 8, ["modelValue"])]);
    };
  }
});
;// ./src/views/pages/shop_order/confirm.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/shop_order/confirm.vue?vue&type=style&index=0&id=6331e0cf&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/views/pages/shop_order/confirm.vue?vue&type=style&index=0&id=6331e0cf&lang=scss

;// ./src/views/pages/shop_order/confirm.vue



;

const __exports__ = confirmvue_type_script_setup_true_lang_js;

/* harmony default export */ var shop_order_confirm = (__exports__);

/***/ }),

/***/ 2598:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(1605);
var iterate = __webpack_require__(2929);
var aFunction = __webpack_require__(9085);
var anObject = __webpack_require__(3938);

$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(fn) {
    anObject(this);
    aFunction(fn);
    return iterate(this, function (value, stop) {
      if (fn(value)) return stop(value);
    }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});


/***/ }),

/***/ 5019:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(1605);
var aFunction = __webpack_require__(9085);
var anObject = __webpack_require__(3938);
var createIteratorProxy = __webpack_require__(1523);
var callWithSafeIterationClosing = __webpack_require__(1332);

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var filterer = this.filterer;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(next.call(iterator, arg));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, filterer, value)) return value;
  }
});

$({ target: 'Iterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new IteratorProxy({
      iterator: anObject(this),
      filterer: aFunction(filterer)
    });
  }
});


/***/ }),

/***/ 5604:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ formModel; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
// EXTERNAL MODULE: ./src/components/location.vue + 4 modules
var components_location = __webpack_require__(2542);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/shop_address/formModel.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "formModel_btn_box"
};


/* harmony default export */ var formModelvue_type_script_setup_true_lang_js = ({
  __name: 'formModel',
  emits: ['formModelChange'],
  setup(__props, {
    expose: __expose,
    emit: __emit
  }) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const id = (0,reactivity_esm_bundler/* ref */.KR)(0);
    const form = (0,reactivity_esm_bundler/* ref */.KR)({});
    const formRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const formVisible = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const formTitle = (0,reactivity_esm_bundler/* ref */.KR)('');
    const resetForm = () => {
      form.value = {
        userid: context?.$toolUtil.storageGet('userid'),
        name: '',
        phone: '',
        isdefault: '是',
        address: ''
      };
    };
    //匹配手机号码
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!context?.$toolUtil.isMobile(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    const rules = {
      name: [{
        required: true,
        message: '请输入联系人',
        trigger: 'blur'
      }],
      phone: [{
        required: true,
        message: '请输入联系人',
        trigger: 'blur'
      }, {
        required: true,
        validator: validateMobile,
        trigger: 'blur'
      }],
      address: [{
        required: true,
        message: '请选择收货地址',
        trigger: 'blur'
      }]
    };
    const save = () => {
      formRef.value.validate(valid => {
        if (valid) {
          context?.$http({
            url: `address/${form.value.id ? 'update' : 'add'}`,
            method: 'post',
            data: form.value
          }).then(res => {
            context?.$toolUtil.message(`保存成功`, 'success', () => {
              formVisible.value = false;
              emit('formModelChange');
            });
          });
        }
      });
    };
    //选择地址
    const locationRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const locationClick = () => {
      locationRef.value.mapShow();
    };
    const getAddress = e => {
      form.value.longitude = e.lng;
      form.value.latitude = e.lat;
      form.value.address = e.fulladdress;
      form.value.fulladdress = e.fulladdress;
    };
    //初始化
    const init = (refid = null, text) => {
      resetForm();
      if (refid) {
        id.value = refid;
        getInfo();
      }
      formTitle.value = text;
      formVisible.value = true;
    };
    //声明父级调用
    __expose({
      init
    });
    //回调父级方法
    const emit = __emit;
    const getInfo = () => {
      context?.$http({
        url: `address/detail/${id.value}`,
        method: 'get'
      }).then(res => {
        form.value = res.data.data;
      });
    };
    return (_ctx, _cache) => {
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-input");
      const _component_el_form_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-form-item");
      const _component_el_col = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-col");
      const _component_el_radio = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-radio");
      const _component_el_radio_group = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-radio-group");
      const _component_el_form = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-form");
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dialog, {
        class: "edit_view",
        modelValue: formVisible.value,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => formVisible.value = $event),
        title: formTitle.value,
        width: "60%",
        "destroy-on-close": ""
      }, {
        footer: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "formModel_cancel",
          onClick: _cache[4] || (_cache[4] = $event => formVisible.value = false)
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[6] || (_cache[6] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("关闭")])),
          _: 1,
          __: [6]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "formModel_confirm",
          type: "primary",
          onClick: save
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[7] || (_cache[7] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("保存")])),
          _: 1,
          __: [7]
        })])]),
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form, {
          class: "add_form",
          model: form.value,
          "label-width": "80px",
          ref_key: "formRef",
          ref: formRef,
          rules: rules
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 12
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              prop: "name",
              label: "联系人"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.name,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => form.value.name = $event),
                placeholder: "请输入联系人"
              }, null, 8, ["modelValue"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 12
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              prop: "phone",
              label: "手机号"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.phone,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => form.value.phone = $event),
                placeholder: "请输入手机号"
              }, null, 8, ["modelValue"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 12
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              prop: "address",
              label: "地址"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.address,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => form.value.address = $event),
                placeholder: "请选择地址",
                readonly: "",
                onClick: locationClick
              }, null, 8, ["modelValue"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 12
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              prop: "isdefault",
              label: "默认地址"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_radio_group, {
                class: "list_radio",
                modelValue: form.value.isdefault,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => form.value.isdefault = $event)
              }, {
                default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_radio, {
                  label: "是"
                }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_radio, {
                  label: "否"
                })]),
                _: 1
              }, 8, ["modelValue"])]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        }, 8, ["model"])]),
        _: 1
      }, 8, ["modelValue", "title"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(components_location/* default */.A, {
        ref_key: "locationRef",
        ref: locationRef,
        position: form.value,
        onMapData: getAddress
      }, null, 8, ["position"])]);
    };
  }
});
;// ./src/views/pages/shop_address/formModel.vue?vue&type=script&setup=true&lang=js
 
;// ./src/views/pages/shop_address/formModel.vue



const __exports__ = formModelvue_type_script_setup_true_lang_js;

/* harmony default export */ var formModel = (__exports__);

/***/ })

}]);
//# sourceMappingURL=465.5e432bff.js.map