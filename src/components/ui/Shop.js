import { Typography, Grid, Pagination, Slide, Box, Fade, Button } from '@material-ui/core';
import { useState } from "react";
import Editable from './Editable.js'
import ShopEditor from './ShopEditor.js'

const LandscapeLayout = (props) => {
    return (
        <Grid container sx={{ overflow: 'hidden'}}  style={{ height: '100%'}}>
            <Grid item xs={7}  style={{ height: '100%'}}>
                <Slide direction="right" timeout={700} in={props.pageAnim} onExited={() => {
                    props.setPageAnim(true);
                    props.setPageNum(props.pageNumTemp - 1);
                }}>
                    <div style={{ height: '100%'}}>
                        <Fade timeout={700} in={props.pageAnim}>
                            <img src={props.content.items[props.pageNum].image}
                                style={{ 
                                    maxWidth: '90%', width: '90%', height: '95%', objectFit: 'cover',
                                    marginLeft: 0 }}/>
                        </Fade>
                    </div>
                    
                </Slide>
            </Grid>

            <Grid item xs={5} align='left'>
                <Slide timeout={700} direction="left" in={props.pageAnim}>
                    <div style={{height: '100%'}}>
                        <Fade timeout={700} in={props.pageAnim}>
                            <Box sx={{ overflow: 'auto', height: props.maxHeight * 0.9 }}>
                                <Typography variant='h2' sx={{mb: 2}}>
                                    {
                                        props.lang === 'kor' ?
                                        props.content.items[props.pageNum].name_kor
                                        :
                                        props.content.items[props.pageNum].title
                                    }
                                </Typography>

                                <Grid container sx={{ mb: 3, alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <Typography variant='h3'>
                                            {
                                                props.lang === 'kor' ?
                                                props.content.items[props.pageNum].status_kor
                                                :
                                                props.content.items[props.pageNum].status
                                            }
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant='h3'>
                                            {props.content.items[props.pageNum].price}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant='h4' style={{ whiteSpace: "pre-line" }}>
                                    {
                                        props.lang === 'kor' ?
                                        props.content.items[props.pageNum].description_kor
                                        :
                                        props.content.items[props.pageNum].description
                                    }
                                </Typography>
                            </Box>
                        </Fade>
                    </div>
                </Slide>
            </Grid>
        </Grid>
    );
};

const PortraitLayout = (props) => {
    return (
        <Grid container sx={{ overflow: 'hidden', height: '100%' }}>
            <Grid item xs={12}>
                <Slide direction="right" timeout={700} in={props.pageAnim} onExited={() => {
                    props.setPageAnim(true);
                    props.setPageNum(props.pageNumTemp - 1);
                }}>
                    <div>
                        <Fade timeout={700} in={props.pageAnim}>
                            <img src={props.content.items[props.pageNum].image}
                                style={{ 
                                    maxWidth: '100%', width: '100%', height: props.maxHeight * 0.45, objectFit: 'cover'}}/>
                        </Fade>
                    </div>
                    
                </Slide>
            </Grid>

            <Grid item xs={12} align='left'>
                <Slide timeout={700} direction="left" in={props.pageAnim}>
                    <div style={{height: '100%'}}>
                        <Fade timeout={700} in={props.pageAnim}>
                            <Box sx={{ overflow: 'auto', height: props.maxHeight * 0.45 }}>

                                <Typography variant='h3' sx={{mb: 2, mt:2}}>
                                    {
                                        props.lang === 'kor' ?
                                        props.content.items[props.pageNum].name_kor
                                        :
                                        props.content.items[props.pageNum].title
                                    }
                                </Typography>

                                <Grid container sx={{ mb: 2, alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <Typography variant='h4'>
                                            {
                                                props.lang === 'kor' ?
                                                props.content.items[props.pageNum].status_kor
                                                :
                                                props.content.items[props.pageNum].status
                                            }
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant='h4'>
                                            {props.content.items[props.pageNum].price}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant='h5' style={{ whiteSpace: "pre-line" }}>
                                    {
                                        props.lang === 'kor' ?
                                        props.content.items[props.pageNum].description_kor
                                        :
                                        props.content.items[props.pageNum].description
                                    }
                                </Typography>
                            </Box>
                        </Fade>
                    </div>
                </Slide>
            </Grid>
        </Grid>
    );
};

export default function Shop(props) {

    const [shopEditorOpen, setShopEditorOpen] = useState(false);
    const [pageNumTemp, setPageNumTemp] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [pageAnim, setPageAnim] = useState(true);

    const openShopEditor = () => {
        setShopEditorOpen(true);
    };

    return (
        <div>
            <ShopEditor 
                open={shopEditorOpen} 
                setOpen={setShopEditorOpen} 
                id={'items'} 
                dataPath={props.dataPath} 
                content={props.rawContent.items}
                page={pageNum}/>

            <div style={{width: '90%', height: props.maxHeight}}>
                <Editable editor={openShopEditor}>
                    {
                    props.landscape ?
                        <LandscapeLayout 
                            pageNum={pageNum} 
                            setPageNum={setPageNum}
                            pageNumTemp={pageNumTemp}
                            pageAnim={pageAnim}
                            setPageAnim={setPageAnim}
                            content={props.content}
                            maxHeight={props.maxHeight}
                            lang={props.lang}/>
                    :
                        <PortraitLayout 
                            pageNum={pageNum} 
                            setPageNum={setPageNum}
                            pageNumTemp={pageNumTemp}
                            pageAnim={pageAnim}
                            setPageAnim={setPageAnim}
                            content={props.content}
                            maxHeight={props.maxHeight}
                            lang={props.lang}/>
                    }
                </Editable>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', }}>
                    <Pagination count={props.content.items.length} color='primary' siblingCount={props.landscape ? 2 : 0}
                        variant="outlined" shape="rounded" onChange={(event, value) => {
                            if(!value) return;
                            setPageNumTemp(value);
                            setPageAnim(false);
                    }} />
                </Box>
            </div>
        </div>
    );
}