import { 
    FETCH_COMMISSION_BONUS,
    FETCH_COMMISSION_BONUS_SUCCESS,
    FETCH_COMMISSION_BONUS_FAILED,
    EDIT_CLIENT_COMMISSION_BONUS,
    EDIT_RIDE_COMMISSION_BONUS,
    CLEAR_COMMISSION_ERROR
  } from "../actions/types";
  
  const defaultCommsions = {
    clientReferral:{
      duration: null,
      rate: null,
    },
    rideReferral:{
      duration: null,
      rate: null,
    },
  }
  export const INITIAL_STATE = {
    ...defaultCommsions,
    loading: false,
    error:{
      flag:false,
      msg: null
    }
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_COMMISSION_BONUS:
        return {
          ...state,
          loading:true
        };
      case FETCH_COMMISSION_BONUS_SUCCESS:
        return {
          ...state,
          clientReferral: action.payload.client_referral,
          rideReferral: action.payload.ride_referral,
          loading:false
        };
      case FETCH_COMMISSION_BONUS_FAILED:
        return {
          ...state,
          ...defaultCommsions,
          loading:false,
          error:{
            flag:true,
            msg:action.payload
          }
        };
      case EDIT_CLIENT_COMMISSION_BONUS:
        return state;
      case EDIT_RIDE_COMMISSION_BONUS:
        return state;
      case CLEAR_COMMISSION_ERROR:
        return {
            ...state,
            error:{
                flag:false,
                msg:null
            }            
        };
      default:
        return state;
    }
  };