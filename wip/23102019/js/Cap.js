class Cap extends TFEObject{
	constructor(width, height, depth, secondpass=false, variation=0, propa=0.5, propb=0.5, propc=0.5, source = "none"){
		super();
		this.propA=propa;this.propB=propb;this.propC=propc;
		this.secondpass = secondpass;
		this.mesh = new THREE.Mesh();
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.variation = variation;
		this.add(this.mesh);
		this.source = source
		this.totalHeight = 0;
		//this.defaultLineColor = global.blue;
		//this.defaultFaceColor = global.red;
		if(source != "none"){this.create()}
	}

	create(){

		switch(this.variation) {
  			case 0:
  			this.createBodyA();
    		break;
  			case 1:
    		this.createBodyB();
    		break;
  			case 2:
    		this.createBodyC();
    		break;
    		case 3:
    		this.createBodyD();
    		break;
    		//case 4:
    		//this.createBodyE();
    		//break;
    		default:
    		this.createBodyA();
    		break;
		}
	}

	createBodyA(){
		// ABBREVIATIONS
		console.log("CAPA", this.source);
		var dl = this.defaultLineColor; var df = this.defaultFaceColor;
		var sp = this.secondpass; var o = global.offset; var e = global.ETA;
		var d = this.depth; var h = this.height; var w = this.width;
		var pa = this.propA; var pb = this.propB; var pc = this.propC;
		// CAP LINES
    	var vertices = new Float32Array( [
    		0-o, h+o, 0-o,//0
    		0-o, 0, 0-o,//2

    		0-o, h+o, d+o,//5
    		0-o, 0, d+o,//3

    		  w+o, h+o, 0-o,//1
    		   w+o, 0, 0-o,//4

    		0-o, h+o, 0-o,//0
    		w+o, h+o, 0-o,//1

    		0-o, h+o, 0-o,//0
    		0-o, h+o, d+o,//5

			w+o, 0, d+o,//6
    		  w+o, h+o, d+o,//7

    		   w+o, h+o, 0-o,//1
    		  w+o, h+o, d+o,//7

    		   0-o, h+o, d+o,//5
    		   w+o, h+o, d+o//7


		] );
		var linegeometry = new THREE.BufferGeometry();
		linegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        var linematerial;
		if(sp){
			linematerial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.2});
		} else {
			linematerial = new THREE.LineBasicMaterial({ color: dl });
		}
		var linemesh = new THREE.LineSegments( linegeometry, linematerial );
		
		this.mesh.add(linemesh);
		if(sp){linemesh.computeLineDistances();}
		linemesh.position.x = w/-2;linemesh.position.z = d/-2;

		// CAP SOLID FACES
		if(!sp){
			var panel_t = this.createPanel(w, d);
			var panel_f = this.createPanel(w, h);
			var panel_e = this.createPanel(w, h);
			var panel_l = this.createPanel(h, d);
			var panel_r = this.createPanel(h, d);
			this.orientPlanetoXZ(panel_t);
			this.orientPlanetoYZ(panel_l);
			this.orientPlanetoYZ(panel_r);
			panel_l.rotation.x = e;
			panel_r.rotation.x = e;
			panel_t.position.y = h;
			panel_f.position.z = d/-2;
			panel_e.position.z = d/2;
			panel_l.position.x = w/-2;
			panel_r.position.x = w/2;
			panel_f.position.y = h/2;
			panel_e.position.y = h/2;
			panel_l.position.y = h/2;
			panel_r.position.y = h/2;
			this.mesh.add(panel_t);
			this.mesh.add(panel_f);
			this.mesh.add(panel_e);
			this.mesh.add(panel_l);
			this.mesh.add(panel_r);
		}
	}

	createBodyB(){
		// ABBREVIATIONS
		console.log("CAPB", this.source);
		var dl = this.defaultLineColor; var df = this.defaultFaceColor;
		var sp = this.secondpass; var o = global.offset; var e = global.ETA;
		var d = this.depth; var h = this.height; var w = this.width;
		var pa = this.propA; var pb = this.propB; var pc = this.propC;
		// CAP LINES
    	var vertices = new Float32Array( [
    			0-o, h+o, 0-o,//0
    			0-o, 0, 0-o,//11

    			0-o, h+o, d+o,//5
    			0-o, 0, d+o,//12

    		    w+o, h+o, 0-o,//1
    		    w+o, 0, 0-o,//13

    			0-o, h+o, 0-o,//0
    			w+o, h+o, 0-o,//1

    			0-o, h+o, 0-o,//0
    			0-o, h+o, d+o,//5

    		    w+o, h+o, 0-o,//1
        		w+o, h+o, d*pc+o,//2

        		w+o, h+o, d*pc+o,//2
        		w*pa+o, h+o, d*pc+o,//3

        		w*pa+o, h+o, d*pc+o,//3
        		w*pa+o, h+o, d+o,//4

        		w*pa+o, h+o, d+o,//4
        		0, h+o, d+o,//5

        		w*pa+o, h+o, d+o,//4
        		w*pa+o, h-h*pb+o, d+o,//6

        		w*pa+o, h-h*pb+o, d+o,//6
        		w+o, h-h*pb+o, d+o,//7

        		w+o, h-h*pb+o, d+o,//7
        		w+o, 0, d+o,//8

        		w+o, h-h*pb+o, d+o,//7
        		w+o, h-h*pb+o, d*pc+o,//9

        		w+o, h-h*pb+o, d*pc+o,//9
        		w*pa+o, h-h*pb+o, d*pc+o,//10

        		w*pa+o, h+o, d*pc+o,//3
        		w*pa+o, h-h*pb+o, d*pc+o,//10
        		
        		w+o, h+o, d*pc+o,//2
        		w+o, h-h*pb+o, d*pc+o,//9

        		w*pa+o, h-h*pb+o, d*pc+o,//10
        		w*pa+o, h-h*pb+o, d+o//6
		] );
		var linegeometry = new THREE.BufferGeometry();
		linegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        var linematerial;
		if(sp){
			linematerial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.2});
		} else {
			linematerial = new THREE.LineBasicMaterial({ color: dl });
		}
		var linemesh = new THREE.LineSegments( linegeometry, linematerial );
		if(sp){linemesh.computeLineDistances();}
		this.mesh.add(linemesh);
		linemesh.position.x = w/-2;linemesh.position.z = d/-2;

		// CAP FACES
		if(!sp){
			var facegeometry = new THREE.Geometry();
    		facegeometry.vertices.push(
        		new THREE.Vector3(0, h, 0),
        		new THREE.Vector3(w, h, 0),
        		new THREE.Vector3(w, h, d*pc),
        		new THREE.Vector3(w*pa, h, d*pc),
        		new THREE.Vector3(w*pa, h, d),
        		new THREE.Vector3(0, h, d),
        		new THREE.Vector3(0, 0, d),
        		new THREE.Vector3(w, 0, d),
        		new THREE.Vector3(w*pa, h-h*pb, d),
        		new THREE.Vector3(w, h-h*pb, d),
        		new THREE.Vector3(w, h-h*pb, d*pc),
        		new THREE.Vector3(w, 0, 0 ),
        		new THREE.Vector3(w*pa, h-h*pb, d*pc),
        		new THREE.Vector3(0, 0, 0),
        	);
    		facegeometry.faces.push(
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
        		new THREE.Face3(9, 10, 12),
        		new THREE.Face3(0, 1, 11),
        		new THREE.Face3(0, 11, 13),
        		new THREE.Face3(0, 5, 6),
        		new THREE.Face3(0, 6, 13)        		

        	);
    		facegeometry.computeVertexNormals();
    		var facematerial = new THREE.MeshBasicMaterial( {color: df, side: THREE.DoubleSide} );
			var facemesh = new THREE.Mesh( facegeometry, facematerial );
			this.mesh.add(facemesh);
			facemesh.position.x = w/-2;facemesh.position.z = d/-2;
		}
			
	}
	
	createBodyC(){
		var mesh  = new THREE.Mesh();
		// ABBREVIATIONS
		console.log("CAPC");
		var dl = this.defaultLineColor; var df = this.defaultFaceColor;
		var sp = this.secondpass; var o = global.offset; var e = global.ETA;
		var d = this.depth; var h = this.height; var w = this.width;
		var pa = this.propA; var pb = this.propB; var pc = this.propC;

		var r = h;
		if(d<h){r=d};
		this.totalHeight = r + h;
		// CAP LINES
    	var vertices = new Float32Array( [
    		0-o, h+o, 0-o,//0
    		0-o, 0, 0-o,//2

    		0-o, h+o, d+o,//5
    		0-o, 0, d+o,//3

    		  w+o, h+o, 0-o,//1
    		   w+o, 0, 0-o,//4

    		0-o, h+o, 0-o,//0
    		w+o, h+o, 0-o,//1

    		0-o, h+o, 0-o,//0
    		0-o, h+o, d+o,//5

			w+o, 0, d+o,//6
    		w+o, h+o, d+o,//7

    		   w+o, h+o, 0-o,//1
    		  w+o, h+o, d+o,//7

    		0-o, h+o, d+o,//5
    		w/4-o, h+o, d+o,//9

    		w-(w/4)+o, h+o, d+o,//8
    		w+o, h+o, d+o,//7

    		w/4-o, h+o, d-(r+o),//10
    		w-(w/4)+o, h+o, d-(r+o),//11

    		w/4-o, h-(r+o), d+o,//12
    		w-(w/4)+o, h-(r+o), d+o,//13


		] );
		var linegeometry = new THREE.BufferGeometry();
		linegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        var linematerial;
		if(sp){
			linematerial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.2});
		} else {
			linematerial = new THREE.LineBasicMaterial({ color: dl });
		}
		var linemesh = new THREE.LineSegments( linegeometry, linematerial );
		
		this.mesh.add(linemesh);
		if(sp){linemesh.computeLineDistances();}
		linemesh.position.x = w/-2;linemesh.position.z = d/-2;

		var cylindergeometry = new THREE.CylinderBufferGeometry( r, r, Math.abs(w/2), 64, 1 , false, 0, 4.71238898037);
		var cylindermaterial;

		if(sp){
			//cylindermaterial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.05,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
			cylindermaterial = new THREE.LineBasicMaterial( { transparent:true, opacity:0.1, color: global.darkgreen } );
		} else {
			cylindermaterial = new THREE.LineBasicMaterial( { transparent:true, opacity:0.3, color: global.darkgreen } );
		}

		var cylinderedges = new THREE.EdgesGeometry( cylindergeometry );

		var cylinder = new THREE.LineSegments( cylinderedges, cylindermaterial );

		console.log(cylinder)
		cylinder.position.z = d/2;
		//cylinder.position.x = w/2;
		cylinder.position.y = h;
		cylinder.rotation.z = 1.57079632679;
		if(d>0&&h<0){
			cylinder.rotation.x = 3.14159265;
		} else if(d>0){
			cylinder.rotation.x = 1.57079632679} else if(h<0){
				cylinder.rotation.x = 4.71238898037
		};
				

				if(sp){cylinder.computeLineDistances();};

		mesh.add( cylinder );
		//this.mesh.add(mesh);
		if(!sp){
		var cylindergeometry = new THREE.CylinderBufferGeometry( r,r, Math.abs(w/2), 64, 1 , false, 0, 4.71238898037);
				var cylindermaterial = new THREE.MeshBasicMaterial( {color: df} );
				var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
				cylinder.position.z = d/2;
				//cylinder.position.x = w/2;
				cylinder.position.y = h;
				cylinder.rotation.z = 1.57079632679;
				if(d>0&&h<0){
					cylinder.rotation.x = 3.14159265;
				} else if(d>0){
					cylinder.rotation.x = 1.57079632679} else if(h<0){
						cylinder.rotation.x = 4.71238898037};
				mesh.add( cylinder );
			}
			var pacmanmaterial;
			var pacmangeometry = new THREE.CircleGeometry( r, 64 , 3.1415926536, 4.71238898037);

			if(sp){
				 	pacmanmaterial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.1});
				} else {
				 	pacmanmaterial = new THREE.LineBasicMaterial( { color: dl } );
				}
			var pacmanedges = new THREE.EdgesGeometry( pacmangeometry );

			var pacman = new THREE.LineSegments( pacmanedges, pacmanmaterial );
			//var pacman = new THREE.Mesh( pacmangeometry, pacmanmaterial );
			mesh.add( pacman );

			pacman.position.z = d/2+o;
				//pacman.position.x = w/2;
				pacman.position.y = h+o;
				pacman.rotation.y = 1.57079632679;
				pacman.rotation.z = 1.57079632679;
				if(d>0&&h<0){
					pacman.rotation.x = 3.14159265;
				} else if(d>0){
					pacman.rotation.x = 1.57079632679} else if(h<0){
					pacman.rotation.x = 4.71238898037
				};

			if(sp){
				pacman.computeLineDistances();
			};

			var pacman2=pacman.clone();
			pacman2.position.x=w/4;
			pacman.position.x=w/-4;
			pacman2.position.x+=o;
			pacman.position.x-=o;
			mesh.add( pacman2 );
			this.mesh.add(mesh);

			// CAP SOLID FACES
		if(!sp){
			var panel_t = this.createPanel(w, d);
			var panel_f = this.createPanel(w, h);
			var panel_e = this.createPanel(w, h);
			var panel_l = this.createPanel(h, d);
			var panel_r = this.createPanel(h, d);
			this.orientPlanetoXZ(panel_t);
			this.orientPlanetoYZ(panel_l);
			this.orientPlanetoYZ(panel_r);
			panel_l.rotation.x = e;
			panel_r.rotation.x = e;
			panel_t.position.y = h;
			panel_f.position.z = d/-2;
			panel_e.position.z = d/2;
			panel_l.position.x = w/-2;
			panel_r.position.x = w/2;
			panel_f.position.y = h/2;
			panel_e.position.y = h/2;
			panel_l.position.y = h/2;
			panel_r.position.y = h/2;
			this.mesh.add(panel_t);
			this.mesh.add(panel_f);
			this.mesh.add(panel_e);
			this.mesh.add(panel_l);
			this.mesh.add(panel_r);
		}
	}

	createBodyD(){
		// ABBREVIATIONS
		console.log("CAPB", this.source);
		var dl = this.defaultLineColor; var df = this.defaultFaceColor;
		var sp = this.secondpass; var o = global.offset; var e = global.ETA;
		var d = this.depth; var h = this.height; var w = this.width;
		var pa = this.propA; var pb = this.propB; var pc = this.propC;
		// CAP LINES
		this.totalHeight = h+h*pb+o;
    	var vertices = new Float32Array( [
    			0-o, h+o, 0-o,//0
    			0-o, 0, 0-o,//11

    			0-o, h+o, d+o,//5
    			0-o, 0, d+o,//12

    		    w+o, h+o, 0-o,//1
    		    w+o, 0, 0-o,//13

    			0-o, h+o, 0-o,//0
    			w+o, h+o, 0-o,//1

    			0-o, h+o, 0-o,//0
    			0-o, h+o, d+o,//5

    		    w+o, h+o, 0-o,//1
        		w+o, h+o, d*pc-o,//2

        		w+o, h+o, d*pc-o,//2
        		w*pa-o, h+o, d*pc-o,//3

        		w*pa-o, h+o, d*pc-o,//3
        		w*pa-o, h+o, d+o,//4

        		w*pa-o, h+o, d+o,//4
        		0, h+o, d+o,//5

        		w*pa-o, h+o, d+o,//4
        		w*pa-o, h+h*pb+o, d+o,//6

        		w*pa-o, h+h*pb+o, d+o,//6
        		w+o, h+h*pb+o, d+o,//7

        		w+o, h+h*pb+o, d+o,//7
        		w+o, 0, d+o,//8

        		w+o, h+h*pb+o, d+o,//7
        		w+o, h+h*pb+o, d*pc-o,//9

        		w+o, h+h*pb+o, d*pc-o,//9
        		w*pa-o, h+h*pb+o, d*pc-o,//10

        		w*pa-o, h+o, d*pc-o,//3
        		w*pa-o, h+h*pb+o, d*pc-o,//10
        		
        		w+o, h+o, d*pc-o,//2
        		w+o, h+h*pb+o, d*pc-o,//9

        		w*pa-o, h+h*pb+o, d*pc-o,//10
        		w*pa-o, h+h*pb+o, d+o//6
		] );
		var linegeometry = new THREE.BufferGeometry();
		linegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        var linematerial;
		if(sp){
			linematerial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.3,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.2});
		} else {
			linematerial = new THREE.LineBasicMaterial({ color: dl });
		}
		var linemesh = new THREE.LineSegments( linegeometry, linematerial );
		if(sp){linemesh.computeLineDistances();}
		this.mesh.add(linemesh);
		linemesh.position.x = w/-2;linemesh.position.z = d/-2;

		// CAP FACES
		if(!sp){
			var facegeometry = new THREE.Geometry();
    		facegeometry.vertices.push(
        		new THREE.Vector3(0, h, 0),
        		new THREE.Vector3(w, h, 0),//1
        		new THREE.Vector3(w, h, d*pc),//2
        		new THREE.Vector3(w*pa, h, d*pc),//3
        		new THREE.Vector3(w*pa, h, d),//4
        		new THREE.Vector3(0, h, d),//5
        		new THREE.Vector3(0, 0, d),//6
        		new THREE.Vector3(w, 0, d),//7
        		new THREE.Vector3(w*pa, h+h*pb, d),//8
        		new THREE.Vector3(w, h+h*pb, d),//9
        		new THREE.Vector3(w, h+h*pb, d*pc),//10
        		new THREE.Vector3(w, 0, 0 ),//11
        		new THREE.Vector3(w*pa, h+h*pb, d*pc),
        		new THREE.Vector3(0, 0, 0),
        	);
    		facegeometry.faces.push(
        		new THREE.Face3(0, 1, 2),
        		new THREE.Face3(0, 2, 3),
        		new THREE.Face3(0, 3, 4),
        		new THREE.Face3(0, 4, 5),
        		new THREE.Face3(7, 4, 5),
        		new THREE.Face3(7, 2, 1),
        		new THREE.Face3(7, 5, 6),
        		new THREE.Face3(9, 8, 7),
        		new THREE.Face3(7, 9, 10),
        		new THREE.Face3(7, 10, 2),
        		new THREE.Face3(7, 8, 4),
        		new THREE.Face3(7, 1, 11),
        		new THREE.Face3(3, 4, 8),
        		new THREE.Face3(3, 8, 12),
        		new THREE.Face3(2, 3, 12),
        		new THREE.Face3(2, 12, 10),
        		new THREE.Face3(9, 12, 8),
        		new THREE.Face3(9, 10, 12),
        		new THREE.Face3(0, 1, 11),
        		new THREE.Face3(0, 11, 13),
        		new THREE.Face3(0, 5, 6),
        		new THREE.Face3(0, 6, 13)        		

        	);

    		facegeometry.computeVertexNormals();
    		var facematerial = new THREE.MeshBasicMaterial( {color: df, side: THREE.DoubleSide} );
			var facemesh = new THREE.Mesh( facegeometry, facematerial );
			this.mesh.add(facemesh);
			facemesh.position.x = w/-2;facemesh.position.z = d/-2;
		}
			
	}

