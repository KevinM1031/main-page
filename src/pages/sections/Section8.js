import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section8BG from '../backgrounds/Section8_BG'
import List from '../../components/ui/List.js';
import Header from '../../components/ui/Header.js';
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js';

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
    'description_kor': '',
    'items': [
        {
            'title': '',
            'title_kor': '',
            'status': '',
            'status_kor': '',
            'description': '',
            'description_kor': '',
            'image': null,
        },
    ],
};

export default function Section5(props) {
    const dataPathParent = pathBase() + 'section8/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(8, setContent, ['items'], true);
        getSectionRawContent(8, setRawContent);
    }, []);

    const lang = localStorage.getItem('lang');

    return (
        <div style={{height: props.height + 'px'}}>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section8BG 
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
                                '금년의 지의류' :
                                'Lichen of the Year'
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
                                '지의류 목록' :
                                'Featured Lichens'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item align="center"/>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <List 
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
