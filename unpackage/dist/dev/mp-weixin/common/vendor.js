(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // ?????????????????????????????????????????????????????????__id__???????????????????????????mp-weixin??????navigateTo???AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"VUE_APP_NAME":"hjmp-weixin","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // ???????????????????????????getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************!*\
  !*** F:/myWork/newWork/store/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));



var _mallConfig = _interopRequireDefault(__webpack_require__(/*! ./modules/mallConfig.js */ 13));
var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user.js */ 14));
var _globalConfiguration = _interopRequireDefault(__webpack_require__(/*! ./modules/globalConfiguration.js */ 28));
var _index = _interopRequireDefault(__webpack_require__(/*! ./modules/index.js */ 29));
var _orderSubmit = _interopRequireDefault(__webpack_require__(/*! ./modules/orderSubmit.js */ 30));
var _pagination = _interopRequireDefault(__webpack_require__(/*! ./modules/pagination.js */ 31));
var _loading = _interopRequireDefault(__webpack_require__(/*! ./modules/loading.js */ 32));
var _payment = _interopRequireDefault(__webpack_require__(/*! ./modules/payment.js */ 33));
var _scanCode = _interopRequireDefault(__webpack_require__(/*! ./modules/scanCode.js */ 34));
var _page = _interopRequireDefault(__webpack_require__(/*! ./modules/page.js */ 35));
var _userCenter = _interopRequireDefault(__webpack_require__(/*! ./modules/userCenter.js */ 36));
var _iphoneX = _interopRequireDefault(__webpack_require__(/*! ./modules/iphoneX.js */ 37));
var _gift = _interopRequireDefault(__webpack_require__(/*! ./modules/gift.js */ 38));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./modules/cart.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  modules: {
    mallConfig: _mallConfig.default,
    user: _user.default,
    gConfig: _globalConfiguration.default,
    index: _index.default,
    orderSubmit: _orderSubmit.default,
    pagination: _pagination.default,
    loading: _loading.default,
    payment: _payment.default,
    scanCode: _scanCode.default,
    page: _page.default,
    userCenter: _userCenter.default,
    iPhoneX: _iphoneX.default,
    gift: _gift.default,
    cart: _cart.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 125:
/*!*******************************************!*\
  !*** F:/myWork/newWork/core/routeJump.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 11));
var _user = _interopRequireDefault(__webpack_require__(/*! ../core/user.js */ 15));
var _cache = __webpack_require__(/*! ../core/cache.js */ 22);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var jump = function jump(data) {
  if (!data.open_type && !data.params && !data.page_url) return;

  var open_type = data.open_type;
  var params = data.params;
  var page_url = data.page_url;

  if (!Array.isArray(params) && Object.prototype.toString.call(params) === "[object String]" && params) {
    params = JSON.parse(params);
  }

  switch (open_type) {
    case 'reLaunch':
      uni.reLaunch({
        url: params[0].value });

      break;

    case 'redirect':
      uni.redirectTo({
        url: params[0].value });

      break;

    case 'navigate':
      var new_page_url = page_url.split('?')[0];
      var options = "?";

      for (var i = 0; i < params.length; i++) {
        options += "".concat(params[i].key, "=").concat(params[i].value, "&");
      }
      new_page_url += options.slice(0, options.length - 1);

      if (options === '?') {
        new_page_url = page_url;
      }









      uni.navigateTo({
        url: new_page_url });



      break;

    case 'app_admin':
      if (_index.default.state.user.info.identity.is_admin == 1) {
        uni.navigateTo({
          url: data.url });

      }
      break;

    case 'back':
      uni.navigateBack({});
      break;

    case 'tel':
      uni.makePhoneCall({
        phoneNumber: params[0].value });

      break;

    case 'web':
      uni.navigateTo({
        url: "".concat(page_url.split('?')[0], "?url=").concat(encodeURIComponent(params[0].value)) });

      break;

    case 'app':
      var originalPath = '';
      for (var _i = 0; _i < params.length; _i++) {
        originalPath += "".concat(params[_i].key, "=").concat(params[_i].value, "&");
      }
      if (typeof originalPath !== 'string') return;
      var groups = originalPath.split('&');
      var obj = {};
      for (var _i2 in groups) {
        if (typeof groups[_i2] !== 'string') continue;
        if (!groups[_i2].length) continue;
        var kvs = groups[_i2].split('=');
        if (kvs.length !== 2) {
          var s = '';
          for (var _i3 = 1; _i3 < kvs.length; _i3++) {
            if (_i3 + 1 === kvs.length) {
              continue;
            } else {
              s += "".concat(kvs[_i3], "=").concat(kvs[_i3 + 1]);
            }
          }
          obj[kvs[0]] = s;
        } else {
          obj[kvs[0]] = kvs[1];
        }
      }
      var new_params = obj;
      var appId = '';
      var path = '';

      appId = new_params.app_id || '';
      path = new_params.path || '';













      uni.navigateToMiniProgram({
        appId: appId,
        path: path });

      break;

    case 'clear_cache':
      uni.showModal({
        title: '??????',
        content: '?????????????????????',
        cancelText: '??????',
        confirmText: '??????',
        success: function success(e) {
          if (e.confirm) {
            uni.showLoading({
              title: '????????????...' });

            (0, _cache.clearStorage)();
            if (_user.default && _index.default && _index.default.state.user.accessToken) {
              _user.default.loginByToken(_index.default.state.user.accessToken);
            }
            _index.default.dispatch('mallConfig/actionResetConfig');
            uni.hideLoading();
            uni.showToast({
              title: '????????????',
              duration: 1000 });

          }
        } });

      break;

    case 'map':
      // uni.openLocation({
      //     latitude: Number(this.latitude),
      //     longitude: Number(this.longitude),
      //     name: this.address,
      //     address: this.address,
      //     success: function () {
      //     },
      //     fail: function () {
      //     }
      // });
      break;
    // case 'share':
  }
};var _default =

jump;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!*****************************************************!*\
  !*** F:/myWork/newWork/store/modules/mallConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var state = {
  auth_page: {},
  bar_title: {},
  cat_style: {},
  copyright: {},
  mall: {
    setting: {
      theme_color: 'classic-red' } },


  navbar: {
    navs: [] },

  plugin: {
    vip_card: {
      setting: {
        background: '#f7f7f7' } } },



  share_setting: [],
  share_setting_custom: {},
  user_center: {},
  __wxapp_img: {},
  theme: "classic-red",
  windowHeight: {
    height: 0,
    width: 0,
    boolean: false } };



var getters = {
  getNavBar: function getNavBar(state) {
    return state.navbar;
  },
  getNavBarNavs: function getNavBarNavs(state) {
    for (var i = 0, len = state.navbar.navs.length; i < len; i++) {
    }
  },
  getUserCenter: function getUserCenter(state) {
    return state.user_center;
  },
  getWxappImg: function getWxappImg(state) {
    return state.__wxapp_img;
  },
  getCatStyle: function getCatStyle(state) {
    return state.cat_style;
  },
  getVip: function getVip(state) {
    return state.plugin.vip_card;
  },
  getVideo: function getVideo(state) {
    return state.mall.setting.is_goods_video;
  },
  getShowCart: function getShowCart(state) {
    return state.mall.setting.is_show_cart;
  },
  getTheme: function getTheme(state) {
    return state.mall.setting.theme_color;
  },
  getSetting: function getSetting(state) {
    return state.mall.setting;
  } };


var mutations = {
  mutSetConfig: function mutSetConfig(state, data) {
    for (var item in data) {
      if (item === 'navbar') {
        for (var i = 0; i < data[item].navs.length; i++) {
          data[item].navs[i].id = i;
        }
      }
      state[item] = data[item];
    }
  },
  mutSetHeight: function mutSetHeight(state, data) {
    state.windowHeight = data;
  } };


var actions = {
  actionGetConfig: function actionGetConfig(context) {
    _vue.default.prototype.$mallConfig.getConfig().then(function (response) {
      context.commit('mutSetConfig', response);
    }).catch(function () {
    });
  },
  actionHeight: function actionHeight(context, data) {
    context.commit("mutSetHeight", data);
  },
  actionResetConfig: function actionResetConfig(context) {
    _vue.default.prototype.$mallConfig.resetConfig();
    _vue.default.prototype.$mallConfig.getConfig().then(function (response) {
      context.commit('mutSetConfig', response);
    }).catch(function () {
    });
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 14:
/*!***********************************************!*\
  !*** F:/myWork/newWork/store/modules/user.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _user = _interopRequireDefault(__webpack_require__(/*! ../../core/user.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var state = {
  accessToken: null,
  info: null,
  showLoginModal: false,
  tempParentId: 0 };


var getters = {
  accessToken: function accessToken(state) {
    return state.accessToken;
  },
  info: function info(state) {
    return state.info;
  },
  showLoginModal: function showLoginModal(state) {
    return state.showLoginModal;
  },
  tempParentId: function tempParentId(state) {
    return state.tempParentId;
  },
  is_vip: function is_vip(state) {
    return state.is_vip_card_user;
  } };


var mutations = {
  accessToken: function accessToken(state, data) {
    state.accessToken = data;
  },
  info: function info(state, data) {
    state.info = data;
  },
  showLoginModal: function showLoginModal(state, data) {
    state.showLoginModal = data;
  },
  tempParentId: function tempParentId(state, data) {
    state.tempParentId = data;
  } };


var actions = {
  accessToken: function accessToken(context) {
    if (!_user.default.isLogin()) {
      context.commit('accessToken', null);
    }
    _user.default.getAccessToken().then(function (accessToken) {
      context.commit('accessToken', accessToken);
    });
  },
  info: function info(context, options) {
    if (!_user.default.isLogin()) {
      context.commit('accessToken', null);
    }
    _user.default.getAccessToken().then(function (accessToken) {
      context.commit('accessToken', accessToken);
      _user.default.getInfo(options).then(function (data) {
        context.commit('info', data);
      });
    });
  },
  refreshInfo: function refreshInfo(context) {
    context.commit('accessToken', null);
  },
  refresh: function refresh(context) {
    if (!_user.default.isLogin()) {
      context.commit('accessToken', null);
    }
    _user.default.getAccessToken().then(function (accessToken) {
      context.commit('accessToken', accessToken);
      _user.default.getInfo({
        refresh: true }).
      then(function (data) {
        context.commit('info', data);
      }).catch(function (e) {
      });
    }).catch(function (e) {
    });
  },
  setTempParentId: function setTempParentId(context, data) {
    context.commit('tempParentId', data);
  },
  loadAccessTokenFormCache: function loadAccessTokenFormCache(context) {
    if (context.accessToken) return;
    _user.default.getAccessToken({
      cacheOnly: true }).
    then(function (e) {
      if (!e) return;
      context.commit('accessToken', e);
    });
  },
  logout: function logout(context) {
    context.commit('accessToken', null);
    _user.default.loginByToken(null);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 1461:
/*!**********************************************!*\
  !*** F:/myWork/newWork/pages/order/order.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // ????????????
  copyText: function copyText(text) {
    uni.setClipboardData({
      data: text,
      success: function success() {
        uni.hideLoading();
        uni.showToast({
          title: '????????????',
          icon: 'none' });

      } });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**************************************!*\
  !*** F:/myWork/newWork/core/user.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 16));
var _appOnLaunch = _interopRequireDefault(__webpack_require__(/*! ./appOnLaunch.js */ 24));
var _cache = __webpack_require__(/*! ./cache.js */ 22);
var _event = _interopRequireDefault(__webpack_require__(/*! ./event.js */ 26));
var _const = _interopRequireDefault(__webpack_require__(/*! ./const.js */ 27));
var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 11));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var storageKey = '_USER_ACCESS_TOKEN';

var userInfo = null;var _default =

{
  getUserInfoResolve: null,
  getUserInfoReject: null,
  getAccessToken: function getAccessToken(options) {var _this = this;
    options = options || {};
    if (typeof options.cacheOnly === 'undefined') {
      options.cacheOnly = false;
    }
    return new Promise(function (resolve, reject) {
      var accessToken = (0, _cache.getStorageSync)(storageKey);
      if (accessToken) {
        return resolve(accessToken);
      }
      if (options.cacheOnly) {
        return resolve(accessToken);
      }
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      currentPage.$vm.$store.commit('user/showLoginModal', true);
      _this.getUserInfoResolve = function (userInfoResult) {
        uni.showLoading({
          mask: true,
          title: '????????????' });

        uni.login({
          scopes: 'auth_base',
          success: function success(loginResult) {
            var data = {
              encryptedData: userInfoResult.detail.encryptedData,
              iv: userInfoResult.detail.iv,
              rawData: userInfoResult.detail.rawData,
              signature: userInfoResult.detail.signature,
              code: loginResult.code };

            (0, _request.default)({
              url: _appOnLaunch.default.passport.login,
              method: 'post',
              data: data }).
            then(function (response) {
              uni.hideLoading();
              if (response.code === 0) {
                _event.default.trigger(_const.default.EVENT_USER_LOGIN);
                (0, _cache.setStorageSync)(storageKey, response.data.access_token);
                return resolve(response.data.access_token);
              } else {
                return reject(response.msg);
              }
            }).catch(function (e) {
              uni.hideLoading();
              reject(e);
            });
          } });

      };
      _this.getUserInfoReject = function (e) {
        reject(e);
      };
    });
  },
  getInfo: function getInfo(options) {var _this2 = this;
    options = options || {};
    if (typeof options.refresh === 'undefined') {
      options.refresh = false;
    }
    return new Promise(function (resolve, reject) {
      if (options.refresh) {
        userInfo = null;
      }
      if (userInfo) {
        return resolve(userInfo);
      }
      _this2.getAccessToken().then(function (accessToken) {
        uni.showNavigationBarLoading();
        (0, _request.default)({
          url: _appOnLaunch.default.user.user_info }).
        then(function (response) {
          uni.hideNavigationBarLoading();
          if (response.code === 0) {
            userInfo = JSON.parse(JSON.stringify(response.data));
            _event.default.trigger(_const.default.EVENT_USER_REGISTER, userInfo);
            if (typeof userInfo.register !== 'undefined') {
              var register = userInfo.register;
              if (register.coupon_list) {
                var coupon = {
                  list: register.coupon_list,
                  type: 'register' };

                _index.default.dispatch('page/actionSetCoupon', coupon);
              }
            }
            return resolve(userInfo);
          } else {
            return reject(response.msg);
          }
        }).catch(function (e) {
          uni.hideNavigationBarLoading();
          return reject(e);
        });
      }).catch(function (e) {
        return reject(e);
      });
    });
  },
  isLogin: function isLogin() {
    if (_index.default && _index.default.state.user && _index.default.state.user.accessToken) return true;
    return !!(0, _cache.getStorageSync)(storageKey);
  },
  loginByToken: function loginByToken(token) {
    (0, _cache.setStorageSync)(storageKey, token);
  },
  silentLogin: function silentLogin() {
    uni.login({
      success: function success(loginRes) {
        (0, _request.default)({
          url: _appOnLaunch.default.passport.login,
          method: 'post',
          data: {
            code: loginRes.code } }).

        then(function (response) {
          if (response.code === 0) {
            uni.setStorageSync(storageKey, response.data.access_token);
          }
        });
      } });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!*****************************************!*\
  !*** F:/myWork/newWork/core/request.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _formId = __webpack_require__(/*! ./formId.js */ 20);
var _apiUrl = _interopRequireDefault(__webpack_require__(/*! ./apiUrl.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
// import deepMerge from "./deepMerge";
var request = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(args) {var header, obj, mch_storage, _yield$uni$request, _yield$uni$request2, error, response, msg;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            header = {
              'X-App-Platform': args.header && args.header['X-App-Platform'] ? args.header['X-App-Platform'] : _vue.default.prototype.$platform,
              'X-Form-Id-List': JSON.stringify((0, _formId.popAll)()),
              'X-Requested-With': args.header && args.header['X-Requested-With'] ? args.header['X-Requested-With'] : 'XMLHttpRequest',
              'X-App-Version': _vue.default.prototype.$appVersion,
              'content-type': 'application/x-www-form-urlencoded' };_context.next = 3;return (





              _vue.default.prototype.$store.dispatch('user/loadAccessTokenFormCache'));case 3:
            if (_vue.default.prototype.$store.state.user && _vue.default.prototype.$store.state.user.accessToken) {
              header['X-Access-Token'] = _vue.default.prototype.$store.state.user.accessToken;
            }
            if (_vue.default.prototype.$store.state.user && _vue.default.prototype.$store.state.user.tempParentId !== 0) {
              header['X-User-Id'] = _vue.default.prototype.$store.state.user.tempParentId + '';
            }

            //?????????Token
            obj = {};
            args.url.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
              obj[decodeURIComponent(key)] = decodeURIComponent(value);
            });
            if (_vue.default.prototype.$utils.objectValues(_apiUrl.default.mch).indexOf(obj.r) !== -1) {
              mch_storage = uni.getStorageSync('MCH2019');
              header['Mch-Access-Token'] = mch_storage.token;
            }_context.next = 10;return (
              uni.request({
                url: args.url,
                method: args.method || 'get',
                data: args.data,
                header: header }));case 10:_yield$uni$request = _context.sent;_yield$uni$request2 = _slicedToArray(_yield$uni$request, 2);error = _yield$uni$request2[0];response = _yield$uni$request2[1];if (!


            error) {_context.next = 20;break;}
            msg = {
              code: 400,
              msg: error.errMsg,
              data: error };

            alertError(msg);return _context.abrupt("return",
            Promise.reject(msg));case 20:return _context.abrupt("return",

            distinguishStatusCode(response));case 21:case "end":return _context.stop();}}}, _callee);}));return function request(_x) {return _ref.apply(this, arguments);};}();




var reloadPage = function reloadPage() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var options = page.options || {};
  var route = page.route || '';
  if (route.indexOf('/') !== 0) {
    route = '/' + route;
  }
  var query = '';
  for (var k in options) {
    query = query + "".concat(k, "=").concat(options[k], "&");
  }
  uni.redirectTo({
    url: route + (query ? "?".concat(query) : "") });

};


var alertError = function alertError(error) {
  var confirmText = '????????????';



  uni.showModal({
    title: '????????????',
    content: '??????????????????????????????????????????~',
    cancelText: '????????????',
    confirmText: confirmText,
    success: function success(e) {
      if (e.cancel) {
        var data = "code: ".concat(error.code, ", \r\nmsg: ").concat(error.msg, ", \r\ndetail: ") + (
        error.data ? typeof error.data === 'string' ? error.data : JSON.stringify(error.data) : null);
        uni.setClipboardData({
          data: data });

      }
      if (e.confirm) {

        reloadPage();

      }
    } });

};

var distinguishDataCode = function distinguishDataCode(response) {
  if (response.data) {var _response$data =
    response.data,msg = _response$data.msg,code = _response$data.code;
    if (code >= 400) {
      alertError({
        code: code,
        msg: msg,
        data: response.data.error || response.data.data || msg });

      return Promise.reject(msg);
    } else if (code === -1) {
      _vue.default.prototype.$store.dispatch('user/logout');
      _vue.default.prototype.$store.dispatch('user/accessToken');
      return Promise.reject(msg);
    } else if (code === -2) {
      uni.redirectTo({
        url: '/pages/disabled/disabled?text=' + response.data.data.text });

    } else if (code === -3) {
      uni.redirectTo({
        url: '/plugins/mch/mch/login/login' });

      return Promise.reject(msg);
    } else {
      return Promise.resolve(response.data);
    }
  } else {
    return Promise.reject({
      code: 200,
      msg: '???????????????',
      data: response });

  }
};

var distinguishStatusCode = function distinguishStatusCode(response) {
  var msg = {
    code: 500,
    msg: '?????????????????????',
    data: response };

  switch (response.statusCode) {
    case 200:
      return distinguishDataCode(response);
    case 404:
      msg = {
        code: 404,
        msg: '??????????????????',
        data: response };

      break;
    case 500:
      msg = {
        code: 500,
        msg: '?????????????????????',
        data: response };

      break;
    case 503:
      msg = {
        code: 503,
        msg: '???????????????',
        data: response };

      break;
    case 504:
      msg = {
        code: 504,
        msg: '????????????',
        data: response };

      break;
    case 400:
      msg = {
        code: 400,
        msg: '?????????????????????????????????',
        data: response };

      break;
    case 403:
      msg = {
        code: 403,
        msg: '?????????????????????',
        data: response };

      break;
    case 405:
      msg = {
        code: 405,
        msg: '????????????',
        data: response };

      break;
    case 406:
      msg = {
        code: 406,
        msg: '??????????????????????????????????????????????????????',
        data: response };

      break;
    case 407:
      msg = {
        code: 407,
        msg: '??????????????????',
        data: response };

      break;
    case 408:
      msg = {
        code: 408,
        msg: '????????????',
        data: response };

      break;
    case 409:
      msg = {
        code: 409,
        msg: '??????',
        data: response };

      break;
    case 410:
      msg = {
        code: 410,
        msg: '?????????',
        data: response };

      break;
    case 411:
      msg = {
        code: 411,
        msg: '??????????????????',
        data: response };

      break;
    case 412:
      msg = {
        code: 412,
        msg: '????????????????????????????????????????????????????????????????????????',
        data: response };

      break;
    case 413:
      msg = {
        code: 413,
        msg: '??????????????????',
        data: response };

      break;
    case 414:
      msg = {
        code: 414,
        msg: '??????URI??????',
        data: response };

      break;
    case 415:
      msg = {
        code: 415,
        msg: '????????????????????????',
        data: response };

      break;
    case 416:
      msg = {
        code: 416,
        msg: '???????????????????????????',
        data: response };

      break;
    case 417:
      msg = {
        code: 417,
        msg: '??????????????????',
        data: response };

      break;
    default:
      break;}

  alertError(msg);
  return Promise.reject(msg);
};var _default =

request;
//
//
// class Request {
//     // ????????????????????????
//     setConfig(customConfig) {
//         // ????????????????????????????????????????????????????????????
//         this.config = deepMerge(this.config, customConfig);
//     }
//
//     request(options = {}) {
//         // ??????????????????
//         if (this.interceptor.request && typeof this.interceptor.request === 'function') {
//             let tmpConfig = {};
//             let interceptorRequest = this.interceptor.request(options);
//             if (interceptorRequest === false) {
//                 // ??????????????????pending????????????Promise???????????????promise???????????????then()??????
//                 return new Promise(()=>{});
//             }
//             this.options = interceptorRequest;
//         }
//         options.dataType = options.dataType || this.config.dataType;
//         options.responseType = options.responseType || this.config.responseType;
//         options.url = options.url || '';
//         options.params = options.params || {};
//         options.header = Object.assign(this.config.header, options.header);
//         options.method = options.method || this.config.method;
//
//         return new Promise((resolve, reject) => {
//             options.complete = (response) => {
//                 // ????????????????????????loading(?????????????????????????????????????????????loading)
//                 uni.hideLoading();
//                 // ???????????????????????????????????????????????????loading
//                 clearTimeout(this.config.timer);
//                 this.config.timer = null;
//                 if (this.config.originalData) {
//                     // ???????????????????????????
//                     if (this.interceptor.response && typeof this.interceptor.response === 'function') {
//                         let resInterceptors = this.interceptor.response(response);
//                         // ????????????????????????false????????????????????????????????????this.$u.post???then??????
//                         if (resInterceptors !== false) {
//                             resolve(resInterceptors);
//                         } else {
//                             // ?????????????????????false??????????????????????????????????????????????????????????????????catch??????
//                             reject(response);
//                         }
//                     } else {
//                         // ????????????????????????????????????????????????????????????????????????????????????
//                         resolve(response);
//                     }
//                 } else {
//                     if (response.statusCode === 200) {
//                         if (this.interceptor.response && typeof this.interceptor.response === 'function') {
//                             let resInterceptors = this.interceptor.response(response.data);
//                             if (resInterceptors !== false) {
//                                 resolve(resInterceptors);
//                             } else {
//                                 reject(response.data);
//                             }
//                         } else {
//                             // ??????????????????????????????(originalData=false)??????????????????????????????????????????????????????then??????
//                             resolve(response.data);
//                         }
//                     } else {
//                         // ????????????????????????????????????????????????????????????200???modal????????????
//                         if(response.errMsg) {
//                             uni.showModal({
//                                 title: response.errMsg
//                             });
//                         }
//                         reject(response)
//                     }
//                 }
//             }
//
//             // ?????????????????????URL??????/??????,????????????,??????/??????????????????uView???test.js????????????url()??????
//             options.url = Vue.prototype.$validation.url(options.url) ? options.url : (this.config.baseUrl + (options.url.indexOf('/') === 0 ?
//                 options.url : '/' + options.url));
//             // ????????????loading
//             // ?????????????????????timer?????????????????????????????????????????????????????????????????????????????????????????????id
//             // ?????????????????????????????????????????????????????????????????????loading
//             if(this.config.showLoading && !this.config.timer) {
//                 this.config.timer = setTimeout(() => {
//                     uni.showLoading({
//                         title: this.config.loadingText,
//                         mask: this.config.loadingMask
//                     })
//                     this.config.timer = null;
//                 }, this.config.loadingTime);
//             }
//             uni.request(options);
//         })
//     }
//
//     constructor() {
//         this.config = {
//             baseUrl: '', // ??????????????????
//             // ??????????????????
//             header: {
//                 'X-App-Platform': Vue.prototype.$platform,
//                 'X-Form-Id-List': JSON.stringify(popAll()),
//                 'X-Requested-With': 'XMLHttpRequest',
//                 'X-App-Version': Vue.prototype.$appVersion,
//                 'content-type': 'application/x-www-form-urlencoded'
//             },
//             method: 'POST',
//             // ?????????json????????????uni.request????????????????????????JSON.parse
//             dataType: 'json',
//             // ??????????????????????????????5+??????????????????????????????????????????text??????
//             responseType: 'text',
//             showLoading: true, // ????????????????????????loading
//             loadingText: '?????????...',
//             loadingTime: 800, // ??????????????????????????????????????????????????????????????????????????????ms
//             timer: null, // ?????????
//             originalData: false, // ?????????????????????????????????????????????????????????????????????
//             loadingMask: true, // ??????loading???????????????????????????????????????????????????????????????
//         }
//
//         // ?????????
//         this.interceptor = {
//             // ??????????????????
//             request: function(config) {
//                 // //?????????Token
//                 // let obj = {};
//                 // config.url.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
//                 //     obj[decodeURIComponent(key)] = decodeURIComponent(value);
//                 // });
//                 // if (Vue.prototype.$utils.objectValues(apiUrl.mch).indexOf(obj.r) !== -1) {
//                 //     const mch_storage = uni.getStorageSync('MCH2019');
//                 //     config.header['Mch-Access-Token'] = mch_storage.token;
//                 // }
//                 return config;
//             },
//             // ??????????????????
//             response: null
//         }
//
//     }
// }
//
// export {
//     Request
// }
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),

/***/ 18:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 19:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//?????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"hjmp-weixin","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"hjmp-weixin","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"hjmp-weixin","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"hjmp-weixin","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/formId.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.push = exports.popAll = void 0;var _utils = __webpack_require__(/*! ./utils.js */ 21);
var _cache = __webpack_require__(/*! ./cache.js */ 22);

var popAll = function popAll() {
  var formIdList = (0, _cache.getStorageSync)('_FORM_ID_LIST');
  (0, _cache.setStorageSync)('_FORM_ID_LIST', []);
  return formIdList || [];
};exports.popAll = popAll;

var push = function push(formId) {
  if (!formId || formId === 'the formId is a mock one') {
    return false;
  }

  var formIdList = (0, _cache.getStorageSync)('_FORM_ID_LIST');

  if (!formIdList || !formIdList.length) {
    formIdList = [];
  }
  var item = {
    value: formId,
    type: 0,
    remains: 1,
    expires_at: (0, _utils.datetime)(null, (0, _utils.time)() + 7 * 86400 - 60) };

  formIdList.push(item);
  (0, _cache.setStorageSync)('_FORM_ID_LIST', formIdList);
};exports.push = push;

/***/ }),

/***/ 2089:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/tabbar.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var tabBar = {
  setNavigationBarTitle: function setNavigationBarTitle(barTitle, currentRoute) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var i, len;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
              Object.keys(barTitle).length > 0)) {_context.next = 9;break;}
              i = 0, len = barTitle.length;case 2:if (!(i < len)) {_context.next = 9;break;}if (!
              currentRoute.includes(barTitle[i].value)) {_context.next = 6;break;}
              uni.setNavigationBarTitle({
                title: barTitle[i].new_name });return _context.abrupt("return",

              barTitle[i].new_name);case 6:i++;_context.next = 2;break;case 9:case "end":return _context.stop();}}}, _callee);}))();



  } };var _default =


tabBar;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!***************************************!*\
  !*** F:/myWork/newWork/core/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.deepClone = exports.debounce = exports.throttle = exports.colorRgba = exports.deleteUrlParam = exports.batchSave = exports.hideLoading = exports.showLoading = exports.urlParamsToObject = exports.randomString = exports.objectValues = exports.earthDistance = exports.timeDifference = exports.objectToUrlParams = exports.strtotime = exports.datetime = exports.time = void 0;var time = function time() {
  return parseInt(Math.round(new Date() / 1000));
};

/***
    * ??????????????????????????????
    * @param format eg: Y-m-d h:i:s
    * @param timestamp
    * @returns {*}
    */exports.time = time;
var datetime = function datetime(format, timestamp) {
  if (typeof format === 'undefined' || format === null) {
    format = 'Y-m-d h:i:s';
  }
  if (typeof timestamp === 'undefined' || timestamp === null) {
    timestamp = this.time();
  }
  var d = new Date();
  d.setTime(timestamp * 1000);
  // from https://www.cnblogs.com/yjf512/p/3796229.html
  var date = {
    "Y": d.getFullYear(),
    "m+": d.getMonth() + 1 < 10 ? "0".concat(d.getMonth() + 1) : d.getMonth() + 1,
    "d+": d.getDate() < 10 ? "0".concat(d.getDate()) : d.getDate(),
    "h+": d.getHours() < 10 ? "0".concat(d.getHours()) : d.getHours(),
    "i+": d.getMinutes() < 10 ? "0".concat(d.getMinutes()) : d.getMinutes(),
    "s+": d.getSeconds() < 10 ? "0".concat(d.getSeconds()) : d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    "S+": d.getMilliseconds() };

  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
      date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};exports.datetime = datetime;

var strtotime = function strtotime(str) {
};exports.strtotime = strtotime;

var objectToUrlParams = function objectToUrlParams(obj, urlencode) {
  var str = "";
  for (var key in obj) {
    str += "&" + key + "=" + (urlencode ? encodeURIComponent(obj[key]) : obj[key]);
  }
  return str.substr(1);
};exports.objectToUrlParams = objectToUrlParams;

var timeDifference = function timeDifference(start_at, end_at) {
  var times = parseInt((end_at - start_at) / 1000);
  var day = 0,
  hour = 0,
  minute = 0,
  second = 0;

  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24));
    hour = Math.floor(times / (60 * 60)) - day * 24;
    minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
    second = Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
  } else {
    return null;
  }

  return {
    d: day,
    h: hour < 10 ? '0' + hour : hour,
    m: minute < 10 ? '0' + minute : minute,
    s: second < 10 ? '0' + second : second };

};

/**
    * ???????????????????????????????????????
    */exports.timeDifference = timeDifference;
var earthDistance = function earthDistance(location1, location2) {
  var lat1 = parseFloat(location1.lat);
  var lng1 = parseFloat(location1.lng);
  var lat2 = parseFloat(location2.lat);
  var lng2 = parseFloat(location2.lng);

  var EARTH_RADIUS = 6378137.0; //??????M
  var PI = Math.PI;

  function getRad(d) {
    return d * PI / 180.0;
  }

  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
};exports.earthDistance = earthDistance;

var objectValues = function objectValues(obj) {
  var arr = [];
  for (var i in obj) {
    arr.push(obj[i]);
  }
  return arr;
};exports.objectValues = objectValues;

var randomString = function randomString(length) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {result += chars[Math.floor(Math.random() * chars.length)];}
  return result;
};exports.randomString = randomString;

var urlParamsToObject = function urlParamsToObject(str) {
  var groups = str.split('&');
  var obj = {};
  for (var i in groups) {
    if (typeof groups[i] !== 'string') continue;
    if (!groups[i].length) continue;
    var kvs = groups[i].split('=');
    if (kvs.length !== 2) continue;
    obj[kvs[0]] = kvs[1];
  }
  return obj;
};exports.urlParamsToObject = urlParamsToObject;

var showLoading = function showLoading() {
  uni.showLoading({
    title: '?????????',

    mask: true });


};exports.showLoading = showLoading;
var hideLoading = function hideLoading() {
  uni.hideLoading();
};

//??????
exports.hideLoading = hideLoading;var batchStatus = false;

/**
                                                            *
                                                            * @param url
                                                            * @param desc ['image', 'video']
                                                            * @returns {Promise<unknown>}
                                                            */
var batchSave = function batchSave(url) {var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image';
  return new Promise(function (resolve_a, reject_a) {
    if (!(url instanceof Array)) {
      url = [url];
    }
    var title = desc === "image" ? '??????' : '??????';

    new Promise(function (resolve_b, reject_b) {





      var scope = null;

      scope = 'scope.writePhotosAlbum';




      uni.authorize({
        scope: scope,
        success: function success(res) {
          resolve_b('success');
        },
        fail: function fail(e) {
          uni.showModal({
            title: '??????',
            content: '??????,?????????????????????????????????',
            showCancel: false,
            success: function success(res) {
              if (res.confirm) {
                uni.openSetting({
                  success: function success(settingdata) {
                    if (settingdata.authSetting[scope]) {
                      resolve_b('success');
                    } else {
                      reject_b('fail');
                    }
                  } });

              }
            } });

        } });


    }).then(function (result) {
      if (batchStatus) {
        uni.showLoading({ title: title + "\u4FDD\u5B58\u4E2D", mask: true });
        return;
      }
      batchStatus = true;
      uni.showLoading({ title: title + "\u4FDD\u5B58\u4E2D", mask: true });
    }).then(function (e) {





























      Promise.all(url.map(function (item) {
        return new Promise(function (resolve_c, reject_c) {
          try {

            var downloadTask = uni.downloadFile({
              url: item,
              success: function success(e) {
                if (desc === 'image') {
                  uni.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function success() {
                      resolve_c('success');
                    },
                    fail: function fail(err) {
                      reject_c('fail');
                    } });

                }
                if (desc === 'video') {
                  uni.saveVideoToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function success() {
                      resolve_c('success');
                    },
                    fail: function fail(err) {
                      reject_c('fail');
                    } });

                }
              },
              fail: function fail(err) {
                reject_c('fail');
              } });




            if (desc === 'video') {
              var ago = new Date().getTime();
              var limit = 1000 * 60; //max 1minute
              downloadTask.onProgressUpdate(function (res) {
                var currency = new Date().getTime();
                if (currency - ago > limit) {
                  downloadTask.abort();
                  reject_c('fail');
                }
              });
            }

          } catch (e) {
            reject_c('fail');
          }
        });
      })).then(function () {
        batchStatus = false;
        uni.hideLoading();
        resolve_a('success');
      }).catch(function () {
        batchStatus = false;
        uni.hideLoading();
        /* ???????????? */
        uni.showToast({ title: '????????????' });
        reject_a('fail');
      });

    }).catch(function () {
      uni.showModal({ title: '??????', content: '????????????????????????????????????', showCancel: false });
      reject_a('fail');
    });
  });
};


