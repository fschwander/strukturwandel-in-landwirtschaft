(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a.p+"static/media/cow.693a9c19.svg"},13:function(e,t,a){e.exports=a.p+"static/media/wheat.4e4ef96c.svg"},20:function(e,t,a){e.exports=a.p+"static/media/farm-sizes.bfe448e9.csv"},21:function(e,t,a){e.exports=a(35)},27:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),l=a.n(i),s=(a(27),a(11)),c=a.n(s),o=a(18),u=a(2),h=a(3),d=a(5),m=a(4),p=a(6),f=a(1),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={showAnswer:e.showAnswer},a.maxScaleValue=1.2*Math.round(f.k(a.props.data,function(e){return e.maxInPct})),a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"drawChart",value:function(){var e=this.props.data,t=20,a=30,n=50,r=50,i=f.m().domain(e.map(function(e){return e.label})).rangeRound([0,500]),l=f.n().domain([0,this.maxScaleValue]).rangeRound([300,0]),s=f.n().domain([0,e.length]).rangeRound([0,500]),c=f.p(".chart-container").append("svg").attr("width",500+r+a).attr("height",300+t+n),o=f.e().extent(function(e,t){return[[s(t)+11,0],[s(t)+s(1)-11,300]]}).on("brush",function(){if(!f.g.sourceEvent)return;if("brush"===f.g.sourceEvent.type)return;if(!f.g.selection)return;var e=f.g.selection.map(l.invert),t=f.p(this).select(".selection");e[0]>0?t.datum().value=e[0]:t.datum().value=.01,u.call(o.move,function(e){return[e.value,0].map(l)}).selectAll(".label-top, .label-answer-left").attr("y",function(e){return l(e.value)}),u.selectAll(".label-top").text(function(e){return f.i(".0%")(e.value)}),u.selectAll(".handle-bar").attr("y",function(e){return l(e.value)}),d()}).on("end",function(){if(!f.g.sourceEvent)return;if("brush"===f.g.sourceEvent.type)return;f.g.selection||u.call(o.move,function(e){return[e.value,0].map(l)})});c.append("defs").append("pattern").attr("id","dashed-fill").attr("width",8).attr("height",8).attr("patternUnits","userSpaceOnUse").append("rect").attr("width",4).attr("height",8).attr("transform","translate(0,0)"),this.mainGroup=c.append("g").attr("transform","translate(".concat(r,",").concat(t,")"));var u=this.mainGroup.selectAll(".bar").data(e).enter().append("g").attr("id",function(e,t){return"bar"+t}).attr("class","bar").call(o).call(o.move,function(e){return[e.value,0].map(l)});f.q(".selection").attr("fill","#b9b7ac").attr("fill-opacity",1),u.append("rect").attr("class","handle-bar on-hover-only").attr("width",i.bandwidth()-22).attr("height",2).attr("y",function(e){return l(e.value)}).attr("x",function(e,t){return s(t)+11}).attr("fill","url(#dashed-fill)"),d(),u.append("text").attr("text-anchor","middle").attr("class","label-top").attr("y",function(e){return l(e.value)}).attr("x",function(e,t){return s(t)+s(.5)}).attr("dy",-4).style("fill","currentColor").text(function(e){return f.i(".0%")(e.value)}),u.append("text").attr("text-anchor","middle").attr("class","x-axis").attr("y",300).attr("x",function(e,t){return s(t)+s(.5)}).attr("dy",22).attr("fill","currentColor").text(function(t,a){return e[a].label});var h=u.append("text").attr("class","label-answer-left header-small").classed("on-hover-only",!0).attr("text-anchor","end").attr("transform","translate(6,-2)").attr("y",function(e){return l(e.value)}).attr("x",function(e,t){return s(t)}).attr("fill","currentColor");function d(){u.selectAll(".handle--n").attr("height",20).attr("dy",-10)}h.append("tspan").attr("x",function(e,t){return s(t)}).text("deine"),h.append("tspan").attr("x",function(e,t){return s(t)}).attr("dy",12).text("Antwort")}},{key:"showAnswer",value:function(){var e=this.props.data,t=f.n().domain([0,this.maxScaleValue]).rangeRound([300,0]),a=f.o().range(["#4ec291","#42a3f1","#e396d1"]);this.mainGroup.selectAll(".selection").data(e).transition().duration(2e3).attr("height",function(e){return 300-t(e.maxInPct)}).attr("y",function(e){return t(e.maxInPct)}).attr("fill",function(e,t){return a(t)});var n=f.i(".0%");this.mainGroup.selectAll(".label-top").transition().duration(2e3).attr("y",function(e){return t(e.maxInPct)}).on("start",function(){var e=this;f.a(this).tween("text",function(t){var a=f.p(e),r=f.j(a.text().replace(/%/g,"")/100,t.maxInPct);return function(e){return a.text(n(r(e)))}})});var r=this.mainGroup.selectAll(".label-answer-left, .handle-bar").classed("header-small",!1).classed("on-hover-only",!1);r.selectAll("tspan").remove(),r.append("tspan").attr("dy",8).text(function(e){return n(e.value)}),this.mainGroup.selectAll("*").attr("pointer-events","none")}},{key:"componentDidMount",value:function(){this.drawChart()}},{key:"componentDidUpdate",value:function(){this.props.showAnswer&&this.showAnswer()}},{key:"render",value:function(){return n.createElement("div",{className:"DraggableBarChart"},n.createElement("div",{className:"chart-container"}))}}]),t}(n.Component),g=a(19),b=a.n(g),v=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={showAnswer:!1},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"showAnswer",value:function(){this.setState({showAnswer:!0})}},{key:"render",value:function(){var e=this,t=this.state.showAnswer;return n.createElement("div",{className:"QuizPage"},n.createElement("h2",null,"Quiz"),n.createElement("p",null,"Ausgehend vom Jahr 1985, wo der Bestand 100% betrug: Wie viele kleinere, mittlere und grosse Bauernh\xf6fe gibt es heute?"),n.createElement("p",null,"Sch\xe4tze, wie sich die Anzahl der Bauernh\xf6fe ver\xe4ndert hat."),n.createElement(_,{showAnswer:this.state.showAnswer,data:this.props.data}),n.createElement("p",{className:t?"show":"hide"},"Tats\xe4chlich ist es so, dass besonders unter den kleineren Bauernh\xf6fen ein regelrechtes Massensterben beobachtet werden kann. Auch mittelgrosse Betriebe haben Schwierigkeiten. Nur grosse oder zusammengelegte H\xf6fe k\xf6nnen sich behaupten: Ihre Anzahl ist um das Mehrfache gestiegen."),n.createElement(b.a,{className:t?"hide":"show",variant:"dark",onClick:function(){return e.showAnswer()}},"Antwort zeigen"))}}]),t}(n.Component),w=a(20),x=a.n(w),y=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"getReducedData",value:function(e){var t=e[0],a=e[e.length-1],n=t.area_size_0_1+t.area_size_1_3+t.area_size_3_5+t.area_size_5_10,r=t.area_size_20_30+t.area_size_10_20,i=t.area_size_50_n+t.area_size_30_50,l=a.area_size_0_1+a.area_size_1_3+a.area_size_3_5+a.area_size_5_10,s=a.area_size_20_30+a.area_size_10_20,c=a.area_size_50_n+a.area_size_30_50;return[{value:1,label:"Kleine Bauernh\xf6fe",size:"bis 20 ha",minYearData:n,maxYearData:l,minYear:t.year,maxYear:a.year,maxInPct:l/n},{value:1,label:"Mittlere Bauernh\xf6fe",size:"20 bis 50 ha",minYearData:r,maxYearData:s,minYear:t.year,maxYear:a.year,maxInPct:s/r},{value:1,label:"Grosse Bauernh\xf6fe",size:"ab 50 ha",minYearData:i,maxYearData:c,minYear:t.year,maxYear:a.year,maxInPct:c/i}]}},{key:"getFullData",value:function(){return f.f(x.a,function(e){return{year:+e.year,total_farms_count:+e.total_farms_count,area_valley_in_percent:+e.area_valley_in_percent,area_mountain_in_percent:+e.area_mountain_in_percent,area_size_0_1:+e.area_size_0_1,area_size_1_3:+e.area_size_1_3,area_size_3_5:+e.area_size_3_5,area_size_5_10:+e.area_size_5_10,area_size_10_20:+e.area_size_10_20,area_size_20_30:+e.area_size_20_30,area_size_30_50:+e.area_size_30_50,area_size_50_n:+e.area_size_50_n}})}},{key:"getLabelMap",value:function(){return{year:"Jahr",total_farms_count:"Total Anz. Farmen",area_valley_in_percent:"Talgebiet in %",area_mountain_in_percent:"Berggebiet in %",area_size_0_1:"< 1 ha",area_size_1_3:"1 bis 3 ha",area_size_3_5:"3 bis 5 ha",area_size_5_10:"5 bis 10 ha",area_size_10_20:"10 bis 20 ha",area_size_20_30:"20 bis 30 ha",area_size_30_50:"30 bis 50 ha",area_size_50_n:"> 50 ha"}}},{key:"getFilteredFarmsKeys",value:function(e){return Object.keys(e[0]).filter(function(e){return"area_size_0_1"===e||"area_size_1_3"===e||"area_size_3_5"===e||"area_size_5_10"===e||"area_size_10_20"===e||"area_size_20_30"===e||"area_size_30_50"===e||"area_size_50_n"===e})}}]),e}(),z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).width=780,a.height=500,a.margin={top:0,bottom:60,left:90,right:70},a.innerHeight=a.height-a.margin.top-a.margin.bottom,a.innerWidth=a.width-a.margin.left-a.margin.right,a.labelMap=y.getLabelMap(),a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"init",value:function(){var e=this.innerWidth,t=this.innerHeight,a=this.width,n=this.height,r=this.margin,i=this.props.data,l=y.getFilteredFarmsKeys(i),s=f.r().keys(l)(i),c=f.o().range(["#c2eedc","#7fd1af","#1cb373","#168c5a","#66bbff","#1e8cd3","#ebb0dd","#d674c0"]),o=f.n().domain(f.h(i,function(e){return e.year})).range([0,e]),u=f.n().domain([0,f.k(s,function(e){return f.k(e,function(e){return e[1]})})]).range([t,0]),h=f.b().x(function(e){return o(e.data.year)}).y0(function(e){return u(e[0])}).y1(function(e){return u(e[1])}),d=f.p(".FarmsCountChart").append("svg").attr("width",a).attr("height",n);this.mainGroup=d.append("g").attr("class","main").attr("transform","translate(".concat(r.left,", ").concat(r.top,")")),this.mainGroup.append("g").attr("class","chart").selectAll(".area").data(s).enter().append("path").attr("class","area").attr("fill",function(e){return c(e.key)}).attr("d",h),this.initAxes(o,u),this.initLegend(l,c)}},{key:"initAxes",value:function(e,t){var a=this.innerWidth,n=this.innerHeight,r=f.c().scale(e).tickFormat(f.i("")),i=f.d().scale(t);this.mainGroup.append("g").attr("class","axis x").attr("transform","translate(0, ".concat(n,")")).call(r),f.p("g.axis.x").append("text").attr("class","header").attr("x",a/2).attr("y",50).text("Jahr").style("text-anchor","middle"),this.mainGroup.append("g").attr("class","axis y").call(i),f.p(".y.axis").append("text").attr("class","header").attr("x",-n/2).attr("y",-70).attr("transform","rotate(-90)").text("Anz. Bauernh\xf6fe").attr("text-anchor","middle")}},{key:"initLegend",value:function(e,t){var a=this,n=22*e.length+8,r=this.mainGroup.append("g").attr("class","legend").attr("width",116).attr("height",n).attr("transform","translate(".concat(this.innerWidth-116-48,",").concat(8,")"));r.append("rect").attr("class","background").attr("width",116).attr("height",n).attr("fill","white");var i=r.append("g").attr("class","entries").attr("transform","translate(".concat(8,",").concat(8,")")).selectAll("rect").data(e.reverse()).enter();i.append("rect").attr("y",function(e,t){return 22*t}).attr("width",12).attr("height",12).attr("fill",function(e){return t(e)}),i.append("text").attr("x",20).attr("y",function(e,t){return 22*t+10}).text(function(e){return a.labelMap[e]})}},{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){return n.createElement("div",{className:"FarmsCountChart"},n.createElement("h2",null,"Ver\xe4nderungsverlauf aller Bauernhofgr\xf6ssen"))}}]),t}(n.Component),C=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"drawChart",value:function(){var e=this.props.data,t=0,a=60,n=40,r=100;this.width=660-r-a,this.height=300-t-n,this.processedData=[this.props.data.map(function(e){return e.minYearData}),this.props.data.map(function(e){return e.maxYearData})],this.colorScale=[f.o().range(["#7fd1af","#1cb373"]),f.o().range(["#66bbff","#1e8cd3"]),f.o().range(["#ebb0dd","#d674c0"])],this.yScale=f.n().domain([0,f.k(this.processedData,function(e){return f.k(e)})]).range([this.height,0]),this.xScale=f.m().domain(e.map(function(e){return e.label})).rangeRound([0,this.width]),this.scaleWidth=f.m().domain(f.l(this.processedData.length)).range([0,this.xScale.bandwidth()]).paddingInner(.02).paddingOuter(.2);var i=this.width,l=this.height,s=this.xScale,c=this.yScale,o=this.scaleWidth,u=this.colorScale,h=this.processedData,d=f.p(".FarmSizeRelationsChart").append("svg").attr("width",i+r+a).attr("height",l+t+n).append("g").attr("transform","translate("+r+","+t+")");this.mainGroup=d;var m=d.append("g").attr("class","bars-container").selectAll("g").data(h).enter().append("g").attr("class",function(e,t){return"bars".concat(t)}).attr("transform",function(e,t){return"translate("+o(t)+",0)"});m.selectAll("rect").data(function(e){return e}).enter().append("g").append("rect").attr("width",o.bandwidth()).attr("height",function(e){return l-c(e)}).attr("x",function(t,a){return s(e[a].label)}).attr("y",function(e){return c(e)}).attr("fill",function(e,t){return(0,u[t])(e)}),m.append("text").text(function(t,a){switch(a){case 0:return e[0].minYear;case 1:return e[0].maxYear;default:return"?"}}).attr("class","header-small").attr("x",o.bandwidth()/2).attr("y",l-12).attr("text-anchor","middle"),d.append("g").attr("class","x-axis").attr("transform","translate(0,"+l+")").call(f.c(s)),d.append("g").attr("class","y-axis").call(f.d(c).ticks(5)),d.append("text").attr("class","header").text("Anz. Bauernh\xf6fe").attr("text-anchor","middle").attr("transform","translate(-70,".concat(l/2,") rotate(-90)"))}},{key:"initLabels",value:function(){var e=this.props.data,t=this.xScale,a=this.yScale,n=this.scaleWidth,r=t.bandwidth(),i=n.bandwidth()/2;console.log(e);var l=f.i(".0%");f.p(".FarmSizeRelationsChart").select(".bars1").selectAll("g").append("text").attr("x",function(e,t){return r*t+i}).attr("y",function(e){return a(e)-4}).attr("text-anchor","middle").text(function(t,a){var n=-1+e[a].maxInPct;return n>=0?"+"+l(n):"\u2013"+l(-1*n)})}},{key:"initLegend",value:function(){var e=this,t=this.props.fullData,a=[t[0].year,t[t.length-1].year],n=24*a.length+18,r=this.mainGroup.append("g").attr("class","legend").attr("width",106).attr("height",n).attr("transform","translate(".concat(this.width-106-18,",").concat(18,")"));r.append("rect").attr("class","background").attr("width",106).attr("height",n).attr("fill","white");for(var i=r.append("g").attr("class","entries").attr("transform","translate(".concat(18,",").concat(18,")")).selectAll("rect").data(a).enter(),l=function(t){var a=e.colorScale[t];i.append("rect").attr("x",14*t).attr("y",function(e,t){return 24*t}).attr("width",12).attr("height",12).attr("fill",function(e,t){return a(t)})},s=0;s<this.colorScale.length;s++)l(s);i.append("text").attr("x",48).attr("y",function(e,t){return 24*t+10}).text(function(e,t){return a[t]})}},{key:"componentDidMount",value:function(){this.drawChart(),this.initLabels()}},{key:"render",value:function(){return n.createElement("div",{className:"FarmSizeRelationsChart"},n.createElement("h2",null,"Anzahl Bauernh\xf6fe im Vergleich 1985 zu 2017"))}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).style={background:"#fff",viewBox:"0 0 155 113"},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.style,t=this.style,a=(t.background,t.className),r=t.viewBox,i=this.props,l=i.width,s=i.fill;return n.createElement("svg",{width:l,style:e,height:l,viewBox:r,xmlns:"http://www.w3.org/2000/svg",className:"icon ".concat(a||""),xmlnsXlink:"http://www.w3.org/1999/xlink"},n.createElement("g",{id:"farm",stroke:"none","stroke-width":"1",fill:s,"fill-rule":"evenodd"},n.createElement("path",{d:"M42.0525781,44 C40.9182049,44 39.9989715,43.1125151 40.0000009,42.0183148 L40.0000009,31.9816852 C40.0000009,30.8874849 40.9192343,30 42.0525781,30 L50.9474227,30 C52.0807666,30 53,30.8874849 53,31.9816852 L53,42.0183148 C53,43.1125151 52.0817959,44 50.9474227,44 L42.0525781,44 Z M82.293522,89 L81.3186259,89 L11.8226032,89 C10.4495663,89 9.33497164,87.8792002 9.33497164,86.4985194 L9.33497164,47.5243876 L9.33497164,47.4742175 C9.32499317,47.4742175 9.32499317,47.4742175 9.31501471,47.4742175 L9.33497164,47.5243876 L4.00148168,47.5243876 C3.24511397,47.5243876 2.757167,46.7036049 3.12537238,46.0433665 L5.96125236,40.8497589 C5.96125236,40.8397249 5.97123082,40.8397249 5.97123082,40.8296909 L6.13986689,40.5196398 L14.4788707,25.4214532 C18.3594961,18.3866034 24.5790738,12.8438119 31.992076,9.80149776 L32.4101737,9.63192286 C36.6390475,7.9010548 41.1672753,7.03010205 45.7044837,7.03010205 C45.7843114,7.02006804 45.8631413,7 45.942969,7 L81.5072189,7 C86.2140612,7 90.8310973,7.94018746 95.1896912,9.79146374 C102.444036,12.853846 108.533893,18.3464673 112.34467,25.2508749 L120.952094,40.8306943 L123.867802,46.0333325 C124.245986,46.6935709 123.768017,47.5243876 123.001671,47.5243876 L117.658203,47.5243876 L117.688138,47.4641835 L117.658203,47.4641835 L117.658203,47.5243876 L117.658203,53.4685397 C115.937915,53.7986589 114.275503,54.2883189 112.68294,54.9194587 L112.68294,47.5243876 L111.66813,47.5243876 L84.7811535,47.5243876 L84.7811535,83.9970387 L95.275506,83.9970387 C95.4760732,85.715866 95.8273152,87.3905436 96.3282341,89 L82.293522,89 Z M14.3092368,44.2823964 L14.3092368,83.9970387 L29.3757223,83.9970387 L29.3757223,59.4668755 C29.3757223,58.0851913 30.4893191,56.9653949 31.8633538,56.9653949 L59.3390593,56.9653949 C60.7130941,56.9653949 61.8266909,58.0851913 61.8266909,59.4668755 L61.8266909,83.9980421 L79.8068883,83.9980421 L79.8068883,47.2554759 C79.7380369,47.2354078 79.6681877,47.2053058 79.5983384,47.1752037 C79.568403,47.1651697 79.5384676,47.1451017 79.5085322,47.1350677 C79.2999823,47.0347275 79.100413,46.9253567 78.9018415,46.8049485 C78.8519492,46.7648124 78.8020568,46.7347104 78.742186,46.6945743 C78.5336361,46.544064 78.3340668,46.3845231 78.1554523,46.2039108 C77.9758399,46.0243019 77.8171823,45.8236215 77.6675053,45.6139106 C77.617613,45.5446759 77.5776991,45.4844717 77.5377852,45.4142336 C77.4978714,45.3439955 77.447979,45.2737574 77.4080652,45.2035192 L76.1936859,43.0221238 L68.8006406,29.6236999 C65.9547822,24.4702283 61.4075953,20.3783559 56.0042561,18.0865862 C49.5950875,15.3753946 42.2219991,15.3352586 35.783893,17.976212 L35.3757738,18.1467903 C29.8427145,20.4074545 25.2057215,24.5505005 22.3099707,29.7932748 L15.0057337,43.0221238 L14.3092368,44.2823964 Z M56.85043,80.4429896 L56.85043,61.9693595 L38.5409431,61.9693595 L56.85043,80.4429896 Z M53.3469906,83.9950319 L34.3509853,64.8280512 L34.3509853,83.9950319 L53.3469906,83.9950319 Z M123.5,86 C120.462369,86 118,83.5373593 118,80.4994882 C118,77.4616172 120.462369,75 123.5,75 C126.537631,75 129,77.4626407 129,80.4994882 C129,83.5373593 126.537631,86 123.5,86 Z M150.492838,101.057274 C151.87766,101.057274 153,102.163588 153,103.528637 C153,104.893686 151.87766,106 150.492838,106 L81.5071621,106 C80.1223397,106 79,104.893686 79,103.528637 C79,102.163588 80.1223397,101.057274 81.5071621,101.057274 L109.532467,101.057274 C102.870838,96.759898 98.4629393,89.3785227 98.4629393,81.0058265 C98.4629393,67.7687188 109.471121,57 123.002555,57 C136.533989,57 147.543176,67.7697101 147.543176,81.0058265 C147.543176,89.3785227 143.134272,96.759898 136.472643,101.057274 L150.492838,101.057274 Z M105.483597,81.0068179 C105.483597,90.4273402 113.342991,98.0922333 123.002555,98.0922333 C132.663124,98.0922333 140.522519,90.4283315 140.522519,81.0068179 C140.522519,71.5853042 132.663124,63.9214024 123.002555,63.9214024 C113.342991,63.9214024 105.483597,71.5853042 105.483597,81.0068179 Z M71.5964506,101 C72.9245756,101 74,102.119134 74,103.5 C74,104.880866 72.9236111,106 71.5954861,106 L66.4045139,106 C65.0763889,106 64,104.880866 64,103.5 C64,102.119134 65.0763889,101 66.4045139,101 L71.5964506,101 Z",id:"Path-2","fill-rule":"nonzero"})))}}]),t}(n.Component),E=a(12),L=a.n(E),A=a(13),O=a.n(A),j=a(37),D=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.createElement("div",{className:"Header"},n.createElement("h1",null,"Das grosse Bauernsterben?"),n.createElement("p",null,"Immer wieder liest man davon, dass f\xfcr die Schweizer B\xe4uerinnen und Bauer die Existenz gef\xe4hrdet ist: F\xfcr viele Betriebe lohnt sich die Landwirtschft nicht mehr und sie verschwinden."),n.createElement("h2",null,"Gr\xf6ssenkategorien"),n.createElement("div",{className:"horizontal-container top"},n.createElement(k,{width:"80px",fill:"#4ec291"}),n.createElement(k,{width:"100px",fill:"#42a3f1"}),n.createElement(k,{width:"120px",fill:"#e396d1"})),n.createElement("div",{className:"horizontal-container bottom"},n.createElement("div",null,n.createElement("h3",null,"kleine H\xf6fe"),n.createElement("p",null,"Beuernh\xf6fe, die eine Betriebsfl\xe4che von weniger als 10 Hektare haben.")),n.createElement("div",null,n.createElement("h3",null,"mittlere H\xf6fe"),n.createElement("p",null,"Mittelgrosse H\xf6fe haben eine Fl\xe4che zwischen 10 und 30 Hektaren.")),n.createElement("div",null,n.createElement("h3",null,"grosse H\xf6fe"),n.createElement("p",null,"Die gr\xf6ssten Betriebe haben eine Fl\xe4che von 30 Hektaren oder mehr."))),n.createElement("h2",null,"Anbaum\xf6glichkeiten pro Hektar"),n.createElement("h3",null,"K\xfche"),n.createElement("p",null,"In der Schweiz reicht ein Hektar zum ern\xe4hren von rund 2 K\xfchen."),n.createElement("div",{className:"horizontal-container"},n.createElement("div",{className:"relations-container"},n.createElement("p",null,"In Kleinbetrieben k\xf6nnen demnach bis zu 20 K\xfche pro Hof gehalten werden."),this.printIcons("cowImg",L.a,20)),n.createElement("div",{className:"relations-container"},n.createElement("p",null,"Auf Grossbetrieben werden beachtliche Herden von 60 Tieren oder mehr gehalten."),this.printIcons("cowImg",L.a,60))),n.createElement("h3",null,"Weizen"),n.createElement("p",null,"Auf einem Hektar Ackerland k\xf6nnen 6 Tonnen Weizen angebaut werden."),n.createElement("div",{className:"horizontal-container"},n.createElement("div",{className:"relations-container"},n.createElement("p",null,"Kleinbetriebe reichen demnach um bis zu 60 Tonnen Weizen anzubauen."),this.printIcons("wheatImg",O.a,60)),n.createElement("div",{className:"relations-container"},n.createElement("p",null,"Grossbetriebe erm\xf6glichen den Anbau von \xfcber 180 Tonnen."),this.printIcons("wheatImg",O.a,180))))}},{key:"printIcons",value:function(e,t,a){for(var r=[],i=0;i<a;i++)r[i]=n.createElement(j.a,{src:t});return n.createElement("div",{className:e},r)}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentWillMount",value:function(){this.initData()}},{key:"render",value:function(){var e=this.state,t=e.reducedData,a=e.fullData,r=void 0!==t,i=void 0!==a;return n.createElement("div",{className:"App"},n.createElement(D,null),r?n.createElement(v,{data:t}):null,r&&i?n.createElement(C,{fullData:a,data:t}):null,i?n.createElement(z,{data:a}):null)}},{key:"initData",value:function(){var e=Object(o.a)(c.a.mark(function e(){var t,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.getFullData();case 2:t=e.sent,a=y.getReducedData(t),this.setState({reducedData:a,fullData:t});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),t}(n.Component);l.a.render(r.a.createElement(B,null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.206e2329.chunk.js.map