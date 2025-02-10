
// export class LotteryRegexType {
//     strategy: ILotteryStrategy;
//     regex: RegExp;
//     constructor(strategy: ILotteryStrategy, regex: RegExp) {
//         this.strategy = strategy;
//         this.regex = regex;
//     }
// }
// let LotteryRegex: LotteryRegexType[] = [
//     new LotteryRegexType(new AdaSampathaStrategy(), /^Ada\s+Sampatha\s+\d+\s+(\d{2}\.){2}\d{4}\s+\d{15}\s+[A-Z](\s+(\d{2,4})){3}/g),
//     new LotteryRegexType(new JayaStrategy(), /^JAYODA\s+\w+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
//     new LotteryRegexType(new SupiriDhanaSampathaStrategy(), /^\d+\s+\d{4}(\.\d+)+\s+\d+\/\d+\/\d+\/\d+\s+\w(\s+\d{1}){6}/g),
//     new LotteryRegexType(new KaprukaStrategy(), /^KAPRUKA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]\s+\d{2}/g),
//     new LotteryRegexType(new superBallStrategy(), /^SUPER\s+BALL\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
//     new LotteryRegexType(new HadahanaStrategy(), /^Handaha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Za-z]+(\s+\d{2}){4}/g),
//     new LotteryRegexType(new DhanaNidhanayaStrategy(), /^Dhana\s+Nidhanaya\s+\d*\s+[A-Z](\s+\d{2}){4}\s+[A-Z]/g),
//     new LotteryRegexType(new MegaPowerStrategy(), /^Mega\s+Power\s+\d+\s+[A-Z](\s+\d{2}){5}\s+\d{4}&\d{2}&\d{2}\s+\d{15}/g),
//     new LotteryRegexType(new MahajanaStrategy(), /^Mahajana\s+Sampatha\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z]\s+\d{6}/g),
//     new LotteryRegexType(new GovisethaStrategy(), /^Govi\s+Setha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Z](\s+\d{2}){4}/g),
//     new LotteryRegexType(new AdaKotipathiStrategy(), /^ADA\s+KOTIPATHI\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g),
//     new LotteryRegexType(new LagnaWasanaStrategy(), /^LAGNA\s+WASANA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Za-z]+/g),
//     new LotteryRegexType(new ShanidaStrategy(), /^\d+\s+\d{4}\.\d{2}\.\d{2}\s+[\d\/]+\s+[A-Za-z](\s+\d{2}){4}/g),
//     new LotteryRegexType(new JayaStrategy(), /^NLB\s+Dinuma\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z](\s+\d){4}/g),
//     new LotteryRegexType(new SasiriStrategy(), /^\d+\s+\d{4}.\d{2}.\d{2}\s+[\d\/]+(\s+\d{2}){3}/g),
// ];

import LotteryEnum from "../enums/lotteryEnum";


const AdaSampathaRegex = /^Ada\s+Sampatha\s+\d+\s+(\d{2}\.){2}\d{4}\s+\d{15}\s+[A-Z](\s+(\d{2,4})){3}/g;
const JayodhaRegex = /^JAYODA\s+\w+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g;
const SupiriDhanaSampathaRegex = /^\d+\s+\d{4}(\.\d+)+\s+\d+\/\d+\/\d+\/\d+\s+\w(\s+\d{1}){6}/g;
const KaprukaRegex = /^KAPRUKA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]\s+\d{2}/g;
const superBallRegex = /^SUPER\s+BALL\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g;
const HadahanaRegex = /^Handaha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Za-z]+(\s+\d{2}){4}/g;
const DhanaNidhanayaRegex = /^Dhana\s+Nidhanaya\s+\d*\s+[A-Z](\s+\d{2}){4}\s+[A-Z]/g;
const MegaPowerRegex = /^Mega\s+Power\s+\d+\s+[A-Z](\s+\d{2}){5}\s+\d{4}&\d{2}&\d{2}\s+\d{15}/g;
const MahajanaRegex = /^Mahajana\s+Sampatha\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z]\s+\d{6}/g;
const GovisethaRegex = /^Govi\s+Setha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Z](\s+\d{2}){4}/g;
const AdaKotipathiRegex = /^ADA\s+KOTIPATHI\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/g;
const LagnaWasanaRegex = /^LAGNA\s+WASANA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Za-z]+/g;
const ShanidaRegex = /^\d+\s+\d{4}\.\d{2}\.\d{2}\s+[\d\/]+\s+[A-Za-z](\s+\d{2}){4}/g;
const JayaRegex = /^NLB\s+Dinuma\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z](\s+\d){4}/g;
const SasiriRegex = /^\d+\s+\d{4}.\d{2}.\d{2}\s+[\d\/]+(\s+\d{2}){3}/g;


const LotteryRegex = new Map<LotteryEnum, RegExp>();

LotteryRegex.set(LotteryEnum.ADA_SAMPATHA, AdaSampathaRegex);
LotteryRegex.set(LotteryEnum.JAYODHA, JayodhaRegex);
LotteryRegex.set(LotteryEnum.SUPIRI_DHANA_SAMPATHA, SupiriDhanaSampathaRegex);
LotteryRegex.set(LotteryEnum.KAPRUKA, KaprukaRegex);
LotteryRegex.set(LotteryEnum.SUPER_BALL, superBallRegex);
LotteryRegex.set(LotteryEnum.HADAHANA, HadahanaRegex);
LotteryRegex.set(LotteryEnum.DHANA_NIDHANAYA, DhanaNidhanayaRegex);
LotteryRegex.set(LotteryEnum.MEGA_POWER, MegaPowerRegex);
LotteryRegex.set(LotteryEnum.MAHAJANA, MahajanaRegex);
LotteryRegex.set(LotteryEnum.GOVISETHA, GovisethaRegex);
LotteryRegex.set(LotteryEnum.ADA_KOTIPATHI, AdaKotipathiRegex);
LotteryRegex.set(LotteryEnum.LAGNA_WASANA, LagnaWasanaRegex);
LotteryRegex.set(LotteryEnum.SHANIDA, ShanidaRegex);
LotteryRegex.set(LotteryEnum.JAYA, JayaRegex);
LotteryRegex.set(LotteryEnum.SASIRI, SasiriRegex);

export default LotteryRegex;
