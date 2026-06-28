import { serverFetch } from "../core/server"

export const getAllUsers = ()=>{
    return serverFetch("/allusers")
}