export interface Candidate {
    id: string;
    candidateFullName: string;
    specialization: string;
    processedAt: string; // or you can use Date type if you will convert string to Date object
}