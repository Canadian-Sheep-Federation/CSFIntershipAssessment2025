interface CataasResponse {
    id: string;
    tags: string[];
    created_at: string;
    url: string;
    mimetype: string;
}

const endpoint_url = "https://cataas.com/cat/says/Hello?json=true"

export const getCat = async (): Promise<CataasResponse> => {
    const response = await fetch(endpoint_url)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json()
}