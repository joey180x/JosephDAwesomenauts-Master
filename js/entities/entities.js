//creating basic player class
game.PlayerEntity = me.Entity.extend({
	//init is constructor function with 3 parameters
	init: function(x, y, settings){
		//passes x, y
		this.setSuper(x, y);
		//sets the x and y 
		this.setPlayerTimers();
		//player timer
		this.setAttributes();
		//setting attributes
		this.type = "PlayerEntity";
		//player entity
		this.setFlags();
		//following player
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//following player
		this.addAnimation();
		//animation
		this.renderable.setCurrentAnimation("idle");
	},

	
	setSuper: function(x, y){
		//super function for x and y
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64, 
			height: 64, 
			spritewidth: "64",
			spriteheight: "64",
			//width and height of player
			getShape: function(){
				//.toPolygon turns shape into a polygon
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},

	//new setPlayerTimers function
	setPlayerTimers: function(){
		//keeps track of what time it is
		this.now = new Date().getTime();
		//tracks last hit
		this.lastHit = this.now;
		//tracks last spear throw
		this.lastSpear = this.now;
		//creates hit delay
		this.lastAttack = new Date().getTime(); //Havent used attack variable yet
	},

	//new setAttributes function
	setAttributes: function(){
		//sets health of player to playerHealth
		this.health = game.data.playerHealth;
		//sets velocity or movement speed for player
		//changed y movement
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//setting up attack variable
		this.attack = game.data.playerAttack;
	},

	//new setFlags function
	setFlags: function(){
		//keeps track of which direction your character is going
		this.facing = "right";
		//player is not dead initially
		this.dead = false;
		//changes original state to not attacking
		this.attacking= false;
	},

	//new addAnimation function
	addAnimation: function(){
		//adding "idle animation"
		this.renderable.addAnimation("idle", [78]);
		//adding "walk" animation and setting images to use
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//adding "attack" animation
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},

	//what happens on the fly
	update: function(delta){
		//updates this.now(keeps timer up to date)
		this.now = new Date().getTime();
		//new dead class
		//fixed in vid 34
		this.dead = this.checkIfDead();
		//new checkKeyPressesAndMove class
		this.checkKeyPressesAndMove();
		//new checkAbilityKeys class
		this.checkAbilityKeys();
		//new setAnimation class
		this.setAnimation();
		//checks for collisions/passes function into collideHandler
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//tells all the code to actually work
		//delta is change in time that happened
		//must always update for screen to run
		this.body.update(delta);

		//updates animation on the fly
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//new checkIfDead function
	checkIfDead: function(){
		//if health ever goes below 0...
		if(this.health <=0){
			//player is dead
			//dont actually want to set yourself to dead here
			return true;
		}
		return false;
	},

	//new checkKeyPressesAndMove function
	checkKeyPressesAndMove: function(){
		//checks if right key was pressed
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}
		//checks if left key was pressed
		else if(me.input.isKeyPressed("left")){
			this.moveLeft();
		}
		//if right is not clicked, dont move
		else{
			this.body.vel.x = 0;
		}
		//checks if space bar was pressed/cant jump while in air
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.jump();
		}

		//sets this.attacking class to the key being pressed
		this.attacking = me.input.isKeyPressed("attack");
	},

	//new moveRight function
	moveRight: function(){
		//adds to the position of my x by the velocity defined above in setVelocity()
		//and multiplying it by me.timer.tick
		//me.timer.tick makes movement look smooth
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		//makes character face right
		this.facing = "right";
		//flips animation position 180 degrees
		this.flipX(true);
	},

	//new moveLeft function
	moveLeft: function(){
		//moves player left
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		//makes character face left	
		this.facing = "left";
		//false b/c dont want player to look like he is walking right
		this.flipX(false);
	},

	//new jump function
	jump: function(){
		this.body.jumping = true;
		//moves player upwards
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	//new checkAbilityKeys function
	checkAbilityKeys: function(){
		//if skill1 pressed...
		if(me.input.isKeyPressed("skill1")){
			//this.speedBurst();
		}
		//if skill2 pressed...
		else if(me.input.isKeyPressed("skill2")){
			//this.eatCreep();
		}
		//if skill3 pressed...
		else if(me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}
	},

	//new throwSpear function
	throwSpear: function(){
		//if spear cooldown time complete...&&...player has ability 3 unlocked...
		if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0){
		//updates timer to this.now
		this.lastSpear = this.now;
		//builds spear variable
		var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
		//adds spear into the world
		me.game.world.addChild(spear, 10);
		}
	},

	//new setAnimation function
	setAnimation: function(){
		//if attack key is pressed...
		if(this.attacking){
			//if current animation isnt attack then sets current animation to attack then idle
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}

		//walk animation only if character is moving
		//only if there is no current attack animation
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			//doesnt start walk animation if it is already walking
			if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
			}
		}
		//if velocity is 0 set to idle
		//set to idle if not currently attacking
		else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}
	},

	//new loseHealth function
	loseHealth: function(damage){
		//if player gets hit...health gets subtracted by amount of damage
		this.health = this.health - damage;
	},

	//holds all info about collision
	collideHandler: function(response){
		//response.b = enemy base entity
		if(response.b.type==='EnemyBaseEntity'){
			this.collideWithEnemyBase(response);
		}
		//if touching enemy creep...
		else if(response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response);
		}
	},

	//new collideWithEnemyBase function
	collideWithEnemyBase: function(response){
			//represents dif between player y position and base y position
			var ydif = this.pos.y - response.b.pos.y;
			//represents dif between player x position and base x position
			var xdif = this.pos.x - response.b.pos.x;

			//y difference for landing on the top of the base
			if(ydif<-50 && xdif<70 && xdif>-35){
				//cant fall through base
				this.body.falling = false;
				//slightly moves player down once stopped
				this.body.vel.y = -1;
			}
			//if walking in from left and facing right, stop at certain point/prevents differences from overlapping
			else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
				//stops player from moving
				this.body.vel.x = 0;
			}
			//if walking in from right and facing left, stop at certain point/prevents differences from overlapping
			else if(xdif<70 && this.facing==='left' && (xdif>0)){
				//stops player from moving
				this.body.vel.x = 0;
			}

			//if you are attacking, and in contact with base
			//sets intervals between attacks
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//delays hit for a bit
				this.lastHit = this.now;
				//calls loose health function
				//passes game.data.playerAttack (how much damage player deals)
				response.b.loseHealth(game.data.playerAttack);
			}
	},

	//new collideWithEnemyCreep function
	collideWithEnemyCreep: function(response){
			//new variables
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			//new stopMovement class
			//passes xdif as parameter
			this.stopMovement(xdif);
			//if new checkAttack class...
			if(this.checkAttack(xdif, ydif)){
				//new hitCreep class
				//passes response
				this.hitCreep(response);
			};

			
	},

	//new stopMovement function
	stopMovement: function(xdif){
		//if xdif is greater than 0...not on far left of screen...
			if(xdif>0){
				//if facing left though
				if(this.facing==="left"){
					//stops player
					this.body.vel.x = 0;
				}
			}

			else{
				//if facing right though
				if(this.facing==="right"){
					//stops player
					this.body.vel.x = 0;
				}
			}
	},

	//new checkAttack function
	checkAttack: function(xdif, ydif){
		//if player is attacking and hasn't attacked for the set amount of time...
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
				//starts absolute value of y difference..no greater than 40
			 && (Math.abs(ydif) <=40) && 
			 //if x difference is greater than 0 and player is facing left...
			 //|| means or
			 //if x difference is less than 0 and player is facing right...
			 //player can only attack creep if it is facing towards it
			 (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
			 ){
				//makes creep lose health 
				this.lastHit = this.now;

				//statement is true
				return true;
			}
			//else it is false
			return false;
	},

	//new hitCreep function
	hitCreep: function(response){
		//if creep health is less than player attack...
				if(response.b.health <= game.data.playerAttack){
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);
				}
				//calls loose health function
				//passes game.data.playerAttack (how much damage player deals)
				response.b.loseHealth(game.data.playerAttack);
	}
});