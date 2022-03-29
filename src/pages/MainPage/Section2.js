import { Typography, Grid, Box } from '@material-ui/core';
import { getSectionContent, getSectionRawContent } from '../../components/database/FirebaseAPI.js';
import { useState, useEffect } from "react";
import Section2BG from './Section2_BG'
import Editable from '../../components/ui/Editable.js'
import List from '../../components/ui/List.js'
import ImageEditor from '../../components/ui/ImageEditor.js'
import { FadingComponent } from '../../components/ui/AnimatedComponent.js';
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
    'skillsets': null,
};

export default function Section2(props) {

    const [imageEditorOpen, setImageEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const dataPathParent = 'contents/section2/';
    const [editDataPath, setEditDataPath] = useState('');

    const openImageEditor = (id) => {
        setImageEditorOpen(true);
        prepareEditor(id);
    };

    const prepareEditor = (id) => {
        setEditTarget(id);
        setEditDataPath(dataPathParent);
        setEditPlaceholder(content);
    }

    const [content, setContent] = useState(defaultContent);
    const [rawContent, setRawContent] = useState({});
    useEffect(() => {
        getSectionContent(2, setContent);
        getSectionRawContent(2, setRawContent);
    }, []);

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
                backgroundColor='#151515'
                color='primary.text'
                justifyContent='center'
                alignItems='center'
                height={props.height} 
                sx={{ mt: -props.height / 8 }}>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{ mt: 4 }}>
                            Featured Items
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

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Typography align='center' variant='h4' sx={{mt: props.height * 0.02}}>
                            Skillsets
                        </Typography>
                    </FadingComponent>
                </Grid>

                <Grid item xs={12} align="center">
                    <FadingComponent duration={1500}>
                        <Editable editor={openImageEditor} id={'skillsets'}>
                            <img src={content.skillsets} width={'100%'} />
                        </Editable>
                    </FadingComponent>
                </Grid>
            </Grid>
        </div>
    );
}
