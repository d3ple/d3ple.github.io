(this["webpackJsonpbtv-uhd-lk"]=this["webpackJsonpbtv-uhd-lk"]||[]).push([[0],{19:function(e,t,a){e.exports=a(54)},42:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(5),o=a.n(c),m=a(2),r=a(24).create({baseURL:"http://new-lk-btv.onekone-dev.x.eltc.ru/api/btv/",headers:{"X-Btv-Api-Key":"WTHXVgw49X4yyr3vmanhaa6daeRtkDp9jvf86TLf"}}),s=(a(42),a(3)),i=a.n(s);i.a.setAppElement("#root");var u={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",color:"black",width:"50%",minHeight:"30%"}},d=function(){var e=Object(n.useState)(null),t=Object(m.a)(e,2),a=t[0],c=t[1];Object(n.useEffect)((function(){return window.addEventListener("keydown",o),function(){return window.removeEventListener("keydown",o)}}),[]);var o=function(e){c(e),console.log(e)},s=Object(n.useRef)(null),d=Object(n.useState)({}),E=Object(m.a)(d,2),b=E[0],f=E[1];Object(n.useEffect)((function(){r.get("info").then((function(e){console.log(e.data),f(e.data)})),s.current.focus()}),[]);var p=Object(n.useState)(null),_=Object(m.a)(p,2),v=_[0],N=_[1],h=Object(n.useState)(!1),w=Object(m.a)(h,2),y=w[0],g=w[1],k=Object(n.useCallback)((function(e){null!==e&&e.focus()}),[]),O=function(){g(!1)},j=Object(n.useState)(!0),C=Object(m.a)(j,2),x=C[0],L=C[1],S=Object(n.useCallback)((function(e){null!==e&&e.focus()}),[]),R=function(){return y||x};return l.a.createElement("main",{className:"content"},l.a.createElement("div",{className:"row row--header"},l.a.createElement("div",{className:"column column--left"},l.a.createElement("span",{className:"profile__info"},"\u0414\u043e\u0433\u043e\u0432\u043e\u0440: ",b.contract_number),l.a.createElement("span",{className:"profile__info"},"\u0411\u0430\u043b\u0430\u043d\u0441: ",b.balance),l.a.createElement("span",{className:"profile__info"},"\u041a\u043b\u0430\u0432\u0438\u0448\u0430: ",a&&a.key+" - "+a.keyCode),l.a.createElement("span",{className:"profile__info"},"\u041e\u0442\u0441\u0440\u043e\u0447\u043a\u0430: ",v?v.message:"\u041d\u0435\u0442")),l.a.createElement("div",{className:"column column--right"},l.a.createElement("span",{className:"profile__title"},"\u041f\u0440\u043e\u0444\u0438\u043b\u044c \u2665"))),l.a.createElement("div",{className:"row row--actions"},l.a.createElement("div",{className:"column column--centered"},l.a.createElement("button",{className:"profile__button ".concat(b.balance<0&&"profile__button--warning"," ").concat(R()&&"disabled"),ref:s,onClick:function(){L(!0)},disabled:R()},"\u041f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0431\u0430\u043b\u0430\u043d\u0441\u0430"),l.a.createElement(i.a,{isOpen:x,style:u,contentLabel:"Example Modal"},l.a.createElement("div",{className:"modal__payment-text"},l.a.createElement("b",null,"\u0427\u0442\u043e\u0431\u044b \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0441\u0447\u0451\u0442:"),l.a.createElement("br",null),"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c\xbb. \u0421\u043b\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u044f\u043c \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u043e\u0439 \u0441\u0438\u0441\u0442\u0435\u043c\u044b."),l.a.createElement("div",{className:"modal__inputs-row"},l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"sum"},"\u0421\u0443\u043c\u043c\u0430 \u043f\u043b\u0430\u0442\u0435\u0436\u0430"),l.a.createElement("input",{id:"sum",type:"number",className:"modal__input"}),l.a.createElement("span",{className:"modal__money-tip"},"\u0440\u0443\u0431."),l.a.createElement("input",{id:"sum",type:"number",className:"modal__input"}),l.a.createElement("span",{className:"modal__money-tip"},"\u043a\u043e\u043f.")),l.a.createElement("div",{className:"modal__autopay-wrap"},l.a.createElement("label",{htmlFor:"auto"},"\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u0432\u0442\u043e\u043f\u043b\u0430\u0442\u0435\u0436"),l.a.createElement("input",{type:"checkbox",id:"auto"}))),l.a.createElement("div",{className:"modal__buttons-row"},l.a.createElement("button",{ref:S,onClick:function(){L(!1)},className:"modal__modal-btn"},"\u041e\u0442\u043c\u0435\u043d\u0430"),l.a.createElement("button",{onClick:function(){r.post("payment",{money:999,enable_autopay:!1}).then((function(e){console.log(e.data)}))},className:"modal__modal-btn"},"\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c"))),l.a.createElement("button",{className:"profile__button ".concat(R()&&"disabled"),onClick:function(){g(!0)},disabled:R()},"\u041e\u0442\u0441\u0440\u043e\u0447\u043a\u0430 \u043f\u043b\u0430\u0442\u0435\u0436\u0430"),l.a.createElement(i.a,{isOpen:y,style:u,contentLabel:"Example Modal"},null!==v?l.a.createElement("div",{className:"modal__response"},v.message):l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"modal__text"},"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u0437\u044f\u0442\u044c \u043e\u0442\u0441\u0440\u043e\u0447\u043a\u0443?"),l.a.createElement("div",{className:"modal__buttons-row"},l.a.createElement("button",{ref:k,onClick:O,className:"modal__modal-btn"},"\u041e\u0442\u043c\u0435\u043d\u0430"),l.a.createElement("button",{onClick:function(){r.post("defer").then((function(e){console.log(e.data),N(e.data),setTimeout((function(){O(),N(null)}),4e3)}))},className:"modal__modal-btn"},"\u0414\u0430"))))),l.a.createElement("div",{className:"column"},l.a.createElement("span",{className:"profile__payment-info"},"\u0415\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u044b\u0439 \u043f\u043b\u0430\u0442\u0435\u0436: 1000.34"),l.a.createElement("table",{className:"profile__payment-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"\u0421\u0443\u043c\u043c\u0430 / \u0440\u0443\u0431"),l.a.createElement("th",null,"\u0423\u0441\u043b\u0443\u0433\u0430"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{align:"middle"},"700"),l.a.createElement("td",null,"\u0410\u0431\u043e\u043d\u0435\u043d\u0442\u0441\u043a\u0430\u044f \u043f\u043b\u0430\u0442\u0430")),l.a.createElement("tr",null,l.a.createElement("td",{align:"middle"},"160"),l.a.createElement("td",null,"\u041f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0443\u0441\u043b\u0443\u0433\u0438 \u0411\u0422\u0412 (\u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430 \u0430\u0431\u043e\u043d\u0435\u043d\u0442\u0430)")),l.a.createElement("tr",null,l.a.createElement("td",{align:"middle"},"700"),l.a.createElement("td",null,"\u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 \u043d\u0430 \u043a\u0430\u043d\u0430\u043b\u044b - \u041f\u0430\u043a\u0435\u0442 \u0414\u0435\u0442\u0441\u043a\u0438\u0439")))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.ddd17419.chunk.js.map