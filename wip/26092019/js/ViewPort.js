class ViewPort extends THREE.Object3D{
    constructor() {
        super();
        this.scene = new THREE.Scene();
        //this.container = document.getElementById("container");
        this.renderer = new THREE.WebGLRenderer({canvas:document.getElementById("canvas3d"),antialias:true});

        this.renderer.physicallyCorrectLights = true;
    	//this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type =THREE.PCFSoftShadowMap; //THREE.BasicShadowMap; //// THREE.PCFShadowMap; 
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    	this.scene.background = new THREE.Color( 0x7799ff );
        this.camera = new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, -10000, 50000);
    	this.scene.add(this.camera);
    	this.camera.position.set(0, 0,100);
    	this.camera.lookAt(this.scene.position);
    	
        this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 8, 8), new THREE.MeshBasicMaterial({color: 0xff00ff}));
        this.lights = new THREE.Object3D();

    	this.light = new THREE.AmbientLight("#ffffff", 3);
    	this.lights.add(this.light);

        this.light1 = new THREE.PointLight("#ffffff",800,0,1);
        this.light1.position.set(-150, -250, 150);
        this.lights.add(this.light1);

        this.light2 = new THREE.PointLight("#ffffff",800,0,1);
        this.light2.position.set(150, 250, 150);
        this.lights.add(this.light2);

        this.scene.add(this.lights)
        
        window.addEventListener( 'resize', (event) => { this.onWindowResize(event) }, false );
        //document.addEventListener( 'mousemove', (event) => {this.onDocumentMouseMove(event)}, false );

    	this.animate();
		this.plane.visible = false;
		this.scene.add(this.plane);
    }

    onWindowResize(event){
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.dispatchEvent({ type: "resize" });
    }

    animate(){
        requestAnimationFrame(() => { this.animate() } );
        this.renderer.render(this.scene, this.camera);
        this.dispatchEvent({ type: "enterframe" });
    }
}