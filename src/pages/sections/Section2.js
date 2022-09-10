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
            'title_kor': '',
            'status': '',
            'status_kor': '',
            'description': '',
            'description_kor': '',
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

    useEffect(() => {
        let img = [];
        img[0] = new Image();
        img[0].src = content.main_1;
        img[1] = new Image();
        img[1].src = content.main_2;
        img[2] = new Image();
        img[2].src = content.main_3;
        img[3] = new Image();
        img[3].src = content.main_4;
        img[4] = new Image();
        img[4].src = content.main_5;
        img[5] = new Image();
        img[5].src = content.side_1;
        img[6] = new Image();
        img[6].src = content.side_2;
        img[7] = new Image();
        img[7].src = content.side_3;
        img[8] = new Image();
        img[8].src = content.side_4;
        img[9] = new Image();
        img[9].src = content.side_5;
        img[10] = new Image();
        img[10].src = content.side_6;
        img[11] = new Image();
        img[11].src = content.minor_1;
        img[12] = new Image();
        img[12].src = content.minor_2;
        img[13] = new Image();
        img[13].src = content.minor_3;
        img[14] = new Image();
        img[14].src = content.minor_4;
        img[15] = new Image();
        img[15].src = content.minor_5;
        img[16] = new Image();
        img[16].src = content.minor_6;
        for (let i in content.items) {
            img[17+i] = new Image();
            img[17+i].src = content.items[i].image;
        }
    }, [content]);
    
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
                        <Typography align='center' variant={isLandscape() ? 'h2' : 'h3'} sx={{mb: 6}}>
                            { lang === 'kor' ?
                                '게시판' :
                                'Featured Items'
                            }
                        </Typography>
                    </FadingComponent>

                    <FadingComponent duration={1500}>
                        <List 
                            maxHeight={props.height * 0.45} 
                            dataPath={dataPathParent + 'items/'} 
                            rawContent={rawContent} 
                            content={content}
                            landscape={isLandscape()}
                            lang={lang}/>
                    </FadingComponent>
                </Grid>

                <Grid item xs={10} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant={isLandscape() ? 'h2' : 'h3'} sx={{mt: 8, mb: 6}}>
                            { lang === 'kor' ?
                                '특기 / 능력' :
                                'Skillsets'
                            }
                        </Typography>
                    </FadingComponent>
                    {
                    isLandscape() ?
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
