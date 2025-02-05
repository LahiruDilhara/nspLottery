class ResultDto {
    constructor(
        public lotteryName: string,
        public drawDate: Date,
        public drawNumber: number,
    ) { }
}

export default ResultDto;