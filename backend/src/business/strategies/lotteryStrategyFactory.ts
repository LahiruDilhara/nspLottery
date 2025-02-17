import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import _ from "lodash"

export default class LotteryStrategyFactory {

    static lotteryStrategies: { name: string, strategy: ILotteryStrategy }[] = []

    static getLotteryStrategy(strategyName: string): ILotteryStrategy | null {
        let index = _.findIndex(this.lotteryStrategies, strategy => strategy.name === strategyName);
        if (index === -1) return null;
        return this.lotteryStrategies[index].strategy;
    }

    static registerLotteryStrategy(name: string, strategy: ILotteryStrategy) {
        let index = _.findIndex(this.lotteryStrategies, strategy => strategy.name === name);
        if (index != -1) return;
        this.lotteryStrategies.push({ name, strategy });
    }

    static registerLotterStrategies(strategies: { name: string, strategy: ILotteryStrategy }[]) {
        strategies.forEach(strategy => this.registerLotteryStrategy(strategy.name, strategy.strategy));
    }

    static unRegisterLotterStrategy(name: string) {
        let index = _.findIndex(this.lotteryStrategies, strategy => strategy.name === name);
        if (index === -1) return;
        _.pullAt(this.lotteryStrategies, index);
    }
}