/**
    * ??????url???????????????????????????????????????url
    * @param {string} url url???????????????????????????
    * @param {string|array} param ????????????????????????????????????????????????['key1', 'key2']
    * @param {boolean} allParams ?????????????????????????????????false
    * @returns {string|*}
    */exports.batchSave = batchSave;
var deleteUrlParam = function deleteUrlParam(url, param, allParams) {
  if (isNaN(url.indexOf('?')) || url.indexOf('?') < 0) {
    return url;
  }
  var query = url.substr(url.indexOf('?') + 1);
  var route = url.substr(0, url.indexOf('?'));
  if (allParams) {
    return route;
  }
  var params = [];
  if (typeof param === 'object') {
    params = param;
  } else {
    params = [param];
  }
  var queryObj = {};
  var queryList = query.split('&');
  for (var i in queryList) {
    queryList[i] = queryList[i].split('=');
    queryObj[queryList[i][0]] = queryList[i][1];
  }
  for (var _i in params) {
    delete queryObj[params[_i]];
  }
  query = JSON.stringify(queryObj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
  if (!query.length) {
    return route;
  }
  return route + '?' + query;
};exports.deleteUrlParam = deleteUrlParam;

var colorRgba = function colorRgba(sHex) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  // ???????????????????????????????????????
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16??????????????????RGB?????? */
  var sColor = sHex.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //  ????????????????????????
    var sColorChange = [];
    for (var _i2 = 1; _i2 < 7; _i2 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i2, _i2 + 2)));
    }
    // return sColorChange.join(',')
    // ???
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else {
    return sColor;
  }
};exports.colorRgba = colorRgba;

var timer, flag;

/**
                  * ??????????????????????????????????????????????????????
                  *
                  * @param {Function} func ????????????????????????
                  * @param {Number} wait ???????????????
                  * @param {Boolean} immediate ??????????????????
                  * @return null
                  */
var throttle = function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};exports.throttle = throttle;

var timeout = null;

/**
                     * ??????????????????????????????????????????????????????????????????wait????????????????????????
                     *
                     * @param {Function} func ????????????????????????
                     * @param {Number} wait ???????????????
                     * @param {Boolean} immediate ??????????????????
                     * @return null
                     */
var debounce = function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (timeout !== null) clearTimeout(timeout);
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
};exports.debounce = debounce;
var deepClone = function deepClone(obj) {
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
};exports.deepClone = deepClone;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2186:
/*!*******************************************************************************!*\
  !*** F:/myWork/newWork/components/basic-component/app-rich/libs/html2json.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ 2187));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ 2188));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  return /<body.*>([^]*)<\/body>/.test(html) ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.replace(/<!--.*?-->/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/[ ]+</gi, '<').replace(/<script[^]*<\/script>/gi, '').replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  wx.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // ???????????????
  html = removeDOCTYPE(html);
  // ???????????? ?????? js
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  var bufArray = [];

  var results = {
    nodes: [],
    imageUrls: [] };


  var screen = getScreenInfo();
  function Node(tag) {
    this.node = 'element';
    this.tag = tag;
    this.$screen = screen;
  }

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }

        if (name === 'style') {
          node.styleStr = value;
        }

        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // ????????????????????????
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // ???img??????????????????
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }
      // ??????a????????????
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // ??????font??????????????????
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // ????????????source??????
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }


      if (customHandler.start) {
        customHandler.start(node, results);
      }


      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;

/***/ }),

/***/ 2187:
/*!*******************************************************************************!*\
  !*** F:/myWork/newWork/components/basic-component/app-rich/libs/wxDiscode.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML ?????????????????????
function strNumDiscode(str) {
  str = str.replace(/&forall;/g, '???');
  str = str.replace(/&part;/g, '???');
  str = str.replace(/&exist;/g, '???');
  str = str.replace(/&empty;/g, '???');
  str = str.replace(/&nabla;/g, '???');
  str = str.replace(/&isin;/g, '???');
  str = str.replace(/&notin;/g, '???');
  str = str.replace(/&ni;/g, '???');
  str = str.replace(/&prod;/g, '???');
  str = str.replace(/&sum;/g, '???');
  str = str.replace(/&minus;/g, '???');
  str = str.replace(/&lowast;/g, '???');
  str = str.replace(/&radic;/g, '???');
  str = str.replace(/&prop;/g, '???');
  str = str.replace(/&infin;/g, '???');
  str = str.replace(/&ang;/g, '???');
  str = str.replace(/&and;/g, '???');
  str = str.replace(/&or;/g, '???');
  str = str.replace(/&cap;/g, '???');
  str = str.replace(/&cup;/g, '???');
  str = str.replace(/&int;/g, '???');
  str = str.replace(/&there4;/g, '???');
  str = str.replace(/&sim;/g, '???');
  str = str.replace(/&cong;/g, '???');
  str = str.replace(/&asymp;/g, '???');
  str = str.replace(/&ne;/g, '???');
  str = str.replace(/&le;/g, '???');
  str = str.replace(/&ge;/g, '???');
  str = str.replace(/&sub;/g, '???');
  str = str.replace(/&sup;/g, '???');
  str = str.replace(/&nsub;/g, '???');
  str = str.replace(/&sube;/g, '???');
  str = str.replace(/&supe;/g, '???');
  str = str.replace(/&oplus;/g, '???');
  str = str.replace(/&otimes;/g, '???');
  str = str.replace(/&perp;/g, '???');
  str = str.replace(/&sdot;/g, '???');
  return str;
}

// HTML ?????????????????????
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;/g, '??');
  str = str.replace(/&Beta;/g, '??');
  str = str.replace(/&Gamma;/g, '??');
  str = str.replace(/&Delta;/g, '??');
  str = str.replace(/&Epsilon;/g, '??');
  str = str.replace(/&Zeta;/g, '??');
  str = str.replace(/&Eta;/g, '??');
  str = str.replace(/&Theta;/g, '??');
  str = str.replace(/&Iota;/g, '??');
  str = str.replace(/&Kappa;/g, '??');
  str = str.replace(/&Lambda;/g, '??');
  str = str.replace(/&Mu;/g, '??');
  str = str.replace(/&Nu;/g, '??');
  str = str.replace(/&Xi;/g, '??');
  str = str.replace(/&Omicron;/g, '??');
  str = str.replace(/&Pi;/g, '??');
  str = str.replace(/&Rho;/g, '??');
  str = str.replace(/&Sigma;/g, '??');
  str = str.replace(/&Tau;/g, '??');
  str = str.replace(/&Upsilon;/g, '??');
  str = str.replace(/&Phi;/g, '??');
  str = str.replace(/&Chi;/g, '??');
  str = str.replace(/&Psi;/g, '??');
  str = str.replace(/&Omega;/g, '??');

  str = str.replace(/&alpha;/g, '??');
  str = str.replace(/&beta;/g, '??');
  str = str.replace(/&gamma;/g, '??');
  str = str.replace(/&delta;/g, '??');
  str = str.replace(/&epsilon;/g, '??');
  str = str.replace(/&zeta;/g, '??');
  str = str.replace(/&eta;/g, '??');
  str = str.replace(/&theta;/g, '??');
  str = str.replace(/&iota;/g, '??');
  str = str.replace(/&kappa;/g, '??');
  str = str.replace(/&lambda;/g, '??');
  str = str.replace(/&mu;/g, '??');
  str = str.replace(/&nu;/g, '??');
  str = str.replace(/&xi;/g, '??');
  str = str.replace(/&omicron;/g, '??');
  str = str.replace(/&pi;/g, '??');
  str = str.replace(/&rho;/g, '??');
  str = str.replace(/&sigmaf;/g, '??');
  str = str.replace(/&sigma;/g, '??');
  str = str.replace(/&tau;/g, '??');
  str = str.replace(/&upsilon;/g, '??');
  str = str.replace(/&phi;/g, '??');
  str = str.replace(/&chi;/g, '??');
  str = str.replace(/&psi;/g, '??');
  str = str.replace(/&omega;/g, '??');
  str = str.replace(/&thetasym;/g, '??');
  str = str.replace(/&upsih;/g, '??');
  str = str.replace(/&piv;/g, '??');
  str = str.replace(/&middot;/g, '??');
  return str;
}

function strcharacterDiscode(str) {
  // ??????????????????
  str = str.replace(/&nbsp;/g, ' ');
  str = str.replace(/&ensp;/g, '???');
  str = str.replace(/&emsp;/g, '???');
  str = str.replace(/&quot;/g, "'");
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&#8226;/g, '???');

  return str;
}

// HTML ?????????????????????
function strOtherDiscode(str) {
  str = str.replace(/&OElig;/g, '??');
  str = str.replace(/&oelig;/g, '??');
  str = str.replace(/&Scaron;/g, '??');
  str = str.replace(/&scaron;/g, '??');
  str = str.replace(/&Yuml;/g, '??');
  str = str.replace(/&fnof;/g, '??');
  str = str.replace(/&circ;/g, '??');
  str = str.replace(/&tilde;/g, '??');
  str = str.replace(/&ensp;/g, '');
  str = str.replace(/&emsp;/g, '');
  str = str.replace(/&thinsp;/g, '');
  str = str.replace(/&zwnj;/g, '');
  str = str.replace(/&zwj;/g, '');
  str = str.replace(/&lrm;/g, '');
  str = str.replace(/&rlm;/g, '');
  str = str.replace(/&ndash;/g, '???');
  str = str.replace(/&mdash;/g, '???');
  str = str.replace(/&lsquo;/g, '???');
  str = str.replace(/&rsquo;/g, '???');
  str = str.replace(/&sbquo;/g, '???');
  str = str.replace(/&ldquo;/g, '???');
  str = str.replace(/&rdquo;/g, '???');
  str = str.replace(/&bdquo;/g, '???');
  str = str.replace(/&dagger;/g, '???');
  str = str.replace(/&Dagger;/g, '???');
  str = str.replace(/&bull;/g, '???');
  str = str.replace(/&hellip;/g, '???');
  str = str.replace(/&permil;/g, '???');
  str = str.replace(/&prime;/g, '???');
  str = str.replace(/&Prime;/g, '???');
  str = str.replace(/&lsaquo;/g, '???');
  str = str.replace(/&rsaquo;/g, '???');
  str = str.replace(/&oline;/g, '???');
  str = str.replace(/&euro;/g, '???');
  str = str.replace(/&trade;/g, '???');

  str = str.replace(/&larr;/g, '???');
  str = str.replace(/&uarr;/g, '???');
  str = str.replace(/&rarr;/g, '???');
  str = str.replace(/&darr;/g, '???');
  str = str.replace(/&harr;/g, '???');
  str = str.replace(/&crarr;/g, '???');
  str = str.replace(/&lceil;/g, '???');
  str = str.replace(/&rceil;/g, '???');

  str = str.replace(/&lfloor;/g, '???');
  str = str.replace(/&rfloor;/g, '???');
  str = str.replace(/&loz;/g, '???');
  str = str.replace(/&spades;/g, '???');
  str = str.replace(/&clubs;/g, '???');
  str = str.replace(/&hearts;/g, '???');

  str = str.replace(/&diams;/g, '???');
  str = str.replace(/&#39;/g, "'");
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  } else if (Array.isArray(url)) {
    return arrUrl(url, domain);
  }
  return url;
}

function arrUrl(data, domain) {
  for (var i = 0; i < data.length; i++) {
    if (data[i] !== '') {
      if (/^\/\//.test(data[i])) {
        return "https:".concat(data[i]);
      } else if (/^\//.test(data[i])) {
        return "https://".concat(domain).concat(data[i]);
      }
      return data[i];
    }
  }
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ 2188:
/*!********************************************************************************!*\
  !*** F:/myWork/newWork/components/basic-component/app-rich/libs/htmlparser.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);
      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);
      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ 22:
/*!***************************************!*\
  !*** F:/myWork/newWork/core/cache.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.removeStorageSync = exports.getStorageSync = exports.setStorageSync = exports.clearStorage = void 0;
var clearStorage = function clearStorage() {
  uni.clearStorageSync();
};exports.clearStorage = clearStorage;

var setStorageSync = function setStorageSync(key, data) {
  uni.setStorageSync(key, data);
};exports.setStorageSync = setStorageSync;

var getStorageSync = function getStorageSync(key) {
  return uni.getStorageSync(key);
};exports.getStorageSync = getStorageSync;

var removeStorageSync = function removeStorageSync(key) {
  uni.removeStorageSync(key);
};exports.removeStorageSync = removeStorageSync;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 226:
/*!*****************************************!*\
  !*** F:/myWork/newWork/core/all-pay.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var that = null;
var allPay = function allPay(data, sign, _this, item) {
  that = _this;
  switch (sign) {
    case 'advance':
      var body = {
        goods_id: data.goods_id,
        goods_attr_id: data.id,
        goods_num: data.number };

      that.$request({
        url: that.$api.advance.order_submit,
        method: 'post',
        data: _objectSpread({},
        body) }).

      then(function (res) {
        if (res.code === 0) {
          get_token(res.data);
        }
      });
      break;
    case 'gift':
      var select_data = {
        name: item.name,
        price: data.price,
        attr: {
          id: data.id,
          attr_list: data.attr_list,
          stock: data.stock,
          goods_id: data.goods_id },

        attr_str: '',
        pic_url: data.pic_url ? data.pic_url : item.cover_pic,
        number: data.number };

      for (var i = 0; i < data.attr_list.length; i++) {
        select_data.attr_str += "".concat(data.attr_list[i].attr_group_name, ":").concat(data.attr_list[i].attr_name, " ");
      }
      if (that.$storage.getStorageSync('GIFT_CART')) {
        var again = 0;
        var storage = that.$storage.getStorageSync('GIFT_CART');
        for (var _i = 0; _i < storage.length; _i++) {
          if (storage[_i].attr.id === data.id) {
            storage[_i].number += data.number;
          } else {
            again += 1;
          }
        }
        if (again === storage.length) {
          storage.push(select_data);
        }
        that.$storage.setStorageSync('GIFT_CART', storage);
      } else {
        that.$storage.setStorageSync('GIFT_CART', [select_data]);
      }
      uni.showToast({
        title: '????????????',
        icon: 'none' });

      break;
    case "pintuan":
      // that.$jump({
      //     open_type: 'navigate',
      //     url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify(mch_list)}&preview_url=${encodeURIComponent(that.$api.pt.order_preview)}&submit_url=${encodeURIComponent(that.$api.pt.order_submit)}&order_page_url=/plugins/pt/order/order&plugin=pt`
      // });
      break;
    default:
      break;}

};

function get_token(data) {
  that.$request({
    url: that.$api.advance.pay_data,
    method: 'post',
    data: _objectSpread({},
    data) }).

  then(function (res) {
    if (res.code === 0) {
      if (res.data.hasOwnProperty('id')) {
        that.$payment.pay(res.data.id).then(function () {
          // ????????????
          uni.navigateTo({
            url: "/plugins/advance/order/order" });

        }).catch(function () {
          // ????????????
          uni.navigateTo({
            url: "/plugins/advance/order/order" });

        });
      } else {
        setTimeout(function () {
          get_token(data);
        }, 1000);
      }
    } else {
      uni.showModal({
        title: '??????',
        content: res.msg });

    }
  });
}var _default =

allPay;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/apiUrl.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var apiUrl = {
  index: {
    config: "api/index/config",
    newIndex: "api/index/new-index",
    tplIndex: "api/index/tpl-index",
    index: "api/index/index",
    buy_data: "api/index/purchase",
    extra: 'api/index/index-extra',
    status: 'api/index/shop-status' },

  finance: {
    cash: 'api/finance/cash',
    config: 'api/finance/config',
    list: 'api/finance/list' },

  payment: {
    get_payments: "api/payment/get-payments",
    pay_data: "api/payment/pay-data",
    pay_buy_balance: "api/payment/pay-buy-balance",
    pay_buy_huodao: "api/payment/pay-buy-huodao" },

  upload: {
    file: "api/attachment/upload" },

  default: {
    district: "api/default/district",
    goods_list: "api/default/goods-list",
    search_list: "api/default/search-list",
    cart_list: "api/default/cats-list&cat_id=",
    qrcode_parameter: 'api/default/qr-code-parameter',
    cat_list: "api/cat/list",
    cat_goods: "api/cat/goods" },

  passport: {
    login: "api/passport/login" },

  user: {
    user_info: "api/user/user-info",
    address: "api/user/address",
    wechat_district: "api/user/wechat-district",
    address_save: "api/user/address-save",
    address_detail: "api/user/address-detail",
    address_default: "api/user/address-default",
    address_destroy: "api/user/address-destroy",
    auto_address_info: "api/default/auto-address-info",
    my_favorite_goods: "api/user/my-favorite-goods",
    my_favorite_topic: "api/user/my-favorite-topic",
    favorite_add: "api/user/favorite-add",
    favorite_remove: "api/user/favorite-remove",
    favorite_batch_remove: "/api/user/favorite-batch-remove",
    config: 'api/user/config',
    is_clerk: 'api/user/is-clerk-user' },

  article: {
    list: "api/default/article-list",
    detail: "api/default/article" },

  coupon: {
    list: "api/coupon/list",
    detail: "api/coupon/detail",
    receive: "api/coupon/receive",
    user_coupon: "api/coupon/user-coupon",
    user_coupon_detail: "api/coupon/user-coupon-detail",
    share_coupon: "api/coupon/share-coupon",
    give: 'api/coupon/give' },

  city: {
    cityName: "api/default/district",
    goodsList: "api/default/goods-list" },

  balance: {
    index: "api/balance/index",
    logs: "api/balance/logs",
    log_detail: "api/balance/log-detail" },

  order: {
    preview: "api/order/preview",
    submit: "api/order/submit",
    pay_data: "api/order/pay-data",
    usable_coupon_list: "api/order/usable-coupon-list",
    store_list: "api/order/store-list",
    list: "api/order/list",
    detail: "api/order/detail",
    appraise: 'api/order/appraise',
    express_detail: 'api/order/express-detail',
    clerk_affirm_pay: 'api/order/clerk-affirm-pay',
    order_clerk: 'api/order/order-clerk',
    clerk_qr_code: 'api/order/clerk-qr-code',
    apply_refund: 'api/order/apply-refund',
    refund_submit: 'api/order/refund-submit',
    refund_detail: 'api/order/refund-detail',
    refund_send: 'api/order/refund-send',
    confirm: 'api/order/confirm',
    cancel: 'api/order/cancel',
    list_pay_data: 'api/order/list-pay-data',
    pay_result: "api/order/pay-result",
    customer: 'api/express/get-customer',
    delivery: 'api/express/delivery-config',
    order_express_list: 'api/express/order-express-list',
    cancel_cause_list: 'api/order/cancel-cause-list',
    cancel_refund: 'api/order/cancel-refund',
    cancel_apply: 'api/order/cancel-apply',
    city_map: 'api/order/city-map' },

  video: {
    index: 'api/video/index' },

  topic: {
    type: 'api/topic/type',
    list: 'api/topic/list',
    detail: 'api/topic/detail',
    favorite: 'api/topic/favorite',
    qrcode: 'api/qrcode/topic' },

  member: {
    index: 'api/mall-member/index',
    all: 'api/mall-member/all-member',
    coupon: 'api/mall-member/member-coupon',
    goods: 'api/mall-member/member-goods',
    cats: 'api/mall-member/goods-cats',
    purchase: 'api/mall-member/purchase-member',
    receive: 'api/mall-member/coupon-receive',
    detail: 'api/mall-member/detail' },

  recharge: {
    index: 'api/recharge/index',
    setting: 'api/recharge/setting',
    balance_recharge: 'api/recharge/balance-recharge' },

  store: {
    list: "api/store/list",
    detail: "api/store/detail" },

  goods: {
    detail: 'api/goods/detail',
    attr: 'api/goods/attr',
    comments_list: 'api/goods/comments-list',
    recommend: 'api/goods/recommend',
    new_recommend: 'api/goods/new-recommend',
    cat_style: 'api/goods/cat-style',
    goods_video_list: '/api/goods/goods-list',
    poster: '/api/goods/poster',
    hot_search: '/api/goods/hot-search' },

  card: {
    index: 'api/card/user-card',
    detail: 'api/card/user-card-detail',
    qrcode: 'api/card/card-qrcode',
    clerk: 'api/card/card-clerk',
    history: 'api/card/clerk-history',
    give: 'api/card/give',
    receive: 'api/card/receive' },

  share: {
    apply: 'api/share/apply',
    index: 'api/share/index',
    setting: 'api/share/setting',
    customize: 'api/share/customize',
    brokerage: 'api/share/brokerage',
    team: 'api/share/team',
    cash: 'api/share/cash',
    cash_list: 'api/share/cash-list',
    apply_status: 'api/share/apply-status',
    share_order: 'api/share/share-order',
    bind_parent: 'api/share/bind-parent',
    poster: 'api/qrcode/share',
    new_apply_status: 'api/share/new-apply-status',
    level: 'api/share/level',
    level_up: 'api/share/level-up' },

  pond: {
    index: 'plugin/pond/api/pond/index',
    lottery: 'plugin/pond/api/pond/lottery',
    prize: 'plugin/pond/api/pond/prize',
    send: 'plugin/pond/api/pond/send',
    setting: 'plugin/pond/api/pond/setting',
    order_preview: 'plugin/pond/api/pond/order-preview',
    order_submit: 'plugin/pond/api/pond/order-submit',
    poster: 'plugin/pond/api/pond/poster' },

  scratch: {
    index: 'plugin/scratch/api/scratch/index',
    receive: 'plugin/scratch/api/scratch/receive',
    setting: 'plugin/scratch/api/scratch/setting',
    prize: 'plugin/scratch/api/scratch/prize',
    record: 'plugin/scratch/api/scratch/record',
    order_preview: 'plugin/scratch/api/scratch/order-preview',
    order_submit: 'plugin/scratch/api/scratch/order-submit',
    poster: 'plugin/scratch/api/scratch/poster' },

  bonus: {
    order: 'plugin/bonus/api/order/index',
    index: 'plugin/bonus/api/index/index',
    apply: 'plugin/bonus/api/index/apply',
    status: 'plugin/bonus/api/index/apply-status',
    team: 'plugin/bonus/api/order/team-bonus',
    setting: 'plugin/bonus/api/index/setting',
    clear: 'plugin/bonus/api/index/clear-apply',
    cash: 'plugin/bonus/api/index/cash',
    detail: 'plugin/bonus/api/cash/index',
    member: 'plugin/bonus/api/index/all-member',
    data: 'plugin/bonus/api/order/data' },

  lottery: {
    index: 'plugin/lottery/api/lottery/index',
    setting: 'plugin/lottery/api/lottery/setting',
    detail: 'plugin/lottery/api/lottery/detail',
    prize: 'plugin/lottery/api/lottery/prize',
    clerk: 'plugin/lottery/api/lottery/clerk',
    code: 'plugin/lottery/api/lottery/code',
    order_preview: 'plugin/lottery/api/lottery/order-preview',
    order_submit: 'plugin/lottery/api/lottery/order-submit',
    goods: 'plugin/lottery/api/lottery/goods',
    poster: 'plugin/lottery/api/lottery/poster',
    poster_config: 'plugin/lottery/api/poster/config',
    poster_generate: 'plugin/lottery/api/poster/generate' },

  check_in: {
    index: 'plugin/check_in/api/index/index',
    user: 'plugin/check_in/api/index/user',
    customize: 'plugin/check_in/api/index/customize',
    sign_in: 'plugin/check_in/api/index/sign-in',
    sign_in_result: 'plugin/check_in/api/index/sign-in-result',
    sign_in_day: 'plugin/check_in/api/index/sign-in-day' },

  quick: {
    index: "api/quick/index",
    goods_list: "api/quick/goods-list",
    cart: "api/quick/cart" },

  step: {
    index: 'plugin/step/api/step/index',
    setting: 'plugin/step/api/step/setting',
    ranking: 'plugin/step/api/step/ranking',
    goods: 'plugin/step/api/step/goods',
    activity_detail: 'plugin/step/api/step/activity-detail',
    activity: 'plugin/step/api/step/activity',
    activity_log: 'plugin/step/api/step/activity-log',
    activity_join: 'plugin/step/api/step/activity-join',
    activity_submit: 'plugin/step/api/step/activity-submit',
    invite_list: 'plugin/step/api/step/invite-list',
    convert: 'plugin/step/api/step/convert',
    log: 'plugin/step/api/step/log',
    step_convert: 'plugin/step/api/step/step-convert',
    remind: 'plugin/step/api/step/remind',
    order_preview: 'plugin/step/api/step/order-preview',
    order_submit: 'plugin/step/api/step/order-submit',
    goods_detail: 'plugin/step/api/step/goods-detail',
    poster: 'plugin/step/api/step/poster',
    goods_poster: 'plugin/step/api/step/goods-poster',
    receive: 'plugin/step/api/step/receive',

    poster_config: 'plugin/step/api/poster/config',
    poster_generate: 'plugin/step/api/poster/generate' },

  cart: {
    edit: 'api/cart/edit',
    delete: 'api/cart/delete',
    list: 'api/cart/list',
    add: 'api/cart/add' },

  fxhb: {
    index: 'plugin/fxhb/api/index/index',
    join: 'plugin/fxhb/api/index/join',
    join_result: 'plugin/fxhb/api/index/join-result',
    detail: 'plugin/fxhb/api/index/detail',
    recommend: 'plugin/fxhb/api/index/recommend' },

  scan_code_pay: {
    index: 'plugin/scan_code_pay/api/index/index',
    preview: 'plugin/scan_code_pay/api/order/preview',
    submit: 'plugin/scan_code_pay/api/order/submit',
    qr_code: 'plugin/scan_code_pay/api/index/qr-code',
    coupons: 'plugin/scan_code_pay/api/order/coupons',
    cancel: 'plugin/scan_code_pay/api/order/cancel' },

  phone: {
    binding: 'api/phone/binding',
    code: 'api/user/phone-code' },

  book: {
    cats: 'plugin/booking/api/booking/cats',
    clerk_code: 'plugin/booking/api/order-list/clerk-code',
    order_submit: 'plugin/booking/api/order/order-submit',
    order_preview: 'plugin/booking/api/order/order-preview',
    detail: 'plugin/booking/api/goods/detail',
    list: 'plugin/booking/api/goods/list',
    setting: 'plugin/booking/api/booking/setting',
    order_list: 'plugin/booking/api/order-list/index',
    order_detail: 'plugin/booking/api/order-list/detail',
    store_list: 'plugin/booking/api/booking/store-list',
    poster: 'plugin/booking/api/booking/poster',
    poster_config: 'plugin/booking/api/poster/config',
    poster_generate: 'plugin/booking/api/poster/generate' },

  poster: {
    share: 'api/qrcode/share',
    goods: 'api/qrcode/goods',
    topic: 'api/qrcode/topic',
    footprint: 'api/qrcode/footprint',
    goods_new: 'api/qrcode/goods-new',
    card: 'api/card/give-poster',
    coupon: 'api/coupon/give-poster' },

  bargain: {
    banner: 'plugin/bargain/api/index/banner',
    goods_list: 'plugin/bargain/api/goods/list',
    goods_detail: 'plugin/bargain/api/goods/detail',
    list: 'plugin/bargain/api/order/bargain-list',
    bargain_submit: 'plugin/bargain/api/order/bargain-submit',
    bargain_result: 'plugin/bargain/api/order/bargain-result',
    order_preview: 'plugin/bargain/api/order/order-preview',
    order_submit: 'plugin/bargain/api/order/order-submit',
    user_join_bargain: 'plugin/bargain/api/order/user-join-bargain',
    user_join_bargain_result: 'plugin/bargain/api/order/user-join-bargain-result',
    activity: 'plugin/bargain/api/order/activity',
    setting: 'plugin/bargain/api/index/index',
    poster: 'plugin/bargain/api/index/poster',
    poster_config: 'plugin/bargain/api/poster/config',
    poster_generate: 'plugin/bargain/api/poster/generate' },

  integral_mall: {
    index: 'plugin/integral_mall/api/index/index',
    coupon: 'plugin/integral_mall/api/coupon/index',
    cats: 'plugin/integral_mall/api/goods/cats',
    detail: 'plugin/integral_mall/api/coupon/detail',
    goods_detail: 'plugin/integral_mall/api/goods/detail',
    coupon_submit: 'plugin/integral_mall/api/coupon-order/order-submit',
    goods: 'plugin/integral_mall/api/goods/index',
    log: 'api/integral-log/index',
    order: 'plugin/integral_mall/api/order/index',
    coupon_order: 'plugin/integral_mall/api/coupon-order/index',
    order_preview: 'plugin/integral_mall/api/order/order-preview',
    order_submit: 'plugin/integral_mall/api/order/order-submit',
    coupon_pay: 'plugin/integral_mall/api/coupon-order/order-pay-data',
    poster: 'plugin/integral_mall/api/index/poster',
    poster_config: 'plugin/integral_mall/api/poster/config',
    poster_generate: 'plugin/integral_mall/api/poster/generate' },

  pt: {
    index: 'plugin/pintuan/api/v2/index/index',
    goods: 'plugin/pintuan/api/v2/goods/index',
    detail: 'plugin/pintuan/api/v2/goods/detail',
    cats: 'plugin/pintuan/api/v2/goods/cats',
    order_preview: 'plugin/pintuan/api/v2/order/order-preview',
    order_submit: 'plugin/pintuan/api/v2/order/submit',
    list: 'plugin/pintuan/api/v2/order/pintuan-list',
    pt_detail: 'plugin/pintuan/api/v2/order/pintuan-detail',
    order: 'plugin/pintuan/api/v2/order/list',
    poster: 'plugin/pintuan/api/v2/index/poster',
    order_poster: 'plugin/pintuan/api/v2/order/poster',
    poster_config: 'plugin/pintuan/api/v2/poster/config',
    poster_generate: 'plugin/pintuan/api/v2/poster/generate' },

  mch: {
    index: 'plugin/mch/api/mch/index',
    detail: 'plugin/mch/api/mch/detail',
    category: 'plugin/mch/api/mch/category',
    goods: 'plugin/mch/api/goods/index',
    goods_detail: 'plugin/mch/api/goods/detail',
    cat_style: 'plugin/mch/api/goods/cat-style',
    cats_list: 'api/cat/list',
    setting: 'plugin/mch/api/mch/setting',
    visit: 'plugin/mch/api/mch/add-visit',
    order_list: 'plugin/mch/api/order/index',
    order_detail: 'plugin/mch/api/order/detail',
    manage_index: 'plugin/mch/api/mch/manage-index',
    qr_code: 'plugin/mch/api/mch/qr-code',
    qr_code_parameter: 'api/default/qr-code-parameter',
    statistic: 'plugin/mch/api/mch/statistic',
    year_list: 'plugin/mch/api/mch/year-list',
    property: 'plugin/mch/api/property/index',
    account_log: 'plugin/mch/api/property/account-log',
    cash_log: 'plugin/mch/api/property/cash-log',
    order_close_log: 'plugin/mch/api/property/order-close-log',
    cash_submit: 'plugin/mch/api/property/cash-submit',
    order_send: 'plugin/mch/api/order/order-send',
    express_list: 'api/order/express-list',
    refund_detail: 'plugin/mch/api/order/refund-detail',
    mch_status: 'plugin/mch/api/mch/mch-status',
    apply: 'plugin/mch/api/mch/apply',
    login: 'plugin/mch/api/mch/login',
    order_print: 'plugin/mch/api/order/print',
    update_total_price: 'plugin/mch/api/order/update-total-price',
    update_price: 'plugin/mch/api/order/update-price',
    refund_handle: 'plugin/mch/api/order/refund-handle',
    update_password: 'plugin/mch/api/mch/update-password',
    switch_status: 'plugin/mch/api/goods/switch-status',
    destroy: 'plugin/mch/api/goods/destroy',
    cancel: 'plugin/mch/api/order/cancel',
    order_preview: 'plugin/mch/api/order/preview',
    order_submit: 'plugin/mch/api/order/submit',
    apply_status: 'plugin/mch/api/goods/apply-status',
    qr_code_login: 'plugin/mch/api/mch/qr-code-login',
    poster: 'plugin/mch/api/mch/poster',
    edit: 'plugin/mch/api/goods/edit',
    cat: 'plugin/mch/api/goods/cats',
    postage: 'plugin/mch/api/goods/rules',
    service: 'plugin/mch/api/goods/services',
    mch_cat: 'plugin/mch/api/goods/mch-cats',
    poster_config: 'plugin/mch/api/poster/config',
    poster_generate: 'plugin/mch/api/poster/generate',
    update_address: 'plugin/mch/api/order/update-address',
    goods_edit: 'plugin/mch/api/goods/edit',
    delivery_rules: 'plugin/mch/api/goods/free-delivery-rules' },

  app_admin: {
    index: 'api/admin/data-statistics/all_data',
    send: 'api/admin/order/send',
    goods: 'api/admin/goods/index',
    table: 'api/admin/data-statistics/table',
    express: 'api/order/express-list',
    goods_switch: 'api/admin/goods/switch-status',
    goods_destroy: 'api/admin/goods/destroy',
    comments: 'api/admin/order-comments/index',
    comments_top: 'api/admin/order-comments/update-top',
    comments_reply: 'api/admin/order-comments/reply',
    comments_show: 'api/admin/order-comments/show',
    user: 'api/admin/user/index',
    share: 'api/admin/share/index',
    clerk: 'api/admin/user/clerk',
    integral: 'api/admin/user/integral',
    balance: 'api/admin/user/balance',
    setting: 'api/admin/mall/setting',
    review: 'api/admin/review/index',
    tabs: 'api/admin/review/tabs',
    review_detail: 'api/admin/review/detail',
    review_switch: 'api/admin/review/switch-status',
    order: 'api/admin/order/index',
    update_price: 'api/admin/order/update-total-price',
    update_address: 'api/admin/order/update-address',
    address_list: 'api/admin/order/address-list',
    express_detail: 'api/order/express-detail',
    cancel: 'api/admin/order/cancel',
    detail: 'api/admin/order/detail',
    refund: 'api/admin/order/refund',
    refund_handle: 'api/admin/order/refund-handle',
    edit: 'api/admin/goods/edit',
    service: 'api/admin/service/options',
    card: 'api/admin/card/options',
    cat: 'api/admin/cat/options',
    order_num: 'api/admin/order/order-num',
    print: 'api/admin/order/print',
    refund_address: 'api/admin/refund-address/index',
    refund_address_edit: 'api/admin/refund-address/edit',
    clerk_destroy: 'api/admin/user/clerk-destroy',
    address_destroy: 'api/admin/refund-address/destroy',
    clerk_edit: 'api/admin/user/clerk-edit',
    cash: 'api/admin/cash/list',
    verify: 'api/admin/cash/verify',
    user_cash: 'api/admin/cash/cash',
    postage: 'api/admin/postage-rule/all-list',
    delivery_rules: 'api/admin/free-delivery-rules/all-list',
    shou_huo: 'api/admin/order/shou-huo',
    delivery: 'api/admin/order/delivery',
    remark: 'api/admin/user/update-user-remark',
    remarkName: 'api/admin/user/update-user-remark-name',
    level: 'api/admin/user/update-user-level',
    goods_edit: 'api/admin/goods/edit',
    sellerRemark: 'api/admin/order/seller-remark',
    confirm: 'api/admin/order/confirm',
    queue: 'api/admin/review/queue-status',
    cash_save: 'api/admin/cash/save',
    goods_config: "/api/admin/goods/goods-config",
    ecard_api_url: "",
    refund_detail: 'api/admin/order/refund-detail',
    tabs_v2: 'api/admin/v2/review/tabs',
    review_v2: 'api/admin/v2/review/index',
    review_switch_v2: 'api/admin/v2/review/switch-status',
    cash_tabs: 'api/admin/cash/tabs',
    review_detail_v2: 'api/admin/v2/review/detail' },

  clerk: {
    info: 'plugin/clerk/api/index/clerk-info',
    order: 'plugin/clerk/api/index/order',
    my: 'plugin/clerk/api/index/my-order',
    detail: 'plugin/clerk/api/index/detail',
    card: 'plugin/clerk/api/index/card',
    my_card: 'plugin/clerk/api/index/my-card',
    card_detail: 'api/card/user-card-detail',
    statistics: 'plugin/clerk/api/index/statistics',
    qrcode_parameter: 'api/default/qr-code-parameter' },

  miaosha: {
    goods: 'plugin/miaosha/api/v2/goods/index',
    estimate: 'plugin/miaosha/api/v2/goods/estimate',
    goods_detail: 'plugin/miaosha/api/v2/goods/detail',
    cats: 'plugin/miaosha/api/v2/goods/cats',
    goods_info: 'plugin/miaosha/api/v2/goods/miaosha',
    order_preview: 'plugin/miaosha/api/v2/order/order-preview',
    order_submit: 'plugin/miaosha/api/v2/order/submit',
    today_goods: 'plugin/miaosha/api/v2/goods/today-miaosha',
    time_list: 'plugin/miaosha/api/v2/goods/time-list',
    add_cart: 'plugin/miaosha/api/v2/index/add-cart',
    cart_edit: 'plugin/miaosha/api/v2/index/cart-edit',
    poster: 'plugin/miaosha/api/v2/index/poster',
    poster_config: 'plugin/miaosha/api/v2/poster/config',
    poster_generate: 'plugin/miaosha/api/v2/poster/generate' },

  diy: {
    page_store: 'plugin/diy/api/page/store',
    receive: "plugin/diy/api/ad-award/receive",
    coupon_receive: "plugin/diy/api/coupon/receive" },

  vip_card: {
    index: 'plugin/vip_card/api/index/index',
    card: 'plugin/vip_card/api/index/card',
    order_preview: 'plugin/vip_card/api/order/preview',
    card_detail: 'plugin/vip_card/api/index/card-detail',
    setting: 'plugin/vip_card/api/index/setting',
    right: 'plugin/vip_card/api/index/right',
    index_right: 'plugin/vip_card/api/index/index-right',
    order_submit: 'plugin/vip_card/api/order/submit',
    pay_data: 'plugin/vip_card/api/order/pay-data',
    recommend: 'plugin/vip_card/api/index/recommend',
    poster: 'plugin/vip_card/api/index/poster' },

  advance: {
    goods: "plugin/advance/api/goods/index",
    banner: "plugin/advance/api/goods/banner",
    detail: "plugin/advance/api/goods/detail",
    poster: "plugin/advance/api/goods/poster",
    order_submit: "plugin/advance/api/order/advance",
    order: "plugin/advance/api/order/my-advance",
    order_preview: "plugin/advance/api/order/order-preview",
    order_sub: "plugin/advance/api/order/order-submit",
    order_detail: "plugin/advance/api/order/detail",
    pay_data: "plugin/advance/api/order/pay-data",
    get_payments: "plugin/advance/api/payment/get-payments",
    goods_list: "plugin/advance/api/goods/index",
    poster_config: 'plugin/advance/api/poster/config',
    poster_generate: 'plugin/advance/api/poster/generate' },

  gift: {
    order_submit: "/plugin/gift/api/gift-order/order-submit",
    order_preview: "/plugin/gift/api/gift-order/order-preview",
    config: "plugin/gift/api/gift-index/config",
    pay_data: "plugin/gift/api/gift-order/pay-data",
    gift: "plugin/gift/api/gift-index/gift",
    poster: "plugin/gift/api/gift-index/poster",
    send_list: "plugin/gift/api/order-list/send-list",
    send_detail: "plugin/gift/api/order-list/send-detail",
    turn: "plugin/gift/api/gift-order/turn",
    get_turn: "plugin/gift/api/gift-order/get-turn",
    my_join: "plugin/gift/api/gift-join/my-join",
    my_win: "plugin/gift/api/gift-join/my-win",
    win_detail: "plugin/gift/api/gift-join/win-detail",
    join: "plugin/gift/api/gift-join/join",
    join_status: "plugin/gift/api/gift-join/join-status",
    join_detail: "plugin/gift/api/gift-join/join-detail",
    preview: "plugin/gift/api/gift-order/gift-convert-preview",
    convert: "plugin/gift/api/gift-order/gift-convert",
    list: "plugin/gift/api/goods/goods-list",
    goods: "plugin/gift/api/goods/detail",
    cancel: "plugin/gift/api/gift-order/order-cancel" },

  foot: {
    index: 'api/footprint/footprint',
    list: 'api/footprint/index',
    del: 'api/footprint/footprint-del' },

  quick_share: {
    poster_list: "plugin/quick_share/api/goods/poster-list",
    goods: "plugin/quick_share/api/goods/index",
    poster: "plugin/quick_share/api/goods/poster",
    setting: "plugin/quick_share/api/setting/index",
    poster_config: 'plugin/quick_share/api/poster/config',
    poster_generate: 'plugin/quick_share/api/poster/generate' },

  stock: {
    status: 'plugin/stock/api/index/apply-status',
    index: 'plugin/stock/api/index/index',
    setting: 'plugin/stock/api/index/setting',
    apply: 'plugin/stock/api/index/apply',
    clear: 'plugin/stock/api/index/clear-apply',
    cash: 'plugin/stock/api/index/cash',
    detail: 'plugin/stock/api/cash/index',
    level: 'plugin/stock/api/index/level',
    info: 'plugin/stock/api/index/info',
    up: 'plugin/stock/api/index/level-up',
    bonus: 'plugin/stock/api/cash/bonus-detail' },

  region: {
    status: 'plugin/region/api/index/apply-status',
    index: 'plugin/region/api/index/index',
    setting: 'plugin/region/api/index/setting',
    apply: 'plugin/region/api/index/apply',
    clear: 'plugin/region/api/index/clear-apply',
    cash: 'plugin/region/api/index/cash',
    detail: 'plugin/region/api/cash/index',
    level: 'plugin/region/api/index/level',
    info: 'plugin/region/api/index/info',
    level_up: 'plugin/region/api/index/level-up',
    clear_up: 'plugin/region/api/index/clear-level-up' },

  template: {
    template: "api/message/template" },

  pick: {
    goods_list: "plugin/pick/api/index/goods-list",
    goods: "/plugin/pick/api/index/goods-detail",
    order_preview: "/plugin/pick/api/pick-order/order-preview",
    order_submit: "/plugin/pick/api/pick-order/order-submit",
    poster: 'plugin/pick/api/index/poster',
    add: "plugin/pick/api/cart/add",
    list: 'plugin/pick/api/cart/list',
    edit: "plugin/pick/api/cart/edit",
    delete: 'plugin/pick/api/cart/delete',
    poster_config: 'plugin/pick/api/poster/config',
    poster_generate: 'plugin/pick/api/poster/generate' },

  live: {
    index: 'api/live/index',
    playback: 'api/live/play-back' },

  ecard: {
    index: "plugin/ecard/api/index/index" },

  composition: {
    index: "plugin/composition/api/index/index",
    config: "plugin/composition/api/index/config",
    detail: "plugin/composition/api/index/detail",
    composition_detail: "plugin/composition/api/index/composition-detail",
    order_preview: "plugin/composition/api/index/order-preview",
    order_submit: "plugin/composition/api/index/order-submit" },

  favorite: {
    cats: "api/user/favorite-cats",
    my_favorite_goods: 'api/user/my-new-favorite-goods' },

  flash_sale: {
    list: "/plugin/flash_sale/api/index/goods-list",
    detail: "/plugin/flash_sale/api/index/goods-detail",
    add_cart: "/plugin/flash_sale/api/index/add-cart",
    poster_config: 'plugin/flash_sale/api/poster/config',
    poster_generate: 'plugin/flash_sale/api/poster/generate' },

  full_reduce: {
    list: "api/goods/full-reduce-goods-list",
    index: "api/full-reduce/index" },

  community: {
    setting: "plugin/community/api/index/setting-data", //??????
    index: "plugin/community/api/middleman/index", //??????????????????
    apply: "plugin/community/api/middleman/apply", //??????????????????
    apply_result: "plugin/community/api/middleman/apply-result", //????????????
    apply_pay: "plugin/community/api/middleman/apply-pay", //????????????ID
    activity_list: "plugin/community/api/activity/list", //??????????????????
    activity_detail: "plugin/community/api/activity/detail", //??????????????????
    activity_log: "plugin/community/api/activity/log", //??????????????????
    user_activity: "plugin/community/api/activity/user-activity", //??????????????????
    middle_list: "plugin/community/api/order/middle-list", //??????????????????
    middle_detail: "plugin/community/api/order/middle-detail", //??????????????????
    order_list: "plugin/community/api/order/list", //????????????
    order_detail: "plugin/community/api/order/detail", //????????????
    poster: "plugin/community/api/activity/poster-config", //????????????
    middleman_list: "plugin/community/api/middleman/list", //????????????
    cart_add: "plugin/community/api/cart/add", //???????????????
    cart_result: "plugin/community/api/cart/add-result", //?????????????????????
    cart: "plugin/community/api/cart/index", //???????????????
    cart_delete: "plugin/community/api/cart/delete", //???????????????
    cart_edit: "plugin/community/api/cart/edit", //?????????????????????
    goods_config: "plugin/community/api/goods/config", //????????????????????????
    profit_list: "plugin/community/api/middleman/profit-list", //????????????
    profit_detail: "plugin/community/api/middleman/profit-detail", //????????????
    order_preview: "plugin/community/api/order/order-preview", //????????????
    order_submit: "plugin/community/api/order/order-submit", //????????????
    notice: "plugin/community/api/middleman/notice", //????????????
    list: "plugin/community/api/activity/activity-list", //??????????????????
    bind: "plugin/community/api/middleman/bind", //????????????
    goods_detail: "plugin/community/api/goods/detail", //????????????
    switch: "plugin/community/api/goods/switch", //????????????????????????
    edit_address: "plugin/community/api/middleman/edit-address", //????????????????????????
    confirm: "plugin/community/api/order/confirm", //????????????
    goods_generate: "plugin/community/api/goods/generate" },

  exchange: {
    list: "plugin/exchange/api/index/card-goods-list",
    detail: "plugin/exchange/api/index/card-goods-detail",
    me_list: "plugin/exchange/api/index/me-card-list",
    me_detail: 'plugin/exchange/api/index/me-card-detail',
    order_preview: "plugin/exchange/api/index/e-order-preview",
    order_submit: "plugin/exchange/api/index/e-order-submit",
    exchange_preview: "plugin/exchange/api/index/c-order-preview",
    exchange_submit: "plugin/exchange/api/index/c-order-submit",
    setting: "plugin/exchange/api/index/setting",
    log: "plugin/exchange/api/index/me-log",
    info: 'plugin/exchange/api/index/show-info',
    unite: 'plugin/exchange/api/index/unite',
    covert: 'plugin/exchange/api/index/covert',
    log_detail: 'plugin/exchange/api/index/me-log-detail',
    qrcode: 'plugin/exchange/api/index/qrcode',
    poster_generate: 'plugin/exchange/api/poster/generate',
    poster_config: 'plugin/exchange/api/poster/config' },

  wholesale: {
    index: "plugin/wholesale/api/goods/index",
    detail: "plugin/wholesale/api/goods/detail",
    cart: 'plugin/wholesale/api/cart/add-cart',
    order_preview: 'plugin/wholesale/api/order/order-preview',
    order_submit: 'plugin/wholesale/api/order/order-submit',
    poster_config: 'plugin/wholesale/api/poster/config',
    poster_generate: 'plugin/wholesale/api/poster/generate' } };var _default =



apiUrl;exports.default = _default;

/***/ }),

