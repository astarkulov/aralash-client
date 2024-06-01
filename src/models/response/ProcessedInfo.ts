interface Position {
    id: string;
    positionName: string;
    percent: number;
}

interface WorkExperience {
    id: string;
    positionName: string;
    workExperienceInMonth: number;
    startDate: string; // or Date if you will convert string to Date object
    endDate: string; // or Date if you will convert string to Date object
}

interface Company {
    id: string;
    companyName: string;
    positions: WorkExperience[];
}

interface HardSkill {
    hardSkillName: string;
}

export interface ProcessedInfo {
    id: string;
    candidateFullName: string;
    specialization: string;
    candidatePossiblePositions: Position[];
    previousCompanies: Company[];
    hardSkills: HardSkill[];
    processedAt: string; // or Date if you will convert string to Date object
}