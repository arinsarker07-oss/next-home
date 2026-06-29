import { protectedFetch, serverFetch } from "../core/server"

export const PropertyDetailId = async(id)=>{
    return protectedFetch(`/properties/${id}`)
}