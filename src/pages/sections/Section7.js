import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section7BG from '../backgrounds/Section7_BG'
import Gallery from '../../components/ui/Gallery.js'
import Header from '../../components/ui/Header.js'
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js'

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
    'description_kor': '',
    'traditional_media': [
        {
            'title': '',
            'image': '',
        },
    ],
    'digital_media': [
        {
            'title': '',
            'image': '',
        },
    ],
};

const LandscapeGalleries = (props) => {
    return (
        <Grid container>
            <Grid item xs={6} align="center">
                <Typography align='center' variant='h2' sx={{mt: '5%', mb: 4}}>
                    { props.lang === 'kor' ?
                        '일반' :
                        'Traditional Media'
                    }
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.55} 
                    dataPath={props.dataPathParent + 'traditional_media/'} 
                    id={'traditional_media'}
                    rawContent={props.rawContent} 
                    content={props.content}
                    landscape={true} />
            </Grid>

            <Grid item xs={6} align="center">
                <Typography align='center' variant='h2' sx={{mt: '5%', mb: 4}}>
                    { props.lang === 'kor' ?
                        '디지털' :
                        'Digital Media'
                    }
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.55} 
                    dataPath={props.dataPathParent + 'digital_media/'} 
                    id={'digital_media'}
                    rawContent={props.rawContent} 
                    content={props.content}
                    landscape={true} />
            </Grid>
        </Grid>
    );
}

const PortraitGalleries = (props) => {
    return (
        <div>
            <div>
                <Typography align='center' variant='h3'>
                    { props.lang === 'kor' ?
                        '일반' :
                        'Traditional Media'
                    }
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.24} 
                    dataPath={props.dataPathParent + 'traditional_media/'} 
                    id={'traditional_media'}
                    rawContent={props.rawContent} 
                    content={props.content}
                    landscape={false} />
            </div>

            <div>
                <Typography align='center' variant='h3' sx={{mt: '2%'}}>
                    { props.lang === 'kor' ?
                        '디지털' :
                        'Digital Media'
                    }
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.24} 
                    dataPath={props.dataPathParent + 'digital_media/'} 
                    id={'digital_media'}
                    rawContent={props.rawContent} 
                    content={props.content}
                    landscape={false} />
            </div>
        </div>
    );
}

export default function Section7(props) {
    const dataPathParent = pathBase() + 'section7/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(7, setContent, ['traditional_media', 'digital_media'], true);
        getSectionRawContent(7, setRawContent);
    }, []);

    const lang = localStorage.getItem('lang');

    return (
        <div style={{height: props.height + 'px'}}>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section7BG 
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
                                '그림' :
                                'Art Gallery'
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
                        {
                        isLandscape() ?
                            <LandscapeGalleries 
                                width={props.width} 
                                height={props.height}
                                content={content}
                                rawContent={rawContent}
                                dataPathParent={dataPathParent}
                                lang={lang}/>
                        :
                            <PortraitGalleries 
                                width={props.width} 
                                height={props.height}
                                content={content}
                                rawContent={rawContent}
                                dataPathParent={dataPathParent}
                                lang={lang}/>
                        }
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
