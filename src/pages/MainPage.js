import { Stack, Grid, Box, Fade, IconButton } from '@material-ui/core';
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { getScreenWidth, getScreenHeight } from '../components/ui/Window.js';
import NavBar from "../components/ui/NavBar.js";
import Section1 from "./sections/Section1.js";
import Section2 from "./sections/Section2.js";
import Section3 from "./sections/Section3.js";
import Section4 from "./sections/Section4.js";
import Section5 from "./sections/Section5.js";
import Section6 from "./sections/Section6.js";
import Section7 from "./sections/Section7.js";
import Section8 from "./sections/Section8.js";
import SectionBG from "../components/ui/SectionBG.js"
import { useState, useEffect } from "react";
import { getSunPos } from "../components/util/Util.js";

// Import background images
import a0_temp from '../resources/bg_a0.png';
import a0n_temp from '../resources/bg_a0n.png';
import a1_temp from '../resources/bg_a1.png';
import a1n_temp from '../resources/bg_a1n.png';
import a2_temp from '../resources/bg_a2.png';
import a2n_temp from '../resources/bg_a2n.png';
import a3_temp from '../resources/bg_a3.png';
import a3n_temp from '../resources/bg_a3n.png';

import b0_temp from '../resources/bg_b0.png';
import b0n_temp from '../resources/bg_b0n.png';
import b1_temp from '../resources/bg_b1.png';
import b1n_temp from '../resources/bg_b1n.png';
import b2_temp from '../resources/bg_b2.png';
import b2n_temp from '../resources/bg_b2n.png';
import b3 from '../resources/bg_b3.png';

import c0_temp from '../resources/bg_c0.png';
import c0n_temp from '../resources/bg_c0n.png';
import c1_temp from '../resources/bg_c1.png';
import c1n_temp from '../resources/bg_c1n.png';
import c2_temp from '../resources/bg_c2.png';
import c2n_temp from '../resources/bg_c2n.png';
import c3 from '../resources/bg_c3.png';

import d0 from '../resources/bg_d0.png';
import d1 from '../resources/bg_d1.png';
import d2 from '../resources/bg_d2.png';
import d3 from '../resources/bg_d3.png';

import e0 from '../resources/bg_e0.png';
import e1 from '../resources/bg_e1.png';
import e2 from '../resources/bg_e2.png';
import e3 from '../resources/bg_e3.png';

import f0 from '../resources/bg_f0.png';
import f1 from '../resources/bg_f1.png';
import f2 from '../resources/bg_f2.png';
import f3 from '../resources/bg_f3.png';

import g0 from '../resources/bg_g0.png';
import g1 from '../resources/bg_g1.png';
import g2 from '../resources/bg_g2.png';
import g3 from '../resources/bg_g3.png';

import h0 from '../resources/bg_h0.png';
import h1 from '../resources/bg_h1.png';
import h2 from '../resources/bg_h2.png';
import h3 from '../resources/bg_h3.png';

