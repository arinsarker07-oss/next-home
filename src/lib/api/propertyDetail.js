import { serverFetch } from "../core/server"

export const PropertyDetailId = async(id)=>{
    return serverFetch(`/properties/${id}`)
}