import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



export default function categoria(props) {

    return (

        <div>
            <Grid
                container

                direction="column"
                alignItems="center"
            >

                <Grid item

               
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                    <Typography variant="h5" style={{ margin: 20 }}>
                        Gestion de convenios
                    </Typography>
                    <br></br>




                </Grid>
            </Grid>
        </div>

    );
}