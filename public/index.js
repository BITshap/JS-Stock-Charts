async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
   // const averagePriceChartCanvas = document.querySelector('#average-price-chart');

   /* let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=bd1caafa94e04ac28046c75850583d3c')
    let responseJSON = await response.json()
    console.log(responseJSON)

    let GME = result.GME
    let MSFT = result.MSFT
    let DIS = result.DIS
    let BTNX = result.BTNX
    const stocks = [GME, MSFT, DIS, BTNX]; */

 const { GME, MSFT, DIS, BNTX } = mockData;

 const stocks = [GME, MSFT, DIS, BNTX];

stocks.forEach (stock => stock.values.reverse())
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'High',
                data: stocks.map(stock => (highestValue(stock.values))),
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol))),
            }]
        }
    });

    function highestValue(values) {
        let high = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > high) {
                high = value.high
            }
        })
        return high
    }

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
}

main()