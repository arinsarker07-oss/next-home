import { serverFetch } from "../core/server"

export const getBookingUserData=(tenantId)=>{
    return serverFetch(`/booking/data?tenantId=${tenantId}`)
}

export const getBookingAllData = ()=>{
    return serverFetch("/all/booking")
}