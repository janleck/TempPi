function getInfos(dir, callback){
	var r = $.ajax({
		url:'http://temppi:8080/'+dir,
		type:'get',
		crossDomain:true,
		timeout:4000,
		success:function(response,status,jqXHR){console.log("erfolgreich:");callback(response)},
		error:function(jqXHR, status, data){console.log(status);},
		})
		.done(function(response,status,jqXHR){
				console.log('Done!');
				}
			);
}

function refreshChart(dir,chart){
	// Aktualisiert die letzten 14 Stunden
	var r = $.ajax({
		url:'http://temppi:8080/'+dir,
		type:'get',
		crossDomain:true,
		timeout:4000,
		success:function(response,status,jqXHR){
				if (!response || response==""){return false;}
				r = JSON.parse(response);
				var d = {}; var labels = [];
				var items = 0; var maxI = 14
				for (var i=23; i > 0; i--) {
					if (i in r && items < maxI){
						items++;
						d[i] = r[i];
						labels.push(i);
					}
				}
				labels = labels.sort();
				var temps = []; var humms = []; var l;
				for (i in labels){
					if (labels[i] < l){
						labels[i] = "-";
						temps.push(0);
						humms.push(0);
					}else{
						l = labels[i];
						temps.push(d[l]["T"]);
						humms.push(d[l]["H"]);
					}
				}
				chart.data.datasets[0].data = temps;
				chart.data.datasets[1].data = humms;
				chart.data.labels = labels;
				console.log(labels,temps,humms)
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
	getInfos('days', function(r){
		var d = {};
	});
	return d;
}