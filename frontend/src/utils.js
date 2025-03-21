export function getdefaultImage(random, width, height, index) {
    if (random) {
        return `https://picsum.photos/${width}/${height}?random${index}`;
    }
    return `./ARZ_logo.jpg`;
}

export function getdefaultImages(n, random, width, height) {
    return Array.from({ length: n }, (_, i) => getdefaultImage(random, width, height, i + 1));
}