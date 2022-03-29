import { ImageList, ImageListItem, ImageListItemBar, IconButton } 
    from '@material-ui/core';
import { useState } from "react";
import Editable from './Editable.js';
import GalleryEditor from './GalleryEditor.js';

const LandscapeLayout = (props) => {
    return (
        <ImageList variant={''} cols={2} gap={8} 
            style={{ width: '90%', height: '90%', hideScrollbar: true }} 
            sx={{ height: '90%', overflowY: 'scroll' }}>
            {props.content[props.id].map((item) => (
                <ImageListItem 
                    key={item.title}
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
        <ImageList variant={''} cols={1} gap={8} 
            style={{ width: '90%', height: '90%', hideScrollbar: true }} 
            sx={{ height: '90%', overflowY: 'scroll' }}>
            {props.content[props.id].map((item) => (
                <ImageListItem key={item.title}>
                    <img
                        src={item.image}
                        alt={item.title}
                        style={{maxWidth: '100%'}}/>
                    <ImageListItemBar
                        title={item.title}
                        sx={{ background: 'rgba(0, 0, 0, 0.3)' }}
                        href={item.image}
                        onFocus={() => console.log('asdf')}
                        onClick={() => window.open(item.image, '_blank')}
                        target="_blank"/>
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

            <div style={{width: '100%', height: props.maxHeight}}>
                <Editable editor={openGalleryEditor}>
                    {
                    props.landscape ?
                        <LandscapeLayout 
                            content={props.content}
                            id={props.id}/>
                    :
                        <PortraitLayout 
                            content={props.content}
                            id={props.id}/>
                    }
                </Editable>
            </div>
        </div>
    );
}