import { getScreenWidth, getScreenHeight } from '../../components/ui/Window';
import { useRef, useState, useEffect } from 'react';
import { Snackbar, Alert } from '@material-ui/core';

import balloon_img1 from '../../resources/balloon1.png';
import balloon_img2 from '../../resources/balloon2.png';
import balloon_img3 from '../../resources/balloon3.png';
import balloon_img4 from '../../resources/balloon4.png';

import balloon_pop_img1 from '../../resources/balloon_pop1.png';
import balloon_pop_img2 from '../../resources/balloon_pop2.png';
import balloon_pop_img3 from '../../resources/balloon_pop3.png';
import balloon_pop_img4 from '../../resources/balloon_pop4.png';

import firework_img1 from '../../resources/firework1.png';
import firework_img2 from '../../resources/firework2.png';

import firework_pop_img1 from '../../resources/firework_pop1.png';
import firework_pop_img2 from '../../resources/firework_pop2.png';
import firework_pop_img3 from '../../resources/firework_pop3.png';
import firework_pop_img4 from '../../resources/firework_pop4.png';
import firework_pop_img5 from '../../resources/firework_pop5.png';
import firework_pop_img6 from '../../resources/firework_pop6.png';
import firework_pop_img7 from '../../resources/firework_pop7.png';
import firework_pop_img8 from '../../resources/firework_pop8.png';
import firework_pop_img9 from '../../resources/firework_pop9.png';
import firework_pop_img10 from '../../resources/firework_pop10.png';
import firework_pop_img11 from '../../resources/firework_pop11.png';
import firework_pop_img12 from '../../resources/firework_pop12.png';

import dragonfly_img1 from '../../resources/dragonfly1.png';
import dragonfly_img2 from '../../resources/dragonfly2.png';
import dragonfly_img3 from '../../resources/dragonfly3.png';
import dragonfly_img4 from '../../resources/dragonfly4.png';
import dragonfly_img1f from '../../resources/dragonfly1f.png';
import dragonfly_img2f from '../../resources/dragonfly2f.png';
import dragonfly_img3f from '../../resources/dragonfly3f.png';
import dragonfly_img4f from '../../resources/dragonfly4f.png';

import fly_img1 from '../../resources/fly1.png';
import fly_img2 from '../../resources/fly2.png';
import fly_img3 from '../../resources/fly3.png';
import fly_img4 from '../../resources/fly4.png';

import firefly_img1 from '../../resources/firefly1.png';
import firefly_img2 from '../../resources/firefly2.png';
import firefly_img3 from '../../resources/firefly3.png';
import firefly_img4 from '../../resources/firefly4.png';
import firefly_img1f from '../../resources/firefly1f.png';
import firefly_img2f from '../../resources/firefly2f.png';
import firefly_img3f from '../../resources/firefly3f.png';
import firefly_img4f from '../../resources/firefly4f.png';
import firefly_lit_img1 from '../../resources/firefly_lit1.png';
import firefly_lit_img2 from '../../resources/firefly_lit2.png';
import firefly_lit_img3 from '../../resources/firefly_lit3.png';
import firefly_lit_img4 from '../../resources/firefly_lit4.png';
import firefly_lit_img1f from '../../resources/firefly_lit1f.png';
import firefly_lit_img2f from '../../resources/firefly_lit2f.png';
import firefly_lit_img3f from '../../resources/firefly_lit3f.png';
import firefly_lit_img4f from '../../resources/firefly_lit4f.png';

import net_img1 from '../../resources/net1.png';
import net_img2 from '../../resources/net2.png';
import net_img3 from '../../resources/net3.png';
import net_img4 from '../../resources/net4.png';

import jelly_img1 from '../../resources/jelly1.png';
import jelly_img2 from '../../resources/jelly2.png';
import jelly_img3 from '../../resources/jelly3.png';
import jelly_img4 from '../../resources/jelly4.png';

