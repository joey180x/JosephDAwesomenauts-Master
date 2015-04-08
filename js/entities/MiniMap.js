game.MiniMap = me.Entity.extend({
	//new minimap class
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			//minimap image
			width: 721,
			//width
			height: 161,
			//height
			spritewidth: "721",
			//spritewidth
			spriteheight: "161",
			//spriteheight
			getShape: function(){
				return (new me.Rect(0, 0, 699, 114)).toPolygon();
				//return map
			}
		}]);
		this.floating = true;
		//map is following you
	}

});