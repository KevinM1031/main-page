import { Typography, Grid, Box, Button } from '@material-ui/core';
import { getSectionContent } from '../../components/database/FirebaseAPI.js';
import Section1BG from './Section1_BG';
import TextEditor from '../../components/ui/TextEditor.js';
import ImageEditor from '../../components/ui/ImageEditor.js';
import ButtonEditor from '../../components/ui/ButtonEditor.js'
import Editable from '../../components/ui/Editable.js';
import LoginButton from '../../components/ui/LoginButton.js';
import { useState, useEffect } from "react";
import { FadingComponent, SlidingAndFadingComponent, ZoomingComponent } 
    from '../../components/ui/AnimatedComponent.js';

const defaultContent = {
    'personal_icon': null,
    'personal_photo': null,
    'introductory_text': '',
    'affiliation_image_1': null,
    'affiliation_image_2': null,
    'affiliation_image_3': null,
    'affiliation_image_4': null,
    'employment_resume': null,
    'general_resume': null,
};

export default function Section1(props) {

    console.log('needless update');

    const editing = true;
    const [textEditorOpen, setTextEditorOpen] = useState(false);
    const [imageEditorOpen, setImageEditorOpen] = useState(false);
    const [buttonEditorOpen, setButtonEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const dataPathParent = 'contents/section1/';
    const [editDataPath, setEditDataPath] = useState('');

    const openTextEditor = (id) => {
        setTextEditorOpen(true);
        prepareEditor(id);
    };

    const openImageEditor = (id) => {
        setImageEditorOpen(true);
        prepareEditor(id);
    };

    const openButtonEditor = (id) => {
        setButtonEditorOpen(true);
        prepareEditor(id);
    };

    const prepareEditor = (id) => {
        setEditTarget(id);
        setEditDataPath(dataPathParent);
        setEditPlaceholder(content[id]);
    }

    const [content, setContent] = useState(defaultContent);
    useEffect(() => {
        getSectionContent(1, setContent);
    }, []);

    return (
        <div>
            <TextEditor 
                open={textEditorOpen} 
                setOpen={setTextEditorOpen} 
                id={editTarget} 
                dataPath={editDataPath} 
                placeholder={editPlaceholder}/>

            <ImageEditor 
                open={imageEditorOpen} 
                setOpen={setImageEditorOpen} 
                id={editTarget} 
                dataPath={editDataPath} 
                placeholder={editPlaceholder}/>

            <ButtonEditor 
                open={buttonEditorOpen} 
                setOpen={setButtonEditorOpen} 
                id={editTarget} 
                dataPath={editDataPath} 
                placeholder={editPlaceholder}/>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <Section1BG 
                    width={props.width} 
                    height={props.height} 
                    resolution={800}/>
            </Box>

            <Grid 
                container 
                backgroundColor='#151515'
                color='primary.text'
                justifyContent='center'
                alignItems='center'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}>

                <Grid item xs={1}></Grid>

                <Grid item xs={10} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4'>
                            About Me
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={1} align="center">
                    <LoginButton/>
                </Grid>

                <Grid item xs={3} align="left">
                    <SlidingAndFadingComponent duration={1500} direction={'left'}>
                        <div>
                            <Editable editor={openImageEditor} id={'personal_icon'}>
                                <img src={content.personal_icon}/>
                            </Editable>
                        </div>
                    </SlidingAndFadingComponent>
                </Grid>

                <Grid item xs={1}></Grid>

                <Grid item xs={3} align="right">
                    <SlidingAndFadingComponent duration={1500} direction={'right'}>
                        <div>
                            <Editable editor={openImageEditor} id={'personal_photo'}>
                                <img src={content.personal_photo}/>
                            </Editable>
                        </div>
                    </SlidingAndFadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <div>
                            <Editable editor={openTextEditor} id={'introductory_text'}>
                                <Typography variant='h5' width={'40%'} 
                                    onClick={() => {if (editing) openTextEditor('introductory_text')}}>
                                    {content.introductory_text}
                                </Typography>
                            </Editable>
                        </div>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{mt: 8}}>
                            Affiliation Summary
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={2}/>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_1'}>
                                <img src={content.affiliation_image_1}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800} delay={150}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_2'}>
                                <img src={content.affiliation_image_2}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800} delay={300}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_3'}>
                                <img src={content.affiliation_image_3}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800} delay={450}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_4'}>
                                <img src={content.affiliation_image_4}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2}/>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'employment_resume'}>
                                <Button 
                                    variant='outlined' 
                                    href={content.employment_resume} 
                                    target='_blank'>
                                    Employment Resume
                                </Button>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'general_resume'}>
                                <Button 
                                    variant='outlined' 
                                    href={content.general_resume} 
                                    target='_blank'>
                                    General Resume
                                </Button>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>
            </Grid>
        </div>
        );
}
