(this.webpackJsonpsimrsbi=this.webpackJsonpsimrsbi||[]).push([[0],{224:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(84),c=a.n(r),s=(a(93),a(25)),o=a(0);var i=function(){return Object(o.jsxs)("div",{className:"h-screen flex flex-col items-center justify-center text-white",children:[Object(o.jsx)("h1",{className:"text-3xl font-bold",children:"Welcome Home"})," ",Object(o.jsx)("br",{}),Object(o.jsxs)("div",{className:"flex flex-row",children:[Object(o.jsx)(s.b,{className:"bg-gray-100 px-3 py-2 text-gray-900 rounded",activeClassName:"active",to:"/auth",children:"Home"}),Object(o.jsx)(s.b,{className:"bg-gray-100 px-3 py-2 text-gray-900 rounded",activeClassName:"active",to:"/dashboard",children:"Dashboard"})]})]})},u=a(6),d=(a(99),a(2)),b=function(){var e=new Date,t="".concat(["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"][e.getDay()],", ").concat(e.getDate()," ").concat(["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][e.getMonth()]," ").concat(e.getFullYear()),a=Object(n.useState)(t),l=Object(d.a)(a,2),r=l[0],c=l[1];return Object(n.useEffect)((function(){var e=setInterval((function(){return c(t)}),1e3);return function(){clearInterval(e)}})),r};var f=function(){return Object(o.jsxs)("nav",{className:"fixed bg-gray-700 top-0 inset-x-0 ",children:[Object(o.jsxs)("div",{className:" px-3 py-2 w-full h-12 flex flex-row justify-between items-center",children:[Object(o.jsx)("div",{className:"w-1/3 flex items-center",children:Object(o.jsx)("div",{className:"text-white text-base font-bold",children:"SIMRS"})}),Object(o.jsx)("div",{className:"w-1/3 flex justify-center items-center",children:Object(o.jsx)("div",{className:"p-1",children:Object(o.jsx)("div",{className:"text-white text-2xl font-bold"})})}),Object(o.jsx)("div",{className:"w-1/3 flex flex-row-reverse items-center",children:Object(o.jsx)("div",{className:"p-1",children:Object(o.jsx)("div",{className:"w-8 h-8 bg-blue-500 rounded-full"})})})]}),Object(o.jsxs)("div",{className:"bg-gray-700 px-3 py-1 w-full h-8 text-white flex flex-row justify-end items-center",children:[Object(o.jsx)("div",{className:"mr-2",children:"".concat(b())}),Object(o.jsx)("button",{class:"bg-gray-600 px-1 flex border border-gray-700 justify-center text-base material-icons-round rounded transition-colors hover:bg-gray-700 hover:border-gray-500 hover:text-white hover:shadow",children:"search"})]})]})},j=a(3),x=a.n(j),h=a(4),p=a(86),m=a.n(p).a.create({baseURL:"http://localhost:2000/api/",headers:{"Content-Type":"application/json",authorization:"Prime eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3VuYW1lIjoiYmlzbWlsbGFoIiwidXNlcl9uYW1lIjoiQWRtIiwiaWF0IjoxNjI3NzY0MDczfQ._3Ts_jvNtgsDBlnOyjMDwKJnapz2KrwK8gPOkKkIq4c"}}),v=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),s=c[0],i=c[1];return Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("keuangan/pendapatan").then((function(e){var t=e.data;i(t.totalavg),l(t.total)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}})),Object(o.jsxs)("div",{className:"h-full w-full flex flex-col",children:[Object(o.jsx)("div",{className:"h-1/2 w-full p-1",children:Object(o.jsxs)("div",{className:"h-full p-1 bg-yellow-500 rounded flex flex-col items-center",children:[Object(o.jsx)("div",{className:"text-sm",children:"Pendapatan total"}),Object(o.jsx)("div",{className:"text-3xl font-bold",children:a})]})}),Object(o.jsx)("div",{className:"h-1/2 w-full p-1",children:Object(o.jsxs)("div",{className:"h-full p-1 bg-red-700 rounded flex flex-col items-center",children:[Object(o.jsx)("div",{className:"text-sm",children:"Pendapatan total rata-rata"}),Object(o.jsx)("div",{className:"text-3xl font-bold",children:s})]})})]})},O=a(5),w=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("keuangan/pendapatanCaraBayar").then((function(e){var t=e.data.result,a=t.map((function(e){return e.name})),n=t.map((function(e){return e.pendapatan}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Pendapatan Berdasarkan Cara Bayar"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:8},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:6},color:"white"}}}}})},g=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("keuangan/pendapatanPerJenis").then((function(e){var t=e.data.result,a=t.map((function(e){return e.jenis})),n=t.map((function(e){return e.pendapatan}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Pendapatan Berdasarkan Jenis"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{color:"white"}}}}})},N=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("keuangan/pendapatanPerUnit").then((function(e){var t=e.data.result,a=t.map((function(e){return e.name})),n=t.map((function(e){return e.pendapatan}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Pendapatan Berdasarkan Unit"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:8},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:6},color:"white"}}}}})},y=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),s=c[0],i=c[1],u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("keuangan/trendPendapatan").then((function(e){var t=e.data.result,a=t.map((function(e){return u[e.bulan-1]})),n=t.map((function(e){return e.total}));l(n),i(a)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var b={labels:s,datasets:[{label:"Rawat Jalan",data:a,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:"rgba(75,192,192,0.2)",borderColor:"#93C5FD"}]};return Object(o.jsx)(O.b,{data:b,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Trend Pendapatan"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{color:"white"}}}}})},k=function(){return Object(o.jsxs)("div",{className:"h-screen w-full pt-20 px-2 pb-2 flex flex-row flex-wrap justify-between",children:[Object(o.jsxs)("div",{className:"w-2/12 h-full flex flex-col",children:[Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:"item 1"})})}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)(v,{})}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:"item 4"})})})]}),Object(o.jsxs)("div",{className:"w-10/12 h-full flex flex-row",children:[Object(o.jsxs)("div",{className:"w-1/3 h-full flex flex-col h-full",children:[Object(o.jsx)("div",{className:"w-full h-1/6 flex flex-col",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex items-center justify-center rounded bg-yellow-500 font-bold",children:"Kondisi Keuangan Belum Mencapai Target"})})}),Object(o.jsxs)("div",{className:"w-full h-5/6 flex flex-col",children:[Object(o.jsx)("div",{className:"w-full h-1/2",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(y,{})})})}),Object(o.jsx)("div",{className:"w-full h-1/2",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:"item 7"})})})]})]}),Object(o.jsxs)("div",{className:"w-1/3 flex flex-col h-full",children:[Object(o.jsx)("div",{className:"h-2/3",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(N,{})})})}),Object(o.jsx)("div",{className:"h-1/3",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(w,{})})})})]}),Object(o.jsxs)("div",{className:"w-1/3 flex flex-col h-full",children:[Object(o.jsx)("div",{className:"h-1/3",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:"item 10"})})}),Object(o.jsx)("div",{className:"h-1/3",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:"item 11"})})}),Object(o.jsx)("div",{className:"h-1/3",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(g,{})})})})]})]})]})},C=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/sepuluhBesarRajal").then((function(e){var t=e.data.result,a=t.map((function(e){return e.icd_code})),n=t.map((function(e){return e.jml}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"10 Besar Penyakit RJ"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{color:"white"}}}}})},I=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/sepuluhBesarRanap").then((function(e){var t=e.data.result,a=t.map((function(e){return e.icd_code})),n=t.map((function(e){return e.jml}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"10 Besar Penyakit RI"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{color:"white"}}}}})},S=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),s=c[0],i=c[1],u=Object(n.useState)(null),b=Object(d.a)(u,2),f=b[0],j=b[1],p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/trendMasukRumahSakit").then((function(e){var t=e.data.kunjunganRJ,a=e.data.kunjunganRI,n=t.map((function(e){return p[e.bulan-1]})),r=t.map((function(e){return e.jml})),c=a.map((function(e){return e.jml}));l(r),i(c),j(n)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var v={labels:f,datasets:[{label:"Rawat Jalan",data:a,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:"rgba(75,192,192,0.2)",borderColor:"#93C5FD"},{label:"Rawat Inap",data:s,fill:!1,borderColor:"#3B82F6"}]};return Object(o.jsx)(O.b,{data:v,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Trend Kunjungan"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{color:"white"}}}}})},A=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/kunjunganRJ").then((function(e){var t=e.data.result,a=t.map((function(e){return e.label})),n=t.map((function(e){return e.jml}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Kunjungan Rawat Jalan"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:4},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:4},color:"white"}}}}})},D=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/kunjunganRI").then((function(e){var t=e.data.result,a=t.map((function(e){return e.label})),n=t.map((function(e){return e.jml}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Kunjungan Rawat Inap"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:4},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:4},color:"white"}}}}})},R=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/kunjunganCaraBayar").then((function(e){var t=e.data.result,a=t.map((function(e){return e.label})),n=t.map((function(e){return e.total}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Kunjungan Cara Bayar"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:8},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:8},color:"white"}}}}})},F=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),s=c[0],i=c[1];return Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/kunjungan").then((function(e){var t=e.data.kunjungan,a=e.data.kunjunganAVG;l(t),i(a)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}})),Object(o.jsxs)("div",{className:"h-full w-full flex flex-col justify-center",children:[Object(o.jsx)("div",{className:"text-center font-bold text-white mb-1",children:"Kunjungan"}),Object(o.jsxs)("div",{className:"flex flex-row",children:[Object(o.jsxs)("div",{className:"w-1/2 flex-col text-2xl text-center font-bold text-white",children:[a,Object(o.jsx)("div",{className:"text-xs font-bold",children:" total"})]}),Object(o.jsxs)("div",{className:"w-1/2 flex-col text-2xl text-center font-bold text-white",children:[s,Object(o.jsx)("div",{className:"text-xs font-bold",children:" rata-rata"})]})]})]})},B=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),s=c[0],i=c[1];return Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/ketersediaanBedNonCovid").then((function(e){var t=e.data.semuaBedTersedia;l(t)}));case 2:return e.next=4,m.get("pelayanan/ketersediaanBedCovid").then((function(e){var t=e.data.semuaBedTersedia;i(t)}));case 4:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}})),Object(o.jsxs)("div",{className:"h-full w-full flex flex-row mt-1",children:[Object(o.jsxs)("div",{className:"w-1/2 flex-col text-2xl text-center font-bold text-white",children:[a,Object(o.jsx)("div",{className:"text-xs font-bold",children:"umum"})]}),Object(o.jsxs)("div",{className:"w-1/2 flex-col text-2xl text-center font-bold text-white",children:[s,Object(o.jsx)("div",{className:"text-xs font-bold",children:"covid"})]})]})},J=function(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/stateCovid").then((function(e){var t=e.data.data;l(t)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}})),Object(o.jsxs)("div",{className:"h-full w-full flex flex-col mt-1",children:[Object(o.jsx)("div",{className:"text-center text-xs text-white",children:"Infectious Disease"}),Object(o.jsx)("div",{className:"text-center font-bold text-sm text-white",children:"Covid-19"}),Object(o.jsxs)("div",{className:"text-center font-bold text-3xl text-white",children:[a," "]})]})},M=function(){var e,t,a,l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=r[1],i=Object(n.useState)(null),u=Object(d.a)(i,2),b=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval(Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("pelayanan/kunjunganKecamatan").then((function(e){var t=e.data.result,a=t.map((function(e){return e.label})),n=t.map((function(e){return e.jml}));s(a),f(n)}));case 2:case"end":return e.stop()}}),e)}))),15e3);return function(){return clearInterval(e)}}));var j={labels:c,datasets:[{data:b,fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(n){var l=n.chart,r=l.ctx,c=l.chartArea;return c?function(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#F59E0B"),a.addColorStop(1,"#FCD34D")),a}(r,c):null}}]};return Object(o.jsx)(O.a,{data:j,options:{indexAxis:"y",plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Kunjungan Berdasarkan Kecamatan"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{ticks:{font:{size:8},color:"white"},gridLines:{display:!1,color:"white"}},y:{ticks:{font:{size:8},color:"white"}}}}})},E=function(){var e,t,a;function n(n,l){var r=l.right-l.left,c=l.bottom-l.top;return null!==a&&e===r&&t===c||(e=r,t=c,(a=n.createLinearGradient(0,l.bottom,0,l.top)).addColorStop(0,"#eaeaea"),a.addColorStop(1,"#FCD34D")),a}var l={labels:[1,3,5],datasets:[{data:[1,3,5],fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(e){var t=e.chart,a=t.ctx,l=t.chartArea;return l?n(a,l):null}},{data:[55,4,6],fill:!0,cubicInterpolationMode:"monotone",backgroundColor:function(e){var t=e.chart,a=t.ctx,l=t.chartArea;return l?n(a,l):null}}]};return Object(o.jsx)(O.a,{data:l,options:{plugins:{legend:{display:!1,fontColor:"white"},title:{display:!0,color:"white",text:"Kunjungan dan Pengunjung"}},responsive:!0,maintainAspectRatio:!1,animation:{duration:0},scales:{x:{stacked:!0,ticks:{color:"white"},gridLines:{display:!1,color:"white"}},y:{stacked:!0,ticks:{color:"white"}}}}})},L=function(){return Object(o.jsxs)("div",{className:"h-screen w-full pt-20 px-2 pb-2 flex flex-row flex-wrap justify-between",children:[Object(o.jsxs)("div",{className:"w-1/4 h-full",children:[Object(o.jsxs)("div",{className:"h-1/3 w-full flex flex-wrap",children:[Object(o.jsx)("div",{className:"w-1/2 h-1/2 p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 bg-yellow-500 flex flex-col items-center rounded",children:Object(o.jsx)(F,{})})}),Object(o.jsx)("div",{className:"w-1/2 h-1/2 p-1",children:Object(o.jsxs)("div",{className:"w-full h-full p-1 bg-red-700 flex flex-col items-center rounded",children:[Object(o.jsx)("div",{className:"text-center font-bold text-white",children:"TT Tersedia"}),Object(o.jsx)(B,{})]})}),Object(o.jsx)("div",{className:"w-1/2 h-1/2 p-1",children:Object(o.jsxs)("div",{className:"w-full h-full p-1 bg-blue-500 flex flex-row rounded",children:[Object(o.jsx)("div",{className:"w-1/3 h-full",children:"BOR"}),Object(o.jsx)("div",{className:"w-1/3 h-full",children:"NDR"}),Object(o.jsx)("div",{className:"w-1/3 h-full",children:"GDR"})]})}),Object(o.jsx)("div",{className:"w-1/2 h-1/2 p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 bg-red-500 flex flex-col items-center rounded",children:Object(o.jsx)(J,{})})})]}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(E,{})})})}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsxs)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:[Object(o.jsx)("div",{className:"text-white text-center font-bold",children:"Kunjungan Rawat Jalan"}),Object(o.jsx)("div",{className:"w-full h-full"})]})})})]}),Object(o.jsxs)("div",{className:"w-1/4 h-full",children:[Object(o.jsx)("div",{className:"h-1/3 w-full flex flex-wrap",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(A,{})})})}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(D,{})})})}),Object(o.jsx)("div",{className:"h-1/3 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(R,{})})})})]}),Object(o.jsxs)("div",{className:"w-1/4 h-full",children:[Object(o.jsx)("div",{className:"h-1/2 w-full flex flex-wrap",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(S,{})})})}),Object(o.jsx)("div",{className:"h-1/2 w-full flex flex-wrap",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(M,{})})})})]}),Object(o.jsxs)("div",{className:"w-1/4 h-full",children:[Object(o.jsx)("div",{className:"h-1/6 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-row rounded bg-green-500 flex text-white text-center text-2xl font-bold items-center justify-center",children:"Kondisi Pelayanan Aman"})})}),Object(o.jsxs)("div",{className:"h-5/6 w-full",children:[Object(o.jsx)("div",{className:"h-1/2 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(C,{})})})}),Object(o.jsx)("div",{className:"h-1/2 w-full",children:Object(o.jsx)("div",{className:"w-full h-full p-1",children:Object(o.jsx)("div",{className:"w-full h-full p-1 flex flex-col rounded bg-gray-700 border border-blue-500",children:Object(o.jsx)(I,{})})})})]})]})]})},z=function(){return Object(o.jsxs)("div",{children:[Object(o.jsx)(f,{}),Object(o.jsx)(L,{}),Object(o.jsx)(k,{})]})},K=a(14);var P=function(e){var t=Object(n.useState)(e),a=Object(d.a)(t,2),l=a[0],r=a[1];return{value:l,onChange:function(e){r(e.target.value)}}},G=function(e){var t=P(""),a=P(""),l=Object(n.useState)(null),r=Object(d.a)(l,2),c=r[0],s=(r[1],Object(n.useState)(!1)),i=Object(d.a)(s,2),u=i[0];return i[1],Object(o.jsx)("div",{className:"h-screen bg-gray-900 flex items-center justify-center text-white",children:Object(o.jsxs)("div",{className:"flex flex-col",children:[Object(o.jsx)("div",{className:"font-bold",children:"Selamat Datang"}),Object(o.jsxs)("h1",{className:"text-3xl font-bold",children:["Real-Time Business Intelligence ",Object(o.jsx)("br",{})," Rumah Sakit"]}),Object(o.jsx)("br",{}),c&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("small",{style:{color:"red"},children:c}),Object(o.jsx)("br",{})]}),Object(o.jsx)("br",{}),Object(o.jsxs)("form",{action:"",method:"post",children:[Object(o.jsxs)("div",{className:"",children:["Username ",Object(o.jsx)("br",{}),Object(o.jsx)("input",Object(K.a)(Object(K.a)({className:"\r w-full px-3 py-2 bg-gray-900 border border-gray-500 rounded outline-none\r hover:border-gray-100\r focus:border-4 focus:border-blue-500",placeholder:"username",type:"text"},t),{},{autoComplete:"new-password",required:!0}))]}),Object(o.jsxs)("div",{className:"mt-2",children:["Password ",Object(o.jsx)("br",{}),Object(o.jsx)("input",Object(K.a)(Object(K.a)({className:"\r w-full px-3 py-2 bg-gray-900 border border-gray-500 rounded outline-none\r hover:border-gray-100\r focus:border-4 focus:border-blue-500",placeholder:"password",type:"password"},a),{},{autoComplete:"new-password",required:!0}))]})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{className:"w-full px-3 py-2 bg-blue-500 border border-blue-500 rounded font-bold outline-none\r hover:bg-blue-600 hover:cursor-pointer\r focus:border-4 focus:border-blue-500 focus:bg-blue-700",value:"Sign in",type:"button",disabled:u})]})]})})};var T=function(){return Object(o.jsx)("div",{className:" bg-gray-700",children:Object(o.jsx)(s.a,{children:Object(o.jsxs)(u.c,{children:[Object(o.jsx)(u.a,{exact:!0,path:"/",component:i}),Object(o.jsx)(u.a,{exact:!0,path:"/dashboard",component:z}),Object(o.jsx)(u.a,{exact:!0,path:"/login",component:G})]})})})},W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,225)).then((function(t){var a=t.getCLS,n=t.getFID,l=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),l(e),r(e),c(e)}))};c.a.render(Object(o.jsx)(l.a.StrictMode,{children:Object(o.jsx)(T,{})}),document.getElementById("root")),W()},93:function(e,t,a){},99:function(e,t,a){}},[[224,1,2]]]);
//# sourceMappingURL=main.750a866a.chunk.js.map