var physics = {

	objects:[]
}

var car = {
	skin1:null,texture1:null,material1:null,geometry1:null,
	skin2:null,texture2:null,material2:null,geometry2:null,
	skin3:null,texture3:null,material3:null,geometry3:null,
	skin4:null,texture4:null,material4:null,ctx:null,
	meshes:[],
	count:0,
	init:function(){
		this.skin1 = document.createElement('canvas');
		this.skin1.width = 256; this.skin1.height = 256;
		ctx = this.skin1.getContext('2d');
		ctx.fillStyle = "#CCCCCC"; ctx.fillRect(0, 0, this.skin1.width, this.skin1.height);
		ctx.fillStyle = "#00AA00"; ctx.fillRect(0, this.skin1.height/2, this.skin1.width, this.skin1.height/4);

		this.skin2 = document.createElement('canvas');
		this.skin2.width = 256;
		this.skin2.height = 256;
		var ctx = this.skin2.getContext('2d');
		ctx.fillStyle = "#CCCCCC";
		ctx.fillRect(0, 0, this.skin2.width, this.skin2.height);
		ctx.fillStyle = "#00AA00";
		ctx.fillRect(this.skin2.width/4, 0, this.skin2.width/8, this.skin2.height);
		ctx.fillRect((this.skin2.width/8)*5, 0, this.skin2.width/8, this.skin2.height);

		this.skin3 = document.createElement('canvas');
		this.skin3.width = 256;
		this.skin3.height = 256;
		var ctx = this.skin3.getContext('2d');
		ctx.fillStyle = "#CCCCCC";
		ctx.fillRect(0, 0, this.skin3.width, this.skin3.height);
		ctx.fillStyle = "#AA0000";
		ctx.fillRect(0, this.skin3.height/2, this.skin3.width, this.skin3.height/4);

		this.skin4 = document.createElement('canvas');
		this.skin4.width = 256;
		this.skin4.height = 256;
		var ctx = this.skin4.getContext('2d');
		ctx.fillStyle = "#CCCCCC";
		ctx.fillRect(0, 0, this.skin4.width, this.skin4.height);
		ctx.fillStyle = "#AA0000";
		ctx.fillRect(this.skin4.width/4, 0, this.skin4.width/8, this.skin4.height);
		ctx.fillRect((this.skin4.width/8)*5, 0, this.skin4.width/8, this.skin4.height);

		this.texture1 = new THREE.Texture(this.skin1); this.texture1.needsUpdate = true;
		this.texture2 = new THREE.Texture(this.skin2); this.texture2.needsUpdate = true;
		this.texture3 = new THREE.Texture(this.skin3); this.texture3.needsUpdate = true;
		this.texture4 = new THREE.Texture(this.skin4); this.texture4.needsUpdate = true;
		this.texture2.wrapT = this.texture2.wrapS = THREE.RepeatWrapping;
		this.texture4.wrapT = this.texture4.wrapS = THREE.RepeatWrapping;

		this.material1 = new THREE.MeshPhongMaterial({ map:this.texture1 , shininess:90});
		this.material2 = new THREE.MeshPhongMaterial({ map:this.texture2 , side:THREE.DoubleSide, shininess:90});
		this.material3 = new THREE.MeshPhongMaterial({ map:this.texture3 , shininess:90});
		this.material4 = new THREE.MeshPhongMaterial({ map:this.texture4 , side:THREE.DoubleSide, shininess:90});

		this.geometry1 = new THREE.SphereGeometry(.5,32,32, 0, Math.PI*2, 0, Math.PI/2);
		var fanShape = new THREE.Shape();
		fanShape.moveTo( 0, 0 );
		fanShape.lineTo( .5, .7);
		fanShape.bezierCurveTo(.3, .9, -.3, .9, -.5, .7);
		fanShape.lineTo( 0, 0);
		this.geometry2 = new THREE.ShapeGeometry( fanShape );

		car.create("A", -2, 0, 1.5708);
		car.create("A", -4, 2, 1.5708);
		car.create("A", -4, -2, 1.5708);
		car.create("A", -6, 2, 1.5708);
		car.create("A", -6, -2, 1.5708);
		car.create("B", 2, 0, -1.5708);
		car.create("B", 4, 2, -1.5708);
		car.create("B", 4, -2, -1.5708);
		car.create("B", 6, 2, -1.5708);
		car.create("B", 6, -2, -1.5708);
	},
	create:function(team, xpos, ypos, rot){
		var materialBack;
		var materialFront;
		if(team=="A"){
			materialFront = car.material1;
			materialBack = car.material2;
		} else {
			materialFront = car.material3;
			materialBack = car.material4;
		}
		this.meshes[this.count] = new THREE.Mesh( car.geometry1, materialFront );
		viewport.scene.add( this.meshes[this.count] );
		this.meshes[this.count].position.set(xpos, ypos, 0); 
		this.meshes[this.count].castShadow = true;
		this.meshes[this.count].receiveShadow = true;
		this.meshes[this.count].rotation.x = -1.1;
		this.meshes[this.count].rotation.y = rot;
		//var geometry = new THREE.CircleGeometry( .5, 32 );
		//var material = new THREE.MeshBasicMaterial( { color: 0xffff00 , wireframe:wf} );
		//var circle = new THREE.Mesh( geometry, materials[this.count] );
		//circle.rotation.x = 1.5708;
		//this.meshes[this.count].add( circle );
		//var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:wf } );
		var mesh = new THREE.Mesh( car.geometry2, materialBack ) ;
		mesh.castShadow = true;
		mesh.position.z = .2;
		mesh.rotation.x = -1.1;
		this.meshes[this.count].add( mesh );
		this.meshes[this.count].rotation.x = 1.5708;
		this.count+=1;
	}
}

