import{r as C}from"./index.e-hxllCb.js";var b=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function M(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var _="Expected a function",I=NaN,$="[object Symbol]",F=/^\s+|\s+$/g,N=/^[-+]0x[0-9a-f]+$/i,R=/^0b[01]+$/i,z=/^0o[0-7]+$/i,A=parseInt,B=typeof b=="object"&&b&&b.Object===Object&&b,H=typeof self=="object"&&self&&self.Object===Object&&self,P=B||H||Function("return this")(),D=Object.prototype,G=D.toString,V=Math.max,U=Math.min,v=function(){return P.Date.now()};function X(e,t,i){var a,c,m,s,r,f,u=0,w=!1,d=!1,p=!0;if(typeof e!="function")throw new TypeError(_);t=S(t)||0,j(i)&&(w=!!i.leading,d="maxWait"in i,m=d?V(S(i.maxWait)||0,t):m,p="trailing"in i?!!i.trailing:p);function h(n){var o=a,l=c;return a=c=void 0,u=n,s=e.apply(l,o),s}function x(n){return u=n,r=setTimeout(g,t),w?h(n):s}function k(n){var o=n-f,l=n-u,E=t-o;return d?U(E,m-l):E}function T(n){var o=n-f,l=n-u;return f===void 0||o>=t||o<0||d&&l>=m}function g(){var n=v();if(T(n))return O(n);r=setTimeout(g,k(n))}function O(n){return r=void 0,p&&a?h(n):(a=c=void 0,s)}function L(){r!==void 0&&clearTimeout(r),u=0,a=f=c=r=void 0}function W(){return r===void 0?s:O(v())}function y(){var n=v(),o=T(n);if(a=arguments,c=this,f=n,o){if(r===void 0)return x(f);if(d)return r=setTimeout(g,t),h(f)}return r===void 0&&(r=setTimeout(g,t)),s}return y.cancel=L,y.flush=W,y}function j(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function q(e){return!!e&&typeof e=="object"}function J(e){return typeof e=="symbol"||q(e)&&G.call(e)==$}function S(e){if(typeof e=="number")return e;if(J(e))return I;if(j(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=j(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(F,"");var i=R.test(e);return i||z.test(e)?A(e.slice(2),i?2:8):N.test(e)?I:+e}var K=X;const Q=M(K),Y=()=>window?.visualViewport?.width||document.documentElement.clientWidth,Z=()=>window?.visualViewport?.height||document.documentElement.clientHeight,te=C({width:0,height:0},e=>{const t=()=>e({width:Y(),height:Z()});return t(),window.addEventListener("resize",Q(t,250)),()=>{window.removeEventListener("resize",t)}});export{b as c,M as g,te as v};