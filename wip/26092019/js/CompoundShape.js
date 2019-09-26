class CompoundShape extends THREE.Object3D{
	constructor(width, height, depth, seed){
		super();
		this.colour1 = 0x00ff00;
		this.colour2 = 0x000000;
		this.colour3 = 0xff0000;
		this.colour4 = 0xffff00;
		this.seed1 = this.nextSeed(seed);
		this.seed2 = this.nextSeed(this.seed1);
		this.seed3 = this.nextSeed(this.seed2);
		this.seed4 = this.nextSeed(this.seed3);
		this.seed5 = this.nextSeed(this.seed4);
		this.seed6 = this.nextSeed(this.seed5);
		this.seed7 = this.nextSeed(this.seed6);
		this.seed8 = this.nextSeed(this.seed7);
		this.width = width/2 + width*this.seed4;
		this.height = height/2 +height*this.seed5;
		this.depth = depth/2 +depth*this.seed6;
		//console.log(this.seed1, this.seed2, this.seed3, this.seed4, this.seed5);
		this.widthA = this.width*this.seed1;
		this.widthB = this.width*(1-this.seed1);
		console.log(this.seed4, this.seed5, this.seed6)
		this.heightA = this.height*this.seed2;
		this.heightB = this.height*(1-this.seed2);
		this.depthA = this.depth*this.seed3;
		this.depthB = this.depth*(1-this.seed3);

		this.mutations = [0,1,2,0,1,2,0,1];
		this.highestM = 3;

		this.mutations[0] = Math.ceil(this.seed1*this.highestM);
		this.mutations[1] = Math.ceil(this.seed2*this.highestM);
		this.mutations[2] = Math.ceil(this.seed3*this.highestM);
		this.mutations[3] = Math.ceil(this.seed4*this.highestM);
		this.mutations[4] = Math.ceil(this.seed5*this.highestM);
		this.mutations[5] = Math.ceil(this.seed6*this.highestM);
		this.mutations[6] = Math.ceil(this.seed7*this.highestM);
		this.mutations[7] = Math.ceil(this.seed8*this.highestM);
		if (this.mutations[1] == this.mutations[2] ) {this.mutations[2]=0};
		if (this.mutations[3] == this.mutations[4] ) {this.mutations[4]=0};
		if (this.mutations[5] == this.mutations[6] ) {this.mutations[5]=0};
		if (this.mutations[7] == this.mutations[0] ) {this.mutations[7]=0};

		if(this.mutations.reduce((a,b)=>a+b)==0){
			this.mutations[2] = 2;
		}

		this.mesh = new THREE.Mesh();
		this.solidmesh = new THREE.Mesh();
		this.linemesh = new THREE.Mesh();
		this.dlinemesh = new THREE.Mesh();
		this.add(this.mesh);
		this.mesh.add(this.solidmesh);
		this.mesh.add(this.linemesh);
		//this.mesh.add(this.dlinemesh);
		this.createBottom();
		this.createTop();
	}

	createTop(){
		var backleft    = this.createCornerSolid(-this.widthA, this.heightA, -this.depthA, this.mutations[1]); this.solidmesh.add(backleft);
		var backright   = this.createCornerSolid(this.widthB, this.heightA,  -this.depthA, this.mutations[2]); this.solidmesh.add(backright);
		var frontleft   = this.createCornerSolid(-this.widthA, this.heightA, this.depthB,  this.mutations[3]); this.solidmesh.add(frontleft);
		var frontright  = this.createCornerSolid(this.widthB, this.heightA,  this.depthB,  this.mutations[4]); this.solidmesh.add(frontright);
		var lbackleft   = this.createCornerLines(-this.widthA, this.heightA, -this.depthA, this.mutations[1]); this.linemesh.add(lbackleft);
		var lbackright  = this.createCornerLines(this.widthB, this.heightA,  -this.depthA, this.mutations[2]); this.linemesh.add(lbackright);
		var lfrontleft  = this.createCornerLines(-this.widthA, this.heightA, this.depthB,  this.mutations[3]); this.linemesh.add(lfrontleft);
		var lfrontright = this.createCornerLines(this.widthB, this.heightA,  this.depthB,  this.mutations[4]); this.linemesh.add(lfrontright);
		var lbackleft   = this.createCornerLines(-this.widthA, this.heightA, -this.depthA, this.mutations[1], true); this.dlinemesh.add(lbackleft);
		var lbackright  = this.createCornerLines(this.widthB, this.heightA,  -this.depthA, this.mutations[2], true); this.dlinemesh.add(lbackright);
		var lfrontleft  = this.createCornerLines(-this.widthA, this.heightA,  this.depthB, this.mutations[3], true); this.dlinemesh.add(lfrontleft);
		var lfrontright = this.createCornerLines(this.widthB, this.heightA,   this.depthB, this.mutations[4], true); this.dlinemesh.add(lfrontright);
	}

	createCornerSolid(width, height, depth, mut){
		var mesh;
		var geometry;
		if (mut==0||mut==3){
			mesh = new THREE.Mesh();
			var panel1 = this.createPanel(Math.abs(width), Math.abs(height)); mesh.add(panel1);
			var panel2 = this.createPanel(Math.abs(depth), Math.abs(height)); mesh.add(panel2);
			var panel3 = this.createPanel(Math.abs(width), Math.abs(depth)); mesh.add(panel3);
			panel1.position.z = depth;
			panel1.position.x = width/2;
			panel1.position.y = height/2;
			panel2.rotation.y = 1.57079632679;
			panel2.position.x = width;
			panel2.position.y = height/2;
			panel2.position.z = depth/2;
			panel3.rotation.x = 1.57079632679;
			panel3.position.y = height;
			panel3.position.x = width/2;
			panel3.position.z = depth/2;
			if(mut==3){
				var cylindergeometry = new THREE.CylinderBufferGeometry( Math.abs(width/4), Math.abs(width/4), Math.abs(width/2), 16, 1 , false, 0, 4.71238898037);
				var cylindermaterial = new THREE.MeshBasicMaterial( {color: this.colour1} );
				var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
				cylinder.position.z = depth;
				cylinder.position.x = width/2;
				cylinder.position.y = height;
				cylinder.rotation.z = 1.57079632679;
				if(depth>0&&height<0){
					cylinder.rotation.x = 3.14159265;
				} else if(depth>0){
					cylinder.rotation.x = 1.57079632679} else if(height<0){
						cylinder.rotation.x = 4.71238898037};
				mesh.add( cylinder );
			}
	  	} else if (mut==1){
	  		geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, 0, 0),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(0, 0, depth),
        		new THREE.Vector3(0, height, depth )
        	);
    		geometry.faces.push(
        		new THREE.Face3(0, 1, 3),
        		new THREE.Face3(3, 1, 2),
        		new THREE.Face3(0, 7, 1),
        		new THREE.Face3(1, 6, 5),
        		new THREE.Face3(1, 5, 2),
        		new THREE.Face3(2, 5, 3),
        		new THREE.Face3(3, 5, 4)
        	);
    		geometry.computeVertexNormals();
    		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
			mesh = new THREE.Mesh( geometry, material );
	  	} else if (mut==2){
	  		geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(0, 0, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width/10, height/10, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width, 0, 0 ),
        		new THREE.Vector3(width/10, height/10, depth/10)
        	);
    		geometry.faces.push(
        		new THREE.Face3(0, 1, 2),
        		new THREE.Face3(0, 2, 3),
        		new THREE.Face3(0, 3, 4),
        		new THREE.Face3(0, 4, 5),
        		new THREE.Face3(4, 5, 6),
        		new THREE.Face3(4, 6, 8),
        		new THREE.Face3(8, 6, 7),
        		new THREE.Face3(9, 8, 7),
        		new THREE.Face3(9, 7, 10),
        		new THREE.Face3(7, 10, 11),
        		new THREE.Face3(10, 2, 11),
        		new THREE.Face3(11, 2, 1),
        		new THREE.Face3(3, 4, 8),
        		new THREE.Face3(3, 8, 12),
        		new THREE.Face3(2, 3, 12),
        		new THREE.Face3(2, 12, 10),
        		new THREE.Face3(9, 12, 8),
        		new THREE.Face3(9, 10, 12)

        	);
    		geometry.computeVertexNormals();
    		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
			mesh = new THREE.Mesh( geometry, material );
	  	}
		return (mesh);
	}

	createCornerLines(width, height, depth, mut, altline){
		var yoffset = height/300;
		var mesh;
		if (mut==0||mut==3){
			mesh  = new THREE.Mesh();
			var line1 = this.createLine(Math.abs(width), altline); mesh.add(line1);
			var line2 = this.createLine(Math.abs(height), altline); mesh.add(line2);
			var line3 = this.createLine(Math.abs(depth), altline);  mesh.add(line3);
			line1.rotation.z = 1.57079632679;
			line1.position.z = depth;
			line1.position.x =width/2;
			line1.position.x +=Math.abs(width/2);
			line1.position.y = height;
			line2.position.x = width;
			line2.position.z = depth;
			line2.position.y = height/2;
			line2.position.y -= Math.abs(height/2);
			line3.rotation.x = 1.57079632679;
			line3.position.y = height;
			line3.position.x = width;
			line3.position.z = depth/2;
			line3.position.z -= Math.abs(depth/2);
			if(mut==3){
				var cylindergeometry = new THREE.CylinderBufferGeometry( Math.abs(width/4), Math.abs(width/4), Math.abs(width/2), 16, 1 , false, 0, 4.71238898037);
				var cylindermaterial;


				if(altline){
				 cylindermaterial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				 cylindermaterial = new THREE.LineBasicMaterial( { color: this.colour2 } );
			}

				var cylinderedges = new THREE.EdgesGeometry( cylindergeometry );
				var cylinder = new THREE.LineSegments( cylinderedges, cylindermaterial );
				cylinder.position.z = depth;
				cylinder.position.x = width/2;
				cylinder.position.y = height;
				cylinder.rotation.z = 1.57079632679;
				if(depth>0&&height<0){
					cylinder.rotation.x = 3.14159265;
				} else if(depth>0){
					cylinder.rotation.x = 1.57079632679} else if(height<0){
						cylinder.rotation.x = 4.71238898037
				};
				

				if(altline){cylinder.computeLineDistances();};

				mesh.add( cylinder );
			}
		} else if (mut==1){
    		var geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(0, height, 0),
        		new THREE.Vector3(0, height, depth ),
        		new THREE.Vector3(0, height*1.5, depth),
        		new THREE.Vector3(width, height*1.5, depth),
        		new THREE.Vector3(width, 0, depth)
        	);

    		var material;
			if(altline){
				material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				material = new THREE.LineBasicMaterial({ color: this.colour2 });
			}
			mesh = new THREE.Line( geometry, material );
			if(altline){mesh.computeLineDistances();};
		} else if (mut==2){
			geometry = new THREE.Geometry();
    		geometry.vertices.push(
        		new THREE.Vector3(width, height, 0),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(0, height, depth),
        		new THREE.Vector3(width/10, height, depth),
        		new THREE.Vector3(width/10, height/10, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, 0, depth),
        		new THREE.Vector3(width, height/10, depth),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width/10, height, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width, height, depth/10),
        		new THREE.Vector3(width, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth/10),
        		new THREE.Vector3(width/10, height/10, depth)


        	);
        	var material;
			if(altline){
				material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			} else {
				material = new THREE.LineBasicMaterial({ color: this.colour2 });
			}
			mesh = new THREE.Line( geometry, material );
			if(altline){mesh.computeLineDistances();} else {mesh.position.y+=yoffset;}
		}
		return (mesh);
	}

	createBottom(){
		var bbackleft    = this.createCornerSolid(-this.widthA,   -this.heightB, -this.depthA, this.mutations[5]);  this.solidmesh.add(bbackleft);
		var bbackright   = this.createCornerSolid(this.widthB,   -this.heightB,  -this.depthA, this.mutations[6]);  this.solidmesh.add(bbackright);
		var bfrontleft   = this.createCornerSolid(-this.widthA,  -this.heightB,  this.depthB,  this.mutations[7]);   this.solidmesh.add(bfrontleft);
		var bfrontright  = this.createCornerSolid(this.widthB,  -this.heightB,   this.depthB,  this.mutations[0]);   this.solidmesh.add(bfrontright);
		var blbackleft   = this.createCornerLines(-this.widthA,  -this.heightB,  -this.depthA, this.mutations[5]); this.linemesh.add(blbackleft);
		var blbackright  = this.createCornerLines(this.widthB,  -this.heightB,   -this.depthA, this.mutations[6]); this.linemesh.add(blbackright);
		var blfrontleft  = this.createCornerLines(-this.widthA, -this.heightB,    this.depthB, this.mutations[7]); this.linemesh.add(blfrontleft);
		var blfrontright = this.createCornerLines(this.widthB, -this.heightB,     this.depthB, this.mutations[0]); this.linemesh.add(blfrontright);
		var blbackleft   = this.createCornerLines(-this.widthA,  -this.heightB,  -this.depthA, this.mutations[5], true); this.dlinemesh.add(blbackleft);
		var blbackright  = this.createCornerLines(this.widthB,  -this.heightB,   -this.depthA, this.mutations[6], true); this.dlinemesh.add(blbackright);
		var blfrontleft  = this.createCornerLines(-this.widthA, -this.heightB,    this.depthB, this.mutations[7], true); this.dlinemesh.add(blfrontleft);
		var blfrontright = this.createCornerLines(this.widthB, -this.heightB,     this.depthB, this.mutations[0], true); this.dlinemesh.add(blfrontright);
	}

	createPanel(width, height){
		//var randcol = Math.floor(10+Math.random()*90);
		//var col = "#" + randcol + "ff" + randcol;
		var geometry = new THREE.PlaneGeometry( width, height, 2 );
		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		return( plane );
	}

	createLine(length, altline = false){
		var material;
		if(altline){
			material = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: this.colour2 ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
		} else {
			material = new THREE.LineBasicMaterial({ color: this.colour2 });
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

	nextSeed(seed){
		var seedtt = seed*10;
		var seedttf = Math.floor(seedtt);
		var nextSeed = seedtt-seedttf;
		if(nextSeed>0.9){nextSeed-=0.1};
		if(nextSeed<0.1){nextSeed+=0.1}
		return(nextSeed);
	}
}