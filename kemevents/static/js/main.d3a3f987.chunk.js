(this.webpackJsonpkemevents=this.webpackJsonpkemevents||[]).push([[0],{10:function(e,t,a){e.exports=a(17)},17:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),o=a.n(r),s=a(3),i=a.n(s),l=a(6),u=a(5),m=a(21),d=a(19),v=a(20),f=a(7),p=a.n(f),b="210f022b937c167c25c48a5fada123e7d2b785aaed6e106f96a85c5d895e6b48f4aa3d916786b75b74152",h=[116828815,97035114,101563208,127365226,158392471,103762911],g=(a(4),function(){return c.a.createElement("div",{className:"date-break date-break--soon"},"\u041d\u0410 \u042d\u0422\u041e\u0419 \u041d\u0415\u0414\u0415\u041b\u0415")}),k=function(){return c.a.createElement("div",{className:"date-break date-break--not-soon"},"\u041f\u041e\u0417\u0416\u0415")},E=function(e){var t=e.image,a=e.title,n=e.date,r=e.status,o=e.isSoon,s=e.link,i=o?"--soon":"--not-soon";return c.a.createElement("a",{href:"https://vk.com/".concat(s),className:"event-container event-container"+i},c.a.createElement("div",{className:"image-column"},c.a.createElement("img",{className:"event-image",src:t,alt:"logo"})),c.a.createElement("div",{className:"info-column"},c.a.createElement("div",{className:"event-date"},n),c.a.createElement("div",{className:"event-name"},a),c.a.createElement("div",{className:"event-status"},r)))},_=function(e){var t=e.isLoading;return c.a.createElement("div",{className:t?"overlay overlay--loading":"overlay"},c.a.createElement("span",{className:"overlay-logo",role:"img","aria-label":"logo"},"\ud83c\udfad"))},y=(a(16),function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)([]),s=Object(u.a)(o,2),f=s[0],y=s[1],j=Object(n.useState)([]),w=Object(u.a)(j,2),N=w[0],O=w[1];Object(n.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),e.prev=1,e.next=4,p()("https://api.vk.com/method/groups.search?type=event&q=*&country_id=".concat("1","&city_id=").concat("64","&future=").concat("1","&count=").concat("50","&access_token=").concat(b,"&v=").concat("5.58"));case 4:return t=e.sent,e.next=7,t.json();case 7:a=e.sent,console.log(a),y(a.response.items.map((function(e){return e.id}))),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.useEffect)((function(){var e=function(){var e=Object(l.a)(i.a.mark((function e(){var t,a,n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=f.filter((function(e){return!h.includes(e)})),e.next=4,p()((o=t.join(),"https://api.vk.com/method/groups.getById?group_ids=".concat(o,"&fields=").concat("description,age_limits,city,cover,links,members_count,place,public_date_label,start_date,finish_date,status,activity,main_section,public_date_label,site,status","&access_token=").concat(b,"&v=").concat("5.58")));case 4:return a=e.sent,e.next=7,a.json();case 7:n=e.sent,c=n.response.sort((function(e,t){return e.start_date-t.start_date})),O(c),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:return e.prev=15,r(!1),e.finish(15);case 18:case"end":return e.stop()}var o}),e,null,[[0,12,15,18]])})));return function(){return e.apply(this,arguments)}}();f.length&&e()}),[f]);var x=function(e){var t=new Date,a=Object(m.a)(t,1);return!Object(d.a)(Object(v.a)(e),a)};return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"title"},"\u0421\u041e\u0411\u042b\u0422\u0418\u042f"),c.a.createElement(_,{isLoading:a}),c.a.createElement("div",{className:"container"},c.a.createElement(g,null),N.map((function(e,t){return c.a.createElement("div",{key:e.id},c.a.createElement(E,{key:e.id,title:e.name,link:e.screen_name,image:e.photo_200,date:e.activity,status:e.status,isSoon:x(e.start_date)}),N[t+1]&&x(N[t+1].start_date)!==x(e.start_date)?c.a.createElement(k,null):"")}))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},4:function(e,t,a){}},[[10,1,2]]]);
//# sourceMappingURL=main.d3a3f987.chunk.js.map