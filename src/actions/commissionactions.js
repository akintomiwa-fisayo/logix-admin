import { commissionBonusRef } from "../config/firebase";
import { 
    FETCH_COMMISSION_BONUS,
    FETCH_COMMISSION_BONUS_SUCCESS,
    FETCH_COMMISSION_BONUS_FAILED,
    EDIT_CLIENT_COMMISSION_BONUS,
    EDIT_RIDE_COMMISSION_BONUS,
    CLEAR_COMMISSION_ERROR
} from "./types";

export const fetchCommissionBonus = () => dispatch => {
    dispatch({
      type: FETCH_COMMISSION_BONUS,
      payload: null
    });
    commissionBonusRef.on("value", snapshot => {
      console.log("commission bonus on finish is:", snapshot.val())
      if (snapshot.val()) {
        dispatch({
          type: FETCH_COMMISSION_BONUS_SUCCESS,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_COMMISSION_BONUS_FAILED,
          payload: "No bonus available."
        });
      }
    });
  };

  export const editClientReferral = (clientReferral,method) => dispatch =>{
    dispatch({
      type: EDIT_CLIENT_COMMISSION_BONUS,
      payload: method
    });
    commissionBonusRef.child("client_referral").set(clientReferral);
  }

  export const editRideReferral = (rideReferral,method) => dispatch =>{
    dispatch({
      type: EDIT_RIDE_COMMISSION_BONUS,
      payload: method
    });
    commissionBonusRef.child("ride_referral").set(rideReferral);
  }

  export const clearCommissionError = () => dispatch => {
    dispatch({
      type: CLEAR_COMMISSION_ERROR,
      payload: null
    });  
  };