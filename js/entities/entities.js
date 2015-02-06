	//creating basic player class
	game.PlayerEntity = me.Entity.extend({
		init: function(x, y, settings){
			//constructer function
			this._super(me.Entity, 'init', [x, y, {
				//all settings
				image: "player",
				//player image
				width: 64,
				//64 width
				height: 64,
				//64 height
				//height and width are the same almost all the time
				spritewidth: "64",
				//64 spritewidth
				spriteheight: "64",
				//64 spriteheight
				getShape: function(){
					return(new me.Rect(0, 0, 64, 64)).toPolygon();
					//rectangle of what character can walk in to
				}
			}]);
				

			this.body.setVelocity(5, 20);
			//movement speed
			//changing the x and y location
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			//follows the player on the x axis on the screen

			this.renderable.addAnimation("idle", [78]);
			//telling the game what the idle position does
			this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
			//telling the game which animations to use for walking
			this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		
			this.renderable.setCurrentAnimation("idle");
			//rendering the idle position 
		},

		update: function(delta) {
			if(me.input.isKeyPressed("right")){
				//sets the position of my x by adding the velocity defined above in
				// setVelocity() and multiplying it by me.timer.tick.
				//me.timer.tick makes the movement look smooth
				this.body.vel.x += this.body.accel.x * me.timer.tick;

				this.flipX(true);
				//flips animation
				this.facing = "right";
			}
			else if(me.input.isKeyPressed("left")){
				this.facing = "left";
				//facing left when
				this.body.vel.x -=this.body.accel.x = me.timer.tick;
				//making player accelerate to the left
				this.flipX(false);
				//dont want player to look like hes walking right
				//when walking left
			}else{

				this.body.vel.x = 0;
				//checking if velocity is 0
			}

			if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
				//if not jumping or falling. jump ^
				//this is on Y axis so dont want this in the if else
				this.jumping = true;
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}

			
//
		if(me.input.isKeyPressed("attack")){
			//if attack key "a" is pressed...
				
				if(!this.renderable.isCurrentAnimation("attack")){
					//Sets the current animation to attack and once that is over
					//goes back to the idle animation
					this.renderable.setCurrentAnimation("attack", "idle");
					//Mkaes it so that the the next time we start this sequence 
					//we start from the first animation, not wherever we left off at
					//when we switched to another animation
					this.renderable.setAnimationFrame();
				}
			}		
			else if(this.body.vel.x !== 0) {
			//only going to walk animation if guy is moving

			if (!this.renderable.isCurrentAnimation("walk")) {
				//if this is not walking
				this.renderable.setCurrentAnimation("walk");
				//walking
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
			//setting animation to idle if not walking
		}
		me.collision.check(this, true, this.collideHandler.bind(this), true);
			this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			//updating the super function "delta"
			return true;
			//returning true
		},

		collideHandler: function(response) {
			if (response.b.type==='EnemyBaseEntity') {
				//see if it is a enemy base entity
				var ydif = this.pos.y - response.b.pos.y;
				//difference between players y position
				//and bases y
				var xdif = this.pos.x - response.b.pos.x;
				//difference between players x position
				//and bases x
				
				if(ydif<-40 && xdif< 70 && xdif>-35) {
					//if ydif is beyond 30
					this.body.falling = false;
					//and falling is false
					this.body.vel.y = -1;
				}

				if (xdif>-35 && this.facing==='right' && (xdif<0)){
					//go beyond 35 stop moving
					//making sure if youre on the right side even if 
					//they're coliding they wont both trigger

					this.body.vel.x = 0;
					this.pos.x = this.pos.x -1; 
				
				}else if(xdif<70 && this.facing==='left' && (xdif>0)){
					this.body.vel.x = 0;
					//when your not moving
					this.pos.x = this.pos.x +1;
				}
			}
		}
});


			game.PlayerBaseEntity = me.Entity.extend({
				init : function(x, y, settings) {
				this._super(me.Entity, 'init', [x, y, {
					image: "tower",
					//tower image
					width: 100,
					height: 100,
					spritewidth: "100",
					//spright width 100
					spriteheight: "100",
					//sprite height 100
					getShape: function(){
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
				}]);
				this.broken = false;
				//variable saying tower is not destroyed
				this.health = 10;
				//10 health
				this.alwaysUpdate = true;
				//even if tower is not showing on screen it still
				//is updating
				this.body.onCollision = this.onCollision.bind(this);
				//if someone runs in to the tower it will be able to collide with it
				this.type = "PlayerBaseEntity";

				this.renderable.addAnimation("idle", [0]);
				//at the 0 idle posotion
				this.renderable.addAnimation("broken", [1]);
				//at the 1 position
				this.renderable.setCurrentAnimation("idle");
				//idle position
			},

			update:function(delta){
				if(this.health<=0){
					//if my health is greater then or equal to 0
					this.broken = true;
					//they we are dead
					this.renderable.setCurrentAnimation("broken");
				}
				this.body.update(delta);
				//making sure delta updates

				this._super(me.Entity, "update", [delta]);
				//calling super class
				return true;
				//returning true
			},

			onCollision: function(){
				//on collision function empty for now

			}

		});


			game.EnemyBaseEntity = me.Entity.extend({
				//comments are in code above because theyre exactly the same
			init : function(x, y, settings){
				this._super(me.Entity, 'init', [x, y, {
					image: "tower",
					width: 100,
					height: 100,
					spritewidth: "100",
					spriteheight: "100",
					getShape: function(){
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
				}]);
				this.broken = false;
				this.health = 10;
				this.alwaysUpdate = true;
				this.body.onCollision = this.onCollision.bind(this);

				this.type = "EnemyBaseEntity";

				this.renderable.addAnimation("idle", [0]);
				//at the 0 idle posotion
				this.renderable.addAnimation("broken", [1]);
				//at the 1 position
				this.renderable.setCurrentAnimation("idle");
				//idle position
			
			},

			update:function(delta){
				if(this.health<=0){
					this.broken = true;
					this.renderable.setCurrentAnimation("broken");
					//renderable is in melonjs to be able to add animations so they will render
				}
				this.body.update(delta);

				this._super(me.Entity, "update", [delta]);
				return true;
			},

			onCollision: function(){

			}

		});
