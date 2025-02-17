import AdaKotipathiStrategy from "./strategies/adaKotipathiStrategy";
import AdaSampathaStrategy from "./strategies/adaSampathaStrategy";
import DhanaNidhanayaStrategy from "./strategies/dhanaNidhanayaStrategy";
import GovisethaStrategy from "./strategies/govisethaStrategy";
import HadahanaStrategy from "./strategies/hadahanaStrategy";
import JayaStrategy from "./strategies/jayaStrategy";
import KaprukaStrategy from "./strategies/kaprukaStrategy";
import LagnaWasanaStrategy from "./strategies/lagnaWasanaStrategy";
import LotteryStrategyFactory from "./strategies/lotteryStrategyFactory";
import MahajanaStrategy from "./strategies/mahajanaStrategy";
import MegaPowerStrategy from "./strategies/megaPower";
import SasiriStrategy from "./strategies/sasiriStrategy";
import ShanidaStrategy from "./strategies/shanidaStrategy";
import superBallStrategy from "./strategies/superBallStrategy";
import SupiriDhanaSampathaStrategy from "./strategies/supiriDhanaSampathaStrategy";

export default function init() {
    LotteryStrategyFactory.registerLotterStrategies([
        { name: "AdaKotipathi", strategy: new AdaKotipathiStrategy() },
        { name: "DhanaNidhanaya", strategy: new DhanaNidhanayaStrategy() },
        { name: "Hadahana", strategy: new HadahanaStrategy() },
        { name: "Jayodha", strategy: new JayaStrategy() },
        { name: "LagnaWasana", strategy: new LagnaWasanaStrategy() },
        { name: "Mahajana", strategy: new MahajanaStrategy() },
        { name: "Sasiri", strategy: new SasiriStrategy() },
        { name: "SuperBall", strategy: new superBallStrategy() },
        { name: "AdaSampatha", strategy: new AdaSampathaStrategy() },
        { name: "Govisetha", strategy: new GovisethaStrategy() },
        { name: "Jaya", strategy: new JayaStrategy() },
        { name: "Kapruka", strategy: new KaprukaStrategy() },
        { name: "MegaPower", strategy: new MegaPowerStrategy() },
        { name: "Shanida", strategy: new ShanidaStrategy() },
        { name: "SupiriDhanaSampatha", strategy: new SupiriDhanaSampathaStrategy() },
    ])
}