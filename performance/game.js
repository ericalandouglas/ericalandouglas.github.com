function update_anims(){turtle_cd--;if(turtle_cd<0){if(turtle_increment==2){turtle_increment=0}else{turtle_increment++}turtle_cd=40}dozer_cd--;if(dozer_cd<0){if(dozer_increment==2){dozer_increment=0}else{dozer_increment++}dozer_cd=15}}function collide(e,t,n,r,i,s){var o,u,a,f,l,c,h,p;a=e-n;l=e+n;h=t-n;o=t+n;f=r-s;c=r+s;p=i-s;u=i+s;return!(a>c||f>l||h>u||p>o)}function rect_collide(e,t,n,r,i,s,o,u){var a,f,l,c,h,p,d,v;l=e-n;h=e+n;d=t-r;a=t+r;c=i-o;p=i+o;v=s-u;f=s+u;return!(l>p||c>h||d>f||v>a)}function create_car(e){var t=new Object;t.speed=e["speed"];t.xpos=e["xspawn"];t.ypos=e["yspawn"];t.width=e["width"];t.height=e["height"];t.ssheetx=e["ssheetx"];t.ssheety=e["ssheety"];t.ssheetw=e["ssheetw"];t.ssheeth=e["ssheeth"];t.xcenter=t.xpos+t.width/2;t.ycenter=t.ypos+t.height/2;t.colliding=rect_collide;return t}function create_log(e){var t=new Object;t.speed=e["speed"];t.xpos=e["xspawn"];t.ypos=e["yspawn"];t.width=e["width"];t.height=e["height"];t.ssheetx=e["ssheetx"];t.ssheety=e["ssheety"];t.ssheetw=e["ssheetw"];t.ssheeth=e["ssheeth"];t.xcenter=t.xpos+t.width/2;t.ycenter=t.ypos+t.height/2;t.colliding=rect_collide;return t}function respawn_frog(){if(frogger.orientation=="dead"){lives-=1}if(lives==0){game_over=true;if(score>highscore){localStorage["highscore"]=score}}else{frogger.xpos=180;frogger.ypos=491;frogger.xcent=frogger.xpos+frogger.width/2;frogger.ycent=frogger.ypos+frogger.height/2;frogger.ymax=491;frogger.orientation="up";time=3e3;timer_width=3/5*399;frogger.dead=false}}function update_cars(){for(var e in cars){cars[e].xpos+=cars[e].speed;cars[e].xcenter+=cars[e].speed;if(cars[e].colliding(cars[e].xcenter,cars[e].ycenter,cars[e].width/2-3,cars[e].height/2-3,frogger.xcent,frogger.ycent,frogger.width/2,frogger.height/2)&&!frogger.dead){frogger.dead=true;frogger.death_timer=50;frogger.orientation="dead"}if(cars[e].xpos>500){cars.splice(e,1)}}}function update_logs(){for(var e in logs){logs[e].xpos+=logs[e].speed;logs[e].xcenter+=logs[e].speed;if(logs[e].colliding(logs[e].xcenter,logs[e].ycenter,logs[e].width/2-frogger.width/2,1,frogger.xcent,frogger.ycent,frogger.width/2,frogger.height/2)){logs[e].hasfrogger=true}else{logs[e].hasfrogger=false}if(logs[e].xpos>600){logs.splice(e,1)}}var t=false;var n=-1;for(var e in logs){if(logs[e].hasfrogger){t=true;switch(logs[e].ypos){case 242:n=0;break;case 212:n=1;break;case 175:n=2;break;case 142:n=3;break;case 104:n=4;break;default:n=0}}}if(t){frogger.onlog=true;frogger.log_row=n}else{frogger.onlog=false}}function add_life(){if(prev_score>1e4){if(lives<3){lives+=1}prev_score=prev_score-1e4}}function update_lillies(){for(var e in lillies){if(rect_collide(lillies[e].xcent,lillies[e].ycent,lillies[e].width/2,lillies[e].height/2,frogger.xcent,frogger.ycent,frogger.width/2,frogger.height/2)&&!lillies[e].has_frog&&!frogger.dead){lillies[e].has_frog=true;frogs_home+=1;score+=Math.floor(time/50)*10+50;prev_score+=Math.floor(time/50)*10+50;add_life();if(lillies[e].has_fly){score+=200;prev_score+=200;lillies[e].has_fly=false;add_life()}frogger.dead=true;frogger.death_timer=25}}}function level_up(e){score+=1e3;prev_score+=1e3;add_life();for(var t in lillies){lillies[t].has_frog=false;car_specs[t]["speed"]=car_specs[t]["speed"]*1.2;car_specs[t]["time"]=car_specs[t]["time"]*.8;log_specs[t]["speed"]=log_specs[t]["speed"]*1.2;log_specs[t]["time"]=log_specs[t]["time"]*1.1}for(var n in cars){cars[n].speed=cars[n].speed*1.2}for(var n in logs){logs[n].speed=logs[n].speed*1.2}frogs_home=0}function start_Game(){game.initialize();game._intervalID=setInterval(game.run,0)}var level;var lives;var time;var prev_score;var score;var highscore;var car_timers=[];var car_specs=[];var cars=[];var log_specs=[];var logs=[];var log_spawns=[];var lillies=[];var timer_width;var frogs_home;var frogger_sprites={up:{ssheetx:10,ssheety:364,ssheetw:26,ssheeth:26},down:{ssheetx:79,ssheety:364,ssheetw:26,ssheeth:26},left:{ssheetx:79,ssheety:332,ssheetw:26,ssheeth:26},right:{ssheetx:10,ssheety:332,ssheetw:26,ssheeth:26},dead:{ssheetx:0,ssheety:0,ssheetw:30,ssheeth:30},jright:{ssheetx:41,ssheety:332,ssheetw:30,ssheeth:30},jleft:{ssheetx:110,ssheety:332,ssheetw:30,ssheeth:30},jup:{ssheetx:41,ssheety:364,ssheetw:30,ssheeth:30},jdown:{ssheetx:110,ssheety:364,ssheetw:30,ssheeth:30}};var game_over=false;var frogger={xpos:0,ypos:0,orientation:"up",cooldown:0,ymax:491,width:32,height:32,xcent:0,ycent:0,onlog:false,log_row:0,death_timer:0,dead:false};var fly_timer;var fly_sprite={ssheetx:135,ssheety:232,ssheetw:25,ssheeth:20};var fly_active=false;var turtle_increment;var turtle_cd;var dozer_increment;var dozer_cd;var imgLoaded=false;var img=new Image;img.src="frogger_sprites.png";img.onload=function(){imgLoaded=true};var imgLoaded2=false;var img2=new Image;img2.src="dead_frog.png";img2.onload=function(){imgLoaded2=true};var canvas;var ctx;var game={};game.initialize=function(){level=1;lives=3;time=3150;timer_width=3/5*399;fly_timer=750+Math.floor(Math.random()*200);turtle_increment=0;turtle_cd=40;dozer_increment=0;dozer_cd=15;if(localStorage["highscore"]==undefined){localStorage["highscore"]=0}highscore=localStorage["highscore"];score=0;prev_score=0;frogger.xpos=180;frogger.ypos=491;frogger.xcent=frogger.xpos+frogger.width/2;frogger.ycent=frogger.ypos+frogger.height/2;frogs_home=0;car_specs[0]={yspawn:315,ssheetx:104,ssheety:300,ssheetw:48,ssheeth:20,width:60,height:30,speed:-1.75,time:90,xspawn:500,spawn_count:0,max_spawn:2,timer:50};car_specs[1]={yspawn:349,ssheetx:45,ssheety:262,ssheetw:30,ssheeth:27,width:35,height:33,speed:1.75,time:80,xspawn:-100,spawn_count:0,max_spawn:3,timer:120};car_specs[2]={yspawn:385,ssheetx:8,ssheety:265,ssheetw:30,ssheeth:21,width:35,height:30,speed:-1.75,time:80,xspawn:500,spawn_count:0,max_spawn:3,timer:0};car_specs[3]={yspawn:417,ssheetx:[9,39,70],ssheety:296,ssheetw:28,ssheeth:25,width:35,height:33,speed:1.75,time:80,xspawn:-100,spawn_count:0,max_spawn:3,timer:0};car_specs[4]={yspawn:455,ssheetx:80,ssheety:265,ssheetw:27,ssheeth:26,width:35,height:32,speed:-1,time:130,xspawn:500,spawn_count:0,max_spawn:3,timer:0};log_specs[0]={yspawn:242,ssheetx:[12,52,85],ssheety:401,ssheetw:35,ssheeth:27,width:120,height:37,speed:-1.75,time:85,xspawn:500,spawn_count:0,max_spawn:5,timer:0};log_specs[1]={yspawn:212,ssheetx:5,ssheety:227,ssheetw:87,ssheeth:27,width:90,height:37,speed:1,time:150,xspawn:-100,spawn_count:0,max_spawn:3,timer:0};log_specs[2]={yspawn:175,ssheetx:5,ssheety:161,ssheetw:183,ssheeth:27,width:185,height:37,speed:2.25,time:150,xspawn:-200,spawn_count:0,max_spawn:3,timer:0};log_specs[3]={yspawn:140,ssheetx:[12,52,85],ssheety:401,ssheetw:35,ssheeth:27,width:90,height:37,speed:-1.75,time:80,xspawn:500,spawn_count:0,max_spawn:4,timer:0};log_specs[4]={yspawn:104,ssheetx:5,ssheety:192,ssheetw:119,ssheeth:27,width:120,height:37,speed:1.75,time:100,xspawn:-150,spawn_count:0,max_spawn:4,timer:0};lillies[0]={xcoord:25,ycoord:70,width:5,height:20,has_frog:false,frogx:12,frogy:70,xcent:27.5,ycent:80,has_fly:false};lillies[1]={xcoord:110,ycoord:70,width:5,height:20,has_frog:false,frogx:97,frogy:70,xcent:112.5,ycent:80,has_fly:false};lillies[2]={xcoord:195,ycoord:70,width:5,height:20,has_frog:false,frogx:182,frogy:70,xcent:197.5,ycent:80,has_fly:false};lillies[3]={xcoord:280,ycoord:70,width:5,height:20,has_frog:false,frogx:267,frogy:70,xcent:282.5,ycent:80,has_fly:false};lillies[4]={xcoord:365,ycoord:70,width:5,height:20,has_frog:false,frogx:352,frogy:70,xcent:367.5,ycent:80,has_fly:false}};game.draw=function(){canvas=document.getElementById("game");if(canvas.getContext){ctx=canvas.getContext("2d");ctx.save();ctx.clearRect(0,0,canvas.width,canvas.height);ctx.globalAlpha=1;ctx.fillStyle="#00FF00";ctx.fillRect(399/2,290,3*399/5,20);ctx.fillStyle="#191970";ctx.fillRect(0,0,399,565/2);ctx.fillStyle="#000000";ctx.fillRect(0,565/2,399,565/2);ctx.fillStyle="#00FF00";ctx.font="16pt Helvetica";ctx.fillText("Level "+level,60,545);ctx.font="12pt Helvetica";ctx.fillText("Score: "+score,0,560);ctx.font="12pt Helvetica";ctx.fillText("Highscore: "+highscore,100,560);if(time>500){ctx.fillStyle="#00FF00";ctx.font="12pt Helvetica";ctx.fillText("Time",360,540);ctx.fillRect(timer_width,545,timer_width,20)}else{ctx.fillStyle="#FF0000";ctx.font="12pt Helvetica";ctx.fillText("Time",360,540);ctx.fillRect(timer_width,545,timer_width,20)}if(imgLoaded){if(lives>0){ctx.drawImage(img,10,332,23,25,0,527,18,19)}if(lives>1){ctx.drawImage(img,10,332,23,25,17,527,18,19)}if(lives>2){ctx.drawImage(img,10,332,23,25,34,527,18,19)}ctx.drawImage(img,0,0,335,50,0,0,335,50);ctx.drawImage(img,0,53,399,62,0,48,399,62);ctx.drawImage(img,0,113,399,45,0,275,399,45);ctx.drawImage(img,0,113,399,45,0,485,399,45);ctx.strokeStyle="#FF0000";for(var e in cars){if(cars[e].ypos==417){ctx.drawImage(img,cars[e].ssheetx[dozer_increment],cars[e].ssheety,cars[e].ssheetw,cars[e].ssheeth,cars[e].xpos,cars[e].ypos,cars[e].width,cars[e].height)}else{ctx.drawImage(img,cars[e].ssheetx,cars[e].ssheety,cars[e].ssheetw,cars[e].ssheeth,cars[e].xpos,cars[e].ypos,cars[e].width,cars[e].height)}}for(var e in logs){if(logs[e].ypos==140){ctx.drawImage(img,logs[e].ssheetx[turtle_increment],logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos,logs[e].ypos,logs[e].width/2,logs[e].height);ctx.drawImage(img,logs[e].ssheetx[turtle_increment],logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos+logs[e].width/2,logs[e].ypos,logs[e].width/2,logs[e].height)}else if(logs[e].ypos==242){ctx.drawImage(img,logs[e].ssheetx[turtle_increment],logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos,logs[e].ypos,logs[e].width/3,logs[e].height);ctx.drawImage(img,logs[e].ssheetx[turtle_increment],logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos+logs[e].width/3,logs[e].ypos,logs[e].width/3,logs[e].height);ctx.drawImage(img,logs[e].ssheetx[turtle_increment],logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos+2*logs[e].width/3,logs[e].ypos,logs[e].width/3,logs[e].height)}else{ctx.drawImage(img,logs[e].ssheetx,logs[e].ssheety,logs[e].ssheetw,logs[e].ssheeth,logs[e].xpos,logs[e].ypos,logs[e].width,logs[e].height)}}update_anims();if(frogger.orientation!="dead"&&!frogger.dead){if(frogger.cooldown<0){ctx.drawImage(img,frogger_sprites[frogger.orientation]["ssheetx"],frogger_sprites[frogger.orientation]["ssheety"],frogger_sprites[frogger.orientation]["ssheetw"],frogger_sprites[frogger.orientation]["ssheeth"],frogger.xpos,frogger.ypos,frogger.width,frogger.height)}else{ctx.drawImage(img,frogger_sprites["j"+frogger.orientation]["ssheetx"],frogger_sprites["j"+frogger.orientation]["ssheety"],frogger_sprites["j"+frogger.orientation]["ssheetw"],frogger_sprites["j"+frogger.orientation]["ssheeth"],frogger.xpos,frogger.ypos,frogger.width,frogger.height)}}else{ctx.drawImage(img2,frogger_sprites[frogger.orientation]["ssheetx"],frogger_sprites[frogger.orientation]["ssheety"],frogger_sprites[frogger.orientation]["ssheetw"],frogger_sprites[frogger.orientation]["ssheeth"],frogger.xpos,frogger.ypos,frogger.width,frogger.height)}for(var t in lillies){if(lillies[t].has_frog){ctx.drawImage(img,frogger_sprites["down"]["ssheetx"],frogger_sprites["down"]["ssheety"],frogger_sprites["down"]["ssheetw"],frogger_sprites["down"]["ssheeth"],lillies[t].frogx,lillies[t].frogy,frogger.width,frogger.height)}if(lillies[t].has_fly){ctx.drawImage(img,fly_sprite["ssheetx"],fly_sprite["ssheety"],fly_sprite["ssheetw"],fly_sprite["ssheeth"],lillies[t].frogx,lillies[t].frogy,frogger.width-5,frogger.height-8)}}}if(time>3e3){ctx.fillStyle="#000000";ctx.fillRect(125,257,150,50);ctx.strokeStyle="#00FF00";ctx.strokeRect(125,257,150,50);ctx.fillStyle="#00FF00";if(time>3025){ctx.font="26pt Helvetica";ctx.fillText("Ready",150,295)}else{ctx.font="26pt Helvetica";ctx.fillText("GO!",170,295)}}if(frogs_home==5){ctx.fillStyle="#000000";ctx.fillRect(120,257,160,50);ctx.strokeStyle="#00FF00";ctx.strokeRect(120,257,160,50);ctx.fillStyle="#00FF00";ctx.font="26pt Helvetica";ctx.fillText("Level Up!",130,295)}if(lives==0){ctx.fillStyle="#000000";ctx.fillRect(120,257,160,50);ctx.strokeStyle="#00FF00";ctx.strokeRect(120,257,160,50);ctx.fillStyle="#00FF00";ctx.font="22pt Helvetica";ctx.fillText("Game Over",125,293)}ctx.restore()}else{alert("Sorry, canvas is not supported on your browser!")}};$(document).keydown(function(e){if(!game_over&&time<3e3){var t=e.keyCode||e.which,n={left:37,up:38,right:39,down:40};switch(t){case n.left:if(frogger.xpos-29>-10&&frogger.cooldown<0&&!frogger.dead){frogger.xpos-=29;frogger.cooldown=5;frogger.orientation="left";frogger.xcent-=29}break;case n.up:if(frogger.ypos-35>10&&frogger.cooldown<0&&!frogger.dead){frogger.ypos-=35;frogger.cooldown=5;frogger.orientation="up";frogger.ycent-=35;if(frogger.ypos<frogger.ymax){score+=10;prev_score+=10;add_life();frogger.ymax=frogger.ypos}}break;case n.right:if(frogger.xpos+29<375&&frogger.cooldown<0&&!frogger.dead){frogger.xpos+=29;frogger.cooldown=5;frogger.orientation="right";frogger.xcent+=29}break;case n.down:if(frogger.ypos+35<500&&frogger.cooldown<0&&!frogger.dead){frogger.ypos+=35;frogger.cooldown=5;frogger.orientation="down";frogger.ycent+=35}break}}});game.update=function(){if(!game_over){time-=1;frogger.death_timer-=1;fly_timer-=1}if(time%25==0&&time<3e3){timer_width+=1.33}frogger.cooldown-=1;for(var e in car_specs){car_specs[e]["timer"]-=1;if(car_specs[e]["timer"]<0){var t=create_car(car_specs[e]);cars.push(t);car_specs[e]["timer"]=car_specs[e]["time"];car_specs[e]["spawn_count"]+=1;if(car_specs[e]["spawn_count"]>=car_specs[e]["max_spawn"]){car_specs[e]["timer"]+=car_specs[e]["time"];car_specs[e]["spawn_count"]=0}}}for(var e in log_specs){log_specs[e]["timer"]-=1;if(log_specs[e]["timer"]<0){var n=create_log(log_specs[e]);logs.push(n);log_specs[e]["timer"]=log_specs[e]["time"];log_specs[e]["spawn_count"]+=1;if(log_specs[e]["spawn_count"]>=log_specs[e]["max_spawn"]){log_specs[e]["timer"]+=.75*log_specs[e]["time"];log_specs[e]["spawn_count"]=0}}}update_cars();update_logs();update_lillies();if(frogs_home==5&&frogger.death_timer<0){level+=1;level_up(level)}if(frogger.ypos<250&&!frogger.onlog&&!frogger.dead){frogger.dead=true;frogger.death_timer=50;frogger.orientation="dead"}if(frogger.onlog&&frogger.xpos<375&&frogger.xpos>-10&&!frogger.dead){frogger.xpos+=log_specs[frogger.log_row]["speed"];frogger.xcent+=log_specs[frogger.log_row]["speed"]}if(time<0&&!frogger.dead){frogger.dead=true;frogger.death_timer=50;frogger.orientation="dead"}if(game_over){frogger.death_timer=100}if(frogger.dead&&frogger.death_timer<0){respawn_frog()}if(fly_timer<150&&!fly_active){var r=Math.floor(Math.random()*5);if(!lillies[r].has_frog&&!lillies[r].has_fly){lillies[r].has_fly=true;fly_active=true}else{fly_timer=150}}if(fly_timer<0){for(var r in lillies){lillies[r].has_fly=false}fly_active=false;fly_timer=750+Math.floor(Math.random()*200)}};game.fps=50;game.run=function(){var e=0,t=1e3/game.fps,n=10,r=(new Date).getTime();return function(){e=0;while((new Date).getTime()>r&&e<n){game.update();r+=t;e++}game.draw()}}()