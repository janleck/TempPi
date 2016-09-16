var ctx = $('#myChart').get(0).getContext('2d');
var barChartData = {
        labels: ["-","-","-","-","-","-","-","-","-","-","-","-","-","-",],
        datasets: [{
            label: 'Temp (DS)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            yAxisID: "y-axis-0",
            backgroundColor: 'rgb(249,78,35)',
            },
            {
            label: 'Humm (DS)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            yAxisID: "y-axis-1",
            backgroundColor: 'rgba(21,65,118,0.85)',
            }
        ],
    };
var options = {
    showAllTooltips: false, // <<<<<<< DEAKTIVIERT !
    tooltips: {
        mode: 'dataset',
        titleSpacing: 0,
        titleFontSize: 0,
        bodyFontColor: "#fff",
        bodyFontStyle: "bold",
        bodyFontSize: 20,
        footerMarginTop: 0,
        footerFontSize: 6,
        caretSize: 5,
        backgroundColor : 'rgba(1,1,1,.5)',
        yPadding: 6,
        xPadding: 8,
        callbacks: {
            label: function(tooltipItems, data) {
                if (tooltipItems.index == 13) {
                    var a = tooltipItems.datasetIndex ? "%" : "°C";
                    return tooltipItems.yLabel+a;
                } else {
                    return "";
                }
                
            },
            title: function(tooltipItem, data){return "";},
            footer: function(tooltipItem){return " ";}
        }
    },
    scales: {
        yAxes: [{
            ticks: {beginAtZero:true,},
            id: "y-axis-0",
            gridLines: {display:false},
            },
            {
            ticks: {beginAtZero:true},
            id: "y-axis-1",
            position: "right",
            gridLines: {display:false},
            },
        ],
        xAxes: [{
            gridLines: {display:false},
        }],
    }
};

// Initialisieren
var myChart = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: options,
});