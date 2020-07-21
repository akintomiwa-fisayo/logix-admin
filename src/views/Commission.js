import React,{ useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from '../components/AlertDialog';
import CircularLoading from "../components/CircularLoading";
import  languageJson  from "../config/language";

import {
    editClientReferral,
    editRideReferral,
    clearCommissionError
}  from "../actions/commissionactions";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  gridRow: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "2em",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width:192,
    height:192
  },
  form: {
    width: '100%', // Fix IE 11 issue. 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Commission = (props) => {
  const commissionbonusdata = useSelector(state => state.commissionbonusdata);
  const dispatch = useDispatch();
  const classes  = useStyles();
  const [clientReferral, setClientReferral] = useState({duration: null, rate: null});
  const [rideReferral, setRideReferral] = useState({duration: null, rate: null});
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
    if(commissionbonusdata.clientReferral){
      setClientReferral(commissionbonusdata.clientReferral);
    }
  },[commissionbonusdata.clientReferral]);
 
  useEffect(()=>{
    if(commissionbonusdata.rideReferral){
      setRideReferral(commissionbonusdata.rideReferral);
    }
  },[commissionbonusdata.rideReferral]);

  const handleClientReferralChange = (props) =>{
    setClientReferral({
      ...clientReferral,
      ...props,
    });
  } 

  const submitClientReferral = (e) =>{
    e.preventDefault();
    setClicked(true);
    console.log({clientReferral})
    dispatch(editClientReferral(clientReferral));
  }

  const handleRideReferralChange = (props) =>{
    setRideReferral({
      ...rideReferral,
      ...props,
    });
  } 

  const submitRideReferral = (e) =>{
    e.preventDefault();
    setClicked(true);
    console.log({rideReferral})
    dispatch(editRideReferral(rideReferral));
  }

  const handleClose = () => {
    setClicked(false);
    dispatch(clearCommissionError());
  };

  return (
    commissionbonusdata.loading? <CircularLoading/>:
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {languageJson.client_referral}
        </Typography>
        <form className={classes.form} onSubmit={submitClientReferral}>
          <div className={classes.gridRow}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="clientDuration"
                label={languageJson.duration}
                name="clientDuration"
                autoComplete="clientDuration"
                onChange={({target: {value: duration}})=> {
                  handleClientReferralChange({duration})
                }}
                value={clientReferral.duration}
                // autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="clientRate"
                label={languageJson.rate}
                name="clientRate"
                autoComplete="clientRate"
                onChange={({target: {value: rate}})=> {
                  handleClientReferralChange({rate})
                }}
                value={clientReferral.rate}
                // autoFocus
            />
          </div>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
          >
              {languageJson.submit}
          </Button>
        </form>
      </div>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {languageJson.ride_referral}
        </Typography>
        <form className={classes.form} onSubmit={submitRideReferral}>
          <div className={classes.gridRow}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rideDuration"
                label={languageJson.duration}
                name="rideDuration"
                autoComplete="rideDuration"
                onChange={({target: {value: duration}})=> {
                  handleRideReferralChange({duration})
                }}
                value={rideReferral.duration}
                // autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rideRate"
                label={languageJson.rate}
                name="rideRate"
                autoComplete="rideRate"
                onChange={({target: {value: rate}})=> {
                  handleRideReferralChange({rate})
                }}
                value={rideReferral.rate}
                // autoFocus
            />
          </div>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
          >
              {languageJson.submit}
          </Button>
        </form>
      </div>
     
      <AlertDialog open={commissionbonusdata.error.flag && clicked} onClose={handleClose}>{languageJson.update_failed}</AlertDialog>
    </Container>
  );
  
}

export default Commission;