/***/ 24:
/*!*********************************************!*\
  !*** F:/myWork/newWork/core/appOnLaunch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _apiUrl = _interopRequireDefault(__webpack_require__(/*! ./apiUrl.js */ 23));
var _siteinfo = _interopRequireDefault(__webpack_require__(/*! ../siteinfo.js */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var spliceUrl = function spliceUrl(ip, apiUrl) {
  var newUrl = {};
  for (var k in apiUrl) {
    var newOb = _defineProperty({},
    k, {});

    for (var i in apiUrl[k]) {
      newOb[k][i] = "".concat(ip).concat(apiUrl[k][i]);
    }
    newUrl[k] = newOb[k];
  }
  return newUrl;
};

var appendApiUrl = function appendApiUrl(siteInfo) {
  var apiRoot = '';
  if (siteInfo.acid > 0) {
    var scriptUrl = siteInfo.siteroot.substr(0, siteInfo.siteroot.indexOf('app/index.php')) +
    'addons/zjhj_bd/web/index.php';
    apiRoot = scriptUrl + '?_acid=' + siteInfo.acid + '&r=';
  } else {
    apiRoot = siteInfo.apiroot + '&r=';
  }
  return spliceUrl(apiRoot, _apiUrl.default);
};var _default =

appendApiUrl(_siteinfo.default);exports.default = _default;

/***/ }),

/***/ 25:
/*!*************************************!*\
  !*** F:/myWork/newWork/siteinfo.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var siteinfo = {
  'acid': -1,
  'version': '4.3.57',
  'siteroot': 'https://t12.9026.com/app/index.php',
  'apiroot': 'https://t12.9026.com/web/index.php?_mall_id=21989' };

module.exports = siteinfo;

/***/ }),

/***/ 26:
/*!***************************************!*\
  !*** F:/myWork/newWork/core/event.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function MyPromise(resolve) {
  this.resolveFunc = function () {
  };
  this.rejectFunc = function () {
  };
  resolve(this.resolve.bind(this), this.reject.bind(this));
}

MyPromise.prototype.resolve = function (val) {var _this = this;
  setTimeout(function () {
    _this.resolveFunc(val);
  }, 0);
};

MyPromise.prototype.reject = function (val) {var _this2 = this;
  setTimeout(function () {
    _this2.rejectFunc(val);
  }, 0);
};

MyPromise.prototype.then = function (resolve, reject) {
  this.resolveFunc = resolve;
  this.rejectFunc = reject;
  return this;
};

module.exports = {
  _resolveStorage: {},
  _addResolve: function _addResolve(eventName, resolve, removeEventAfterTrigger) {
    if (!this._resolveStorage[eventName]) {
      this._resolveStorage[eventName] = [];
    }
    this._resolveStorage[eventName].push({
      resolve: resolve,
      removeEventAfterTrigger: removeEventAfterTrigger });

  },
  /**
      * ???????????????
      * @param eventName
      * @param removeEventAfterTrigger
      * @returns {Promise<any>}
      */
  on: function on(eventName, removeEventAfterTrigger) {var _this3 = this;
    return new MyPromise(function (fn) {
      if (typeof removeEventAfterTrigger === 'undefined') {
        removeEventAfterTrigger = true;
      }
      _this3._addResolve(eventName, fn, removeEventAfterTrigger);
    });
  },
  /**
      * ????????????
      * @param eventName
      * @param e ????????????????????????
      */
  trigger: function trigger(eventName, e) {
    if (!this._resolveStorage[eventName] || !this._resolveStorage[eventName].length) {
      return;
    }
    var saveEvens = [];
    for (var i in this._resolveStorage[eventName]) {
      this._resolveStorage[eventName][i].resolve(e);
      if (!this._resolveStorage[eventName][i].removeEventAfterTrigger) {
        saveEvens.push(this._resolveStorage[eventName][i]);
      }
    }
    this._resolveStorage[eventName] = saveEvens;
  } };

/***/ }),

/***/ 27:
/*!***************************************!*\
  !*** F:/myWork/newWork/core/const.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  EVENT_USER_LOGIN: 'event_user_login', // ??????????????????
  EVENT_USER_REGISTER: 'event_user_register', // ??????????????????
  EVENT_VIDEO_END: 'event_video_end', // ????????????????????????
  EVENT_POPUP: 'popUpEvent' // ????????????????????????
};exports.default = _default;

/***/ }),

/***/ 28:
/*!**************************************************************!*\
  !*** F:/myWork/newWork/store/modules/globalConfiguration.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  reportAndError: {
    boolean: false,
    content: '??????????????????????????? ?????????????????????~' },

  tabBarBoolean: false,
  systemInfo: {
    SDKVersion: "",
    batteryLevel: 0,
    brand: "",
    errMsg: "",
    fontSizeSetting: 0,
    language: "0",
    model: "",
    pixelRatio: 0,
    platform: "",
    safeArea: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0 },

    screenHeight: 0,
    screenWidth: 0,
    statusBarHeight: 0,
    system: "",
    version: "",
    windowHeight: 0,
    windowWidth: 0 },

  tabBarHeight: 0,
  iphone: false,
  iphoneHeight: 0,
  promptBox: {
    text: '',
    show: false,
    call: -1 },

  imageWidth: 0 };


var getters = {
  reportAndErrorObj: function reportAndErrorObj(state) {
    return state.reportAndError;
  } };


var mutations = {
  reportAndErrorObj: function reportAndErrorObj(state, data) {
    state.reportAndError = data;
  },
  reportAndErrorB: function reportAndErrorB(state, data) {
    state.reportAndError.boolean = data;
  },
  setTabBarBoolean: function setTabBarBoolean(state, data) {
    var pages = getCurrentPages();
    var currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    var currentRoute = undefined;


    currentRoute = "/".concat(currPage.route.split("?")[0]);





    for (var i = 0; i < data.length; i++) {
      if (currentRoute.includes(data[i].url.split('?')[0])) {
        return state.tabBarBoolean = true;
      }
    }
    return state.tabBarBoolean = false;
  },
  setSystemInfo: function setSystemInfo(state, data) {
    state.systemInfo = data;
    state.imageWidth = data.windowWidth;
  },
  setPromptBox: function setPromptBox(state, data) {
    state.promptBox = data;
  },
  setPromptBoxCall: function setPromptBoxCall(state, data) {
    state.promptBox.call = data;
  },
  setHeight: function setHeight(state, data) {
    state.tabBarHeight = data;
  },
  setiPhoneHeight: function setiPhoneHeight(state, data) {
    state.iphoneHeight = data;
  },
  setiPhoneBoolean: function setiPhoneBoolean(state, data) {
    state.iphone = data;
  },
  setImageWidth: function setImageWidth(state, data) {
    state.imageWidth = state.systemInfo.windowWidth - state.systemInfo.windowWidth / 750 * data;
  } };


var actions = {
  setImageWidth: function setImageWidth(content, data) {
    content.commit('setImageWidth', data);
  },
  reportAndErrorObj: function reportAndErrorObj(content, data) {
    content.commit('reportAndErrorObj', data);
  },
  reportAndErrorB: function reportAndErrorB(content, data) {
    content.commit('reportAndErrorB', data);
  },
  setTabBarBoolean: function setTabBarBoolean(content, data) {
    content.commit('setTabBarBoolean', data);
  },
  setSystemInfo: function setSystemInfo(content, data) {
    content.commit('setSystemInfo', data);
  },
  setHeight: function setHeight(content, data) {
    content.commit('setHeight', data);
  },
  setiPhoneBoolean: function setiPhoneBoolean(content, data) {
    content.commit('setiPhoneBoolean', data);
  },
  setPromptBox: function setPromptBox(content, data) {
    content.commit('setPromptBox', data);
  },
  setPromptBoxCall: function setPromptBoxCall(content, data) {
    content.commit('setPromptBoxCall', data);
  },
  setiPhoneHeight: function setiPhoneHeight(content, data) {
    content.commit('setiPhoneHeight', data);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 283:
/*!********************************************************!*\
  !*** F:/myWork/newWork/pages/address/address-parse.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ????????????????????????type??????????????????????????????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param address
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param options???type??? 0:?????????1????????????, textFilter??? ???????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @returns {{}|({area: Array, province: Array, phone: string, city: Array, name: string, detail: Array} & {area: (*|string), province: (*|string), city: (*|string), detail: (Array|boolean|string|string)})}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
var AddressParse = function AddressParse(address, options, provinceString, cityString, areaString) {var _ref =
  typeof options === 'object' ? options : {},_ref$type = _ref.type,type = _ref$type === void 0 ? 0 : _ref$type,_ref$textFilter = _ref.textFilter,textFilter = _ref$textFilter === void 0 ? [] : _ref$textFilter;

  if (!address) {
    return {};
  }

  var parseResult = {
    phone: '',
    province: [],
    city: [],
    area: [],
    detail: [],
    name: '' };

  address = cleanAddress(address, textFilter);

  // ???????????????
  var resultPhone = filterPhone(address);
  address = resultPhone.address;
  parseResult.phone = resultPhone.phone;

  var resultCode = filterPostalCode(address);
  address = resultCode.address;
  parseResult.postalCode = resultCode.postalCode;

  // ????????????
  var splitAddress = address.split(' ').filter(function (item) {return item;}).map(function (item) {return item.trim();});

  // ???????????????????????????
  splitAddress.forEach(function (item) {
    // ????????????
    if (!parseResult.province[0] || !parseResult.city[0] || !parseResult.area[0]) {
      // ????????????????????????????????????????????????
      var parse;
      type === 1 && (parse = parseRegion(item, parseResult));
      type === 0 && (parse = parseRegionWithRegexp(item, parseResult, provinceString, cityString, areaString));var _parse =
      parse,_province = _parse.province,_city = _parse.city,_area = _parse.area,_detail = _parse.detail;
      parseResult.province = _province || [];
      parseResult.area = _area || [];
      parseResult.city = _city || [];
      parseResult.detail = parseResult.detail.concat(_detail || []);
    } else {
      parseResult.detail.push(item);
    }
  });

  // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  if (!parseResult.name) {
    var _detail2 = JSON.parse(JSON.stringify(parseResult.detail));
    _detail2.sort(function (a, b) {return a.length - b.length;});
    parseResult.name = _detail2[0];
    var nameIndex = parseResult.detail.findIndex(function (item) {return item === parseResult.name;});
    parseResult.detail.splice(nameIndex, 1);
  }

  var province = parseResult.province[0];
  var city = parseResult.city[0];
  var area = parseResult.area[0];
  var detail = parseResult.detail;

  return Object.assign(parseResult, {
    province: province && province.name || '',
    city: city && city.name || '',
    area: area && area.name || '',
    detail: detail && detail.length > 0 && detail.join('') || '' });

};

/**
    * ???????????????????????????
    * @param fragment
    * @param hasParseResult
    * @returns {{area: (Array|*|string), province: (Array|*|string), city: (Array|*|string|string), detail: (*|Array)}}
    */
var parseRegionWithRegexp = function parseRegionWithRegexp(fragment, hasParseResult, provinceString, cityString, areaString) {
  // log('----- ?????????????????????????????? -----')
  var province = hasParseResult.province || [],city = hasParseResult.city || [],area = hasParseResult.area || [],
  detail = [];

  var matchStr = '';
  if (province.length === 0) {
    for (var i = 1; i < fragment.length; i++) {
      var str = fragment.substring(0, i + 1);
      var regexProvince = new RegExp("{\"code\":\"[0-9]{1,6}\",\"name\":\"".concat(str, "[\u4E00-\u9FA5]*?\"}"), 'g');
      var matchProvince = provinceString.match(regexProvince);
      if (matchProvince) {
        var provinceObj = JSON.parse(matchProvince[0]);
        if (matchProvince.length === 1) {
          province = [];
          matchStr = str;
          province.push(provinceObj);
        }
      } else {
        break;
      }
    }

    if (province[0]) {
      fragment = fragment.replace(matchStr, '');
    }

  }

  if (city.length === 0) {
    for (var _i = 1; _i < fragment.length; _i++) {
      var _str = fragment.substring(0, _i + 1);
      var regexCity = new RegExp("{\"code\":\"[0-9]{1,6}\",\"name\":\"".concat(_str, "[\u4E00-\u9FA5]*?\",\"provinceCode\":\"").concat(province[0] ? "".concat(province[0].code) : '[0-9]{1,6}', "\"}"), 'g');
      var matchCity = cityString.match(regexCity);
      if (matchCity) {
        var cityObj = JSON.parse(matchCity[0]);
        if (matchCity.length === 1) {
          city = [];
          matchStr = _str;
          city.push(cityObj);
        }
      } else {
        break;
      }
    }
    if (city[0]) {var
      provinceCode = city[0].provinceCode;
      fragment = fragment.replace(matchStr, '');
      if (province.length === 0) {
        var _regexProvince = new RegExp("{\"code\":\"".concat(provinceCode, "\",\"name\":\"[\u4E00-\u9FA5]+?\"}"), 'g');
        var _matchProvince = provinceString.match(_regexProvince);
        province.push(JSON.parse(_matchProvince[0]));
      }
    }

  }

  if (area.length === 0) {
    for (var _i2 = 1; _i2 < fragment.length; _i2++) {
      var _str2 = fragment.substring(0, _i2 + 1);
      var regexArea = new RegExp("{\"code\":\"[0-9]{1,6}\",\"name\":\"".concat(_str2, "[\u4E00-\u9FA5]*?\",\"cityCode\":\"").concat(city[0] ? city[0].code : '[0-9]{1,6}', "\",\"provinceCode\":\"").concat(province[0] ? "".concat(province[0].code) : '[0-9]{1,6}', "\"}"), 'g');
      var matchArea = areaString.match(regexArea);
      if (matchArea) {
        var areaObj = JSON.parse(matchArea[0]);
        if (matchArea.length === 1) {
          area = [];
          matchStr = _str2;
          area.push(areaObj);
        }
      } else {
        break;
      }
    }
    if (area[0]) {var _area$ =
      area[0],_provinceCode = _area$.provinceCode,cityCode = _area$.cityCode;
      fragment = fragment.replace(matchStr, '');
      if (province.length === 0) {
        var _regexProvince2 = new RegExp("{\"code\":\"".concat(_provinceCode, "\",\"name\":\"[\u4E00-\u9FA5]+?\"}"), 'g');
        var _matchProvince2 = provinceString.match(_regexProvince2);
        province.push(JSON.parse(_matchProvince2[0]));
      }
      if (city.length === 0) {
        var _regexCity = new RegExp("{\"code\":\"".concat(cityCode, "\",\"name\":\"[\u4E00-\u9FA5]+?\",\"provinceCode\":\"").concat(_provinceCode, "\"}"), 'g');
        var _matchCity = cityString.match(_regexCity);
        city.push(JSON.parse(_matchCity[0]));
      }
    }
  }


  // ??????????????????????????????????????????????????????????????????
  if (fragment.length > 0) {
    detail.push(fragment);
  }

  return {
    province: province,
    city: city,
    area: area,
    detail: detail };

};

/**
    * ???????????????????????????
    * @param fragment
    * @param hasParseResult
    * @returns {{area: Array, province: Array, city: Array, detail: Array}}
    */
var parseRegion = function parseRegion(fragment, hasParseResult) {
  // log('----- ??????????????????????????? -----')
  var province = [],city = [],area = [],detail = [];

  if (hasParseResult.province[0]) {
    province = hasParseResult.province;
  } else {
    // ??????????????????
    var _iterator = _createForOfIteratorHelper(provinces),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var tempProvince = _step.value;var
        name = tempProvince.name;
        var replaceName = '';
        for (var i = name.length; i > 1; i--) {
          var temp = name.substring(0, i);
          if (fragment.indexOf(temp) === 0) {
            replaceName = temp;
            break;
          }
        }
        if (replaceName) {
          province.push(tempProvince);
          fragment = fragment.replace(replaceName, '');
          break;
        }
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }
  if (hasParseResult.city[0]) {
    city = hasParseResult.city;
  } else {
    // ?????????????????????
    var _iterator2 = _createForOfIteratorHelper(cities),_step2;try {var _loop = function _loop() {var tempCity = _step2.value;var
        name = tempCity.name,provinceCode = tempCity.provinceCode;
        var currentProvince = province[0];
        // ??????
        if (currentProvince) {
          if (currentProvince.code === provinceCode) {
            var _replaceName = '';
            for (var _i3 = name.length; _i3 > 1; _i3--) {
              var _temp = name.substring(0, _i3);
              if (fragment.indexOf(_temp) === 0) {
                _replaceName = _temp;
                break;
              }
            }
            if (_replaceName) {
              city.push(tempCity);
              fragment = fragment.replace(_replaceName, '');
              return "break";
            }
          }
        } else {
          // ??????????????????????????????
          for (var _i4 = name.length; _i4 > 1; _i4--) {
            var _replaceName2 = name.substring(0, _i4);
            if (fragment.indexOf(_replaceName2) === 0) {
              city.push(tempCity);
              province.push(provinces.find(function (item) {return item.code === provinceCode;}));
              fragment = fragment.replace(_replaceName2, '');
              break;
            }
          }
          if (city.length > 0) {
            return "break";
          }
        }};for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _ret = _loop();if (_ret === "break") break;
      }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
  }

  // ????????????????????????
  var _iterator3 = _createForOfIteratorHelper(areas),_step3;try {var _loop2 = function _loop2() {var tempArea = _step3.value;var
      name = tempArea.name,provinceCode = tempArea.provinceCode,cityCode = tempArea.cityCode;
      var currentProvince = province[0];
      var currentCity = city[0];

      // ???????????????
      if (currentProvince || currentCity) {
        if (currentProvince && currentProvince.code === provinceCode ||
        (currentCity && currentCity.code) === cityCode) {
          var _replaceName3 = '';
          for (var _i5 = name.length; _i5 > 1; _i5--) {
            var _temp2 = name.substring(0, _i5);
            if (fragment.indexOf(_temp2) === 0) {
              _replaceName3 = _temp2;
              break;
            }
          }
          if (_replaceName3) {
            area.push(tempArea);
            !currentCity && city.push(cities.find(function (item) {return item.code === cityCode;}));
            !currentProvince && province.push(provinces.find(function (item) {return item.code === provinceCode;}));
            fragment = fragment.replace(_replaceName3, '');
            return "break";
          }
        }
      } else {
        // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        for (var _i6 = name.length; _i6 > 1; _i6--) {
          var _replaceName4 = name.substring(0, _i6);
          if (fragment.indexOf(_replaceName4) === 0) {
            area.push(tempArea);
            city.push(cities.find(function (item) {return item.code === cityCode;}));
            province.push(provinces.find(function (item) {return item.code === provinceCode;}));
            fragment = fragment.replace(_replaceName4, '');
            break;
          }
        }
        if (area.length > 0) {
          return "break";
        }
      }};for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _ret2 = _loop2();if (_ret2 === "break") break;
    }

    // ??????????????????????????????????????????????????????????????????
  } catch (err) {_iterator3.e(err);} finally {_iterator3.f();}if (fragment.length > 0) {
    detail.push(fragment);
  }

  return {
    province: province,
    city: city,
    area: area,
    detail: detail };

};

/**
    * ????????????
    * @param address
    * @returns {{address: *, phone: string}}
    */
var filterPhone = function filterPhone(address) {
  var phone = '';
  // ??????????????????
  address = address.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3');
  address = address.replace(/(\d{3}) (\d{4}) (\d{4})/g, '$1$2$3');
  address = address.replace(/(\d{4}) \d{4} \d{4}/g, '$1$2$3');
  address = address.replace(/(\d{4})/g, '$1');

  var mobileReg = /(\d{7,12})|(\d{3,4}-\d{6,8})|(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g;
  var mobile = mobileReg.exec(address);
  if (mobile) {
    phone = mobile[0];
    address = address.replace(mobile[0], ' ');
  }
  return { address: address, phone: phone };
};

/**
    * ????????????
    * @param address
    * @returns {{address: *, postalCode: string}}
    */
var filterPostalCode = function filterPostalCode(address) {
  var postalCode = '';
  var postalCodeReg = /\d{6}/g;
  var code = postalCodeReg.exec(address);
  if (code) {
    postalCode = code[0];
    address = address.replace(code[0], ' ');
  }
  return { address: address, postalCode: postalCode };
};

/**
    * ????????????
    * @param address
    * @returns {*}
    */
var cleanAddress = function cleanAddress(address) {var textFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // ????????????
  address = address.
  replace(/\r\n/g, ' ').
  replace(/\n/g, ' ').
  replace(/\t/g, ' ');

  // ??????????????????????????????????????????
  var search = [
  '????????????',
  '????????????',
  '????????????',
  '??????',
  '????????????',
  '??????',
  '??????',
  '?????????',
  '?????????',
  '?????????',
  '???',
  '??????',
  '????????????',
  '??????',
  '?????????????????????',
  '????????????',
  '?????????'].
  concat(textFilter);
  search.forEach(function (str) {
    address = address.replace(new RegExp(str, 'g'), ' ');
  });

  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]\.<>/?~???@#?????????&*????????????|{}????????????????????????????????????]", 'g');
  address = address.replace(pattern, ' ');

  // ????????????replace?????????
  address = address.replace(/ {2,}/g, ' ');

  return address;
};var _default =

AddressParse;exports.default = _default;

/***/ }),

/***/ 29:
/*!************************************************!*\
  !*** F:/myWork/newWork/store/modules/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _appOnLaunch = _interopRequireDefault(__webpack_require__(/*! ../../core/appOnLaunch.js */ 24));
