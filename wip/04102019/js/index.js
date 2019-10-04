document.addEventListener( 'mousemove', (event) => {this.onDocumentMouseMove(event)}, false );
document.addEventListener( 'mousedown', (event) => {this.onDocumentMouseDown(event)}, false );
document.addEventListener( 'mouseup', (event) => {this.onDocumentMouseUp(event)}, false );

img = "data:image/png;base64,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6NGj06ePf+MBAAAQ6JSlra0tK1asyIoVK7J69eq89dZbH3qbjo6OdHR05N13381f/vKXrF69+uDf1dfXZ8KECfn2t7+dsWPHGjAAAEA3uPx5gisWi3n++edz9dVX51Of+lQmT56cn//85yXF+Yf5xz/+kZ/97Gf54he/mPPOOy9PP/20gQMAAAh0/r+urq40Nzdn+PDhufjii/PEE0+kvb29x97eSy+9lAkTJuSrX/1qWlpaPAAAAAACvXfbt29fHnrooTQ0NGTatGl54403Pta3v3LlyowcOTLLly/3YAAAAAj03unZZ5/Nueeem1tuuSXbt28/au/HP//5zzQ1NWX+/PkeFAAAgBL5JXEnkMsuu+yYeV+KxWJmzpyZQqGQ22+/3YMDAADwIVxBp0d997vfzTPPPGMQAAAAAp2j6cCBA7nuuuuyc+dOwwAAAPgffIt7L3bqqadm3LhxGTt2bIYPH56zzjorgwYNSl1dXXbv3p133nkn27Zty4svvph169bld7/7Xfbv31/223n33XczY8aM/PKXvzR0AACAIyjMWtRZ7M4dzJ1abYrHyoNZKHzomdNOOy3f+MY3Mnny5IwePbqs+9+6dWvuv//+PPDAA9m7d2/Z79vmzZszYsQID9RhzG7uOqpv38cxHP8fxwDA8c+3uPcSF110UZYuXZqWlpbcc889Zcd5kgwbNiz33ntv/vCHP+Scc84p67bFYjH33nuvBwIAAECg907jx4/P73//+6xatSpf//rX07dv327f58iRI7Nhw4acd955Zd3uySefTFtbmwcFAABAoPceI0aMyOrVq/Pcc89lzJgxFb//QYMG5bnnnsuwYcNKvk1bW1tWrVrlwQEAABDoJ75Bgwbl4YcfzksvvZTGxsYefVtDhgzJfffdV9Zt1q5d60ECAAAQ6Ce2pqamvPbaa5k2bVr69Pl4HtqJEyfmggsuKPn8n//8Zw8UAACAQD+xPfnkk/nMZz7zsb/dSZMmlXx2y5YtHigAAACBTk/48pe/XPLZ1tZWAwMAABDo9IRTTz215LN79uwxMAAAAIFOT6ivry/5bL9+/QwMAABAoNMTynlt85NPPtnAAAAABDo94c033yz5bENDg4EBAAAIdHrCCy+8UPLZESNGGBgAAIBApycsWbKk5LPjx483MAAAAIFOpW3evDnr168v6ezAgQNzySWXGBoAAIBAp9K+//3vl3x2ypQpqa2tNTQAAACBTiX94he/yMqVK0s6W1NTk+985zuGBgAAINCppDfffDO33npryefvuOOOnH766QYHAAAg0KmU9957L1deeWXee++9ks4PHz48P/jBDwwOAABAoFMp7e3tueKKK/Lqq6+WdL5///554okn/Ow5AACAQKdS9u3bl6uvvjobNmwo+TbNzc0555xzDA8AAECgUwnFYjHXX399nnnmmZJvc/fdd+db3/qW4QEAAAh0KuW2227LY489VvL5m2++OXfeeafBAQAACHQq5Uc/+lEefPDBks9PnTo1CxcuNDgAAACBTqXMnz8/d999d8nnp02blocffjiFQsHwAAAABDqV8NOf/jQzZ84s+fyUKVPy0EMPiXMAAACBTqX88Ic/LOu1y6+55posXrxYnAMAAAh0KuXHP/5xfvKTn5R8/qqrrsojjzySPn2sEwAAgECnIhYuXJi77rqr5POXX355Hn/88fTt29fwAAAABDqVsGrVqtx2220lnx83blyWLFmSfv36GR4AAIBApxLefvvtfPOb38yBAwdKOn/GGWdk6dKlqa2tNTwAAACBTqXMmDEjO3fuLOlsTU1Nli5dmiFDhhgcAACAQKdSNm7cmF//+tcln58zZ05Gjx5tcAAAAAKdSrrvvvtKPjtmzJhMnz7d0AAAAAQ6lbRr164sW7as5PNz5szxWucAAAACnUpbv359Ojs7Szo7cuTIjB071tAAAAAEOpW2YcOGks9OnDjRwAAAAAQ6PeG1114r+eyoUaMMDAAAQKDTE1paWko+e8YZZxgYAACAQKcnvP322yWf/fSnP21gAAAAAp2e0NbWVvLZAQMGGBgAAIBApyd0dHSUfLampsbAAAAABDo94cCBAyWf7du3r4EBAAAIdI62QqFgCAAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAADwMagygt6tWCwaAgAAwDHAFXQAAAAQ6AAAAIBABwAAAIEOAAAACHQAAAAQ6AAAAIBABwAAgGOM10Hv5QqFQslnvWY6AABAz3EFHQAAAAQ6AAAAINABAABAoAMAAAACHQAAAAQ6AAAAINABAABAoAMAAAACHQAAAAQ6AAAAINABAABAoAMAAABHUmUEvVuxWDQEAACAY4Ar6AAAACDQAQAAAIEOAAAAAh0AAAAQ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";


