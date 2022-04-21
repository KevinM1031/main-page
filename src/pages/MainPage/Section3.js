import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section3BG from './Section3_BG'
import List from '../../components/ui/List.js'
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

export default function Section3(props) {
    const dataPathParent = 'contents/section3/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(3, setContent);
        getSectionRawContent(3, setRawContent);
    }, []);


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
                justifyContent='center'
                alignItems='center'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}
                style={{ position: 'relative' }}>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{mt: 8, mb: 4}}>
                            Computer Science
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <Header dataPath={dataPathParent} content={content} height={props.height * 0.2}/>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{mt: '5%'}}>
                            Featured Projects
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <List 
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
