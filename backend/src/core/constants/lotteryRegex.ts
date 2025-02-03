import ILotteryStrategy from '../../interfaces/ILotteryStrategy';
import AdaKotipathiStrategy from '../lotteryStrategies/adaKotipathi';
import AdaSampathaStrategy from '../lotteryStrategies/adaSampatha';
import DhanaNidhanayaStrategy from '../lotteryStrategies/dhanaNidhanaya';
import GovisethaStrategy from '../lotteryStrategies/govisetha';
import HadahanaStrategy from '../lotteryStrategies/hadahana';
import JayaStrategy from '../lotteryStrategies/jaya';
import KaprukaStrategy from '../lotteryStrategies/Kapruka';
import LagnaWasanaStrategy from '../lotteryStrategies/lagnaWasana';
import MahajanaStrategy from '../lotteryStrategies/mahajana';
import MegaPowerStrategy from '../lotteryStrategies/megaPower';
import SasiriStrategy from '../lotteryStrategies/sasiri';
import ShanidaStrategy from '../lotteryStrategies/shanida';
import superBallStrategy from '../lotteryStrategies/superBall';
import SupiriDhanaSampathaStrategy from '../lotteryStrategies/supiriDhanaSampatha';


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