import fish_img1 from '../../resources/fish1.png';
import fish_img2 from '../../resources/fish2.png';
import fish_img3 from '../../resources/fish3.png';
import fish_img4 from '../../resources/fish4.png';
import fish_img1f from '../../resources/fish1f.png';
import fish_img2f from '../../resources/fish2f.png';
import fish_img3f from '../../resources/fish3f.png';
import fish_img4f from '../../resources/fish4f.png';

import quadruped_img1 from '../../resources/quadruped1.png';
import quadruped_img2 from '../../resources/quadruped2.png';
import quadruped_img3 from '../../resources/quadruped3.png';
import quadruped_img4 from '../../resources/quadruped4.png';

import shrimp_img1 from '../../resources/shrimp1.png';
import shrimp_img2 from '../../resources/shrimp2.png';
import shrimp_img3 from '../../resources/shrimp3.png';
import shrimp_img4 from '../../resources/shrimp4.png';
import shrimp_img1f from '../../resources/shrimp1f.png';
import shrimp_img2f from '../../resources/shrimp2f.png';
import shrimp_img3f from '../../resources/shrimp3f.png';
import shrimp_img4f from '../../resources/shrimp4f.png';

import balloonPopAudio from '../../resources/balloon_pop.wav';
import fireworkLaunchAudio from '../../resources/firework_launch.wav';
import fireworkPopAudio from '../../resources/firework_pop.wav';

// Preloading audios
new Audio(balloonPopAudio);
new Audio(fireworkLaunchAudio);
new Audio(fireworkPopAudio);

var critters = [];
var spawns = [];
const maxSpawnCount = 20;
var spawnCount = 0;

class Critter {
    constructor(obj, x, y, objW, objH, scrW, scrH, idleTime, maxDist, moveTime, 
        hunt=false, lifespan=-1, vXBias=1, vYBias=1, fixedYDist=false, upOnly=false,
        fluid = false, initAge=0, ignoreCollision=false, endAction=null) {

        this.moveEndTime = 0;
        this.state = 'idle';
        this.aniFrame = 0;
        this.age = initAge;
        this.vX = 0;
        this.vY = 0;
        this.currIdle = 0;

        this.obj = obj;
        this.x = x;
        this.y = y;
        this.objW = objW;
        this.objH = objH;
        this.scrW = scrW;
        this.scrH = scrH;
        this.idleTime = idleTime;
        this.maxDist = maxDist;
        this.moveTime = moveTime;

        this.hunt = hunt;
        this.lifespan = lifespan;
        this.vXBias = vXBias;
        this.vYBias = vYBias;
        this.fixedYDist = fixedYDist;
        this.upOnly = upOnly;
        this.fluid = fluid;
        this.ignoreCollision = ignoreCollision;
        this.endAction = endAction;
    }

    updateScreenSize(scrW, scrH) {
        this.scrW = scrW;
        this.scrH = scrH;
    }

    autoFit() {
        if (this.x-this.objW/2 < 0)
            this.x = this.objW/2;
        else if (this.x+this.objW/2 > this.scrW)
            this.x = this.scrW-this.objW/2;
        if (this.y-this.objH/2 < 0)
            this.y = this.objH/2;
        else if (this.y+this.objH/2 > this.scrH)
            this.y = this.scrW-this.objW/2;
    }

