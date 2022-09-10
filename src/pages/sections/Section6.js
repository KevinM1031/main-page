import { Typography, Grid, Box, IconButton } from '@material-ui/core';
import { getSectionContent, getSectionRawContent, pathBase } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import ButtonEditor from '../../components/ui/ButtonEditor.js';
import Editable from '../../components/ui/Editable.js';
import Section6BG from '../backgrounds/Section6_BG';
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
    const dataPathParent = pathBase() + 'section6/';
    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(6, setContent);
        getSectionRawContent(6, setRawContent);
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

    useEffect(() => {
        let img = [];
        img[0] = new Image();
        img[0].src = content.thumbnail_left;
        img[1] = new Image();
        img[1].src = content.thumbnail_right;
        for (let i in content.items) {
            img[2+i] = new Image();
            img[2+i].src = content.items[i].image;
        }
    }, [content]);

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
                    <Section6BG 
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
                        <Typography align='center' sx={{mb: 4}}
                            variant={isLandscape() ? 'h2' : 'h3'}>
                            { lang === 'kor' ?
                                '동물류 사육 / 키우기 / 분양' :
                                'Animal Keeping and Sales'
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
                    <ZoomingComponent duration={800}>
                        <div>
                            <Editable editor={openButtonEditor} id={'shop_link'}>
                                <IconButton 
                                    variant='outlined' 
                                    href={content.shop_link}
                                    sx={{mt: 4}}
                                    target='_blank'>
                                    <ShoppingCartOutlined fontSize={isLandscape() ? 'large' : 'medium'}/>
                                </IconButton>
                            </Editable>
                            
                            <Typography align='center' variant={isLandscape() ? 'h5' : 'h6'}>
                                { lang === 'kor' ?
                                    '판매중인 개체 목록' :
                                    'List of Animals for Sale'
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
                                '전시 목록' :
                                'Featured Species'
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
