import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import AdaKotipathiStrategy from "./adaKotipathiStrategy";
import AdaSampathaStrategy from "./adaSampathaStrategy";
import DhanaNidhanayaStrategy from "./dhanaNidhanayaStrategy";
import GovisethaStrategy from "./govisethaStrategy";
import HadahanaStrategy from "./hadahanaStrategy";
import JayaStrategy from "./jayaStrategy";
import JayodhaStrategy from "./jayodhaStrategy";
import KaprukaStrategy from "./kaprukaStrategy";
import LagnaWasanaStrategy from "./lagnaWasanaStrategy";
import MahajanaStrategy from "./mahajanaStrategy";
import MegaPowerStrategy from "./megaPower";
import SasiriStrategy from "./sasiriStrategy";
import ShanidaStrategy from "./shanidaStrategy";
import superBallStrategy from "./superBallStrategy";
import SupiriDhanaSampathaStrategy from "./supiriDhanaSampathaStrategy";

export default class LotteryStrategyFactory {
    static getLotteryStrategy(lotteryName: string): ILotteryStrategy | null {
        switch (lotteryName) {
            case "AdaKotipathi":
                return new AdaKotipathiStrategy();
            case "DhanaNidhanaya":
                return new DhanaNidhanayaStrategy();
            case "Hadahana":
                return new HadahanaStrategy();
            case "Jayodha":
                return new JayodhaStrategy();
            case "LagnaWasana":
                return new LagnaWasanaStrategy();
            case "Mahajana":
                return new MahajanaStrategy();
            case "Sasiri":
                return new SasiriStrategy();
            case "SuperBall":
                return new superBallStrategy();
            case "AdaSampatha":
                return new AdaSampathaStrategy();
            case "Govisetha":
                return new GovisethaStrategy();
            case "Jaya":
                return new JayaStrategy();
            case "Kapruka":
                return new KaprukaStrategy();
            case "MegaPower":
                return new MegaPowerStrategy();
            case "Shanida":
                return new ShanidaStrategy();
            case "SupiriDhanaSampatha":
                return new SupiriDhanaSampathaStrategy();
            default:
                return null;
        }
    }
}