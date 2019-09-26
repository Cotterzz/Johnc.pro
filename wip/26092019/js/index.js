document.addEventListener( 'mousemove', (event) => {this.onDocumentMouseMove(event)}, false );
document.addEventListener( 'mousedown', (event) => {this.onDocumentMouseDown(event)}, false );
document.addEventListener( 'mouseup', (event) => {this.onDocumentMouseUp(event)}, false );
//screenLog.init();
var viewport = new ViewPort();
//viewport.addEventListener("enterframe", enterframe);
//viewport.addEventListener("resize", resize)
var scaleUp = 25;
var pushout = 200;
var currentShape = new CompoundShape(3, 3, 3, Math.random());
viewport.scene.add(currentShape);
var currentShapeLine = currentShape.dlinemesh.clone();
viewport.scene.add(currentShapeLine);
currentShapeLine.scale.x = currentShapeLine.scale.y =currentShapeLine.scale.z = currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
currentShape.position.x = currentShapeLine.position.x = scaleUp * -2;
currentShape.rotation.y = currentShapeLine.rotation.y = 1.57079632679;
currentShape.rotation.x = currentShapeLine.rotation.x = 1.57079632679;
currentShape.position.x = currentShapeLine.position.x = scaleUp * 8;
currentShape.position.y = currentShapeLine.position.y = scaleUp * 8;
currentShapeLine.position.z +=pushout;


var currentShapeTop = currentShape.mesh.clone();

viewport.scene.add(currentShapeTop);
var currentShapeTopLine = currentShape.dlinemesh.clone();
viewport.scene.add(currentShapeTopLine);
currentShapeTopLine.scale.x = currentShapeTopLine.scale.y =currentShapeTopLine.scale.z = currentShapeTop.scale.x = currentShapeTop.scale.y =currentShapeTop.scale.z = scaleUp;
currentShapeTopLine.position.x = currentShapeTop.position.x = scaleUp * -2;
currentShapeTopLine.position.y = currentShapeTop.position.y = scaleUp * 8;
currentShapeTopLine.rotation.x = currentShapeTop.rotation.x = 1.57079632679;
currentShapeTopLine.position.z +=pushout;


var currentShapeSide = currentShape.mesh.clone();
viewport.scene.add(currentShapeSide);
var currentShapeSideLine = currentShape.dlinemesh.clone();
viewport.scene.add(currentShapeSideLine);
currentShapeSideLine.scale.x = currentShapeSideLine.scale.y =currentShapeSideLine.scale.z = currentShapeSide.scale.x = currentShapeSide.scale.y =currentShapeSide.scale.z = scaleUp;
currentShapeSideLine.position.x = currentShapeSide.position.x = scaleUp * 8;
currentShapeSideLine.rotation.y = currentShapeSide.rotation.y = 1.57079632679;
currentShapeSideLine.position.z +=pushout


var currentShapeAnimated = currentShape.mesh.clone();
currentShapeAnimated.scale.x = currentShapeAnimated.scale.y =currentShapeAnimated.scale.z = scaleUp;
viewport.scene.add(currentShapeAnimated);
currentShapeAnimated.position.x = scaleUp * -2;

var currentShapeAnimatedLines = currentShape.dlinemesh.clone();
currentShapeAnimatedLines.scale.x = currentShapeAnimatedLines.scale.y =currentShapeAnimatedLines.scale.z = scaleUp;
viewport.scene.add(currentShapeAnimatedLines);
currentShapeAnimatedLines.position.x = scaleUp * -2;
currentShapeAnimatedLines.position.z +=pushout;



//this.orbitcontrols = new THREE.OrbitControls(currentShapeAnimated);

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
function onDocumentMouseDown(e) {
    isDragging = true;
}
function onDocumentMouseUp(e) {
    isDragging = false;
};


function onDocumentMouseMove(e){
	var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                (deltaMove.y * 1)/57,
                (deltaMove.x * 1)/57,
                0,
                'XYZ'
            ));
        
        currentShapeAnimated.quaternion.multiplyQuaternions(deltaRotationQuaternion, currentShapeAnimated.quaternion);
        currentShapeAnimatedLines.quaternion.multiplyQuaternions(deltaRotationQuaternion, currentShapeAnimatedLines.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
}



function resize(){

}

function enterframe(){

}
