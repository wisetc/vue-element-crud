!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):"object"==typeof exports?exports.CRUD=t(require("element-ui")):e.CRUD=t(e["element-ui"])}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=3)}([function(e,t,n){"use strict";function r(e){n(4)}var i=n(9),o=n(10),a=n(1),s=r,l=a(i.a,o.a,!1,s,null,null);t.a=l.exports},function(e,t){e.exports=function(e,t,n,r,i,o){var a,s=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(a=e,s=e.default);var u="function"==typeof s?s.options:s;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i);var d;if(o?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=d):r&&(d=r),d){var c=u.functional,f=c?u.render:u.beforeCreate;c?(u._injectStyles=d,u.render=function(e,t){return d.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,d):[d]}return{esModule:a,exports:s,options:u}}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=["string","text","boolean","integer","float","date","datetime","objectid"];t.a=o.reduce(function(e,t,n){return i({},e,r({},t,n+1))},{})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(11),o=n(2),a=n(14);n.d(t,"fields",function(){return o.a}),n.d(t,"CRUD",function(){return r.a}),n.d(t,"Simple",function(){return i.a});var s=function(e,t){e.component("crud",r.a),e.prototype.$report=a.a};"undefined"!=typeof window&&window.Vue&&s(window.Vue),t.default={install:s}},function(e,t,n){var r=n(5);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(7)("e4c110b8",r,!0)},function(e,t,n){t=e.exports=n(6)(void 0),t.push([e.i,'.crud__ctrl{margin:8px 0}.crud__form--inline:after{content:"";clear:both;display:table}.crud__form--inline .el-form-item{width:33%;float:left;padding:0 8px;box-sizing:border-box}',""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=d[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));d[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function o(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(h)return m;r.parentNode.removeChild(r)}if(v){var o=p++;r=f||(f=i()),t=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function a(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function s(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(8),d={},c=l&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,h=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){h=n;var i=u(e,t);return r(i),function(t){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=d[a.id];s.refs--,n.push(s)}t?(i=u(e,t),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete d[s.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],l=o[2],u=o[3],d={id:e+":"+i,css:s,media:l,sourceMap:u};r[a]?r[a].parts.push(d):n.push(r[a]={id:a,parts:[d]})}return n}},function(e,t,n){"use strict";var r=n(2);t.a={props:{data:{required:!0,type:Array},form:{required:!0,type:Object},fields:{required:!0,type:Object},rules:{required:!0,type:Object},editing:{required:!0,type:Boolean},size:{default:"large",type:String},labelWidth:{default:"100px",type:String},inline:{default:!1,type:Boolean},table:{default:function(){return{}},type:Object},loading:{default:!1,type:Boolean},actions:{default:function(){return["create","destroy","update"]},type:Array},highlightCurrentRow:{default:!1,type:Boolean},rowStyle:Function},data:function(){return{dialog:{status:0,title:{0:"新增",1:"修改"},size:this.inline?this.size:"small"},updatingRow:null,TYPES:r.a}},computed:{labels:function(){var e={},t=this.fields;for(var n in t)e[n]=t[n].label;return e},columns:function(){return Object.keys(this.table).length?this.table:this.labels}},methods:{create:function(){this.dialog.status=0,this.showDialog(),this.$emit("create")},update:function(e,t){this.dialog.status=1,this.updatingRow=e,this.showDialog(),this.$emit("update",e,t)},destroy:function(e,t){var n=this;this.$confirm("确定要删除？","确认",{type:"warning"}).then(function(){n.$emit("destroy",e,t)}).catch(function(e){})},showDialog:function(){this.$emit("open")},closeDialog:function(){this.$emit("close")},handleOpen:function(){this.$refs.form&&this.$refs.form.resetFields()},submit:function(){var e=this;this.$refs.form.validate(function(t){t&&e.$emit("submit",e.dialog.status)})},repeated:function(e,t,n){return t!==n&&!!this.data.find(function(n){return n[e]===t})},handleExpand:function(e,t){this.$emit("expand",e,t)},handleRowClick:function(e,t,n){this.$emit("row-click",e,t,n)},handleRowDblclick:function(e,t){this.$emit("row-dblclick",e,t)}}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"crud"},[n("div",{staticClass:"crud__ctrl"},[e.actions.includes("create")?n("el-button",{attrs:{type:"primary",size:"small",icon:"plus"},on:{click:e.create}},[e._v("新增")]):e._e()],1),e._v(" "),n("el-table",{attrs:{data:e.data,stripe:"",border:"","row-style":e.rowStyle||void 0,"highlight-current-row":e.highlightCurrentRow},on:{expand:e.handleExpand,"row-click":e.handleRowClick,"row-dblclick":e.handleRowDblclick}},[e._t("expand"),e._v(" "),e._t("index"),e._v(" "),e._t("prepend"),e._v(" "),e._l(Object.keys(e.columns),function(t,r){return[(e.fields[t]||"").options?n("el-table-column",{key:r,attrs:{label:e.columns[t],"min-width":e.labelWidth,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(n){return[e._v("\n          "+e._s((e.fields[t].options.find(function(e){return e.value===n.row[t]})||"").label)+"\n        ")]}}])}):n("el-table-column",{key:r,attrs:{label:e.columns[t],"min-width":e.labelWidth,prop:t,"show-overflow-tooltip":""}})]}),e._v(" "),e._t("default"),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.actions.includes("update")?n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){n.stopPropagation(),e.update(t.row,t.$index)}}},[e._v("修改")]):e._e(),e._v(" "),e.actions.includes("destroy")?n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){n.stopPropagation(),e.destroy(t.row,t.$index)}}},[e._v("删除")]):e._e()]}}])})],2),e._v(" "),n("el-dialog",{attrs:{title:e.dialog.title[e.dialog.status],size:e.dialog.size,"close-on-click-modal":!1,visible:e.editing,"show-close":!1},on:{open:e.handleOpen}},[n("el-form",{ref:"form",staticClass:"crud__form",class:{"crud__form--inline":e.inline},attrs:{model:e.form,rules:e.rules},nativeOn:{keyup:function(t){if(!("button"in t)&&13!==t.keyCode)return null;e.submit(t)}}},[e._l(Object.keys(e.labels),function(t,r){return n("el-form-item",{key:r,attrs:{label:e.labels[t],prop:t,"label-width":e.labelWidth}},[e.fields[t].options?n("el-select",{staticStyle:{width:"100%"},attrs:{disabled:e.fields[t].disabled,filterable:""},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}},e._l(e.fields[t].options,function(r,i){return n("el-option",{key:i,attrs:{label:r.label,value:r.value,disabled:e.fields[t].unique&&e.repeated(t,r.value,(e.updatingRow||"")[t])}})})):e.fields[t].type===e.TYPES.datetime||"datetime"===e.fields[t].type?n("el-date-picker",{attrs:{disabled:e.fields[t].disabled,type:"datetime"},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}}):e.fields[t].type===e.TYPES.text||"text"===e.fields[t].type?n("el-input",{attrs:{disabled:e.fields[t].disabled,type:"textarea",resize:"none",maxlength:e.fields[t].length},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}}):e.fields[t].type===Number||"number"===e.fields[t].type?n("el-input",{attrs:{disabled:e.fields[t].disabled,type:"number",maxlength:e.fields[t].length},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,e._n(n))},expression:"form[key]"}}):n("el-input",{attrs:{disabled:e.fields[t].disabled,maxlength:e.fields[t].length},model:{value:e.form[t],callback:function(n){e.$set(e.form,t,n)},expression:"form[key]"}})],1)}),e._v(" "),e._t("addon")],2),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.closeDialog}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.submit}},[e._v("提交")])],1)],1)],1)},i=[],o={render:r,staticRenderFns:i};t.a=o},function(e,t,n){"use strict";var r=n(12),i=n(13),o=n(1),a=o(r.a,i.a,!1,null,null,null);t.a=a.exports},function(e,t,n){"use strict";var r=n(0),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.a={components:{crud:r.a},data:function(){return{data:[],form:{},editing:!1,mapItems:{}}},computed:{model:function(){var e={},t=this.mapItems;for(var n in t)e[n]=null;return e},rules:function(){var e={},t=this.mapItems;for(var n in t)t[n].rules&&(e[n]=t[n].rules.concat({pattern:/^\S.*?$/,message:"不允许以空格开头"}));return e}},methods:{loadData:function(){},handleCreate:function(){this.form=i({},this.model)},handleUpdate:function(e,t){this.form=i({},e)},handleDestroy:function(e,t){},handleOpen:function(){this.editing=!0},handleClose:function(){this.editing=!1},handleSubmit:function(e){},createSuccess:function(e){this.loadData(),this.handleClose()},updateSuccess:function(){this.loadData(),this.handleClose()},deleteSuccess:function(e){this.loadData()}}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("crud",{attrs:{data:e.data,form:e.form,rules:e.rules,fields:e.mapItems,index:"",editing:e.editing},on:{open:e.handleOpen,close:e.handleClose,create:e.handleCreate,update:e.handleUpdate,destroy:e.handleDestroy,submit:e.handleSubmit}})],1)},i=[],o={render:r,staticRenderFns:i};t.a=o},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments[2],r={create:"新增",update:"修改",destroy:"删除"},o=r[t]||"操作";1===e.code?(i.Message.success(o+"成功！"),n(e)):i.Message.error(o+"失败！"+e.msg)}t.a=r;var i=n(15);n.n(i)},function(t,n){t.exports=e}])});