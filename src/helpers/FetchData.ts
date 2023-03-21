const wait  = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData
    = async (key: string) => {
    const data = localStorage.getItem(key) || '';
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

export const removeItem = async (key: string) => {
    localStorage.removeItem(key);
}

export const saveData = async (key: string, data: any) => {
    await wait(700)
    localStorage.setItem(key, JSON.stringify(data));
}