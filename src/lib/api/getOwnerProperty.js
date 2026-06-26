import { serverFetch } from "../core/server"

export const getOwnerProperty=(ownerEmail)=>{
    return serverFetch(`/dashboard/owner?ownerEmail=${ownerEmail}`)
}