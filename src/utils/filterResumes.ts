import {IResume} from "../models/IResume.ts";

export const filterResumes = (resumes: IResume[], filter: string) => {
    return resumes.filter(x => x.Name.toLowerCase().includes(filter.toLowerCase())
        || x.HardSkills.some(x => x.toLowerCase().includes(filter.toLowerCase()))
        || x.Companies.some(x => x.toLowerCase().includes(filter.toLowerCase()))
        || x.Specialization.toLowerCase().includes(filter.toLowerCase()))
}