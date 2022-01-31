// Disha

// var fbRef = firebase.database().ref();
// console.log(fbRef,'fireeee--->');

var fbRef = new Firebase(
  "https://multiplayer3js-default-rtdb.firebaseio.com/data"
);

// let fbRef ;
// const fbRef = getDatabase();

// const fbRef=new firebase("multithree-1b162.firebaseapp.com/data");
// console.log(fbRef,'fb====>');

// db = 


// disha

var otherPlayers = {};

var playerID;
var player;

function loadGame() {
  // load the environment
  loadEnvironment();
  // load the player

  initMainPlayer();

    listenToOtherPlayers();

    window.onunload = function () {
      fbRef.child("Players/" + playerID).remove();
    };

    window.onbeforeunload = function () {
      fbRef.child("Players/" + playerID).remove();
    };
}

function listenToPlayer(playerData) {
  if (playerData.val()) {
    otherPlayers[playerData.key()].setOrientation(
      playerData.val().orientation.position,
      playerData.val().orientation.rotation
    );
  }
}

function listenToOtherPlayers() {
  // when a player is added, do something
  fbRef.child("Players").on("child_added", function (playerData) {
    if (playerData.val()) {
      if (playerID != playerData.key() && !otherPlayers[playerData.key()]) {
        otherPlayers[playerData.key()] = new Player(playerData.key());
        otherPlayers[playerData.key()].init();
        fbRef.child("Players").child(playerData.key()).on("value", listenToPlayer);
      }
    }
  }); 

// when a player is removed, do something

//   fbRef.child("Players").on("child_removed", function (playerData) {
//     if (playerData.val()) {
//       fbRef.child("Players").child(playerData.key).off("value", listenToPlayer);
//       scene.remove(otherPlayers[playerData.key].mesh);
//       delete otherPlayers[playerData.key];
//     }
//   });
}
// var newRef = firebase.database()
// console.log(newRef,"reffffff----");
function initMainPlayer() {
  playerID = fbRef.child("Players").push().key();
  console.log(playerID,'iddd--');
  

 
  fbRef
    .child("Players")
    .child(playerID)
    .child("orientation")
    .set({
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    });

  player = new Player(playerID);
  player.isMainPlayer = true;
  player.init();
}
 // fbRef.child( "Players/" + playerID ).set({
  // 	isOnline: true,
  // 	orientation: {

function loadEnvironment() {
  var sphere_geometry = new THREE.SphereGeometry(1);
  var sphere_material = new THREE.MeshNormalMaterial();
  var sphere = new THREE.Mesh(sphere_geometry, sphere_material);

  scene.add(sphere);
}
