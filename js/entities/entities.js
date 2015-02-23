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
			this.type = "PlayerEntity";
			this.health = game.data.playerHealth;
			this.health = 20;
			this.body.setVelocity(game.data.playerMoveSpeed, 20);
			//movement speed
			//changing the x and y location
			this.facing = "right";
			this.now = new Date().getTime();
			this.lastHit = this.now;
			this.dead = false;
			this.attack = game.data.playerAttack;
			this.lastAttack = new Date().getTime(); //Haven't used this
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
			this.now = new Date().getTime();

			if (this.health <= 0){
				this.dead = true;
			}

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
				this.body.vel.x -= this.body.accel.x = me.timer.tick;
				//making player accelerate to the left
				this.flipX(false);
				//dont want player to look like hes walking right
				//when walking left
			}else{

				this.body.vel.x = 0;
				//checking if velocity is 0
			}

			if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
				//if not jumping or falling. jump ^
				//this is on Y axis so dont want this in the if else
				this.body.jumping = true;
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}

		
			if(me.input.isKeyPressed("attack")){
				if(!this.renderable.isCurrentAnimation("attack")){
					console.log(!this.renderable.isCurrentAnimation("attack"));
				//Sets the current animation to attack and once that
				//is overe go back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//Makes it so that the next time we start this sequence we
				//begin from the first animation, not wherever we left off
				this.renderable.setAnimationFrame();

			}

		}
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")){
				//if it is not showing the walk animation
				this.renderable.setCurrentAnimation("walk");
				//show walk animation
			}
		}
		else if(!this.renderable.isCurrentAnimation("attack")){
			//if not showing attack animation
			this.renderable.setCurrentAnimation("idle");
			//show idle animation
		}


		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			//updating the super function "delta"
			return true;
			//returning true
		},

		loseHealth: function(damage){
			this.health = this.health - damage;
			console.log("this.health");
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
				console.log(ydif);
				
				if(ydif<-50 && xdif< 70 && xdif>-35) {
					//if ydif is beyond 30
					this.body.falling = false;
					//and falling is false
					this.body.vel.y = -1;
				}

				else if (xdif>-35 && this.facing==='right' && (xdif<0)){
					//go beyond 35 stop moving
					//making sure if youre on the right side even if 
					//they're coliding they wont both trigger

					this.body.vel.x = 0;
					//this.pos.x = this.pos.x -1; 
				
				}else if(xdif<70 && this.facing==='left' && (xdif>0)){
					this.body.vel.x = 0;
					//when your not moving
					//this.pos.x = this.pos.x +1;
				}


				if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
					console.log("tower Hit");
					//if attacking
					//checking if it has been 400 ms since base was hit
					//going to update last hit variable so that this will work repeatedly
					this.lastHit = this.now;
					response.b.loseHealth(game.data.playerAttack);
					//responce is for b to lose health
				}
			}else if(response.b.type==='EnemyCreep'){
				var xdif = this.pos.x - response.b.pos.x;
				var ydif = this.pos.y - response.b.pos.y;

				if (xdif>0) {
					this.pos.x = this.pos.x + 1;
					if (this.facing==="left"){
						this.body.vel.x = 0;
					}
				}else{
					this.pos.x = this.pos.x - 1;
					if (this.facing==="right"){
						this.body.vel.x = 0;
					}
				}

				if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
						&& (Math.abs(ydif) <=40) && 
						((xdif>0 && this.facing==="left") || ((xdif<0) && this.facing==="right"))
						//if player is to the right of the creep and Im facing to the left
						//then i am allowed to attack it otherwize it wont work
						){
					this.lastHit = this.now;
					if(response.b.health <= this.attack)

					response.b.loseHealth(game.data.playerAttack);
				//only loses health if attacking
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
				this.health = game.data.enemyBaseHealth;
				//10 health
				this.alwaysUpdate = true;
				//even if tower is not showing on screen it still
				//is updating
				this.body.onCollision = this.onCollision.bind(this);
				//if someone runs in to the tower it will be able to collide with it
				this.type = "PlayerBase";

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

			loseHealth: function(damage){
				this.health = this.health - damage;
				//base lose health when it gets damaged
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

			},

			loseHealth: function(){
				this.health--;	
			}

		});
game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;
		//this attacking lets us know if the ememy is currently attacking
		this.attacking = false;
		//this.attacking lets us know if the enemy is currently attacking

		this.lastAttacking = new Date().getTime();
		//keeps track when our creep last attacked
		this.lastHit = new Date().getTime();
		//keeps track of last time the creep hit anything
		this.now = new Date().getTime();
		//timer for attacking player base
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
		},

	loseHealth: function(damage){

		this.health = this.health - damage;
	},

	update: function(delta){
		console.log(this.health);
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();
		//refresh every single time



		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//checking for collisions

		this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			//updating the super function "delta"


		return true;
	},

	collideHandler: function(response) {
		if(response.b.type==='PlayerBase'){
		//whatever creep isrunning in to
			this.attacking=true;
			//attacking is true
			this.lastAttacking=this.now;
			//timer of when last attack
			this.body.vel.x = 0;
			//making velocity 0
			//keeps movning the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//evertime I hit the base i want to stop 
			//movement by sliding a little to the right

			if((this.now-this.lastHit >= 1000)){
				//checks that is has ben at least 1 second since the creep hit a base
				//if its been more than a second since attack i will
				//attack again
				this.lastHit = this.now;
				//updates he last hit timer
				//reset it to now is current timer
				response.b.loseHealth(game.data.enemyCreepAttack );
				//makes the player base call its losehealth function
				//and passes it a damage of 1

			}
		}else if (response.b.type==='PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking=true;
			//attacking is true
			//this.lastAttacking=this.now;
			//timer of when last attack
			
			if(xdif>0){
				this.pos.x = this.pos.x + 1;
				//evertime I hit the base i want to stop 
			//movement by sliding a little to the right
				this.body.vel.x = 0;
			//making velocity 0
			//keeps movning the creep to the right to maintain its position
			}

			if((this.now-this.lastHit >= 1000) && xdif>0){
				//checks that is has ben at least 1 second since the creep hit something
				//if its been more than a second since attack i will
				//attack again
				this.lastHit = this.now;
				//updates he last hit timer
				//reset it to now is current timer
				response.b.loseHealth(game.data.enemyCreepAttack);
				//makes the player call its losehealth function
				//and passes it a damage of 1

			}
		}
	}
});
game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();

		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

		if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >=1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		};

		return true;
	}
});