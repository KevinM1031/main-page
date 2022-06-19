import { Typography, Grid, Box, IconButton, Tooltip } from '@material-ui/core';
import { getSectionContent, pathBase } from '../../components/database/FirebaseAPI.js';
import Section1BG from '../backgrounds/Section1_BG';
import TextEditor from '../../components/ui/TextEditor.js';
import ImageEditor from '../../components/ui/ImageEditor.js';
import ButtonEditor from '../../components/ui/ButtonEditor.js'
import Editable from '../../components/ui/Editable.js';
import LoginButton from '../../components/ui/LoginButton.js';
import { isLandscape } from '../../components/ui/Window.js'
import { useState, useEffect } from "react";
import { FadingComponent, SlidingAndFadingComponent, ZoomingComponent } 
    from '../../components/ui/AnimatedComponent.js';
import { AccessTime, NightsStayOutlined } from "@material-ui/icons";
import { ArticleOutlined, GitHub, Instagram, LinkedIn, Language } from "@mui/icons-material";

const defaultContent = {
    'weather': null,
    'personal_icon': null,
    'personal_photo': null,
    'introductory_text': '',
    'affiliation_image_1': null,
    'affiliation_image_2': null,
    'affiliation_image_3': null,
    'affiliation_image_4': null,
    'employment_resume': null,
    'github': null,
    'linkedin': null,
    'instagram': null,
    'general_resume': null,
};