    update(ctx) {

        if (this.lifespan !== -1 && this.age > this.lifespan) {
            if (this.endAction) this.endAction(this.x, this.y);
            return true;
        }

        const dist = Math.min(this.scrW/2, this.scrH/2, this.maxDist);

        // If idle period is over, generate new movement path (skip idle if critter can hunt and there is a spawned critter)
        if ((this.state === 'idle' && this.aniFrame >= this.currIdle) || (spawnCount > 0 && this.hunt && this.state !== 'hunting')) {
            this.moveEndTime = this.moveTime*Math.random() + this.moveTime*0.5;
            this.aniFrame = 0;

            // If critter can hunt and there exists a spawned critter, chase the nearest one
            if (this.hunt && spawnCount > 0) {
                this.state = 'hunting';
                let minDist = 9999999;
                let nearest;
                for (let spawn of spawns) {
                    const currDist = Math.sqrt(Math.pow(this.x-spawn.x,2) + Math.pow(this.y-spawn.y,2));
                    if (currDist < minDist) {
                        minDist = currDist;
                        nearest = spawn;
                    }
                }

                const chaseX = nearest.x-this.x;
                const chaseY = nearest.y-this.y;
                this.vX = Math.max(Math.min(chaseX/Math.abs(chaseY), 1), -1) * dist / this.moveEndTime * 2;
                this.vY = Math.max(Math.min(chaseY/Math.abs(chaseX), 1), -1) * dist / this.moveEndTime * 2;


            // Otherwise, perform typical random movement
            } else {
                this.state = 'moving';
                this.vX = dist*Math.random() / this.moveEndTime * (Math.random() > 0.5 ? -1 : 1) * this.vXBias;
                this.vY = (this.fixedYDist) ? this.maxDist / this.moveTime * (Math.random() > 0.5 || this.upOnly ? -1 : 1) * this.vYBias :
                    dist*Math.random() / this.moveEndTime * (Math.random() > 0.5 ? -1 : 1) * this.vYBias;
            }

            // Adjust velocities to avoid screen border collision
            if (!this.ignoreCollision) {
                if (this.x-dist-this.objW/2 < 0)
                    this.vX = Math.max(this.vX, -(this.x-this.objW/2)/this.moveEndTime);
                else if (this.x+dist+this.objW/2 > this.scrW)
                    this.vX = Math.min(this.vX, (this.scrW-this.x-this.objW/2)/this.moveEndTime);

                if (!this.fixedYDist) {
                    if (this.y-dist-this.objH/2 < 0)
                        this.vY = Math.max(this.vY, -(this.y-this.objH/2)/this.moveEndTime);
                    else if (this.y+dist+this.objH/2 > this.scrH)
                        this.vY = Math.min(this.vY, (this.scrH-this.y-this.objH/2)/this.moveEndTime);
                }
            }

        } else if (this.state === 'moving' || this.state === 'hunting') {

            // If movement period is over, generate idle duration
            if (this.aniFrame >= this.moveEndTime) {
                if (this.idleTime !== -1) {
                    this.state = 'idle';
                    this.currIdle = (this.hunt && spawnCount > 0) ? 1 : this.idleTime*Math.random() + this.idleTime*0.5;
                }
                this.aniFrame = 0;

            // If movement period is ongoing, apply velocity to position
            } else {

                let k = 1;

                if (this.fluid)
                    k = (this.moveEndTime - this.aniFrame) / this.moveEndTime * 2;
                else if (this.fluid === 2)
                    k = Math.sin((this.moveEndTime - this.aniFrame) / this.moveEndTime * Math.PI) * 2;

                this.x += this.vX * k;
                this.y += this.vY * k;

                // If critter can hunt and is in collision with a spawned critter, remove that critter
                if (this.hunt && spawnCount > 0) {
                    for (let i = 0; i < spawns.length; i++) {
                        const spawn = spawns[i];
                        if (spawn.x+spawn.objW/2 >= this.x-this.objW/2 && spawn.x-spawn.objW/2 <= this.x+this.objW/2 &&
                            spawn.y+spawn.objH/2 >= this.y-this.objH/2 && spawn.y-spawn.objH/2 <= this.y+this.objH/2) {
                            
                            if (spawn.endAction) spawn.endAction(spawn.x, spawn.y);
                            spawns.splice(i, 1);
                            spawnCount--;
                        }
                    }
                }
            }
        }

        this.obj(ctx, this.x, this.y, (this.vX < 0), this.age);
        this.aniFrame++;
        this.age++;
        return false;
    }
}


const dragonfly_img = [new Image(), new Image(), new Image(), new Image(),
                       new Image(), new Image(), new Image(), new Image()];
