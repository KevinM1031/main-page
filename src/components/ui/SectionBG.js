import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import Critters from "../../components/ui/Critters.js";

export default function SectionBG(props) {

    const k0 = 500;
    const k1 = 400;
    const k2 = 200;

    return (
        <div>
            <div style={{height: props.height, overflow: 'hidden'}}>
                <Parallax strength={k0} percentage={0.5} bgImage={props.backgrounds[0]} 
                    bgImageStyle={{height: props.height+'px'}}>
                    <Parallax strength={k1} percentage={0.5} bgImage={props.backgrounds[1]}
                        bgImageStyle={{height: props.height+'px'}}>
                        <Parallax strength={k2} percentage={0.5} bgImage={props.backgrounds[2]}
                            bgImageStyle={{height: props.height+'px'}}>
                            <Critters width={props.width} height={props.height}/>
                        </Parallax>
                    </Parallax>
                </Parallax>
            </div>
            <div style={{
                width: 'auto', height: props.height, 
                backgroundImage: `url(${props.backgrounds[3]})`, marginTop: -props.height, paddingTop: 0,
                backgroundSize: 'auto 100%', transform: `translate3d(0px, 0px, 0px)`
            }}/>
        </div>
    );
}