(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30eed3f4"],{"02f4":function(e,t,n){var i=n("4588"),r=n("be13");e.exports=function(e){return function(t,n){var a,c,s=String(r(t)),o=i(n),u=s.length;return o<0||o>=u?e?"":void 0:(a=s.charCodeAt(o),a<55296||a>56319||o+1===u||(c=s.charCodeAt(o+1))<56320||c>57343?e?s.charAt(o):a:e?s.slice(o,o+2):c-56320+(a-55296<<10)+65536)}}},"0390":function(e,t,n){"use strict";var i=n("02f4")(!0);e.exports=function(e,t,n){return t+(n?i(e,t).length:1)}},"0a49":function(e,t,n){var i=n("9b43"),r=n("626a"),a=n("4bf8"),c=n("9def"),s=n("cd1c");e.exports=function(e,t){var n=1==e,o=2==e,u=3==e,l=4==e,f=6==e,d=5==e||f,h=t||s;return function(t,s,b){for(var p,g,v=a(t),m=r(v),x=i(s,b,3),y=c(m.length),S=0,L=n?h(t,y):o?h(t,0):void 0;y>S;S++)if((d||S in m)&&(p=m[S],g=x(p,S,v),e))if(n)L[S]=g;else if(g)switch(e){case 3:return!0;case 5:return p;case 6:return S;case 2:L.push(p)}else if(l)return!1;return f?-1:u||l?l:L}}},"0bfb":function(e,t,n){"use strict";var i=n("cb7c");e.exports=function(){var e=i(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},1169:function(e,t,n){var i=n("2d95");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"185a":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("el-container",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{border:"1px solid #eee"},style:{height:e.screenHeight+"px"}},[n("el-aside",{staticStyle:{"background-color":"#fff"},attrs:{width:"250px"}},[n("div",[n("div",{staticStyle:{height:"60px","text-align":"center"}},[n("h1",{staticStyle:{color:"#409EFF",margin:"0","line-height":"60px"}},[e._v("LOGO")])]),n("div",{staticStyle:{display:"flex",padding:"20px","justify-content":"center"}},[n("img",{attrs:{width:"50",height:"50",src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555304257327&di=2ccd831dbf790612c56472eb43041649&imgtype=0&src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F1272179%2F201812%2F1272179-20181209174143070-321761922.jpg",alt:"img"}}),n("div",{staticStyle:{padding:"0 10px","font-size":"13px",color:"#777","line-height":"25px"}},[n("span",[e._v("小飘飘")]),n("br"),n("span",[e._v("技术部前端")])])])]),n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{theme:"dark","unique-opened":"",router:!0,"default-active":e.onRoutes}},[e._l(e.items,function(t){return[t.subs?[n("el-submenu",{key:t.index,attrs:{index:t.index}},[n("template",{slot:"title"},[n("i",{class:t.icon}),e._v("\n                "+e._s(t.title)+"\n              ")]),e._l(t.subs,function(t,i){return n("el-menu-item",{key:i,attrs:{index:t.index}},[e._v(e._s(t.title))])})],2)]:[n("el-menu-item",{key:t.index,attrs:{index:t.index}},[n("i",{class:t.icon}),e._v("\n              "+e._s(t.title)+"\n            ")])]]})],2)],1),n("el-container",[n("el-header",{staticClass:"header"},[n("div",{staticStyle:{flex:"1"}},[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},e._l(e.breadcrumb,function(t,i){return n("el-breadcrumb-item",{key:i},[e._v(e._s(t))])}),1)],1),e._l(e.headerList,function(t,i){return n("div",{key:i,staticClass:"header-item",on:{click:function(t){return e.jump(i)}}},[n("i",{staticClass:"user-icon",class:t.icon}),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.title,placement:"bottom"}},[n("span",{staticClass:"user-name",on:{click:function(t){return e.loginDown(i)}}},[e._v(e._s(t.title))])])],1)})],2),n("el-tabs",{staticClass:"header-tabs",attrs:{type:"card",closable:""},on:{"tab-click":e.tabClick,"tab-remove":e.tabRemove},model:{value:e.editableTabsValue,callback:function(t){e.editableTabsValue=t},expression:"editableTabsValue"}},e._l(e.editableTabs,function(e){return n("el-tab-pane",{key:e.name,attrs:{label:e.title,name:e.name}})}),1),n("div",{staticClass:"content",style:{height:e.screenHeight-60+"px"}},[n("router-view")],1)],1)],1)],1)},r=[],a=(n("7514"),n("7f7f"),n("a481"),n("ac6a"),n("5c96"),n("a18c")),c={name:"Container",data:function(){return{editableTabsValue:"",editableTabs:[],breadcrumb:["首页"],screenHeight:600,items:[],headerList:[{icon:"el-icon-question",title:"公告"},{icon:"el-icon-warning",title:"意见"},{icon:"el-icon-star-on",title:"退出"}],curRouter:""}},mounted:function(){var e=this;this.screenHeight=document.documentElement.clientHeight,window.onresize=function(){e.screenHeight=document.documentElement.clientHeight};var t=a["a"].options.routes[2].children,n=!1,i=0;t.forEach(function(t,r){"not"!=t.type&&(!n&&(i=r),t.subIndex||t.subTitle||t.subIcon?(n=!1,e.items.forEach(function(e,i){e.index!=t.subIndex&&e.title!=t.subIndex||(n=!0)}),n?e.items[i-1].subs.push({index:t.path.substr(1),title:t.title}):e.items.push({icon:t.subIcon,index:t.subIndex,title:t.subTitle,subs:[]})):e.items.push({icon:t.icon,index:t.path.substr(1),title:t.title}))}),this.items=this.items.filter(function(e){return""!==e.index})},computed:{onRoutes:function(){var e=this.$route.path.replace("/","");if("singerDetail"!=e&&"cmSingerDetail"!=e&&"cmLogin"!=e&&"cmSingerHotList"!=e)return this.addTab(e),this.curRouter=e,e},fullscreenLoading:function(){return this.$store.getters.fullscreenLoading}},watch:{screenHeight:function(){this.changePageHeight(this.screenHeight)}},methods:{changePageHeight:function(e){this.screenHeight=e},loginDown:function(e){3==e&&this.$router.replace("/login")},tabClick:function(e){e.name!=this.curRouter&&(this.$store.dispatch("fullscreenLoading",!0),this.changeBreadcrumb(e.name),this.editableTabsValue=e.name,this.$router.replace(e.name))},addTab:function(e){this.editableTabs.find(function(t){return t.name===e})||(this.editableTabs.push({title:this.routerName(e),name:e}),this.$store.dispatch("fullscreenLoading",!0)),this.changeBreadcrumb(e),this.editableTabsValue=e},tabRemove:function(e){this.$store.dispatch("fullscreenLoading",!0);var t=this.editableTabs,n=this.editableTabsValue;n===e&&t.forEach(function(i,r){if(i.name===e){var a=t[r+1]||t[r-1];a&&(n=a.name)}}),this.changeBreadcrumb(n),this.editableTabsValue=n,this.editableTabs=this.editableTabs.filter(function(t){return t.name!==e}),this.$router.replace(n)},routerName:function(e){return a["a"].options.routes[2].children.find(function(t){return t.path.substr(1)==e}).title},changeBreadcrumb:function(e){var t=this;this.breadcrumb=[],this.items.map(function(n,i){n.subs?n.subs.forEach(function(i){i.index==e&&(t.breadcrumb.push(n.title),t.breadcrumb.push(i.title))}):n.index==e&&t.breadcrumb.push(n.title)})},jump:function(e){}}},s=c,o=(n("229c"),n("2877")),u=Object(o["a"])(s,i,r,!1,null,"851aad3e",null);t["default"]=u.exports},"214f":function(e,t,n){"use strict";n("b0c5");var i=n("2aba"),r=n("32e9"),a=n("79e5"),c=n("be13"),s=n("2b4c"),o=n("520a"),u=s("species"),l=!a(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var d=s(e),h=!a(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),b=h?!a(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[u]=function(){return n}),n[d](""),!t}):void 0;if(!h||!b||"replace"===e&&!l||"split"===e&&!f){var p=/./[d],g=n(c,d,""[e],function(e,t,n,i,r){return t.exec===o?h&&!r?{done:!0,value:p.call(t,n,i)}:{done:!0,value:e.call(n,t,i)}:{done:!1}}),v=g[0],m=g[1];i(String.prototype,e,v),r(RegExp.prototype,d,2==t?function(e,t){return m.call(e,this,t)}:function(e){return m.call(e,this)})}}},"229c":function(e,t,n){"use strict";var i=n("9136"),r=n.n(i);r.a},"520a":function(e,t,n){"use strict";var i=n("0bfb"),r=RegExp.prototype.exec,a=String.prototype.replace,c=r,s="lastIndex",o=function(){var e=/a/,t=/b*/g;return r.call(e,"a"),r.call(t,"a"),0!==e[s]||0!==t[s]}(),u=void 0!==/()??/.exec("")[1],l=o||u;l&&(c=function(e){var t,n,c,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",i.call(f))),o&&(t=f[s]),c=r.call(f,e),o&&c&&(f[s]=f.global?c.index+c[0].length:t),u&&c&&c.length>1&&a.call(c[0],n,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(c[l]=void 0)}),c}),e.exports=c},"5f1b":function(e,t,n){"use strict";var i=n("23c6"),r=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var a=n.call(e,t);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==i(e))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(e,t)}},7514:function(e,t,n){"use strict";var i=n("5ca1"),r=n("0a49")(5),a="find",c=!0;a in[]&&Array(1)[a](function(){c=!1}),i(i.P+i.F*c,"Array",{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(a)},"7f7f":function(e,t,n){var i=n("86cc").f,r=Function.prototype,a=/^\s*function ([^ (]*)/,c="name";c in r||n("9e1e")&&i(r,c,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(e){return""}}})},9136:function(e,t,n){},a481:function(e,t,n){"use strict";var i=n("cb7c"),r=n("4bf8"),a=n("9def"),c=n("4588"),s=n("0390"),o=n("5f1b"),u=Math.max,l=Math.min,f=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,b=function(e){return void 0===e?e:String(e)};n("214f")("replace",2,function(e,t,n,p){return[function(i,r){var a=e(this),c=void 0==i?void 0:i[t];return void 0!==c?c.call(i,a,r):n.call(String(a),i,r)},function(e,t){var r=p(n,e,this,t);if(r.done)return r.value;var f=i(e),d=String(this),h="function"===typeof t;h||(t=String(t));var v=f.global;if(v){var m=f.unicode;f.lastIndex=0}var x=[];while(1){var y=o(f,d);if(null===y)break;if(x.push(y),!v)break;var S=String(y[0]);""===S&&(f.lastIndex=s(d,a(f.lastIndex),m))}for(var L="",T=0,k=0;k<x.length;k++){y=x[k];for(var w=String(y[0]),C=u(l(c(y.index),d.length),0),_=[],E=1;E<y.length;E++)_.push(b(y[E]));var R=y.groups;if(h){var A=[w].concat(_,C,d);void 0!==R&&A.push(R);var H=String(t.apply(void 0,A))}else H=g(w,d,C,_,R,t);C>=T&&(L+=d.slice(T,C)+H,T=C+w.length)}return L+d.slice(T)}];function g(e,t,i,a,c,s){var o=i+e.length,u=a.length,l=h;return void 0!==c&&(c=r(c),l=d),n.call(s,l,function(n,r){var s;switch(r.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,i);case"'":return t.slice(o);case"<":s=c[r.slice(1,-1)];break;default:var l=+r;if(0===l)return n;if(l>u){var d=f(l/10);return 0===d?n:d<=u?void 0===a[d-1]?r.charAt(1):a[d-1]+r.charAt(1):n}s=a[l-1]}return void 0===s?"":s})}})},ac6a:function(e,t,n){for(var i=n("cadf"),r=n("0d58"),a=n("2aba"),c=n("7726"),s=n("32e9"),o=n("84f2"),u=n("2b4c"),l=u("iterator"),f=u("toStringTag"),d=o.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},b=r(h),p=0;p<b.length;p++){var g,v=b[p],m=h[v],x=c[v],y=x&&x.prototype;if(y&&(y[l]||s(y,l,d),y[f]||s(y,f,v),o[v]=d,m))for(g in i)y[g]||a(y,g,i[g],!0)}},b0c5:function(e,t,n){"use strict";var i=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:i!==/./.exec},{exec:i})},cd1c:function(e,t,n){var i=n("e853");e.exports=function(e,t){return new(i(e))(t)}},e853:function(e,t,n){var i=n("d3f4"),r=n("1169"),a=n("2b4c")("species");e.exports=function(e){var t;return r(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!r(t.prototype)||(t=void 0),i(t)&&(t=t[a],null===t&&(t=void 0))),void 0===t?Array:t}}}]);
//# sourceMappingURL=chunk-30eed3f4.1b0ca997.js.map