//createBodyE(){
//	// ABBREVIATIONS
//	console.log("CAPA", this.source);
//	var dl = this.defaultLineColor; var df = this.defaultFaceColor;
//	var sp = this.secondpass; var o = global.offset; var e = global.ETA;
//	var d = this.depth; var h = this.height; var w = this.width;
//	var pa = this.propA; var pb = this.propB; var pc = this.propC;
//	// CAP LINES
 //    		0, h, 0,
 //    		0, h*1.5, d,
 //    		w, h*1.5, d,
 //    		w, h, 0,
 //    		w, 0, 0,
 //    		w, 0, d,
 //    		0, 0, d,
 //    		0, h, d 
 //		
 //    		new THREE.Face3(0, 1, 3),
 //    		new THREE.Face3(3, 1, 2),
 //    		new THREE.Face3(0, 7, 1),
 //    		new THREE.Face3(1, 6, 5),
 //    		new THREE.Face3(1, 5, 2),
 //    		new THREE.Face3(2, 5, 3),
 //    		new THREE.Face3(3, 5, 4)
 //    	
 //		geometry.computeVertexNormals();
 //		var material = new THREE.MeshBasicMaterial( {color: this.colour1, side: THREE.DoubleSide} );
//		mesh = new THREE.Mesh( geometry, material );
 //	var vertices = new Float32Array( [
 //		0-o, h+o, 0-o,//0
 //		0-o, 0, 0-o,//2

 //		0-o, h+o, d+o,//5
 //		0-o, 0, d+o,//3

 //		  w+o, h+o, 0-o,//1
 //		   w+o, 0, 0-o,//4

 //		0-o, h+o, 0-o,//0
 //		w+o, h+o, 0-o,//1

 //		0-o, h+o, 0-o,//0
 //		0-o, h+o, d+o,//5

