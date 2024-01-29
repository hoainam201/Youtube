const LEADING_ZERO = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
});

export function formatDuration(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    if(hours > 0) {
        return `${LEADING_ZERO.format(hours)}:${LEADING_ZERO.format(minutes)}:${LEADING_ZERO.format(seconds)}`;
    } else {
        return `${LEADING_ZERO.format(minutes)}:${LEADING_ZERO.format(seconds)}`;
    }
}
