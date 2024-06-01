interface HardSkill {
    id: string;
    name: string;
}

interface Specialization {
    id: string;
    name: string;
}

interface StackRankingCriteria {
    id: string;
    hardSkill: HardSkill;
    priority: number;
}

interface SpecializationRankingCriteria {
    id: string;
    specialization: Specialization;
    priority: number;
}

export interface Template {
    id: string;
    templateName: string;
    stackRankingCriteria: StackRankingCriteria[];
    specializationRankingCriteria: SpecializationRankingCriteria[];
}