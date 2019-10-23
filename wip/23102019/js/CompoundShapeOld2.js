class CompoundShape extends THREE.Object3D{
	constructor(){
		super();
		this.xs = [-2.1-Math.random()*0.5,-1-Math.random()*1, 0, 1+Math.random()*1, 2.1+Math.random()*0.5];
		this.ys = [ 0, 1+Math.random()*1, 2.1+Math.random()*1, null];
		this.ys[3] = this.ys[2] + +Math.random()*0.5;
		this.zs = [-2.1-Math.random()*0.5,-1-Math.random()*1, 0, 1+Math.random()*1, 2.1+Math.random()*0.5];
		this.mesh = new THREE.Mesh();
		this.mesh1 = new THREE.Mesh();
		this.mesh2 = new THREE.Mesh();
		this.mesh3 = new THREE.Mesh();;
		this.mesh.add(this.mesh1);
		this.mesh.add(this.mesh2);
		this.mesh.add(this.mesh3);
		this.singleGeometry = new THREE.Geometry();
		this.create();
	}

	create(){
		this.add( this.mesh );
		for (var i = 0; i <this.xs.length - 1; i++) {
			for (var j = 0; j <this.ys.length - 1; j++) {
				for (var k = 0; k <this.zs.length - 1; k++) {
					var edge = false;
					if((i==0&&j==2)||(i==3&&j==2)||(j==2&&k==0)||(j==2&&k==3)||(i==0&&k==0)||(i==3&&k==3)||(i==0&&k==3)||(i==3&&k==0)){
						edge=true;
					}
					var outer = false;
					if (i==0||i==3||j==2||k==0||k==3){
						outer = true;
					}
					if (((outer == false)||(outer && Math.random()>0.8))&&(edge==false)){
						this.createCube(this.xs[i], this.ys[j], this.zs[k], this.xs[i+1]-this.xs[i], this.ys[j+1]-this.ys[j], this.zs[k+1]-this.zs[k], outer, edge);
					}
				}
			}
		}
		var edges = new THREE.EdgesGeometry( this.singleGeometry , 20);
		var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		//var line2 = new THREE.LineSegments( edges, new THREE.LineDashedMaterial( {
		//	color: 0x000000,
		//	linewidth: 1,
		//	scale: 10,
		//	dashSize: 0.1,
		//	gapSize: 0.3
		//} ) );
		//line2.computeLineDistances();
		var material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
		var mesh = new THREE.Mesh(this.singleGeometry, material);
		this.mesh1.add(mesh);
		this.mesh2.add(line);
		//this.mesh3.add(line2);
		//this.mesh3.position.z = 10;
	}

	createCube(x,y,z,width,height,depth, isouter, isedge){
		console.log(x,y,z);
		//x=x*2;y=y*2;z=z*2;
		var color = 0xffffff;
		//if(isouter) {color = 0x00ff00
		if(isedge) {color = 0xff0000}
		var geometry = new THREE.BoxGeometry(width, height, depth);

		var mesh = new THREE.Mesh( geometry ) ;
		//this.mesh1.add( mesh );
		//this.mesh2.add( line );
		mesh.position.x = x + width/2;
		mesh.position.y = y + height/2;
		mesh.position.z = z + depth/2;
		//line.position.x = x + width/2;
		//line.position.y = y + height/2;
		//line.position.z = z + depth/2;
		mesh.updateMatrix(); // as needed
		this.singleGeometry.merge(mesh.geometry, mesh.matrix);

	}
}