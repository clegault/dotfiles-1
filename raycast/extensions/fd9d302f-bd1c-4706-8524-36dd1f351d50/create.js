"use strict";var I=Object.create;var s=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var F=(t,o)=>{for(var e in o)s(t,e,{get:o[e],enumerable:!0})},d=(t,o,e,a)=>{if(o&&typeof o=="object"||typeof o=="function")for(let c of A(o))!x.call(t,c)&&c!==e&&s(t,c,{get:()=>o[c],enumerable:!(a=g(o,c))||a.enumerable});return t};var v=(t,o,e)=>(e=t!=null?I(w(t)):{},d(o||!t||!t.__esModule?s(e,"default",{value:t,enumerable:!0}):e,t)),y=t=>d(s({},"__esModule",{value:!0}),t);var T={};F(T,{default:()=>C});module.exports=y(T);var n=require("@raycast/api");var m=v(require("crypto"),1);var u="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var H=128,l,r,P=t=>{!l||l.length<t?(l=Buffer.allocUnsafe(t*H),m.default.randomFillSync(l),r=0):r+t>l.length&&(m.default.randomFillSync(l),r=0),r+=t};var S=(t=21)=>{P(t-=0);let o="";for(let e=r-t;e<r;e++)o+=u[l[e]&63];return o};var p=require("@raycast/api");async function f(){let{connections:t}=await p.LocalStorage.allItems();return t?JSON.parse(t):[]}async function h(t){await p.LocalStorage.setItem("connections",JSON.stringify(t))}var i=require("react/jsx-runtime");function C(){let{pop:t}=(0,n.useNavigation)();async function o(e){let a=await f();a.push({...e,id:S()}),await h(a),await(0,n.showHUD)("Saved connection \u2705"),t()}return(0,i.jsxs)(n.Form,{actions:(0,i.jsx)(n.ActionPanel,{children:(0,i.jsx)(n.Action.SubmitForm,{title:"Save",onSubmit:e=>o(e)})}),children:[(0,i.jsx)(n.Form.TextField,{id:"name",title:"Connection Name"}),(0,i.jsx)(n.Form.TextField,{id:"address",title:"Server Address",placeholder:"A resolvable DNS name or IP"}),(0,i.jsx)(n.Form.TextField,{id:"user",title:"Username",placeholder:"A username to authenticate with"}),(0,i.jsx)(n.Form.TextField,{id:"port",title:"Port (optional)",placeholder:"An optional custom port (other than 22)"}),(0,i.jsx)(n.Form.TextField,{id:"sshKey",title:"SSH Key Location (optional)",placeholder:"An optional key path to authenticate with"})]})}0&&(module.exports={});
