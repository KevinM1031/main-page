import { Stack, Box, Fade } from '@material-ui/core';
import { useWindowDimensions } from '../../components/ui/Window.js';
import NavBar from "../../components/ui/NavBar.js";
import Section1 from "./Section1.js";
import Section2 from "./Section2.js";
import Section3 from "./Section3.js";
import Section4 from "./Section4.js";
import Section5 from "./Section5.js";
import Section6 from "./Section6.js";
import Section7 from "./Section7.js";
import Section8 from "./Section8.js";
import LoginButton from '../../components/ui/LoginButton.js'
import { useState, useEffect } from "react";

const a0 = '../../resource/images/bg_a0.png';
const a1 = '../../resource/images/bg_a1.png';
const a2 = '../../resource/images/bg_a2.png';
const a3 = '../../resource/images/bg_a3.png';

const b0 = '../../resource/images/bg_b0.png';
const b1 = '../../resource/images/bg_b1.png';
const b2 = '../../resource/images/bg_b2.png';
const b3 = '../../resource/images/bg_b3.png';

const c0 = '../../resource/images/bg_c0.png';
const c1 = '../../resource/images/bg_c1.png';
const c2 = '../../resource/images/bg_c2.png';
const c3 = '../../resource/images/bg_c3.png';

const d0 = '../../resource/images/bg_d0.png';
const d1 = '../../resource/images/bg_d1.png';
const d2 = '../../resource/images/bg_d2.png';
const d3 = '../../resource/images/bg_d3.png';

const e0 = '../../resource/images/bg_e0.png';
const e1 = '../../resource/images/bg_e1.png';
const e2 = '../../resource/images/bg_e2.png';
const e3 = '../../resource/images/bg_e3.png';

const f0 = '../../resource/images/bg_f0.png';
const f1 = '../../resource/images/bg_f1.png';
const f2 = '../../resource/images/bg_f2.png';
const f3 = '../../resource/images/bg_f3.png';

function SectionBG(props) {
    const k0 = -0.5;
    const k1 = 0.2;
    const k2 = 0.2;

    return (
        <div style={{
            width: '100%', height: props.height, backgroundImage: `url(${props.backgrounds[0]})`,
            backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k0}px)`, zIndex: -100
        }}>
            <div style={{
                width: '100%', height: props.height, backgroundImage: `url(${props.backgrounds[1]})`,
                backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k1}px)`
            }}>
                <div style={{
                    width: '100%', height: props.height, backgroundImage: `url(${props.backgrounds[2]})`,
                    backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k2}px)`
                }}>
                    <div style={{
                        width: '100%', height: props.height, backgroundImage: `url(${props.backgrounds[3]})`,
                        backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * (k0 + k1 + k2)}px)`
                    }}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MainPage() {
    const sectionCount = 8;

    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get('p'));
    if (!page || !(page > 0) || !(page <= sectionCount))
        window.location.href = '/?p=' + 1;

    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height * 1.5;
    
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        const currHeight = window.innerHeight * 1.5;
        setOffsetY(window.pageYOffset);

        if (page === 1) {
            if (window.pageYOffset > currHeight * 2.1)
                window.location.href = '/?p=' + (page + 1);
        } else if (page === sectionCount) {
            if (window.pageYOffset < currHeight * 0.1)
                window.location.href = '/?p=' + (page - 1) + '&b=true';
        }else {
            if (window.pageYOffset < currHeight * 0.1)
                window.location.href = '/?p=' + (page - 1) + '&b=true';
            else if (window.pageYOffset > currHeight * 3.1)
                window.location.href = '/?p=' + (page + 1);
        }
    };

    useEffect(() => {
        let fromBottom = queryParams.get('b');
        if (page === 1) window.scroll(0, fromBottom ? height : 0);
        else window.scroll(0, fromBottom ? height*2 : height);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <NavBar/>

            <Fade timeout={2000} in={true}>
            {
                page === 1 ?
                    <Stack>
                        <SectionBG height={height} offsetY={offsetY} backgrounds={[a0, a1, a2, a3]} />
                        <Section1 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 2 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[b0, b1, b2, b3]} />
                        <Section2 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000, #000)'}} height={height}/>
                    </Stack>
                    
                : page === 3 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[c0, c1, c2, c3]} />
                        <Section3 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 4 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[d0, d1, d2, d3]} />
                        <Section4 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>
                
                : page === 5 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[e0, e1, e2, e3]} />
                        <Section5 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 6 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[f0, f1, f2, f3]} />
                        <Section6 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 7 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[f0, f1, f2, f3]} />
                        <Section7 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 8 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG height={height} offsetY={offsetY - height} backgrounds={[f0, f1, f2, f3]} />
                        <Section8 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                        <Box backgroundColor='#000000' height={height*10}/>
                    </Stack>

                : <Box backgroundColor='#161b26' height={height}/>
            }
            </Fade>
        </div>
    )
}