import { protectedFetch, serverFetch } from "../core/server";

export const getAllProperty = async ({ search = '', type = '', sort = '' }) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/properties?search=${search}&type=${type}&sort=${sort}`, 
            { cache: 'no-store' } 
        );
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const AllProperty = async()=>{
    return serverFetch("/properties")
}

export const  TotalProperty = async()=> {
    return protectedFetch("/all/property")
}