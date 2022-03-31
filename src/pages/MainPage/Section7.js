import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section7BG from './Section7_BG'
import Gallery from '../../components/ui/Gallery.js'
import Header from '../../components/ui/Header.js'
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js'

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
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
                <Typography align='center' variant='h4' sx={{mt: '5%', mb: 4}}>
                    Traditional Media
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
                <Typography align='center' variant='h4' sx={{mt: '5%', mb: 4}}>
                    Digital Media
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
                <Typography align='center' variant='h4' sx={{mt: '5%', mb: 4}}>
                    Traditional Media
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.47} 
                    dataPath={props.dataPathParent + 'traditional_media/'} 
                    id={'traditional_media'}
                    rawContent={props.rawContent} 
                    content={props.content}
                    landscape={false} />
            </div>

            <div>
                <Typography align='center' variant='h4' sx={{mt: '5%', mb: 4}}>
                    Digital Media
                </Typography>

                <Gallery 
                    maxHeight={props.height * 0.47} 
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
    const dataPathParent = 'contents/section7/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(7, setContent, ['traditional_media', 'digital_media'], true);
        getSectionRawContent(7, setRawContent);
    }, []);

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
                backgroundColor='#151515'
                color='primary.text'
                justifyContent='center'
                alignItems='center'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{mt: 8, mb: 4}}>
                            Art Gallery
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <Header dataPath={dataPathParent} content={content} maxHeight={props.height * 0.2}/>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        {
                        isLandscape(props.width, props.height) ?
                            <LandscapeGalleries 
                                width={props.width} 
                                height={props.height}
                                content={content}
                                rawContent={rawContent}
                                dataPathParent={dataPathParent}/>
                        :
                            <PortraitGalleries 
                                width={props.width} 
                                height={props.height}
                                content={content}
                                rawContent={rawContent}
                                dataPathParent={dataPathParent}/>
                        }
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
