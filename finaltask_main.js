var main = (function() {
    var main = function(vert, frag, color_name){
  if(!(this instanceof main)) {
            return new main();
  }
        this.vert = vert;
        this.frag = frag;
        this.color_name = color_name;
        this.rainbow_color = null;
        this.volume = new KVS.LobsterData();
        var screen = new KVS.THREEScreen();

        screen.init(this.volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById('display'), enableAutoResize: false
        });
        
        var bounds = Bounds( this.volume );
        screen.scene.add( bounds );

        this.isovalue = 128;
        this.surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name);
        screen.scene.add( this.surfaces );

	
        document.addEventListener( 'mousemove', function() {
          screen.light.position.copy( screen.camera.position );
        });

        window.addEventListener('resize', function() {
          screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
        });
        

        screen.loop();
        
    }
    
    var change_surfaces = main.prototype;

    change_surfaces.setVolume = function(volume){
        this.volume = volume;
    }
    
    change_surfaces.setMesh = function(surfaces){
        this.surfaces = surfaces;
    }
    
    change_surfaces.set_surfaces = function( value ) {
        this.isovalue = parseInt(value*255);
        var surfaces = Isosurfaces( this.volume, this.isovalue , this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_shader = function( vert, frag ){
        this.vert = vert;
        this.frag = frag;
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_color = function( color_name ){
        this.color_name = color_name;
        this.rainbow_color = null;
	this.plane_rainbow_color = null;
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color);
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_any_color = function( red_value , green_value , blue_value ){
        this.rainbow_color = new THREE.Color( red_value, green_value, blue_value);
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_plane_color = function(isovalue){
	this.plane_isovalue = isovalue;
    }
    
    change_surfaces.set_plane_any_color = function(red_value , green_value , blue_value){
        this.plane_rainbow_color = new THREE.Color( red_value, green_value, blue_value);
    }
    
    change_surfaces.update_plane_color = function(vert, frag){
    }

    
    return main;
})();

