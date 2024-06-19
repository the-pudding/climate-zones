import{s as ee,e as C,j as S,t as H,U as ye,c as x,d as k,l as M,a as L,b as O,k as G,m as E,v as K,f as h,i as F,V as _e,W as Q,g as Y,F as ve,n as $,r as ae,u as ge,o as X,X as fe,Y as Ee}from"../chunks/scheduler.9SeMELJU.js";import{S as te,i as ne,t as R,g as ce,e as ue,a as J,c as de,b as he,m as pe,d as me}from"../chunks/index.sjV6SaHS.js";import{e as Z}from"../chunks/each.ujfrkx7c.js";import"../chunks/transform.hO0TreJf.js";import{b as be}from"../chunks/paths.5KitKayx.js";function ke(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}class Ce extends Map{constructor(e,s=Te){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:s}}),e!=null)for(const[n,i]of e)this.set(n,i)}get(e){return super.get(se(this,e))}has(e){return super.has(se(this,e))}set(e,s){return super.set(xe(this,e),s)}delete(e){return super.delete(ze(this,e))}}function se({_intern:t,_key:e},s){const n=e(s);return t.has(n)?t.get(n):s}function xe({_intern:t,_key:e},s){const n=e(s);return t.has(n)?t.get(n):(t.set(n,s),s)}function ze({_intern:t,_key:e},s){const n=e(s);return t.has(n)&&(s=t.get(n),t.delete(n)),s}function Te(t){return t!==null&&typeof t=="object"?t.valueOf():t}function we(t){return t}function Le(t,...e){return Se(t,Array.from,we,e)}function Se(t,e,s,n){return function i(o,v){if(v>=n.length)return s(o);const y=new Ce,c=n[v++];let l=-1;for(const m of o){const r=c(m,++l,o),a=y.get(r);a?a.push(m):y.set(r,[m])}for(const[m,r]of y)y.set(m,i(r,v));return e(y)}(t,0)}async function Me(t){if("clipboard"in navigator)await navigator.clipboard.writeText(t);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=t,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const Ne=(t,e)=>{async function s(){if(i)try{await Me(i),t.dispatchEvent(new CustomEvent("svelte-copy",{detail:i}))}catch(o){t.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let n=typeof e=="string"?["click"]:[e.events].flat(1),i=typeof e=="string"?e:e.text;return n.forEach(o=>{t.addEventListener(o,s,!0)}),{update:o=>{const v=typeof o=="string"?["click"]:[o.events].flat(1),y=typeof o=="string"?o:o.text,c=v.filter(m=>!n.includes(m)),l=n.filter(m=>!v.includes(m));c.forEach(m=>{t.addEventListener(m,s,!0)}),l.forEach(m=>{t.removeEventListener(m,s,!0)}),n=v,i=y},destroy:()=>{n.forEach(o=>{t.removeEventListener(o,s,!0)})}}};function Pe(t){let e,s,n,i,o,v,y,c,l,m,r,a="CSS Snippet",p,g,B,N,D,T,w="Copy CSS to Clipboard",j,z,P,U,W;return{c(){e=C("link"),s=S(),n=C("div"),i=C("h3"),o=H(t[0]),v=S(),y=C("p"),c=H(t[1]),l=S(),m=C("details"),r=C("summary"),r.textContent=a,p=S(),g=C("code"),B=H(t[2]),N=S(),D=C("p"),T=C("button"),T.textContent=w,z=C("span"),P=H(t[3]),this.h()},l(b){const f=ye("svelte-1uevrx3",document.head);e=x(f,"LINK",{rel:!0,href:!0}),f.forEach(k),s=M(b),n=x(b,"DIV",{style:!0,class:!0});var I=L(n);i=x(I,"H3",{class:!0});var u=L(i);o=O(u,t[0]),u.forEach(k),v=M(I),y=x(I,"P",{});var _=L(y);c=O(_,t[1]),_.forEach(k),l=M(I),m=x(I,"DETAILS",{class:!0});var d=L(m);r=x(d,"SUMMARY",{class:!0,"data-svelte-h":!0}),G(r)!=="svelte-1p4cxwi"&&(r.textContent=a),p=M(d),g=x(d,"CODE",{class:!0});var A=L(g);B=O(A,t[2]),A.forEach(k),d.forEach(k),N=M(I),D=x(I,"P",{});var q=L(D);T=x(q,"BUTTON",{class:!0,"data-svelte-h":!0}),G(T)!=="svelte-v2s51m"&&(T.textContent=w),z=x(q,"SPAN",{class:!0});var V=L(z);P=O(V,t[3]),V.forEach(k),q.forEach(k),I.forEach(k),this.h()},h(){E(e,"rel","external stylesheet"),E(e,"href",t[5]),E(i,"class","svelte-19ry7n"),K(y,"font-size",t[4]),E(r,"class","svelte-19ry7n"),E(g,"class","svelte-19ry7n"),E(m,"class","svelte-19ry7n"),E(T,"class","svelte-19ry7n"),E(z,"class","svelte-19ry7n"),K(n,"font-family","'"+t[0]+"'"),E(n,"class","svelte-19ry7n")},m(b,f){h(document.head,e),F(b,s,f),F(b,n,f),h(n,i),h(i,o),h(n,v),h(n,y),h(y,c),h(n,l),h(n,m),h(m,r),h(m,p),h(m,g),h(g,B),h(n,N),h(n,D),h(D,T),h(D,z),h(z,P),U||(W=[_e(j=Ne.call(null,T,t[2])),Q(T,"svelte-copy",t[6])],U=!0)},p(b,[f]){f&1&&Y(o,b[0]),f&2&&Y(c,b[1]),f&16&&K(y,"font-size",b[4]),f&4&&Y(B,b[2]),j&&ve(j.update)&&f&4&&j.update.call(null,b[2]),f&8&&Y(P,b[3]),f&1&&K(n,"font-family","'"+b[0]+"'")},i:$,o:$,d(b){b&&(k(s),k(n)),k(e),U=!1,ae(W)}}}function Ie(t,e,s){let n,{id:i=""}=e,{family:o=""}=e,{size:v=16}=e,{text:y}=e,c="",l="";const m=`${be}/assets/demo/fonts/${i}.css`,r=()=>{s(3,l="Copied!"),setTimeout(()=>{s(3,l="")},1e3)};return ge(async()=>{const a=await fetch(m);s(2,c=await a.text())}),t.$$set=a=>{"id"in a&&s(7,i=a.id),"family"in a&&s(0,o=a.family),"size"in a&&s(8,v=a.size),"text"in a&&s(1,y=a.text)},t.$$.update=()=>{t.$$.dirty&256&&s(4,n=`${v}px`)},[o,y,c,l,n,m,r,i,v]}class Ae extends te{constructor(e){super(),ne(this,e,Ie,Pe,ee,{id:7,family:0,size:8,text:1})}}const De=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function le(t,e,s){const n=t.slice();return n[5]=e[s][0],n[6]=e[s][1],n}function oe(t,e,s){const n=t.slice();return n[9]=e[s].family,n[10]=e[s].id,n}function re(t){let e,s;return e=new Ae({props:{id:t[10],family:t[9],size:t[0],text:t[1]}}),{c(){de(e.$$.fragment)},l(n){he(e.$$.fragment,n)},m(n,i){pe(e,n,i),s=!0},p(n,i){const o={};i&1&&(o.size=n[0]),i&2&&(o.text=n[1]),e.$set(o)},i(n){s||(R(e.$$.fragment,n),s=!0)},o(n){J(e.$$.fragment,n),s=!1},d(n){me(e,n)}}}function ie(t){let e,s=t[5]+"",n,i,o,v,y,c=Z(t[6]),l=[];for(let r=0;r<c.length;r+=1)l[r]=re(oe(t,c,r));const m=r=>J(l[r],1,1,()=>{l[r]=null});return{c(){e=C("h2"),n=H(s),i=S(),o=C("section");for(let r=0;r<l.length;r+=1)l[r].c();v=S(),this.h()},l(r){e=x(r,"H2",{});var a=L(e);n=O(a,s),a.forEach(k),i=M(r),o=x(r,"SECTION",{class:!0});var p=L(o);for(let g=0;g<l.length;g+=1)l[g].l(p);v=M(p),p.forEach(k),this.h()},h(){E(o,"class","svelte-1lzc8ku")},m(r,a){F(r,e,a),h(e,n),F(r,i,a),F(r,o,a);for(let p=0;p<l.length;p+=1)l[p]&&l[p].m(o,null);h(o,v),y=!0},p(r,a){if(a&7){c=Z(r[6]);let p;for(p=0;p<c.length;p+=1){const g=oe(r,c,p);l[p]?(l[p].p(g,a),R(l[p],1)):(l[p]=re(g),l[p].c(),R(l[p],1),l[p].m(o,v))}for(ce(),p=c.length;p<l.length;p+=1)m(p);ue()}},i(r){if(!y){for(let a=0;a<c.length;a+=1)R(l[a]);y=!0}},o(r){l=l.filter(Boolean);for(let a=0;a<l.length;a+=1)J(l[a]);y=!1},d(r){r&&(k(e),k(i),k(o)),fe(l,r)}}}function je(t){let e,s,n="Hosted Fonts on The Pudding",i,o,v="<em>Do not use fonts hosted by The Pudding without written permission.</em>",y,c,l,m,r,a,p,g,B,N,D="text sample",T,w,j,z,P,U,W,b=Z(t[2]),f=[];for(let u=0;u<b.length;u+=1)f[u]=ie(le(t,b,u));const I=u=>J(f[u],1,1,()=>{f[u]=null});return{c(){e=C("div"),s=C("h1"),s.textContent=n,i=S(),o=C("p"),o.innerHTML=v,y=S(),c=C("form"),l=C("label"),m=H("font-size: "),r=H(t[0]),a=H("px"),p=S(),g=C("input"),B=S(),N=C("label"),N.textContent=D,T=S(),w=C("input"),j=S(),z=C("article");for(let u=0;u<f.length;u+=1)f[u].c();this.h()},l(u){e=x(u,"DIV",{id:!0,class:!0});var _=L(e);s=x(_,"H1",{"data-svelte-h":!0}),G(s)!=="svelte-1m2hcwq"&&(s.textContent=n),i=M(_),o=x(_,"P",{"data-svelte-h":!0}),G(o)!=="svelte-895ja5"&&(o.innerHTML=v),y=M(_),c=x(_,"FORM",{});var d=L(c);l=x(d,"LABEL",{for:!0,class:!0});var A=L(l);m=O(A,"font-size: "),r=O(A,t[0]),a=O(A,"px"),A.forEach(k),p=M(d),g=x(d,"INPUT",{id:!0,type:!0,min:!0,max:!0}),B=M(d),N=x(d,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),G(N)!=="svelte-16zo6eo"&&(N.textContent=D),T=M(d),w=x(d,"INPUT",{id:!0,type:!0,maxlength:!0}),d.forEach(k),_.forEach(k),j=M(u),z=x(u,"ARTICLE",{class:!0});var q=L(z);for(let V=0;V<f.length;V+=1)f[V].l(q);q.forEach(k),this.h()},h(){E(l,"for","size"),E(l,"class","svelte-1lzc8ku"),E(g,"id","size"),E(g,"type","range"),E(g,"min","12"),E(g,"max","48"),E(N,"for","text"),E(N,"class","svelte-1lzc8ku"),E(w,"id","text"),E(w,"type","text"),E(w,"maxlength","100"),E(e,"id","info"),E(e,"class","svelte-1lzc8ku"),E(z,"class","svelte-1lzc8ku")},m(u,_){F(u,e,_),h(e,s),h(e,i),h(e,o),h(e,y),h(e,c),h(c,l),h(l,m),h(l,r),h(l,a),h(c,p),h(c,g),X(g,t[0]),h(c,B),h(c,N),h(c,T),h(c,w),X(w,t[1]),F(u,j,_),F(u,z,_);for(let d=0;d<f.length;d+=1)f[d]&&f[d].m(z,null);P=!0,U||(W=[Q(g,"change",t[3]),Q(g,"input",t[3]),Q(w,"input",t[4])],U=!0)},p(u,[_]){if((!P||_&1)&&Y(r,u[0]),_&1&&X(g,u[0]),_&2&&w.value!==u[1]&&X(w,u[1]),_&7){b=Z(u[2]);let d;for(d=0;d<b.length;d+=1){const A=le(u,b,d);f[d]?(f[d].p(A,_),R(f[d],1)):(f[d]=ie(A),f[d].c(),R(f[d],1),f[d].m(z,null))}for(ce(),d=b.length;d<f.length;d+=1)I(d);ue()}},i(u){if(!P){for(let _=0;_<b.length;_+=1)R(f[_]);P=!0}},o(u){f=f.filter(Boolean);for(let _=0;_<f.length;_+=1)J(f[_]);P=!1},d(u){u&&(k(e),k(j),k(z)),fe(f,u),U=!1,ae(W)}}}function Be(t,e,s){let n=18,i="The quick brown fox jumps over the lazy dog.";const o=Le(De,c=>c.type);o.sort((c,l)=>ke(c[1].length,l[1].length));function v(){n=Ee(this.value),s(0,n)}function y(){i=this.value,s(1,i)}return[n,i,o,v,y]}class He extends te{constructor(e){super(),ne(this,e,Be,je,ee,{})}}function Oe(t){let e,s;return e=new He({}),{c(){de(e.$$.fragment)},l(n){he(e.$$.fragment,n)},m(n,i){pe(e,n,i),s=!0},p:$,i(n){s||(R(e.$$.fragment,n),s=!0)},o(n){J(e.$$.fragment,n),s=!1},d(n){me(e,n)}}}class Je extends te{constructor(e){super(),ne(this,e,null,Oe,ee,{})}}export{Je as component};