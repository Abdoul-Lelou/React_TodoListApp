let myUrl = import.meta.env.VITE_API_URL as string

const urlFn = () => {
    return myUrl
};

export const url = urlFn();