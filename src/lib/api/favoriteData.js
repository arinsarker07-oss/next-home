import { protectedFetch, serverFetch } from "../core/server"

export const getFavoriteData=(tenantId)=>{
    return protectedFetch(`/favouriteproperty?tenantId=${tenantId}`)
}