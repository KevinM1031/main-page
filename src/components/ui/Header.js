import { Typography, Grid } from '@material-ui/core';
import { useState } from "react";
import { SlidingComponent, FadingComponent } from './AnimatedComponent.js';
import Editable from './Editable.js';
import TextEditor from './TextEditor.js';
import ImageEditor from './ImageEditor.js'


export default function List(props) {

    const [textEditorOpen, setTextEditorOpen] = useState(false);
    const [imageEditorOpen, setImageEditorOpen] = useState(false);

    const [editTarget, setEditTarget] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('');
    const [editDataPath, setEditDataPath] = useState('');

    const openTextEditor = (id) => {
        setTextEditorOpen(true);
        prepareEditor(id);
    };

    const openImageEditor = (id) => {
        setImageEditorOpen(true);
        prepareEditor(id);
    };

    const prepareEditor = (id) => {
        setEditTarget(id);
        setEditDataPath(props.dataPath);
        setEditPlaceholder(props.content[id]);
    }

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

            <Grid container spacing={8} sx={{
                overflow: 'hidden',
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Grid item xs={3} align='center'>
                    <SlidingComponent direction={'right'} duration={1500}>
                        <Editable editor={openImageEditor} id={'thumbnail_left'}>
                            <img src={props.content.thumbnail_left} 
                                style={{height: props.maxHeight * 0.8, overflow: 'hidden'}}/>
                        </Editable>
                    </SlidingComponent>
                </Grid>

                <Grid item xs={5} align='center'> 
                    <FadingComponent duration={1500}>
                        <Editable editor={openTextEditor} id={'description'}>
                            <Typography variant='h6'
                                sx={{maxHeight: props.maxHeight, overflow: 'auto'}}>
                                {props.content.description}
                            </Typography>
                        </Editable>
                    </FadingComponent>
                </Grid>

                <Grid item xs={3} align='center'>
                    <SlidingComponent direction={'left'} duration={1500}>
                        <Editable editor={openImageEditor} id={'thumbnail_right'}>
                            <img src={props.content.thumbnail_right} 
                                style={{height: props.maxHeight * 0.8, overflow: 'hidden'}}/>
                        </Editable>
                    </SlidingComponent>
                </Grid>
            </Grid>
        </div>
    );
}