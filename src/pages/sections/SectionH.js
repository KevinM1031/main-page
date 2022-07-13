import { Typography, Grid, Box, IconButton, Tooltip, Fade } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import TextEditor from '../../components/ui/TextEditor.js';
import ImageEditor from '../../components/ui/ImageEditor.js';
import ButtonEditor from '../../components/ui/ButtonEditor.js';
import List from '../../components/ui/List.js';
import Gallery from '../../components/ui/Gallery.js';
import Editable from '../../components/ui/Editable.js';
import { isLandscape } from '../../components/ui/Window.js'
import { useState, useEffect } from "react";
import { FadingComponent, SlidingAndFadingComponent, ZoomingComponent } 
    from '../../components/ui/AnimatedComponent.js';
import { AccessTime, NightsStayOutlined } from "@material-ui/icons";
import { ArticleOutlined, GitHub, Instagram, LinkedIn, Language } from "@mui/icons-material";


const defaultContent = {
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
    'hidden_gallery': [
        {
            'image': '',
        },
    ],
};

export default function SectionH(props) {

    const dataPathParent = pathBase() + 'sectionH/';

    const [textEditorOpen, setTextEditorOpen] = useState(false);
    const [imageEditorOpen, setImageEditorOpen] = useState(false);
    const [buttonEditorOpen, setButtonEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const [editPlaceholder_kor, setEditPlaceholder_kor] = useState('');
    const [editDataPath, setEditDataPath] = useState('');

    const openTextEditor = (id) => {
        setTextEditorOpen(true);
        prepareEditor(id);
        setEditPlaceholder_kor(content[id + '_kor']);
    };

    const prepareEditor = (id) => {
        setEditTarget(id);
        setEditDataPath(dataPathParent);
        setEditPlaceholder(content[id]);
    }

    const lang = localStorage.getItem('lang');

    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent('H', setContent, ['items', 'hidden_gallery'], true);
        getSectionRawContent('H', setRawContent);
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

            <Grid 
                container
                color='primary.text'
                justifyContent='center'
                alignItems='center'
                height={props.height}
                style={{ position: 'relative' }}>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mb: 8}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '비밀창고' :
                                'Hidden Page'
                            }
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <div>
                            <Editable editor={openTextEditor} id={'introductory_text'}>
                                <Typography variant={isLandscape() ? 'h4' : 'h5'} 
                                    width={isLandscape() ? '40%' : '70%'} 
                                    sx={{overflow: 'auto', mb: 8}}>
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
                        <div>
                            <Typography align='center' variant={isLandscape() ? 'h2' : 'h3'} sx={{mb: 6}}>
                                { props.lang === 'kor' ?
                                    '비밀 목록' :
                                    'Hidden Items'
                                }
                            </Typography>
                            
                            <List 
                                maxHeight={props.height * 0.22} 
                                dataPath={dataPathParent + 'items/'} 
                                rawContent={rawContent} 
                                content={content}
                                landscape={isLandscape()}
                                lang={lang}/>
                        </div>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <div>
                            <Typography align='center' variant={isLandscape() ? 'h2' : 'h3'} sx={{mt: 8, mb: 6}}>
                                { props.lang === 'kor' ?
                                    '비밀 갤러리' :
                                    'Hidden Gallery'
                                }
                            </Typography>

                            <Gallery 
                                maxHeight={props.height * 0.50} 
                                dataPath={dataPathParent + 'hidden_gallery/'} 
                                id={'hidden_gallery'}
                                rawContent={rawContent} 
                                content={content}
                                landscape={false}
                                cols={isLandscape() ? 4 : 2} />
                            </div>
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
        );
}
