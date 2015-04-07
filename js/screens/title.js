game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//adds title screen image
		//0, 0 is top left of screen
		//-10 puts title screen in back in z layer
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10);

		
		//adding new game text
		//renderable means we are drawing something
		me.game.world.addChild(new (me.Renderable.extend({
			//new init function
			init: function(){
				//call to super class
				//passes in info
				//sets text location
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				//font settings
				this.font = new me.Font("Arial", 46, "white");
				//listens for mouse to be clicked down on this object
				//when mouse is clicked, calls on newGame function...then says true
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//renderable uses draw function
			//passes renderer
			draw: function(renderer){
				//draws what you want to write on the screen and the coordinates of it
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},

			//new update function
			update: function(dt){
				return true;
			},

			//new newGame function
			newGame: function(){
				//stops listening for mouse to be clicked
				me.input.releasePointerEvent('pointerdown', this);
				//starts game
				me.state.change(me.state.NEW);
			}
		})));


		//adding continue text
		//renderable means we are drawing something
		me.game.world.addChild(new (me.Renderable.extend({
			//new init function
			init: function(){
				//call to super class
				//passes in info
				//sets text location
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				//font settings
				this.font = new me.Font("Arial", 46, "white");
				//listens for mouse to be clicked down on this object
				//when mouse is clicked, calls on newGame function...then says true
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//renderable uses draw function
			//passes renderer
			draw: function(renderer){
				//draws what you want to write on the screen and the coordinates of it
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			//new update function
			update: function(dt){
				return true;
			},

			//new newGame function
			newGame: function(){
				//stops listening for mouse to be clicked
				me.input.releasePointerEvent('pointerdown', this);
				//starts game
				me.state.change(me.state.LOAD);
			}
		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
