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

socket.on('joined', function(msg){
  console.log(msg);
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
     $('#red').append('<div>' + this + ' <input type="text"/><button class="btn btn-default" onclick="cap(this)">Cap</button></div>');
   });
   $.each(teams.blue.players, function(){
     $('#blue').append('<div>' + this + ' <input type="text"/><button class="btn btn-default" onclick="cap()">Cap</button></div>');
   })
});

$(document).ready(function(){
  socket.emit('list teams');
});
