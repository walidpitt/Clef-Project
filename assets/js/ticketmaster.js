
var urlA = "https://app.ticketmaster.com/discovery/v2/attractions.json?classificationName=music&";
var urlB = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&";
var apiKey = "&apikey=UViYY1Bd5dOAhrZqbTiMxdQqBMQlycpV";
var artistID = "";




$("#artist-search").submit(function(event) {
	var queryA = "keyword=";
	event.preventDefault();
	queryA += $("input").val();
	$.ajax({
		type:"GET",
		url: urlA + queryA + apiKey,
		async:true,
		dataType: "json",
		success: function(jsonA) {
			console.log(jsonA._embedded.attractions[0].id);
			artistId = jsonA._embedded.attractions[0].id;
			  // Parse the response.
			  // Do other things.
			  var queryB = "attractionId=";
			  event.preventDefault();
			  $("#ticket-results").empty();
			  queryB += artistId;
			  $.ajax({
			  	type:"GET",
			  	url: urlB + queryB + apiKey,
			  	async:true,
			  	dataType: "json",                                                 
			  	success: function(json) {
			  		var i = 0;
			  		console.log(json);
			  		for (i = 0; i < 3; i++) {
			  			$("#ticket-results").append("<div class=col s12 m7><div class=card><div class=card-image><img src=" + json._embedded.events[i].images[i].url + "><span class=card-title>"+ json._embedded.events[i]._embedded.venues[0].name +"</span></div><div class=card-content><span class=event id=event-" + i + "><h6>" + json._embedded.events[i].name + "</h6><p> " + json._embedded.events[i]._embedded.venues[0].name + ": " + json._embedded.events[i].dates.start.localDate + "</p><p>" + json._embedded.events[i]._embedded.venues[0].city.name + "," + json._embedded.events[i]._embedded.venues[0].country.country + "</p></span><div class=card-action><a href=" + json._embedded.events[i].url + ">Get Tickets</a></div></div></div>");

			  // This time, we do not end up here
			};
		},
		error: function(xhr, status, err) {
			  // This time, we do not end up here!
			}
		});
			},
			error: function(xhr, status, err) {
			  // This time, we do not end up here!
			}
		});
});
