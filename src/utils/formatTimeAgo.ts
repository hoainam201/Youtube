const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "always",
})

const DIVISION: {
    amount: number,
    name: Intl.RelativeTimeFormatUnit
}[] = [
    {amount: 60, name: "seconds"},
    {amount: 60, name: "minutes"},
    {amount: 24, name: "hours"},
    {amount: 7, name: "days"},
    {amount: 4.34524, name: "weeks"},
    {amount: 12, name: "months"},
    {amount: Number.POSITIVE_INFINITY, name: "years"},
];

export function formatTimeAgo(date: Date){
    let duration = (date.getTime() - new Date().getTime()) / 1000
    for(let {amount, name} of DIVISION){
        if(Math.abs(duration) < amount){
            return formatter.format(Math.round(duration), name);
        }
        duration /= amount;
    }
}