import ResultSheetEntity from "../entities/ResultSheetEntity";

export default interface IResultRepository {
    getLotteryIdentifierScemeList(date: Date): { name: string; regex: RegExp }[] | null;
    getResultScheet(lotteryName: string, date: Date): ResultSheetEntity;
}