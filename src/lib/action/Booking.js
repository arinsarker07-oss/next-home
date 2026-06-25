import { serverMutation } from "../core/server"

export const BookingData = (data)=>{
   return serverMutation ("/booking",data)
}