dragonfly_img[0].src = dragonfly_img1;
dragonfly_img[1].src = dragonfly_img2;
dragonfly_img[2].src = dragonfly_img3;
dragonfly_img[3].src = dragonfly_img4;
dragonfly_img[4].src = dragonfly_img1f;
dragonfly_img[5].src = dragonfly_img2f;
dragonfly_img[6].src = dragonfly_img3f;
dragonfly_img[7].src = dragonfly_img4f;
const dragonflySize = { w: 42, h: 14 };
const dragonfly_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t % 4 / 1 + (flip ? 4 : 0));
    ctx.drawImage(dragonfly_img[i], x-dragonflySize.w/2, y-dragonflySize.h/2, dragonflySize.w, dragonflySize.h);
};

const fly_img = [new Image(), new Image(), new Image(), new Image()];
fly_img[0].src = fly_img1;
fly_img[1].src = fly_img2;
fly_img[2].src = fly_img3;
fly_img[3].src = fly_img4;
const flySize = { w: 6, h: 6 };
const fly_obj = (ctx, x, y, flip, t) => {
    let i = t % 4;
    ctx.drawImage(fly_img[i], x-flySize.w/2, y-flySize.h/2, flySize.w, flySize.h);
};

const balloon_img = [new Image(), new Image(), new Image(), new Image()];
balloon_img[0].src = balloon_img1;
balloon_img[1].src = balloon_img2;
balloon_img[2].src = balloon_img3;
balloon_img[3].src = balloon_img4;
const balloonSize = { w: 40, h: 60 };
const balloon_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/6) % 4;
    ctx.drawImage(balloon_img[i], x-balloonSize.w/2, y-balloonSize.h/2, balloonSize.w, balloonSize.h);
};
const balloon_pop_img = [new Image(), new Image(), new Image(), new Image()];
balloon_pop_img[0].src = balloon_pop_img1;
balloon_pop_img[1].src = balloon_pop_img2;
balloon_pop_img[2].src = balloon_pop_img3;
balloon_pop_img[3].src = balloon_pop_img4;
const balloonPopSize = { w: 40, h: 60 };
const balloonPop_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/3) % 4;
    ctx.drawImage(balloon_pop_img[i], x-balloonPopSize.w/2, y-balloonPopSize.h/2, balloonPopSize.w, balloonPopSize.h);
};

const firework_img = [new Image(), new Image(), new Image(), new Image()];
firework_img[0].src = firework_img1;
firework_img[1].src = firework_img2;
const fireworkSize = { w: 6, h: 18 };
const firework_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/3) % 2;
    ctx.drawImage(firework_img[i], x-fireworkSize.w/2, y-fireworkSize.h/2, fireworkSize.w, fireworkSize.h);
};
const firework_pop_img = [new Image(), new Image(), new Image(), new Image(),
                          new Image(), new Image(), new Image(), new Image(),
                          new Image(), new Image(), new Image(), new Image()];
firework_pop_img[0].src = firework_pop_img1;
firework_pop_img[1].src = firework_pop_img2;
firework_pop_img[2].src = firework_pop_img3;
firework_pop_img[3].src = firework_pop_img4;
firework_pop_img[4].src = firework_pop_img5;
firework_pop_img[5].src = firework_pop_img6;
firework_pop_img[6].src = firework_pop_img7;
firework_pop_img[7].src = firework_pop_img8;
firework_pop_img[8].src = firework_pop_img9;
firework_pop_img[9].src = firework_pop_img10;
firework_pop_img[10].src = firework_pop_img11;
firework_pop_img[11].src = firework_pop_img12;
const fireworkPopSize = { w: 100, h: 100 };
const fireworkPop_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/3) % 12;
    ctx.drawImage(firework_pop_img[i], x-fireworkPopSize.w/2, y-fireworkPopSize.h/2, fireworkPopSize.w, fireworkPopSize.h);
};

const firefly_img = [new Image(), new Image(), new Image(), new Image(),
                     new Image(), new Image(), new Image(), new Image(),
                     new Image(), new Image(), new Image(), new Image(),
                     new Image(), new Image(), new Image(), new Image()];
