import { useEffect, useState } from "react";
import RellaxWrapper from "react-rellax-wrapper";
import Critters from "../../components/ui/Critters.js";

export default function SectionBG(props) {

    const k0 = -10;
    const k1 = -8;
    const k2 = -4;

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    useEffect(() => {
        setWidth(props.width);
        setHeight(props.height);
    }, [props]);

    return (
        <div>
            <div style={{height: height, overflow: 'hidden'}}>
                <RellaxWrapper speed={k0} percentage={0.5} style={{
                    width: '100%', height: height, 
                    backgroundImage: `url(${props.backgrounds[0]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}/>
                <RellaxWrapper speed={k1} percentage={0.5} style={{
                    width: '100%', height: height, marginTop: -height,
                    backgroundImage: `url(${props.backgrounds[1]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}/>
                <RellaxWrapper speed={k2} percentage={0.5} style={{
                    width: '100%', height: height, marginTop: -height,
                    backgroundImage: `url(${props.backgrounds[2]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}>
                    <Critters width={width} height={height}/>
                </RellaxWrapper>
            </div>
            <div style={{
                width: 'auto', height: height, 
                backgroundImage: `url(${props.backgrounds[3]})`, marginTop: -height, paddingTop: 0,
                backgroundSize: 'auto 100%', zIndex: 100, transform: `translate3d(0px, 0px, 0px)`
            }}/>
        </div>
    );
}