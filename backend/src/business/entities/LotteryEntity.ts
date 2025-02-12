export default class LotteryEnitity {
    name!: string;
    drawNo!: string;
    date!: Date;
    barCode!: string;
    symbole?: string;
    symbole1?: string;
    numbers: string[] = [];
    specialSymboles: string[] = [];
}