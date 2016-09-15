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


function refreshMaximums(){
	getInfos('now', function(r) {
		global temperaturen = [1,2,3,4]; // r.
		global feuchtigkeiten = [2,3,4,2]; // r.
	})
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