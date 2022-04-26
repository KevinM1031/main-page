import { KeyboardReturnOutlined } from '@material-ui/icons';
import React, { useRef, useEffect } from 'react';

var critters = [];
class Critter {
    constructor(obj, x, y, objW, objH, scrW, scrH, idleTime, maxDist, moveTime) {
        this.obj = obj;
        this.x = x;
        this.y = y;
        this.vX = 0;
        this.vY = 0;
        this.objW = objW;
        this.objH = objH;
        this.scrW = scrW;
        this.scrH = scrH;
        this.idleTime = idleTime;
        this.currIdle = 0;
        this.maxDist = maxDist;
        this.moveTime = moveTime;
        this.moveEndTime = 0;
        this.state = 'idle';
        this.tick = 0;
    }

    update(ctx, t) {

        // If idle period is over, generate new movement path
        if (this.state === 'idle' && this.tick >= this.currIdle) {
            this.state = 'moving';
            this.moveEndTime = this.moveTime*Math.random() + this.moveTime*0.5;
            this.tick = 0;

            this.vX = this.maxDist*Math.random() / this.moveEndTime * (Math.random() > 0.5 ? -1 : 1);
            if (this.x-this.maxDist-this.objW/2 < 0)
                this.vX = Math.abs(this.vX);
            else if (this.x+this.maxDist+this.objW/2 > this.scrW)
                this.vX = Math.abs(this.vX) * -1;

            this.vY = this.maxDist*Math.random() / this.moveEndTime * (Math.random() > 0.5 ? -1 : 1);
            if (this.y-this.maxDist-this.objH/2 < 0)
                this.vY = Math.abs(this.vY);
            else if (this.y+this.maxDist+this.objH/2 > this.scrH)
                this.vY = Math.abs(this.vY) * -1;

        } else if (this.state === 'moving') {

            // If movement period is over, generate idle duration
            if (this.tick >= this.moveEndTime) {
                this.state = 'idle';
                this.currIdle = this.idleTime*Math.random() + this.idleTime*0.5;
                this.tick = 0;

            // If movement period is ongoing, apply velocity to position
            } else {
                this.x += this.vX;
                this.y += this.vY;
            }
        }

        this.tick++;

        dragonfly_obj(ctx, this.x, this.y, (this.vX < 0), t);
    }
}


const dragonfly_img = [new Image(), new Image(), new Image(), new Image(),
                       new Image(), new Image(), new Image(), new Image()];
dragonfly_img[0].src = "https://cdn.discordapp.com/attachments/968334531583180862/968430854743400478/dragonfly1.png";
dragonfly_img[1].src = "https://cdn.discordapp.com/attachments/968334531583180862/968430909525196810/dragonfly2.png";
dragonfly_img[2].src = "https://cdn.discordapp.com/attachments/968334531583180862/968431098394730506/dragonfly3.png";
dragonfly_img[3].src = "https://cdn.discordapp.com/attachments/968334531583180862/968431097639759883/dragonfly4.png";
dragonfly_img[4].src = "https://cdn.discordapp.com/attachments/968334531583180862/968430909281939506/dragonfly1f.png";
dragonfly_img[5].src = "https://cdn.discordapp.com/attachments/968334531583180862/968431098138873866/dragonfly2f.png";
dragonfly_img[6].src = "https://cdn.discordapp.com/attachments/968334531583180862/968431097337757696/dragonfly3f.png";
dragonfly_img[7].src = "https://cdn.discordapp.com/attachments/968334531583180862/968431097887207424/dragonfly4f.png";
const dragonfly_obj = (ctx, x, y, flip, t) => {
    let i = Math.floor(t % 4 / 1 + (flip ? 4 : 0));
    ctx.drawImage(dragonfly_img[i], x, y, 30, 10);
};

export default function Canvas(props) {
  
    const canvasRef = useRef(null);
    const adjustedWidth = props.width*0.55;
    const adjustedHeight = props.height*0.55

    const setup = (ctx) => {
        ctx.canvas.width = adjustedWidth;
        ctx.canvas.height = adjustedHeight;
        for (let i = 0; i < 4; i++) {
            critters.push(new Critter(
                dragonfly_obj, Math.random()*adjustedWidth*0.8+0.1, Math.random()*adjustedHeight*0.8+0.1, 
                dragonfly_img[0].width, dragonfly_img[0].height, adjustedWidth, adjustedHeight, 100, 200, 30));
        }
    }
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, adjustedWidth, adjustedHeight);
        for (let critter of critters) {
            critter.update(ctx, frameCount);
        }
    };
  
    useEffect(() => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (props.type != 'dragonfly') return;

        let frameCount = 0;
        let animationFrameId;

        setup(ctx);

        const render = () => {
            frameCount++;
            draw(ctx, frameCount);

            setTimeout( () => {
                animationFrameId = window.requestAnimationFrame(render);
            }, 25 );
        };
        render();
        
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);
  
    return (
        <canvas 
            ref={canvasRef} 
            style={{
                transform: `translate3d(0px, 0px, 0px)`,
                width: props.width,
                height: props.height,
        }}/>
    );
}