var _request = _interopRequireDefault(__webpack_require__(/*! ../../core/request.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var state = {
  home_pages: {},
  type: '' };


var getters = {};

var mutations = {
  getHomePages: function getHomePages(state, data) {
    state.type = data.type;
    state.home_pages = data.home_pages;
  } };


var actions = {
  getHomePages: function getHomePages(content) {
    (0, _request.default)({ url: "".concat(_appOnLaunch.default.index.index, "&page_id=0&longitude=&latitude=") }).then(function (res) {
      content.commit('getHomePages', res.data);
    });
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!******************************************************!*\
  !*** F:/myWork/newWork/store/modules/orderSubmit.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  formData: null,
  mchNoCouponStatusList: [] };


var getters = {
  getMchNoCouponStatusList: function getMchNoCouponStatusList(state) {
    return state.mchNoCouponStatusList;
  } };


var mutations = {
  mutSetFormData: function mutSetFormData(state, data) {
    state.formData = data;
  },
  mutSetMchNoCouponStatusList: function mutSetMchNoCouponStatusList(state, data) {
    state.mchNoCouponStatusList = data;
  } };


var actions = {};var _default =

{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 31:
/*!*****************************************************!*\
  !*** F:/myWork/newWork/store/modules/pagination.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  year: 1 };var _default =


{
  namespaced: true,
  state: state };exports.default = _default;

/***/ }),

/***/ 32:
/*!**************************************************!*\
  !*** F:/myWork/newWork/store/modules/loading.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var state = {
  type: 'global',
  text: '?????????',
  color: '#ffffff',
  backgroundImage: '',
  isShow: false };


var getters = {
  getType: function getType(state) {
    return state.type;
  },
  getText: function getText(state) {
    return state.text;
  },
  getColor: function getColor(state) {
    return state.color;
  },
  getBackgroundImage: function () {var _getBackgroundImage = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(state) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt("return",
              state.backgroundImage);case 1:case "end":return _context.stop();}}}, _callee);}));function getBackgroundImage(_x) {return _getBackgroundImage.apply(this, arguments);}return getBackgroundImage;}(),

  getIsShow: function getIsShow(state) {
    return state.isShow;
  } };


var mutations = {
  mutSetLoading: function mutSetLoading(state, data) {
    for (var key in data) {
      state[key] = data[key];
    }
    if (!state.backgroundImage) {
      _vue.default.prototype.$mallConfig.getConfig().then(function (config) {
        state.backgroundImage = config.__wxapp_img.mall.loading;
      });
    }
  } };


var actions = {
  actionGetLoading: function actionGetLoading(context, data) {
    context.commit('mutSetLoading', data);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 33:
/*!**************************************************!*\
  !*** F:/myWork/newWork/store/modules/payment.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  id: null,
  showPayment: false,
  payData: null,
  payType: null,
  resolve: null,
  reject: null };


var getters = {
  id: function id(state) {
    return state.id;
  },
  showPayment: function showPayment(state) {
    return state.showPayment;
  },
  payData: function payData(state) {
    return state.payData;
  },
  payType: function payType(state) {
    return state.payType;
  },
  resolve: function resolve(state) {
    return state.resolve;
  },
  reject: function reject(state) {
    return state.reject;
  } };


var mutations = {
  id: function id(state, data) {
    state.id = data;
  },
  showPayment: function showPayment(state, data) {
    state.showPayment = data;
  },
  payData: function payData(state, data) {
    state.payData = data;
  },
  payType: function payType(state, data) {
    state.payType = data;
  },
  resolve: function resolve(state, data) {
    state.resolve = data;
  },
  reject: function reject(state, data) {
    state.reject = data;
  },
  setAll: function setAll(state, data) {
    for (var k in data) {
      state[k] = data[k];
    }
  } };


var actions = {
  reset: function reset(context) {
    context.commit('id', null);
    context.commit('showPayment', false);
    context.commit('payData', null);
    context.commit('payType', null);
    context.commit('resolve', null);
    context.commit('reject', null);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 34:
/*!***************************************************!*\
  !*** F:/myWork/newWork/store/modules/scanCode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  userCoupon: null };


var mutations = {
  mutSetUserCoupon: function mutSetUserCoupon(state, data) {
    state.userCoupon = data;
  } };


var actions = {};var _default =


{
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 35:
/*!***********************************************!*\
  !*** F:/myWork/newWork/store/modules/page.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  scrollTop: 0,
  isScanQrCode: false,
  coupon: {
    list: [],
    type: '' },

  query: null };


var getters = {
  getScrollTop: function getScrollTop(state) {
    return state.scrollTop;
  },
  getIsScanQrCode: function getIsScanQrCode(state) {
    return state.isScanQrCode;
  },
  getCoupon: function getCoupon(state) {
    return state.coupon;
  },
  getQuery: function getQuery(state) {
    return state.query;
  } };


var mutations = {
  mutSetScrollTop: function mutSetScrollTop(state, data) {
    state.scrollTop = data;
  },
  mutSetIsScanQrCode: function mutSetIsScanQrCode(state, data) {
    state.isScanQrCode = data;
  },
  mutSetCoupon: function mutSetCoupon(state, data) {
    state.coupon = data;
  },
  mutSetQuery: function mutSetQuery(state, data) {
    state.query = data;
  } };


var actions = {
  actionSetScrollTop: function actionSetScrollTop(context, data) {
    context.commit('mutSetScrollTop', data);
  },
  actionSetIsScanQrCode: function actionSetIsScanQrCode(context, data) {
    context.commit('mutSetIsScanQrCode', data);
  },
  actionSetCoupon: function actionSetCoupon(context, data) {
    context.commit('mutSetCoupon', data);
  },
  actionSetQeury: function actionSetQeury(context, data) {
    context.commit('mutSetQuery', data);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 3541:
/*!**********************************************************************************!*\
  !*** F:/myWork/newWork/components/page-component/app-check-in/check-in-award.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ../../../core/request.js */ 16));
var _appOnLaunch = _interopRequireDefault(__webpack_require__(/*! ../../../core/appOnLaunch.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  getAward: function getAward(status, day) {var _this = this;
    return new Promise(function (resolve, reject) {
      (0, _request.default)({
        url: _appOnLaunch.default.check_in.sign_in,
        data: {
          status: status,
          day: day ? day : 1 } }).

      then(function (response) {
        if (response.code == 0) {
          _this.checkInResult(response.data.queueId, response.data.token).then(function (result) {
            return resolve(result);
          }).catch(function (e) {
            return reject(e);
          });
        } else {
          return reject(response.msg);
        }
      }).catch(function (response) {
        return reject(response);
      });
    });
  },
  checkInResult: function checkInResult(queueId, token) {var _this2 = this;
    return new Promise(function (resolve, reject) {
      (0, _request.default)({
        url: _appOnLaunch.default.check_in.sign_in_result,
        data: {
          queueId: queueId,
          token: token } }).

      then(function (response) {
        if (response.code == 0) {
          if (response.data.retry == 1) {
            _this2.checkInResult(queueId, token).then(function (result) {
              return resolve(result);
            }).catch(function (e) {
              return reject(e);
            });
          } else {
            return resolve(response.data);
          }
        } else {
          return reject(response.msg);
        }
      }).catch(function (response) {
        return reject(response);
      });
    });
  } };exports.default = _default;

/***/ }),

/***/ 36:
/*!*****************************************************!*\
  !*** F:/myWork/newWork/store/modules/userCenter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var state = {
  data: {} };




var getters = {
  data: function data(state) {
    return state.data;
  } };


var mutations = {
  data: function data(state, _data) {
    state.data = _data;
  } };


var actions = {
  data: function data(context) {
    _vue.default.prototype.$request({
      url: _vue.default.prototype.$api.user.config }).
    then(function (res) {var
      data = res.data,code = res.code;
      if (code === 0) {
        var config = data.config;
        if (data && config && config.user_center) {
          context.commit('data', config.user_center);
        }
      }
    });
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 37:
/*!**************************************************!*\
  !*** F:/myWork/newWork/store/modules/iphoneX.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  emptyHeight: 0,
  botNavHei: 110,
  XBoolean: false };


var getters = {
  getBoolEmpty: function getBoolEmpty(state) {
    return {
      emptyHeight: state.emptyHeight,
      XBoolean: state.XBoolean };

  },
  getNavHei: function getNavHei(state) {
    return state.botNavHei;
  },
  getBotHeight: function getBotHeight(state) {
    return state.emptyHeight + state.botNavHei;
  },
  getAll: function getAll(state) {
    return state;
  },
  getEmpty: function getEmpty(state) {
    return state.emptyHeight;
  } };


var mutations = {
  setXBoolean: function setXBoolean(state, data) {
    state.XBoolean = data;
  },
  setEmptyHeight: function setEmptyHeight(state, data) {
    state.emptyHeight = data;
  } };


var actions = {
  setIphone: function setIphone(content, data) {








    if (data.model.indexOf('iPhone X') > -1 || data.model.indexOf('iPhone12') > -1 || data.model.indexOf('iPhone 11') > -1) {
      content.commit('setXBoolean', true);
      content.commit('setEmptyHeight', 50);
    }















  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 38:
/*!***********************************************!*\
  !*** F:/myWork/newWork/store/modules/gift.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ../../core/request.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var state = {
  theme: '',
  address_id: '',
  store_id: '',
  form_data: {},
  big_gift_pic: '' };


var getters = {};


var mutations = {
  addressId: function addressId(state, data) {
    state.address_id = data;
  },
  storeId: function storeId(state, data) {
    state.store_id = data;
  },
  setGiftPic: function setGiftPic(state, data) {
    state.big_gift_pic = data;
  },
  setTheme: function setTheme(state, data) {
    switch (data) {
      case 1:
        state.theme = 'streamer-gold-gift';
        break;
      case 2:
        state.theme = 'romantic-powder-gift';
        break;
      case 3:
        state.theme = 'taste-red-gift';
        break;
      case 4:
        state.theme = 'elegant-purple-gift';
        break;
      case 5:
        state.theme = 'fresh-green-gift';
        break;
      case 6:
        state.theme = 'business-blue-gift';
        break;
      default:
        state.theme = 'streamer-gold-gift';}

  },
  setFormData: function setFormData(state, data) {
    state.form_data = data;
  } };


var actions = {
  // ???????????? Gift?????? ????????????
  getConfig: function getConfig(content, data) {
    // uni.showLoading({
    //     title: '?????????',
    // });
    (0, _request.default)({
      url: data,
      method: 'get' }).
    then(function (res) {
      uni.hideLoading();
      if (res.code === 0) {
        context.commit('setTheme', Number(res.data.theme.id));
        // uni.setNavigationBarTitle({
        //     title: res.data.title,
        // });
      }
    }).catch(function () {
      uni.hideLoading();
    });
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!***********************************************!*\
  !*** F:/myWork/newWork/store/modules/cart.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  reportAndError: {
    boolean: false,
    content: '??????????????????????????? ?????????????????????~' },

  is_edit: false };


var getters = {
  reportAndErrorObj: function reportAndErrorObj(state) {
    return state.reportAndError;
  },
  is_edit: function is_edit(state) {
    return state.is_edit;
  } };


var mutations = {
  reportAndErrorObj: function reportAndErrorObj(state, data) {
    state.reportAndError = data;
  },
  is_edit: function is_edit(state, data) {
    state.is_edit = data;
  } };


var actions = {
  reportAndErrorObj: function reportAndErrorObj(content, data) {
    content.commit('reportAndErrorObj', data);
  },
  is_edit: function is_edit(content, data) {
    content.commit('is_edit', data);
  } };var _default =


{
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions };exports.default = _default;

/***/ }),

/***/ 4:
/*!************************************!*\
  !*** F:/myWork/newWork/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!************************************!*\
  !*** F:/myWork/newWork/version.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '4.3.57';

/***/ }),

/***/ 41:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/config.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.platform = void 0;
var platform = 'wxapp';exports.platform = platform;

/***/ }),

/***/ 42:
/*!********************************************!*\
  !*** F:/myWork/newWork/core/mallConfig.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 16));
var _appOnLaunch = _interopRequireDefault(__webpack_require__(/*! ./appOnLaunch.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var isFirstAppRun = true;
var isGettingFromService = false;
var mallConfig = null;
var cacheKey = '_APP_CONFIG';
var resolveList = [];
var rejectList = [];

var getConfigFormServer = function getConfigFormServer(resolve, reject) {
  if (resolve) {
    resolveList.push(resolve);
  }
  if (reject) {
    rejectList.push(reject);
  }
  if (isGettingFromService) {
    return;
  }
  isGettingFromService = true;
  (0, _request.default)({
    url: _appOnLaunch.default.index.config }).
  then(function (response) {
    isGettingFromService = false;
    if (response.code === 0) {
      mallConfig = response.data;
      uni.setStorageSync(cacheKey, mallConfig);
      for (var i in resolveList) {
        resolveList[i](mallConfig);
      }
      resolveList = [];
    } else {
      for (var _i in rejectList) {
        rejectList[_i](response.msg);
      }
      rejectList = [];
    }
  }).catch(function (error) {
    isGettingFromService = false;
    for (var i in rejectList) {
      rejectList[i](error.msg);
    }
    rejectList = [];
  });
};var _default =

{
  getConfig: function getConfig(options) {
    return new Promise(function (resolve, reject) {
      if (mallConfig) {
        return resolve(mallConfig);
      }
      mallConfig = uni.getStorageSync(cacheKey);
      if (mallConfig) {
        if (isFirstAppRun) {
          isFirstAppRun = false;
          getConfigFormServer();
        }
        return resolve(mallConfig);
      } else {
        getConfigFormServer(resolve, reject);
      }
    });
  },
  resetConfig: function resetConfig() {
    mallConfig = null;
    uni.removeStorageSync(cacheKey);
    isGettingFromService = false;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 43:
/*!*********************************************!*\
  !*** F:/myWork/newWork/core/showLoading.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var showLoading = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(args) {var defaultArgs;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            defaultArgs = {
              type: 'global',
              text: '?????????',
              color: '#ffffff',
              backgroundImage: '' };

            args = Object.assign(defaultArgs, args);
            args.isShow = true;
            this.$store.dispatch('loading/actionGetLoading', args);case 4:case "end":return _context.stop();}}}, _callee, this);}));return function showLoading(_x) {return _ref.apply(this, arguments);};}();var _default =

showLoading;exports.default = _default;

/***/ }),

/***/ 44:
/*!*********************************************!*\
  !*** F:/myWork/newWork/core/hideLoading.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var hideLoading = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(args) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            args = args || {};
            args.isShow = false;
            this.$store.dispatch('loading/actionGetLoading', args);case 3:case "end":return _context.stop();}}}, _callee, this);}));return function hideLoading(_x) {return _ref.apply(this, arguments);};}();var _default =

hideLoading;exports.default = _default;

/***/ }),

/***/ 45:
/*!******************************************!*\
  !*** F:/myWork/newWork/core/platDiff.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var utils = _interopRequireWildcard(__webpack_require__(/*! ./utils.js */ 21));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var _default =

{
  // ????????????options?????????
  route: function route() {var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (!page) {
      var pages = getCurrentPages();
      if (pages.length) {
        page = pages[pages.length - 1];
      }
    }
    var route = '';

    route = "/".concat(page.route.split('?')[0]);





    return route;
  },

  // ?????????options?????????
  routeWithOption: function routeWithOption() {var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    console.log(page, "page");
    if (!page) {
      var pages = getCurrentPages();
      if (pages.length) {
        page = pages[pages.length - 1];
      }
      console.log(page, "01");
    }
    var route = '';

    route = "/".concat(page.route.split('?')[0]);
    console.log(route, page, "012");







    if (page.options) {
      route += '?' + utils.objectToUrlParams(page.options);
      console.log(route, "014");
    }
    console.log(route, "rouer");
    return route;
  },

  // ?????????options(???????????????????????????)????????? page_count--created??????????????????
  tabBarUrl: function tabBarUrl() {var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var page_count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!page) {
      var pages = getCurrentPages();
      if (pages.length) {
        var diff = pages.length - page_count > 0 && page_count > 0 ? pages.length - page_count : 0;
        page = pages[pages.length - 1 - diff];
      }
    }

    var route = '';

    route = "/".concat(page.route.split('?')[0]);





    var options = {};













    options = page.options;

    if (options) {
      var params = {};
      for (var key in options) {
        if (!(key == 'user_id' || key == 'scene' || key == 'params' || key == 'first_id' || key == 'select_cat_id' || key == 'path' ||
        key == 'share_openid' || key == 'custom_params' || key == 'room_id' || key == 'openid' ||
        key == 'multipleSlots' || key == 'addGlobalClass')) {
          if (key == 'page_id') {
            if (options[key] > 0) {
              params[key] = options[key];
            }
          } else {
            params[key] = options[key];
          }
        }
      }
      params = utils.objectToUrlParams(params);
      if (params) {
        route += '?' + params;
      }
    }
    return route;
  } };exports.default = _default;

/***/ }),

/***/ 46:
/*!*************************************************!*\
  !*** F:/myWork/newWork/core/lazyLoadingData.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var lazyLoadingData = function lazyLoadingData(element) {var _this = this;
  return new Promise(function (resolve, reject) {
    try {
      var query = null;

      query = _this.createSelectorQuery();




      query.select(".".concat(element)).boundingClientRect();
      query.exec(function (res) {
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });
};var _default =

lazyLoadingData;exports.default = _default;

/***/ }),

/***/ 47:
/*!**************************************!*\
  !*** F:/myWork/newWork/core/jump.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _formId = __webpack_require__(/*! ./formId.js */ 20);

var _cache = __webpack_require__(/*! ./cache.js */ 22);

var jump = function jump(data) {

  if (data.form) (0, _formId.push)(data.e.detail.formId);

  switch (data.open_type) {
    case 'redirect':
      uni.redirectTo({
        url: data.url });

      break;
    case 'navigate':
      uni.navigateTo({
        url: data.url });

      break;
    case 'app_admin':
      if (data.$store.state.user.info.identity.is_admin == 1) {
        uni.navigateTo({
          url: data.url });

      }
      break;
    case 'tel':
      if (data.params) {
        uni.makePhoneCall({
          phoneNumber: data.params[0].value });

      } else if (data.number) {
        uni.makePhoneCall({
          phoneNumber: data.number });

      }
      break;
    case 'web':
      uni.navigateTo({
        url: data.url });

      break;

    case 'app':
      if (data.url) {
        var originalPath = data.url.split('?')[1];
        uni.navigateToMiniProgram({
          appId: originalPath.slice(0, 25).split('=')[1],
          path: originalPath.slice(originalPath.indexOf('&') + 1, originalPath.length).split('=')[1] });

      } else if (data.appId) {
        uni.navigateToMiniProgram({
          appId: data.appId });

      }
      break;

    case 'clear_cache':
      (0, _cache.clearStorage)();
      break;
    case 'map':
      uni.openLocation({
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        name: data.address });

      break;
    case 'reload':
      uni.redirectTo({
        url: this.$platDiff.routeWithOption() });

      break;}

};var _default =

jump;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!*****************************************!*\
  !*** F:/myWork/newWork/core/popupAd.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  list: {},
  show: null,
  first: {},
  is_storage: false,
  setList: function setList(mark) {
    if (typeof this.list[mark] === 'undefined') {
      this.list[mark] = true;
    }
  } };exports.default = _default;

/***/ }),

/***/ 49:
/*!*************************************************!*\
  !*** F:/myWork/newWork/core/shareAppMessage.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ./utils */ 21);
var _request = _interopRequireDefault(__webpack_require__(/*! ../core/request.js */ 16));
var _appOnLaunch = _interopRequireDefault(__webpack_require__(/*! ../core/appOnLaunch.js */ 24));
var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var shareAppMessage = function shareAppMessage(args) {
  args = args || {
    title: '????????????????????????',
    path: '/pages/index/index',
    params: {} };

  if (typeof args.params === 'undefined') {
    args.params = {};
  }





  var user_id = 0;
  if (this.$user.isLogin() && this.$store.state.user.info) {
    user_id = this.$store.state.user.info.options.user_id;
  }
  if (typeof args.path === 'undefined' || args.path === '/pages/index/index' && typeof args.params.page_id === 'undefined') {
    args.path = "/pages/index/index?user_id=".concat(user_id);
    if (Object.keys(args.params).length != 0) {
      args.path += "&" + (0, _utils.objectToUrlParams)(args.params);
    }
  } else {
    args.params.path = args.path;
    args.params.user_id = user_id;
    args.path = "/pages/index/index?scene=share&user_id=".concat(user_id, "&params=").concat(JSON.stringify(args.params));
  }
  setTimeout(function () {
    (0, _request.default)({
      url: _appOnLaunch.default.coupon.share_coupon }).
    then(function (response) {
      if (response.code === 0) {
        var coupon = {
          list: response.data.list,
          type: 'share' };

        _index.default.dispatch('page/actionSetCoupon', coupon);
      }
    }).catch(function (e) {

    });
  }, 1000);
  return args;
};var _default =
shareAppMessage;exports.default = _default;

/***/ }),

/***/ 50:
/*!***********************************************!*\
  !*** F:/myWork/newWork/core/shareTimeline.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var utils = _interopRequireWildcard(__webpack_require__(/*! ./utils.js */ 21));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

var shareTimeline = function shareTimeline(args) {
  args = args || {
    title: '????????????????????????',
    query: {} };

  if (typeof args.query === 'undefined') {
    args.query = {};
  }
  var user_id = 0;
  if (this.$user.isLogin() && this.$store.state.user.info) {
    user_id = this.$store.state.user.info.options.user_id;
  }
  args.query.user_id = user_id;
  args.query = utils.objectToUrlParams(args.query);
  return args;
};var _default =
shareTimeline;exports.default = _default;

/***/ }),

