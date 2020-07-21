import React,{ useEffect } from 'react';
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarTypes } from "../actions/cartypeactions";
import { fetchBookings } from "../actions/bookingactions";
import { fetchPromos } from "../actions/promoactions";
import { fetchDriver } from "../actions/driverearningaction";
import { fetchUsers } from "../actions/usersactions";
import { fetchBonus } from "../actions/referralactions";
import { fetchCommissionBonus } from "../actions/commissionactions";
import { fetchNotifications } from "../actions/notificationactions";
import {fetchEarningreports} from "../actions/earningreportsaction"
function AuthLoading(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(()=>{
        if(auth.info){
            dispatch(fetchUsers());
            dispatch(fetchBookings());
            dispatch(fetchCarTypes());
            dispatch(fetchPromos());
            dispatch(fetchDriver());
            dispatch(fetchBonus());
            dispatch(fetchCommissionBonus());
            dispatch(fetchNotifications());
            dispatch(fetchEarningreports())
        }

    },[auth.info,dispatch]);

    return (
        auth.loading? <CircularLoading/>:props.children
    )
}

export default AuthLoading;