//screenLog.init();
var viewport = new ViewPort();

var loader = new THREE.TextureLoader();
        this.loadedTexture;
        loader.load( img, ( texture ) => {
            this.loadedTexture = texture;
            addbg();
        });


function addbg(){
    var bggeometry = new THREE.PlaneGeometry( 1000, 600, 32 );
    var bgmaterial = new THREE.MeshBasicMaterial( {map:  this.loadedTexture, side: THREE.DoubleSide} );
    var bgplane = new THREE.Mesh( bggeometry, bgmaterial );
    bgplane.position.z = -300
    viewport.scene.add( bgplane );
}

//viewport.addEventListener("enterframe", enterframe);
//viewport.addEventListener("resize", resize)
var scaleUp = 50;
var pushout = 200;
var currentShape = new CompoundShape(2.5, 2.5, 2.5, Math.random());
viewport.scene.add(currentShape);
var currentShapeLine = currentShape.dlinemeshcontainer.clone();
viewport.scene.add(currentShapeLine);
currentShapeLine.scale.x = currentShapeLine.scale.y =currentShapeLine.scale.z = currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
//currentShape.rotation.y = currentShapeLine.rotation.y = 1.57079632679;
//currentShape.rotation.x = currentShapeLine.rotation.x = 1.57079632679;
//currentShape.position.x = currentShapeLine.position.x = scaleUp * -8;
currentShape.position.y = currentShapeLine.position.y = scaleUp *8;
currentShapeLine.position.z +=pushout;

var answerA = currentShape.mesh.clone();
viewport.scene.add(answerA);
answerA.scale.x = answerA.scale.y =answerA.scale.z = scaleUp;
answerA.position.y = scaleUp *-4;
answerA.position.x = scaleUp * -3;

var answerB = currentShape.mesh.clone();
viewport.scene.add(answerB);
answerB.scale.y =answerB.scale.z = scaleUp;
answerB.scale.x = -scaleUp;
answerB.position.y = scaleUp *-4;
answerB.position.x = scaleUp *0;

var answerC = currentShape.mesh.clone();
viewport.scene.add(answerC);
answerC.scale.x = answerC.scale.y =answerC.scale.z = scaleUp;
answerC.position.y = scaleUp *-4;
answerC.position.x = scaleUp *3;

var answerD = currentShape.mesh.clone();
viewport.scene.add(answerD);
answerD.scale.y =answerD.scale.z = scaleUp;
answerD.scale.x = -scaleUp;
answerD.position.y = scaleUp *-4;
answerD.position.x = scaleUp *6;

var answerBline = currentShape.dlinemeshcontainer.clone();
viewport.scene.add(answerBline);
answerBline.scale.y =answerBline.scale.z = scaleUp;
answerBline.scale.x = -scaleUp;
answerBline.position.y = scaleUp *-4;
answerBline.position.x = scaleUp *0;
answerBline.position.z +=pushout;

