import { serverMutation } from "../core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// for add favorite                  
export const FavoriteProperty = (data) => {
    return serverMutation("/favouriteproperty", data);
}

export const UnfavoriteProperty = (propertyId, tenantId) => {
    return fetch(`${baseUrl}/favouriteproperty?propertyId=${propertyId}&tenantId=${tenantId}`, {
        method: "DELETE",
    }).then(res => res.json());
}
export const BookedProperty = (propertyId, tenantId) => {
    return fetch(`${baseUrl}/BookedProperty?propertyId=${propertyId}&tenantId=${tenantId}`, {
        method: "DELETE",
    }).then(res => res.json());
}