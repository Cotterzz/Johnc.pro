class CompoundShape extends TFEObject{
	constructor(width, height, depth, seed){
		super();

		this.width = width;
		this.height = width*global.weightA;
		this.depth = width*global.weightB;
		
		this.mesh = new THREE.Mesh();
		this.solidmeshcontainer = new THREE.Mesh();
		this.linemeshcontainer = new THREE.Mesh();
		this.dlinemeshcontainer = new THREE.Mesh();
		this.solidmesh = new THREE.Mesh();
		this.linemesh = new THREE.Mesh();
		this.dlinemesh = new THREE.Mesh();
		this.solidmeshcontainer.add(this.solidmesh);
		this.linemeshcontainer.add(this.linemesh);
		this.dlinemeshcontainer.add(this.dlinemesh);
		this.add(this.mesh);
		this.mesh.add(this.solidmeshcontainer);
		this.mesh.add(this.linemeshcontainer);
		this.mesh.add(this.dlinemeshcontainer);
		this.createBody();
	}

	createBody(){

		switch(global.variationA) {
  			case 0:
  			this.createBodyA();
    		break;
  			case 1:
    		this.createBodyB();
    		break;
  			default:
    		// code block
		}
	}

	createBodyA(secondPass=false){
		var mesh;
		var w = this.width;
		var h = this.height;
		var d = this.depth;
		var mw = w/2 * (global.weightMiddle);
		var lw = w/2 * (global.weightLeft);
		var rw = w/2 * (global.weightRight);
		console.log("total1:", mw+lw+rw);
		console.log("total2:", mw, lw ,rw);
		var lx = (w/-2) + lw;
		var rx = (w/2) - rw;
		if(secondPass){mesh = this.dlinemesh} else {mesh=this.solidmesh}

		// BODY LINES
		var edge_tf = this.createLine(mw, secondPass); mesh.add(edge_tf); this.orientLinetoX(edge_tf);
		var edge_te = this.createLine(mw, secondPass); mesh.add(edge_te); this.orientLinetoX(edge_te);
		var edge_bf = this.createLine(mw, secondPass); mesh.add(edge_bf); this.orientLinetoX(edge_bf);
		var edge_be = this.createLine(mw, secondPass); mesh.add(edge_be); this.orientLinetoX(edge_be);

		edge_tf.position.y = h/2;  edge_tf.position.y += global.offset; 
		edge_te.position.y = h/2;  edge_te.position.y += global.offset; 
		edge_bf.position.y = h/-2; edge_bf.position.y -= global.offset;
		edge_be.position.y = h/-2; edge_be.position.y -= global.offset;

		edge_tf.position.z = d/-2; edge_tf.position.z -= global.offset;
		edge_te.position.z = d/2;  edge_te.position.z += global.offset;
		edge_bf.position.z = d/-2; edge_bf.position.z -= global.offset;
		edge_be.position.z = d/2;  edge_be.position.z += global.offset;
		
		edge_tf.position.x = rx;
		edge_te.position.x = rx;
		edge_bf.position.x = rx;
		edge_be.position.x = rx;

		// BODY FACES
		if(!secondPass){
			var panel_t = this.createPanel(mw, d);
			var panel_b = this.createPanel(mw, d);
			var panel_f = this.createPanel(mw, h);
			var panel_e = this.createPanel(mw, h);
	
			this.orientPlanetoXZ(panel_t);
			this.orientPlanetoXZ(panel_b);
	
			panel_t.position.y = h/2;
			panel_b.position.y = h/-2;
			panel_f.position.z = d/-2;
			panel_e.position.z = d/2;

			panel_t.position.x = lx+mw/2;
			panel_b.position.x = lx+mw/2;
			panel_f.position.x = lx+mw/2;
			panel_e.position.x = lx+mw/2;
	
			mesh.add(panel_t);
			mesh.add(panel_b);
			mesh.add(panel_f);
			mesh.add(panel_e);
		}
		// END CAPS
		var capwidth;
		var capheight;
		var caprotation;
		switch(global.rotationA) {
  			case 0:
  			capwidth = h;
  			capheight = d;
  			caprotation = 0;
    		break;
  			case 1:
    		capwidth = d;
  			capheight = h;
  			caprotation = global.ETA;
    		break;
    		case 2:
    		capwidth = h;
  			capheight = d;
  			caprotation = global.PI;
  			case 3:
    		capwidth = d;
  			capheight = h;
  			caprotation = -global.ETA;
		}
		var cap_r = new Cap(h, rw, d, secondPass, global.variationB, global.weightC, global.weightD, global.weightE, "CAPR");
		var cap_l = new Cap(capwidth, lw, capheight, secondPass, global.variationC, global.weightF, global.weightG, global.weightH, "CAPL");
		
		mesh.add(cap_r);
		mesh.add(cap_l);

		cap_l.rotation.z = global.ETA;
		cap_r.rotation.z = -global.ETA;
		cap_l.position.x = lx;
		cap_r.position.x = rx;
		cap_l.rotation.x = caprotation;

		if(!secondPass){
			this.createBodyA(true);
		}
	}

	createBodyB(secondPass=false){
		var mesh;
		var w = this.width;
		var h = this.height;
		var d = this.depth;
		var mw = w/2 * (global.weightMiddle);
		var lw = w/2 * (global.weightLeft);
		var rw = w/2 * (global.weightRight);
		console.log("total1:", mw+lw+rw);
		console.log("total2:", mw, lw ,rw);
		var lx = (w/-2) + lw;
		var rx = (w/2) - rw;
		if(secondPass){mesh = this.dlinemesh} else {mesh=this.solidmesh}

		// BODY LINES
		var edge_tr = this.createLine(d, secondPass); mesh.add(edge_tr); this.orientLinetoZ(edge_tr);
		var edge_tl = this.createLine(d, secondPass); mesh.add(edge_tl); this.orientLinetoZ(edge_tl);
		var edge_bf = this.createLine(mw, secondPass); mesh.add(edge_bf); this.orientLinetoX(edge_bf);
		var edge_be = this.createLine(mw, secondPass); mesh.add(edge_be); this.orientLinetoX(edge_be);

		edge_tr.position.y = h/2;  edge_tr.position.y += global.offset; 
		edge_tl.position.y = h/2;  edge_tl.position.y += global.offset; 
		edge_bf.position.y = h/-2; edge_bf.position.y -= global.offset;
		edge_be.position.y = h/-2; edge_be.position.y -= global.offset;

		edge_tr.position.x = rx-mw; edge_tr.position.x -= global.offset;
		edge_tl.position.x = rx; edge_tl.position.x += global.offset;
		edge_bf.position.z = d/-2; edge_bf.position.z -= global.offset;
		edge_be.position.z = d/2;  edge_be.position.z += global.offset;
		
		edge_tr.position.z = d/-2;
		edge_tl.position.z = d/-2;
		edge_bf.position.x = rx;
		edge_be.position.x = rx;

		// BODY FACES
		if(!secondPass){
			var panel_t = this.createPanel(mw, d);
			var panel_b = this.createPanel(mw, d);
			var panel_f = this.createPanel(mw, h);
			var panel_e = this.createPanel(mw, h);
	
			this.orientPlanetoXZ(panel_t);
			this.orientPlanetoXZ(panel_b);
	
			panel_t.position.y = h/2;
			panel_b.position.y = h/-2;
			panel_f.position.z = d/-2;
			panel_e.position.z = d/2;

			panel_t.position.x = lx+mw/2;
			panel_b.position.x = lx+mw/2;
			panel_f.position.x = lx+mw/2;
			panel_e.position.x = lx+mw/2;
	
			mesh.add(panel_t);
			mesh.add(panel_b);
			mesh.add(panel_f);
			mesh.add(panel_e);
		}
		// END CAPS
		var capwidth;
		var capheight;
		var caprotation;
		switch(global.rotationA) {
  			case 0:
  			capwidth = h;
  			capheight = d;
  			caprotation = 0;
    		break;
  			case 1:
    		capwidth = d;
  			capheight = h;
  			caprotation = global.ETA;
    		break;
    		case 2:
    		capwidth = h;
  			capheight = d;
  			caprotation = global.PI;
  			case 3:
    		capwidth = d;
  			capheight = h;
  			caprotation = -global.ETA;
		}
		var capwidthb;
		var capheightb;
		var caprotationb;
		switch(global.rotationB) {
  			case 0:
  			capwidthb = mw;
  			capheightb = d;
  			caprotationb = 0;
    		break;
  			case 1:
    		capwidthb = d;
  			capheightb = mw;
  			caprotationb = global.ETA;
    		break;
    		case 2:
    		capwidthb = mw;
  			capheightb = d;
  			caprotationb = global.PI;
  			case 3:
    		capwidthb = d;
  			capheightb = mw;
  			caprotationb = -global.ETA;
		}
		var cap_r = new Cap(h, rw, d, secondPass, global.variationB, global.weightC, global.weightD, global.weightE, "CAPR");
		var cap_l = new Cap(capwidth, lw, capheight, secondPass, global.variationC, global.weightF, global.weightG, global.weightH, "CAPL");
		var cap_t = new Cap(capwidthb, h, capheightb, secondPass, global.variationD, global.weightI, global.weightJ, global.weightK, "CAPT");
		mesh.add(cap_r);
		mesh.add(cap_l);
		mesh.add(cap_t);

		cap_l.rotation.z = global.ETA;
		cap_r.rotation.z = -global.ETA;
		cap_l.position.x = lx;
		cap_r.position.x = rx;
		cap_l.rotation.x = caprotation;

		cap_t.rotation.y = caprotationb;
		cap_t.position.y = h/2//
		cap_t.position.x = rx-mw/2;

		if(!secondPass){
			this.createBodyB(true);
		}
	}
}