var answerCline = currentShape.dlinemeshcontainer.clone();
viewport.scene.add(answerCline);
answerCline.scale.x = answerCline.scale.y =answerCline.scale.z = scaleUp;
answerCline.position.y = scaleUp *-4;
answerCline.position.x = scaleUp *3;
answerCline.position.z +=pushout;



//console.log(answerA);
//answerA.children[1].children[0].children[0].material.color.setHex( 0xff0000 );
//answerA.children[1].children[0].children[0].material.transparent = true;
//answerA.children[1].children[0].children[0].material.opacity = 0.3;
//answerA.children[1].children[0].children[1].material.color.setHex( 0xff0000 );
//answerA.children[1].children[0].children[1].material.transparent = true;
//answerA.children[1].children[0].children[1].material.opacity = 0.3;
//answerA.children[1].children[0].children[2].material.color.setHex( 0xff0000 );
//answerA.children[1].children[0].children[2].material.transparent = true;
//answerA.children[1].children[0].children[2].material.opacity = 0.3;
//var answerB = currentShape.mesh.clone();
//viewport.scene.add(currentShapeLine);
//currentShapeLine.scale.x = currentShapeLine.scale.y =currentShapeLine.scale.z = currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
//currentShape.position.y = currentShapeLine.position.y = scaleUp *-4;
//
//var answerA = currentShape.mesh.clone();
//viewport.scene.add(currentShapeLine);
//currentShapeLine.scale.x = currentShapeLine.scale.y =currentShapeLine.scale.z = currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
//currentShape.position.y = currentShapeLine.position.y = scaleUp *-4;
//
//var answerA = currentShape.mesh.clone();
//viewport.scene.add(currentShapeLine);
//currentShapeLine.scale.x = currentShapeLine.scale.y =currentShapeLine.scale.z = currentShape.scale.x = currentShape.scale.y =currentShape.scale.z = scaleUp;
//currentShape.position.y = currentShapeLine.position.y = scaleUp *-4;




var currentShapeTop = currentShape.mesh.clone();

viewport.scene.add(currentShapeTop);
var currentShapeTopLine = currentShape.dlinemeshcontainer.clone();
viewport.scene.add(currentShapeTopLine);
currentShapeTopLine.scale.x = currentShapeTopLine.scale.y =currentShapeTopLine.scale.z = currentShapeTop.scale.x = currentShapeTop.scale.y =currentShapeTop.scale.z = scaleUp;
currentShapeTopLine.position.x = currentShapeTop.position.x = scaleUp * -8;
currentShapeTopLine.position.y = currentShapeTop.position.y = scaleUp * 4;
currentShapeTopLine.rotation.x = currentShapeTop.rotation.x = 1.57079632679;
currentShapeTopLine.position.z +=pushout;


var currentShapeSide = currentShape.mesh.clone();
viewport.scene.add(currentShapeSide);
var currentShapeSideLine = currentShape.dlinemeshcontainer.clone();
viewport.scene.add(currentShapeSideLine);
currentShapeSideLine.scale.x = currentShapeSideLine.scale.y =currentShapeSideLine.scale.z = currentShapeSide.scale.x = currentShapeSide.scale.y =currentShapeSide.scale.z = scaleUp;
currentShapeSideLine.position.x = currentShapeSide.position.x = scaleUp * -3;
currentShapeSideLine.rotation.y = currentShapeSide.rotation.y = -1.57079632679;
currentShapeSideLine.position.z +=pushout


var currentShapeAnimated = currentShape.mesh.clone();
currentShapeAnimated.scale.x = currentShapeAnimated.scale.y =currentShapeAnimated.scale.z = scaleUp;
viewport.scene.add(currentShapeAnimated);
currentShapeAnimated.position.x = scaleUp * -3;

var currentShapeAnimatedLines = currentShape.dlinemeshcontainer.clone();
currentShapeAnimatedLines.scale.x = currentShapeAnimatedLines.scale.y =currentShapeAnimatedLines.scale.z = scaleUp;
viewport.scene.add(currentShapeAnimatedLines);
currentShapeAnimatedLines.position.x = scaleUp * -3;
currentShapeAnimatedLines.position.y = currentShapeAnimated.position.y = scaleUp * 4;
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
