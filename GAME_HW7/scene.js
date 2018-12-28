/*
function sceneDesign() {

  // add obstacles to the scene
  scene.obstacles = [];
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(150,0,150), 50) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(-100,0,200), 30) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(0,0,-100), 60) )
    
  scene.targets = [];
  scene.targets.push (new Target (1, new THREE.Vector3 (300,0,300) ));
  scene.targets.push (new Target (2, new THREE.Vector3 (-200,0,150) ));
  scene.targets.push (new Target (3, new THREE.Vector3 (250,0,-200) ));
  scene.targets.push (new Target (4, new THREE.Vector3 (0,0,-200) ));

}
*/

function sceneFromJSON () {
  const JSONStr = '{"obstacles":[{"center":{"x":-200,"y":5,"z":-60},"size":40},{"center":{"x":-200,"y":5,"z":210},"size":40},{"center":{"x":5,"y":5,"z":-160},"size":40},{"center":{"x":-220,"y":5,"z":80},"size":40},{"center":{"x":6,"y":5,"z":250},"size":40}],"targets":[{"id":0,"pos":{"x":-170,"y":5,"z":-121}},{"id":1,"pos":{"x":173,"y":5,"z":-163}},{"id":2,"pos":{"x":248,"y":5,"z":263}},{"id":3,"pos":{"x":-237,"y":5,"z":281}}]}';
  
  let myScene = JSON.parse (JSONStr);
  
  scene.obstacles = []
  myScene.obstacles.forEach (function (obs) {
  	scene.obstacles.push (new Obstacle (new THREE.Vector3 (obs.center.x, obs.center.y, obs.center.z), 30))
  })
  
  scene.targets = []
  myScene.targets.forEach (function (tt) {
  	scene.targets.push (new Target (tt.id, new THREE.Vector3 (tt.pos.x, tt.pos.y, tt.pos.z) ))
  })

}