var ctx = $('#myChart').get(0).getContext('2d');
var barChartData = {
        labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So","Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        datasets: [{
            label: 'Temp(max.)',
            data: [21,18,31,33,32,18,17,21,18,31,33,32,18,17],
            yAxisID: "y-axis-1",
            backgroundColor: 'rgb(249,78,35)',
            },
            {
            label: 'Humm(max.)',
            data: [50,56,67,56,66,55,57,50,56,67,56,66,55,57],
            yAxisID: "y-axis-0",
            backgroundColor: 'rgb(21,65,118)',
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
                console.log(tooltipItems);
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