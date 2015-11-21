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
  $('#cap').after('<button class="btn btn-default" onclick="event.preventDefault();window.cap(this)">Cap</button>');
});

socket.on('beacons', function(beacons){
  console.log(beacons);
});

socket.on('teams', function(teams){
  /*teams = {
     "red":  {
       "score": 0,
       "players": []
     },
     "blue": {
       "score": 0,
       "players": []
     }
   };*/
   $('#red').empty();
   $('#blue').empty();
   $.each(teams.red.players, function(){
     $('#red').append('<div>' + this + '</div>');
   });
   $.each(teams.blue.players, function(){
     $('#blue').append('<div>' + this + '</div>');
   })
});

$(document).ready(function(){
  socket.emit('list teams');
});
