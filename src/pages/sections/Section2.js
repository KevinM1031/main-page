import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section2BG from '../backgrounds/Section2_BG'
import Editable from '../../components/ui/Editable.js'
import List from '../../components/ui/List.js'
import ImageEditor from '../../components/ui/ImageEditor.js'
import { FadingComponent, ZoomingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js'


const defaultContent = {
    'items': [
        {
            'title': '',
            'status': '',
            'description': '',
            'image': null,
        },
    ],
    'skillsets': [
        {
            'main_1': '',
            'main_2': '',
            'main_3': '',
            'main_4': '',
            'main_5': '',
            'side_1': '',
            'side_2': '',
            'side_3': '',
            'side_4': '',
            'side_5': '',
            'side_6': '',
            'minor_1': '',
            'minor_2': '',
            'minor_3': '',
            'minor_4': '',
            'minor_5': '',
            'minor_6': '',
        }
    ]
};

export default function Section2(props) {

    const [imageEditorOpen, setImageEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const dataPathParent = pathBase() + 'section2/';
    const [editDataPath, setEditDataPath] = useState('');

    const openImageEditor = (id) => {
        setImageEditorOpen(true);
        setEditTarget(id);
        setEditDataPath(dataPathParent + 'skillsets/');
        setEditPlaceholder(content['skillsets'][id]);
    };

    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(2, setContent);
        getSectionRawContent(2, setRawContent);
    }, []);
    
    const lang = localStorage.getItem('lang');

    return (
        <div>

            <ImageEditor 
                open={imageEditorOpen} 
                setOpen={setImageEditorOpen} 
                id={editTarget} 
                dataPath={editDataPath} 
                placeholder={editPlaceholder}/>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <Section2BG 
                    width={props.width} 
                    height={props.height} 
                    resolution={800}/>
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
                        <Typography align='center' variant={isLandscape(props.width, props.height) ? 'h2' : 'h3'} sx={{mt: 8, mb: 4}}>
                            { lang === 'kor' ?
                                '게시판' :
                                'Featured Items'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <List 
                            maxHeight={props.height * 0.5} 
                            dataPath={dataPathParent + 'items/'} 
                            rawContent={rawContent} 
                            content={content}
                            landscape={isLandscape(props.width, props.height)}
                            lang={lang}/>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant={isLandscape(props.width, props.height) ? 'h2' : 'h3'} sx={{mt: 12, mb: 6}}>
                            { lang === 'kor' ?
                                '특기 / 능력' :
                                'Skillsets'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={10} align="center">
                    {
                    isLandscape(props.width, props.height) ?
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item xs={1}/>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'main_1'}>
                                    <img src={content.skillsets['main_1']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'main_2'}>
                                    <img src={content.skillsets['main_2']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={0}>
                                <div> <Editable editor={openImageEditor} id={'main_3'}>
                                    <img src={content.skillsets['main_3']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>                    
                            <Grid item xs={1}/>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'main_4'}>
                                    <img src={content.skillsets['main_4']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>                    
                            <Grid item xs={1}/>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'main_5'}>
                                    <img src={content.skillsets['main_5']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>                    
                            <Grid item xs={1}/>

                            <Grid item xs={12} sx={{mb: 6}}/>

                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={1000}>
                                <div> <Editable editor={openImageEditor} id={'minor_1'}>
                                    <img src={content.skillsets['minor_1']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={800}>
                                <div> <Editable editor={openImageEditor} id={'minor_2'}>
                                    <img src={content.skillsets['minor_2']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={600}>
                                <div> <Editable editor={openImageEditor} id={'minor_3'}>
                                    <img src={content.skillsets['minor_3']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'side_1'}>
                                    <img src={content.skillsets['side_1']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'side_2'}>
                                    <img src={content.skillsets['side_2']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>   
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={0}>
                                <div> <Editable editor={openImageEditor} id={'side_3'}>
                                    <img src={content.skillsets['side_3']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>   
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={0}>
                                <div> <Editable editor={openImageEditor} id={'side_4'}>
                                    <img src={content.skillsets['side_4']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>   
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'side_5'}>
                                    <img src={content.skillsets['side_5']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>   
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'side_6'}>
                                    <img src={content.skillsets['side_6']} style={{maxWidth: '60%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={600}>
                                <div> <Editable editor={openImageEditor} id={'minor_4'}>
                                    <img src={content.skillsets['minor_4']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={800}>
                                <div> <Editable editor={openImageEditor} id={'minor_5'}>
                                    <img src={content.skillsets['minor_5']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1} align='center'> <ZoomingComponent duration={800} delay={1000}>
                                <div> <Editable editor={openImageEditor} id={'minor_6'}>
                                    <img src={content.skillsets['minor_6']} style={{maxWidth: '40%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                        </Grid>
                    :
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item xs={2}/>
                            <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'main_1'}>
                                    <img src={content.skillsets['main_1']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={0}>
                                <div> <Editable editor={openImageEditor} id={'main_2'}>
                                    <img src={content.skillsets['main_2']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                <div> <Editable editor={openImageEditor} id={'main_3'}>
                                    <img src={content.skillsets['main_3']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={2}/>

                            <Grid item xs={12} sx={{mb: 3}}/>

                            <Grid item xs={3}/>
                            <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'main_4'}>
                                    <img src={content.skillsets['main_4']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>                    
                            <Grid item xs={1}/>
                            <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                <div> <Editable editor={openImageEditor} id={'main_5'}>
                                    <img src={content.skillsets['main_5']} style={{maxWidth: '90%'}}/>
                            </Editable> </div> </ZoomingComponent> </Grid>
                            <Grid item xs={3}/>

                            <Grid item xs={12} sx={{mb: 6}}/>

                            <Grid item xs={10}>
                                <Grid container justifyContent='center' alignItems='center' sx={{mb: 3}}>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                        <div> <Editable editor={openImageEditor} id={'side_1'}>
                                            <img src={content.skillsets['side_1']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                        <div> <Editable editor={openImageEditor} id={'side_2'}>
                                            <img src={content.skillsets['side_2']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>   
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={0}>
                                        <div> <Editable editor={openImageEditor} id={'side_3'}>
                                            <img src={content.skillsets['side_3']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>   
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={0}>
                                        <div> <Editable editor={openImageEditor} id={'side_4'}>
                                            <img src={content.skillsets['side_4']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>   
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                        <div> <Editable editor={openImageEditor} id={'side_5'}>
                                            <img src={content.skillsets['side_5']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>   
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                        <div> <Editable editor={openImageEditor} id={'side_6'}>
                                            <img src={content.skillsets['side_6']} style={{maxWidth: '60%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                </Grid>

                                <Grid container justifyContent='center' alignItems='center'>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                        <div> <Editable editor={openImageEditor} id={'minor_1'}>
                                            <img src={content.skillsets['minor_1']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                        <div> <Editable editor={openImageEditor} id={'minor_2'}>
                                            <img src={content.skillsets['minor_2']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={0}>
                                        <div> <Editable editor={openImageEditor} id={'minor_3'}>
                                            <img src={content.skillsets['minor_3']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={0}>
                                        <div> <Editable editor={openImageEditor} id={'minor_4'}>
                                            <img src={content.skillsets['minor_4']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={200}>
                                        <div> <Editable editor={openImageEditor} id={'minor_5'}>
                                            <img src={content.skillsets['minor_5']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                    <Grid item xs={2} align='center'> <ZoomingComponent duration={800} delay={400}>
                                        <div> <Editable editor={openImageEditor} id={'minor_6'}>
                                            <img src={content.skillsets['minor_6']} style={{maxWidth: '40%'}}/>
                                    </Editable> </div> </ZoomingComponent> </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>

            </Grid>
        </div>
    );
}
