const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // return handleStatusCode(res);
    return res.json()
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    // return handleStatusCode(res);
    return res.json()
}

// const handleStatusCode = res => {
//     if (res.status === 401) {
//         redirect('/unauthorized')
//     }
//     else if (res.status === 403) {
//         redirect('/forbidden');
//     }

//     return res.json()
// }