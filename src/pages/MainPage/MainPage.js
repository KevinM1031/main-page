import Stack from '@material-ui/core/Stack';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import useWindowDimensions from '../../components/ui/Window.js';
import theme from "../../components/ui/Theme.js";
import { useState, useEffect } from "react";

const ab = '../../resource/images/ab.png';
const a1 = '../../resource/images/a1.png';
const a2 = '../../resource/images/a2.png';
const a3 = '../../resource/images/a3.png';

const SectionBox = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center',
    backgroundColor: '#000'
}));

function SectionBG(props) {
    const k = 0.05;

    return (
        <div style={{
            width: '100%', height: props.height, backgroundImage: `url(${ab})`, zIndex: -4,
            backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k}px)`
        }}>
            <div style={{
                width: '100%', height: props.height, backgroundImage: `url(${a1})`, zIndex: -3,
                backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k}px)`
            }}>
                <div style={{
                    width: '100%', height: props.height, backgroundImage: `url(${a2})`, zIndex: -2,
                    backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * -k}px)`
                }}>
                    <div style={{
                        width: '100%', height: props.height, backgroundImage: `url(${a3})`, zIndex: -1,
                        backgroundSize: 'auto 100%', transform: `translateY(${props.offsetY * k * 3}px)`
                    }}>

                    </div>
                </div>
            </div>
        </div>
    );
}

function MainPage() {
    const height = useWindowDimensions().height * 1.5;

    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <Stack spacing={0}>

                <SectionBG height={height} offsetY={offsetY}/>

                <SectionBox height={height}>
                    ASDF
                </SectionBox>

                <SectionBG height={height} offsetY={offsetY - height * 2} />

                <SectionBox height={height}>
                    ASDF
                </SectionBox>

                <SectionBG height={height} offsetY={offsetY - height * 4} />

                <SectionBox height={height}>
                    ASDF
                </SectionBox>

                <SectionBG height={height} offsetY={offsetY - height * 6} />

                <SectionBox height={height}>
                    ASDF
                </SectionBox>

                <SectionBG height={height} offsetY={offsetY - height * 8} />

                <SectionBox height={height}>
                    ASDF
                </SectionBox>
            </Stack>
        </div>

    )
}

export default MainPage;

