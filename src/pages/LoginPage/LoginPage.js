import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ButtonGroup } from "@material-ui/core";


function LoginPage() {



    function seeEvaluationQuestions() {

    }

    function seeSubmittedEvaluations() {

    }

    function logout() {

    }

    return (
        <Grid container
            spacing={0}
            align="center"
            justify="center"
            direction="column" >
            <h2 style={{ textAlign: "center" }}>Enabling Effective Teams</h2>
            <h3 style={{ textAlign: "center" }}>Student View</h3>
            <Box display="flex" justifyContent="center" mt={8}>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                >
                    <Button onClick={seeEvaluationQuestions}>Evaluate Your Team</Button>
                    <Button onClick={seeSubmittedEvaluations}>Submitted Evaluations</Button>
                    <Button onClick={logout}>Sign Out</Button>
                </ButtonGroup>
            </Box>
        </Grid>

    )
}

export default LoginPage;
