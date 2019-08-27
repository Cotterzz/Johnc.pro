var constant = {PI:3.1415926535,ETA:1.5708,TAU:6.283184,TURN:360,HTURN:180,QTURN:90,RADIAN:57.29579};

var loader = new THREE.TextureLoader();
var loadedTexture;
var loadedBump;
var loadedWater;
var loadedCloud;
var loadedSky;
var multiplier = 2048/360;

var VRReady = true;

var earthRadiusKm = 6371;
var moonRadiusKm=1737;
var moonDistanceKm = 384000;
var sunRadiusKm = 695510;
var sunDistanceKm = 149600000;

var earthRadiusGl = 5; 
var scaleFactor = earthRadiusKm/earthRadiusGl;

var moonRadiusGl = moonRadiusKm/scaleFactor;
var moonDistanceGl  = moonDistanceKm/scaleFactor;
var sunRadiusGl  = sunRadiusKm/scaleFactor;
var sunDistanceGl = sunDistanceKm/scaleFactor;


var ball = {
    mesh: null,
    geometry: null,
    material: null,
    init: function() {
        this.geometry = new THREE.SphereGeometry(5, 64, 64);

        //this.material = new THREE.MeshBasicMaterial({map: loadedTexture});
        console.log("BALL1");
        this.material = new THREE.MeshPhongMaterial({
            map: loadedTexture, side:THREE.DoubleSide ,bumpMap: loadedBump,bumpScale:   0.01, specularMap: loadedWater,emissiveMap : loadedWater,specular: new THREE.Color('#cccccc'),emissive: new THREE.Color("#111111")
        })
        console.log("BALL2");

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        console.log("BALL3");
         
        this.mesh.position.set(0, 0, -30);
        //this.mesh.castShadow = true;
        //this.mesh.receiveShadow = true;
    }
};


var markers = {
    list:[],
    createMarker: function(lat, long, size){
        var marker = new THREE.Mesh();

        var cgeometry = new THREE.CylinderGeometry( .02, .02, 6, 32 );

        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        //marker.add( cylinder );

        cylinder.position.set(0, 3, 0);

        var bgeometry = new THREE.SphereGeometry(size, 32, 32);

        var bmaterial = new THREE.MeshBasicMaterial({color: 0xffff44});

        var bmesh = new THREE.Mesh(bgeometry, bmaterial);

        marker.add( bmesh );
        bmesh.position.set(0, 5, 0);
        var light = new THREE.PointLight("#ffff44", 0.1, 1, 1);
        marker.add( light);
        light.position.set(0, 5.1, 0);
        ball.mesh.add(marker);
        marker.rotation.z = (lat-90)/-constant.RADIAN;
        marker.rotation.y = (long+180)/constant.RADIAN;
    },
    init: function(){
        for (var i = 0; i<data.length; i++ ){
            var xpos = (data[i][3] + 180) * multiplier;
            var ypos = (data[i][2] - 90) * -multiplier;
            //this.skinContext.fillRect(xpos, ypos, data[i][1]/1000000, data[i][1]/1000000);
            console.log("BALL4");
            this.createMarker(data[i][2],data[i][3],0.02);//data[i][1]/60000000);
        }
    }
}




