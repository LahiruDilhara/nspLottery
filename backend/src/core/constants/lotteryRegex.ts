import ILotteryStrategy from '../../interfaces/ILotteryStrategy';
import AdaKotipathiStrategy from '../../strategies/adaKotipathiStrategy';
import AdaSampathaStrategy from '../../strategies/adaSampathaStrategy';
import DhanaNidhanayaStrategy from '../../strategies/dhanaNidhanayaStrategy';
import GovisethaStrategy from '../../strategies/govisethaStrategy';
import HadahanaStrategy from '../../strategies/hadahanaStrategy';
import JayaStrategy from '../../strategies/jayaStrategy';
import KaprukaStrategy from '../../strategies/kaprukaStrategy';
import LagnaWasanaStrategy from '../../strategies/lagnaWasanaStrategy';
import MahajanaStrategy from '../../strategies/mahajanaStrategy';
import MegaPowerStrategy from '../../strategies/megaPower';
import SasiriStrategy from '../../strategies/sasiriStrategy';
import ShanidaStrategy from '../../strategies/shanidaStrategy';
import superBallStrategy from '../../strategies/superBallStrategy';
import SupiriDhanaSampathaStrategy from '../../strategies/supiriDhanaSampathaStrategy';


export class LotteryRegexType {
    strategy: ILotteryStrategy;
    regex: RegExp;
    constructor(strategy: ILotteryStrategy, regex: RegExp) {
        this.strategy = strategy;
        this.regex = regex;
    }
}
let LotteryRegex: LotteryRegexType[] = [
    new LotteryRegexType(new AdaSampathaStrategy(), /^Ada\s+Sampatha\s+\d+\s+(\d{2}\.){2}\d{4}\s+\d{15}\s+[A-Z](\s+(\d{2,4})){3}/g),
    new LotteryRegexType(new JayaStrategy(), /^JAYODA\s+\w+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
    new LotteryRegexType(new SupiriDhanaSampathaStrategy(), /^\d+\s+\d{4}(\.\d+)+\s+\d+\/\d+\/\d+\/\d+\s+\w(\s+\d{1}){6}/g),
    new LotteryRegexType(new KaprukaStrategy(), /^KAPRUKA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]\s+\d{2}/g),
    new LotteryRegexType(new superBallStrategy(), /^SUPER\s+BALL\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
    new LotteryRegexType(new HadahanaStrategy(), /^Handaha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Za-z]+(\s+\d{2}){4}/g),
    new LotteryRegexType(new DhanaNidhanayaStrategy(), /^Dhana\s+Nidhanaya\s+\d*\s+[A-Z](\s+\d{2}){4}\s+[A-Z]/g),
    new LotteryRegexType(new MegaPowerStrategy(), /^Mega\s+Power\s+\d+\s+[A-Z](\s+\d{2}){5}\s+\d{4}&\d{2}&\d{2}\s+\d{15}/g),
    new LotteryRegexType(new MahajanaStrategy(), /^Mahajana\s+Sampatha\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z]\s+\d{6}/g),
    new LotteryRegexType(new GovisethaStrategy(), /^Govi\s+Setha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Z](\s+\d{2}){4}/g),
    new LotteryRegexType(new AdaKotipathiStrategy(), /^ADA\s+KOTIPATHI\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
    new LotteryRegexType(new LagnaWasanaStrategy(), /^LAGNA\s+WASANA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Za-z]+/g),
    new LotteryRegexType(new ShanidaStrategy(), /^\d+\s+\d{4}\.\d{2}\.\d{2}\s+[\d\/]+\s+[A-Za-z](\s+\d{2}){4}/g),
    new LotteryRegexType(new JayaStrategy(), /^NLB\s+Dinuma\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z](\s+\d){4}/g),
    new LotteryRegexType(new SasiriStrategy(), /^\d+\s+\d{4}.\d{2}.\d{2}\s+[\d\/]+(\s+\d{2}){3}/g),
];

export default LotteryRegex;