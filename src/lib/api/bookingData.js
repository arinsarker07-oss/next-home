import { protectedFetch, serverFetch } from "../core/server"

export const getBookingUserData=(tenantId)=>{
    return protectedFetch(`/booking/data?tenantId=${tenantId}`)
}

export const getBookingAllData = ()=>{
    return protectedFetch("/all/booking")
}