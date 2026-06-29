import { protectedFetch, serverFetch } from "../core/server"

export const getOwnerProperty=(ownerEmail)=>{
    return protectedFetch(`/dashboard/owner?ownerEmail=${ownerEmail}`)
}