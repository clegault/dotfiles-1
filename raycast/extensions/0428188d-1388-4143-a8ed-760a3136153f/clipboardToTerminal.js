"use strict";var fn=Object.create;var j=Object.defineProperty;var pn=Object.getOwnPropertyDescriptor;var mn=Object.getOwnPropertyNames;var hn=Object.getPrototypeOf,Sn=Object.prototype.hasOwnProperty;var c=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),yn=(e,t)=>{for(var r in t)j(e,r,{get:t[r],enumerable:!0})},ve=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of mn(t))!Sn.call(e,s)&&s!==r&&j(e,s,{get:()=>t[s],enumerable:!(n=pn(t,s))||n.enumerable});return e};var Ee=(e,t,r)=>(r=e!=null?fn(hn(e)):{},ve(t||!e||!e.__esModule?j(r,"default",{value:e,enumerable:!0}):r,e)),gn=e=>ve(j({},"__esModule",{value:!0}),e);var Ce=c((hs,Ge)=>{Ge.exports=Pe;Pe.sync=wn;var Ie=require("fs");function xn(e,t){var r=t.pathExt!==void 0?t.pathExt:process.env.PATHEXT;if(!r||(r=r.split(";"),r.indexOf("")!==-1))return!0;for(var n=0;n<r.length;n++){var s=r[n].toLowerCase();if(s&&e.substr(-s.length).toLowerCase()===s)return!0}return!1}function Te(e,t,r){return!e.isSymbolicLink()&&!e.isFile()?!1:xn(t,r)}function Pe(e,t,r){Ie.stat(e,function(n,s){r(n,n?!1:Te(s,e,t))})}function wn(e,t){return Te(Ie.statSync(e),e,t)}});var Ne=c((Ss,qe)=>{qe.exports=Oe;Oe.sync=bn;var Ae=require("fs");function Oe(e,t,r){Ae.stat(e,function(n,s){r(n,n?!1:Re(s,t))})}function bn(e,t){return Re(Ae.statSync(e),t)}function Re(e,t){return e.isFile()&&vn(e,t)}function vn(e,t){var r=e.mode,n=e.uid,s=e.gid,o=t.uid!==void 0?t.uid:process.getuid&&process.getuid(),i=t.gid!==void 0?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),u=parseInt("010",8),l=parseInt("001",8),f=a|u,h=r&l||r&u&&s===i||r&a&&n===o||r&f&&o===0;return h}});var Le=c((gs,ke)=>{var ys=require("fs"),M;process.platform==="win32"||global.TESTING_WINDOWS?M=Ce():M=Ne();ke.exports=J;J.sync=En;function J(e,t,r){if(typeof t=="function"&&(r=t,t={}),!r){if(typeof Promise!="function")throw new TypeError("callback not provided");return new Promise(function(n,s){J(e,t||{},function(o,i){o?s(o):n(i)})})}M(e,t||{},function(n,s){n&&(n.code==="EACCES"||t&&t.ignoreErrors)&&(n=null,s=!1),r(n,s)})}function En(e,t){try{return M.sync(e,t||{})}catch(r){if(t&&t.ignoreErrors||r.code==="EACCES")return!1;throw r}}});var Ue=c((xs,Fe)=>{var I=process.platform==="win32"||process.env.OSTYPE==="cygwin"||process.env.OSTYPE==="msys",_e=require("path"),In=I?";":":",$e=Le(),Be=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),je=(e,t)=>{let r=t.colon||In,n=e.match(/\//)||I&&e.match(/\\/)?[""]:[...I?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(r)],s=I?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",o=I?s.split(r):[""];return I&&e.indexOf(".")!==-1&&o[0]!==""&&o.unshift(""),{pathEnv:n,pathExt:o,pathExtExe:s}},Me=(e,t,r)=>{typeof t=="function"&&(r=t,t={}),t||(t={});let{pathEnv:n,pathExt:s,pathExtExe:o}=je(e,t),i=[],a=l=>new Promise((f,h)=>{if(l===n.length)return t.all&&i.length?f(i):h(Be(e));let m=n[l],S=/^".*"$/.test(m)?m.slice(1,-1):m,y=_e.join(S,e),g=!S&&/^\.[\\\/]/.test(e)?e.slice(0,2)+y:y;f(u(g,l,0))}),u=(l,f,h)=>new Promise((m,S)=>{if(h===s.length)return m(a(f+1));let y=s[h];$e(l+y,{pathExt:o},(g,E)=>{if(!g&&E)if(t.all)i.push(l+y);else return m(l+y);return m(u(l,f,h+1))})});return r?a(0).then(l=>r(null,l),r):a(0)},Tn=(e,t)=>{t=t||{};let{pathEnv:r,pathExt:n,pathExtExe:s}=je(e,t),o=[];for(let i=0;i<r.length;i++){let a=r[i],u=/^".*"$/.test(a)?a.slice(1,-1):a,l=_e.join(u,e),f=!u&&/^\.[\\\/]/.test(e)?e.slice(0,2)+l:l;for(let h=0;h<n.length;h++){let m=f+n[h];try{if($e.sync(m,{pathExt:s}))if(t.all)o.push(m);else return m}catch{}}}if(t.all&&o.length)return o;if(t.nothrow)return null;throw Be(e)};Fe.exports=Me;Me.sync=Tn});var te=c((ws,ee)=>{"use strict";var De=(e={})=>{let t=e.env||process.env;return(e.platform||process.platform)!=="win32"?"PATH":Object.keys(t).reverse().find(n=>n.toUpperCase()==="PATH")||"Path"};ee.exports=De;ee.exports.default=De});var We=c((bs,Ke)=>{"use strict";var Xe=require("path"),Pn=Ue(),Gn=te();function He(e,t){let r=e.options.env||process.env,n=process.cwd(),s=e.options.cwd!=null,o=s&&process.chdir!==void 0&&!process.chdir.disabled;if(o)try{process.chdir(e.options.cwd)}catch{}let i;try{i=Pn.sync(e.command,{path:r[Gn({env:r})],pathExt:t?Xe.delimiter:void 0})}catch{}finally{o&&process.chdir(n)}return i&&(i=Xe.resolve(s?e.options.cwd:"",i)),i}function Cn(e){return He(e)||He(e,!0)}Ke.exports=Cn});var ze=c((vs,re)=>{"use strict";var ne=/([()\][%!^"`<>&|;, *?])/g;function An(e){return e=e.replace(ne,"^$1"),e}function On(e,t){return e=`${e}`,e=e.replace(/(\\*)"/g,'$1$1\\"'),e=e.replace(/(\\*)$/,"$1$1"),e=`"${e}"`,e=e.replace(ne,"^$1"),t&&(e=e.replace(ne,"^$1")),e}re.exports.command=An;re.exports.argument=On});var Ye=c((Es,Ve)=>{"use strict";Ve.exports=/^#!(.*)/});var Ze=c((Is,Qe)=>{"use strict";var Rn=Ye();Qe.exports=(e="")=>{let t=e.match(Rn);if(!t)return null;let[r,n]=t[0].replace(/#! ?/,"").split(" "),s=r.split("/").pop();return s==="env"?n:n?`${s} ${n}`:s}});var et=c((Ts,Je)=>{"use strict";var se=require("fs"),qn=Ze();function Nn(e){let r=Buffer.alloc(150),n;try{n=se.openSync(e,"r"),se.readSync(n,r,0,150,0),se.closeSync(n)}catch{}return qn(r.toString())}Je.exports=Nn});var st=c((Ps,rt)=>{"use strict";var kn=require("path"),tt=We(),nt=ze(),Ln=et(),_n=process.platform==="win32",$n=/\.(?:com|exe)$/i,Bn=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function jn(e){e.file=tt(e);let t=e.file&&Ln(e.file);return t?(e.args.unshift(e.file),e.command=t,tt(e)):e.file}function Mn(e){if(!_n)return e;let t=jn(e),r=!$n.test(t);if(e.options.forceShell||r){let n=Bn.test(t);e.command=kn.normalize(e.command),e.command=nt.command(e.command),e.args=e.args.map(o=>nt.argument(o,n));let s=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${s}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}function Fn(e,t,r){t&&!Array.isArray(t)&&(r=t,t=null),t=t?t.slice(0):[],r=Object.assign({},r);let n={command:e,args:t,options:r,file:void 0,original:{command:e,args:t}};return r.shell?n:Mn(n)}rt.exports=Fn});var at=c((Gs,it)=>{"use strict";var oe=process.platform==="win32";function ie(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function Un(e,t){if(!oe)return;let r=e.emit;e.emit=function(n,s){if(n==="exit"){let o=ot(s,t,"spawn");if(o)return r.call(e,"error",o)}return r.apply(e,arguments)}}function ot(e,t){return oe&&e===1&&!t.file?ie(t.original,"spawn"):null}function Dn(e,t){return oe&&e===1&&!t.file?ie(t.original,"spawnSync"):null}it.exports={hookChildProcess:Un,verifyENOENT:ot,verifyENOENTSync:Dn,notFoundError:ie}});var lt=c((Cs,T)=>{"use strict";var ct=require("child_process"),ae=st(),ce=at();function ut(e,t,r){let n=ae(e,t,r),s=ct.spawn(n.command,n.args,n.options);return ce.hookChildProcess(s,n),s}function Xn(e,t,r){let n=ae(e,t,r),s=ct.spawnSync(n.command,n.args,n.options);return s.error=s.error||ce.verifyENOENTSync(s.status,n),s}T.exports=ut;T.exports.spawn=ut;T.exports.sync=Xn;T.exports._parse=ae;T.exports._enoent=ce});var ft=c((As,dt)=>{"use strict";dt.exports=e=>{let t=typeof e=="string"?`
`:`
`.charCodeAt(),r=typeof e=="string"?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===r&&(e=e.slice(0,e.length-1)),e}});var ht=c((Os,N)=>{"use strict";var q=require("path"),pt=te(),mt=e=>{e={cwd:process.cwd(),path:process.env[pt()],execPath:process.execPath,...e};let t,r=q.resolve(e.cwd),n=[];for(;t!==r;)n.push(q.join(r,"node_modules/.bin")),t=r,r=q.resolve(r,"..");let s=q.resolve(e.cwd,e.execPath,"..");return n.push(s),n.concat(e.path).join(q.delimiter)};N.exports=mt;N.exports.default=mt;N.exports.env=e=>{e={env:process.env,...e};let t={...e.env},r=pt({env:t});return e.path=t[r],t[r]=N.exports(e),t}});var yt=c((Rs,ue)=>{"use strict";var St=(e,t)=>{for(let r of Reflect.ownKeys(t))Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));return e};ue.exports=St;ue.exports.default=St});var xt=c((qs,U)=>{"use strict";var Hn=yt(),F=new WeakMap,gt=(e,t={})=>{if(typeof e!="function")throw new TypeError("Expected a function");let r,n=0,s=e.displayName||e.name||"<anonymous>",o=function(...i){if(F.set(o,++n),n===1)r=e.apply(this,i),e=null;else if(t.throw===!0)throw new Error(`Function \`${s}\` can only be called once`);return r};return Hn(o,e),F.set(o,n),o};U.exports=gt;U.exports.default=gt;U.exports.callCount=e=>{if(!F.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return F.get(e)}});var wt=c(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});D.SIGNALS=void 0;var Kn=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];D.SIGNALS=Kn});var le=c(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.SIGRTMAX=P.getRealtimeSignals=void 0;var Wn=function(){let e=vt-bt+1;return Array.from({length:e},zn)};P.getRealtimeSignals=Wn;var zn=function(e,t){return{name:`SIGRT${t+1}`,number:bt+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},bt=34,vt=64;P.SIGRTMAX=vt});var Et=c(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.getSignals=void 0;var Vn=require("os"),Yn=wt(),Qn=le(),Zn=function(){let e=(0,Qn.getRealtimeSignals)();return[...Yn.SIGNALS,...e].map(Jn)};X.getSignals=Zn;var Jn=function({name:e,number:t,description:r,action:n,forced:s=!1,standard:o}){let{signals:{[e]:i}}=Vn.constants,a=i!==void 0;return{name:e,number:a?i:t,description:r,supported:a,action:n,forced:s,standard:o}}});var Tt=c(G=>{"use strict";Object.defineProperty(G,"__esModule",{value:!0});G.signalsByNumber=G.signalsByName=void 0;var er=require("os"),It=Et(),tr=le(),nr=function(){return(0,It.getSignals)().reduce(rr,{})},rr=function(e,{name:t,number:r,description:n,supported:s,action:o,forced:i,standard:a}){return{...e,[t]:{name:t,number:r,description:n,supported:s,action:o,forced:i,standard:a}}},sr=nr();G.signalsByName=sr;var or=function(){let e=(0,It.getSignals)(),t=tr.SIGRTMAX+1,r=Array.from({length:t},(n,s)=>ir(s,e));return Object.assign({},...r)},ir=function(e,t){let r=ar(e,t);if(r===void 0)return{};let{name:n,description:s,supported:o,action:i,forced:a,standard:u}=r;return{[e]:{name:n,number:e,description:s,supported:o,action:i,forced:a,standard:u}}},ar=function(e,t){let r=t.find(({name:n})=>er.constants.signals[n]===e);return r!==void 0?r:t.find(n=>n.number===e)},cr=or();G.signalsByNumber=cr});var Gt=c(($s,Pt)=>{"use strict";var{signalsByName:ur}=Tt(),lr=({timedOut:e,timeout:t,errorCode:r,signal:n,signalDescription:s,exitCode:o,isCanceled:i})=>e?`timed out after ${t} milliseconds`:i?"was canceled":r!==void 0?`failed with ${r}`:n!==void 0?`was killed with ${n} (${s})`:o!==void 0?`failed with exit code ${o}`:"failed",dr=({stdout:e,stderr:t,all:r,error:n,signal:s,exitCode:o,command:i,escapedCommand:a,timedOut:u,isCanceled:l,killed:f,parsed:{options:{timeout:h}}})=>{o=o===null?void 0:o,s=s===null?void 0:s;let m=s===void 0?void 0:ur[s].description,S=n&&n.code,g=`Command ${lr({timedOut:u,timeout:h,errorCode:S,signal:s,signalDescription:m,exitCode:o,isCanceled:l})}: ${i}`,E=Object.prototype.toString.call(n)==="[object Error]",$=E?`${g}
${n.message}`:g,B=[$,t,e].filter(Boolean).join(`
`);return E?(n.originalMessage=n.message,n.message=B):n=new Error(B),n.shortMessage=$,n.command=i,n.escapedCommand=a,n.exitCode=o,n.signal=s,n.signalDescription=m,n.stdout=e,n.stderr=t,r!==void 0&&(n.all=r),"bufferedData"in n&&delete n.bufferedData,n.failed=!0,n.timedOut=Boolean(u),n.isCanceled=l,n.killed=f&&!u,n};Pt.exports=dr});var At=c((Bs,de)=>{"use strict";var H=["stdin","stdout","stderr"],fr=e=>H.some(t=>e[t]!==void 0),Ct=e=>{if(!e)return;let{stdio:t}=e;if(t===void 0)return H.map(n=>e[n]);if(fr(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${H.map(n=>`\`${n}\``).join(", ")}`);if(typeof t=="string")return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let r=Math.max(t.length,H.length);return Array.from({length:r},(n,s)=>t[s])};de.exports=Ct;de.exports.node=e=>{let t=Ct(e);return t==="ipc"?"ipc":t===void 0||typeof t=="string"?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]}});var Ot=c((js,K)=>{K.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];process.platform!=="win32"&&K.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT");process.platform==="linux"&&K.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")});var Lt=c((Ms,O)=>{var d=global.process,b=function(e){return e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function"};b(d)?(Rt=require("assert"),C=Ot(),qt=/^win/i.test(d.platform),k=require("events"),typeof k!="function"&&(k=k.EventEmitter),d.__signal_exit_emitter__?p=d.__signal_exit_emitter__:(p=d.__signal_exit_emitter__=new k,p.count=0,p.emitted={}),p.infinite||(p.setMaxListeners(1/0),p.infinite=!0),O.exports=function(e,t){if(!!b(global.process)){Rt.equal(typeof e,"function","a callback must be provided for exit handler"),A===!1&&fe();var r="exit";t&&t.alwaysLast&&(r="afterexit");var n=function(){p.removeListener(r,e),p.listeners("exit").length===0&&p.listeners("afterexit").length===0&&W()};return p.on(r,e),n}},W=function(){!A||!b(global.process)||(A=!1,C.forEach(function(t){try{d.removeListener(t,z[t])}catch{}}),d.emit=V,d.reallyExit=pe,p.count-=1)},O.exports.unload=W,v=function(t,r,n){p.emitted[t]||(p.emitted[t]=!0,p.emit(t,r,n))},z={},C.forEach(function(e){z[e]=function(){if(!!b(global.process)){var r=d.listeners(e);r.length===p.count&&(W(),v("exit",null,e),v("afterexit",null,e),qt&&e==="SIGHUP"&&(e="SIGINT"),d.kill(d.pid,e))}}}),O.exports.signals=function(){return C},A=!1,fe=function(){A||!b(global.process)||(A=!0,p.count+=1,C=C.filter(function(t){try{return d.on(t,z[t]),!0}catch{return!1}}),d.emit=kt,d.reallyExit=Nt)},O.exports.load=fe,pe=d.reallyExit,Nt=function(t){!b(global.process)||(d.exitCode=t||0,v("exit",d.exitCode,null),v("afterexit",d.exitCode,null),pe.call(d,d.exitCode))},V=d.emit,kt=function(t,r){if(t==="exit"&&b(global.process)){r!==void 0&&(d.exitCode=r);var n=V.apply(this,arguments);return v("exit",d.exitCode,null),v("afterexit",d.exitCode,null),n}else return V.apply(this,arguments)}):O.exports=function(){};var Rt,C,qt,k,p,W,v,z,A,fe,pe,Nt,V,kt});var $t=c((Fs,_t)=>{"use strict";var pr=require("os"),mr=Lt(),hr=1e3*5,Sr=(e,t="SIGTERM",r={})=>{let n=e(t);return yr(e,t,r,n),n},yr=(e,t,r,n)=>{if(!gr(t,r,n))return;let s=wr(r),o=setTimeout(()=>{e("SIGKILL")},s);o.unref&&o.unref()},gr=(e,{forceKillAfterTimeout:t},r)=>xr(e)&&t!==!1&&r,xr=e=>e===pr.constants.signals.SIGTERM||typeof e=="string"&&e.toUpperCase()==="SIGTERM",wr=({forceKillAfterTimeout:e=!0})=>{if(e===!0)return hr;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e},br=(e,t)=>{e.kill()&&(t.isCanceled=!0)},vr=(e,t,r)=>{e.kill(t),r(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))},Er=(e,{timeout:t,killSignal:r="SIGTERM"},n)=>{if(t===0||t===void 0)return n;let s,o=new Promise((a,u)=>{s=setTimeout(()=>{vr(e,r,u)},t)}),i=n.finally(()=>{clearTimeout(s)});return Promise.race([o,i])},Ir=({timeout:e})=>{if(e!==void 0&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},Tr=async(e,{cleanup:t,detached:r},n)=>{if(!t||r)return n;let s=mr(()=>{e.kill()});return n.finally(()=>{s()})};_t.exports={spawnedKill:Sr,spawnedCancel:br,setupTimeout:Er,validateTimeout:Ir,setExitHandler:Tr}});var jt=c((Us,Bt)=>{"use strict";var x=e=>e!==null&&typeof e=="object"&&typeof e.pipe=="function";x.writable=e=>x(e)&&e.writable!==!1&&typeof e._write=="function"&&typeof e._writableState=="object";x.readable=e=>x(e)&&e.readable!==!1&&typeof e._read=="function"&&typeof e._readableState=="object";x.duplex=e=>x.writable(e)&&x.readable(e);x.transform=e=>x.duplex(e)&&typeof e._transform=="function";Bt.exports=x});var Ft=c((Ds,Mt)=>{"use strict";var{PassThrough:Pr}=require("stream");Mt.exports=e=>{e={...e};let{array:t}=e,{encoding:r}=e,n=r==="buffer",s=!1;t?s=!(r||n):r=r||"utf8",n&&(r=null);let o=new Pr({objectMode:s});r&&o.setEncoding(r);let i=0,a=[];return o.on("data",u=>{a.push(u),s?i=a.length:i+=u.length}),o.getBufferedValue=()=>t?a:n?Buffer.concat(a,i):a.join(""),o.getBufferedLength=()=>i,o}});var Ut=c((Xs,L)=>{"use strict";var{constants:Gr}=require("buffer"),Cr=require("stream"),{promisify:Ar}=require("util"),Or=Ft(),Rr=Ar(Cr.pipeline),Y=class extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}};async function me(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:r}=t,n=Or(t);return await new Promise((s,o)=>{let i=a=>{a&&n.getBufferedLength()<=Gr.MAX_LENGTH&&(a.bufferedData=n.getBufferedValue()),o(a)};(async()=>{try{await Rr(e,n),s()}catch(a){i(a)}})(),n.on("data",()=>{n.getBufferedLength()>r&&i(new Y)})}),n.getBufferedValue()}L.exports=me;L.exports.buffer=(e,t)=>me(e,{...t,encoding:"buffer"});L.exports.array=(e,t)=>me(e,{...t,array:!0});L.exports.MaxBufferError=Y});var Xt=c((Hs,Dt)=>{"use strict";var{PassThrough:qr}=require("stream");Dt.exports=function(){var e=[],t=new qr({objectMode:!0});return t.setMaxListeners(0),t.add=r,t.isEmpty=n,t.on("unpipe",s),Array.prototype.slice.call(arguments).forEach(r),t;function r(o){return Array.isArray(o)?(o.forEach(r),this):(e.push(o),o.once("end",s.bind(null,o)),o.once("error",t.emit.bind(t,"error")),o.pipe(t,{end:!1}),this)}function n(){return e.length==0}function s(o){e=e.filter(function(i){return i!==o}),!e.length&&t.readable&&t.end()}}});var zt=c((Ks,Wt)=>{"use strict";var Kt=jt(),Ht=Ut(),Nr=Xt(),kr=(e,t)=>{t===void 0||e.stdin===void 0||(Kt(t)?t.pipe(e.stdin):e.stdin.end(t))},Lr=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let r=Nr();return e.stdout&&r.add(e.stdout),e.stderr&&r.add(e.stderr),r},he=async(e,t)=>{if(!!e){e.destroy();try{return await t}catch(r){return r.bufferedData}}},Se=(e,{encoding:t,buffer:r,maxBuffer:n})=>{if(!(!e||!r))return t?Ht(e,{encoding:t,maxBuffer:n}):Ht.buffer(e,{maxBuffer:n})},_r=async({stdout:e,stderr:t,all:r},{encoding:n,buffer:s,maxBuffer:o},i)=>{let a=Se(e,{encoding:n,buffer:s,maxBuffer:o}),u=Se(t,{encoding:n,buffer:s,maxBuffer:o}),l=Se(r,{encoding:n,buffer:s,maxBuffer:o*2});try{return await Promise.all([i,a,u,l])}catch(f){return Promise.all([{error:f,signal:f.signal,timedOut:f.timedOut},he(e,a),he(t,u),he(r,l)])}},$r=({input:e})=>{if(Kt(e))throw new TypeError("The `input` option cannot be a stream in sync mode")};Wt.exports={handleInput:kr,makeAllStream:Lr,getSpawnedResult:_r,validateInputSync:$r}});var Yt=c((Ws,Vt)=>{"use strict";var Br=(async()=>{})().constructor.prototype,jr=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(Br,e)]),Mr=(e,t)=>{for(let[r,n]of jr){let s=typeof t=="function"?(...o)=>Reflect.apply(n.value,t(),o):n.value.bind(t);Reflect.defineProperty(e,r,{...n,value:s})}return e},Fr=e=>new Promise((t,r)=>{e.on("exit",(n,s)=>{t({exitCode:n,signal:s})}),e.on("error",n=>{r(n)}),e.stdin&&e.stdin.on("error",n=>{r(n)})});Vt.exports={mergePromise:Mr,getSpawnedPromise:Fr}});var Jt=c((zs,Zt)=>{"use strict";var Qt=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],Ur=/^[\w.-]+$/,Dr=/"/g,Xr=e=>typeof e!="string"||Ur.test(e)?e:`"${e.replace(Dr,'\\"')}"`,Hr=(e,t)=>Qt(e,t).join(" "),Kr=(e,t)=>Qt(e,t).map(r=>Xr(r)).join(" "),Wr=/ +/g,zr=e=>{let t=[];for(let r of e.trim().split(Wr)){let n=t[t.length-1];n&&n.endsWith("\\")?t[t.length-1]=`${n.slice(0,-1)} ${r}`:t.push(r)}return t};Zt.exports={joinCommand:Hr,getEscapedCommand:Kr,parseCommand:zr}});var an=c((Vs,R)=>{"use strict";var Vr=require("path"),ye=require("child_process"),Yr=lt(),Qr=ft(),Zr=ht(),Jr=xt(),Q=Gt(),tn=At(),{spawnedKill:es,spawnedCancel:ts,setupTimeout:ns,validateTimeout:rs,setExitHandler:ss}=$t(),{handleInput:os,getSpawnedResult:is,makeAllStream:as,validateInputSync:cs}=zt(),{mergePromise:en,getSpawnedPromise:us}=Yt(),{joinCommand:nn,parseCommand:rn,getEscapedCommand:sn}=Jt(),ls=1e3*1e3*100,ds=({env:e,extendEnv:t,preferLocal:r,localDir:n,execPath:s})=>{let o=t?{...process.env,...e}:e;return r?Zr.env({env:o,cwd:n,execPath:s}):o},on=(e,t,r={})=>{let n=Yr._parse(e,t,r);return e=n.command,t=n.args,r=n.options,r={maxBuffer:ls,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:r.cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...r},r.env=ds(r),r.stdio=tn(r),process.platform==="win32"&&Vr.basename(e,".exe")==="cmd"&&t.unshift("/q"),{file:e,args:t,options:r,parsed:n}},_=(e,t,r)=>typeof t!="string"&&!Buffer.isBuffer(t)?r===void 0?void 0:"":e.stripFinalNewline?Qr(t):t,Z=(e,t,r)=>{let n=on(e,t,r),s=nn(e,t),o=sn(e,t);rs(n.options);let i;try{i=ye.spawn(n.file,n.args,n.options)}catch(S){let y=new ye.ChildProcess,g=Promise.reject(Q({error:S,stdout:"",stderr:"",all:"",command:s,escapedCommand:o,parsed:n,timedOut:!1,isCanceled:!1,killed:!1}));return en(y,g)}let a=us(i),u=ns(i,n.options,a),l=ss(i,n.options,u),f={isCanceled:!1};i.kill=es.bind(null,i.kill.bind(i)),i.cancel=ts.bind(null,i,f);let m=Jr(async()=>{let[{error:S,exitCode:y,signal:g,timedOut:E},$,B,dn]=await is(i,n.options,l),ge=_(n.options,$),xe=_(n.options,B),we=_(n.options,dn);if(S||y!==0||g!==null){let be=Q({error:S,exitCode:y,signal:g,stdout:ge,stderr:xe,all:we,command:s,escapedCommand:o,parsed:n,timedOut:E,isCanceled:f.isCanceled,killed:i.killed});if(!n.options.reject)return be;throw be}return{command:s,escapedCommand:o,exitCode:0,stdout:ge,stderr:xe,all:we,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}});return os(i,n.options.input),i.all=as(i,n.options),en(i,m)};R.exports=Z;R.exports.sync=(e,t,r)=>{let n=on(e,t,r),s=nn(e,t),o=sn(e,t);cs(n.options);let i;try{i=ye.spawnSync(n.file,n.args,n.options)}catch(l){throw Q({error:l,stdout:"",stderr:"",all:"",command:s,escapedCommand:o,parsed:n,timedOut:!1,isCanceled:!1,killed:!1})}let a=_(n.options,i.stdout,i.error),u=_(n.options,i.stderr,i.error);if(i.error||i.status!==0||i.signal!==null){let l=Q({stdout:a,stderr:u,error:i.error,signal:i.signal,exitCode:i.status,command:s,escapedCommand:o,parsed:n,timedOut:i.error&&i.error.code==="ETIMEDOUT",isCanceled:!1,killed:i.signal!==null});if(!n.options.reject)return l;throw l}return{command:s,escapedCommand:o,exitCode:0,stdout:a,stderr:u,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}};R.exports.command=(e,t)=>{let[r,...n]=rn(e);return Z(r,n,t)};R.exports.commandSync=(e,t)=>{let[r,...n]=rn(e);return Z.sync(r,n,t)};R.exports.node=(e,t,r={})=>{t&&!Array.isArray(t)&&typeof t=="object"&&(r=t,t=[]);let n=tn.node(r),s=process.execArgv.filter(a=>!a.startsWith("--inspect")),{nodePath:o=process.execPath,nodeOptions:i=s}=r;return Z(o,[...i,e,...Array.isArray(t)?t:[]],{...r,stdin:void 0,stdout:void 0,stderr:void 0,stdio:n,shell:!1})}});var ps={};yn(ps,{default:()=>fs});module.exports=gn(ps);var w=require("@raycast/api");var cn=Ee(require("node:process"),1),un=Ee(an(),1);async function ln(e){if(cn.default.platform!=="darwin")throw new Error("macOS only");let{stdout:t}=await(0,un.default)("osascript",["-e",e]);return t}var fs=async()=>{let t=`
      tell application "System Events"
      set pathList to "${await w.Clipboard.readText()}"
      if not (exists (processes where name is "Terminal")) then
          do shell script "open -a Terminal " & pathList
      else
          tell application "Terminal"
          activate
          if (count of windows) is 0 then
              do script ("cd " & pathList)
          else
              tell application "System Events" to tell process "Terminal.app" to keystroke "t" using command down
              delay 1
              do script ("cd " & pathList) in first window
          end if
          end tell
      end if
      end tell
  `;try{let r=await ln(t);await(0,w.showToast)(w.Toast.Style.Success,"Done",r)}catch{await(0,w.showToast)(w.Toast.Style.Failure,"Something went wrong")}};0&&(module.exports={});
