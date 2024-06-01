import {useParams} from "react-router-dom";
import {useGetProcessedInfoQuery} from "../../store/api/processedResumeApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import cl from './Profile.module.scss'
import {format} from "date-fns";
import {convertMonthsToYearsAndMonths} from "../../utils/convertMonthsToYearsAndMonths.ts";
import {LineChart} from "@mui/x-charts";
import {useGetCareerPointsMutation, useGetEvaluateResumeMutation} from "../../store/api/cvAnalyseApi.ts";
import {useEffect} from "react";

const Profile = () => {
    const {id} = useParams();
    const [getCareerPoints, {data: careerPoints, isLoading: careerPointsLoading}] = useGetCareerPointsMutation();
    const {data: processedInfo, isLoading: processedInfoLoading} = useGetProcessedInfoQuery(id!);
    const [getEvaluate, {isLoading: evaluateLoading, data: evaluateData}] = useGetEvaluateResumeMutation();

    useEffect(() => {
        if (processedInfo) {
            getCareerPoints(processedInfo.id)
            getEvaluate(processedInfo.id)
        }
    }, [processedInfo])

    if (processedInfoLoading || careerPointsLoading || evaluateLoading) {
        return <Loader/>
    }

    return (
        <>
            {
                processedInfo
                    ?
                    <div className={cl.profile}>
                        <h1>{processedInfo.candidateFullName}</h1>
                        <h2>Специализация: {processedInfo.specialization}</h2>
                        <p>ProcessedAt: {format(processedInfo.processedAt, 'yyyy-MM-dd HH:mm:ss')}</p>
                        <p>Предпологаемые позиции: <div
                            className={cl.flexContainer}>{processedInfo.candidatePossiblePositions.map((item, index) => (
                            <div key={index} className={cl.item}>{item.positionName} {item.percent}%</div>
                        ))}</div></p>
                        <p>HardSkills: <div className={cl.flexContainer}>
                            {processedInfo.hardSkills.map((item, index) => (
                                <div key={index} className={cl.item}>{item.hardSkillName}</div>
                            ))}
                        </div></p>
                        <div>
                            {
                                processedInfo.previousCompanies.map((item, index) => (
                                    <div key={index} className={cl.item}>
                                        <h1>Наименование компании: {item.companyName}</h1>
                                        <div>
                                            {item.positions.map((item, index) => (
                                                <div key={index} className={cl.item}>
                                                    <p>
                                                        {item.positionName} - {convertMonthsToYearsAndMonths(item.workExperienceInMonth)}
                                                    </p>
                                                    <p>
                                                        {item.startDate ? format(item.startDate, 'yyyy-MM-dd') : null} - {format(item.endDate ? item.endDate : Date.now(), 'yyyy-MM-dd')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            careerPoints
                                ? <div>
                                    <p>{formatCompanyChangeDays(careerPoints.companyChangingFrequencyInDays)}</p>
                                    <LineChart
                                        xAxis={[{data: careerPoints.points.map(x => x.x)}]}
                                        series={[
                                            {
                                                data: careerPoints.points.map(x => x.y),
                                            },
                                        ]}
                                        width={500}
                                        height={300}
                                    />
                                </div>
                                : null
                        }
                        {
                            evaluateData
                            ? <h1>Оценка профиля {evaluateData.stackEvaluate}/100</h1>
                            : null
                        }
                    </div>
                    : null
            }
        </>
    );
};

export default Profile;

const formatCompanyChangeDays = (days: number) => {
    if (days < 222) return 'Кандидат вызывает сомнение'
    else if (222 < days && days < 300) return 'Сомнительно, но окэй'
    else return 'Кандидат не часто меняет места работы.'
}