/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agentJ,agentK;
var hit = 0;

// program starts here ...
init();
animate();

function init() {

  initThree();
  
  //scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 400;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
  scene.add(gridXZ);

  // in scene.js
  sceneFromJSON ( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
//    agent = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), mesh);
    agentJ = new Agent(randomStart(), size);
	agentK = new Agent(randomStart(), size);
	
	agentJ.setEnrmy(agentK);
	agentK.setEnrmy(agentJ);

}

function randomStart() {
	var pos = new THREE.Vector3();
	var done = false;
	
	do{
		pos.x = -400 + Math.random()*800; pos.y = 0;
		pos.z = -400 + Math.random()*800;
		for(var i = 0; i < scene.obstacles.length; i++){
			if(scene.obstacles[i].center.distanceTo(pos) < scene.obstacles[i].size)
				break;
		}
		if(i === scene.obstacles.length)
			done = true;
	}while(! done);
	return pos;
}

function startTimer(display) {
    var timer = 0, minutes, seconds;
	var star = null;
	var countTime = function (){
		if (scene.targets.length > 0) {
			console.log("12356");
			if(hit === 1){
				timer += 5;
				hit += 1;
			}
			timer++;
		}
		else {
			console.log("stop")
			alert("AgentJ : Cost " + minutes + ":" + seconds + " time!!" + "The score is " + agentJ.score + "\nAgentK : Cost " + minutes + ":" + seconds + " time!!" + "The score is " + agentK.score);
			clearInterval(star);
		}
		minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    };
    star = setInterval(countTime, 1000);
	
}
window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(display);
};

function animate() {

  agentJ.update(0.01);
  agentK.update(0.01);
  
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentJ)} );
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentK)} );
//if (scene.targets.length > 0)
  	requestAnimationFrame(animate);
 /* else
  	alert ('game over')*/

  render();
}

function render() {
  renderer.render(scene, camera);
}

