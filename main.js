(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{graph_create:()=>v,interaction_a:()=>w});var n={};t.r(n),t.d(n,{graph_create:()=>A,interaction_a:()=>$});var o={};t.r(o),t.d(o,{graph_create:()=>I,interaction_a:()=>L});var a={};t.r(a),t.d(a,{graph_create:()=>U,interaction_a:()=>V});var r={};function l(t,e,n=16){const o=[],a=t[0],r=t[1];for(let t=0;t<n;t++){const l=t/n*2*Math.PI,i=e*Math.cos(l),c=r+e*Math.sin(l)/111300,s=a+i/(111300*Math.cos(r*Math.PI/180));o.push([s,c])}return o.push(o[0]),o}t.r(r),t.d(r,{graph_create:()=>q,interaction_a:()=>H});const i={mergeJSONById:function(t,e){const n=t.map((t=>{const n=e.find((e=>e.id===t.id));return n?{...t,...n}:t}));return console.log("[mergeJSONById]",n.at(0)),n},default_year:2020,getPointsInsideBBox:function(t,e,n,o,a){for(var r=t.map((t=>t.latitude)),l=t.map((t=>t.longitude)),i=[],c=0;c<r.length;c++)r[c]>=e&&r[c]<=n&&l[c]>=o&&l[c]<=a&&i.push(c);return i},DisplayInHTML:async function(t,e){const n=document.getElementById(e);n.innerHTML="",t.forEach(((t,e)=>{const o=document.createElement("li");o.textContent=`${e} ${JSON.stringify(t,null,2)}`,n.appendChild(o)}))},interaction_test:async function(t){t.on("plotly_hover",(function(t){console.log("[plotly_hover]",t);var e=t.points;if(e&&e[0]){var n=e[0];console.log("[plotly_hover]",n.properties)}})),t.on("plotly_unhover",(function(t){console.log("[plotly_unhover]",t);var e=t.points;if(e&&e[0]){var n=e[0];console.log("[plotly_unhover]",n.properties)}})),t.on("plotly_click",(function(t){if(console.log("[plotly_click] eventData:",t?.points),t){var e=t.points;if(e&&e[0]){var n=e[0];console.log("[plotly_click]",n.properties)}}})),t.onpointerdown=function(t){console.log("[onpointerdown]",t)},t.addEventListener("dblclick",(t=>{console.log("[dblclick]",t)}))},json_print:async function(t){console.log("[json_print] -------------------------------------------v"),console.log(` '${JSON.stringify(t,null,2)}' `),console.log("[json_print] -------------------------------------------^")},event_sent:async function(t,e){const n=new CustomEvent(t,{detail:e});window.dispatchEvent(n)},event_received:async function(t,e){let n=null;return e?window.addEventListener(t,e):window.addEventListener(t,(t=>{console.log("[event_received] event_func:",t.detail),n=t.detail})),n},GetWeekNumber:function(t){const e=new Date(t.getTime()),n=new Date(e.getFullYear(),0,1),o=Math.floor((e-n)/864e5)+1,a=e.getDay()||7;return{weekNumer:Math.ceil((o+n.getDay()-a)/7),dayOfWeek:a}},GetUTCDate:function(t,e){if(null==e)return new Date(t).toUTCString();{const n=new Date(t);return n.setUTCHours(...e),n.toUTCString()}},formatUTCMonthDay:function(t){const e=new Date(t);return`${e.toLocaleString("en-US",{month:"short",timeZone:"UTC"})}${e.getUTCDate()}`},GroupByKeys:function(t,e,n){return t.reduce(((t,o)=>{const a=o[e];return t[a]||(t[a]=[]),t[a].push(o[n]),t}),{})},GetUniqueValues:function(t){return[...new Set(t)]},CountUniqueValues:function(t){const e=t.reduce(((t,e)=>(t[e]=(t[e]||0)+1,t)),{});return Object.entries(e).map((([t,e])=>({value:t,count:e})))},GetFiltered:function(t,e,n){return t.filter((t=>t[e]===n))},GetSummation:async function(t){return t.map(((t,e)=>t.reduce(((t,e)=>t+e),0)))},filtering:async function(t,e){let n=t;return e&&Object.entries(e).forEach((([t,e])=>{e&&(n=n.filter((n=>n[t]===e)))})),n},loadJson:async function(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(t){throw console.error("Failed to load JSON:",t),t}},normalizeArray:function(t,e=0,n=1){const o=Math.min(...t),a=Math.max(...t);return t.map((t=>(t-o)/(a-o)*n+e))},sortedIndices:async function(t){return t.map(((t,e)=>({value:t,index:e}))).sort(((t,e)=>e.value-t.value)).map((({index:t})=>t))},sortDates:function(t,e=!0){return t.sort(((t,n)=>{const o=new Date(t),a=new Date(n);return e?o-a:a-o}))},sortDatesIndices:function(t,e=!0){return t.map(((t,e)=>({date:new Date(t),index:e}))).sort(((t,n)=>e?t.date-n.date:n.date-t.date)).map((t=>t.index))},interpolateColorRgb:function(t,e,n){return n=Math.max(0,Math.min(1,n)),`rgb(${Math.round(t.r+n*(e.r-t.r))}, ${Math.round(t.g+n*(e.g-t.g))}, ${Math.round(t.b+n*(e.b-t.b))})`},geo_circle_create:function({lon:t,lat:e,r:n=5e3}){return{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[l([t,e],n)]},properties:{name:"Circle"}}]}},replaceKeyName:function(t,e,n){return t.map((t=>(t.hasOwnProperty(e)&&(t[n]=t[e],delete t[e]),t)))},applyLogBase10:function(t){return t.map((t=>Math.log10(t)))}},c="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_tools.js".split("/").pop();async function s(t){var e=await i.filtering(t,{date_end:null}),n=3===e.length;return console.log("[test_filtering_2]:",e.length,n),e}console.log(`- '${c}' loaded!!`);const d="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_data.js".split("/").pop();function u(t,e){let n=document.getElementById(t);n||(n=document.createElement("div"),n.id=t,n.style.width="200px",n.style.margin="10px auto",n.style.border="1px solid black",n.style.padding="10px",document.body.appendChild(n)),n.innerHTML=e.split(",").map((t=>t.trim())).join("<br>")}console.log(`- '${d}' loaded!!`);const p="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_html.js".split("/").pop();async function f(t,e,n){var o=t.map((t=>t[e]));return i.GetUniqueValues(o).map((o=>{let a=i.GetFiltered(t,e,o),r=a.length;return n?{x:o,n_filtered:r}:{x:o,filtered:a}}))}async function y(t,e,n){i.event_received("tools.EVENT_2_INDEX",(o=>g(0,t,e,n))),i.event_received("tools.EVENT_3_LABEL",(o=>g(0,t,e,n)))}async function g(t,e,n,o){!async function(t,e,n,o,a,r){var l={};l.region=o,l.country=n,a&&(l.date_start=i.GetUTCDate(a)),"World"===o&&(l.region=n,l.country=null),"World"===n&&(l.region=null,l.country=null),r(t,await i.filtering(e,l)),a=null,n=null,o=null}(e,n,m.label,m.parent,m.day,o)}console.log(`- '${p}' loaded!!`);let m={day:null,label:null,parent:null,static:!1};const h="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_interactions.js".split("/").pop();console.log(`- '${h}' loaded!!`);let _="World";async function b(t,e){var n,o,a;let r=e.map((({country:t,best:e,region:n})=>({2:n,3:t,values:1})));r=r.map((t=>({0:"",1:_,...t})));const l=function(t){const e={};t.forEach((t=>{let n=null;Object.keys(t).forEach((o=>{if("values"===o)return;const a=t[o],r=t.values;e[o]||(e[o]={}),n="1"===o?null:t[parseInt(o)-1],e[o][a]?e[o][a].value+=r:e[o][a]={value:r,parent:n}}))}));let n=[];for(const t in e)for(const o in e[t])n.push({column:t,key:o,value:e[t][o].value,parent:e[t][o].parent});return n}(r);o=l.map((({key:t})=>t)),n=l.map((({value:t})=>t)),a=l.map((({parent:t})=>t)),t.data[0].values=n,t.data[0].labels=o,t.data[0].parents=a,Plotly.redraw(t)}async function v(t,e){var n=[{values:[0],labels:[_],parents:[""],type:"sunburst",branchvalues:"total",leaf:{opacity:1},marker:{line:{width:2}},outsidetextfont:{size:12,color:"#377eb8"}}],o=document.getElementById(t);return Plotly.newPlot(o,n,{margin:{l:10,r:10,b:10,t:10},plot_bgcolor:"#191A1A",paper_bgcolor:"#191A1A",font:{color:"white",size:8},textfont:{size:8,color:"darkblue"}}),b(o,e),o}async function w(t,e){y(t,e,b),t.on("plotly_click",x)}var x=function(t){var e=t?.points?.[0]?.label,n=t?.points?.[0]?.parent;console.log(t?.points?.[0]),i.event_sent("tools.EVENT_3_LABEL",{label:e,parent:n}),i.event_sent("plot5_event_label",{label:e,parent:n})};const k="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_b_1.js".split("/").pop();async function E(t,e){let n=t.data?.[0]?.z,o=t.data?.[0]?.w,a=t.data?.[0]?.customdata;n.forEach((t=>t.fill(null))),o.forEach((t=>t.fill(null))),a.forEach((t=>t.fill(null))),console.log(`[table_container] data:'${e.length}'`);var r=e.map((({date_start:t})=>t)),l=i.GetUniqueValues(r);console.log(`[table_container] unique:'${l.length}'`),l.forEach((t=>{let r=new Date(t),{weekNumer:l,dayOfWeek:c}=i.GetWeekNumber(r),s=i.GetFiltered(e,"date_start",t);o[c-1][l-1]=r,n[c-1][l-1]=s.length;let d=`${s.length}<br>${i.formatUTCMonthDay(r)}`;a[c-1][l-1]=d})),Plotly.redraw(t)}async function A(t,e){const n=Array.from({length:7},(()=>Array.from({length:52},(()=>null)))),o=Array.from({length:7},(()=>Array.from({length:52},(()=>null)))),a=Array.from({length:7},(()=>Array.from({length:52},(()=>null)))),r={z:n,y:Array.from({length:7},((t,e)=>e+1)),x:Array.from({length:52},((t,e)=>e+1)),w:o,customdata:a,type:"heatmap",showscale:!1,colorscale:"Viridis",hoverongaps:!1,hovertemplate:"%{customdata}<extra></extra>"},l={margin:{l:50,r:50,b:50,t:10},xaxis:{title:{text:"Week Number",font:{size:10}},side:"bottom",tickangle:0,tickvals:Array.from({length:13},((t,e)=>4*(e+1))),ticktext:Array.from({length:13},((t,e)=>""+4*(e+1))),tickfont:{size:8,color:"white"}},yaxis:{automargin:!0,tickvals:Array.from({length:7},((t,e)=>e+1)),ticktext:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],tickfont:{size:8,color:"white"}},plot_bgcolor:"#191A1A",paper_bgcolor:"#191A1A",font:{color:"white"}};var i=document.getElementById(t);return Plotly.newPlot(i,[r],l),E(i,e),i}async function $(t,e){y(t,e,E),t.on("plotly_click",(n=>C(n,t,e)))}console.log(`- '${k}' loaded!!`);var C=async function(t,e,n){var o=t.points;if(o&&o[0]){var a=o[0],r=a.x,l=a.y,c=a.z,s=a.data.w[l-1][r-1];console.log(`[heatmap_container] week:${r} \n            day:${l} value:${c} date_start:${s}`),T?(i.event_sent("tools.EVENT_2_INDEX",{index:null}),T=!1):(i.event_sent("tools.EVENT_2_INDEX",{index:s}),T=!0)}},T=!1;const D="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_c_1.js".split("/").pop();console.log(`- '${D}' loaded!!`);let j={r:255,g:255,b:0},z={r:255,g:105,b:180},P=t=>i.interpolateColorRgb(z,j,t);async function M(t,e){var n=e.map((t=>t?.best)),o=i.applyLogBase10(n),a=e.map((t=>t.latitude)),r=e.map((t=>t.longitude));console.log(`[densitymap_a_create]: bests:'${o.length}' `),t.data.forEach((t=>{t.z=o,t.lat=a,t.lon=r})),async function(t,e){let n=e.map((t=>{let e=null;return 0<=t&&t<5&&(e=3),5<=t&&t<10&&(e=4),10<=t&&(e=6),e})),o=i.normalizeArray(n);o=o.map((t=>P(t))),t.marker={line:{color:"black",width:1},size:n,color:o,cmin:0,cmax:1}}(t.data[0],n),Plotly.redraw(t),t.on("plotly_relayout",(n=>async function(t,e,n){console.log(t?.dragmode),console.log(t),t["map.center"];let o=t["map._derived"]?.coordinates;if(!o)return;console.log(o);let a=o.map((t=>t[0])),r=o.map((t=>t[1]));!async function(t,e,n){let o={};o.lat=e,o.lon=n,o.name="bbox",o.type="scattermap",o.marker={size:10},Plotly.deleteTraces(t,2),Plotly.addTraces(t,o,[2])}(e,r,a);const l=Math.min(...r),c=Math.max(...r),s=Math.min(...a),d=Math.max(...a);let u=n.map((({latitude:t,longitude:e,date_start:n})=>({latitude:t,longitude:e,date_start:n}))),p=i.getPointsInsideBBox(u,l,c,s,d);if(u=p.map((t=>u[t])),console.log("points:",u.length),u.length<200){let t=await async function(t){return t.map((({latitude:t,longitude:e})=>function({lon:t,lat:e}){return{type:"fill",color:F,opacity:.25,source:i.geo_circle_create({lon:t,lat:e})}}({lat:t,lon:e,r:5e4})))}(u);console.log("layers:",t.length),Plotly.update(e,{},{"map.layers":t})}}(n,t,e)))}async function I(t,e){var n=[],o=await async function(t,e,n){return{type:"densitymap",opacity:.5,z:n,lat:[],lon:[],mode:"lines",radius:25,colorscale:"Grays",showscale:!1}}(0,0,n),a=await async function(t,e,n){return{type:"scattermap",z:n,lat:[],lon:[],hoverinfo:"y",showscale:!1,marker:{size:3}}}(0,0,n);(N=[]).push(a),N.push(o),N.push({}),B={font:{color:"white"},map:{zoom:1.125,style:"dark",center:{lon:0,lat:20},domain:{x:[0,1],y:[0,1]}},margin:{t:10,b:10,l:10,r:10},showlegend:!1,plot_bgcolor:"#191A1A",paper_bgcolor:"#191A1A",xaxis:{tickvals:[]},yaxis:{tickvals:[]}},(S={}).scrollZoom=!0,S.staticPlot=m.static,S.doubleClick="reset",S.displayModeBar=!0,S.doubleClickDelay=1e3;var r=document.getElementById(t);return Plotly.react(r,N,B,S),M(r,e),r}var N=null,B=null,S=null;async function L(t,e){y(t,e,M)}let F=i.interpolateColorRgb({r:0,g:0,b:0},{r:255,g:255,b:255},.75);const O="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_d_1.js".split("/").pop();async function G(t,e){let n=await f(e,"date_start",!0),o=n.map((t=>t.x)),a=n.map((t=>t.n_filtered)),r=await i.sortDatesIndices(o);o=r.map((t=>o[t])),a=r.map((t=>a[t])),t.data[0].x=o,t.data[0].y=a,t.data[0].marker.color=a,t.data[0].marker.colorscale="Viridis",Plotly.redraw(t)}async function U(t,e){let n=[],o={};n.push({type:"bar",x:[],y:[],marker:{color:null}}),o={font:{color:"white"},margin:{l:50,r:25,b:35,t:0},showlegend:!0,plot_bgcolor:"#191A1A",paper_bgcolor:"#191A1A",showlegend:!1,xaxis:{side:"bottom",title:{text:"Days",standoff:5,font:{size:10}},tickangle:45,tickvals:[],tickfont:{size:8,color:"white"}},yaxis:{title:{text:"Events / Days",font:{size:10}},tickfont:{size:8,color:"white"}}};let a=document.getElementById(t);return Plotly.newPlot(a,n,o,{}),G(a,e),a}async function V(t,e){y(t,e,G)}console.log(`- '${O}' loaded!!`);const J="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_f_1.js".split("/").pop();async function W(t,e){let n=await f(e,"country",!0),o=n.map((t=>t.x)),a=n.map((t=>t.n_filtered)),r=await i.sortedIndices(a);o=r.map((t=>o[t])),a=r.map((t=>a[t])),t.data[0].x=o,t.data[0].y=a,t.data[0].marker.color=a,t.data[0].marker.colorscale="Viridis",Plotly.redraw(t)}async function q(t,e){let n=[],o={};n.push({type:"bar",x:[],y:[],marker:{color:null}}),o={font:{color:"white"},margin:{l:50,r:25,b:35,t:0},showlegend:!0,plot_bgcolor:"#191A1A",paper_bgcolor:"#191A1A",showlegend:!1,xaxis:{side:"bottom",title:{text:"Countries",standoff:5,font:{size:10}},tickangle:45,tickvals:[],tickfont:{size:8,color:"white"}},yaxis:{title:{text:"Events",font:{size:10}},tickfont:{size:8,color:"white"},type:"log"}};let a=document.getElementById(t);return Plotly.newPlot(a,n,o,{}),W(a,e),a}async function H(t,e){y(t,e,W)}console.log(`- '${J}' loaded!!`);const X="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_j_1.js".split("/").pop();console.log(`- '${X}' loaded!!`);const R="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_j_2.js".split("/").pop();console.log(`- '${R}' loaded!!`);const K="file:///home/runner/work/conflict_dashboard/conflict_dashboard/Frontend/script_css.js".split("/").pop();async function Y(t){var l=await async function(t){var e;e=`https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y${t}.json`;const n=await i.loadJson(e);return console.log(`[ucpd_data_get] year:${t} length:${n.length}`),n}(t),c=await async function(){const t=await i.loadJson("https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y2020_gpw_polulation.json");return console.log(`[gpw_polulation_data_get] year:2020 length:${t.length}`),t}();l=i.mergeJSONById(l,c),await async function(t,e){u("message_a_container",`-- Year selected: '${e}',-- Events:'${t.length}' `),i.event_received("tools.EVENT_2_INDEX",(t=>{let e=t.detail?.index;m.day=e,e&&(e=i.formatUTCMonthDay(e)),u("message_b_container",`-- Area selected: '${m.label}' \n                                        (${m.parent}),  \n                                -- day: ${m.day} `)})),i.event_received("tools.EVENT_3_LABEL",(t=>{let e=t.detail?.label,n=t.detail?.parent;m.label=e,m.parent=n,u("message_b_container",`-- Area selected: '${m.label}' \n                                        (${m.parent}), \n                                -- day: ${m.day} `)}))}(l,t);var d=await async function(t){return t.forEach((t=>{t.date_end=i.GetUTCDate(t.date_end),t.date_start=i.GetUTCDate(t.date_start);let{weekNumer:e,dayOfWeek:n}=i.GetWeekNumber(new Date(t.date_start));t.week_number=e})),console.log("ucpd_data:",t[0]),t}(l);!async function(t){!async function(t){var e=await i.filtering(t,{}),n=e.length===t.length;console.log("[test_filtering_1]:",e.length,n)}(t),s(t)}(d);var p=await s(d);console.log("m_data:",p.length);let f={};f.box_class_2_2=o,f.box_class_1_2_1=a,f.box_class_1_2_2=n,f.box_class_2_1_1=e,f.box_class_2_1_2=r;const y=Object.entries(f).map((async([t,e])=>{const n=await e.graph_create(t,p);e.interaction_a(n,d)}));await Promise.all(y)}console.log(`- '${K}' loaded!!`),window.tools_json_print=i.json_print,async function(){(function(){const t=document.createElement("style");t.textContent="\n\nbody \n{\n    margin: 0;\n    background-color: black;\n    color: white;\n    font-family: Arial, sans-serif;\n}\n\n\n#buttons_b \n{\n    top: 0px;\n    left: 10px;\n    z-index: 1;\n    gap: 10px; /* Space between buttons */\n    display: flex; /* Align buttons horizontally */\n    position: relative; /* Position buttons based on this container */\n    justify-content: flex-start; /* Align buttons to the left by default */\n}\n\n\n#buttons_a \n{\n    top: 50px;\n    left: 10px;\n    z-index: 1;\n    gap: 10px; /* Space between buttons */\n    display: flex; /* Align buttons horizontally */\n    position: relative; /* Position buttons based on this container */\n    justify-content: flex-start; /* Align buttons to the left by default */\n}\n\n#button_a_play, #button_a_pause \n{\n    cursor: pointer;\n    padding: 5px 5px;\n    font-size: 12px;\n}     \n\n\n.loading-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5); /* semi-transparent background */\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 9999; /* Ensure the spinner is on top of everything */\n}\n\n/* Circular spinner style */\n.spinner {\n    border: 8px solid #f3f3f3; /* Light gray background */\n    border-top: 8px solid #4caf50; /* Green spinner */\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    animation: spin 1s linear infinite;\n}\n\n/* Animation for spinning effect */\n@keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}\n\n\n        .slider {\n            width: 100%;\n            height: 10px;\n            background: #ddd;\n            border-radius: 5px;\n            appearance: none;\n        }\n\n        .slider-thumb {\n            appearance: none;\n            width: 20px;\n            height: 20px;\n            background: #4caf50;\n            border-radius: 50%;\n            cursor: pointer;\n        }\n\n        .slider:focus {\n            outline: none;\n        }\n    ",document.head.appendChild(t)})(),function(){const t=document.createElement("div");t.classList.add("loading-overlay");const e=document.createElement("div");e.classList.add("spinner"),t.appendChild(e),document.body.appendChild(t),window.onload=function(){t.style.display="none"}}();const t=[];t.push("2023"),t.push("2022"),t.push("2021"),t.push("2020"),function(t){const e=document.getElementById("dropdown_a_container"),n=document.createElement("select");n.id="dropdown_a_value",t.forEach((t=>{const e=document.createElement("option");e.value=t,e.textContent=t,n.appendChild(e)})),n.value=i.default_year;const o=document.createElement("button");o.textContent="Analyze";const a=document.createElement("p");a.id="output_container",o.addEventListener("click",(()=>{i.event_sent(i.EVENT_1_DATA,{data:n.value})})),e.appendChild(n),e.appendChild(o),e.appendChild(a)}(t)}(),async function(){!function(t,e){const n=document.getElementById("button_a_static");n.textContent=e,n.addEventListener("click",(function(){n.textContent===e?n.textContent="Interactive":n.textContent=e})),n.addEventListener("click",(()=>{m.static=!m.static}))}(0,"Static")}(),Y(document.getElementById("dropdown_a_value").value),i.event_received(i.EVENT_1_DATA,(t=>Y(t.detail?.data)))})();