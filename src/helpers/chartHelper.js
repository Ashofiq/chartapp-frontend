class ChartHelper{

    constructor(){

    }

    barChartDataProcess(data) {
        var pdArray = Object.values(data)[0]
        var seriesData = [];
        for (var key in pdArray) {
          seriesData.push({name: key, y: pdArray[key]})
        }
        return seriesData;
    }
}

export default ChartHelper