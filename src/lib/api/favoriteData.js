import { serverFetch } from "../core/server"

export const getFavoriteData=(tenantId)=>{
    return serverFetch(`/favouriteproperty?tenantId=${tenantId}`)
}