export interface CareerPoints {
    points: Point[];
    companyChangingFrequencyInDays: number;
}

interface Point {
    x: number;
    y: number;
    timeInDays: number;
}