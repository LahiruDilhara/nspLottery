export default interface IResultRepository {
    getLotteryIdentifierScemeList(date: Date): { name: string; regex: RegExp }[] | null;
}