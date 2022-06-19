import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section3BG from '../backgrounds/Section3_BG'
import List from '../../components/ui/List.js'
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

export default function Section3(props) {
    const dataPathParent = pathBase() + 'section3/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(3, setContent);
        getSectionRawContent(3, setRawContent);
    }, []);

    const lang = localStorage.getItem('lang');

    return (
        <div style={{height: props.height + 'px'}}>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section3BG 
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
                        <Typography align='center' sx={{mt: 8, mb: 6}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '컴퓨터공학' :
                                'Computer Science'
                            }
                        </Typography>
                    </FadingComponent>

                    <Header 
                        dataPath={dataPathParent} 
                        content={content} height={props.height * 0.2} 
                        landscape={isLandscape()}
                        lang={lang}/>
                </Grid>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mb: 6}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '프로젝트 목록' :
                                'Featured Projects'
                            }
                        </Typography>
                    </FadingComponent>

                    <FadingComponent duration={1500}>
                        <List 
                            maxHeight={props.height * 0.43} 
                            dataPath={dataPathParent + 'items/'} 
                            rawContent={rawContent} 
                            content={content}
                            landscape={isLandscape()}
                            lang={lang} />
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
