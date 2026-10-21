export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) { super(message); this.status = status; }
}
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
export function apiUrl(url: string) { return `${apiBaseUrl}${url}`; }
async function getErrorMessage(response: Response) {
    const text = await response.text();
    if (!text) return "Die Anfrage ist fehlgeschlagen (" + response.status + ").";
    try { const data = JSON.parse(text); if (typeof data === "string") return data; if (data.title) return data.title; if (data.errors) return Object.values(data.errors).flat().join(" "); } catch { /* plain text */ }
    return text;
}
export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
    let response: Response;
    try { response = await fetch(apiUrl(url), options); } catch { throw new ApiError("Der Server ist nicht erreichbar.", 0); }
    if (!response.ok) throw new ApiError(await getErrorMessage(response), response.status);
    if (response.status === 204) return undefined as T;
    return await response.json() as T;
}
