import{t as q,a as z}from"./index.RMAQ7HBv.js";import{r as B}from"./scheduler.p3UhAeA_.js";function F(n){return n?.length!==void 0?n:Array.from(n)}function C(n,f){z(n,1,1,()=>{f.delete(n.key)})}function G(n,f){n.f(),C(n,f)}function H(n,f,M,v,x,y,c,S,m,A,h,j){let i=n.length,o=y.length,a=i;const _={};for(;a--;)_[n[a].key]=a;const d=[],r=new Map,u=new Map,g=[];for(a=o;a--;){const e=j(x,y,a),t=M(e);let s=c.get(t);s?v&&g.push(()=>s.p(e,f)):(s=A(t,e),s.c()),r.set(t,d[a]=s),t in _&&u.set(t,Math.abs(a-_[t]))}const p=new Set,k=new Set;function w(e){q(e,1),e.m(S,h),c.set(e.key,e),h=e.first,o--}for(;i&&o;){const e=d[o-1],t=n[i-1],s=e.key,l=t.key;e===t?(h=e.first,i--,o--):r.has(l)?!c.has(s)||p.has(s)?w(e):k.has(l)?i--:u.get(s)>u.get(l)?(k.add(s),w(e)):(p.add(l),i--):(m(t,c),i--)}for(;i--;){const e=n[i];r.has(e.key)||m(e,c)}for(;o;)w(d[o-1]);return B(g),d}export{F as e,G as f,H as u};
