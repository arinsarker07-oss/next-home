"use server"

import { serverMutation } from "../core/server"

export const AddProperty = async(AddPropertyData)=>{
    return serverMutation("/owner/add-property",AddPropertyData)
}