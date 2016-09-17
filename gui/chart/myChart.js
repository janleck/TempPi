var ctx = $('#myChart').get(0).getContext('2d');
var barChartData = {
        labels: ["-","-","-","-","-","-","-","-","-","-","-","-","-","-",],
        datasets: [{
            label: 'Temp (DS)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            yAxisID: "y-axis-0",
            backgroundColor: 'rgb(234,64,21)',
            },
            {
            label: 'Humm (DS)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            yAxisID: "y-axis-1",
            backgroundColor: 'rgba(21,65,118,0.5)',
            }
        ],
    };
var options = {
    showAllTooltips: false, // <<<<<<< DEAKTIVIERT !
    tooltips: {
        mode: 'single',
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
                var a = tooltipItems.datasetIndex ? "%" : "°C";
                return String(Math.round(tooltipItems.yLabel*100)/100)+a;
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