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
  $('#capbutton').removeClass("hidden");
});

socket.on('beacons', function(beacons){
  $.each(beacons, function(beaconName,beacon){
    drawChart(beaconName,beacon);
  });
});

socket.on('teams', function(teams){
   $('#redheader').text("Red: "  + teams.red.score);
   $('#blueheader').text("Blue: "  + teams.red.score);
   $('#red').empty();
   $('#blue').empty();
   $.each(teams.red.players, function(){
     $('#red').append('<div>' + this + '</div>');
   });
   $.each(teams.blue.players, function(){
     $('#blue').append('<div>' + this + '</div>');
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
    legend: 'none',
    slices: {
      0: { color: 'blue' },
      1: { color: 'grey' },
      2: { color: 'red' }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById(beaconName.split(' ', 1)[0]));
  chart.draw(data, options);
}

$(document).ready(function(){
  socket.emit('list teams');

  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);



});
