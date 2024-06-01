export const convertMonthsToYearsAndMonths = (totalMonths: number): string => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years}г. ${months}м.`;
};