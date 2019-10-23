class TFEObject extends THREE.Object3D{
	constructor(){
		super();
		this.defaultLineColor = global.black;
		this.defaultFaceColor = global.green;
	}

	createPanel(width, height){
		var geometry = new THREE.PlaneGeometry( width, height, 2 );
		var material = new THREE.MeshBasicMaterial( {color: this.defaultFaceColor , side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		return( plane );
	}

	createLine(length, altline = false){
		var material;
		if(altline){
			material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3, color: this.defaultLineColor ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
		} else {
			material = new THREE.LineBasicMaterial({ color: this.defaultLineColor });
		}

		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( 0, length, 0 )
		);
		var line = new THREE.Line( geometry, material );
		line.computeLineDistances();
		return( line );
	}

	orientLinetoZ(object){
		object.rotation.x = global.ETA;
	}

	orientLinetoX(object){
		object.rotation.z = global.ETA;
	}

	orientPlanetoXZ(object){
		object.rotation.x = global.ETA;
	}

	orientPlanetoYZ(object){
		object.rotation.y = global.ETA;
	}
}