/***/ 51:
/*!*******************************************!*\
  !*** F:/myWork/newWork/core/subscribe.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var subscribe = function subscribe(templateId) {
  return new Promise(function (resolve, reject) {

    if (wx.requestSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: templateId,
        success: function success(res) {
          resolve(res);
        },
        fail: function fail(res) {
          reject(res);
        } });

    } else {
      uni.showModal({
        title: '??????',
        content: '?????????????????????????????????????????????????????????????????????????????????????????????',
        showCancel: false,
        success: function success(res) {
          reject({});
        } });

    }




  });
};var _default =
subscribe;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 512:
/*!*************************************************************!*\
  !*** F:/myWork/newWork/components/u-charts/u-charts.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var config = { yAxisWidth: 15, yAxisSplit: 5, xAxisHeight: 15, xAxisLineHeight: 15, legendHeight: 15, yAxisTitleWidth: 15, padding: [10, 10, 10, 10], pixelRatio: 1, rotate: !1, columePadding: 3, fontSize: 13, dataPointShape: ["circle", "circle", "circle", "circle"], colors: ["#1890ff", "#2fc25b", "#facc14", "#f04864", "#8543e0", "#90ed7d"], pieChartLinePadding: 15, pieChartTextPadding: 5, xAxisTextPadding: 3, titleColor: "#333333", titleFontSize: 20, subtitleColor: "#999999", subtitleFontSize: 15, toolTipPadding: 3, toolTipBackground: "#000000", toolTipOpacity: .7, toolTipLineHeight: 20, radarLabelTextMargin: 15, gaugeLabelTextMargin: 15 };var assign = function assign(e) {for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {t[_key - 1] = arguments[_key];}function i(e, t) {for (var a in t) {e[a] = e[a] && "[object Object]" === e[a].toString() ? i(e[a], t[a]) : e[a] = t[a];}return e;}if (null == e) throw new TypeError("Cannot convert undefined or null to object");return !t || 0 >= t.length ? e : (t.forEach(function (t) {e = i(e, t);}), e);};var util = { toFixed: function toFixed(e, t) {return t = t || 2, this.isFloat(e) && (e = e.toFixed(t)), e;}, isFloat: function isFloat(e) {return 0 != e % 1;}, approximatelyEqual: function approximatelyEqual(e, t) {return 1e-10 > Math.abs(e - t);}, isSameSign: function isSameSign(e, t) {var i = Math.abs;return i(e) === e && i(t) === t || i(e) !== e && i(t) !== t;}, isSameXCoordinateArea: function isSameXCoordinateArea(e, t) {return this.isSameSign(e.x, t.x);}, isCollision: function isCollision(e, t) {e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height, t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height;var i = t.start.x > e.end.x || t.end.x < e.start.x || t.end.y > e.start.y || t.start.y < e.end.y;return !i;} };function getH5Offset(t) {return t.mp = { changedTouches: [] }, t.mp.changedTouches.push({ x: t.offsetX, y: t.offsetY }), t;}function hexToRgb(e, t) {var i = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, i, a) {return t + t + i + i + a + a;}),a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i),o = parseInt(a[1], 16),n = parseInt(a[2], 16),l = parseInt(a[3], 16);return "rgba(" + o + "," + n + "," + l + "," + t + ")";}function findRange(e, t, i) {if (isNaN(e)) throw new Error("[uCharts] unvalid series data!");i = i || 10, t = t ? t : "upper";for (var a = 1; 1 > i;) {i *= 10, a *= 10;}for (e = "upper" === t ? Math.ceil(e * a) : Math.floor(e * a); 0 != e % i;) {"upper" === t ? e++ : e--;}return e / a;}function calCandleMA(e, t, i, a) {var o = [];for (var n, l = 0; l < e.length; l++) {n = { data: [], name: t[l], color: i[l] };for (var _t = 0, _i = a.length; _t < _i; _t++) {if (_t < e[l]) {n.data.push(null);continue;}var _i2 = 0;for (var _o = 0; _o < e[l]; _o++) {_i2 += a[_t - _o][1];}n.data.push(+(_i2 / e[l]).toFixed(3));}o.push(n);}return o;}function calValidDistance(e, t, i, a, o) {var n = o.width - o.area[1] - o.area[3],l = i.eachSpacing * (o.chartData.xAxisData.xAxisPoints.length - 1),r = t;return 0 <= t ? (r = 0, e.event.trigger("scrollLeft")) : Math.abs(t) >= l - n && (r = n - l, e.event.trigger("scrollRight")), r;}function isInAngleRange(e, t, i) {function a(e) {for (; 0 > e;) {e += 2 * o;}for (; e > 2 * o;) {e -= 2 * o;}return e;}var o = Math.PI;return e = a(e), t = a(t), i = a(i), t > i && (i += 2 * o, e < t && (e += 2 * o)), e >= t && e <= i;}function calRotateTranslate(e, t, i) {var a = e,o = i - t,n = a + (i - o - a) / 1.4142135623730951;n *= -1;return { transX: n, transY: (i - o) * (1.4142135623730951 - 1) - (i - o - a) / 1.4142135623730951 };}function createCurveControlPoints(e, t) {function i(e, t) {return !!(e[t - 1] && e[t + 1]) && (e[t].y >= l(e[t - 1].y, e[t + 1].y) || e[t].y <= n(e[t - 1].y, e[t + 1].y));}function o(e, t) {return !!(e[t - 1] && e[t + 1]) && (e[t].x >= l(e[t - 1].x, e[t + 1].x) || e[t].x <= n(e[t - 1].x, e[t + 1].x));}var n = Math.min,l = Math.max,r = .2,a = .2,s = null,d = null,h = null,x = null;if (1 > t ? (s = e[0].x + (e[1].x - e[0].x) * r, d = e[0].y + (e[1].y - e[0].y) * r) : (s = e[t].x + (e[t + 1].x - e[t - 1].x) * r, d = e[t].y + (e[t + 1].y - e[t - 1].y) * r), t > e.length - 3) {var c = e.length - 1;h = e[c].x - (e[c].x - e[c - 1].x) * a, x = e[c].y - (e[c].y - e[c - 1].y) * a;} else h = e[t + 1].x - (e[t + 2].x - e[t].x) * a, x = e[t + 1].y - (e[t + 2].y - e[t].y) * a;return i(e, t + 1) && (x = e[t + 1].y), i(e, t) && (d = e[t].y), o(e, t + 1) && (h = e[t + 1].x), o(e, t) && (s = e[t].x), (d >= l(e[t].y, e[t + 1].y) || d <= n(e[t].y, e[t + 1].y)) && (d = e[t].y), (x >= l(e[t].y, e[t + 1].y) || x <= n(e[t].y, e[t + 1].y)) && (x = e[t + 1].y), (s >= l(e[t].x, e[t + 1].x) || s <= n(e[t].x, e[t + 1].x)) && (s = e[t].x), (h >= l(e[t].x, e[t + 1].x) || h <= n(e[t].x, e[t + 1].x)) && (h = e[t + 1].x), { ctrA: { x: s, y: d }, ctrB: { x: h, y: x } };}function convertCoordinateOrigin(e, t, i) {return { x: i.x + e, y: i.y - t };}function avoidCollision(e, t) {if (t) for (; util.isCollision(e, t);) {0 < e.start.x ? e.start.y-- : 0 > e.start.x ? e.start.y++ : 0 < e.start.y ? e.start.y++ : e.start.y--;}return e;}function fillSeries(e, t, i) {var a = 0;return e.map(function (e) {if (e.color || (e.color = i.colors[a], a = (a + 1) % i.colors.length), e.index || (e.index = 0), e.type || (e.type = t.type), "undefined" == typeof e.show && (e.show = !0), e.type || (e.type = t.type), e.pointShape || (e.pointShape = "circle"), !e.legendShape) switch (e.type) {case "line":e.legendShape = "line";break;case "column":e.legendShape = "rect";break;case "area":e.legendShape = "triangle";break;default:e.legendShape = "circle";}return e;});}function getDataRange(e, t) {var i = 0,a = t - e;return i = 1e4 <= a ? 1e3 : 1e3 <= a ? 100 : 100 <= a ? 10 : 10 <= a ? 5 : 1 <= a ? 1 : .1 <= a ? .1 : .01 <= a ? .01 : .001 <= a ? .001 : 1e-4 <= a ? 1e-4 : 1e-5 <= a ? 1e-5 : 1e-6, { minRange: findRange(e, "lower", i), maxRange: findRange(t, "upper", i) };}function measureText(e) {var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : config.fontSize;e = e + "";var e = e.split(""),a = 0;for (var _t2, o = 0; o < e.length; o++) {_t2 = e[o], a += /[a-zA-Z]/.test(_t2) ? 7 : /[0-9]/.test(_t2) ? 5.5 : /\./.test(_t2) ? 2.7 : /-/.test(_t2) ? 3.25 : /[\u4e00-\u9fa5]/.test(_t2) ? 10 : /\(|\)/.test(_t2) ? 3.73 : /\s/.test(_t2) ? 2.5 : /%/.test(_t2) ? 8 : 10;}return a * t / 10;}function dataCombine(e) {return e.reduce(function (e, t) {return (e.data ? e.data : e).concat(t.data);}, []);}function dataCombineStack(e, t) {for (var o = Array(t), a = 0; a < o.length; a++) {o[a] = 0;}for (var n = 0; n < e.length; n++) {for (var a = 0; a < o.length; a++) {o[a] += e[n].data[a];}}return e.reduce(function (e, t) {return (e.data ? e.data : e).concat(t.data).concat(o);}, []);}function getTouches(t, i, a) {var e, o;return t.clientX ? i.rotate ? (o = i.height - t.clientX * i.pixelRatio, e = (t.pageY - a.currentTarget.offsetTop - i.height / i.pixelRatio / 2 * (i.pixelRatio - 1)) * i.pixelRatio) : (e = t.clientX * i.pixelRatio, o = (t.pageY - a.currentTarget.offsetTop - i.height / i.pixelRatio / 2 * (i.pixelRatio - 1)) * i.pixelRatio) : i.rotate ? (o = i.height - t.x * i.pixelRatio, e = t.y * i.pixelRatio) : (e = t.x * i.pixelRatio, o = t.y * i.pixelRatio), { x: e, y: o };}function getSeriesDataItem(e, t) {var i = [];for (var a, o = 0; o < e.length; o++) {if (a = e[o], null !== a.data[t] && "undefined" != typeof a.data[t] && a.show) {var _e = {};_e.color = a.color, _e.type = a.type, _e.style = a.style, _e.pointShape = a.pointShape, _e.disableLegend = a.disableLegend, _e.name = a.name, _e.show = a.show, _e.data = a.format ? a.format(a.data[t]) : a.data[t], i.push(_e);}}return i;}function getMaxTextListLength(e) {var t = e.map(function (e) {return measureText(e);});return Math.max.apply(null, t);}function getRadarCoordinateSeries(e) {for (var t = Math.PI, a = [], o = 0; o < e; o++) {a.push(2 * t / e * o);}return a.map(function (e) {return -1 * e + t / 2;});}function getToolTipData(e, t, a, i) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},n = e.map(function (e) {var t = [];return t = i ? i : e.data, { text: o.format ? o.format(e, t[a]) : e.name + ": " + e.data, color: e.color };}),l = [],r = { x: 0, y: 0 };for (var _o2, _n = 0; _n < t.length; _n++) {_o2 = t[_n], "undefined" != typeof _o2[a] && null !== _o2[a] && l.push(_o2[a]);}for (var _o3, _n2 = 0; _n2 < l.length; _n2++) {_o3 = l[_n2], r.x = Math.round(_o3.x), r.y += _o3.y;}return r.y /= l.length, { textList: n, offset: r };}function getMixToolTipData(e, t, a, i) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},n = e.map(function (e) {return { text: o.format ? o.format(e, i[a]) : e.name + ": " + e.data, color: e.color, disableLegend: !!e.disableLegend };});n = n.filter(function (e) {if (!0 !== e.disableLegend) return e;});var l = [],r = { x: 0, y: 0 };for (var _o4, _n3 = 0; _n3 < t.length; _n3++) {_o4 = t[_n3], "undefined" != typeof _o4[a] && null !== _o4[a] && l.push(_o4[a]);}for (var _o5, _n4 = 0; _n4 < l.length; _n4++) {_o5 = l[_n4], r.x = Math.round(_o5.x), r.y += _o5.y;}return r.y /= l.length, { textList: n, offset: r };}function getCandleToolTipData(e, t, a, o, i, n) {6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : {};var l = n.color.upFill,r = n.color.downFill,s = [l, l, r, l];var d = [];var h = { text: i[o], color: null };d.push(h), t.map(function (t) {0 == o ? 0 > t.data[1] - t.data[0] ? s[1] = r : s[1] = l : (t.data[0] < e[o - 1][1] && (s[0] = r), t.data[1] < t.data[0] && (s[1] = r), t.data[2] > e[o - 1][1] && (s[2] = l), t.data[3] < e[o - 1][1] && (s[3] = r));var i = { text: "\u5F00\u76D8\uFF1A" + t.data[0], color: s[0] },a = { text: "\u6536\u76D8\uFF1A" + t.data[1], color: s[1] },n = { text: "\u6700\u4F4E\uFF1A" + t.data[2], color: s[2] },h = { text: "\u6700\u9AD8\uFF1A" + t.data[3], color: s[3] };d.push(i, a, n, h);});var x = [],c = { x: 0, y: 0 };for (var _l, _r = 0; _r < a.length; _r++) {_l = a[_r], "undefined" != typeof _l[o] && null !== _l[o] && x.push(_l[o]);}return c.x = Math.round(x[0][0].x), { textList: d, offset: c };}function filterSeries(e) {var t = [];for (var a = 0; a < e.length; a++) {!0 == e[a].show && t.push(e[a]);}return t;}function findCurrentIndex(e, t, i, a) {var o = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0,n = -1,l = i.chartData.eachSpacing / 2;var r = [];if (0 < t.length) {if ("candle" == i.type) for (var _e2 = 0; _e2 < t[0].length; _e2++) {r.push(t[0][_e2][0].x);} else for (var _e3 = 0; _e3 < t[0].length; _e3++) {r.push(t[0][_e3].x);}("line" == i.type || "area" == i.type) && "justify" == i.xAxis.boundaryGap && (l = i.chartData.eachSpacing / 2), i.categories || (l = 0), isInExactChartArea(e, i, a) && r.forEach(function (t, i) {e.x + o + l > t && (n = i);});}return n;}function findLegendIndex(e, t) {var i = -1;if (isInExactLegendArea(e, t.area)) {var a = t.points,o = -1;for (var _t3, n = 0, l = a.length; n < l; n++) {_t3 = a[n];for (var _a = 0; _a < _t3.length; _a++) {o += 1;var _n5 = _t3[_a].area;if (e.x > _n5[0] && e.x < _n5[2] && e.y > _n5[1] && e.y < _n5[3]) {i = o;break;}}}return i;}return i;}function isInExactLegendArea(e, t) {return e.x > t.start.x && e.x < t.end.x && e.y > t.start.y && e.y < t.end.y;}function isInExactChartArea(e, t) {return e.x <= t.width - t.area[1] + 10 && e.x >= t.area[3] - 10 && e.y >= t.area[0] && e.y <= t.height - t.area[2];}function findRadarChartCurrentIndex(e, t, i) {var a = Math.PI,o = 2 * a / i,n = -1;if (isInExactPieChartArea(e, t.center, t.radius)) {var l = function l(e) {return 0 > e && (e += 2 * a), e > 2 * a && (e -= 2 * a), e;},r = Math.atan2(t.center.y - e.y, e.x - t.center.x);r = -1 * r, 0 > r && (r += 2 * a);var s = t.angleList.map(function (e) {return e = l(-1 * e), e;});s.forEach(function (e, t) {var i = l(e - o / 2),s = l(e + o / 2);s < i && (s += 2 * a), (r >= i && r <= s || r + 2 * a >= i && r + 2 * a <= s) && (n = t);});}return n;}function findFunnelChartCurrentIndex(e, t) {for (var a, o = -1, n = 0, l = t.series.length; n < l; n++) {if (a = t.series[n], e.x > a.funnelArea[0] && e.x < a.funnelArea[2] && e.y > a.funnelArea[1] && e.y < a.funnelArea[3]) {o = n;break;}}return o;}function findWordChartCurrentIndex(e, t) {for (var a, o = -1, n = 0, l = t.length; n < l; n++) {if (a = t[n], e.x > a.area[0] && e.x < a.area[2] && e.y > a.area[1] && e.y < a.area[3]) {o = n;break;}}return o;}function findMapChartCurrentIndex(e, t) {for (var a, o = -1, n = t.chartData.mapData, l = t.series, r = pointToCoordinate(e.y, e.x, n.bounds, n.scale, n.xoffset, n.yoffset), s = [r.x, r.y], d = 0, h = l.length; d < h; d++) {if (a = l[d].geometry.coordinates, isPoiWithinPoly(s, a)) {o = d;break;}}return o;}function findPieChartCurrentIndex(e, t) {var a = -1;if (isInExactPieChartArea(e, t.center, t.radius)) {var o = Math.atan2(t.center.y - e.y, e.x - t.center.x);o = -o;for (var n, l = 0, r = t.series.length; l < r; l++) {if (n = t.series[l], isInAngleRange(o, n._start_, n._start_ + 2 * n._proportion_ * Math.PI)) {a = l;break;}}}return a;}function isInExactPieChartArea(e, t, i) {var a = Math.pow;return a(e.x - t.x, 2) + a(e.y - t.y, 2) <= a(i, 2);}function splitPoints(e) {var t = [],i = [];return e.forEach(function (e) {null === e ? (i.length && t.push(i), i = []) : i.push(e);}), i.length && t.push(i), t;}function calLegendData(e, t, i, a) {var o = Math.max,n = Math.floor;var l = { area: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, width: 0, height: 0, wholeWidth: 0, wholeHeight: 0 }, points: [], widthArr: [], heightArr: [] };if (!1 === t.legend.show) return a.legendData = l, l;var r = t.legend.padding,s = t.legend.margin,d = t.legend.fontSize,h = 15 * t.pixelRatio,x = 5 * t.pixelRatio,c = o(t.legend.lineHeight * t.pixelRatio, d);if ("top" == t.legend.position || "bottom" == t.legend.position) {var _a2 = [],_n6 = 0,p = [],g = [];for (var _o6 = 0; _o6 < e.length; _o6++) {var _i3 = e[_o6],_l2 = h + x + measureText(_i3.name || "undefined", d) + t.legend.itemGap;_n6 + _l2 > t.width - t.padding[1] - t.padding[3] ? (_a2.push(g), p.push(_n6 - t.legend.itemGap), _n6 = _l2, g = [_i3]) : (_n6 += _l2, g.push(_i3));}if (g.length) {_a2.push(g), p.push(_n6 - t.legend.itemGap), l.widthArr = p;var _e4 = o.apply(null, p);switch (t.legend.float) {case "left":l.area.start.x = t.padding[3], l.area.end.x = t.padding[3] + 2 * r;break;case "right":l.area.start.x = t.width - t.padding[1] - _e4 - 2 * r, l.area.end.x = t.width - t.padding[1];break;default:l.area.start.x = (t.width - _e4) / 2 - r, l.area.end.x = (t.width + _e4) / 2 + r;}l.area.width = _e4 + 2 * r, l.area.wholeWidth = _e4 + 2 * r, l.area.height = _a2.length * c + 2 * r, l.area.wholeHeight = _a2.length * c + 2 * r + 2 * s, l.points = _a2;}} else {var _i4 = e.length,_a3 = t.height - t.padding[0] - t.padding[2] - 2 * s - 2 * r,_o7 = Math.min(n(_a3 / c), _i4);switch (l.area.height = _o7 * c + 2 * r, l.area.wholeHeight = _o7 * c + 2 * r, t.legend.float) {case "top":l.area.start.y = t.padding[0] + s, l.area.end.y = t.padding[0] + s + l.area.height;break;case "bottom":l.area.start.y = t.height - t.padding[2] - s - l.area.height, l.area.end.y = t.height - t.padding[2] - s;break;default:l.area.start.y = (t.height - l.area.height) / 2, l.area.end.y = (t.height + l.area.height) / 2;}var _p = 0 == _i4 % _o7 ? _i4 / _o7 : n(_i4 / _o7 + 1),_g = [];for (var _t4, _a4 = 0; _a4 < _p; _a4++) {_t4 = e.slice(_a4 * _o7, _a4 * _o7 + _o7), _g.push(_t4);}if (l.points = _g, _g.length) {for (var _e6 = 0; _e6 < _g.length; _e6++) {var _i5 = _g[_e6],_a5 = 0;for (var _e7, _o8 = 0; _o8 < _i5.length; _o8++) {_e7 = h + x + measureText(_i5[_o8].name || "undefined", d) + t.legend.itemGap, _e7 > _a5 && (_a5 = _e7);}l.widthArr.push(_a5), l.heightArr.push(_i5.length * c + 2 * r);}var _e5 = 0;for (var _t5 = 0; _t5 < l.widthArr.length; _t5++) {_e5 += l.widthArr[_t5];}l.area.width = _e5 - t.legend.itemGap + 2 * r, l.area.wholeWidth = l.area.width + r;}}switch (t.legend.position) {case "top":l.area.start.y = t.padding[0] + s, l.area.end.y = t.padding[0] + s + l.area.height;break;case "bottom":l.area.start.y = t.height - t.padding[2] - l.area.height - s, l.area.end.y = t.height - t.padding[2] - s;break;case "left":l.area.start.x = t.padding[3], l.area.end.x = t.padding[3] + l.area.width;break;case "right":l.area.start.x = t.width - t.padding[1] - l.area.width, l.area.end.x = t.width - t.padding[1];}return a.legendData = l, l;}function calCategoriesData(e, t, i, a) {var o = { angle: 0, xAxisHeight: i.xAxisHeight },n = e.map(function (e) {return measureText(e, t.xAxis.fontSize || i.fontSize);}),l = Math.max.apply(this, n);return !0 == t.xAxis.rotateLabel && l + 2 * i.xAxisTextPadding > a && (o.angle = 45 * Math.PI / 180, o.xAxisHeight = 2 * i.xAxisTextPadding + l * Math.sin(o.angle)), o;}function getXAxisTextList(e, t) {var a = Math.min,o = Math.max,n = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : -1,l = dataCombine(e),r = [];l = l.filter(function (e) {return "object" == typeof e && null !== e ? -1 < e.constructor.toString().indexOf("Array") ? null !== e : null !== e.value : null !== e;}), l.map(function (e) {"object" == typeof e ? -1 < e.constructor.toString().indexOf("Array") ? "candle" == t.type ? e.map(function (e) {r.push(e);}) : r.push(e[0]) : r.push(e.value) : r.push(e);});var s = 0,d = 0;if (0 < r.length && (s = a.apply(this, r), d = o.apply(this, r)), -1 < n ? ("number" == typeof t.xAxis.data[n].min && (s = a(t.xAxis.data[n].min, s)), "number" == typeof t.xAxis.data[n].max && (d = o(t.xAxis.data[n].max, d))) : ("number" == typeof t.xAxis.min && (s = a(t.xAxis.min, s)), "number" == typeof t.xAxis.max && (d = o(t.xAxis.max, d))), s === d) {var h = d || 10;d += h;}for (var x = s, c = d, p = [], g = (c - x) / t.xAxis.splitNumber, y = 0; y <= t.xAxis.splitNumber; y++) {p.push(x + g * y);}return p;}function calXAxisData(e, t, i) {var a = { angle: 0, xAxisHeight: i.xAxisHeight };a.ranges = getXAxisTextList(e, t, i), a.rangesFormat = a.ranges.map(function (e) {return e = t.xAxis.format ? t.xAxis.format(e) : util.toFixed(e, 2), e;});var o = a.ranges.map(function (e) {return e = util.toFixed(e, 2), e = t.xAxis.format ? t.xAxis.format(+e) : e, e;});a = Object.assign(a, getXAxisPoints(o, t, i));var n = a.eachSpacing,l = o.map(function (e) {return measureText(e);}),r = Math.max.apply(this, l);return r + 2 * i.xAxisTextPadding > n && (a.angle = 45 * Math.PI / 180, a.xAxisHeight = 2 * i.xAxisTextPadding + r * Math.sin(a.angle)), !0 === t.xAxis.disabled && (a.xAxisHeight = 0), a;}function getRadarDataPoints(e, t, i, a, o) {var n = Math.max,l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,r = o.extra.radar || {};r.max = r.max || 0;var s = n(r.max, n.apply(null, dataCombine(a))),d = [];var _loop = function _loop(_n7) {var o = a[_n7],r = {};r.color = o.color, r.legendShape = o.legendShape, r.pointShape = o.pointShape, r.data = [], o.data.forEach(function (a, o) {var n = {};n.angle = e[o], n.proportion = a / s, n.position = convertCoordinateOrigin(i * n.proportion * l * Math.cos(n.angle), i * n.proportion * l * Math.sin(n.angle), t), r.data.push(n);}), d.push(r);};for (var _n7 = 0; _n7 < a.length; _n7++) {_loop(_n7);}return d;}function getPieDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1,o = 0,n = 0;for (var _a6, _n8 = 0; _n8 < e.length; _n8++) {_a6 = e[_n8], _a6.data = null === _a6.data ? 0 : _a6.data, o += _a6.data;}for (var _n9, l = 0; l < e.length; l++) {_n9 = e[l], _n9.data = null === _n9.data ? 0 : _n9.data, _n9._proportion_ = 0 === o ? 1 / e.length * a : _n9.data / o * a, _n9._radius_ = t;}for (var _a7, _o9 = 0; _o9 < e.length; _o9++) {_a7 = e[_o9], _a7._start_ = n, n += 2 * _a7._proportion_ * Math.PI;}return e;}function getFunnelDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1;e = e.sort(function (e, t) {return parseInt(t.data) - parseInt(e.data);});for (var o = 0; o < e.length; o++) {e[o].radius = e[o].data / e[0].data * t * a, e[o]._proportion_ = e[o].data / e[0].data;}return e.reverse();}function getRoseDataPoints(e, t, a, o) {var n = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 1,l = 0,r = 0,s = [];for (var _n10, _r2 = 0; _r2 < e.length; _r2++) {_n10 = e[_r2], _n10.data = null === _n10.data ? 0 : _n10.data, l += _n10.data, s.push(_n10.data);}var d = Math.min.apply(null, s),h = Math.max.apply(null, s);for (var _r3, _s = 0; _s < e.length; _s++) {_r3 = e[_s], _r3.data = null === _r3.data ? 0 : _r3.data, 0 === l || "area" == t ? (_r3._proportion_ = _r3.data / l * n, _r3._rose_proportion_ = 1 / e.length * n) : (_r3._proportion_ = _r3.data / l * n, _r3._rose_proportion_ = _r3.data / l * n), _r3._radius_ = a + (o - a) * ((_r3.data - d) / (h - d));}for (var _n11, _l3 = 0; _l3 < e.length; _l3++) {_n11 = e[_l3], _n11._start_ = r, r += 2 * _n11._rose_proportion_ * Math.PI;}return e;}function getArcbarDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1;1 == a && (a = .999999);for (var o, n = 0; n < e.length; n++) {o = e[n], o.data = null === o.data ? 0 : o.data;var i = void 0;i = "circle" == t.type ? 2 : t.endAngle < t.startAngle ? 2 + t.endAngle - t.startAngle : t.startAngle - t.endAngle, o._proportion_ = i * o.data * a + t.startAngle, 2 <= o._proportion_ && (o._proportion_ %= 2);}return e;}function getGaugeAxisPoints(e, t, a) {var o = t;for (var n = 0; n < e.length; n++) {e[n].value = null === e[n].value ? 0 : e[n].value, e[n]._startAngle_ = o, e[n]._endAngle_ = (t - a + 1) * e[n].value + t, 2 <= e[n]._endAngle_ && (e[n]._endAngle_ %= 2), o = e[n]._endAngle_;}return e;}function getGaugeDataPoints(e, t, a) {var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : 1;for (var n, l = 0; l < e.length; l++) {if (n = e[l], n.data = null === n.data ? 0 : n.data, "auto" == a.pointer.color) {for (var _e8 = 0; _e8 < t.length; _e8++) {if (n.data <= t[_e8].value) {n.color = t[_e8].color;break;}}} else n.color = a.pointer.color;var i = a.startAngle - a.endAngle + 1;n._endAngle_ = i * n.data + a.startAngle, n._oldAngle_ = a.oldAngle, a.oldAngle < a.endAngle && (n._oldAngle_ += 2), n._proportion_ = n.data >= a.oldData ? (n._endAngle_ - n._oldAngle_) * o + a.oldAngle : n._oldAngle_ - (n._oldAngle_ - n._endAngle_) * o, 2 <= n._proportion_ && (n._proportion_ %= 2);}return e;}function getPieTextMaxLength(e) {e = getPieDataPoints(e);var t = 0;for (var a = 0; a < e.length; a++) {var i = e[a],o = i.format ? i.format(+i._proportion_.toFixed(2)) : util.toFixed(100 * i._proportion_) + "%";t = Math.max(t, measureText(o));}return t;}function fixColumeData(e, t, i, a, o, n) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / i), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), 0 >= e.width && (e.width = 1), e.x += (a + .5 - i / 2) * e.width, e);});}function fixColumeMeterData(e, t, i, a, o, n, l) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / 2), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), 0 < a && (e.width -= 2 * l), e);});}function fixColumeStackData(e, t, i, a, o, n) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / 2), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), e);});}function getXAxisPoints(e, t) {var i = t.width - t.area[1] - t.area[3],a = t.enableScroll ? Math.min(t.xAxis.itemCount, e.length) : e.length;("line" == t.type || "area" == t.type) && 1 < a && "justify" == t.xAxis.boundaryGap && (a -= 1);var o = i / a,n = [],l = t.area[3],r = t.width - t.area[1];return e.forEach(function (e, t) {n.push(l + t * o);}), "justify" !== t.xAxis.boundaryGap && (!0 === t.enableScroll ? n.push(l + e.length * o) : n.push(r)), { xAxisPoints: n, startX: l, endX: r, eachSpacing: o };}function getCandleDataPoints(e, t, i, a, o, n) {var l = Math.round,r = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 1,s = [],d = n.height - n.area[0] - n.area[2];return e.forEach(function (e, h) {if (null === e) s.push(null);else {var x = [];e.forEach(function (e) {var s = { x: a[h] + l(o / 2) },c = e.value || e,p = d * (c - t) / (i - t);p *= r, s.y = n.height - l(p) - n.area[2], x.push(s);}), s.push(x);}}), s;}function getDataPoints(e, t, i, a, o, n) {var l = Math.round,r = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 1,s = "center";("line" == n.type || "area" == n.type) && (s = n.xAxis.boundaryGap);var d = [],h = n.height - n.area[0] - n.area[2],x = n.width - n.area[1] - n.area[3];return e.forEach(function (e, c) {if (null === e) d.push(null);else {var p = { color: e.color, x: a[c] },g = e;if ("object" == typeof e && null !== e) if (-1 < e.constructor.toString().indexOf("Array")) {var _t6, _i6, _a8;_t6 = [].concat(n.chartData.xAxisData.ranges), _i6 = _t6.shift(), _a8 = _t6.pop(), g = e[1], p.x = n.area[3] + x * (e[0] - _i6) / (_a8 - _i6);} else g = e.value;"center" == s && (p.x += l(o / 2));var y = h * (g - t) / (i - t);y *= r, p.y = n.height - l(y) - n.area[2], d.push(p);}}), d;}function getStackDataPoints(e, t, i, a, o, n, l, r, s) {var d = Math.round,h = 9 < arguments.length && void 0 !== arguments[9] ? arguments[9] : 1,x = [],c = n.height - n.area[0] - n.area[2];return e.forEach(function (e, l) {if (null === e) x.push(null);else {var p = { color: e.color, x: a[l] + d(o / 2) };if (0 < r) {var g = 0;for (var _e9 = 0; _e9 <= r; _e9++) {g += s[_e9].data[l];}var y = g - e,f = c * (g - t) / (i - t),u = c * (y - t) / (i - t);} else var g = e,f = c * (g - t) / (i - t),u = 0;var m = u;f *= h, m *= h, p.y = n.height - d(f) - n.area[2], p.y0 = n.height - d(m) - n.area[2], x.push(p);}}), x;}function getYAxisTextList(e, t, a, o) {var n,l = Math.min,r = Math.max,s = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : -1;n = "stack" == o ? dataCombineStack(e, t.categories.length) : dataCombine(e);var d = [];n = n.filter(function (e) {return "object" == typeof e && null !== e ? -1 < e.constructor.toString().indexOf("Array") ? null !== e : null !== e.value : null !== e;}), n.map(function (e) {"object" == typeof e ? -1 < e.constructor.toString().indexOf("Array") ? "candle" == t.type ? e.map(function (e) {d.push(e);}) : d.push(e[1]) : d.push(e.value) : d.push(e);});var h = 0,x = 0;if (0 < d.length && (h = l.apply(this, d), x = r.apply(this, d)), -1 < s ? ("number" == typeof t.yAxis.data[s].min && (h = l(t.yAxis.data[s].min, h)), "number" == typeof t.yAxis.data[s].max && (x = r(t.yAxis.data[s].max, x))) : ("number" == typeof t.yAxis.min && (h = l(t.yAxis.min, h)), "number" == typeof t.yAxis.max && (x = r(t.yAxis.max, x))), h === x) {var c = x || 10;x += c;}for (var p = getDataRange(h, x), g = p.minRange, y = p.maxRange, f = [], u = (y - g) / t.yAxis.splitNumber, m = 0; m <= t.yAxis.splitNumber; m++) {f.push(g + u * m);}return f.reverse();}function calYAxisData(e, t, a) {var o = Math.max,n = assign({}, { type: "" }, t.extra.column),l = t.yAxis.data.length,r = Array(l);if (0 < l) {for (var _t7 = 0; _t7 < l; _t7++) {r[_t7] = [];for (var _i7 = 0; _i7 < e.length; _i7++) {e[_i7].index == _t7 && r[_t7].push(e[_i7]);}}var s = Array(l),d = Array(l),h = Array(l);var _loop2 = function _loop2(x, _e11) {_e11 = t.yAxis.data[x], !0 == t.yAxis.disabled && (_e11.disabled = !0), s[x] = getYAxisTextList(r[x], t, a, n.type, x);var i = _e11.fontSize || a.fontSize;h[x] = { position: _e11.position ? _e11.position : "left", width: 0 }, d[x] = s[x].map(function (t) {_e10 = _e11;return t = util.toFixed(t, 6), t = _e11.format ? _e11.format(+t) : t, h[x].width = o(h[x].width, measureText(t, i) + 5), t;});var l = _e11.calibration ? 4 * t.pixelRatio : 0;h[x].width += l + 3 * t.pixelRatio, !0 === _e11.disabled && (h[x].width = 0);_e10 = _e11;};for (var _e10, x = 0; x < l; x++) {_loop2(x, _e10);}} else {var s = [,],d = [,],h = [,];s[0] = getYAxisTextList(e, t, a, n.type), h[0] = { position: "left", width: 0 };var i = t.yAxis.fontSize || a.fontSize;d[0] = s[0].map(function (e) {return e = util.toFixed(e, 6), e = t.yAxis.format ? t.yAxis.format(+e) : e, h[0].width = o(h[0].width, measureText(e, i) + 5), e;}), h[0].width += 3 * t.pixelRatio, !0 === t.yAxis.disabled ? (h[0] = { position: "left", width: 0 }, t.yAxis.data[0] = { disabled: !0 }) : t.yAxis.data[0] = { disabled: !1, position: "left", max: t.yAxis.max, min: t.yAxis.min, format: t.yAxis.format };}return { rangesFormat: d, ranges: s, yAxisWidth: h };}function calTooltipYAxisData(e, t, a) {var o = [].concat(a.chartData.yAxisData.ranges),n = a.height - a.area[0] - a.area[2],l = a.area[0],r = [];for (var s = 0; s < o.length; s++) {var _t8 = o[s].shift(),i = o[s].pop(),d = _t8 - (_t8 - i) * (e - l) / n;d = a.yAxis.data[s].format ? a.yAxis.data[s].format(+d) : d.toFixed(0), r.push(d + "");}return r;}function calMarkLineData(e, t) {var a,o,n = t.height - t.area[0] - t.area[2];for (var l = 0; l < e.length; l++) {e[l].yAxisIndex = e[l].yAxisIndex ? e[l].yAxisIndex : 0;var i = [].concat(t.chartData.yAxisData.ranges[e[l].yAxisIndex]);a = i.pop(), o = i.shift();var r = n * (e[l].value - a) / (o - a);e[l].y = t.height - Math.round(r) - t.area[2];}return e;}function contextRotate(e, t) {var i = Math.PI;!0 === t.rotateLock ? !0 !== t._rotate_ && (e.translate(t.height, 0), e.rotate(90 * i / 180), t._rotate_ = !0) : (e.translate(t.height, 0), e.rotate(90 * i / 180));}function drawPointShape(e, t, i, a, o) {a.beginPath(), "hollow" == o.dataPointShapeType ? (a.setStrokeStyle(t), a.setFillStyle(o.background), a.setLineWidth(2 * o.pixelRatio)) : (a.setStrokeStyle("#ffffff"), a.setFillStyle(t), a.setLineWidth(1 * o.pixelRatio)), "diamond" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x, e.y - 4.5), a.lineTo(e.x - 4.5, e.y), a.lineTo(e.x, e.y + 4.5), a.lineTo(e.x + 4.5, e.y), a.lineTo(e.x, e.y - 4.5));}) : "circle" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x + 2.5 * o.pixelRatio, e.y), a.arc(e.x, e.y, 3 * o.pixelRatio, 0, 2 * Math.PI, !1));}) : "rect" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x - 3.5, e.y - 3.5), a.rect(e.x - 3.5, e.y - 3.5, 7, 7));}) : "triangle" == i && e.forEach(function (e) {null !== e && (a.moveTo(e.x, e.y - 4.5), a.lineTo(e.x - 4.5, e.y + 4.5), a.lineTo(e.x + 4.5, e.y + 4.5), a.lineTo(e.x, e.y - 4.5));}), a.closePath(), a.fill(), a.stroke();}function drawRingTitle(e, t, i, a) {var o = e.title.fontSize || t.titleFontSize,n = e.subtitle.fontSize || t.subtitleFontSize,l = e.title.name || "",r = e.subtitle.name || "",s = e.title.color || t.titleColor,d = e.subtitle.color || t.subtitleColor,h = l ? o : 0,x = r ? n : 0,c = 5;if (r) {var p = measureText(r, n),g = a.x - p / 2 + (e.subtitle.offsetX || 0),y = a.y + n / 2 + (e.subtitle.offsetY || 0);l && (y += (h + c) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(d), i.fillText(r, g, y), i.closePath(), i.stroke();}if (l) {var f = measureText(l, o),u = a.x - f / 2 + (e.title.offsetX || 0),m = a.y + o / 2 + (e.title.offsetY || 0);r && (m -= (x + c) / 2), i.beginPath(), i.setFontSize(o), i.setFillStyle(s), i.fillText(l, u, m), i.closePath(), i.stroke();}}function drawPointText(e, t, i, a) {var o = t.data;e.forEach(function (e, n) {if (null !== e) {a.beginPath(), a.setFontSize(t.textSize || i.fontSize), a.setFillStyle(t.textColor || "#666666");var l = o[n];"object" == typeof o[n] && null !== o[n] && (o[n].constructor == Array ? l = o[n][1] : l = o[n].value);var r = t.format ? t.format(l) : l;a.fillText(r + "", e.x - measureText(r, t.textSize || i.fontSize) / 2, e.y - 4), a.closePath(), a.stroke();}});}function drawGaugeLabel(e, t, i, a, o, n) {var l = Math.PI;t -= e.width / 2 + o.gaugeLabelTextMargin;var r = e.startAngle - e.endAngle + 1,s = r / e.splitLine.splitNumber,d = e.endNumber - e.startNumber,h = d / e.splitLine.splitNumber,x = e.startAngle,c = e.startNumber;for (var _r4 = 0; _r4 < e.splitLine.splitNumber + 1; _r4++) {var p = { x: t * Math.cos(x * l), y: t * Math.sin(x * l) },g = e.labelFormat ? e.labelFormat(c) : c;p.x += i.x - measureText(g) / 2, p.y += i.y;var y = p.x,f = p.y;n.beginPath(), n.setFontSize(o.fontSize), n.setFillStyle(e.labelColor || "#666666"), n.fillText(g, y, f + o.fontSize / 2), n.closePath(), n.stroke(), x += s, 2 <= x && (x %= 2), c += h;}}function drawRadarLabel(e, t, i, a, o, n) {var l = a.extra.radar || {};t += o.radarLabelTextMargin, e.forEach(function (e, r) {var s = { x: t * Math.cos(e), y: t * Math.sin(e) },d = convertCoordinateOrigin(s.x, s.y, i),h = d.x,x = d.y;util.approximatelyEqual(s.x, 0) ? h -= measureText(a.categories[r] || "") / 2 : 0 > s.x && (h -= measureText(a.categories[r] || "")), n.beginPath(), n.setFontSize(o.fontSize), n.setFillStyle(l.labelColor || "#666666"), n.fillText(a.categories[r] || "", h, x + o.fontSize / 2), n.closePath(), n.stroke();});}function drawPieText(e, t, a, o, i, n) {var l = Math.cos,r = Math.sin,s = Math.min,d = Math.max,h = Math.PI,x = a.pieChartLinePadding,c = [],p = null,g = e.map(function (e) {var t = e.format ? e.format(+e._proportion_.toFixed(2)) : util.toFixed(100 * e._proportion_.toFixed(4)) + "%";e._rose_proportion_ && (e._proportion_ = e._rose_proportion_);var i = 2 * h - (e._start_ + 2 * h * e._proportion_ / 2),a = e.color,o = e._radius_;return { arc: i, text: t, color: a, radius: o, textColor: e.textColor, textSize: e.textSize };});for (var _h = 0; _h < g.length; _h++) {var _e12 = g[_h],_t9 = l(_e12.arc) * (_e12.radius + x),_i8 = r(_e12.arc) * (_e12.radius + x),_o10 = l(_e12.arc) * _e12.radius,_n12 = r(_e12.arc) * _e12.radius,y = 0 <= _t9 ? _t9 + a.pieChartTextPadding : _t9 - a.pieChartTextPadding,f = _i8,u = measureText(_e12.text, _e12.textSize || a.fontSize),m = f;p && util.isSameXCoordinateArea(p.start, { x: y }) && (0 < y ? m = s(f, p.start.y) : 0 > _t9 ? m = d(f, p.start.y) : 0 < f ? m = d(f, p.start.y) : m = s(f, p.start.y)), 0 > y && (y -= u);var S = { lineStart: { x: _o10, y: _n12 }, lineEnd: { x: _t9, y: _i8 }, start: { x: y, y: m }, width: u, height: a.fontSize, text: _e12.text, color: _e12.color, textColor: _e12.textColor, textSize: _e12.textSize };p = avoidCollision(S, p), c.push(p);}for (var _l4 = 0; _l4 < c.length; _l4++) {var _e13 = c[_l4],_i9 = convertCoordinateOrigin(_e13.lineStart.x, _e13.lineStart.y, n),_r5 = convertCoordinateOrigin(_e13.lineEnd.x, _e13.lineEnd.y, n),_s2 = convertCoordinateOrigin(_e13.start.x, _e13.start.y, n);o.setLineWidth(1 * t.pixelRatio), o.setFontSize(a.fontSize), o.beginPath(), o.setStrokeStyle(_e13.color), o.setFillStyle(_e13.color), o.moveTo(_i9.x, _i9.y);var _d = 0 > _e13.start.x ? _s2.x + _e13.width : _s2.x,_x = 0 > _e13.start.x ? _s2.x - 5 : _s2.x + 5;o.quadraticCurveTo(_r5.x, _r5.y, _d, _s2.y), o.moveTo(_i9.x, _i9.y), o.stroke(), o.closePath(), o.beginPath(), o.moveTo(_s2.x + _e13.width, _s2.y), o.arc(_d, _s2.y, 2, 0, 2 * h), o.closePath(), o.fill(), o.beginPath(), o.setFontSize(_e13.textSize || a.fontSize), o.setFillStyle(_e13.textColor || "#666666"), o.fillText(_e13.text, _x, _s2.y + 3), o.closePath(), o.stroke(), o.closePath();}}function drawToolTipSplitLine(e, t, i, a) {var o = t.extra.tooltip || {};o.gridType = null == o.gridType ? "solid" : o.gridType, o.dashLength = null == o.dashLength ? 4 : o.dashLength;var n = t.area[0],l = t.height - t.area[2];if ("dash" == o.gridType && a.setLineDash([o.dashLength, o.dashLength]), a.setStrokeStyle(o.gridColor || "#cccccc"), a.setLineWidth(1 * t.pixelRatio), a.beginPath(), a.moveTo(e, n), a.lineTo(e, l), a.stroke(), a.setLineDash([]), o.xAxisLabel) {var _n13 = t.categories[t.tooltip.index];a.setFontSize(i.fontSize);var r = measureText(_n13, i.fontSize),s = e - .5 * r,d = l;a.beginPath(), a.setFillStyle(hexToRgb(o.labelBgColor || i.toolTipBackground, o.labelBgOpacity || i.toolTipOpacity)), a.setStrokeStyle(o.labelBgColor || i.toolTipBackground), a.setLineWidth(1 * t.pixelRatio), a.rect(s - i.toolTipPadding, d, r + 2 * i.toolTipPadding, i.fontSize + 2 * i.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(o.labelFontColor || i.fontColor), a.fillText(_n13 + "", s, d + i.toolTipPadding + i.fontSize), a.closePath(), a.stroke();}}function drawMarkLine(e, t, a) {var o = assign({}, { type: "solid", dashLength: 4, data: [] }, e.extra.markLine),n = e.area[3],l = e.width - e.area[1],r = calMarkLineData(o.data, e);for (var s, d = 0; d < r.length; d++) {if (s = assign({}, { lineColor: "#DE4A42", showLabel: !1, labelFontColor: "#666666", labelBgColor: "#DFE8FF", labelBgOpacity: .8, yAxisIndex: 0 }, r[d]), "dash" == o.type && a.setLineDash([o.dashLength, o.dashLength]), a.setStrokeStyle(s.lineColor), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.moveTo(n, s.y), a.lineTo(l, s.y), a.stroke(), a.setLineDash([]), s.showLabel) {var i = e.yAxis.format ? e.yAxis.format(+s.value) : s.value;a.setFontSize(t.fontSize);var _o11 = measureText(i, t.fontSize),_n14 = e.padding[3] + t.yAxisTitleWidth - t.toolTipPadding,_l5 = Math.max(e.area[3], _o11 + 2 * t.toolTipPadding),_r6 = _l5 - _n14,_d2 = s.y;a.setFillStyle(hexToRgb(s.labelBgColor, s.labelBgOpacity)), a.setStrokeStyle(s.labelBgColor), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.rect(_n14, _d2 - .5 * t.fontSize - t.toolTipPadding, _r6, t.fontSize + 2 * t.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(t.fontSize), a.setFillStyle(s.labelFontColor), a.fillText(i + "", _n14 + (_r6 - _o11) / 2, _d2 + .5 * t.fontSize), a.stroke();}}}function drawToolTipHorizentalLine(e, t, a, i) {var o = Math.max,n = assign({}, { gridType: "solid", dashLength: 4 }, e.extra.tooltip),l = e.area[3],r = e.width - e.area[1];if ("dash" == n.gridType && a.setLineDash([n.dashLength, n.dashLength]), a.setStrokeStyle(n.gridColor || "#cccccc"), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.moveTo(l, e.tooltip.offset.y), a.lineTo(r, e.tooltip.offset.y), a.stroke(), a.setLineDash([]), n.yAxisLabel) {var _l6 = calTooltipYAxisData(e.tooltip.offset.y, e.series, e, t, i),_r7 = e.chartData.yAxisData.yAxisWidth,s = e.area[3],d = e.width - e.area[1];for (var h = 0; h < _l6.length; h++) {a.setFontSize(t.fontSize);var _i10 = void 0,x = void 0,c = void 0,p = measureText(_l6[h], t.fontSize);"left" == _r7[h].position ? (_i10 = s - _r7[h].width, x = o(_i10, _i10 + p + 2 * t.toolTipPadding)) : (_i10 = d, x = o(_i10 + _r7[h].width, _i10 + p + 2 * t.toolTipPadding)), c = x - _i10;var g = _i10 + (c - p) / 2,y = e.tooltip.offset.y;a.beginPath(), a.setFillStyle(hexToRgb(n.labelBgColor || t.toolTipBackground, n.labelBgOpacity || t.toolTipOpacity)), a.setStrokeStyle(n.labelBgColor || t.toolTipBackground), a.setLineWidth(1 * e.pixelRatio), a.rect(_i10, y - .5 * t.fontSize - t.toolTipPadding, c, t.fontSize + 2 * t.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(t.fontSize), a.setFillStyle(n.labelFontColor || t.fontColor), a.fillText(_l6[h], g, y + .5 * t.fontSize), a.closePath(), a.stroke(), "left" == _r7[h].position ? s -= _r7[h].width + e.yAxis.padding : d += _r7[h].width + e.yAxis.padding;}}}function drawToolTipSplitArea(e, t, i, a, o) {var n = assign({}, { activeBgColor: "#000000", activeBgOpacity: .08 }, t.extra.tooltip),l = t.area[0],r = t.height - t.area[2];a.beginPath(), a.setFillStyle(hexToRgb(n.activeBgColor, n.activeBgOpacity)), a.rect(e - o / 2, l, o, r - l), a.closePath(), a.fill();}function drawToolTip(e, t, i, a, o) {var n = Math.round,l = assign({}, { showBox: !0, bgColor: "#000000", bgOpacity: .7, fontColor: "#FFFFFF" }, i.extra.tooltip),r = 4 * i.pixelRatio,s = 5 * i.pixelRatio,d = 8 * i.pixelRatio,h = !1;("line" == i.type || "area" == i.type || "candle" == i.type || "mix" == i.type) && drawToolTipSplitLine(i.tooltip.offset.x, i, a, o), t = assign({ x: 0, y: 0 }, t), t.y -= 8 * i.pixelRatio;var x = e.map(function (e) {return measureText(e.text, a.fontSize);}),c = r + s + 4 * a.toolTipPadding + Math.max.apply(null, x),p = 2 * a.toolTipPadding + e.length * a.toolTipLineHeight;!1 == l.showBox || (t.x - Math.abs(i._scrollDistance_) + d + c > i.width && (h = !0), p + t.y > i.height && (t.y = i.height - p), o.beginPath(), o.setFillStyle(hexToRgb(l.bgColor || a.toolTipBackground, l.bgOpacity || a.toolTipOpacity)), h ? (o.moveTo(t.x, t.y + 10 * i.pixelRatio), o.lineTo(t.x - d, t.y + 10 * i.pixelRatio - 5 * i.pixelRatio), o.lineTo(t.x - d, t.y), o.lineTo(t.x - d - n(c), t.y), o.lineTo(t.x - d - n(c), t.y + p), o.lineTo(t.x - d, t.y + p), o.lineTo(t.x - d, t.y + 10 * i.pixelRatio + 5 * i.pixelRatio), o.lineTo(t.x, t.y + 10 * i.pixelRatio)) : (o.moveTo(t.x, t.y + 10 * i.pixelRatio), o.lineTo(t.x + d, t.y + 10 * i.pixelRatio - 5 * i.pixelRatio), o.lineTo(t.x + d, t.y), o.lineTo(t.x + d + n(c), t.y), o.lineTo(t.x + d + n(c), t.y + p), o.lineTo(t.x + d, t.y + p), o.lineTo(t.x + d, t.y + 10 * i.pixelRatio + 5 * i.pixelRatio), o.lineTo(t.x, t.y + 10 * i.pixelRatio)), o.closePath(), o.fill(), e.forEach(function (e, i) {if (null !== e.color) {o.beginPath(), o.setFillStyle(e.color);var n = t.x + d + 2 * a.toolTipPadding,l = t.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding + 1;h && (n = t.x - c - d + 2 * a.toolTipPadding), o.fillRect(n, l, r, a.fontSize), o.closePath();}}), e.forEach(function (e, i) {var n = t.x + d + 2 * a.toolTipPadding + r + s;h && (n = t.x - c - d + 2 * a.toolTipPadding + +r + s);var x = t.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding;o.beginPath(), o.setFontSize(a.fontSize), o.setFillStyle(l.fontColor), o.fillText(e.text, n, x + a.fontSize), o.closePath(), o.stroke();}));}function drawYAxisTitle(e, t, i, a) {var o = i.xAxisHeight + (t.height - i.xAxisHeight - measureText(e)) / 2;a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(t.yAxis.titleFontColor || "#333333"), a.translate(0, t.height), a.rotate(-90 * Math.PI / 180), a.fillText(e, o, t.padding[3] + .5 * i.fontSize), a.closePath(), a.stroke(), a.restore();}function drawColumnDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.eachSpacing,s = assign({}, { type: "group", width: r / 2, meter: { border: 4, fillColor: "#FFFFFF" } }, t.extra.column),d = [];a.save();var h = -2,x = l.length + 2;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), h = Math.floor(-t._scrollDistance_ / r) - 2, x = h + t.xAxis.itemCount + 4), t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === o && drawToolTipSplitArea(t.tooltip.offset.x, t, i, a, r), e.forEach(function (n, c) {var p, g, y;p = [].concat(t.chartData.yAxisData.ranges[n.index]), g = p.pop(), y = p.shift();var f = n.data;switch (s.type) {case "group":var u = getDataPoints(f, g, y, l, r, t, i, o),m = getStackDataPoints(f, g, y, l, r, t, i, c, e, o);d.push(m), u = fixColumeData(u, r, e.length, c, i, t);for (var _e14, _o12 = 0; _o12 < u.length; _o12++) {if (_e14 = u[_o12], null !== _e14 && _o12 > h && _o12 < x) {a.beginPath(), a.setStrokeStyle(_e14.color || n.color), a.setLineWidth(1), a.setFillStyle(_e14.color || n.color);var S = _e14.x - _e14.width / 2,A = t.height - _e14.y - t.area[2];a.moveTo(S, _e14.y), a.lineTo(S + _e14.width - 2, _e14.y), a.lineTo(S + _e14.width - 2, t.height - t.area[2]), a.lineTo(S, t.height - t.area[2]), a.lineTo(S, _e14.y), a.closePath(), a.stroke(), a.fill();}};break;case "stack":var u = getStackDataPoints(f, g, y, l, r, t, i, c, e, o);d.push(u), u = fixColumeStackData(u, r, e.length, c, i, t, e);for (var _e15, _o13 = 0; _o13 < u.length; _o13++) {if (_e15 = u[_o13], null !== _e15 && _o13 > h && _o13 < x) {a.beginPath(), a.setFillStyle(_e15.color || n.color);var S = _e15.x - _e15.width / 2 + 1,A = t.height - _e15.y - t.area[2],T = t.height - _e15.y0 - t.area[2];0 < c && (A -= T), a.moveTo(S, _e15.y), a.fillRect(S, _e15.y, _e15.width - 2, A), a.closePath(), a.fill();}};break;case "meter":var u = getDataPoints(f, g, y, l, r, t, i, o);if (d.push(u), u = fixColumeMeterData(u, r, e.length, c, i, t, s.meter.border), 0 == c) {for (var _e16, _o14 = 0; _o14 < u.length; _o14++) {if (_e16 = u[_o14], null !== _e16 && _o14 > h && _o14 < x) {a.beginPath(), a.setFillStyle(s.meter.fillColor);var S = _e16.x - _e16.width / 2,A = t.height - _e16.y - t.area[2];a.moveTo(S, _e16.y), a.fillRect(S, _e16.y, _e16.width, A), a.closePath(), a.fill(), 0 < s.meter.border && (a.beginPath(), a.setStrokeStyle(n.color), a.setLineWidth(s.meter.border * t.pixelRatio), a.moveTo(S + .5 * s.meter.border, _e16.y + A), a.lineTo(S + .5 * s.meter.border, _e16.y + .5 * s.meter.border), a.lineTo(S + _e16.width - .5 * s.meter.border, _e16.y + .5 * s.meter.border), a.lineTo(S + _e16.width - .5 * s.meter.border, _e16.y + A), a.stroke());}}} else for (var _e17, _o15 = 0; _o15 < u.length; _o15++) {if (_e17 = u[_o15], null !== _e17 && _o15 > h && _o15 < x) {a.beginPath(), a.setFillStyle(_e17.color || n.color);var S = _e17.x - _e17.width / 2,A = t.height - _e17.y - t.area[2];a.moveTo(S, _e17.y), a.fillRect(S, _e17.y, _e17.width, A), a.closePath(), a.fill();}}}}), !1 !== t.dataLabel && 1 === o && e.forEach(function (n, d) {var h, x, c;h = [].concat(t.chartData.yAxisData.ranges[n.index]), x = h.pop(), c = h.shift();var p = n.data;switch (s.type) {case "group":var g = getDataPoints(p, x, c, l, r, t, i, o);g = fixColumeData(g, r, e.length, d, i, t), drawPointText(g, n, i, a);break;case "stack":var g = getStackDataPoints(p, x, c, l, r, t, i, d, e, o);drawPointText(g, n, i, a);break;case "meter":var g = getDataPoints(p, x, c, l, r, t, i, o);drawPointText(g, n, i, a);}}), a.restore(), { xAxisPoints: l, calPoints: d, eachSpacing: r };}function drawCandleDataPoints(e, t, a, i, o) {var n = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,l = assign({}, { color: {}, average: {} }, a.extra.candle);l.color = assign({}, { upLine: "#f04864", upFill: "#f04864", downLine: "#2fc25b", downFill: "#2fc25b" }, l.color), l.average = assign({}, { show: !1, name: [], day: [], color: i.colors }, l.average), a.extra.candle = l;var r = a.chartData.xAxisData,s = r.xAxisPoints,d = r.eachSpacing,h = [];o.save();var x = -2,c = s.length + 2,p = 0,g = a.width + d;return a._scrollDistance_ && 0 !== a._scrollDistance_ && !0 === a.enableScroll && (o.translate(a._scrollDistance_, 0), x = Math.floor(-a._scrollDistance_ / d) - 2, c = x + a.xAxis.itemCount + 4, p = -a._scrollDistance_ - d + a.area[3], g = p + (a.xAxis.itemCount + 4) * d), l.average.show && t.forEach(function (e) {var t, l, r;t = [].concat(a.chartData.yAxisData.ranges[e.index]), l = t.pop(), r = t.shift();var h = e.data,x = getDataPoints(h, l, r, s, d, a, i, n),c = splitPoints(x);for (var _t10, _a9 = 0; _a9 < c.length; _a9++) {if (_t10 = c[_a9], o.beginPath(), o.setStrokeStyle(e.color), o.setLineWidth(1), 1 === _t10.length) o.moveTo(_t10[0].x, _t10[0].y), o.arc(_t10[0].x, _t10[0].y, 1, 0, 2 * Math.PI);else {o.moveTo(_t10[0].x, _t10[0].y);var _e18 = 0;for (var _i11, _a10 = 0; _a10 < _t10.length; _a10++) {if (_i11 = _t10[_a10], 0 == _e18 && _i11.x > p && (o.moveTo(_i11.x, _i11.y), _e18 = 1), 0 < _a10 && _i11.x > p && _i11.x < g) {var y = createCurveControlPoints(_t10, _a10 - 1);o.bezierCurveTo(y.ctrA.x, y.ctrA.y, y.ctrB.x, y.ctrB.y, _i11.x, _i11.y);}}o.moveTo(_t10[0].x, _t10[0].y);}o.closePath(), o.stroke();}}), e.forEach(function (e) {var t, r, p;t = [].concat(a.chartData.yAxisData.ranges[e.index]), r = t.pop(), p = t.shift();var g = e.data,y = getCandleDataPoints(g, r, p, s, d, a, i, n);h.push(y);var f = splitPoints(y);for (var _t11 = 0; _t11 < f[0].length; _t11++) {if (_t11 > x && _t11 < c) {var _e19 = f[0][_t11];o.beginPath(), 0 < g[_t11][1] - g[_t11][0] ? (o.setStrokeStyle(l.color.upLine), o.setFillStyle(l.color.upFill), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_e19[3].x, _e19[3].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[1].x - d / 4, _e19[1].y), o.lineTo(_e19[0].x - d / 4, _e19[0].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[2].x, _e19[2].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[0].x + d / 4, _e19[0].y), o.lineTo(_e19[1].x + d / 4, _e19[1].y), o.lineTo(_e19[1].x, _e19[1].y), o.moveTo(_e19[3].x, _e19[3].y)) : (o.setStrokeStyle(l.color.downLine), o.setFillStyle(l.color.downFill), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_e19[3].x, _e19[3].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[0].x - d / 4, _e19[0].y), o.lineTo(_e19[1].x - d / 4, _e19[1].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[2].x, _e19[2].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[1].x + d / 4, _e19[1].y), o.lineTo(_e19[0].x + d / 4, _e19[0].y), o.lineTo(_e19[0].x, _e19[0].y), o.moveTo(_e19[3].x, _e19[3].y)), o.closePath(), o.fill(), o.stroke();}}}), o.restore(), { xAxisPoints: s, calPoints: h, eachSpacing: d };}function drawAreaDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { type: "straight", opacity: .2, addLine: !1, width: 2, gradient: !1 }, t.extra.area);var l = t.chartData.xAxisData,r = l.xAxisPoints,s = l.eachSpacing,d = t.height - t.area[2],h = [];a.save();var x = 0,c = t.width + s;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), x = -t._scrollDistance_ - s + t.area[3], c = x + (t.xAxis.itemCount + 4) * s), e.forEach(function (e) {var l, p, g;l = [].concat(t.chartData.yAxisData.ranges[e.index]), p = l.pop(), g = l.shift();var y = e.data,f = getDataPoints(y, p, g, r, s, t, i, o);h.push(f);var u = splitPoints(f);for (var _o16, _l7 = 0; _l7 < u.length; _l7++) {if (_o16 = u[_l7], a.beginPath(), a.setStrokeStyle(hexToRgb(e.color, n.opacity)), n.gradient) {var _i12 = a.createLinearGradient(0, t.area[0], 0, t.height - t.area[2]);_i12.addColorStop("0", hexToRgb(e.color, n.opacity)), _i12.addColorStop("1.0", hexToRgb("#FFFFFF", .1)), a.setFillStyle(_i12);} else a.setFillStyle(hexToRgb(e.color, n.opacity));if (a.setLineWidth(n.width * t.pixelRatio), 1 < _o16.length) {var _e20 = _o16[0],_t12 = _o16[_o16.length - 1];a.moveTo(_e20.x, _e20.y);var _i13 = 0;if ("curve" === n.type) {for (var _e21, _t13 = 0; _t13 < _o16.length; _t13++) {if (_e21 = _o16[_t13], 0 == _i13 && _e21.x > x && (a.moveTo(_e21.x, _e21.y), _i13 = 1), 0 < _t13 && _e21.x > x && _e21.x < c) {var _i14 = createCurveControlPoints(_o16, _t13 - 1);a.bezierCurveTo(_i14.ctrA.x, _i14.ctrA.y, _i14.ctrB.x, _i14.ctrB.y, _e21.x, _e21.y);}}} else for (var _e22, _t14 = 0; _t14 < _o16.length; _t14++) {_e22 = _o16[_t14], 0 == _i13 && _e22.x > x && (a.moveTo(_e22.x, _e22.y), _i13 = 1), 0 < _t14 && _e22.x > x && _e22.x < c && a.lineTo(_e22.x, _e22.y);}a.lineTo(_t12.x, d), a.lineTo(_e20.x, d), a.lineTo(_e20.x, _e20.y);} else {var _e23 = _o16[0];a.moveTo(_e23.x - s / 2, _e23.y), a.lineTo(_e23.x + s / 2, _e23.y), a.lineTo(_e23.x + s / 2, d), a.lineTo(_e23.x - s / 2, d), a.moveTo(_e23.x - s / 2, _e23.y);}if (a.closePath(), a.fill(), n.addLine) {if ("dash" == e.lineType) {var _i15 = e.dashLength ? e.dashLength : 8;_i15 *= t.pixelRatio, a.setLineDash([_i15, _i15]);}if (a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(n.width * t.pixelRatio), 1 === _o16.length) a.moveTo(_o16[0].x, _o16[0].y), a.arc(_o16[0].x, _o16[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(_o16[0].x, _o16[0].y);var _e24 = 0;if ("curve" === n.type) {for (var _t15, _i16 = 0; _i16 < _o16.length; _i16++) {if (_t15 = _o16[_i16], 0 == _e24 && _t15.x > x && (a.moveTo(_t15.x, _t15.y), _e24 = 1), 0 < _i16 && _t15.x > x && _t15.x < c) {var _e25 = createCurveControlPoints(_o16, _i16 - 1);a.bezierCurveTo(_e25.ctrA.x, _e25.ctrA.y, _e25.ctrB.x, _e25.ctrB.y, _t15.x, _t15.y);}}} else for (var _t16, _i17 = 0; _i17 < _o16.length; _i17++) {_t16 = _o16[_i17], 0 == _e24 && _t16.x > x && (a.moveTo(_t16.x, _t16.y), _e24 = 1), 0 < _i17 && _t16.x > x && _t16.x < c && a.lineTo(_t16.x, _t16.y);}a.moveTo(_o16[0].x, _o16[0].y);}a.stroke(), a.setLineDash([]);}}!1 !== t.dataPointShape && drawPointShape(f, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o && e.forEach(function (e) {var n, l, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), l = n.pop(), d = n.shift();var h = e.data,x = getDataPoints(h, l, d, r, s, t, i, o);drawPointText(x, e, i, a);}), a.restore(), { xAxisPoints: r, calPoints: h, eachSpacing: s };}function drawLineDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { type: "straight", width: 2 }, t.extra.line);n.width *= t.pixelRatio;var l = t.chartData.xAxisData,r = l.xAxisPoints,s = l.eachSpacing;var d = [];a.save();var h = 0,x = t.width + s;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), h = -t._scrollDistance_ - s + t.area[3], x = h + (t.xAxis.itemCount + 4) * s), e.forEach(function (e) {var l, c, p;l = [].concat(t.chartData.yAxisData.ranges[e.index]), c = l.pop(), p = l.shift();var g = e.data,y = getDataPoints(g, c, p, r, s, t, i, o);d.push(y);var f = splitPoints(y);if ("dash" == e.lineType) {var _i18 = e.dashLength ? e.dashLength : 8;_i18 *= t.pixelRatio, a.setLineDash([_i18, _i18]);}a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(n.width), f.forEach(function (e) {if (1 === e.length) a.moveTo(e[0].x, e[0].y), a.arc(e[0].x, e[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(e[0].x, e[0].y);var _i19 = 0;if ("curve" === n.type) {for (var _o17, _n15 = 0; _n15 < e.length; _n15++) {if (_o17 = e[_n15], 0 == _i19 && _o17.x > h && (a.moveTo(_o17.x, _o17.y), _i19 = 1), 0 < _n15 && _o17.x > h && _o17.x < x) {var t = createCurveControlPoints(e, _n15 - 1);a.bezierCurveTo(t.ctrA.x, t.ctrA.y, t.ctrB.x, t.ctrB.y, _o17.x, _o17.y);}}} else for (var _t17, _o18 = 0; _o18 < e.length; _o18++) {_t17 = e[_o18], 0 == _i19 && _t17.x > h && (a.moveTo(_t17.x, _t17.y), _i19 = 1), 0 < _o18 && _t17.x > h && _t17.x < x && a.lineTo(_t17.x, _t17.y);}a.moveTo(e[0].x, e[0].y);}}), a.stroke(), a.setLineDash([]), !1 !== t.dataPointShape && drawPointShape(y, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o && e.forEach(function (e) {var n, l, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), l = n.pop(), d = n.shift();var h = e.data,x = getDataPoints(h, l, d, r, s, t, i, o);drawPointText(x, e, i, a);}), a.restore(), { xAxisPoints: r, calPoints: d, eachSpacing: s };}function drawMixDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.eachSpacing,s = t.height - t.area[2],d = [];var h = 0,x = 0;e.forEach(function (e) {"column" == e.type && (x += 1);}), a.save();var c = -2,p = l.length + 2,g = 0,y = t.width + r;if (t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), c = Math.floor(-t._scrollDistance_ / r) - 2, p = c + t.xAxis.itemCount + 4, g = -t._scrollDistance_ - r + t.area[3], y = g + (t.xAxis.itemCount + 4) * r), e.forEach(function (e) {var n, f, u;n = [].concat(t.chartData.yAxisData.ranges[e.index]), f = n.pop(), u = n.shift();var m = e.data,S = getDataPoints(m, f, u, l, r, t, i, o);if (d.push(S), "column" == e.type) {S = fixColumeData(S, r, x, h, i, t);for (var _o19, _n16 = 0; _n16 < S.length; _n16++) {if (_o19 = S[_n16], null !== _o19 && _n16 > c && _n16 < p) {a.beginPath(), a.setStrokeStyle(_o19.color || e.color), a.setLineWidth(1), a.setFillStyle(_o19.color || e.color);var A = _o19.x - _o19.width / 2,T = t.height - _o19.y - t.area[2];a.moveTo(A, _o19.y), a.moveTo(A, _o19.y), a.lineTo(A + _o19.width - 2, _o19.y), a.lineTo(A + _o19.width - 2, t.height - t.area[2]), a.lineTo(A, t.height - t.area[2]), a.lineTo(A, _o19.y), a.closePath(), a.stroke(), a.fill(), a.closePath(), a.fill();}}h += 1;}if ("area" == e.type) {var _o20 = splitPoints(S);for (var _n17, _l8 = 0; _l8 < _o20.length; _l8++) {if (_n17 = _o20[_l8], a.beginPath(), a.setStrokeStyle(e.color), a.setFillStyle(hexToRgb(e.color, .2)), a.setLineWidth(2 * t.pixelRatio), 1 < _n17.length) {var b = _n17[0];var _t18 = _n17[_n17.length - 1];a.moveTo(b.x, b.y);var _i20 = 0;if ("curve" === e.style) {for (var _e26, _t19 = 0; _t19 < _n17.length; _t19++) {if (_e26 = _n17[_t19], 0 == _i20 && _e26.x > g && (a.moveTo(_e26.x, _e26.y), _i20 = 1), 0 < _t19 && _e26.x > g && _e26.x < y) {var P = createCurveControlPoints(_n17, _t19 - 1);a.bezierCurveTo(P.ctrA.x, P.ctrA.y, P.ctrB.x, P.ctrB.y, _e26.x, _e26.y);}}} else for (var _e27, _t20 = 0; _t20 < _n17.length; _t20++) {_e27 = _n17[_t20], 0 == _i20 && _e27.x > g && (a.moveTo(_e27.x, _e27.y), _i20 = 1), 0 < _t20 && _e27.x > g && _e27.x < y && a.lineTo(_e27.x, _e27.y);}a.lineTo(_t18.x, s), a.lineTo(b.x, s), a.lineTo(b.x, b.y);} else {var _e28 = _n17[0];a.moveTo(_e28.x - r / 2, _e28.y), a.lineTo(_e28.x + r / 2, _e28.y), a.lineTo(_e28.x + r / 2, s), a.lineTo(_e28.x - r / 2, s), a.moveTo(_e28.x - r / 2, _e28.y);}a.closePath(), a.fill();}}if ("line" == e.type) {var _ = splitPoints(S);_.forEach(function (i) {if ("dash" == e.lineType) {var _i21 = e.dashLength ? e.dashLength : 8;_i21 *= t.pixelRatio, a.setLineDash([_i21, _i21]);}if (a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(2 * t.pixelRatio), 1 === i.length) a.moveTo(i[0].x, i[0].y), a.arc(i[0].x, i[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(i[0].x, i[0].y);var _t21 = 0;if ("curve" == e.style) {for (var _e29, _n18 = 0; _n18 < i.length; _n18++) {if (_e29 = i[_n18], 0 == _t21 && _e29.x > g && (a.moveTo(_e29.x, _e29.y), _t21 = 1), 0 < _n18 && _e29.x > g && _e29.x < y) {var o = createCurveControlPoints(i, _n18 - 1);a.bezierCurveTo(o.ctrA.x, o.ctrA.y, o.ctrB.x, o.ctrB.y, _e29.x, _e29.y);}}} else for (var _e30, _o21 = 0; _o21 < i.length; _o21++) {_e30 = i[_o21], 0 == _t21 && _e30.x > g && (a.moveTo(_e30.x, _e30.y), _t21 = 1), 0 < _o21 && _e30.x > g && _e30.x < y && a.lineTo(_e30.x, _e30.y);}a.moveTo(i[0].x, i[0].y);}a.stroke(), a.setLineDash([]);});}"point" == e.type && (e.addPoint = !0), !0 == e.addPoint && "column" !== e.type && drawPointShape(S, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o) {var h = 0;e.forEach(function (e) {var n, s, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), s = n.pop(), d = n.shift();var c = e.data,p = getDataPoints(c, s, d, l, r, t, i, o);"column" === e.type ? (p = fixColumeData(p, r, x, h, i, t), drawPointText(p, e, i, a), h += 1) : drawPointText(p, e, i, a);});}return a.restore(), { xAxisPoints: l, calPoints: d, eachSpacing: r };}function drawToolTipBridge(e, t, i, a, o, n) {var l = e.extra.tooltip || {};l.horizentalLine && e.tooltip && 1 === a && ("line" == e.type || "area" == e.type || "column" == e.type || "candle" == e.type || "mix" == e.type) && drawToolTipHorizentalLine(e, t, i, o, n), i.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && i.translate(e._scrollDistance_, 0), e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && drawToolTip(e.tooltip.textList, e.tooltip.offset, e, t, i, o, n), i.restore();}function drawXAxis(e, t, i, a) {var o = Math.ceil;var n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.startX,s = n.endX,d = n.eachSpacing;var h = "center";("line" == t.type || "area" == t.type) && (h = t.xAxis.boundaryGap);var x = t.height - t.area[2],c = t.area[0];if (t.enableScroll && t.xAxis.scrollShow) {var p = t.height - t.area[2] + i.xAxisHeight,g = s - r,y = d * (l.length - 1),f = 0;t._scrollDistance_ && (f = -t._scrollDistance_ * g / y), a.beginPath(), a.setLineCap("round"), a.setLineWidth(6 * t.pixelRatio), a.setStrokeStyle(t.xAxis.scrollBackgroundColor || "#EFEBEF"), a.moveTo(r, p), a.lineTo(s, p), a.stroke(), a.closePath(), a.beginPath(), a.setLineCap("round"), a.setLineWidth(6 * t.pixelRatio), a.setStrokeStyle(t.xAxis.scrollColor || "#A6A6A6"), a.moveTo(r + f, p), a.lineTo(r + f + g * g / y, p), a.stroke(), a.closePath(), a.setLineCap("butt");}if (a.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && a.translate(t._scrollDistance_, 0), !0 === t.xAxis.calibration && (a.setStrokeStyle(t.xAxis.gridColor || "#cccccc"), a.setLineCap("butt"), a.setLineWidth(1 * t.pixelRatio), l.forEach(function (e, i) {0 < i && (a.beginPath(), a.moveTo(e - d / 2, x), a.lineTo(e - d / 2, x + 3 * t.pixelRatio), a.closePath(), a.stroke());})), !0 !== t.xAxis.disableGrid && (a.setStrokeStyle(t.xAxis.gridColor || "#cccccc"), a.setLineCap("butt"), a.setLineWidth(1 * t.pixelRatio), "dash" == t.xAxis.gridType && a.setLineDash([t.xAxis.dashLength, t.xAxis.dashLength]), t.xAxis.gridEval = t.xAxis.gridEval || 1, l.forEach(function (e, i) {0 == i % t.xAxis.gridEval && (a.beginPath(), a.moveTo(e, x), a.lineTo(e, c), a.stroke());}), a.setLineDash([])), !0 !== t.xAxis.disabled) {var _n19 = e.length;t.xAxis.labelCount && (_n19 = t.xAxis.itemCount ? o(e.length / t.xAxis.itemCount * t.xAxis.labelCount) : t.xAxis.labelCount, _n19 -= 1);var _r8 = o(e.length / _n19),_s3 = [],_c = e.length;for (var _t22 = 0; _t22 < _c; _t22++) {0 == _t22 % _r8 ? _s3.push(e[_t22]) : _s3.push("");}_s3[_c - 1] = e[_c - 1];var u = t.xAxis.fontSize || i.fontSize;0 === i._xAxisTextAngle_ ? _s3.forEach(function (e, o) {var n = -measureText(e + "", u) / 2;"center" == h && (n += d / 2);var r = 0;t.xAxis.scrollShow && (r = 6 * t.pixelRatio), a.beginPath(), a.setFontSize(u), a.setFillStyle(t.xAxis.fontColor || "#666666"), a.fillText(e + "", l[o] + n, x + u + (i.xAxisHeight - r - u) / 2), a.closePath(), a.stroke();}) : _s3.forEach(function (e, o) {a.save(), a.beginPath(), a.setFontSize(u), a.setFillStyle(t.xAxis.fontColor || "#666666");var n = measureText(e + "", u),r = -n;"center" == h && (r += d / 2);var s = calRotateTranslate(l[o] + d / 2, x + u / 2 + 5, t.height),c = s.transX,p = s.transY;a.rotate(-1 * i._xAxisTextAngle_), a.translate(c, p), a.fillText(e + "", l[o] + r, x + u + 5), a.closePath(), a.stroke(), a.restore();});}a.restore(), t.xAxis.axisLine && (a.beginPath(), a.setStrokeStyle(t.xAxis.axisLineColor), a.setLineWidth(1 * t.pixelRatio), a.moveTo(r, t.height - t.area[2]), a.lineTo(s, t.height - t.area[2]), a.stroke());}function drawYAxisGrid(e, t, i, a) {if (!0 === t.yAxis.disableGrid) return;var o = t.height - t.area[0] - t.area[2],n = o / t.yAxis.splitNumber,l = t.area[3],r = t.chartData.xAxisData.xAxisPoints,s = t.chartData.xAxisData.eachSpacing,d = s * (r.length - 1),h = [];for (var _o22 = 0; _o22 < t.yAxis.splitNumber + 1; _o22++) {h.push(t.height - t.area[2] - n * _o22);}a.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && a.translate(t._scrollDistance_, 0), "dash" == t.yAxis.gridType && a.setLineDash([t.yAxis.dashLength, t.yAxis.dashLength]), a.setStrokeStyle(t.yAxis.gridColor), a.setLineWidth(1 * t.pixelRatio), h.forEach(function (e) {a.beginPath(), a.moveTo(l, e), a.lineTo(l + d, e), a.stroke();}), a.setLineDash([]), a.restore();}function drawYAxis(e, t, a, o) {if (!0 === t.yAxis.disabled) return;var i = t.height - t.area[0] - t.area[2],n = i / t.yAxis.splitNumber,l = t.area[3],r = t.width - t.area[1],s = t.height - t.area[2],d = s + a.xAxisHeight;t.xAxis.scrollShow && (d -= 3 * t.pixelRatio), t.xAxis.rotateLabel && (d = t.height - t.area[2] + 3), o.beginPath(), o.setFillStyle(t.background || "#ffffff"), 0 > t._scrollDistance_ && o.fillRect(0, 0, l, d), !0 == t.enableScroll && o.fillRect(r, 0, t.width, d), o.closePath(), o.stroke();var h = [];for (var _l9 = 0; _l9 <= t.yAxis.splitNumber; _l9++) {h.push(t.area[0] + n * _l9);}var x = t.area[3],c = t.width - t.area[1];var _loop3 = function _loop3(_n21, _l10) {if (_n21 = t.yAxis.data[_l10], !0 !== _n21.disabled) {var _e31 = t.chartData.yAxisData.rangesFormat[_l10],_i22 = _n21.fontSize || a.fontSize,_r9 = t.chartData.yAxisData.yAxisWidth[_l10];if (_e31.forEach(function (e, a) {var l = h[a] ? h[a] : s;o.beginPath(), o.setFontSize(_i22), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(_n21.axisLineColor || "#cccccc"), o.setFillStyle(_n21.fontColor || "#666666"), "left" == _r9.position ? (o.fillText(e + "", x - _r9.width, l + _i22 / 2), !0 == _n21.calibration && (o.moveTo(x, l), o.lineTo(x - 3 * t.pixelRatio, l))) : (o.fillText(e + "", c + 4 * t.pixelRatio, l + _i22 / 2), !0 == _n21.calibration && (o.moveTo(c, l), o.lineTo(c + 3 * t.pixelRatio, l))), o.closePath(), o.stroke();}), !1 !== _n21.axisLine && (o.beginPath(), o.setStrokeStyle(_n21.axisLineColor || "#cccccc"), o.setLineWidth(1 * t.pixelRatio), "left" == _r9.position ? (o.moveTo(x, t.height - t.area[2]), o.lineTo(x, t.area[0])) : (o.moveTo(c, t.height - t.area[2]), o.lineTo(c, t.area[0])), o.stroke()), t.yAxis.showTitle) {var _e32 = _n21.titleFontSize || a.fontSize,_i23 = _n21.title;o.beginPath(), o.setFontSize(_e32), o.setFillStyle(_n21.titleFontColor || "#666666"), "left" == _r9.position ? o.fillText(_i23, x - measureText(_i23, _e32) / 2, t.area[0] - 10 * t.pixelRatio) : o.fillText(_i23, c - measureText(_i23, _e32) / 2, t.area[0] - 10 * t.pixelRatio), o.closePath(), o.stroke();}"left" == _r9.position ? x -= _r9.width + t.yAxis.padding : c += _r9.width + t.yAxis.padding;}_n20 = _n21;};for (var _n20, _l10 = 0; _l10 < t.yAxis.data.length; _l10++) {_loop3(_n20, _l10);}}function drawLegend(e, t, i, a, o) {if (!1 === t.legend.show) return;var n = o.legendData,l = n.points,r = n.area,s = t.legend.padding,d = t.legend.fontSize,h = 15 * t.pixelRatio,x = 5 * t.pixelRatio,c = t.legend.itemGap,p = Math.max(t.legend.lineHeight * t.pixelRatio, d);a.beginPath(), a.setLineWidth(t.legend.borderWidth), a.setStrokeStyle(t.legend.borderColor), a.setFillStyle(t.legend.backgroundColor), a.moveTo(r.start.x, r.start.y), a.rect(r.start.x, r.start.y, r.width, r.height), a.closePath(), a.fill(), a.stroke(), l.forEach(function (e, o) {var l = 0,g = 0;l = n.widthArr[o], g = n.heightArr[o];var y = 0,f = 0;"top" == t.legend.position || "bottom" == t.legend.position ? (y = r.start.x + (r.width - l) / 2, f = r.start.y + s + o * p) : (l = 0 == o ? 0 : n.widthArr[o - 1], y = r.start.x + s + l, f = r.start.y + s + (r.height - g) / 2), a.setFontSize(i.fontSize);for (var _n22, _l11 = 0; _l11 < e.length; _l11++) {switch (_n22 = e[_l11], _n22.area = [0, 0, 0, 0], _n22.area[0] = y, _n22.area[1] = f, _n22.area[3] = f + p, a.beginPath(), a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(_n22.show ? _n22.color : t.legend.hiddenColor), a.setFillStyle(_n22.show ? _n22.color : t.legend.hiddenColor), _n22.legendShape) {case "line":a.moveTo(y, f + .5 * p - 2 * t.pixelRatio), a.fillRect(y, f + .5 * p - 2 * t.pixelRatio, 15 * t.pixelRatio, 4 * t.pixelRatio);break;case "triangle":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio), a.lineTo(y + 2.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 12.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio);break;case "diamond":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio), a.lineTo(y + 2.5 * t.pixelRatio, f + .5 * p), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 12.5 * t.pixelRatio, f + .5 * p), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio);break;case "circle":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p), a.arc(y + 7.5 * t.pixelRatio, f + .5 * p, 5 * t.pixelRatio, 0, 2 * Math.PI);break;case "rect":a.moveTo(y, f + .5 * p - 5 * t.pixelRatio), a.fillRect(y, f + .5 * p - 5 * t.pixelRatio, 15 * t.pixelRatio, 10 * t.pixelRatio);break;default:a.moveTo(y, f + .5 * p - 5 * t.pixelRatio), a.fillRect(y, f + .5 * p - 5 * t.pixelRatio, 15 * t.pixelRatio, 10 * t.pixelRatio);}a.closePath(), a.fill(), a.stroke(), y += h + x;a.beginPath(), a.setFontSize(d), a.setFillStyle(_n22.show ? t.legend.fontColor : t.legend.hiddenColor), a.fillText(_n22.name, y, f + (.5 * p + .5 * d - 2)), a.closePath(), a.stroke(), "top" == t.legend.position || "bottom" == t.legend.position ? (y += measureText(_n22.name, d) + c, _n22.area[2] = y) : (_n22.area[2] = y + measureText(_n22.name, d) + c, y -= h + x, f += p);}});}function drawPieDataPoints(e, t, a, o) {var n = Math.PI,l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,r = assign({}, { activeOpacity: .5, activeRadius: 10 * t.pixelRatio, offsetAngle: 0, labelWidth: 15 * t.pixelRatio, ringWidth: 0, border: !1, borderWidth: 2, borderColor: "#FFFFFF" }, t.extra.pie),s = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 };0 == a.pieChartLinePadding && (a.pieChartLinePadding = r.activeRadius);var d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding - a._pieTextMaxLength_, (t.height - t.area[0] - t.area[2]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding);e = getPieDataPoints(e, d, l);var h = r.activeRadius;if (e = e.map(function (e) {return e._start_ += r.offsetAngle * n / 180, e;}), e.forEach(function (e, i) {t.tooltip && t.tooltip.index == i && (o.beginPath(), o.setFillStyle(hexToRgb(e.color, t.extra.pie.activeOpacity || .5)), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_ + h, e._start_, e._start_ + 2 * e._proportion_ * n), o.closePath(), o.fill()), o.beginPath(), o.setLineWidth(r.borderWidth * t.pixelRatio), o.lineJoin = "round", o.setStrokeStyle(r.borderColor), o.setFillStyle(e.color), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_, e._start_, e._start_ + 2 * e._proportion_ * n), o.closePath(), o.fill(), !0 == r.border && o.stroke();}), "ring" === t.type) {var x = .6 * d;"number" == typeof t.extra.pie.ringWidth && 0 < t.extra.pie.ringWidth && (x = Math.max(0, d - t.extra.pie.ringWidth)), o.beginPath(), o.setFillStyle(t.background || "#ffffff"), o.moveTo(s.x, s.y), o.arc(s.x, s.y, x, 0, 2 * n), o.closePath(), o.fill();}if (!1 !== t.dataLabel && 1 === l) {for (var c = !1, p = 0, g = e.length; p < g; p++) {if (0 < e[p].data) {c = !0;break;}}c && drawPieText(e, t, a, o, d, s);}return 1 === l && "ring" === t.type && drawRingTitle(t, a, o, s), { center: s, radius: d, series: e };}function drawRoseDataPoints(e, t, a, o) {var n = Math.PI,l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,r = assign({}, { type: "area", activeOpacity: .5, activeRadius: 10 * t.pixelRatio, offsetAngle: 0, labelWidth: 15 * t.pixelRatio, border: !1, borderWidth: 2, borderColor: "#FFFFFF" }, t.extra.rose);0 == a.pieChartLinePadding && (a.pieChartLinePadding = r.activeRadius);var s = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 },d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding - a._pieTextMaxLength_, (t.height - t.area[0] - t.area[2]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding),h = r.minRadius || .5 * d;e = getRoseDataPoints(e, r.type, h, d, l);var x = r.activeRadius;if (e = e.map(function (e) {return e._start_ += (r.offsetAngle || 0) * n / 180, e;}), e.forEach(function (e, i) {t.tooltip && t.tooltip.index == i && (o.beginPath(), o.setFillStyle(hexToRgb(e.color, r.activeOpacity || .5)), o.moveTo(s.x, s.y), o.arc(s.x, s.y, x + e._radius_, e._start_, e._start_ + 2 * e._rose_proportion_ * n), o.closePath(), o.fill()), o.beginPath(), o.setLineWidth(r.borderWidth * t.pixelRatio), o.lineJoin = "round", o.setStrokeStyle(r.borderColor), o.setFillStyle(e.color), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_, e._start_, e._start_ + 2 * e._rose_proportion_ * n), o.closePath(), o.fill(), !0 == r.border && o.stroke();}), !1 !== t.dataLabel && 1 === l) {for (var c = !1, p = 0, g = e.length; p < g; p++) {if (0 < e[p].data) {c = !0;break;}}c && drawPieText(e, t, a, o, d, s);}return { center: s, radius: d, series: e };}function drawArcbarDataPoints(e, t, i, a) {var o = Math.PI,n = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,l = assign({}, { startAngle: .75, endAngle: .25, type: "default", width: 12 * t.pixelRatio, gap: 2 * t.pixelRatio }, t.extra.arcbar);e = getArcbarDataPoints(e, l, n);var r = l.center ? l.center : { x: t.width / 2, y: t.height / 2 };var s;l.radius ? s = l.radius : (s = Math.min(r.x, r.y), s -= 5 * t.pixelRatio, s -= l.width / 2);for (var _n23, d = 0; d < e.length; d++) {_n23 = e[d], a.setLineWidth(l.width), a.setStrokeStyle(l.backgroundColor || "#E9E9E9"), a.setLineCap("round"), a.beginPath(), "default" == l.type ? a.arc(r.x, r.y, s - (l.width + l.gap) * d, l.startAngle * o, l.endAngle * o, !1) : a.arc(r.x, r.y, s - (l.width + l.gap) * d, 0, 2 * o, !1), a.stroke(), a.setLineWidth(l.width), a.setStrokeStyle(_n23.color), a.setLineCap("round"), a.beginPath(), a.arc(r.x, r.y, s - (l.width + l.gap) * d, l.startAngle * o, _n23._proportion_ * o, !1), a.stroke();}return drawRingTitle(t, i, a, r), { center: r, radius: s, series: e };}function drawGaugeDataPoints(e, t, a, i, o) {var n = Math.PI,l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,r = assign({}, { type: "default", startAngle: .75, endAngle: .25, width: 15, splitLine: { fixRadius: 0, splitNumber: 10, width: 15, color: "#FFFFFF", childNumber: 5, childWidth: 5 }, pointer: { width: 15, color: "auto" } }, a.extra.gauge);null == r.oldAngle && (r.oldAngle = r.startAngle), null == r.oldData && (r.oldData = 0), e = getGaugeAxisPoints(e, r.startAngle, r.endAngle);var s = { x: a.width / 2, y: a.height / 2 },d = Math.min(s.x, s.y);d -= 5 * a.pixelRatio, d -= r.width / 2;var h = d - r.width,x = 0;if ("progress" == r.type) {var c = d - 3 * r.width;o.beginPath();var _e33 = o.createLinearGradient(s.x, s.y - c, s.x, s.y + c);_e33.addColorStop("0", hexToRgb(t[0].color, .3)), _e33.addColorStop("1.0", hexToRgb("#FFFFFF", .1)), o.setFillStyle(_e33), o.arc(s.x, s.y, c, 0, 2 * n, !1), o.fill(), o.setLineWidth(r.width), o.setStrokeStyle(hexToRgb(t[0].color, .3)), o.setLineCap("round"), o.beginPath(), o.arc(s.x, s.y, h, r.startAngle * n, r.endAngle * n, !1), o.stroke(), x = r.startAngle - r.endAngle + 1;var _i24 = x / r.splitLine.splitNumber,p = x / r.splitLine.splitNumber / r.splitLine.childNumber,g = -d - .5 * r.width - r.splitLine.fixRadius,y = -d - r.width - r.splitLine.fixRadius + r.splitLine.width;o.save(), o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);var f = r.splitLine.splitNumber * r.splitLine.childNumber + 1,u = t[0].data * l;for (var _e34 = 0; _e34 < f; _e34++) {o.beginPath(), u > _e34 / f ? o.setStrokeStyle(hexToRgb(t[0].color, 1)) : o.setStrokeStyle(hexToRgb(t[0].color, .3)), o.setLineWidth(3 * a.pixelRatio), o.moveTo(g, 0), o.lineTo(y, 0), o.stroke(), o.rotate(p * n);}o.restore(), t = getArcbarDataPoints(t, r, l), o.setLineWidth(r.width), o.setStrokeStyle(t[0].color), o.setLineCap("round"), o.beginPath(), o.arc(s.x, s.y, h, r.startAngle * n, t[0]._proportion_ * n, !1), o.stroke();var m = d - 2.5 * r.width;o.save(), o.translate(s.x, s.y), o.rotate((t[0]._proportion_ - 1) * n), o.beginPath(), o.setLineWidth(r.width / 3);var S = o.createLinearGradient(0, .6 * -m, 0, .6 * m);S.addColorStop("0", hexToRgb("#FFFFFF", 0)), S.addColorStop("0.5", hexToRgb(t[0].color, 1)), S.addColorStop("1.0", hexToRgb("#FFFFFF", 0)), o.setStrokeStyle(S), o.arc(0, 0, m, .85 * n, 1.15 * n, !1), o.stroke(), o.beginPath(), o.setLineWidth(1), o.setStrokeStyle(t[0].color), o.setFillStyle(t[0].color), o.moveTo(-m - r.width / 3 / 2, -4), o.lineTo(-m - r.width / 3 / 2 - 4, 0), o.lineTo(-m - r.width / 3 / 2, 4), o.lineTo(-m - r.width / 3 / 2, -4), o.stroke(), o.fill(), o.restore();} else {o.setLineWidth(r.width), o.setLineCap("butt");for (var _t23, _a11 = 0; _a11 < e.length; _a11++) {_t23 = e[_a11], o.beginPath(), o.setStrokeStyle(_t23.color), o.arc(s.x, s.y, d, _t23._startAngle_ * n, _t23._endAngle_ * n, !1), o.stroke();}o.save(), x = r.startAngle - r.endAngle + 1;var _c2 = x / r.splitLine.splitNumber,_p2 = x / r.splitLine.splitNumber / r.splitLine.childNumber,_g2 = -d - .5 * r.width - r.splitLine.fixRadius,_y = -d - .5 * r.width - r.splitLine.fixRadius + r.splitLine.width,_f = -d - .5 * r.width - r.splitLine.fixRadius + r.splitLine.childWidth;o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);for (var _e35 = 0; _e35 < r.splitLine.splitNumber + 1; _e35++) {o.beginPath(), o.setStrokeStyle(r.splitLine.color), o.setLineWidth(2 * a.pixelRatio), o.moveTo(_g2, 0), o.lineTo(_y, 0), o.stroke(), o.rotate(_c2 * n);}o.restore(), o.save(), o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);for (var _e36 = 0; _e36 < r.splitLine.splitNumber * r.splitLine.childNumber + 1; _e36++) {o.beginPath(), o.setStrokeStyle(r.splitLine.color), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_g2, 0), o.lineTo(_f, 0), o.stroke(), o.rotate(_p2 * n);}o.restore(), t = getGaugeDataPoints(t, e, r, l);for (var _e37, _a12 = 0; _a12 < t.length; _a12++) {_e37 = t[_a12], o.save(), o.translate(s.x, s.y), o.rotate((_e37._proportion_ - 1) * n), o.beginPath(), o.setFillStyle(_e37.color), o.moveTo(r.pointer.width, 0), o.lineTo(0, -r.pointer.width / 2), o.lineTo(-h, 0), o.lineTo(0, r.pointer.width / 2), o.lineTo(r.pointer.width, 0), o.closePath(), o.fill(), o.beginPath(), o.setFillStyle("#FFFFFF"), o.arc(0, 0, r.pointer.width / 6, 0, 2 * n, !1), o.fill(), o.restore();}!1 !== a.dataLabel && drawGaugeLabel(r, d, s, a, i, o);}return drawRingTitle(a, i, o, s), 1 === l && "gauge" === a.type && (a.extra.gauge.oldAngle = t[0]._proportion_, a.extra.gauge.oldData = t[0].data), { center: s, radius: d, innerRadius: h, categories: e, totalAngle: x };}function drawRadarDataPoints(e, t, a, o) {var n = Math.cos,l = Math.sin,r = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,s = assign({}, { gridColor: "#cccccc", labelColor: "#666666", opacity: .2, gridCount: 3 }, t.extra.radar),d = getRadarCoordinateSeries(t.categories.length),h = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 },x = Math.min(h.x - (getMaxTextListLength(t.categories) + a.radarLabelTextMargin), h.y - a.radarLabelTextMargin);x -= t.padding[1], o.beginPath(), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(s.gridColor), d.forEach(function (e) {var t = convertCoordinateOrigin(x * n(e), x * l(e), h);o.moveTo(h.x, h.y), o.lineTo(t.x, t.y);}), o.stroke(), o.closePath();for (var c = function c(e) {var i = {};o.beginPath(), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(s.gridColor), d.forEach(function (t, a) {var r = convertCoordinateOrigin(x / s.gridCount * e * n(t), x / s.gridCount * e * l(t), h);0 === a ? (i = r, o.moveTo(r.x, r.y)) : o.lineTo(r.x, r.y);}), o.lineTo(i.x, i.y), o.stroke(), o.closePath();}, p = 1; p <= s.gridCount; p++) {c(p);}var g = getRadarDataPoints(d, h, x, e, t, r);return g.forEach(function (e) {if (o.beginPath(), o.setFillStyle(hexToRgb(e.color, s.opacity)), e.data.forEach(function (e, t) {0 === t ? o.moveTo(e.position.x, e.position.y) : o.lineTo(e.position.x, e.position.y);}), o.closePath(), o.fill(), !1 !== t.dataPointShape) {var i = e.data.map(function (e) {return e.position;});drawPointShape(i, e.color, e.pointShape, o, t);}}), drawRadarLabel(d, x, h, t, a, o), { center: h, radius: x, angleList: d };}function normalInt(e, t, a) {a = 0 == a ? 1 : a;for (var o = [], n = 0; n < a; n++) {o[n] = Math.random();}return Math.floor(o.reduce(function (e, t) {return e + t;}) / a * (t - e)) + e;}function collisionNew(e, t, a, o) {var n = !1;for (var l = 0; l < t.length; l++) {if (t[l].area) if (!(e[3] < t[l].area[1] || e[0] > t[l].area[2] || e[1] > t[l].area[3] || e[2] < t[l].area[0])) {n = !0;break;} else if (0 > e[0] || 0 > e[1] || e[2] > a || e[3] > o) {n = !0;break;} else n = !1;}return n;}function getBoundingBox(e) {var t,a = {};a.xMin = 180, a.xMax = 0, a.yMin = 90, a.yMax = 0;for (var o, n = 0; n < e.length; n++) {o = e[n].geometry.coordinates;for (var l = 0; l < o.length; l++) {t = o[l], 1 == t.length && (t = t[0]);for (var r = 0; r < t.length; r++) {var s = t[r][0],d = t[r][1],h = { x: s, y: d };a.xMin = a.xMin < h.x ? a.xMin : h.x, a.xMax = a.xMax > h.x ? a.xMax : h.x, a.yMin = a.yMin < h.y ? a.yMin : h.y, a.yMax = a.yMax > h.y ? a.yMax : h.y;}}}return a;}function coordinateToPoint(e, t, i, a, o, n) {return { x: (t - i.xMin) * a + o, y: (i.yMax - e) * a + n };}function pointToCoordinate(e, t, i, a, o, n) {return { x: (t - o) / a + i.xMin, y: i.yMax - (e - n) / a };}function isRayIntersectsSegment(e, t, i) {if (t[1] == i[1]) return !1;if (t[1] > e[1] && i[1] > e[1]) return !1;if (t[1] < e[1] && i[1] < e[1]) return !1;if (t[1] == e[1] && i[1] > e[1]) return !1;if (i[1] == e[1] && t[1] > e[1]) return !1;if (t[0] < e[0] && i[1] < e[1]) return !1;var a = i[0] - (i[0] - t[0]) * (i[1] - e[1]) / (i[1] - t[1]);return !(a < e[0]);}function isPoiWithinPoly(e, t) {var i = 0;for (var a, o = 0; o < t.length; o++) {a = t[o][0], 1 == t.length && (a = t[o][0]);for (var _t24 = 0; _t24 < a.length - 1; _t24++) {var _o23 = a[_t24],n = a[_t24 + 1];isRayIntersectsSegment(e, _o23, n) && (i += 1);}}return !(1 != i % 2);}function drawMapDataPoints(e, t, a, o) {var n,l,r = Math.abs,s = assign({}, { border: !0, borderWidth: 1, borderColor: "#666666", fillOpacity: .6, activeBorderColor: "#f04864", activeFillColor: "#facc14", activeFillOpacity: 1 }, t.extra.map),d = e,h = getBoundingBox(d),x = t.width / r(h.xMax - h.xMin),c = t.height / r(h.yMax - h.yMin),p = x < c ? x : c,g = t.width / 2 - r(h.xMax - h.xMin) / 2 * p,y = t.height / 2 - r(h.yMax - h.yMin) / 2 * p;o.beginPath(), o.clearRect(0, 0, t.width, t.height), o.setFillStyle(t.background || "#FFFFFF"), o.rect(0, 0, t.width, t.height), o.fill();for (var f = 0; f < d.length; f++) {o.beginPath(), o.setLineWidth(s.borderWidth * t.pixelRatio), o.setStrokeStyle(s.borderColor), o.setFillStyle(hexToRgb(e[f].color, s.fillOpacity)), t.tooltip && t.tooltip.index == f && (o.setStrokeStyle(s.activeBorderColor), o.setFillStyle(hexToRgb(s.activeFillColor, s.activeFillOpacity)));for (var u = d[f].geometry.coordinates, m = 0; m < u.length; m++) {n = u[m], 1 == n.length && (n = n[0]);for (var S = 0; S < n.length; S++) {l = coordinateToPoint(n[S][1], n[S][0], h, p, g, y), 0 == S ? (o.beginPath(), o.moveTo(l.x, l.y)) : o.lineTo(l.x, l.y);}o.fill(), !0 == s.border && o.stroke();}if (!0 == t.dataLabel) {var A = d[f].properties.centroid;if (A) {l = coordinateToPoint(A[1], A[0], h, p, g, y);var _e38 = d[f].textSize || a.fontSize,_t25 = d[f].properties.name;o.beginPath(), o.setFontSize(_e38), o.setFillStyle(d[f].textColor || "#666666"), o.fillText(_t25, l.x - measureText(_t25, _e38) / 2, l.y + _e38 / 2), o.closePath(), o.stroke();}}}t.chartData.mapData = { bounds: h, scale: p, xoffset: g, yoffset: y }, drawToolTipBridge(t, a, o, 1), o.draw();}function getWordCloudPoint(e, t) {var a = e.series.sort(function (e, t) {return parseInt(t.textSize) - parseInt(e.textSize);});switch (t) {case "normal":for (var _t26 = 0; _t26 < a.length; _t26++) {var i = void 0,_o24 = void 0,n = void 0,l = a[_t26].name,r = a[_t26].textSize,s = measureText(l, r),d = 0;for (;;) {d++, i = normalInt(-e.width / 2, e.width / 2, 5) - s / 2, _o24 = normalInt(-e.height / 2, e.height / 2, 5) + r / 2, n = [i - 5 + e.width / 2, _o24 - 5 - r + e.height / 2, i + s + 5 + e.width / 2, _o24 + 5 + e.height / 2];var _t27 = collisionNew(n, a, e.width, e.height);if (!_t27) break;if (1e3 == d) {n = [-100, -100, -100, -100];break;}}a[_t26].area = n;}break;case "vertical":var o = function o() {return !!(.7 < Math.random());};;for (var _t28 = 0; _t28 < a.length; _t28++) {var _i25 = void 0,_n24 = void 0,_l12 = void 0,_r10 = void 0,_s4 = a[_t28].name,_d3 = a[_t28].textSize,h = measureText(_s4, _d3),x = o(),c = 0;for (;;) {c++;var _t29 = void 0;if (x ? (_i25 = normalInt(-e.width / 2, e.width / 2, 5) - h / 2, _n24 = normalInt(-e.height / 2, e.height / 2, 5) + _d3 / 2, _l12 = [_n24 - 5 - h + e.width / 2, -_i25 - 5 + e.height / 2, _n24 + 5 + e.width / 2, -_i25 + _d3 + 5 + e.height / 2], _r10 = [e.width - (e.width / 2 - e.height / 2) - (-_i25 + _d3 + 5 + e.height / 2) - 5, e.height / 2 - e.width / 2 + (_n24 - 5 - h + e.width / 2) - 5, e.width - (e.width / 2 - e.height / 2) - (-_i25 + _d3 + 5 + e.height / 2) + _d3, e.height / 2 - e.width / 2 + (_n24 - 5 - h + e.width / 2) + h + 5], _t29 = collisionNew(_r10, a, e.height, e.width)) : (_i25 = normalInt(-e.width / 2, e.width / 2, 5) - h / 2, _n24 = normalInt(-e.height / 2, e.height / 2, 5) + _d3 / 2, _l12 = [_i25 - 5 + e.width / 2, _n24 - 5 - _d3 + e.height / 2, _i25 + h + 5 + e.width / 2, _n24 + 5 + e.height / 2], _t29 = collisionNew(_l12, a, e.width, e.height)), !_t29) break;if (1e3 == c) {_l12 = [-1e3, -1e3, -1e3, -1e3];break;}}x ? (a[_t28].area = _r10, a[_t28].areav = _l12) : a[_t28].area = _l12, a[_t28].rotate = x;};}return a;}function drawWordCloudDataPoints(e, t, i, a) {var o = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 1,n = assign({}, { type: "normal", autoColors: !0 }, t.extra.word);a.beginPath(), a.setFillStyle(t.background || "#FFFFFF"), a.rect(0, 0, t.width, t.height), a.fill(), a.save();var l = t.chartData.wordCloudData;a.translate(t.width / 2, t.height / 2);for (var _n25 = 0; _n25 < l.length; _n25++) {a.save(), l[_n25].rotate && a.rotate(90 * Math.PI / 180);var _e39 = l[_n25].name,_i26 = l[_n25].textSize,r = measureText(_e39, _i26);a.beginPath(), a.setStrokeStyle(l[_n25].color), a.setFillStyle(l[_n25].color), a.setFontSize(_i26), l[_n25].rotate ? 0 < l[_n25].areav[0] && (t.tooltip ? t.tooltip.index == _n25 ? a.strokeText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o)) : 0 < l[_n25].area[0] && (t.tooltip ? t.tooltip.index == _n25 ? a.strokeText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o)), a.stroke(), a.restore();}a.restore();}function drawFunnelDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { activeWidth: 10, activeOpacity: .3, border: !1, borderWidth: 2, borderColor: "#FFFFFF", fillOpacity: 1, labelAlign: "right" }, t.extra.funnel),l = (t.height - t.area[0] - t.area[2]) / e.length,r = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.height - t.area[2] },s = n.activeWidth,d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - s, (t.height - t.area[0] - t.area[2]) / 2 - s);e = getFunnelDataPoints(e, d, o), a.save(), a.translate(r.x, r.y);for (var _o25 = 0; _o25 < e.length; _o25++) {0 == _o25 ? (t.tooltip && t.tooltip.index == _o25 && (a.beginPath(), a.setFillStyle(hexToRgb(e[_o25].color, n.activeOpacity)), a.moveTo(-s, 0), a.lineTo(-e[_o25].radius - s, -l), a.lineTo(e[_o25].radius + s, -l), a.lineTo(s, 0), a.lineTo(-s, 0), a.closePath(), a.fill()), e[_o25].funnelArea = [r.x - e[_o25].radius, r.y - l, r.x + e[_o25].radius, r.y], a.beginPath(), a.setLineWidth(n.borderWidth * t.pixelRatio), a.setStrokeStyle(n.borderColor), a.setFillStyle(hexToRgb(e[_o25].color, n.fillOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25].radius, -l), a.lineTo(e[_o25].radius, -l), a.lineTo(0, 0), a.closePath(), a.fill(), !0 == n.border && a.stroke()) : (t.tooltip && t.tooltip.index == _o25 && (a.beginPath(), a.setFillStyle(hexToRgb(e[_o25].color, n.activeOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25 - 1].radius - s, 0), a.lineTo(-e[_o25].radius - s, -l), a.lineTo(e[_o25].radius + s, -l), a.lineTo(e[_o25 - 1].radius + s, 0), a.lineTo(0, 0), a.closePath(), a.fill()), e[_o25].funnelArea = [r.x - e[_o25].radius, r.y - l * (_o25 + 1), r.x + e[_o25].radius, r.y - l * _o25], a.beginPath(), a.setLineWidth(n.borderWidth * t.pixelRatio), a.setStrokeStyle(n.borderColor), a.setFillStyle(hexToRgb(e[_o25].color, n.fillOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25 - 1].radius, 0), a.lineTo(-e[_o25].radius, -l), a.lineTo(e[_o25].radius, -l), a.lineTo(e[_o25 - 1].radius, 0), a.lineTo(0, 0), a.closePath(), a.fill(), !0 == n.border && a.stroke()), a.translate(0, -l);}return a.restore(), !1 !== t.dataLabel && 1 === o && drawFunnelText(e, t, a, l, n.labelAlign, s, r), { center: r, radius: d, series: e };}function drawFunnelText(e, t, a, o, n, l, r) {var s = Math.PI;for (var d = 0; d < e.length; d++) {var i = void 0,h = void 0,x = void 0,c = void 0,p = e[d],g = p.format ? p.format(+p._proportion_.toFixed(2)) : util.toFixed(100 * p._proportion_) + "%";"right" == n ? (i = 0 == d ? (p.funnelArea[2] + r.x) / 2 : (p.funnelArea[2] + e[d - 1].funnelArea[2]) / 2, h = i + 2 * l, x = p.funnelArea[1] + o / 2, c = p.textSize || t.fontSize, a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(p.color), a.setFillStyle(p.color), a.beginPath(), a.moveTo(i, x), a.lineTo(h, x), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(h, x), a.arc(h, x, 2, 0, 2 * s), a.closePath(), a.fill(), a.beginPath(), a.setFontSize(c), a.setFillStyle(p.textColor || "#666666"), a.fillText(g, h + 5, x + c / 2 - 2), a.closePath(), a.stroke(), a.closePath()) : (i = 0 == d ? (p.funnelArea[0] + r.x) / 2 : (p.funnelArea[0] + e[d - 1].funnelArea[0]) / 2, h = i - 2 * l, x = p.funnelArea[1] + o / 2, c = p.textSize || t.fontSize, a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(p.color), a.setFillStyle(p.color), a.beginPath(), a.moveTo(i, x), a.lineTo(h, x), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(h, x), a.arc(h, x, 2, 0, 2 * s), a.closePath(), a.fill(), a.beginPath(), a.setFontSize(c), a.setFillStyle(p.textColor || "#666666"), a.fillText(g, h - 5 - measureText(g), x + c / 2 - 2), a.closePath(), a.stroke(), a.closePath());}}function drawCanvas(e, t) {t.draw();}var Timing = { easeIn: function easeIn(e) {return Math.pow(e, 3);}, easeOut: function easeOut(e) {return Math.pow(e - 1, 3) + 1;}, easeInOut: function easeInOut(e) {var t = Math.pow;return 1 > (e /= .5) ? .5 * t(e, 3) : .5 * (t(e - 2, 3) + 2);}, linear: function linear(e) {return e;} };function Animation(e) {this.isStop = !1, e.duration = "undefined" == typeof e.duration ? 1e3 : e.duration, e.timing = e.timing || "linear";var t = function () {return "undefined" == typeof setTimeout ? "undefined" == typeof requestAnimationFrame ? function (e) {e(null);} : requestAnimationFrame : function (e, t) {setTimeout(function () {var t = +new Date();e(t);}, t);};}(),i = null,_a13 = function a(o) {if (null === o || !0 === this.isStop) return e.onProcess && e.onProcess(1), void (e.onAnimationFinish && e.onAnimationFinish());if (null === i && (i = o), o - i < e.duration) {var n = (o - i) / e.duration,l = Timing[e.timing];n = l(n), e.onProcess && e.onProcess(n), t(_a13, 17);} else e.onProcess && e.onProcess(1), e.onAnimationFinish && e.onAnimationFinish();};_a13 = _a13.bind(this), t(_a13, 17);}Animation.prototype.stop = function () {this.isStop = !0;};function drawCharts(e, t, a, i) {var o = this,n = t.series,l = t.categories;n = fillSeries(n, t, a);var r = t.animation ? t.duration : 0;o.animationInstance && o.animationInstance.stop();var s = null;if ("candle" == e) {var _e40 = assign({}, t.extra.candle.average);_e40.show ? (s = calCandleMA(_e40.day, _e40.name, _e40.color, n[0].data), s = fillSeries(s, t, a), t.seriesMA = s) : t.seriesMA ? s = t.seriesMA = fillSeries(t.seriesMA, t, a) : s = n;} else s = n;t._series_ = n = filterSeries(n), t.area = [,,,,];for (var _o26 = 0; 4 > _o26; _o26++) {t.area[_o26] = t.padding[_o26];}var d = calLegendData(s, t, a, t.chartData),h = d.area.wholeHeight,x = d.area.wholeWidth;switch (t.legend.position) {case "top":t.area[0] += h;break;case "bottom":t.area[2] += h;break;case "left":t.area[3] += x;break;case "right":t.area[1] += x;}var c = {},p = 0;if ("line" === t.type || "column" === t.type || "area" === t.type || "mix" === t.type || "candle" === t.type) {if (c = calYAxisData(n, t, a), p = c.yAxisWidth, t.yAxis.showTitle) {var _e42 = 0;for (var _o28 = 0; _o28 < t.yAxis.data.length; _o28++) {_e42 = Math.max(_e42, t.yAxis.data[_o28].titleFontSize ? t.yAxis.data[_o28].titleFontSize : a.fontSize);}t.area[0] += (_e42 + 6) * t.pixelRatio;}var _e41 = 0,_o27 = 0;for (var _a14 = 0; _a14 < p.length; _a14++) {"left" == p[_a14].position ? (t.area[3] += 0 < _o27 ? p[_a14].width + t.yAxis.padding : p[_a14].width, _o27 += 1) : (t.area[1] += 0 < _e41 ? p[_a14].width + t.yAxis.padding : p[_a14].width, _e41 += 1);}} else a.yAxisWidth = p;if (t.chartData.yAxisData = c, t.categories && t.categories.length) {t.chartData.xAxisData = getXAxisPoints(t.categories, t, a);var _e43 = calCategoriesData(t.categories, t, a, t.chartData.xAxisData.eachSpacing),_i27 = _e43.xAxisHeight,_o29 = _e43.angle;a.xAxisHeight = _i27, a._xAxisTextAngle_ = _o29, t.area[2] += _i27, t.chartData.categoriesData = _e43;} else if ("line" === t.type || "area" === t.type || "points" === t.type) {t.chartData.xAxisData = calXAxisData(n, t, a), l = t.chartData.xAxisData.rangesFormat;var _e44 = calCategoriesData(l, t, a, t.chartData.xAxisData.eachSpacing),_i28 = _e44.xAxisHeight,_o30 = _e44.angle;a.xAxisHeight = _i28, a._xAxisTextAngle_ = _o30, t.area[2] += _i28, t.chartData.categoriesData = _e44;} else t.chartData.xAxisData = { xAxisPoints: [] };if (t.enableScroll && "right" == t.xAxis.scrollAlign && void 0 === t._scrollDistance_) {var _e45 = 0,_i29 = t.chartData.xAxisData.xAxisPoints,_a15 = t.chartData.xAxisData.startX,_n26 = t.chartData.xAxisData.endX,_l13 = t.chartData.xAxisData.eachSpacing,_r11 = _l13 * (_i29.length - 1);_e45 = _n26 - _a15 - _r11, o.scrollOption = { currentOffset: _e45, startTouchX: _e45, distance: 0, lastMoveTime: 0 }, t._scrollDistance_ = _e45;}switch (("pie" === e || "ring" === e || "rose" === e) && (a._pieTextMaxLength_ = !1 === t.dataLabel ? 0 : getPieTextMaxLength(s)), e) {case "word":var _d4 = assign({}, { type: "normal", autoColors: !0 }, t.extra.word);(!0 == t.updateData || null == t.updateData) && (t.chartData.wordCloudData = getWordCloudPoint(t, _d4.type)), this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawWordCloudDataPoints(n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "map":i.clearRect(0, 0, t.width, t.height), drawMapDataPoints(n, t, a, i);break;case "funnel":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.funnelData = drawFunnelDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "line":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawLineDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "mix":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawMixDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "column":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawColumnDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "area":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawAreaDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "ring":case "pie":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.pieData = drawPieDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "rose":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.pieData = drawRoseDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "radar":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.radarData = drawRadarDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "arcbar":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.arcbarData = drawArcbarDataPoints(n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "gauge":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.gaugeData = drawGaugeDataPoints(l, n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "candle":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawCandleDataPoints(n, s, t, a, i, e),r = o.xAxisPoints,d = o.calPoints,h = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = d, t.chartData.eachSpacing = h, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), s ? drawLegend(s, t, a, i, t.chartData) : drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, h, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });}}function Event() {this.events = {};}Event.prototype.addEventListener = function (e, t) {this.events[e] = this.events[e] || [], this.events[e].push(t);}, Event.prototype.trigger = function () {for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) {t[i] = arguments[i];}var a = t[0],o = t.slice(1);!this.events[a] || this.events[a].forEach(function (e) {try {e.apply(null, o);} catch (t) {console.error(t);}});};var Charts = function Charts(e) {e.pixelRatio = e.pixelRatio ? e.pixelRatio : 1, e.fontSize = e.fontSize ? e.fontSize * e.pixelRatio : 13 * e.pixelRatio, e.title = assign({}, e.title), e.subtitle = assign({}, e.subtitle), e.duration = e.duration ? e.duration : 1e3, e.yAxis = assign({}, { data: [], showTitle: !1, disabled: !1, disableGrid: !1, splitNumber: 5, gridType: "solid", dashLength: 4 * e.pixelRatio, gridColor: "#cccccc", padding: 10, fontColor: "#666666" }, e.yAxis), e.yAxis.dashLength *= e.pixelRatio, e.yAxis.padding *= e.pixelRatio, e.xAxis = assign({}, { rotateLabel: !1, type: "calibration", gridType: "solid", dashLength: 4, scrollAlign: "left", boundaryGap: "center", axisLine: !0, axisLineColor: "#cccccc" }, e.xAxis), e.xAxis.dashLength *= e.pixelRatio, e.legend = assign({}, { show: !0, position: "bottom", float: "center", backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(0,0,0,0)", borderWidth: 0, padding: 5, margin: 5, itemGap: 10, fontSize: e.fontSize, lineHeight: e.fontSize, fontColor: "#333333", format: {}, hiddenColor: "#CECECE" }, e.legend), e.legend.borderWidth *= e.pixelRatio, e.legend.itemGap *= e.pixelRatio, e.legend.padding *= e.pixelRatio, e.legend.margin *= e.pixelRatio, e.extra = assign({}, e.extra), e.rotate = !!e.rotate, e.animation = !!e.animation, e.rotate = !!e.rotate;var t = JSON.parse(JSON.stringify(config));if (t.colors = e.colors ? e.colors : t.colors, t.yAxisTitleWidth = !0 !== e.yAxis.disabled && e.yAxis.title ? t.yAxisTitleWidth : 0, ("pie" == e.type || "ring" == e.type) && (t.pieChartLinePadding = !1 === e.dataLabel ? 0 : e.extra.pie.labelWidth * e.pixelRatio || t.pieChartLinePadding * e.pixelRatio), "rose" == e.type && (t.pieChartLinePadding = !1 === e.dataLabel ? 0 : e.extra.rose.labelWidth * e.pixelRatio || t.pieChartLinePadding * e.pixelRatio), t.pieChartTextPadding = !1 === e.dataLabel ? 0 : t.pieChartTextPadding * e.pixelRatio, t.yAxisSplit = e.yAxis.splitNumber ? e.yAxis.splitNumber : config.yAxisSplit, t.rotate = e.rotate, e.rotate) {var _t30 = e.width,i = e.height;e.width = i, e.height = _t30;}e.padding = e.padding ? e.padding : t.padding;for (var _t31 = 0; 4 > _t31; _t31++) {e.padding[_t31] *= e.pixelRatio;}t.yAxisWidth = config.yAxisWidth * e.pixelRatio, t.xAxisHeight = config.xAxisHeight * e.pixelRatio, e.enableScroll && e.xAxis.scrollShow && (t.xAxisHeight += 6 * e.pixelRatio), t.xAxisLineHeight = config.xAxisLineHeight * e.pixelRatio, t.fontSize = e.fontSize, t.titleFontSize = config.titleFontSize * e.pixelRatio, t.subtitleFontSize = config.subtitleFontSize * e.pixelRatio, t.toolTipPadding = config.toolTipPadding * e.pixelRatio, t.toolTipLineHeight = config.toolTipLineHeight * e.pixelRatio, t.columePadding = config.columePadding * e.pixelRatio, e.$this = e.$this ? e.$this : this, this.context = uni.createCanvasContext(e.canvasId, e.$this), e.chartData = {}, this.event = new Event(), this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 }, this.opts = e, this.config = t, drawCharts.call(this, e.type, e, t, this.context);};Charts.prototype.updateData = function () {var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};this.opts = assign({}, this.opts, e), this.opts.updateData = !0;var t = e.scrollPosition || "current";switch (t) {case "current":this.opts._scrollDistance_ = this.scrollOption.currentOffset;break;case "left":this.opts._scrollDistance_ = 0, this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 };break;case "right":var _e46 = calYAxisData(this.opts.series, this.opts, this.config),i = _e46.yAxisWidth;this.config.yAxisWidth = i;var a = 0,o = getXAxisPoints(this.opts.categories, this.opts, this.config),n = o.xAxisPoints,l = o.startX,r = o.endX,s = o.eachSpacing,d = s * (n.length - 1);a = r - l - d, this.scrollOption = { currentOffset: a, startTouchX: a, distance: 0, lastMoveTime: 0 }, this.opts._scrollDistance_ = a;}drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);}, Charts.prototype.zoom = function () {var e = Math.round,t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.opts.xAxis.itemCount;if (!0 !== this.opts.enableScroll) return void console.log("\u8BF7\u542F\u7528\u6EDA\u52A8\u6761\u540E\u4F7F\u7528\uFF01");var i = e(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + e(this.opts.xAxis.itemCount / 2);this.opts.animation = !1, this.opts.xAxis.itemCount = t.itemCount;var a = calYAxisData(this.opts.series, this.opts, this.config),o = a.yAxisWidth;this.config.yAxisWidth = o;var n = 0,l = getXAxisPoints(this.opts.categories, this.opts, this.config),r = l.xAxisPoints,s = l.startX,d = l.endX,h = l.eachSpacing,x = d - s,c = x - h * (r.length - 1);n = x / 2 - h * i, 0 < n && (n = 0), n < c && (n = c), this.scrollOption = { currentOffset: n, startTouchX: n, distance: 0, lastMoveTime: 0 }, this.opts._scrollDistance_ = n, drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);}, Charts.prototype.stopAnimation = function () {this.animationInstance && this.animationInstance.stop();}, Charts.prototype.addEventListener = function (e, t) {this.event.addEventListener(e, t);}, Charts.prototype.getCurrentDataIndex = function (t) {var e = null;if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], e) {var i = getTouches(e, this.opts, t);return "pie" === this.opts.type || "ring" === this.opts.type || "rose" === this.opts.type ? findPieChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.pieData) : "radar" === this.opts.type ? findRadarChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.radarData, this.opts.categories.length) : "funnel" === this.opts.type ? findFunnelChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.funnelData) : "map" === this.opts.type ? findMapChartCurrentIndex({ x: i.x, y: i.y }, this.opts) : "word" === this.opts.type ? findWordChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.wordCloudData) : findCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));}return -1;}, Charts.prototype.getLegendDataIndex = function (t) {var e = null;if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], e) {var i = getTouches(e, this.opts, t);return findLegendIndex({ x: i.x, y: i.y }, this.opts.chartData.legendData);}return -1;}, Charts.prototype.touchLegend = function (t) {var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},i = null;if (i = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], i) {var a = getTouches(i, this.opts, t),o = this.getLegendDataIndex(t);0 <= o && (this.opts.series[o].show = !this.opts.series[o].show, this.opts.animation = !!e.animation, this.opts._scrollDistance_ = this.scrollOption.currentOffset, drawCharts.call(this, this.opts.type, this.opts, this.config, this.context));}}, Charts.prototype.showToolTip = function (t) {var e = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},i = null;i = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], i || console.log("touchError");var a = getTouches(i, this.opts, t),o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 });if ("line" === this.opts.type || "area" === this.opts.type || "column" === this.opts.type) {var l = e.index == null ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var s = getToolTipData(r, this.opts.chartData.calPoints, l, this.opts.categories, e),d = s.textList,h = s.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("mix" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var x = getMixToolTipData(r, this.opts.chartData.calPoints, l, this.opts.categories, e),d = x.textList,h = x.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("candle" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var s = getCandleToolTipData(this.opts.series[0].data, r, this.opts.chartData.calPoints, l, this.opts.categories, this.opts.extra.candle, e),d = s.textList,h = s.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("pie" === this.opts.type || "ring" === this.opts.type || "rose" === this.opts.type || "funnel" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = this.opts._series_[l],d = [{ text: e.format ? e.format(r) : r.name + ": " + r.data, color: r.color }],h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}drawCharts.call(this, n.type, n, this.config, this.context);}if ("map" === this.opts.type || "word" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = this.opts._series_[l],d = [{ text: e.format ? e.format(r) : r.properties.name, color: r.color }],h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}n.updateData = !1, drawCharts.call(this, n.type, n, this.config, this.context);}if ("radar" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var d = r.map(function (t) {return { text: e.format ? e.format(t) : t.name + ": " + t.data, color: t.color };}),h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}}, Charts.prototype.translate = function (e) {this.scrollOption = { currentOffset: e, startTouchX: e, distance: 0, lastMoveTime: 0 };var t = assign({}, this.opts, { _scrollDistance_: e, animation: !1 });drawCharts.call(this, this.opts.type, t, this.config, this.context);}, Charts.prototype.scrollStart = function (t) {var e = null;e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0];var i = getTouches(e, this.opts, t);e && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = i.x);}, Charts.prototype.scroll = function (t) {0 === this.scrollOption.lastMoveTime && (this.scrollOption.lastMoveTime = Date.now());var e = this.opts.extra.touchMoveLimit || 20,i = Date.now(),a = i - this.scrollOption.lastMoveTime;if (!(a < Math.floor(1e3 / e))) {this.scrollOption.lastMoveTime = i;var o = null;if (o = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], o && !0 === this.opts.enableScroll) {var n,l = getTouches(o, this.opts, t);n = l.x - this.scrollOption.startTouchX;var r = this.scrollOption.currentOffset,s = calValidDistance(this, r + n, this.opts.chartData, this.config, this.opts);this.scrollOption.distance = n = s - r;var d = assign({}, this.opts, { _scrollDistance_: r + n, animation: !1 });return drawCharts.call(this, d.type, d, this.config, this.context), r + n;}}}, Charts.prototype.scrollEnd = function () {if (!0 === this.opts.enableScroll) {var e = this.scrollOption,t = e.currentOffset,i = e.distance;this.scrollOption.currentOffset = t + i, this.scrollOption.distance = 0;}},  true && "object" == typeof module.exports && (module.exports = Charts);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!**************************************!*\
  !*** F:/myWork/newWork/core/test.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????????????????
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * ??????????????????
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * ??????URL??????
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * ??????????????????
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value.replace(/-/g, '/')).toString());
}

/**
   * ??????ISO?????????????????????
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * ?????????????????????
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * ????????????
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * ?????????????????????
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * ???????????????
   */
