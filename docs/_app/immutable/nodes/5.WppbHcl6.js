import{s as H,A as te,$ as K,a0 as Me,p as R,a1 as Re,a as E,d as m,a2 as ae,i as z,f as D,B as le,C as ne,D as ie,Z as $,a3 as We,a4 as x,e as W,c as I,m as b,n as Y,t as fe,j as G,b as ue,l as X,a5 as O,g as et,h as Q,u as Fe,y as tt,I as Ue,v as A,Y as we,G as ve,r as lt,a6 as nt,a7 as it,a8 as st,w as ce,X as rt,a9 as ot,aa as ft,H as ut,z as at,ab as ct}from"../chunks/scheduler.p3UhAeA_.js";import{S as L,i as M,t as v,a as p,c as q,b as P,m as V,d as B,g as he,e as de,f as ht}from"../chunks/index.RMAQ7HBv.js";import{e as C}from"../chunks/each.98E8eTIo.js";import{r as dt,w as ee}from"../chunks/index.STZDHOpY.js";import{d as _t}from"../chunks/index.SJTx5oYY.js";function _e(i,e){const l={},t={},n={$$scope:1};let r=i.length;for(;r--;){const s=i[r],f=e[r];if(f){for(const o in s)o in f||(t[o]=1);for(const o in f)n[o]||(l[o]=f[o],n[o]=1);i[r]=f}else for(const o in s)n[o]=1}for(const s in t)s in l||(l[s]=void 0);return l}function Ge(i){return typeof i=="object"&&i!==null?i:{}}/**
 * @license lucide-svelte v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function je(i,e,l){const t=i.slice();return t[10]=e[l][0],t[11]=e[l][1],t}function be(i){let e,l=[i[11]],t={};for(let n=0;n<l.length;n+=1)t=K(t,l[n]);return{c(){e=Me(i[10]),this.h()},l(n){e=Re(n,i[10],{}),E(e).forEach(m),this.h()},h(){ae(e,t)},m(n,r){z(n,e,r)},p(n,r){ae(e,t=_e(l,[r&32&&n[11]]))},d(n){n&&m(e)}}}function Ae(i){let e=i[10],l,t=i[10]&&be(i);return{c(){t&&t.c(),l=R()},l(n){t&&t.l(n),l=R()},m(n,r){t&&t.m(n,r),z(n,l,r)},p(n,r){n[10]?e?H(e,n[10])?(t.d(1),t=be(n),e=n[10],t.c(),t.m(l.parentNode,l)):t.p(n,r):(t=be(n),e=n[10],t.c(),t.m(l.parentNode,l)):e&&(t.d(1),t=null,e=n[10])},d(n){n&&m(l),t&&t.d(n)}}}function mt(i){let e,l,t,n,r,s=C(i[5]),f=[];for(let h=0;h<s.length;h+=1)f[h]=Ae(je(i,s,h));const o=i[9].default,a=te(o,i,i[8],null);let u=[Ie,i[6],{width:i[2]},{height:i[2]},{stroke:i[1]},{"stroke-width":t=i[4]?Number(i[3])*24/Number(i[2]):i[3]},{class:n=`lucide-icon lucide lucide-${i[0]} ${i[7].class??""}`}],_={};for(let h=0;h<u.length;h+=1)_=K(_,u[h]);return{c(){e=Me("svg");for(let h=0;h<f.length;h+=1)f[h].c();l=R(),a&&a.c(),this.h()},l(h){e=Re(h,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var c=E(e);for(let d=0;d<f.length;d+=1)f[d].l(c);l=R(),a&&a.l(c),c.forEach(m),this.h()},h(){ae(e,_)},m(h,c){z(h,e,c);for(let d=0;d<f.length;d+=1)f[d]&&f[d].m(e,null);D(e,l),a&&a.m(e,null),r=!0},p(h,[c]){if(c&32){s=C(h[5]);let d;for(d=0;d<s.length;d+=1){const w=je(h,s,d);f[d]?f[d].p(w,c):(f[d]=Ae(w),f[d].c(),f[d].m(e,l))}for(;d<f.length;d+=1)f[d].d(1);f.length=s.length}a&&a.p&&(!r||c&256)&&le(a,o,h,h[8],r?ie(o,h[8],c,null):ne(h[8]),null),ae(e,_=_e(u,[Ie,c&64&&h[6],(!r||c&4)&&{width:h[2]},(!r||c&4)&&{height:h[2]},(!r||c&2)&&{stroke:h[1]},(!r||c&28&&t!==(t=h[4]?Number(h[3])*24/Number(h[2]):h[3]))&&{"stroke-width":t},(!r||c&129&&n!==(n=`lucide-icon lucide lucide-${h[0]} ${h[7].class??""}`))&&{class:n}]))},i(h){r||(v(a,h),r=!0)},o(h){p(a,h),r=!1},d(h){h&&m(e),$(f,h),a&&a.d(h)}}}function gt(i,e,l){const t=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let n=We(e,t),{$$slots:r={},$$scope:s}=e,{name:f}=e,{color:o="currentColor"}=e,{size:a=24}=e,{strokeWidth:u=2}=e,{absoluteStrokeWidth:_=!1}=e,{iconNode:h}=e;return i.$$set=c=>{l(7,e=K(K({},e),x(c))),l(6,n=We(e,t)),"name"in c&&l(0,f=c.name),"color"in c&&l(1,o=c.color),"size"in c&&l(2,a=c.size),"strokeWidth"in c&&l(3,u=c.strokeWidth),"absoluteStrokeWidth"in c&&l(4,_=c.absoluteStrokeWidth),"iconNode"in c&&l(5,h=c.iconNode),"$$scope"in c&&l(8,s=c.$$scope)},e=x(e),[f,o,a,u,_,h,n,e,s,r]}class Xe extends L{constructor(e){super(),M(this,e,gt,mt,H,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}function Ce(i,e,l){const t=i.slice();t[3]=e[l].title,t[4]=e[l].slides,t[7]=l;const n=t[2][t[0]].section===t[7];return t[5]=n,t}function Te(i,e,l){const t=i.slice();t[8]=e[l];const n=t[8].i===t[0];return t[9]=n,t}function bt(i){let e;return{c(){e=W("div"),this.h()},l(l){e=I(l,"DIV",{class:!0}),E(e).forEach(m),this.h()},h(){b(e,"class","block svelte-s3rw5i")},m(l,t){z(l,e,t)},p:Y,d(l){l&&m(e)}}}function wt(i){let e,l=C(i[4]),t=[];for(let n=0;n<l.length;n+=1)t[n]=De(Te(i,l,n));return{c(){for(let n=0;n<t.length;n+=1)t[n].c();e=R()},l(n){for(let r=0;r<t.length;r+=1)t[r].l(n);e=R()},m(n,r){for(let s=0;s<t.length;s+=1)t[s]&&t[s].m(n,r);z(n,e,r)},p(n,r){if(r&3){l=C(n[4]);let s;for(s=0;s<l.length;s+=1){const f=Te(n,l,s);t[s]?t[s].p(f,r):(t[s]=De(f),t[s].c(),t[s].m(e.parentNode,e))}for(;s<t.length;s+=1)t[s].d(1);t.length=l.length}},d(n){n&&m(e),$(t,n)}}}function De(i){let e;return{c(){e=W("div"),this.h()},l(l){e=I(l,"DIV",{class:!0}),E(e).forEach(m),this.h()},h(){b(e,"class","block svelte-s3rw5i"),O(e,"active",i[9])},m(l,t){z(l,e,t)},p(l,t){t&3&&O(e,"active",l[9])},d(l){l&&m(e)}}}function He(i){let e,l,t=i[7]+1+"",n,r,s,f=i[3]+"",o,a,u;function _(d,w){return d[5]?wt:bt}let h=_(i),c=h(i);return{c(){e=W("div"),l=W("span"),n=fe(t),r=W("span"),s=fe("— "),o=fe(f),a=G(),c.c(),u=G(),this.h()},l(d){e=I(d,"DIV",{class:!0});var w=E(e);l=I(w,"SPAN",{class:!0});var S=E(l);n=ue(S,t),r=I(S,"SPAN",{class:!0});var N=E(r);s=ue(N,"— "),o=ue(N,f),N.forEach(m),S.forEach(m),a=X(w),c.l(w),u=X(w),w.forEach(m),this.h()},h(){b(r,"class","title svelte-s3rw5i"),b(l,"class","text svelte-s3rw5i"),b(e,"class","chapter svelte-s3rw5i"),O(e,"active",i[5])},m(d,w){z(d,e,w),D(e,l),D(l,n),D(l,r),D(r,s),D(r,o),D(e,a),c.m(e,null),D(e,u)},p(d,w){w&2&&f!==(f=d[3]+"")&&et(o,f),h===(h=_(d))&&c?c.p(d,w):(c.d(1),c=h(d),c&&(c.c(),c.m(e,u))),w&5&&O(e,"active",d[5])},d(d){d&&m(e),c.d()}}}function vt(i){let e,l=C(i[1]),t=[];for(let n=0;n<l.length;n+=1)t[n]=He(Ce(i,l,n));return{c(){e=W("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){e=I(n,"DIV",{class:!0});var r=E(e);for(let s=0;s<t.length;s+=1)t[s].l(r);r.forEach(m),this.h()},h(){b(e,"class","chapters svelte-s3rw5i")},m(n,r){z(n,e,r);for(let s=0;s<t.length;s+=1)t[s]&&t[s].m(e,null)},p(n,[r]){if(r&7){l=C(n[1]);let s;for(s=0;s<l.length;s+=1){const f=Ce(n,l,s);t[s]?t[s].p(f,r):(t[s]=He(f),t[s].c(),t[s].m(e,null))}for(;s<t.length;s+=1)t[s].d(1);t.length=l.length}},i:Y,o:Y,d(n){n&&m(e),$(t,n)}}}function kt(i,e,l){let{activeSlide:t}=e,{sections:n}=e,{allSlides:r}=e;return i.$$set=s=>{"activeSlide"in s&&l(0,t=s.activeSlide),"sections"in s&&l(1,n=s.sections),"allSlides"in s&&l(2,r=s.allSlides)},[t,n,r]}class pt extends L{constructor(e){super(),M(this,e,kt,vt,H,{activeSlide:0,sections:1,allSlides:2})}}const St=()=>window?.visualViewport?.width||document.documentElement.clientWidth,yt=()=>window?.visualViewport?.height||document.documentElement.clientHeight,zt=dt({width:0,height:0},i=>{const e=()=>i({width:St(),height:yt()});return e(),window.addEventListener("resize",_t(e,250)),()=>{window.removeEventListener("resize",e)}});function Et(i){let e,l,t;return{c(){e=W("figure"),l=fe("visual goes here"),this.h()},l(n){e=I(n,"FIGURE",{style:!0,class:!0});var r=E(e);l=ue(r,"visual goes here"),r.forEach(m),this.h()},h(){b(e,"style",t=`--offset: ${i[0]}px; --buffer: 2rem`),b(e,"class","svelte-4vfsg0")},m(n,r){z(n,e,r),D(e,l)},p(n,[r]){r&1&&t!==(t=`--offset: ${n[0]}px; --buffer: 2rem`)&&b(e,"style",t)},i:Y,o:Y,d(n){n&&m(e)}}}function Nt(i,e,l){let t,n,r;Q(i,zt,u=>l(3,r=u));let{activeSlide:s}=e,f,o=!1;const a=async()=>{if(o){await tt();const u=document.getElementById(`slide-${s}`);l(0,f=u.clientHeight+n)}};return Fe(()=>{o=!0,a()}),i.$$set=u=>{"activeSlide"in u&&l(1,s=u.activeSlide)},i.$$.update=()=>{i.$$.dirty&8&&l(2,t=r.width<600),i.$$.dirty&4&&(n=t?10:100),i.$$.dirty&10&&(r.width,a())},[f,s,t,r]}class Wt extends L{constructor(e){super(),M(this,e,Nt,Et,H,{activeSlide:1})}}function It(i){let e;const l=i[2].default,t=te(l,i,i[3],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,r){t&&t.m(n,r),e=!0},p(n,r){t&&t.p&&(!e||r&8)&&le(t,l,n,n[3],e?ie(l,n[3],r,null):ne(n[3]),null)},i(n){e||(v(t,n),e=!0)},o(n){p(t,n),e=!1},d(n){t&&t.d(n)}}}function jt(i){let e,l;const t=[{name:"chevron-left"},i[1],{iconNode:i[0]}];let n={$$slots:{default:[It]},$$scope:{ctx:i}};for(let r=0;r<t.length;r+=1)n=K(n,t[r]);return e=new Xe({props:n}),{c(){q(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,s){V(e,r,s),l=!0},p(r,[s]){const f=s&3?_e(t,[t[0],s&2&&Ge(r[1]),s&1&&{iconNode:r[0]}]):{};s&8&&(f.$$scope={dirty:s,ctx:r}),e.$set(f)},i(r){l||(v(e.$$.fragment,r),l=!0)},o(r){p(e.$$.fragment,r),l=!1},d(r){B(e,r)}}}function At(i,e,l){let{$$slots:t={},$$scope:n}=e;const r=[["path",{d:"m15 18-6-6 6-6"}]];return i.$$set=s=>{l(1,e=K(K({},e),x(s))),"$$scope"in s&&l(3,n=s.$$scope)},e=x(e),[r,e,t,n]}class Ct extends L{constructor(e){super(),M(this,e,At,jt,H,{})}}const Tt=Ct;function Dt(i){let e;const l=i[2].default,t=te(l,i,i[3],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,r){t&&t.m(n,r),e=!0},p(n,r){t&&t.p&&(!e||r&8)&&le(t,l,n,n[3],e?ie(l,n[3],r,null):ne(n[3]),null)},i(n){e||(v(t,n),e=!0)},o(n){p(t,n),e=!1},d(n){t&&t.d(n)}}}function Ht(i){let e,l;const t=[{name:"chevron-right"},i[1],{iconNode:i[0]}];let n={$$slots:{default:[Dt]},$$scope:{ctx:i}};for(let r=0;r<t.length;r+=1)n=K(n,t[r]);return e=new Xe({props:n}),{c(){q(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,s){V(e,r,s),l=!0},p(r,[s]){const f=s&3?_e(t,[t[0],s&2&&Ge(r[1]),s&1&&{iconNode:r[0]}]):{};s&8&&(f.$$scope={dirty:s,ctx:r}),e.$set(f)},i(r){l||(v(e.$$.fragment,r),l=!0)},o(r){p(e.$$.fragment,r),l=!1},d(r){B(e,r)}}}function qt(i,e,l){let{$$slots:t={},$$scope:n}=e;const r=[["path",{d:"m9 18 6-6-6-6"}]];return i.$$set=s=>{l(1,e=K(K({},e),x(s))),"$$scope"in s&&l(3,n=s.$$scope)},e=x(e),[r,e,t,n]}class Pt extends L{constructor(e){super(),M(this,e,qt,Ht,H,{})}}const Vt=Pt;function qe(i,e,l){const t=i.slice();return t[18]=e[l],t}function Pe(i){let e,l,t,n;const r=[Kt,Bt],s=[];function f(o,a){return o[18]==="left"?0:o[18]==="right"?1:-1}return~(l=f(i))&&(t=s[l]=r[l](i)),{c(){e=W("span"),t&&t.c(),this.h()},l(o){e=I(o,"SPAN",{style:!0,class:!0});var a=E(e);t&&t.l(a),a.forEach(m),this.h()},h(){A(e,"font-size",i[4]),b(e,"class","svelte-jjzds")},m(o,a){z(o,e,a),~l&&s[l].m(e,null),n=!0},p(o,a){let u=l;l=f(o),l===u?~l&&s[l].p(o,a):(t&&(he(),p(s[u],1,1,()=>{s[u]=null}),de()),~l?(t=s[l],t?t.p(o,a):(t=s[l]=r[l](o),t.c()),v(t,1),t.m(e,null)):t=null),(!n||a&16)&&A(e,"font-size",o[4])},i(o){n||(v(t),n=!0)},o(o){p(t),n=!1},d(o){o&&m(e),~l&&s[l].d()}}}function Bt(i){let e,l;return e=new Vt({props:{color:i[5],strokeWidth:i[6]}}),{c(){q(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,n){V(e,t,n),l=!0},p(t,n){const r={};n&32&&(r.color=t[5]),n&64&&(r.strokeWidth=t[6]),e.$set(r)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Kt(i){let e,l;return e=new Tt({props:{color:i[5],strokeWidth:i[6]}}),{c(){q(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,n){V(e,t,n),l=!0},p(t,n){const r={};n&32&&(r.color=t[5]),n&64&&(r.strokeWidth=t[6]),e.$set(r)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Ve(i){let e,l=i[9].includes(i[18]),t,n,r,s,f,o,a,u=l&&Pe(i);return{c(){e=W("button"),u&&u.c(),t=G(),this.h()},l(_){e=I(_,"BUTTON",{style:!0,"aria-label":!0,class:!0});var h=E(e);u&&u.l(h),t=X(h),h.forEach(m),this.h()},h(){A(e,"width",i[12](i[18])),A(e,"height",i[11](i[18])),b(e,"aria-label",n=i[18]),b(e,"class",r=i[18]+" "+i[7]+" svelte-jjzds"),e.disabled=s=i[2].includes(i[18]),O(e,"full",i[1])},m(_,h){z(_,e,h),u&&u.m(e,null),D(e,t),f=!0,o||(a=we(e,"click",function(){ve(i[13]("tap",i[18]))&&i[13]("tap",i[18]).apply(this,arguments)}),o=!0)},p(_,h){i=_,h&520&&(l=i[9].includes(i[18])),l?u?(u.p(i,h),h&520&&v(u,1)):(u=Pe(i),u.c(),v(u,1),u.m(e,t)):u&&(he(),p(u,1,1,()=>{u=null}),de()),(!f||h&4104)&&A(e,"width",i[12](i[18])),(!f||h&2056)&&A(e,"height",i[11](i[18])),(!f||h&8&&n!==(n=i[18]))&&b(e,"aria-label",n),(!f||h&136&&r!==(r=i[18]+" "+i[7]+" svelte-jjzds"))&&b(e,"class",r),(!f||h&12&&s!==(s=i[2].includes(i[18])))&&(e.disabled=s),(!f||h&138)&&O(e,"full",i[1])},i(_){f||(v(u),f=!0)},o(_){p(u),f=!1},d(_){_&&m(e),u&&u.d(),o=!1,a()}}}function Ot(i){let e,l,t,n;Ue(i[17]);let r=C(i[3]),s=[];for(let o=0;o<r.length;o+=1)s[o]=Ve(qe(i,r,o));const f=o=>p(s[o],1,1,()=>{s[o]=null});return{c(){e=W("section");for(let o=0;o<s.length;o+=1)s[o].c();this.h()},l(o){e=I(o,"SECTION",{style:!0,class:!0});var a=E(e);for(let u=0;u<s.length;u+=1)s[u].l(a);a.forEach(m),this.h()},h(){A(e,"height",i[8]+"px"),b(e,"class","svelte-jjzds"),O(e,"debug",i[0])},m(o,a){z(o,e,a);for(let u=0;u<s.length;u+=1)s[u]&&s[u].m(e,null);l=!0,t||(n=[we(window,"keydown",function(){ve(i[10])&&i[10].apply(this,arguments)}),we(window,"resize",i[17])],t=!0)},p(o,[a]){if(i=o,a&15102){r=C(i[3]);let u;for(u=0;u<r.length;u+=1){const _=qe(i,r,u);s[u]?(s[u].p(_,a),v(s[u],1)):(s[u]=Ve(_),s[u].c(),v(s[u],1),s[u].m(e,null))}for(he(),u=r.length;u<s.length;u+=1)f(u);de()}(!l||a&256)&&A(e,"height",i[8]+"px"),(!l||a&1)&&O(e,"debug",i[0])},i(o){if(!l){for(let a=0;a<r.length;a+=1)v(s[a]);l=!0}},o(o){s=s.filter(Boolean);for(let a=0;a<s.length;a+=1)p(s[a]);l=!1},d(o){o&&m(e),$(s,o),t=!1,lt(n)}}}function Lt(i,e,l){let t,n,r,s,{debug:f=!1}=e,{enableKeyboard:o=!1}=e,{full:a=!1}=e,{showArrows:u=!1}=e,{disable:_=[]}=e,{directions:h=["left","right"]}=e,{size:c="64px"}=e,{arrowSize:d="48px"}=e,{arrowStroke:w="#000"}=e,{arrowStrokeWidth:S="2"}=e,{arrowPosition:N="center"}=e;const j=nt();let T;function y(){l(8,T=window.innerHeight)}return i.$$set=g=>{"debug"in g&&l(0,f=g.debug),"enableKeyboard"in g&&l(14,o=g.enableKeyboard),"full"in g&&l(1,a=g.full),"showArrows"in g&&l(15,u=g.showArrows),"disable"in g&&l(2,_=g.disable),"directions"in g&&l(3,h=g.directions),"size"in g&&l(16,c=g.size),"arrowSize"in g&&l(4,d=g.arrowSize),"arrowStroke"in g&&l(5,w=g.arrowStroke),"arrowStrokeWidth"in g&&l(6,S=g.arrowStrokeWidth),"arrowPosition"in g&&l(7,N=g.arrowPosition)},i.$$.update=()=>{i.$$.dirty&65546&&l(12,t=g=>Array.isArray(c)?c[h.indexOf(g)]:a?"100%":c),i.$$.dirty&65538&&l(11,n=g=>["up","down"].includes(g)?c:a?"100%":c),i.$$.dirty&16392&&l(10,r=g=>{const se=g.key.replace("Arrow","").toLowerCase(),me=h.includes(se);o&&me&&(g.preventDefault(),j("tap",se))}),i.$$.dirty&32776&&l(9,s=h.filter(g=>typeof u=="boolean"?u:u.includes(g)))},[f,a,_,h,d,w,S,N,T,s,r,n,t,j,o,u,c,y]}class Mt extends L{constructor(e){super(),M(this,e,Lt,Ot,H,{debug:0,enableKeyboard:14,full:1,showArrows:15,disable:2,directions:3,size:16,arrowSize:4,arrowStroke:5,arrowStrokeWidth:6,arrowPosition:7})}}function Rt(i){let e,l,t,n,r;const s=i[26].default,f=te(s,i,i[25],null);return{c(){e=W("section"),l=W("div"),f&&f.c(),this.h()},l(o){e=I(o,"SECTION",{"aria-label":!0,class:!0});var a=E(e);l=I(a,"DIV",{class:!0,style:!0});var u=E(l);f&&f.l(u),u.forEach(m),a.forEach(m),this.h()},h(){b(l,"class","slides svelte-1ceqw5z"),b(l,"style",i[5]),b(e,"aria-label","carousel"),b(e,"class",t="slider "+i[0]+" svelte-1ceqw5z"),Ue(()=>i[29].call(e))},m(o,a){z(o,e,a),D(e,l),f&&f.m(l,null),i[27](l),i[28](e),n=it(e,i[29].bind(e)),r=!0},p(o,a){f&&f.p&&(!r||a[0]&33554432)&&le(f,s,o,o[25],r?ie(s,o[25],a,null):ne(o[25]),null),(!r||a[0]&32)&&b(l,"style",o[5]),(!r||a[0]&1&&t!==(t="slider "+o[0]+" svelte-1ceqw5z"))&&b(e,"class",t)},i(o){r||(v(f,o),r=!0)},o(o){p(f,o),r=!1},d(o){o&&m(e),f&&f.d(o),i[27](null),i[28](null),n()}}}function Ft(i,e,l){let t,n,r,s,f,o,a,u,_,h,c,{$$slots:d={},$$scope:w}=e,{direction:S="horizontal"}=e,{duration:N="500ms"}=e,{timing:j="ease"}=e,{count:T=0}=e,{current:y=0}=e;const g=()=>ge(1),se=()=>ge(-1),me=k=>ge(k,!0);let Z=0,J=0,F,U,ke=!1,re,oe,pe,Se=ee(),ye=ee(),ze=ee(),Ee=ee(),Ne=ee();const ge=(k,xe)=>{if(!ke)return!1;const $e=xe?k:J+k;l(14,J=Math.max(0,Math.min(Z-1,$e))),l(6,y=J)},Ye=k=>{ke=k[0].isIntersecting};Fe(()=>{l(13,Z=oe.children.length),l(7,T=Z),Ne.set(T),pe=new IntersectionObserver(Ye,{root:null,rootMargin:"-1px"}),pe.observe(re),l(2,U),l(1,F)});function Ze(k){ce[k?"unshift":"push"](()=>{oe=k,l(4,oe)})}function Je(k){ce[k?"unshift":"push"](()=>{re=k,l(3,re)})}function Qe(){F=this.clientWidth,U=this.clientHeight,l(1,F),l(2,U)}return i.$$set=k=>{"direction"in k&&l(0,S=k.direction),"duration"in k&&l(8,N=k.duration),"timing"in k&&l(9,j=k.timing),"count"in k&&l(7,T=k.count),"current"in k&&l(6,y=k.current),"$$scope"in k&&l(25,w=k.$$scope)},i.$$.update=()=>{i.$$.dirty[0]&8195&&l(24,t=S==="horizontal"?`${Z*F}px`:"100%"),i.$$.dirty[0]&8197&&l(23,n=S==="vertical"?`${Z*U}px`:"100%"),i.$$.dirty[0]&16387&&l(22,r=S==="horizontal"?`${J*F*-1}px`:0),i.$$.dirty[0]&16389&&l(21,s=S==="vertical"?`${J*U*-1}px`:0),i.$$.dirty[0]&16777216&&l(20,f=`width: ${t};`),i.$$.dirty[0]&8388608&&l(19,o=`height: ${n};`),i.$$.dirty[0]&6291456&&l(18,a=`transform: translate3d(${r}, ${s}, 0);`),i.$$.dirty[0]&256&&l(17,u=`transition-duration: ${N};`),i.$$.dirty[0]&512&&l(16,_=`transition-timing-function: ${j};`),i.$$.dirty[0]&2031616&&l(5,h=`${f} ${o} ${a} ${u} ${_}`),i.$$.dirty[0]&1&&Se.set(S),i.$$.dirty[0]&2&&ye.set(F),i.$$.dirty[0]&4&&ze.set(U),i.$$.dirty[0]&64&&Ee.set(y),i.$$.dirty[0]&32768&&st("Slider",c)},l(15,c={dir:Se,cur:Ee,w:ye,h:ze,count:Ne}),[S,F,U,re,oe,h,y,T,N,j,g,se,me,Z,J,c,_,u,a,o,f,s,r,n,t,w,d,Ze,Je,Qe]}class Ut extends L{constructor(e){super(),M(this,e,Ft,Rt,H,{direction:0,duration:8,timing:9,count:7,current:6,next:10,prev:11,jump:12},null,[-1,-1])}get next(){return this.$$.ctx[10]}get prev(){return this.$$.ctx[11]}get jump(){return this.$$.ctx[12]}}function Gt(i,e){const l=["a","button","input","textarea","select","details","[tabindex]:not([tabindex='-1'])"],t=s=>{r.forEach(f=>{s&&s.disable?f.setAttribute("tabindex",-1):f.removeAttribute("tabindex")})},n=l.join(", "),r=[...i.querySelectorAll(n)];return t(e),{update(s){t(s)},destroy(){r.forEach(s=>s.removeAttribute("tabindex"))}}}function Xt(i){let e,l,t,n,r,s,f;const o=i[16].default,a=te(o,i,i[15],null);return{c(){e=W("div"),a&&a.c(),this.h()},l(u){e=I(u,"DIV",{id:!0,class:!0,role:!0,"aria-label":!0,"aria-current":!0});var _=E(e);a&&a.l(_),_.forEach(m),this.h()},h(){b(e,"id",l="slide-"+i[0]),b(e,"class","slide svelte-1h814z3"),b(e,"role","group"),b(e,"aria-label",t="slide "+(i[0]+1)+" of "+i[5]),b(e,"aria-current",i[1]),O(e,"visible",i[1]),A(e,"width",i[4]),A(e,"height",i[3])},m(u,_){z(u,e,_),a&&a.m(e,null),r=!0,s||(f=rt(n=Gt.call(null,e,{disable:i[2]})),s=!0)},p(u,[_]){a&&a.p&&(!r||_&32768)&&le(a,o,u,u[15],r?ie(o,u[15],_,null):ne(u[15]),null),(!r||_&1&&l!==(l="slide-"+u[0]))&&b(e,"id",l),(!r||_&33&&t!==(t="slide "+(u[0]+1)+" of "+u[5]))&&b(e,"aria-label",t),(!r||_&2)&&b(e,"aria-current",u[1]),n&&ve(n.update)&&_&4&&n.update.call(null,{disable:u[2]}),(!r||_&2)&&O(e,"visible",u[1]),_&16&&A(e,"width",u[4]),_&8&&A(e,"height",u[3])},i(u){r||(v(a,u),r=!0)},o(u){p(a,u),r=!1},d(u){u&&m(e),a&&a.d(u),s=!1,f()}}}function Yt(i,e,l){let t,n,r,s,f,o,a,u,_,{$$slots:h={},$$scope:c}=e;const{dir:d,cur:w,w:S,h:N,count:j}=ot("Slider");Q(i,d,y=>l(13,a=y)),Q(i,w,y=>l(11,f=y)),Q(i,S,y=>l(14,u=y)),Q(i,N,y=>l(12,o=y)),Q(i,j,y=>l(5,_=y));let{index:T}=e;return i.$$set=y=>{"index"in y&&l(0,T=y.index),"$$scope"in y&&l(15,c=y.$$scope)},i.$$.update=()=>{i.$$.dirty&24576&&l(4,t=a==="horizontal"?`${u}px`:"100%"),i.$$.dirty&12288&&l(3,n=a==="vertical"?`${o}px`:"100%"),i.$$.dirty&2049&&l(1,r=T===f),i.$$.dirty&2&&l(2,s=!r)},[T,r,s,n,t,_,d,w,S,N,j,f,o,a,u,c,h]}class Zt extends L{constructor(e){super(),M(this,e,Yt,Xt,H,{index:0})}}function Be(i,e,l){const t=i.slice();return t[8]=e[l],t[10]=l,t}function Ke(i,e,l){const t=i.slice();return t[11]=e[l].type,t[12]=e[l].text,t}function Jt(i){let e,l,t=i[12]+"";return{c(){e=W(i[11]),l=new ut(!1),this.h()},l(n){e=I(n,(i[11]||"null").toUpperCase(),{class:!0});var r=E(e);l=at(r,!1),r.forEach(m),this.h()},h(){l.a=null,ct(i[11])(e,{class:"slide-content svelte-1myyodm"})},m(n,r){z(n,e,r),l.m(t,e)},p:Y,d(n){n&&m(e)}}}function Oe(i){let e=i[11]&&Jt(i);return{c(){e&&e.c()},l(l){e&&e.l(l)},m(l,t){e&&e.m(l,t)},p(l,t){l[11]&&e.p(l,t)},d(l){e&&e.d(l)}}}function Qt(i){let e,l=C(i[8].text),t=[];for(let n=0;n<l.length;n+=1)t[n]=Oe(Ke(i,l,n));return{c(){for(let n=0;n<t.length;n+=1)t[n].c();e=G()},l(n){for(let r=0;r<t.length;r+=1)t[r].l(n);e=X(n)},m(n,r){for(let s=0;s<t.length;s+=1)t[s]&&t[s].m(n,r);z(n,e,r)},p(n,r){if(r&8){l=C(n[8].text);let s;for(s=0;s<l.length;s+=1){const f=Ke(n,l,s);t[s]?t[s].p(f,r):(t[s]=Oe(f),t[s].c(),t[s].m(e.parentNode,e))}for(;s<t.length;s+=1)t[s].d(1);t.length=l.length}},d(n){n&&m(e),$(t,n)}}}function Le(i){let e,l;return e=new Zt({props:{index:i[10],$$slots:{default:[Qt]},$$scope:{ctx:i}}}),{c(){q(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,n){V(e,t,n),l=!0},p(t,n){const r={};n&32768&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function xt(i){let e,l,t=C(i[3]),n=[];for(let s=0;s<t.length;s+=1)n[s]=Le(Be(i,t,s));const r=s=>p(n[s],1,1,()=>{n[s]=null});return{c(){for(let s=0;s<n.length;s+=1)n[s].c();e=R()},l(s){for(let f=0;f<n.length;f+=1)n[f].l(s);e=R()},m(s,f){for(let o=0;o<n.length;o+=1)n[o]&&n[o].m(s,f);z(s,e,f),l=!0},p(s,f){if(f&8){t=C(s[3]);let o;for(o=0;o<t.length;o+=1){const a=Be(s,t,o);n[o]?(n[o].p(a,f),v(n[o],1)):(n[o]=Le(a),n[o].c(),v(n[o],1),n[o].m(e.parentNode,e))}for(he(),o=t.length;o<n.length;o+=1)r(o);de()}},i(s){if(!l){for(let f=0;f<t.length;f+=1)v(n[f]);l=!0}},o(s){n=n.filter(Boolean);for(let f=0;f<n.length;f+=1)p(n[f]);l=!1},d(s){s&&m(e),$(n,s)}}}function $t(i){let e,l,t,n,r,s,f,o,a,u;e=new pt({props:{activeSlide:i[1],sections:i[2],allSlides:i[3]}});function _(c){i[6](c)}let h={duration:"0",$$slots:{default:[xt]},$$scope:{ctx:i}};return i[1]!==void 0&&(h.current=i[1]),n=new Ut({props:h}),i[5](n),ce.push(()=>ht(n,"current",_)),f=new Wt({props:{activeSlide:i[1]}}),a=new Mt({props:{debug:!1,full:!0,directions:i[1]===0?["right"]:["left","right"],size:i[1]===0?"100%":["33%","67%"],enableKeyboard:!0,marginTop:0}}),a.$on("tap",i[4]),{c(){q(e.$$.fragment),l=G(),t=W("article"),q(n.$$.fragment),s=G(),q(f.$$.fragment),o=G(),q(a.$$.fragment),this.h()},l(c){P(e.$$.fragment,c),l=X(c),t=I(c,"ARTICLE",{class:!0});var d=E(t);P(n.$$.fragment,d),d.forEach(m),s=X(c),P(f.$$.fragment,c),o=X(c),P(a.$$.fragment,c),this.h()},h(){b(t,"class","svelte-1myyodm")},m(c,d){V(e,c,d),z(c,l,d),z(c,t,d),V(n,t,null),z(c,s,d),V(f,c,d),z(c,o,d),V(a,c,d),u=!0},p(c,[d]){const w={};d&2&&(w.activeSlide=c[1]),e.$set(w);const S={};d&32768&&(S.$$scope={dirty:d,ctx:c}),!r&&d&2&&(r=!0,S.current=c[1],ft(()=>r=!1)),n.$set(S);const N={};d&2&&(N.activeSlide=c[1]),f.$set(N);const j={};d&2&&(j.directions=c[1]===0?["right"]:["left","right"]),d&2&&(j.size=c[1]===0?"100%":["33%","67%"]),a.$set(j)},i(c){u||(v(e.$$.fragment,c),v(n.$$.fragment,c),v(f.$$.fragment,c),v(a.$$.fragment,c),u=!0)},o(c){p(e.$$.fragment,c),p(n.$$.fragment,c),p(f.$$.fragment,c),p(a.$$.fragment,c),u=!1},d(c){c&&(m(l),m(t),m(s),m(o)),B(e,c),i[5](null),B(n),B(f,c),B(a,c)}}}function el(i,e,l){let t,n=0;const r=[{title:"Intro",slides:[{i:0,text:[{type:"h1",text:"title"},{type:"p",text:"welcome"}]}]},{title:"Middle",slides:[{i:1,text:[{type:"p",text:"the quick brown"},{type:"p",text:"the quick brown"},{type:"p",text:"the quick brown"}]},{i:2,text:[{type:"p",text:"fox jumps over"},{type:"p",text:"fox jumps over"}]},{i:3,text:[{type:"p",text:"the lazy dog"}]}]},{title:"Outro",slides:[{i:4,text:[{type:"h2",text:"the end."}]}]}],s=r.map((u,_)=>u.slides.map(h=>({...h,section:_}))).flat(),f=({detail:u})=>{u==="right"?t.next():t.prev(),window.scrollTo(0,0)};function o(u){ce[u?"unshift":"push"](()=>{t=u,l(0,t)})}function a(u){n=u,l(1,n)}return[t,n,r,s,f,o,a]}class tl extends L{constructor(e){super(),M(this,e,el,$t,H,{})}}function ll(i){let e,l;return e=new tl({}),{c(){q(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,n){V(e,t,n),l=!0},p:Y,i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}class fl extends L{constructor(e){super(),M(this,e,null,ll,H,{})}}export{fl as component};
