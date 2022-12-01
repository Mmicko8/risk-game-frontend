

export function getMaxTroopsFromTroopCount(troopCount: number) {
    if (troopCount === 2) return 1;
    if (troopCount === 3) return 2;
    return 3;
}