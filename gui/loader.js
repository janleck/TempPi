function getInfos(dir, callback){
	var r = $.ajax({
		url:'http://temppi:8080/'+dir,
		type:'get',
		crossDomain:true,
		timeout:4000,
		success:function(response,status,jqXHR){callback(response)},
		error:function(jqXHR, status, data){console.log(status);},
		})
}

function refreshChart(dir,chart){
	// Aktualisiert die letzten 14 Stunden
	var r = $.ajax({
		url:'http://temppi:8080/'+dir,
		type:'get',
		crossDomain:true,
		timeout:4000,
		success:function(response,status,jqXHR){
				if (!response || response.responseText==""){return false;}
				var r = JSON.parse(response);
				var a = splitDict(r);
				chart.data.datasets[0].data = a["temps"];
				chart.data.datasets[1].data = a["humms"];
				chart.data.labels = a["labels"];
			},
		error:function(jqXHR, status, data){console.log(status);},
		})
		.done(function(response,status,jqXHR){
				chart.update();
				}
	);
}

function resetChart(chart) {
	chart.data.labels = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-",];
	chart.data.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	chart.data.datasets[1].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	chart.update();
}

function refreshNow() {
	getInfos('now', function(r){
		$('#temp').text(r.T+"°C");
		$('#messpkt').text(r.Z+" Uhr");
		$('#humm').text(r.H+"%");
	});
}

function refreshDays() {
	getInfos('maxday', function(r){
		var result = JSON.parse(r);
		var a = splitDict(result);
		a['labels'] = sort_days(a['labels']); 
		var t = ["labels", "temps", "humms"];
		var els, wert;
		for (var i=0;i<t.length;i++){
			label = t[i];
			els = $('#tbl_'+label+' td')
			for (var i2=0;i2<els.length;i2++){
				wert = Math.round(a[label][i2]*100)/100 || a[label][i2]
				els[i2].innerText = String(wert);
				if (label == "temps") {els[i2].innerText += "°C"}
				if (label == "humms") {els[i2].innerText += "%"}
			}
		}
	});
}

function splitDict(dictO) {
	var labels = [];
	for(var k in dictO) labels.push(k);
	var temps = []; var humms = [];
	for (var i=0; i<labels.length;i++){
		temps.push(dictO[labels[i]]["T"]);
		humms.push(dictO[labels[i]]["H"]);
	}
	return {"labels":labels, "temps":temps, "humms":humms}
}

function sort_days(days) {
	var day_of_week = new Date().getDay();
	var list = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	var sorted_list = list.slice(day_of_week).concat(list.slice(0,day_of_week));
	return days.sort(function(a,b) { return sorted_list.indexOf(a) > sorted_list.indexOf(b); });
}