/*
var dataBall = {
    mesh: null,
    geometry: null,
    material: null,
    texture: null,
    //skinCanvas: null,
    //skinContext: null,
    init: function() {
        //this.skinCanvas = document.createElement('canvas');
       // this.skinCanvas.width = 2048;
        //this.skinCanvas.height = 1024;
        //this.skinContext = this.skinCanvas.getContext('2d');
        //this.skinContext.fillStyle = 'white';
        //this.skinContext.fillRect(0, 0, 1024, 512);
       

       // this.texture.needsUpdate = true;
        this.geometry = new THREE.SphereGeometry(5.05, 64, 64);
        this.material = new THREE.MeshPhongMaterial( { map: loadedCloud,  transparent:true  , overdraw: 0.5 , opacity:.5 });
        //this.material = new THREE.MeshStandardMaterial({
            //color: 0x00ff00, map: this.texture, transparent:true  , opacity:.5  , overdraw: 0.5
        //});
       
        //this.mesh.position.set(2, 2, 0.15);
        //this.mesh.castShadow = true;
        //this.mesh.receiveShadow = true;
        
         this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
};


*/
var controller = {
    init:function(){
        viewport.init();
        //dataBall.init();
        ball.init();
        viewport.scene.add(ball.mesh);
        skybox.init();
        viewport.scene.add(skybox.mesh);
        markers.init();
        //viewport.scene.add(dataBall.mesh);
        viewport.scene.add(new THREE.AmbientLight("#000077", 1));
        var light1 = new THREE.PointLight("#ffffff", 150, 100, 2);
        viewport.scene.add(light1);
        light1.position.set(10, 10, 10);
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        viewport.scene.add(directionalLight);
        directionalLight.position.set(10, 10, 10);

        viewport.vranimate();
    }
};

var skybox = {
    geometry:null,
    mesh:null,
    material:null,

    init:function(){
        this.geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        this.geometry.scale( - 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial( {
            map: loadedSky
        } );

        this.mesh = new THREE.Mesh( this.geometry,this.material );
    }
}


var viewport = {
    init:function(){

        this.container = document.getElementById("container");
        this.renderer = new THREE.WebGLRenderer({canvas:document.getElementById("canvas3d")      });          //, antialias: true });

        if(VRReady){
            this.renderer.vr.enabled = true;
            document.body.appendChild( WEBVR.createButton( this.renderer ) );
        }
       
        this.renderer.physicallyCorrectLights = true;
        //this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type = THREE.BasicShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
        this.scene.add(this.camera);
        this.camera.position.set(0, 0, 302);
        this.camera.lookAt(this.scene.position);
        //this.orbitcontrols = new THREE.OrbitControls(this.camera, this.container);

        //if(VRReady){this.renderer.setAnimationLoop( this.vranimate )} else {
            //this.animate();
        //}
        //this.animate();
    },


    vranimate:function(){
        viewport.renderer.setAnimationLoop( viewport.vrrender )
        
    },

    vrrender:function(){
        viewport.renderer.render(viewport.scene, viewport.camera);
        ball.mesh.rotation.y +=0.01;
    }


    //animate:function(){
        //requestAnimationFrame(viewport.animate);
        //viewport.renderer.render(viewport.scene, viewport.camera);
    //}
};

//loader.load( 'images/texture_2048x1024.jpg', function ( texture ) {loadedTexture = texture; controller.init();} );
/*
loader.load( 'images/texture_2048x1024.jpg', function ( texture ) {
    loadedTexture = texture;
    loader.load( 'images/bump_2048x1024.jpg', function ( texture ) {
        loadedBump = texture;
        loader.load( 'images/water_2048x1024.jpg', function ( texture ) {
            loadedWater = texture;
            loader.load( 'images/clouds_2048x1024.png', function ( texture ) {
                loadedCloud = texture;
                controller.init();
            } );
        } );
    } );
} );


loader.load( dataurl, function ( texture ) {
    loadedTexture = texture;
    textureCube = loader2.load( [
        ipx, inx,
        ipy, iny,
        ipz, inz
    ], function ( texture ) {
        loader.load( sandimg, function ( texture ) {
            sandTexture = texture;
            loader.load( alphaimg, function ( texture ) {
                alphatex = texture;
                loader.load( bgimg, function ( texture ) {
                    bgtex = texture;
                    controller.init();
                });
            });
        });
    } );
} );


*/

loader.load( imgdata1, function ( texture ) {
    loadedTexture = texture;
    loader.load( imgdata2, function ( texture ) {
        loadedBump = texture;
        loader.load( imgdata3, function ( texture ) {
            loadedWater = texture;
            loader.load( imgdata4, function ( texture ) {
                loadedSky = texture;
                controller.init();
            } );
       } );
    } );
} );

