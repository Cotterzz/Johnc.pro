document.addEventListener( 'mousemove', (event) => {this.onDocumentMouseMove(event)}, false );
document.addEventListener( 'mousedown', (event) => {this.onDocumentMouseDown(event)}, false );
document.addEventListener( 'mouseup', (event) => {this.onDocumentMouseUp(event)}, false );
//screenLog.init();
var viewport = new ViewPort();
//viewport.addEventListener("enterframe", enterframe);
//viewport.addEventListener("resize", resize)
var scaleUp = 25;
var currentShape = new CompoundShape();
viewport.scene.add(currentShape);
currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
currentShape.position.x = scaleUp * -2;

var currentShapeTop = currentShape.mesh.clone();
currentShapeTop.scale.x = currentShapeTop.scale.y =currentShapeTop.scale.z = scaleUp;
viewport.scene.add(currentShapeTop);
currentShapeTop.position.x = scaleUp * -2;
currentShapeTop.position.y = scaleUp * 8;
currentShapeTop.rotation.x = 1.57;

var currentShapeSide = currentShape.mesh.clone();
currentShapeSide.scale.x = currentShapeSide.scale.y =currentShapeSide.scale.z = scaleUp;
viewport.scene.add(currentShapeSide);
currentShapeSide.position.x = scaleUp * 8;
currentShapeSide.rotation.y = 1.57;

var currentShapeAnimated = currentShape.mesh.clone();
currentShapeAnimated.scale.x = currentShapeAnimated.scale.y =currentShapeAnimated.scale.z = scaleUp;
viewport.scene.add(currentShapeAnimated);
currentShapeAnimated.rotation.y = 1.57;
currentShapeAnimated.rotation.x = 1.57;
currentShapeAnimated.position.x = scaleUp * 8;
currentShapeAnimated.position.y = scaleUp * 8;





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