export function MainPage() {
    const sectionCount = 8;
    const heightAmp = 1.5;
    const specialPage = 10043124;

    const [a0, setA0] = useState(a0_temp);
    const [a1, setA1] = useState(a1_temp);
    const [a2, setA2] = useState(a2_temp);
    const [a3, setA3] = useState(a3_temp);

    const [b0, setB0] = useState(b0_temp);
    const [b1, setB1] = useState(b1_temp);
    const [b2, setB2] = useState(b2_temp);

    const [c0, setC0] = useState(c0_temp);
    const [c1, setC1] = useState(c1_temp);
    const [c2, setC2] = useState(c2_temp);

    const switchToNightBGs = () => {
        setA0(a0n_temp);
        setA1(a1n_temp);
        setA2(a2n_temp);
        setA3(a3n_temp);
        setB0(b0n_temp);
        setB1(b1n_temp);
        setB2(b2n_temp);
        setC0(c0n_temp);
        setC1(c1n_temp);
        setC2(c2n_temp);
    }
    
    const date = new Date();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = Math.max(-89.999999, Math.min(89.999999, pos.coords.latitude));
            const lon = pos.coords.longitude;
            const sunPos = getSunPos(date, lat, lon);
            if (sunPos.altitude < -0.05233)
                switchToNightBGs();
        }, () => {
            if (date.getHours() < 6 || date.getHours() > 18)
                switchToNightBGs();
        });
    } else {
        if (date.getHours() < 6 || date.getHours() > 18)
                switchToNightBGs();
    }

    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get('p'));
    if (!page || !(page > 0) || !(page <= sectionCount || (page === specialPage))) {
        //window.location.href = 'https://kevinm1031.github.io/main-page/?p=1';
        window.location.href = '/main-page/?p=1';
    }
    
    const handleScroll = () => {
        if (page === specialPage) return;
        const currHeight = getScreenHeight() * heightAmp;
        
        if (page === 1) {
            if (window.pageYOffset > currHeight * 2.1)
                window.location.href = '/main-page/?p=' + (page + 1);
        } else if (page === sectionCount) {
            if (window.pageYOffset < currHeight * 0.1)
                window.location.href = '/main-page/?p=' + (page - 1) + '&b=true';
        } else {
            if (window.pageYOffset < currHeight * 0.1)
                window.location.href = '/main-page/?p=' + (page - 1) + '&b=true';
            else if (window.pageYOffset > currHeight * 3.1)
                window.location.href = '/main-page/?p=' + (page + 1);
        }
    };

    const handleResize = () => {
        setTimeout( () => {
            setWidth(getScreenWidth());
            setHeight(getScreenHeight() * heightAmp);
        }, 200 );
    }

    const [width, setWidth] = useState(getScreenWidth());
    const [height, setHeight] = useState(getScreenHeight() * heightAmp);

    useEffect(() => {
        if (page === specialPage) {
            if (localStorage.getItem("hidden_page_unlocked") !== "true") {
                window.location.href = '/main-page/?p=1';
            } else {
                localStorage.setItem("hidden_page_unlocked", "false");
            }
        }

        const langParam = queryParams.get('lang');
        const currLang = localStorage.getItem('lang');
        if (!currLang) {
            if (!langParam) localStorage.setItem('lang', '');
            else if (langParam === 'kor') localStorage.setItem('lang', 'kor');
            else localStorage.setItem('lang', '');
        }

        const currHeight = getScreenHeight() * heightAmp;

        let fromBottom = queryParams.get('b');
        if (page === 1) window.scroll(0, fromBottom ? currHeight : 0);
        else window.scroll(0, fromBottom ? currHeight*2 : currHeight);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <NavBar/>

            <Fade timeout={2000} in={true}>
            {
                page === 1 ?
                    <Stack>
                        <SectionBG width={width} height={height} backgrounds={[a0, a1, a2, a3]} 
                            critterType='balloon' heightAmp={heightAmp} heightOff={0}/>
                        <Section1 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 2 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[b0, b1, b2, b3]}  
                            critterType='firework' heightAmp={heightAmp} heightOff={1}/>
                        <Section2 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000, #000)'}} height={height}/>
                    </Stack>
                    
                : page === 3 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[c0, c1, c2, c3]}  
                            critterType='dragonfly' heightAmp={heightAmp} heightOff={1}/>
                        <Section3 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 4 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[d0, d1, d2, d3]}  
                            critterType='none' heightAmp={heightAmp} heightOff={1}/>
                        <Section4 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>
                
                : page === 5 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[e0, e1, e2, e3]}  
                            critterType='firefly' heightAmp={heightAmp} heightOff={1}/>
                        <Section5 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 6 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[f0, f1, f2, f3]}  
                            critterType='none' heightAmp={heightAmp} heightOff={1}/>
                        <Section6 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 7 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[g0, g1, g2, g3]}  
                            critterType='jelly' heightAmp={heightAmp} heightOff={1}/>
                        <Section7 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                    </Stack>

                : page === 8 ?
                    <Stack>
                        <Box style={{background: 'linear-gradient(to top, #151515, #000000)'}} height={height}/>
                        <SectionBG width={width} height={height} backgrounds={[h0, h1, h2, h3]}  
                            critterType='quadruped' heightAmp={heightAmp} heightOff={1}/>
                        <Section8 width={width} height={height} />
                        <Box style={{background: 'linear-gradient(to bottom, #151515, #000000)'}} height={height}/>
                        <Grid container justifyContent='center' alignItems='flex-end' backgroundColor='#000000' height={height*100}>
                            { localStorage.getItem("hidden_page_unlocked") === "true" ?
                            <IconButton style={{marginBottom: 0, color: 'black'}} href={'/main-page/?p=' + specialPage}>
                                <KeyboardDoubleArrowDown/>
                            </IconButton>
                            : <div/>
                            }
                        </Grid>
                    </Stack>

                : page === specialPage ?
                    <div style={{color:'white'}}>
                        ???????????????????????????????????????????????????????????????????????????????????????????
                        ???????????????????????????????????????????????????????????????????????????????????????????
                    </div>

                : <Box backgroundColor='#161b26' height={height}/>
            }
            </Fade>
        </div>
    )
}