!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):"object"==typeof exports?exports.CRUD=t(require("element-ui")):e.CRUD=t(e["element-ui"])}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=["string","text","boolean","integer","float","date","datetime","objectid"];t.a=i.reduce(function(e,t,n){return o({},e,r({},t,n+1))},{})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=n(0),i=n(11);n.d(t,"fields",function(){return o.a});var s=function(e,t){e.component("crud",r.a),e.prototype.$report=i.a};"undefined"!=typeof window&&window.Vue&&s(window.Vue),t.default={install:s}},function(e,t,n){"use strict";function r(e){n(3)}var o=n(9),i=n(10),s=n(8),a=r,l=s(o.a,i.a,!1,a,null,null);t.a=l.exports},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(6)("e4c110b8",r,!0)},function(e,t,n){t=e.exports=n(5)(void 0),t.push([e.i,'.crud__ctrl{margin:8px 0}.crud__form--inline:after{content:"";clear:both;display:table}.crud__form--inline .el-form-item{width:33%;float:left;padding:0 8px;box-sizing:border-box}',""])},function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var i=r(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([i]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(i(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],o=0;o<n.parts.length;o++)s.push(i(n.parts[o]));c[n.id]={id:n.id,refs:1,parts:s}}}}function o(){var e=document.createElement("style");return e.type="text/css",f.appendChild(e),e}function i(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(m)return v;r.parentNode.removeChild(r)}if(h){var i=p++;r=d||(d=o()),t=s.bind(null,r,i,!1),n=s.bind(null,r,i,!0)}else r=o(),t=a.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function s(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function a(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(7),c={},f=l&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,m=!1,v=function(){},h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){m=n;var o=u(e,t);return r(o),function(t){for(var n=[],i=0;i<o.length;i++){var s=o[i],a=c[s.id];a.refs--,n.push(a)}t?(o=u(e,t),r(o)):o=[];for(var i=0;i<n.length;i++){var a=n[i];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete c[a.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=i[0],a=i[1],l=i[2],u=i[3],c={id:e+":"+o,css:a,media:l,sourceMap:u};r[s]?r[s].parts.push(c):n.push(r[s]={id:s,parts:[c]})}return n}},function(e,t){e.exports=function(e,t,n,r,o,i){var s,a=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=c):r&&(c=r),c){var f=u.functional,d=f?u.render:u.beforeCreate;f?(u._injectStyles=c,u.render=function(e,t){return c.call(t),d(e,t)}):u.beforeCreate=d?[].concat(d,c):[c]}return{esModule:s,exports:a,options:u}}},function(e,t,n){"use strict";var r=n(0);t.a={props:{data:{required:!0,type:Array},form:{required:!0,type:Object},fields:{required:!0,type:Object},rules:{required:!0,type:Object},editing:{required:!0,type:Boolean},size:{default:"large",type:String},labelWidth:{default:"100px",type:String},inline:{default:!1,type:Boolean},index:{default:!1,type:Boolean},table:{default:function(){return{}},type:Object}},data:function(){return{dialog:{status:0,title:{0:"新增",1:"修改"},size:this.inline?this.size:"small"},updatingRow:null,TYPES:r.a}},computed:{labels:function(){var e={},t=this.fields;for(var n in t)e[n]=t[n].label;return e},columns:function(){return Object.keys(this.table).length?this.table:this.labels}},methods:{create:function(){this.dialog.status=0,this.showDialog(),this.$emit("create")},update:function(e,t){this.dialog.status=1,this.updatingRow=e,this.showDialog(),this.$emit("update",e,t)},destroy:function(e,t){var n=this;this.$confirm("确定要删除？","确认",{type:"warning"}).then(function(){n.$emit("destroy",e,t)})},showDialog:function(){this.$emit("open")},closeDialog:function(){this.$emit("close")},handleOpen:function(){this.$refs.form&&this.$refs.form.resetFields()},Submit:function(){var e=this;this.$refs.form.validate(function(t){t&&e.$emit("submit",e.dialog.status)})},repeated:function(e,t,n){return t!==n&&!!this.data.find(function(n){return n[e]===t})}}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"crud"},[n("div",{staticClass:"crud__ctrl"},[n("el-button",{attrs:{type:"primary",size:"small",icon:"plus"},on:{click:e.create}},[e._v("新增")])],1),e._v(" "),n("el-table",{attrs:{data:e.data,stripe:"",border:""}},[e.index?n("el-table-column",{attrs:{type:"index",width:"60"}}):e._e(),e._v(" "),e._l(Object.keys(e.columns),function(t,r){return[(e.fields[t]||"").options?n("el-table-column",{key:r,attrs:{label:e.columns[t],"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(n){return[e._v("\n          "+e._s((e.fields[t].options.find(function(e){return e.value===n.row[t]})||"").label)+"\n        ")]}}])}):n("el-table-column",{key:r,attrs:{label:e.columns[t],prop:t,"show-overflow-tooltip":""}})]}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){e.update(t.row,t.$index)}}},[e._v("修改")]),e._v(" "),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){e.destroy(t.row,t.$index)}}},[e._v("删除")])]}}])})],2),e._v(" "),n("el-dialog",{attrs:{title:e.dialog.title[e.dialog.status],size:e.dialog.size,"close-on-click-modal":!1,visible:e.editing,"show-close":!1},on:{open:e.handleOpen}},[n("el-form",{ref:"form",staticClass:"crud__form",class:{"crud__form--inline":e.inline},attrs:{model:e.form,rules:e.rules},nativeOn:{keyup:function(t){if(!("button"in t)&&13!==t.keyCode)return null;e.Submit(t)}}},e._l(Object.keys(e.labels),function(t,r){return n("el-form-item",{key:r,attrs:{label:e.labels[t],prop:t,"label-width":e.labelWidth}},[e.fields[t].options?n("el-select",{staticStyle:{width:"100%"},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}},e._l(e.fields[t].options,function(r,o){return n("el-option",{key:o,attrs:{label:r.label,value:r.value,disabled:e.fields[t].unique&&e.repeated(t,r.value,(e.updatingRow||"")[t])}})})):e.fields[t].type===e.TYPES.datetime?n("el-date-picker",{attrs:{type:"datetime"},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}}):n("el-input",{attrs:{maxlength:e.fields[t].length},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}})],1)})),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.closeDialog}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.Submit}},[e._v("提交")])],1)],1)],1)},o=[],i={render:r,staticRenderFns:o};t.a=i},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments[2],r={create:"新增",update:"修改",destroy:"删除"},i=r[t]||"操作";1===e.code?(o.Message.success(i+"成功！"),n(e)):o.Message.error(i+"失败！"+e.msg)}t.a=r;var o=n(12);n.n(o)},function(t,n){t.exports=e}])});