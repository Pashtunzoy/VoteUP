import { v4 } from 'node-uuid';

export const fakeChartData = [
  {
    id: v4(),
    title: 'What Color is Earth?',
    display: true,
    poll: [
      {
        id: v4(),
        value: 0,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        id: v4(),
        value: 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        id: v4(),
        value: 0,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      },
      {
        id: v4(),
        value: 0,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
      },
      {
        id: v4(),
        value: 0,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
      }
    ]
  },
  {
    id: v4(),
    title: 'Vote Your Favourite Color',
    display: false,
    poll: [
      {
        id: v4(),
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        id: v4(),
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        id: v4(),
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      },
      {
        id: v4(),
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
      },
      {
        id: v4(),
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
      }
    ]
  },
  {
    id: v4(),
    title: 'How Do You Rate This Site?',
    display: true,
    poll : [
    	{
        id: v4(),
    		value: 0,
    		color: "grey",
        highlight: "darkgrey",
        label: "Awesome"
    	},
    	{
        id: v4(),
        value: 0,
    		color : "#1789D4",
        highlight: "#1789c4",
        label: "Cool"
    	},
    	{
        id: v4(),
    		value : 0,
    		color : "#CB4B16",
        highlight: "#aa4a16",
        label: "Hate It!"
    	},
    	{
        id: v4(),
    		value : 0,
    		color : "#1F8261",
        highlight: "#1A6261",
        label: "OK"
    	},
    	{
        id: v4(),
    		value : 0,
    		color : "#FFA500",
        highlight: "#FFA911",
        label: "Mehhh"
    	}
    ]
  }
];
export const fakeChartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};


const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));


export const fetchPoll = () =>
  delay(500).then(() => {
    return [...fakeChartData];
  });
export const addNewPoll = (poll) => {
  return delay(500).then(() => {
    // return [...fakeChartData, poll];
    fakeChartData.push(poll);
  });
};

export const fetchPollOptById = (id) =>
  delay(500).then(() => {
  // return fakeChartData.reduce((acc, data) => acc.concat(data.poll), []).filter(pollObj => pollObj.id === id)[0];
  var result;
    fakeChartData.map(data => {
        data.poll.map(data => {
            if (data.id === id) {
                result = data;
                return data;
            }
        });
    });
    return result;
});

export const fetchChartById = (id) =>
  delay(500).then(() => {
    return fakeChartData.filter((data) => data.id === id);
});

export const addNewPollOpt = (data) =>
  delay(500).then(() => {
    return [...fakeChartData, [data]];
  });

export const deletePollOpt = (id) =>
  delay(500).then(() => {
    return fakeChartData.filter((poll) => poll.id !== id);
  });
