export const getAllProperty = async ({ search = '', type = '', sort = '' }) => {
    try {
        // আপনার ব্যাকএন্ডের ইউআরএল অনুযায়ী কুয়েরি পাঠানো হচ্ছে
        const res = await fetch(
            `http://localhost:5000/properties?search=${search}&type=${type}&sort=${sort}`, 
            { cache: 'no-store' } // রিয়েল-টাইম ডাটার জন্য ক্যাশ অফ রাখা ভালো
        );
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};