import { Typography, Grid, Pagination, Slide, Box, Fade, Button } from '@material-ui/core';
import { useState } from "react";
import Editable from './Editable.js'
import ListEditor from './ListEditor.js'

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
                                    maxWidth: '90%', width: '90%', height: '90%', objectFit: 'cover',
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
                                <Grid container sx={{ mb: 2, alignItems: 'center' }}>
                                    <Grid item xs={8}>
                                        <Typography variant='h2'>
                                            {props.content.items[props.pageNum].title}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4} align={'right'}>
                                        <Button 
                                            disabled={!props.content.items[props.pageNum].link}
                                            href={props.content.items[props.pageNum].link}
                                            target="_blank"
                                            variant='outlined'>
                                            Inspect
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Typography variant='h3' sx={{ mb: 2 }}>
                                    {props.content.items[props.pageNum].status}
                                </Typography>

                                <Typography variant='h4'>
                                    {props.content.items[props.pageNum].description}
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

                                <Grid container sx={{ mt: 2, mb: 1, alignItems: 'center' }}>
                                    <Grid item xs={8}>
                                        <Typography variant='h3'>
                                            {props.content.items[props.pageNum].title}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4} align={'right'}>
                                        <Button 
                                            disabled={!props.content.items[props.pageNum].link}
                                            href={props.content.items[props.pageNum].link}
                                            target="_blank"
                                            variant='outlined'>
                                            Inspect
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Typography variant='h4' sx={{mb: 1}}>
                                    {props.content.items[props.pageNum].status}
                                </Typography>

                                <Typography variant='h5' sx={{mb: 2}}>
                                    {props.content.items[props.pageNum].description}
                                </Typography>
                            </Box>
                        </Fade>
                    </div>
                </Slide>
            </Grid>
        </Grid>
    );
};

export default function List(props) {

    const [listEditorOpen, setListEditorOpen] = useState(false);
    const [pageNumTemp, setPageNumTemp] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [pageAnim, setPageAnim] = useState(true);

    const openListEditor = () => {
        setListEditorOpen(true);
    };

    return (
        <div>
            <ListEditor 
                open={listEditorOpen} 
                setOpen={setListEditorOpen} 
                id={'items'} 
                dataPath={props.dataPath} 
                content={props.rawContent.items}
                page={pageNum}/>

            <div style={{width: '90%', height: props.maxHeight}}>
                <Editable editor={openListEditor}>
                    {
                    props.landscape ?
                        <LandscapeLayout 
                            pageNum={pageNum} 
                            setPageNum={setPageNum}
                            pageNumTemp={pageNumTemp}
                            pageAnim={pageAnim}
                            setPageAnim={setPageAnim}
                            content={props.content}
                            maxHeight={props.maxHeight}/>
                    :
                        <PortraitLayout 
                            pageNum={pageNum} 
                            setPageNum={setPageNum}
                            pageNumTemp={pageNumTemp}
                            pageAnim={pageAnim}
                            setPageAnim={setPageAnim}
                            content={props.content}
                            maxHeight={props.maxHeight}/>
                    }
                </Editable>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', }}>
                    <Pagination count={props.content.items.length} color='primary' siblingCount={props.landscape ? 2 : 0}
                        variant="outlined" shape="rounded" onChange={(event, value) => {
                            setPageNumTemp(value);
                            setPageAnim(false);
                    }} />
                </Box>
            </div>
        </div>
    );
}