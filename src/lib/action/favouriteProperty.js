import { serverMutation } from "../core/server";


// ফেভারিট অ্যাড করার জন্য
export const FavoriteProperty = (data) => {
    return serverMutation("/favouriteproperty", data);
}

// ফেভারিট রিমুভ করার জন্য (কুয়েরি স্ট্রিং দিয়ে মেথড হ্যান্ডেল করা হচ্ছে)
export const UnfavoriteProperty = (propertyId, tenantId) => {
    // তোমার serverMutation যদি DELETE রিকোয়েস্ট সাপোর্ট না করে, তবে সরাসরি fetch() ও মারতে পারো
    return fetch(`http://localhost:5000/favouriteproperty?propertyId=${propertyId}&tenantId=${tenantId}`, {
        method: "DELETE",
    }).then(res => res.json());
}