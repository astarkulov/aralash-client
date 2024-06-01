export interface RankingCriteria {
    id: string;
    stackEvaluate: number;
    rankingCriteriaTemplateId: string;
    rankingCriteriaTemplateName: string;
    evaluateDate: string; // В формате ISO строки
}