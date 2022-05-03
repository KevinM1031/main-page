import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section5BG from '../backgrounds/Section5_BG'
import Shop from '../../components/ui/Shop.js'
import Header from '../../components/ui/Header.js'
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js'

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
    'items': [
        {
            'title': '',
            'status': '',
            'description': '',
            'image': null,
        },
    ],
};

export default function Section5(props) {
    const dataPathParent = pathBase() + 'section5/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(5, setContent);
        getSectionRawContent(5, setRawContent);
    }, []);
    
    const lang = localStorage.getItem('lang');

    return (
        <div style={{height: props.height + 'px'}}>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section5BG 
                        hidden={true} 
                        width={props.width} 
                        height={props.height} 
                        resolution={800}/>
                </div>
            </Box>

            <Grid 
                container 
                color='primary.text'
                justifyContent='space-around'
                alignItems='stretch'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}
                direction="column"
                style={{ position: 'relative' }}>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: 8, mb: 4}}
                            variant={isLandscape(props.width, props.height) ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '식물류 계량 및 판매' :
                                'Plant Cultivating & Sales'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item align="center">
                    <Header 
                        dataPath={dataPathParent} 
                        content={content} height={props.height * 0.2} 
                        landscape={isLandscape(props.width, props.height)}/>
                </Grid>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: '5%'}}
                            variant={isLandscape(props.width, props.height) ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '종자 목록' :
                                'Featured Specimens'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item align="center"/>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Shop 
                            maxHeight={props.height * 0.47} 
                            dataPath={dataPathParent + 'items/'} 
                            rawContent={rawContent} 
                            content={content}
                            landscape={isLandscape(props.width, props.height)} />
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
