import React, { PropTypes, Component } from 'react'
import Chart from 'chartjs';
import { Pie } from 'react-chartjs';

class MyPolls extends Component {
  render () {
    const PieChart = Pie;
    const chartData =  [
              {
                  value: 300,
                  color:"#F7464A",
                  highlight: "#FF5A5E",
                  label: "Red"
              },
              {
                  value: 50,
                  color: "#46BFBD",
                  highlight: "#5AD3D1",
                  label: "Green"
              },
              {
                  value: 100,
                  color: "#FDB45C",
                  highlight: "#FFC870",
                  label: "Yellow"
              },
              {
                  value: 40,
                  color: "#949FB1",
                  highlight: "#A8B3C5",
                  label: "Grey"
              },
              {
                  value: 120,
                  color: "#4D5360",
                  highlight: "#616774",
                  label: "Dark Grey"
              }
          ];
    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };
    return (
      <div>
        <h1>My Polls</h1>
        <PieChart data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    );
  }
}

export default MyPolls;