//		w+o, 0, d+o,//6
 //		  w+o, h+o, d+o,//7

 //		   w+o, h+o, 0-o,//1
 //		  w+o, h+o, d+o,//7

 //		   0-o, h+o, d+o,//5
 //		   w+o, h+o, d+o//7


//	] );
//	var linegeometry = new THREE.BufferGeometry();
//	linegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

 //    var linematerial;
//	if(sp){
//		linematerial = new THREE.LineDashedMaterial( { transparent:true, opacity:0.2,color: dl ,linewidth: 2,scale: 2,dashSize: 0.2,gapSize: 0.2});
//	} else {
//		linematerial = new THREE.LineBasicMaterial({ color: dl });
//	}
//	var linemesh = new THREE.LineSegments( linegeometry, linematerial );
//	
//	this.mesh.add(linemesh);
//	if(sp){linemesh.computeLineDistances();}
//	linemesh.position.x = w/-2;linemesh.position.z = d/-2;

//	// CAP SOLID FACES
//	if(!sp){
//		var panel_t = this.createPanel(w, d);
//		var panel_f = this.createPanel(w, h);
//		var panel_e = this.createPanel(w, h);
//		var panel_l = this.createPanel(h, d);
//		var panel_r = this.createPanel(h, d);
//		this.orientPlanetoXZ(panel_t);
//		this.orientPlanetoYZ(panel_l);
//		this.orientPlanetoYZ(panel_r);
//		panel_l.rotation.x = e;
//		panel_r.rotation.x = e;
//		panel_t.position.y = h;
//		panel_f.position.z = d/-2;
//		panel_e.position.z = d/2;
//		panel_l.position.x = w/-2;
//		panel_r.position.x = w/2;
//		panel_f.position.y = h/2;
//		panel_e.position.y = h/2;
//		panel_l.position.y = h/2;
//		panel_r.position.y = h/2;
//		this.mesh.add(panel_t);
//		this.mesh.add(panel_f);
//		this.mesh.add(panel_e);
//		this.mesh.add(panel_l);
//		this.mesh.add(panel_r);
//	}
	
}