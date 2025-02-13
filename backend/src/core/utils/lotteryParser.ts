export default class LotteryParser {

    static parseDate(dataString: string): Date | null {
        let dateRegex1 = /\d{2}\.\d{2}\.\d{4}/
        let dateRegex2 = /\d{4}&\d{2}&\d{2}/
        let dateRegex4 = /\d{4}\.\d{2}\.\d{2}/

        let day: string;
        let month: string;
        let year: string;

        if (dateRegex1.test(dataString)) {
            let date = dataString.match(dateRegex1);
            if (date == null) return null;
            [day, month, year] = date[0].split(".");
        }
        else if (dateRegex2.test(dataString)) {
            let date = dataString.match(dateRegex2);
            if (date == null) return null;
            [day, month, year] = date[0].split(".");
        }
        else if (dateRegex4.test(dataString)) {
            let date = dataString.match(dateRegex4);
            if (date == null) return null;
            [day, month, year] = date[0].split(".");
        }
        else {
            return null;
        }
        let formattedDate = `${year}-${month}-${day}`;
        return new Date(formattedDate);
    }
}