function carNo(value) {
  // ???????????????
  var xreg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // ?????????
  var creg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9???????????????]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * ??????,?????????2?????????
   */
function amount(value) {
  //????????????????????????????????????
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * ??????
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * ???????????????????????????
   */
function enOrNum(value) {
  //??????????????????
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * ???????????????????????????
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * ?????????????????????[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * ????????????????????????[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * ??????????????????
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * ??????json?????????
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * ????????????
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}


/**
   * ????????????
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array };exports.default = _default;

/***/ }),

/***/ 865:
/*!*************************************************************!*\
  !*** F:/myWork/newWork/pages/app_admin/image/icon_sent.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAAKeUlEQVR4Xu1da5AU1Rk9351lF1h2euexCAQFfKYkBYaUj+DbojCWohitGEsNmuAjmqQ0krKSYHykMCbEJFbKKkOikWgqoqjxEU2oUtRQESpUqUmopABjgIjATvdMNwKBnemT6oFZl3Wnp/tOD+7udP+d75z73XN6bt++fftrgeZhWTyCgkugMBGA0qSJYUQPFDaMAJ5OJsUUHUUsmzcBuA9Amw4+xnxUARK2q3BVaEMsm+cB+AOA0NjYCH8FCBRCi2ra/IsAn43FjV4BCvaEMiTn8JOK+Gf0qcSMngKhDbEc3gvitli+xigQyhCSCcvBZgEmNCadmDWUIQcu5i/GsjVOgVCGmDaXCfCFxqUTMwc2ZFOBqTEKW4UYWY9sLvEjaEwKJAEBcSSALw/nITOwIVaB10PwYD1mEHg8Y8jl9XBYFg0m8NJwnXYHN8ThKhCn6orpEu9ICTMyGXF0OSq4QoFHuoINw3G5JpAhO2we3QKs174zF+wtuTitq1PW1mtGBW85fAvE9Kj4BgtPIEPMPO8She/pJk3glowhP9PFD4SzHK4EcVaUnIOBq6YhJCXvYCNQvqCGPlzg+awhF4YG1gA0rSGWw9NBvK4jKIEtewSfnpgUUwfvh2laQ0yHS4S4VkPQIko4J52WP2tga0Ka0pANG9iW7sI2EXTWVKh/gMLCdIcsCo0LCGhKQ/IOLybxdECNesMIvJxOYraIuGGxQeOb0hDT4XIhLgkqkhfnAtvdBE4YO0a2hcGFjW06Q8p3xC3YFnKpxCVxXqZTVoQVOGx80xmSdziPxCNhhIpiaSRoe01niGnTWy/6XFCBDsQ9mDbkqyExWuFNZYjjMFsEtoIYEVKt2JCQgvUPH/BO3dzJ68TFLzS4Y0M0ROsLGdiQAv8kgtka3LEhGqL5GlIoMOUqbNcYrrwp72+yhsyrM6dA8Ka5huTyvFop/DqQKv2CXGBjJoljRYQ6+DAYy+GrIM4MgxkKsR8ZsswCl4u3X1fzIPDNjCE/1YQHgpFssxxsEuCwQIAhFHSQIevWsXXcJ5ATQUcdfSAFvyTx8KgWbN61C5H+W9iCsSNacDeIi+rIcdBCDzKkeyfPTrh4ZdBm2wSJHWRILs/vK4WFTdDvQdvFgwyxCnwVMvwulINW/QES6zWEZItpw1aC0UOpA8Mt115DrA84DSW8Pdw6ONT602tIzuE8FXJ1d6h1dijk++E/xOFiEAuGQtLDOcdeQ0ybLwrgvaoWHx+jAh8OWTY3KODojzGXuOnKG1RPPMHErHOxBwj9/CMWMWIFyv+QfJ6TqPCfiLljOg0FyoZ053l2QsVLJhr6RQ4pG2LZvALAY5Gzx4ShFSgbYha4QASLQ6NjQOQKVAxZLBLfg0SurgZhZchaCuBLGvgYErECZUNyNp9TwJyIuWM6DQUqQ9ZrIjhDAx9DIlZgvyEO3xZiWsTcMZ2GAvsNsflvAaZo4GNIxApUDNk2HHdwRKzVIaGrGOII6tppckiSbYZGKteQ3UKMaoYOD/Y+xoYMMocabYhLYI0Aa4nyBrzRII4ncNYwGiLpEm8qwWoCO0i0CXAcBGcLkArrd6MM8V5te0i1YVFqlGzqn9RWcnSrg/kKuANAOmzSgyWewDIK7swm5V/9cyLZau3EFSQWKWB80JwjN4TATgEuSxvyUq0kTJMTkcDzIjihVuyg+l2w1yXmZw2puULuOMwUgeVBy4BEbUjRJc7Ndkrg7ai2zXQPsFoBxwwq0asnwyJx+dhOWRY0361bObqtHSsFOKkWJmpDFqUNCb0VNWfzJAW8MRTKLXmbyDOd8pVawvb/vfA/HlXci38o+BeA27/aG0GpIwI2ijhCtx6W6fApIT4ftqOHNF7QM7IFU0aPlvd02s3ZfEABN/phK8vvVwJ4VKeRCobA0owhV+ty5PKcqxSe0cUfCpwLrMgacq5uWzmbJytgtR/eK7xQLqScK/DbSuFOEK06DZaI67s6ZYkO1sOU3/wlunXxhwJH4I6MIXfrtuWV2TUd7FJV6uV7ZgC4sLey9dY8J7UqzAExQamD67qTuLg8v65+XJA2xKsHr31YNvf5bUVygd8qwRbtBnzHCiRReziZn0nKQ/W0bxa4WQSHD8RB4I2MITMDlRo3HT4pxKXVknFdzM2m5FndZA8USusBkKjKITg9nZRVum344UyTh0sLNvtyK9yQ7hCd18V7aU2b71WrquoSa7OdcmIgQ3IFPqwE11RLmC5uzaTkJ7pibS/wyBGCd3zxJUxPp+Vvum344SzSgIOC75+I+HGmU76l2/42sr3VgVcEdMBvrXhVlDKGzApkiGnzdgGqjp8EXswYcr5usmaB14n4FytgEYbuLC5IXpZNC/7LHW+mDZkRhGugmG6HcxLEc1VPasGvMkm5NpAheYdzSd9ZUHEfcey4TnlXJ2HT5loBPlM1WWBTxpDJOtxBMVaBr6HGo2wXOCVryJqgnH3jLIcvgKh60hK4OWPI/YEM2WIz3Y7yLKj6p40Ez6aTMjdssqbDa4R42A/nAkuzdUyrg+Rk2rxL4F991QVWZ5I4TURKQTgrMUHq5ve4OOGwlLwdyBCP2HT4shDn+ApHfDfbKfcETda2eWIReEWAMX6YkuCirqRU/bsHbc8vLv8Bp7OEtwJw/TxtyDcCxJVDuh0eK8QqBXT5YDamDSkvHwU2JGfzShXgBpLEfdsMfGeqiDeNrXp4N4MiWCpSnnJWPQi8n05ikoh4s7CGHrWGzkrjFCzt2Y2bxo2TXX4Jde/kWcrF47Uekbt9TuTAhqxcyZZpM7A+yIYIF1gvgh9KB55Ki9i9Hdn/cumZSuFmEBcEUbfkYkFXSrwPkDX8MAu8VARPBmnIK4NLYHGr4HfJpOT69FFZO3EKXHxdBJfVOum9ZSfHxeQpKSnP8gIb4gWbBV4iguVBEi7HCIpkuRBzjkS7AMeI+A9PfbkP1E/5lIjsDdxmHYHe/ZDl4HUBTgtB47qAt3PHqzM5Eiz30QiKL7m4tavPLUMoQ7xGLIfPgAh98Q6aYJ84VxRmpTpkpQZWG2KaPJ4JrFXS+H0GLvHXjIGZIlKsJBzaEO9bIu2CNY1+huESC7Odjav96+dY3uZV3oJp2BEkzFlAwY59JZw8PiUHvSwV2hCv0cIeTinthbcFdcB1mTCJVYl9IG3I1yLg0abIFXibEtyrTeAPzJeI2QN9MULLEK+t9/Oc3KrwggBTI0zaqx50j86Drghz6KXK2bxRAfcDaImKn8R/S8ScsSkZcIqtbYiX4I4dHJNoxf2yf52rLi4C2+nihmxKfh9V56PgsSyezgQeEc0vRPTL4bkRCvM7OqTqo4a6RKw0tiPPMxIKPxBgZlgRCHhz+SXKxd2pA1O/sByNjic50nLgLSzeorm95+8Ebs8ma6+IR2JIRRDL4al0MQ8K5wt9v3dYcgFv/WrZPoXHxvucMY0WOwx/N9mhbFwuCl888Amoqg/0CHhffv4jgUfTSawIWvowUkP6ds5bUhfBcQliAgXtAIoKKFDwLnqwrpErt2FE1o3dsoWjRnZgqkrgKCkhJYJWV7Dbe/LXBqzv6PBujsPXn/w//FxsjNmKo98AAAAASUVORK5CYII="

/***/ }),