firefly_img[0].src = firefly_img1;
firefly_img[1].src = firefly_img2;
firefly_img[2].src = firefly_img3;
firefly_img[3].src = firefly_img4;
firefly_img[4].src = firefly_img1f;
firefly_img[5].src = firefly_img2f;
firefly_img[6].src = firefly_img3f;
firefly_img[7].src = firefly_img4f;
firefly_img[8].src = firefly_lit_img1;
firefly_img[9].src = firefly_lit_img2;
firefly_img[10].src = firefly_lit_img3;
firefly_img[11].src = firefly_lit_img4;
firefly_img[12].src = firefly_lit_img1f;
firefly_img[13].src = firefly_lit_img2f;
firefly_img[14].src = firefly_lit_img3f;
firefly_img[15].src = firefly_lit_img4f;
const fireflySize = { w: 8, h: 8 };
const firefly_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t % 4 / 1 + (flip ? 4 : 0) + (Math.floor(t/9) % 4 === 0 ? 8 : 0));
    ctx.drawImage(firefly_img[i], x-fireflySize.w/2, y-fireflySize.h/2, fireflySize.w, fireflySize.h);
};

const net_img = [new Image(), new Image(), new Image(), new Image()];
net_img[0].src = net_img1;
net_img[1].src = net_img2;
net_img[2].src = net_img3;
net_img[3].src = net_img4;
const netSize = { w: 20, h: 20 };
const net_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/2) % 4;
    ctx.drawImage(net_img[i], x-netSize.w*0.75, y-netSize.h/4, netSize.w*2, netSize.h*2);
};

const jelly_img = [new Image(), new Image(), new Image(), new Image(),
                   new Image(), new Image(), new Image(), new Image()];
jelly_img[0].src = jelly_img1;
jelly_img[1].src = jelly_img2;
jelly_img[2].src = jelly_img3;
jelly_img[3].src = jelly_img4;
const jellySize = { w: 10, h: 10 };
const jelly_obj = (ctx, x, y, flip, t) => {
let i = Math.floor(t/4) % 4;
ctx.drawImage(jelly_img[i], x-jellySize.w*6, y-jellySize.h*6, jellySize.w*12, jellySize.h*12);
};

const quadruped_img = [new Image(), new Image(), new Image(), new Image()];
quadruped_img[0].src = quadruped_img1;
quadruped_img[1].src = quadruped_img2;
quadruped_img[2].src = quadruped_img3;
quadruped_img[3].src = quadruped_img4;
const quadrupedSize = { w: 20, h: 20 };
const quadruped_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t/4) % 4;
    ctx.drawImage(quadruped_img[i], x-quadrupedSize.w, y-quadrupedSize.h, quadrupedSize.w*2, quadrupedSize.h*2);
};

const fish_img = [new Image(), new Image(), new Image(), new Image(),
                  new Image(), new Image(), new Image(), new Image()];
fish_img[0].src = fish_img1;
fish_img[1].src = fish_img2;
fish_img[2].src = fish_img3;
fish_img[3].src = fish_img4;
fish_img[4].src = fish_img1f;
fish_img[5].src = fish_img2f;
fish_img[6].src = fish_img3f;
fish_img[7].src = fish_img4f;
const fishSize = { w: 30, h: 10 };
const fish_obj = (ctx, x, y, flip, t) => {
let i = Math.floor(Math.floor(t/4) % 4 / 1 + (flip ? 4 : 0));
ctx.drawImage(fish_img[i], x-fishSize.w/2, y-fishSize.h/2, fishSize.w, fishSize.h);
};

const shrimp_img = [new Image(), new Image(), new Image(), new Image(),
                    new Image(), new Image(), new Image(), new Image()];
shrimp_img[0].src = shrimp_img1;
shrimp_img[1].src = shrimp_img2;
shrimp_img[2].src = shrimp_img3;
shrimp_img[3].src = shrimp_img4;
shrimp_img[4].src = shrimp_img1f;
shrimp_img[5].src = shrimp_img2f;
shrimp_img[6].src = shrimp_img3f;
shrimp_img[7].src = shrimp_img4f;
const shrimpSize = { w: 10, h: 10 };
const shrimp_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(Math.floor(t/2) % 4 / 1 + (flip ? 4 : 0));
    ctx.drawImage(shrimp_img[i], x-shrimpSize.w/2, y-shrimpSize.h/2, shrimpSize.w, shrimpSize.h);
};

