var app = require('http').Server();
var io = require('socket.io')(app);

var teams = {};
var beacons = {};

// Init teams and the server
function init() {
   teams = {
    "red":  {
      "score": 0,
      "players": []
    },
    "blue": {
      "score": 0,
      "players": []
    }
  };

  beacons['Buenos Aires'] = {score: 0, cappers: []};
  beacons['Lima'] =         {score: 0, cappers: []};
  beacons['Santiago'] =     {score: 0, cappers: []};
  beacons['Shanghai'] =     {score: 0, cappers: []};

  console.log(beacons);

  /*
  // Set up Socket.IO to listen on port 8000
	socket = io.listen(8000);

	// Start listening for events
	setEventHandlers();*/
}

// Init game state
init();

// Listen to port 8000
app.listen(8000);

// On new connections
io.on('connection', function (socket) {
  console.log('Got a connection');

  socket.on('join', function () {
    var id = socket.id;
    if(teams.red.players.length > teams.blue.players.length) {
      console.log('A player have joined the blue team');
      teams.blue.players.push(id);
      socket.emit('joined',{'msg': 'joined team blue'});
    } else {
      console.log('A player have joined the red team');
      teams.red.players.push(id);
      socket.emit('joined',{'msg': 'joined team red'});
    }
    io.sockets.emit('teams',teams);
  });

  socket.on('cap', function (beaconName) {
    console.log(socket.id, beaconName);
    beacons[beaconName].cappers.push(socket.id);
    console.log(beacons);
  });

  socket.on('list teams', function () {
    io.sockets.emit('teams',teams);
  });

});

// Main game loop
setInterval(update,1000)

function update(){
  var t = new Date();

  for (var beacon in beacons){
    console.log(beacon);
    var blue = 0;
    var red = 0;
    for(var i = 0;i < beacons[beacon].cappers.length;i++){
      console.log(beacons[beacon].cappers[i]);
      console.log('Red: ', teams.red.players.indexOf(beacons[beacon].cappers[i]) > -1);
      console.log('Blue: ', teams.blue.players.indexOf(beacons[beacon].cappers[i]) > -1);

      if(teams.red.players.indexOf(beacons[beacon].cappers[i]) > -1){
        red++;
      }
      if (teams.blue.players.indexOf(beacons[beacon].cappers[i]) > -1){
          blue++;
      }
    }
    if(red > blue){
      beacons[beacon].score++;
    } else if (red < blue) {
      beacons[beacon].score--;
    }
    console.log('Score for ' + beacon + ' is ' + beacons[beacon].score);

    // We have counted the score for this tick, reset cap
    beacons[beacon].cappers = [];
  }

  // We are done, emit status to all clients
  io.sockets.emit('beacons',beacons);

}


/*
var setEventHandlers = function() {
	// Socket.IO must do stuff
	socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
	console.log("New player has connected: " + client.id);

	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);

	// Listen for new player message
	//client.on("new player", onNewPlayer);
  client.on("new player", function (socket){
    var id = uuid.v1();
    if(teams.red.players.length > teams.blue.players.length) {
      console.log('A player have joined the blue team');
      teams.blue.players.push(id);
      socket.broadcast.emit('player',{'msg': 'joined team blue','id': id});
    } else {
      console.log('A player have joined the red team');
      teams.red.players.push(id);
      socket.broadcast.emit('player',{'msg': 'joined team red','id': id});
    }
    socket.broadcast.emit('teams',{'teams': teams});
    console.log(teams);
  });

  // Listen for list beacons request
  client.on("list beacons", listBeacons);
};

// Socket client has disconnected
function onClientDisconnect() {
	console.log("Player has disconnected: "+this.id);

	var removePlayer// = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+this.id);
		return;
	};

	// Remove player from players array
	// TODO: Remove player from team
  //players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	//this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
  var id = uuid.v1();
  if(teams.red.players.length > teams.blue.players.length) {
    console.log('A player have joined the blue team');
    teams.blue.players.push(id);
    this.broadcast.emit('player',{'msg': 'joined team blue','id': id});
  } else {
    console.log('A player have joined the red team');
    teams.red.players.push(id);
    this.broadcast.emit('player',{'msg': 'joined team red','id': id});
  }
  console.log(teams);
}

// Client wishes to list beacons
function listBeacons(msg){
    this.broadcast.emit('list beacons',beacons);
    console.log(beacons);
}

// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};

	return false;
};

init();
*/
