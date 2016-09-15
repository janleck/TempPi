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

function refreshNow() {
	getInfos('now', function(r){
		$('#temp').text(r.T);
		$('#zeit').text(r.Z);
		$('#humm').text(r.H);
	});
}

function refreshHours() {
	getInfos('hours', function(r){
		$('#temp').text("");
		$('#zeit').text("Durchschnitt der Stunde");
		$('#humm').text("");
	});
}