export default function Canvas(props) {
  
    var ctx = null;
    const canvasRef = useRef(null);
    const resRatio = 0.55;
    var adjustedWidth = props.width*resRatio;
    var adjustedHeight = props.height*resRatio;
    var clickPos = { x: 0, y: 0 };
    var clicked = false;

    const setup = (ctx) => {
        ctx.canvas.width = adjustedWidth;
        ctx.canvas.height = adjustedHeight;

        switch (props.type) {
            case 'dragonfly':
                for (let i = 0; i < 4; i++) {
                    critters.push(new Critter(
                        dragonfly_obj, Math.random()*adjustedWidth*0.8+0.1, Math.random()*adjustedHeight*0.8+0.1, 
                        dragonflySize.w, dragonflySize.h, adjustedWidth, adjustedHeight, 100, 120, 50, 
                        true, -1, 1, 0.4));
                } break;
            case 'firefly':
                for (let i = 0; i < 10; i++) {
                    spawnCount++;
                    spawns.push(new Critter(
                        firefly_obj, Math.random()*adjustedWidth*0.8+0.1, Math.random()*adjustedHeight*0.8+0.1, 
                        fireflySize.w, fireflySize.h, adjustedWidth, adjustedHeight, 0, 40, 20,
                        false, -1, 1, 1, false, false, false, Math.random()*100));
                } break;
            case 'jelly':
                critters.push(new Critter(
                    jelly_obj, Math.random()*adjustedWidth*0.8+0.1, Math.random()*adjustedHeight*0.8+0.1, 
                    jellySize.w, jellySize.h, adjustedWidth, adjustedHeight, 300, 80, 200,
                    true, -1, 1, 1, false, false, 2));
                break;
            case 'quadruped':
                for (let i = 0; i < 5; i++) {
                    critters.push(new Critter(
                        quadruped_obj, Math.random()*adjustedWidth*0.8+0.1, Math.random()*adjustedHeight*0.8+0.1, 
                        quadrupedSize.w, quadrupedSize.h, adjustedWidth, adjustedHeight, 60, 130, 100,
                        true, -1, 1, 1, false, false, 1, Math.random()*100));
                } break;
            default: break;
        }
    }
    
    const draw = (ctx) => {
        ctx.clearRect(0, 0, adjustedWidth, adjustedHeight);
        for (let i = 0; i < critters.length; i++) {
            if (critters[i].update(ctx)) {
                critters.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].update(ctx)) {
                spawns.splice(i, 1);
                spawnCount--;
                i--;
            }
        }
        if (clicked) {
            spawnAt(clickPos);
            clicked = false;
        }
        if (props.type === 'firefly' && spawnCount === 0 && !snackbarTriggered) {
            localStorage.setItem('hidden_page_unlocked', true);
            setSnackbarOpen(true);
            snackbarTriggered = true;
        }
    };

    function updateClickPos(event) {
        clickPos = {
            x: event.clientX, 
            y: event.clientY + document.documentElement.scrollTop || document.body.scrollTop
        };
        clicked = true;
    }

    function updateCanvasSize() {
        adjustedWidth = getScreenWidth() * resRatio;
        adjustedHeight = getScreenHeight() * props.heightAmp * resRatio;
        ctx.canvas.width = adjustedWidth;
        ctx.canvas.height = adjustedHeight;
        for (let critter of critters) {
            critter.updateScreenSize(adjustedWidth, adjustedHeight);
            critter.autoFit();
        }
        for (let spawn of spawns) {
            spawn.updateScreenSize(adjustedWidth, adjustedHeight);
            spawn.autoFit();
        }
    }

    function spawnAt(pos) {
        pos = { 
            x: pos.x * resRatio,
            y: pos.y * resRatio - adjustedHeight * props.heightOff
        }
        if (pos.x >= adjustedWidth || pos.y >= adjustedHeight) return;

        switch (props.type) {
            case 'balloon':
                if (spawnCount >= maxSpawnCount) return;
                spawnCount++;
                spawns.push(new Critter(
                    balloon_obj, pos.x, pos.y, 
                    balloonSize.w, balloonSize.h, adjustedWidth, adjustedHeight, -1, adjustedHeight-pos.y, (adjustedHeight-pos.y)*(Math.random()+0.5), 
                    false, pos.y/2*(Math.random()*0.7+0.3), 0, 1, true, true, false, 0, true, (x, y) => {
                        spawns.push(new Critter(
                            balloonPop_obj, x, y, 
                            balloonPopSize.w, balloonPopSize.h, adjustedWidth, adjustedHeight, 0, 0, 1,
                            false, 11, 1, 1, false, false, false, 0, true));
                        const audio = new Audio(balloonPopAudio);
                        audio.play();
                    }));
                break;
            case 'firework':
                if (spawnCount >= maxSpawnCount) return;
                spawnCount++;
                spawns.push(new Critter(
                    firework_obj, pos.x, adjustedHeight, 
                    fireworkSize.w, fireworkSize.h, adjustedWidth, adjustedHeight, -1, adjustedHeight*0.7, adjustedHeight*0.05, 
                    false, adjustedHeight*(0.025+Math.random()*0.05), 0.1, 1, true, true, false, 0, true, (x, y) => {
                        spawns.push(new Critter(
                            fireworkPop_obj, x, y, 
                            fireworkPopSize.w, fireworkPopSize.h, adjustedWidth, adjustedHeight, 0, 0, 1,
                             false, 35, 1, 1, false, false, false, 0, true));
                        const audio = new Audio(fireworkPopAudio);
                        audio.play();
                    }));
                    const audio = new Audio(fireworkLaunchAudio);
                    audio.play();
                break;
            case 'dragonfly':
                if (spawnCount >= maxSpawnCount) return;
                spawnCount++;
                spawns.push(new Critter(
                    fly_obj, pos.x, pos.y, 
                    flySize.w, flySize.h, adjustedWidth, adjustedHeight, 10, 50, 15));
                break;
            case 'firefly':
                critters.push(new Critter(
                    net_obj, pos.x, pos.y, 
                    netSize.w, netSize.h, adjustedWidth, adjustedHeight, 0, 0, 1, true, 7));
                break;
            case 'jelly':
                if (spawnCount >= maxSpawnCount) return;
                spawnCount++;
                spawns.push(new Critter(
                    fish_obj, pos.x, pos.y, 
                    fishSize.w, fishSize.h, adjustedWidth, adjustedHeight, 100, 160, 20,
                    false, -1, 1, 0.2, false, false, 2));
                break;
            case 'quadruped':
                if (spawnCount >= maxSpawnCount) return;
                spawnCount++;
                spawns.push(new Critter(
                    shrimp_obj, pos.x, pos.y, 
                    shrimpSize.w, shrimpSize.h, adjustedWidth, adjustedHeight, 0, 80, 20,
                    false, -1, 0.3, 1, false, false, true));
                break;
            default: break;
        }
    }
  
    useEffect(() => {
        
        const canvas = canvasRef.current;
        ctx = canvas.getContext('2d');

        if (props.type === 'none') return;

        let animationFrameId;

        setup(ctx);

        const render = () => {
            draw(ctx);

            setTimeout( () => {
                animationFrameId = window.requestAnimationFrame(render);
            }, 25 );
        };
        render();
          
        document.addEventListener("click", updateClickPos);
        window.addEventListener("resize", updateCanvasSize);
        
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            document.removeEventListener("click", updateClickPos);
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    var snackbarTriggered = false;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
      };
  
    return (
        <div>
            <canvas 
                ref={canvasRef} 
                style={{
                    transform: `translate3d(0px, 0px, 0px)`,
                    width: props.width,
                    height: props.height,
            }}/>
        
            <Snackbar
                open={snackbarOpen}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                    Obtained a jar of fireflies!
                </Alert>
            </Snackbar>
        </div>
    );
}