/***/ 866:
/*!*************************************************************!*\
  !*** F:/myWork/newWork/pages/app_admin/image/icon_hand.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABYCAYAAAAKsfL4AAAQgUlEQVR4Xu1de5QcVZn/fdUzY0Jmunq6upOABidysoiRd0448oryDA9BDS4rIKxkYY+s4CqvXcIeURSX1V3loUck7LLiA2UBQRAM7OYBQgTEB46KgoBZN8l0V3dXdRxIerp+e25N99DT0496dfdk3fprpuu73/3u73ff97tfCbr0jOV5tBbDSUIsJrALxGgfcFciIb/rkgmes/ntb/mGZBqnieBoAikQNojNcHC3YYjtWZEHQfEgE0pke4H79Gu4HcSRDRSVHeAWI45LReS1UBlFlNi0uBLEV0WwqF4lgTyIy42E3BZRdugoAfkdPLBcxiMakG5lsENsnHgNpyxcKH+MqmBB9GTzPE/ToMCNtUpP4NOGLv8QJI/6NB0jQIHPMh6FasIeHgI/dOI4KS1S9CAeuUjW4rka8K/twK9m7BDXpRKyJqwhHSHAL/jVQhB40onjxG6T4Bf8KXsFnzficnkYEiInICj4vSIhKPhRkRApAWaRb4OD9QLMD1MrutUSchbPAXC7126nWZkYoiVERkAF/P8SYEEY8Gv62A2GjuNEpByFvnodmRxPicXwXQB9UegPSkIkBEQNfk139DFDly9GAVCtDtNknH14od3szG++QUgITUCnwFeFJ7ElqePNIkK/YLSSz1u8hMANUeoMOiaEIqCT4E91RSXsl0rJr6MEy7T4gACnRKmzVpeflhCYgG6ArwrlEMenEqLWE5E9ZoHPieDtkSlsoMgrCYEI6Bb4bjcEvMPQZXOUYJkWfyTA8ih1NtLlhQTfBHQTfAClchxG1Aszs8BbRfBXnSbArUBtpqi+COgy+Mr4u424nBE1UPki30kH66PW20yfA9yc0uXiRu89E9B18Inxfg0Hx+Pym1rDX3qJc9oBNzKCWKGA/qrcjh3YuWiRvFqbLmvxfg14dztdUb1vRoInAjI2/0wjNgqwMCqD2ugpOQ7enxqW+5ScWeAqCC4lcLAGtCWg0ZhIYhTAjUkda9W09pUChweB9SI4sEtlQiMS2hKgwBdivQbs1SVDS47gzFRc7lX5ZQtcowk+HVXeDrGOOs5Q44pt0yg5+M9ektCSgF6DnytwDSIEv0oiBY+XxrFSnT/0moSmBPxfBX+qJQk2lYdwaq9bQkMCegD+BDWcYwzJtxVAnar59d1Y7a5rL1oCHayeQUDPwbd5JYh/jKrPb6enlyQ4xN9NI6DX4JsFXiaCz7UDLer3tSRUZkfrRLAs6nzq9U0j4E8V/KmBueY4NJ9nwhE80mkSpgjIvcq9uRNPiOCNnWa9on9an9+rmt9qTOgGCS4BJCVn43EBDv9TBr8XLcElYMziyX3Ag/8P/usI1I4JnWwJLgFmgWtFsLoLBNR3OxeK4JYu5Bsoi26QMEmAxccEDd0GAxneJNE08C2LyRLxe00wL0wmBH4lgudJvCaCuSQWQDAijGbPqtMkuATkbP4Q7Gj/Pw18BXjG4lkx4BtBwSfwe4d4XzohP26kQ00l9yAOjAmWU8NyEkcHPYAnsFlzcNLwsBSi7o6qBPw7iHODgtEmXVmADw3rcketXKbAy2OCfwqSpwJ/gnjXAh9e1Wqikc9jKWM4DsBKAiv87KqSeEYjjo+aBJeAQpGrHAf/EQSMduA7wPkpXb6m5CyLy3Vdnqq0gLNjwNf95lkP/tY8RwY0nEtiLoAdQmzVgBdiMYzG42I2009yXsHGqjLxFU3ctG2fTpBQnYbGckU8K8QBba3wLqDczqfANws8E4K1yTjSyg3d3XchXhF4HwPqwd9e4Fv6xPXC27uRWQReAfAkgce0MjYND2O03r3FLPB4AvcFISGXo84YHhLgHd5hmS45tRCrnHaptcBwUGU16aaBn7X5Xo1Qm2z9ZeCstC7fUrI5ixcB+JKX/PyC34SQbRA8BAcPjRfxQPWELAwJGXJIs/GDoCRM34oocFlMsA7hSGgKvgJFzVqScRwkIrtcEmxeAeL6ViREAX69fkewcWL89fsIvSJh5mZcOBJagl8FgYJbjbhcWP3ftHmp0N2Aa7Q1/kqJOKY64Lbrdry0pqrMbCBhBgHKuLE8D+7T3Jbg6WJFpUCewJ8qfJ2XgFng+yG4XoDFroxggg7un9OPj8ybJ1vVT1GCP1tIaEiAMs6nj78v8KdqqeCrw0P4sIg41d/GLC4RQu8HXkwkJF/9Xd0z6xMoz+uGA66fmj+buqOGBzJVAyv3u9ZprX39JxwHq1PDk1PN2gHXCygk7o0Bq2vBrk+XyfOdmoZvddIjI/LuyMID6oZlm7Hti4YuH2t5KG+aXIQYbhDB6QC0OoU/heDiZFweV79X/O3vBvAGL+DXyGQJfHnCwT3zE+5UcUKtOKnhCArOF+K9TcYHn9m0Fg9LgkP8eEDDiWr9QbI/Z+PvASiAE7U5k3hJBFcldblzsrf18ORy3NuJYYVGLCwDNomn5g/LT6pJswUeC8GDmn/wZ/QIACYADHgwK3KRsCQQeHrcxorqFJfkHNPCEaK5d6Mn1N1oI45natcjnghoVVK1IHFieF5rczPGAcYEsACk62tF5EiGUBiaBOJzRkKu8GpCaAJa7eso0El8XgbwzdQe8oeqUWaRS0GcD+AiYSBPN6/lCyQXhgQS4yhjT6836kMTkLO5AcSK+pISWNcHfEDXJdcMhWyW+0k/7hNgSSCkOpgoDAllwenpuNzvxbzQBJg2twjxprqB5t6kjjNFpKR+Vw61Q2kcyTIWaMCLN8Xx1DWV6ee2Iuf3l/GoCPb3YnA3ZYKSQOBvDV08XYEKT4DFlwV4cxUYNbWsBV9NTUHcUrsfT8GoaDgrOSg/V+lcp4Bd+NlsHBuCkOAAf5PS5cteKksUBHxfgJNUZjPAb3H9n0ChDzhB1+VplTZb4JWadM8hyws4VRm/JIiGFcNDsslLHuEJsKnm6rf5AX+qtQAv58bw1iVLZKfaop4gtkV1b9dL4f3IeCWBxH8ndYx4vd8cmoBRcmChhc8kdVxV7fN9Xf8XnJaMy/cUGKbNn0V8LuEH47ayXkgQ4Nz6E8BWikMTUK/cF/huv4Urkglx3RFNiw8LcGJbJHoo0IoEAjcaunzUj3mREuAbfABl4oJ0QtZOjiHsKxaRKBGHCnA2gA/Mxi6pEQkATjQScpkf8JVsZAQEAR+CEkvYxzBkSyPDx/I8KKbhO7vDOsEv8FX5SAgIBP7kCdknDF0+pYxxN+CIRbt2YfvChTJWNXBrkemBMpS38kFBC9mpdOqmjTOEk2uv0Y6OcmDp0skTPy9PaALMIv9cHHzTb8iX6v3ZTIZ7ST++pIl7Y1GFCqNDbEIMH04Nya9UIbZv54LYHPxEA/b0UqhuyhD4tRA3QFBwiFUi2MvO4djFi73FwAtFgG0zVXLwOxEM+Sl0FXy1y8qY69nwlvr0boA8walGXJ5Q73IW1Zjg25XFj12NZAkUBT7LB3zS0OUaL3mHIsC0uVoIdwD1+ngBv0ZXZlyw35viYq5fz74DDsEfwgaD8mqnK0dczRjuheOexvmJg/RCUhdP+1uhCMhavFYDrvZaKJ/gVzDAxw1dvqD+MS3eKcCZXvMLLUdcnUzIZ3xfUheUknHxdKYRloCLNK++PZWYCa26nSaA3ZHUxXWdzNm8Xq0bQgPrR0EAEgi8bOgy6WDQ5glHwDjfiBJebHcSFqTmV+0msdZIyAXq/8wfuaf2GhZjAG+Hg1UCHB/lVLopVj5JoI9DmVAEKIOzFlUruLkZEGHAV/rLwNlpXdQsa8Zj2jwcxB2NBvF2Nc/3e48kkPiFU8Lh6bS3+KehCXD75gIvoOCmupbgELhORZgN0O1U+/+nk3Ecrg7q3TGRlHr/zmKR6Z1lPKwJDvENqt8E00l4UICRWhUEfurswsnp9KQvk5cnEgJURvk8RyhQTrgjBLZJDPckB+U517OiDxv81lICvxzQ8K7BQWRMW/kPuceXb1XTQgLfjw1gzfBceVnlXdlJVZ7XM6azXkDwI+MQa1IJuW7bNs7r38PdKjlMiIky8FgqjruqG5JedUZGQLMMczY3gq19ZOrT1oBv5m03nPCM+wsETIdYmU7IM25XuIPHaWU84rXgIeQoGo4ZHpINIXRMJe0oAabJpdKHX/gxtBb8nIVviGpVzZ/sQAz7Dw6KOkdQhzrPaoKDveangnALsF2FsfE5mH87qctfeM2nlVxnCSjwDBHc5dVQn+BPqhV8NhmXq1wC8rxW0zyvS0oUrDDi8mTO4kf8kEDBz424RBJnqKMEFHbwOMdjtxAI/MkNvccNXY5yxyGLHyTgukl6eQjYEKz0SwKJTUZCZniCeMmzXqajBJDcI2e72wfT3PNa9fkeup1pySl4wojLEepHNduSPhxTdrCvigvqxdMiEAmCK5NxCXTHrasEqMxMmx8SugNpwydoza8qI/AFQ5ePN1Kes3gyia80+hpGrbwfEgiM7oxj+V4i40FqfNcJcPtmtVgT3ABOD5St5s3KoXVwEKbfmq/0qimpNoADqtPRRoAUi5xfWSe0HJxrSagsLtXAPO1LGg7wPPtwTHqe/E8U4E8OYV163IsfMfw1iaVq6k7g4WIOt46MoBQEfIdQURBPU1F1czt4AB18VIBDSZRAbHRK+Jd0ehKoQoHDE4InNWDfVsV1SVBHi7pszhS4TNNwEYj9RbADDn4woePm+SI7ooSsawQ0M9q0eI0An/BTKAW+AKcbCXkka/EcTXAbOMOjOusAp6Z0+VGFhGWOQP1d72ZfP6aMvQq8TW2B+7EpqGxPCai4tGREEPdagDrwW373hYDlCJanK7FHsxa/pwGntsuLgsuMuPxzO7ko3veUgFyO+yMG1z3Ry+MH/JpB+k5DF7VloCYErhNZu7wITKVpJxv2fU8JyNjcN0Z4Ck0fBPzKQJ0zdDEqk4HDNKBtIHAH+FpKl/PCguslfU8JuIbULi5CeVe3DAobFPwKADuTurjRdjMFHhITNAzwUQsWHZxvDMu/eQEwrExPCXBrpc3zNLof0mn4hARfTVWfMnQ5zG0N5JycjfsrBzkN8yPxXFLHsupl8rAAt0vfcwKUgTmbl1duzE+zxyHGBXhPZbbj60NrNQU/O1lzoLNlC+fOHcJ3NcEJ9eA4wIvox4ra2zztAAz7flYQ4A6QBZ4AgXLtWwZxP/a5ARo+ZQzJLyt7PKpLaPmJwQaA3piq+GqqD/egH7eXxvHBBQuw07TU9yvxlyLYh0RGNNw9TnyyW9PPqq2zhoBmNSln80jQjfXv63NT9ZHKTZu3CHGhQ9yTSsiqsDU3qvSznoCsxUc14Fg/Ba4HP1vgFZq8HhSkTByaTsizfnR2SnZWE+BGurKhPnPrycdGgTSj5jeIxuvnDlengN8tuiCSWr6InfWbeE1nTDODgDQMhdzNlW47Amd1C3AHZ4ubBXCnka0eLzV/Kr3gqGqIhXZ6O/1+1hOQyfO0mOZ+87GprX7AVyHMDF1aBtLoNOi1+mc9AZVWoIJeqM2xGfY6wE0pXS6pFkp5bE8Qyq19RrwjAr8Z0HDU0NDr9w+6CXajvHYLApThOZvvpoNrq997IfCSQ1yfTsiM6LuWxSUTwE0CN0ylWjvsInDPgIZLhoYk02vQd7sWUGuwWlC92o9+Lwsmk4xPWEjP17FVIjpCjJq83aYFRF3w2aLvfwFGFAJ6pGhb7gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 941:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/upload.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _header = _interopRequireDefault(__webpack_require__(/*! ./header */ 942));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var uploadFile = function uploadFile() {var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    (0, _header.default)(args, 'file').then(function (e) {
      uni.uploadFile({
        url: args.url,
        filePath: args.filePath,
        name: 'file',
        fileType: args.fileType,
        formData: {
          file: args.filePath,
          file_name: args.fileName,
          mch_id: args.mch_id },

        header: e,
        success: function success(uploadFile) {
          return resolve(uploadFile);
        },

        fail: function fail(e) {
          return reject(e);
        } });

    });
  });
};var _default =

