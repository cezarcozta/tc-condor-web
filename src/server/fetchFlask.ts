'server-only'

interface IFetch {
    endpoint: string;
    method: 'POST' | 'PUT' | 'GET'
}

export default async function fetchFlask({ endpoint, method }: IFetch) {
    try {
        const URI = process.env.FLASKAPI_BASE_URL! + endpoint
        const response = await fetch(URI, { method, headers: { 'Content-type': 'application/json' } });
        console.log(`URI ${URI}`)
        const isOk = response.ok;
        if (isOk) {
            const json = await response.json();
            console.log({ json })
            return json
        }
        return response.statusText;
    } catch (error: unknown) {
        console.log({ error })
        const err = error as Error
        throw new Error(err.message);
    }
}