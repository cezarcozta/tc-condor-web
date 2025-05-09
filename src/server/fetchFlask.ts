/* eslint-disable @typescript-eslint/no-explicit-any */
'server-only'

interface IFetch {
    endpoint: string;
    method: 'POST' | 'PUT' | 'GET'
}

export default async function fetchFlask({endpoint, method}:IFetch){
    try {
        const response = await fetch(endpoint, { method });
        const isOk = response.ok;
        if(isOk){
            const json = await response.json();
            return json
        }
        return response.statusText;
    } catch (error: any) {
        throw new Error(error);
    }
}