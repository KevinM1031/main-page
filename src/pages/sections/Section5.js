import { Typography, Grid, Box, IconButton } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import ButtonEditor from '../../components/ui/ButtonEditor.js';
import Editable from '../../components/ui/Editable.js';
import Section5BG from '../backgrounds/Section5_BG';
import Shop from '../../components/ui/Shop.js';
import Header from '../../components/ui/Header.js';
import { FadingComponent, ZoomingComponent } from '../../components/ui/AnimatedComponent.js';
import { isLandscape } from '../../components/ui/Window.js';
import { ShoppingCartOutlined } from "@mui/icons-material";

const defaultContent = {
    'thumbnail_left': null,
    'thumbnail_right': null,
    'description': '',
    'description_kor': '',
    'shop_link': '',
    'items': [
        {
            'name': '',
            'name_kor': '',
            'status': '',
            'status_kor': '',
            'description': '',
            'description_kor': '',
            'image': null,
        },
    ],
};

export default function Section5(props) {
    const dataPathParent = pathBase() + 'section5/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(5, setContent);
        getSectionRawContent(5, setRawContent);
    }, []);

    const [buttonEditorOpen, setButtonEditorOpen] = useState(false);
    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const [editDataPath, setEditDataPath] = useState('');
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

    return (
        <div style={{height: props.height + 'px'}}>

            <ButtonEditor 
                open={buttonEditorOpen} 
                setOpen={setButtonEditorOpen} 
                id={editTarget} 
                dataPath={editDataPath} 
                placeholder={editPlaceholder}/>

            <Box width={props.width} height={props.height} sx={{ overflow: 'hidden' }}>
                <div style={{ marginTop: '0px' }}>
                    <Section5BG 
                        hidden={true} 
                        width={props.width} 
                        height={props.height} 
                        resolution={800}/>
                </div>
            </Box>

            <Grid 
                container
                height={props.height} 
                sx={{ mt: -props.height / 8 }}
                color='primary.text'
                justifyContent='space-around'
                alignItems='stretch'
                direction="column"
                style={{ position: 'relative' }}>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mb: 4}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '식물류 계량 및 판매' :
                                'Plant Cultivating & Sales'
                            }
                        </Typography>
                    </FadingComponent>

                    <Header 
                        dataPath={dataPathParent} 
                        content={content} height={props.height * 0.2} 
                        landscape={isLandscape()}
                        lang={lang}/>

                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'shop_link'}>
                                <IconButton 
                                    variant='outlined' 
                                    href={content.shop_link} 
                                    target='_blank'>
                                    <ShoppingCartOutlined fontSize={isLandscape() ? 'large' : 'medium'}/>
                                </IconButton>
                            </Editable>
                            
                            <Typography align='center' variant={isLandscape() ? 'h5' : 'h6'}>
                                { lang === 'kor' ?
                                    '판매 종자 및 묘목 목록' :
                                    'List of Plants in Sale'
                                }
                            </Typography>
                        </div>
                    </ZoomingComponent>
                </Grid>

                <Grid item align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' sx={{mt: 8, mb: 6}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '종자 목록' :
                                'Featured Specimens'
                            }
                        </Typography>
                    </FadingComponent>

                    <FadingComponent duration={1500}>
                        <Shop 
                            maxHeight={props.height * 0.43} 
                            dataPath={dataPathParent + 'items/'} 
                            rawContent={rawContent} 
                            content={content}
                            landscape={isLandscape()} 
                            lang={lang}/>
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
