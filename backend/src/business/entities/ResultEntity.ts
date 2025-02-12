export default class ResultEntity {
    mainResult!: number;
    matchedMainNumbers!: [string, boolean];
    symboleMatched: boolean = false;
    symbole1Matched: boolean = false;
    matchedSpecialSymboles!: [string, boolean];
}