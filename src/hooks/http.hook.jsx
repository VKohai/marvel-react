import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/json' }
    ) => {
        setLoading(true);
        setProcess('loading');
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Couldn't fetch ${url}.\nStatus: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            setProcess('confirmed');
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setProcess('error');
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
        setProcess('loading');
    }, []);
    return { loading, error, request, clearError, process, setProcess };
}