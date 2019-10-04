		//this.xs = [-2.1-Math.random()*0.5,-1-Math.random()*1, 0, 1+Math.random()*1, 2.1+Math.random()*0.5];
		//this.ys = [ 0, 1+Math.random()*1, 2.1+Math.random()*1, null];
		//this.ys[3] = this.ys[2] + +Math.random()*0.5;
		//this.zs = [-2.1-Math.random()*0.5,-1-Math.random()*1, 0, 1+Math.random()*1, 2.1+Math.random()*0.5];

class CompoundShape extends THREE.Object3D{
	constructor(width, height, depth){

		super();
		this.height = height;
		this.width = width;
		this.depth = depth;
		this.mesh = new THREE.Mesh();
		this.mesh1 = new THREE.Mesh();
		this.mesh2 = new THREE.Mesh();
		this.add( this.mesh );
		this.mesh.add( this.mesh1 );
		this.mesh.add( this.mesh2 );
		this.singleGeometry = new THREE.Geometry();
		this.create();
	}

	create(){
		
		this.createBottom();
		//this.createTop();
		//this.createLeft();
		//this.createRight();
		//this.createFront();
		//this.createBack();

		var material = new THREE.MeshBasicMaterial( { color: 0xcccccc , side: THREE.DoubleSide} );
		var mesh = new THREE.Mesh(this.singleGeometry, material);
		var edges = new THREE.EdgesGeometry( this.singleGeometry , -1000);
		var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		this.mesh1.add(mesh);
		this.mesh2.add(line);
	}

