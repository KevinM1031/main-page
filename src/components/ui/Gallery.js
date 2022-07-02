import { ImageList, ImageListItem, ImageListItemBar, IconButton } 
    from '@material-ui/core';
import { useState } from "react";
import Editable from './Editable.js';
import GalleryEditor from './GalleryEditor.js';

const LandscapeLayout = (props) => {
    return (
        <ImageList variant={'masonry'} cols={props.cols} gap={8}>
            {props.content[props.id].map((item, key) => (
                <ImageListItem 
                    key={key}
                    onClick={() => { window.open(item.image, '_blank') }}>
                    <img
                        src={item.image}
                        alt={item.title}
                        style={{maxWidth: '100%'}}/>
                    <ImageListItemBar
                        title={item.title}
                        sx={{ background: 'rgba(0, 0, 0, 0.3)' }}/>
                </ImageListItem>
            ))}
        </ImageList>
    );
};

const PortraitLayout = (props) => {
    return (
        <ImageList variant={'masonry'} cols={props.cols} gap={8}>
            {props.content[props.id].map((item, key) => (
                <ImageListItem 
                    key={key}
                    onClick={() => { window.open(item.image, '_blank') }}>
                    <img
                        src={item.image}
                        alt={item.title}
                        style={{maxWidth: '100%'}}/>
                    <ImageListItemBar
                        title={item.title}
                        sx={{ background: 'rgba(0, 0, 0, 0.3)' }}/>
                </ImageListItem>
            ))}
        </ImageList>
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
                    {
                    props.landscape ?
                        <LandscapeLayout 
                            content={props.content}
                            id={props.id}
                            cols={props.cols}/>
                    :
                        <PortraitLayout 
                            content={props.content}
                            id={props.id}
                            cols={props.cols}/>
                    }
                </Editable>
            </div>
        </div>
    );
}