import { ImageListItem, ImageListItemBar, Grid } 
    from '@material-ui/core';
import { useState } from "react";
import Editable from './Editable.js';
import GalleryEditor from './GalleryEditor.js';

const CustomImageList = (props) => {
    let cols = Array.apply(null, Array(props.cols)).map(function (x, i) { return i; });

    return (
        <Grid container spacing={2}>
            {cols.map((i) => (
                <Grid item xs={12 / props.cols}>
                    {props.content[props.id].map((item, key) => (
                        <div>
                            {
                                (key % props.cols) === i ?
                                    <ImageListItem 
                                        key={key}
                                        style={{marginBottom: 8}}
                                        onClick={() => { window.open(item.image, '_blank') }}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{maxWidth: '100%'}}/>
                                        <ImageListItemBar
                                            title={item.title}
                                            sx={{ background: 'rgba(0, 0, 0, 0.3)' }}/>
                                    </ImageListItem>
                                :
                                <div/>
                            }
                        </div>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default function Gallery(props) {

    const [galleryEditorOpen, setGalleryEditorOpen] = useState(false);

    const openGalleryEditor = () => {
        setGalleryEditorOpen(true);
    };

    return (
        <div>
            <GalleryEditor 
                open={galleryEditorOpen} 
                setOpen={setGalleryEditorOpen} 
                id={props.id} 
                dataPath={props.dataPath} 
                content={props.rawContent[props.id]}/>

            <div style={{width: '90%', height: props.maxHeight, overflowX: 'hidden', overflowY: 'scroll'}}>
                <Editable editor={openGalleryEditor}>
                    <CustomImageList 
                        content={props.content}
                        id={props.id}
                        cols={props.cols}/>
                </Editable>
            </div>
        </div>
    );
}