uploadFile;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 942:
/*!****************************************!*\
  !*** F:/myWork/newWork/core/header.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _formId = __webpack_require__(/*! ./formId */ 20);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ 11));
var _utils = __webpack_require__(/*! ./utils */ 21);
var _apiUrl = _interopRequireDefault(__webpack_require__(/*! ./apiUrl */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var setHeader = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(args, type) {var header, obj, mch_storage;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            header = {
              'X-App-Platform': args.header && args.header['X-App-Platform'] ? args.header['X-App-Platform'] : _vue.default.prototype.$platform,
              'X-Form-Id-List': JSON.stringify((0, _formId.popAll)()),
              'X-Requested-With': args.header && args.header['X-Requested-With'] ? args.header['X-Requested-With'] : 'XMLHttpRequest',
              'X-App-Version': _vue.default.prototype.$appVersion,
              'content-type': type ? 'multipart/form-data' : 'application/x-www-form-urlencoded' };_context.next = 3;return (


              _store.default.dispatch('user/loadAccessTokenFormCache'));case 3:

            if (_store.default.state.user && _store.default.state.user.accessToken) {
              header['X-Access-Token'] = _store.default.state.user.accessToken;
            }
            if (_store.default.state.user && _store.default.state.user.tempParentId !== 0) {
              header['X-User-Id'] = _store.default.state.user.tempParentId + '';
            }
            //?????????Token
            obj = {};
            args.url.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
              obj[decodeURIComponent(key)] = decodeURIComponent(value);
            });
            if ((0, _utils.objectValues)(_apiUrl.default.mch).indexOf(obj.r) !== -1) {
              mch_storage = uni.getStorageSync('MCH2019');
              header['Mch-Access-Token'] = mch_storage.token;
            }return _context.abrupt("return",
            header);case 9:case "end":return _context.stop();}}}, _callee);}));return function setHeader(_x, _x2) {return _ref.apply(this, arguments);};}();var _default =


setHeader;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map