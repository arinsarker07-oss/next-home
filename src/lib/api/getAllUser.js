import { protectedFetch, serverFetch } from "../core/server"

export const getAllUsers = ()=>{
    return protectedFetch("/allusers")
}