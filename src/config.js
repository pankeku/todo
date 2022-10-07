let config = {
    page: {
        title: 'Tasks',
    },
    allProject: {
      title: 'All tasks',
      id: -1
    }
    ,
    done: {
      title: 'Completed tasks',
      id: -2,
    },
    priorities: ["P1", "P2", "P3", "P4"],
};


const priorityColors = {'P1' : '--p1-color',
'P2' : '--p2-color',
'P3' : '--p3-color',
'P4' : '--p4-color'};

const priorityBorderColors =
{'P1' : '--p1-border-color',
'P2' : '--p2-border-color',
'P3' : '--p3-border-color',
'P4' : '--p4-border-color'};

export {config, priorityColors, priorityBorderColors};
