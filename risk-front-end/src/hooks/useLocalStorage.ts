import localForage from "localforage";
import {useEffect, useState} from "react";

export default function useLocalStorage(key: string) {
    const [value, setValue] = useState<any>(false);

    useEffect(() => {
        const getValue = async () => {
            const storageValue = await localForage.getItem(key);
            console.log("Current value from storage: ", storageValue);
            setValue(storageValue);
        };
        getValue();
    }, [key]);

    const setter = (newValue: any) => {
        if (newValue !== value) {
            localForage.setItem(key, newValue);
            setValue(newValue);
        }
    };

    const remove = () => {
        localForage.removeItem(key);
        setValue(null);
    };

    return [value, setter, remove];
}
