import LotteryEnum from "../../core/enums/lotteryEnum";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import AdaKotipathiStrategy from "./adaKotipathiStrategy";
import AdaSampathaStrategy from "./adaSampathaStrategy";
import DhanaNidhanayaStrategy from "./dhanaNidhanayaStrategy";
import GovisethaStrategy from "./govisethaStrategy";
import HadahanaStrategy from "./hadahanaStrategy";
import JayaStrategy from "./jayaStrategy";
import KaprukaStrategy from "./kaprukaStrategy";
import LagnaWasanaStrategy from "./lagnaWasanaStrategy";
import MahajanaStrategy from "./mahajanaStrategy";
import MegaPowerStrategy from "./megaPower";
import SasiriStrategy from "./sasiriStrategy";
import ShanidaStrategy from "./shanidaStrategy";
import superBallStrategy from "./superBallStrategy";
import SupiriDhanaSampathaStrategy from "./supiriDhanaSampathaStrategy";

export default class LotteryStrategyFactory {
    static getLotteryStrategy(lotteryType: LotteryEnum): ILotteryStrategy | null {
        switch (lotteryType) {
            case LotteryEnum.ADA_KOTIPATHI:
                return new AdaKotipathiStrategy();
            case LotteryEnum.DHANA_NIDHANAYA:
                return new DhanaNidhanayaStrategy();
            case LotteryEnum.HADAHANA:
                return new HadahanaStrategy();
            case LotteryEnum.JAYODHA:
                return new JayaStrategy();
            case LotteryEnum.LAGNA_WASANA:
                return new LagnaWasanaStrategy();
            case LotteryEnum.MAHAJANA:
                return new MahajanaStrategy();
            case LotteryEnum.SASIRI:
                return new SasiriStrategy();
            case LotteryEnum.SUPER_BALL:
                return new superBallStrategy();
            case LotteryEnum.ADA_SAMPATHA:
                return new AdaSampathaStrategy();
            case LotteryEnum.GOVISETHA:
                return new GovisethaStrategy();
            case LotteryEnum.JAYA:
                return new JayaStrategy();
            case LotteryEnum.KAPRUKA:
                return new KaprukaStrategy();
            case LotteryEnum.MEGA_POWER:
                return new MegaPowerStrategy();
            case LotteryEnum.SHANIDA:
                return new ShanidaStrategy();
            case LotteryEnum.SUPIRI_DHANA_SAMPATHA:
                return new SupiriDhanaSampathaStrategy();
            default:
                return null;
        }
    }
}