export default function Section1(props) {

    const [textEditorOpen, setTextEditorOpen] = useState(false);
    const [imageEditorOpen, setImageEditorOpen] = useState(false);
    const [buttonEditorOpen, setButtonEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const [editPlaceholder_kor, setEditPlaceholder_kor] = useState('');
    const dataPathParent = pathBase() + 'section1/';
    const [editDataPath, setEditDataPath] = useState('');

    const openTextEditor = (id) => {
        setTextEditorOpen(true);
        prepareEditor(id);
        setEditPlaceholder_kor(content[id + '_kor']);
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

    const lang = localStorage.getItem('lang');
    const cycleLanguage = () => {
        if (!lang || lang === '') localStorage.setItem('lang', 'kor');
        else localStorage.setItem('lang', '');
        window.location.href = '/main-page/?p=1&b=true';
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
                placeholder={editPlaceholder}
                placeholder_kor={editPlaceholder_kor}/>

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
                color='primary.text'
                justifyContent='center'
                alignItems='center'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}
                style={{ position: 'relative' }}>

                <Grid item xs={2} align="right">
                    <FadingComponent duration={1000}>
                        <div>
                            <LoginButton landscape={isLandscape()} lang={lang}/>
                        </div>
                    </FadingComponent>
                </Grid>

                <Grid item xs={2} align="left">
                    <FadingComponent duration={1000}>
                        <Tooltip title={lang === 'kor' ? '언어' : 'Language'}>
                            <IconButton onClick={() => cycleLanguage()}>
                                <Language fontSize={isLandscape() ? 'large' : 'medium'}/>
                            </IconButton>
                        </Tooltip>
                    </FadingComponent>
                </Grid>

                <Grid item xs={4} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: 8, mb: 8}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '소개' :
                                'About Me'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={2} align="right">
                    <FadingComponent duration={1000}>
                        <Tooltip title={lang === 'kor' ? '시간' : 'Digital Clock'}>
                            <IconButton href={'/digital-clock'} target='_blank'>
                                <AccessTime 
                                    fontSize={isLandscape() ? 'large' : 'medium'}/>
                            </IconButton>
                        </Tooltip>
                    </FadingComponent>
                </Grid>

                <Grid item xs={2} align="left">
                    <FadingComponent duration={1000}>
                        <Tooltip title={lang === 'kor' ? '날씨' : 'Digital Weather Report'}>
                            <IconButton href={content.weather} target='_blank'>
                                <NightsStayOutlined 
                                    fontSize={isLandscape() ? 'large' : 'medium'}/>
                            </IconButton>
                        </Tooltip>
                    </FadingComponent>
                </Grid>

                <Grid item xs={isLandscape() ? 3 : 5} align="left">
                    <SlidingAndFadingComponent duration={1500} direction={'left'}>
                        <div>
                            <Editable editor={openImageEditor} id={'personal_icon'}>
                                <img src={content.personal_icon}/>
                            </Editable>
                        </div>
                    </SlidingAndFadingComponent>
                </Grid>

                <Grid item xs={1}></Grid>

                <Grid item xs={isLandscape() ? 3 : 5} align="right">
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
                                <Typography variant={isLandscape() ? 'h4' : 'h5'} 
                                    width={isLandscape() ? '40%' : '70%'} 
                                    sx={{mt: 8, maxHeight: props.height*0.25, overflow: 'auto'}}>
                                    {
                                        lang === 'kor' ?
                                        content.introductory_text_kor
                                        :
                                        content.introductory_text
                                    }
                                </Typography>
                            </Editable>
                        </div>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: 12}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '소속' :
                                'Affiliation Summary'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={2}/>

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_1'}>
                                <img src={content.affiliation_image_1}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800} delay={150}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_2'}>
                                <img src={content.affiliation_image_2}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                {isLandscape() ?
                null : <Grid item xs={2}/>}

                {isLandscape() ?
                null : <Grid item xs={2}/>}

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800} delay={300}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_3'}>
                                <img src={content.affiliation_image_3}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800} delay={450}>
                        <div>
                            <Editable editor={openImageEditor} id={'affiliation_image_4'}>
                                <img src={content.affiliation_image_4}/>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={2}/>

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'employment_resume'}>
                                <IconButton 
                                    variant='outlined' 
                                    href={content.employment_resume} 
                                    target='_blank'>
                                    <ArticleOutlined fontSize={isLandscape() ? 'large' : 'medium'}/>
                                </IconButton>
                            </Editable>
                            
                            <Typography align='center' variant={isLandscape() ? 'h5' : 'h6'}>
                                { lang === 'kor' ?
                                    '채용 이력서' :
                                    'Employment Resume'
                                }
                            </Typography>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={1} align="right">
                    <ZoomingComponent duration={600}>
                        <div>
                            <Editable editor={openButtonEditor} id={'github'}>
                                <Tooltip title='GitHub'>
                                    <IconButton href={content.github} target='_blank'>
                                        <GitHub 
                                            fontSize={isLandscape() ? 'large' : 'medium'}/>
                                    </IconButton>
                                </Tooltip>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={1} align="center">
                    <ZoomingComponent duration={600}>
                        <div>
                            <Editable editor={openButtonEditor} id={'linkedin'}>
                                <Tooltip title='LinkedIn'>
                                    <IconButton href={content.linkedin} target='_blank'>
                                        <LinkedIn 
                                            fontSize={isLandscape() ? 'large' : 'medium'}/>
                                    </IconButton>
                                </Tooltip>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={1} align="left">
                    <ZoomingComponent duration={600}>
                        <div>
                            <Editable editor={openButtonEditor} id={'instagram'}>
                                <Tooltip title='Instagram'>
                                    <IconButton href={content.instagram} target='_blank'>
                                        <Instagram 
                                            fontSize={isLandscape() ? 'large' : 'medium'}/>
                                    </IconButton>
                                </Tooltip>
                            </Editable>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item xs={isLandscape() ? 2 : 4} align='center'>
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'general_resume'}>
                                <IconButton 
                                    variant='outlined' 
                                    href={content.general_resume} 
                                    target='_blank'>
                                    <ArticleOutlined fontSize={isLandscape() ? 'large' : 'medium'}/>
                                </IconButton>
                            </Editable>
                            
                            <Typography align='center' variant={isLandscape() ? 'h5' : 'h6'}>
                                { lang === 'kor' ?
                                    '일반 이력서' :
                                    'General Resume'
                                }
                            </Typography>
                        </div>
                    </ZoomingComponent>
                </Grid>
            </Grid>
        </div>
        );
}
