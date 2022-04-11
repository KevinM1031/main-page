import RellaxWrapper from "react-rellax-wrapper";
import Critters from "../../components/ui/Critters.js";

export default function SectionBG(props) {

    const k0 = -10;
    const k1 = -8;
    const k2 = -4;

    return (
        <div>
            <div style={{height: props.height, overflow: 'hidden'}}>
                <RellaxWrapper speed={k0} percentage={0.5} style={{
                    width: '100%', height: props.height, 
                    backgroundImage: `url(${props.backgrounds[0]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}/>
                <RellaxWrapper speed={k1} percentage={0.5} style={{
                    width: '100%', height: props.height, marginTop: -props.height,
                    backgroundImage: `url(${props.backgrounds[1]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}/>
                <RellaxWrapper speed={k2} percentage={0.5} style={{
                    width: '100%', height: props.height, marginTop: -props.height,
                    backgroundImage: `url(${props.backgrounds[2]})`,
                    backgroundSize: 'auto 100%', zIndex: -100
                }}>
                    <Critters width={props.width} height={props.height}/>
                </RellaxWrapper>
            </div>
            <div style={{
                width: 'auto', height: props.height, 
                backgroundImage: `url(${props.backgrounds[3]})`, marginTop: -props.height, paddingTop: 0,
                backgroundSize: 'auto 100%', zIndex: 100, transform: `translate3d(0px, 0px, 0px)`
            }}/>
        </div>
    );
}