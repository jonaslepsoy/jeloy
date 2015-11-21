var socket = io('localhost:8000');

$('button').on('click', function(event){
  join();
});

function join() {
  socket.emit('player','join');
}

socket.on('player', function(msg){
  console.log(msg);
});
