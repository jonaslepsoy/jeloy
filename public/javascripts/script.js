var socket;

if(window.location.hostname === 'localhost'){
  socket = io('localhost:8080');
} else {
  socket = io('http://' + window.location.hostname);
}

function join() {
  socket.emit('join');
}

function cap(element) {
  beaconName = $(element).prev().val();
  socket.emit('cap',beaconName);
}

function reset() {
  console.log('Resetting game');
  socket.emit('reset game');
}

socket.on('joined', function(msg){
  console.log(msg);
  $('#rolelabel').text(msg.role);
  $('#capbutton').removeClass("hidden");
});

socket.on('beacons', function(beacons){
  $.each(beacons, function(beaconName,beacon){
    if (beacon.cappedby == 1) {
      $('#'+beaconName.replace(/\s/g, '')).parent().css('color', 'red');
    } else if (beacon.cappedby == -1) {
      $('#'+beaconName.replace(/\s/g, '')).parent().css('color', 'blue');
    } else {
      $('#'+beaconName.replace(/\s/g, '')).parent().css('color', 'black');
    }
    $('#'+beaconName.replace(/\s/g, '')).text(beacon.score);
    drawChart(beaconName,beacon);
  });
});

socket.on('teams', function(teams){
   $('#redheader').text("Red: "  + teams.red.score + "/200");
   $('#blueheader').text("Blue: "  + teams.blue.score + "/200");
   $('#red').empty();
   $('#blue').empty();
   $.each(teams.red.players, function(){
     $('#red').append('<div class="col-xs-4"><img src="https://robohash.org/' + this + '?set=set3&size=200x200"/></div>');
   });
   $.each(teams.blue.players, function(){
     $('#blue').append('<div class="col-xs-4"><img src="https://robohash.org/' + this + '?set=set3&size=200x200"/></div>');
   })
});

function drawChart(beaconName, beacon) {
  // Red is positive
  // Blue is negative
  var redScore = beacon.score < 0 ? 0 : beacon.score;
  var greyScore = beacon.score < 0 ? 100 + beacon.score : 100 - beacon.score;
  var blueScore = -beacon.score < 0 ? 0 : -beacon.score;
  var data = google.visualization.arrayToDataTable([
    ['Team', 'Score'],
    ['Blue', blueScore],
    ['Grey', greyScore],
    ['Red', redScore]
  ]);

  var options = {
    backgroundColor: 'transparent',
    legend: 'none',
    slices: {
      0: { color: 'blue' },
      1: { color: 'grey' },
      2: { color: 'red' }
    }
  };

  if(beaconName.split){
    var chart = new google.visualization.PieChart(document.getElementById(beaconName.replace(/\s/g, '')));
    chart.draw(data, options);
  }
}

$(document).ready(function(){
  google.load("visualization", "1", {packages:["corechart"]});
});
