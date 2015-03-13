	//creating basic player class
	game.PlayerEntity = me.Entity.extend({
		init: function(x, y, settings){
			//constructer function
			this.setSuper(x, y);
			this.setPlayerTimers();
			this.setAttributes();
			this.type = "PlayerEntity";
			this.setFlags();
			
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			//follows the player on the x axis on the screen

			this.addAnimation();


			
		
			this.renderable.setCurrentAnimation("idle");
			//rendering the idle position 
		},

		setSuper: function(x, y){
			//
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
		},

		setPlayerTimers: function(){
			this.now = new Date().getTime();
			this.lastHit = this.now;
			this.lastAttack = new Date().getTime(); //Haven't used this

		},

		setAttributes: function(){
			this.health = game.data.playerHealth;
			this.body.setVelocity(game.data.playerMoveSpeed, 20);
			//movement speed
			//changing the x and y location
			this.attack = game.data.playerAttack;
		},

		setFlags: function(){
			this.facing = "right";
			//keeps track of which direction your character is going
			this.dead = false;
			this.attacking = false;
			},
		addAnimation: function(){
			this.renderable.addAnimation("idle", [78]);
			//telling the game what the idle position does
			this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
			//telling the game which animations to use for walking
			this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		},

		update: function(delta) {
			this.now = new Date().getTime();

			this.dead = this.checkIfDead();

			this.checkKeyPressesAndMove();

			
		this.setAnimation();

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			//updating the super function "delta"
			return true;
			//returning true
		},

		checkIfDead: function(){
			if (this.health <= 0){
				return true;
			}
			return false
		},

		checkKeyPressesAndMove: function(){
			if(me.input.isKeyPressed("right")){
				this.moveRight();
			}else if(me.input.isKeyPressed("left")){
				this.moveLeft();
			}else{
				this.body.vel.x = 0;
				//checking if velocity is 0
			}
			if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
				//if not jumping or falling. jump ^
				//this is on Y axis so dont want this in the if else
				this.jump();
			}

			this.attacking = me.input.isKeyPressed("attack");

		},

		moveRight: function(){
			//sets the position of my x by adding the velocity defined above in
				// setVelocity() and multiplying it by me.timer.tick.
				//me.timer.tick makes the movement look smooth
				this.body.vel.x += this.body.accel.x * me.timer.tick;

				this.flipX(true);
				//flips animation
				this.facing = "right";
		},

		moveLeft: function(){
			this.facing = "left";
			//facing left when
			this.body.vel.x -= this.body.accel.x = me.timer.tick;
			//making player accelerate to the left
			this.flipX(false);
			//dont want player to look like hes walking right
			//when walking left
		},

		jump: function(){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			},
		
		setAnimation: function(){
			if(this.attacking){
	if(!this.renderable.isCurrentAnimation("attack")){
		//Sets the current animation to attack and once that is over
		//goes back to the idle animation
		this.renderable.setCurrentAnimation("attack", "idle");
		//Makes it so that the next time we start this sequence we begin
		//from the first animation, not wherever we left off when
		//we switched to another animation
		this.renderable.setAnimationFrame();
	}
}
else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
	if(!this.renderable.isCurrentAnimation("walk")){
		this.renderable.setCurrentAnimation("walk");
	}
}else if(!this.renderable.isCurrentAnimation("attack")){
	this.renderable.setCurrentAnimation("idle");
}
		},

		loseHealth: function(damage){
			this.health = this.health - damage;
			//console.log("this.health");
		},

		collideHandler: function(response) {
			if (response.b.type==='EnemyBaseEntity') {
				//see if it is a enemy base entity
				this.collideWithEnemyBase(response);
			}else if(response.b.type==='EnemyCreep'){

				this.collideWithEnemyCreep(response);
	}
		},

		collideWithEnemyBase: function(response){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}
			else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >=1000){
				this.lastHit = this.now;
				response.b.loseHealth();
			}

		},
			collideWithEnemyCreep: function(response){
				var xdif = this.pos.x - response.b.pos.x;
				var ydif = this.pos.y - response.b.pos.y;

				this.stopMovement(xdif);
				//stop x movement 

				if(this.checkAttack(xdif, ydif)){
					this.hitCreep(response);
					//creep responds to hit
				};
				
			},

			stopMovement: function(xdif){
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
			},
			checkAttack: function(xdif, ydif){
				if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
						&& (Math.abs(ydif) <=40) && 
						((xdif>0 && this.facing==="left") || ((xdif<0) && this.facing==="right"))
						//if player is to the right of the creep and Im facing to the left
						//then i am allowed to attack it otherwize it wont work
						){
					this.lastHit = this.now;
					return true;
					//return true
					
				}
				return false;
			},
			hitCreep: function(response){
				if(response.b.health <= game.data.playerAttack){
						//if the creeps health is less than our attack execute code in if statement
						game.data.gold += 1;
						//adds one gold for a creep kill
						//console.log("Current gold: " + game.data.gold);
					}

					response.b.loseHealth(game.data.playerAttack);
				//only loses health if attacking
				
			}
});


