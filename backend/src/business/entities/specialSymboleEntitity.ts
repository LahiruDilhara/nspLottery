export default class SpecialSymboleEntity {
    index!: number;
    symbole!: string;
    gift!: string;

    static build(index: number, symbole: string, gift: string): SpecialSymboleEntity {
        let obj = new SpecialSymboleEntity();
        obj.index = index;
        obj.symbole = symbole;
        obj.gift = gift;

        return obj;
    }
}