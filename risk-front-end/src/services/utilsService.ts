

export function unionArrays(a: any[], b: any[]): any[] {
    const cache: any = {};

    a.forEach(item => cache[item] = item);
    b.forEach(item => cache[item] = item);

    return Object.keys(cache).map(key => cache[key]);
}

export function convertImageNameToPath(imageName:string) {
    return `/avatar/${imageName}.png`
}