	createBottom(){
		var meshTemp = this.meshbottom;
		meshTemp = new THREE.Mesh(this.createGeometries(this.width, this.depth, this.height/2));
		meshTemp.position.y = this.height/2;
		meshTemp.position.x = this.width/-2;
		meshTemp.position.z = this.depth/2;
		meshTemp.rotation.x = 1.57;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createTop(){
		var meshTemp = this.meshtop;
		//meshTemp = new THREE.Mesh(this.createPlainSide(this.width, this.depth));
		meshTemp = new THREE.Mesh(this.createVariedSide(this.width, this.depth, this.height/2));
		meshTemp.position.y = this.height;
		meshTemp.position.x = this.width/-2;
		meshTemp.position.z = this.depth/2;
		meshTemp.rotation.x = 1.57;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createFront(){
		var meshTemp = this.meshfront;
		meshTemp = new THREE.Mesh(this.createPlainSide(this.width, this.height));
		meshTemp.position.y = this.height/2;
		meshTemp.position.z = this.depth/2;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createBack(){
		var meshTemp = this.meshback;
		meshTemp = new THREE.Mesh(this.createPlainSide(this.width, this.height));
		meshTemp.position.y = this.height/2;
		meshTemp.position.z = this.depth/-2;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createLeft(){
		var meshTemp = this.meshleft;
		meshTemp = new THREE.Mesh(this.createPlainSide(this.depth, this.height));
		meshTemp.position.x = this.width/-2;
		meshTemp.position.y = this.height/2;
		meshTemp.rotation.y = -1.57;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createRight(){
		var meshTemp = this.meshright;
		meshTemp = new THREE.Mesh(this.createPlainSide(this.depth, this.height));
		meshTemp.position.x = this.width/2;
		meshTemp.position.y = this.height/2;
		meshTemp.rotation.y = 1.57;
		meshTemp.updateMatrix();
		this.singleGeometry.merge(meshTemp.geometry, meshTemp.matrix);
	}

	createPlainSide(width, height){
		return (new THREE.PlaneGeometry(width, height, 2, 2));
	}

	createVariedSide(width, height, depth){
		var geometry = new THREE.Geometry();
 
    	// create an array of vertices by way of
    	// and array of vector3 instances
    	geometry.vertices.push(
 	
        	new THREE.Vector3(0, 0, 0),
        	new THREE.Vector3(width, 0, 0),
        	new THREE.Vector3(width, height, 0),
        	new THREE.Vector3(0, height, 0),
 	
        	new THREE.Vector3(0, 0, depth),
        	new THREE.Vector3(width, 0, depth),
        	new THREE.Vector3(width, height, depth),
        	new THREE.Vector3(0, height, depth)
        );

    	geometry.faces.push(
 
        	new THREE.Face3(0, 1, 5),
        	new THREE.Face3(0, 5, 4),
        	new THREE.Face3(1, 6, 2),
        	new THREE.Face3(1, 5, 6),
 	
        	new THREE.Face3(2, 6, 3),
        	new THREE.Face3(3, 6, 7),
        	new THREE.Face3(3, 7, 4),
        	new THREE.Face3(3, 4, 0)
        );
 
    	// compute Normals
    	geometry.computeVertexNormals();

		return (geometry);
	}


	createGeometries(width, height, depth){
		var m = [1,1,0.5,0.5,1,1,2,2,1,2,2,1,3,3,1,1]; // mutations
		var geometry = new THREE.Geometry();
		var wa = width/-2;var wb = width/2;
		var ha = height/-2;var hb = height/2;
		geometry.vertices.push(
			// centre
			new THREE.Vector3(0, 0, 0),
			// corner
			new THREE.Vector3(wa, hb, 0),
			// side
			new THREE.Vector3(wa, hb+m[0], 0),
			new THREE.Vector3(0, hb+m[1], 0),
			new THREE.Vector3(0, hb, 0 ),
			new THREE.Vector3(0, hb+m[2], 0),
			new THREE.Vector3(wb, hb+m[3], 0),
			// corner
			new THREE.Vector3(wb, hb, 0),
			// side
			new THREE.Vector3(wb+m[4], hb, 0),
			new THREE.Vector3(wb+m[5], 0, 0),
			new THREE.Vector3(wb, 0, 0 ),
			new THREE.Vector3(wb+m[6], 0, 0),
			new THREE.Vector3(wb+m[7], ha, 0),
			// corner
			new THREE.Vector3(wb, ha, 0),
			// side
			new THREE.Vector3(wb, ha-m[8], 0),
			new THREE.Vector3(0, ha-m[9], 0),
			new THREE.Vector3(0, ha, 0 ),
			new THREE.Vector3(0, ha-m[10], 0),
			new THREE.Vector3(wa, ha-m[11], 0),
			// corner
			new THREE.Vector3(wa, ha, 0),
			// side
			new THREE.Vector3(wa-m[12], ha, 0),
			new THREE.Vector3(wa-m[13], 0, 0),
			new THREE.Vector3(wa, 0, 0 ),
			new THREE.Vector3(wa-m[14], 0, 0),
			new THREE.Vector3(wa-m[15], hb, 0)
		);
		geometry.faces.push(


        	new THREE.Face3(4, 1, 2),
        	new THREE.Face3(4, 2, 3),
        	new THREE.Face3(4, 6, 5),
        	new THREE.Face3(0, 1, 4),
        	new THREE.Face3(4, 7, 6),

			new THREE.Face3(0, 4, 7),
        	//new THREE.Face3(0, 7, 8),
        	//new THREE.Face3(0, 8, 9),
        	//new THREE.Face3(0, 9, 10),
        	//new THREE.Face3(0, 10, 11),
//
        	//new THREE.Face3(0, 11, 12),
        	//new THREE.Face3(0, 12, 13),
        	//new THREE.Face3(0, 13, 14),
        	//new THREE.Face3(0, 14, 15),
        	//new THREE.Face3(0, 15, 16),
        	//
        	//new THREE.Face3(0, 16, 17),
        	//new THREE.Face3(0, 17, 18),
        	//new THREE.Face3(0, 18, 19),
        	//new THREE.Face3(0, 19, 20),
        	//new THREE.Face3(0, 20, 1),
 	

        );
 
    	// compute Normals
    	geometry.computeVertexNormals();
		return (geometry);
	}
}