var nodes = {
	count:0, textureCanvases:[], textures:[], materials:[], meshes:[], geometries:[],
	add:function(x, y, z, text, object){
		this.textureCanvases[this.count] = document.createElement('canvas');
		this.textureCanvases[this.count].width = 256;
		this.textureCanvases[this.count].height = 256;
		var width = text.length *.3;
		var height = .4;
		var scale = height / width;
		var offset = Math.floor( scale ) - scale;;
		this.ctx = this.textureCanvases[this.count].getContext('2d');
		this.ctx.font = 20 + 'pt Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText(text,0, 0);
		this.textures[this.count] = new THREE.Texture(this.textureCanvases[this.count]);
		this.textures[this.count].wrapT = THREE.RepeatWrapping;
		this.textures[this.count].wrapS = THREE.RepeatWrapping;
		this.textures[this.count].repeat.set(  width/4.5, .1);
    		this.textures[this.count].offset.set( 0,.9);
		this.materials[this.count] = new THREE.MeshBasicMaterial({ map:this.textures[this.count], transparent: true});
		this.geometries[this.count] = new THREE.PlaneGeometry(width,height,1,1);
		this.meshes[this.count] = new THREE.Mesh( this.geometries[this.count], this.materials[this.count] );
		this.meshes[this.count].position.set(x, y, 1); 
		this.meshes[this.count].name = "node" + this.count;
		object.add( this.meshes[this.count] );
		this.textures[this.count].needsUpdate = true;
		this.count+=1;
	},
	init:function(){
		//addNode(0, 0, 0, "root", core.scene)
		//addNode(2, 1, 1, "TEST1", meshes[0])
		//
		//addNode(2, 3, 4, "testNode", meshes[0])
		//addNode(2, 1, 1, "TEST1", meshes[2])
		//addNode(2, 2, 2, "1234567890", meshes[2])
		//addNode(2, 3, 4, "testNode", meshes[2])
		//addNode(2, 2, 2, "1234567890", meshes[0])
	}
}

car.init();


			if(i>0){
				this.targetxd[i] = this.targetx[i]-controls.objects[i].position.x;
				this.targetyd[i] = this.targety[i]-controls.objects[i].position.y;
				this.ballxd[i] = controls.objects[0].position.x-controls.objects[i].position.x;
				this.ballyd[i] = controls.objects[0].position.y-controls.objects[i].position.y;
				this.targeta[i] = Math.atan2(this.targetyd[i], this.targetxd[i]);
				this.targetd[i] = Math.sqrt((Math.abs(this.targetxd[i])*Math.abs(this.targetxd[i]))+(Math.abs(this.targetyd[i])*Math.abs(this.targetyd[i])));
				if (this.targetd[i]>this.cdist) {
					this.v[i] = this.maxvel;
				} else {
					this.v[i] =this.maxvel*(this.targetd[i]/this.cdist);
				}
				var wy = -this.v[i]*Math.cos(this.targeta[i]);
				var wx = this.v[i]*Math.sin(this.targeta[i]);
				this.anglediff[i] = this.targeta[i]-controls.objects[i].rotation.y;
				if (Math.abs(this.anglediff[i])>3.14159){
					this.anglediff[i] = this.anglediff[i] % 3.14159;
					console.log(this.anglediff[i])
					//if (Math.abs(this.anglediff[i])>3.14159){
						
					//}
				}
				//if (this.anglediff[i]>3.14159) {this.anglediff[i] = this.anglediff[i]-6.24318;}
				//if (this.anglediff[i]<-3.14159) {this.anglediff[i] = this.anglediff[i]+6.24318;}
				//if (this.anglediff[i]>3.14159) {this.anglediff[i] = this.anglediff[i]-6.24318;}
				//if (this.anglediff[i]<-3.14159) {this.anglediff[i] = this.anglediff[i]+6.24318;}
				if (Math.abs(this.anglediff[i])<.78) {
					this.yv[i] += (wy-this.yv[i])/this.agil;
					this.xv[i] += (wx-this.xv[i])/this.agil;
				}
				
				//if (this.targetd[i]<1) {
						//this.targeta[i] = 3.14159 - Math.atan2(this.ballxd[i], this.ballyd[i]);
						//this.anglediff[i] = this.targeta[i]-controls.objects[i].rotation.y;


				//}
					
				//}

				

				
				this.angleinc[i] = (controls.objects[i].rotation.y+(this.anglediff[i]/5));

				controls.objects[i].rotation.y = this.angleinc[i]; //1.5708 + 
				if(controls.objects[i] == controls.selection){
					console.log(this.angleinc[i], this.anglediff[i], this.targeta[i]);
				}
			}