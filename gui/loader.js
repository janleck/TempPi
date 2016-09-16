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
				temperaturen = response.Tmax;
				feuchtigkeiten = response.Hmax;
				labels = response.Labels;
				myChart.data.datasets[0].data = temperaturen;
				myChart.data.datasets[1].data = feuchtigkeiten;
				myChart.labels = labels;
			},
		error:function(jqXHR, status, data){console.log(status);},
		})
		.done(function(response,status,jqXHR){
				chart.update()
				}
	);
}

function refreshNow() {
	getInfos('now', function(r){
		$('#temp').text(r.T);
		$('#zeit').text(r.Z);
		$('#humm').text(r.H);
	});
}

function refreshHours() {
	getInfos('hours', function(r){
		for (var index = 0; index < 24; index++) {
			d[index] = r.T[index];
		}
	});
	return d;
}