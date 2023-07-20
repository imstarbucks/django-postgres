const useFetch = async (slug: string, params: string = "") => {
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${slug}/${params}`;
    console.log(API_ENDPOINT);
    const res = await fetch(`${API_ENDPOINT}`, {
        cache: "no-cache",
        headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
    });

    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error Occur During Fetch: ${error}`);
        return res;
    }
};

export default useFetch;
