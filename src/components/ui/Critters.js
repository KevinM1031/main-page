import React, { useRef, useEffect } from 'react';

const dragonfly = (ctx, sw, sh, t) => {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(t, t/2, 10, 0, 2*Math.PI);
    ctx.fill();
};

export default function Canvas(props) {
  
    const canvasRef = useRef(null);
    const adjustedWidth = props.width*0.55;
    const adjustedHeight = props.height*0.55

    const setup = (ctx) => {
        ctx.canvas.width = adjustedWidth;
        ctx.canvas.height = adjustedHeight;
    }
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, adjustedWidth, adjustedHeight);
        dragonfly(ctx, adjustedWidth, adjustedHeight, frameCount);
    };
  
    useEffect(() => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
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
    }, [draw]);
  
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