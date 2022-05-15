import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section6BG from '../backgrounds/Section6_BG'
import Shop from '../../components/ui/Shop.js'
import Header from '../../components/ui/Header.js'
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js'

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
    'description_kor': '',
    'items': [
        {
            'name': '',
            'name_kor': '',
            'status': '',
            'status_kor': '',
            'description': '',
            'description_kor': '',
            'image': null,
        },
    ],
};

export default function Section5(props) {
    const dataPathParent = pathBase() + 'section6/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(6, setContent);
        getSectionRawContent(6, setRawContent);
    }, []);

    const lang = localStorage.getItem('lang');

    return (
        <div style={{height: props.height + 'px'}}>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section6BG 
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
                                '동물류 브리딩 및 분양' :
                                'Animal Breeding & Sales'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item align="center">
                    <Header 
                        dataPath={dataPathParent} 
                        content={content} height={props.height * 0.2} 
                        landscape={isLandscape(props.width, props.height)}
                        lang={lang}/>
                </Grid>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: '5%'}}
                            variant={isLandscape(props.width, props.height) ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '종류 목록' :
                                'Featured Species'
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
                            landscape={isLandscape(props.width, props.height)} 
                            lang={lang}/>
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
