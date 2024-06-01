export interface StackRankingCriterion {
    hardSkillId: string;
    priority: number;
}

export interface SpecializationRankingCriterion {
    specializationId: string;
    priority: number;
}

export interface Ranking {
    id?: string,
    templateName: string
    stackRankingCriteria: StackRankingCriterion[];
    specializationRankingCriteria: SpecializationRankingCriterion[];
}