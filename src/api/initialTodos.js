const _todos = [{
    id: '1000',
    title: 'Title of the first element',
    description: 'Description of the first element',
    inputsTasks: [{
        one: 'Point one',
        status: true,
        idTask: 1
      },
      {
        one: 'Point two',
        status: false,
        idTask: 2
      },
      {
        one: 'Point three',
        status: true,
        idTask: 3
      },
      {
        one: 'Point four',
        status: false,
        idTask: 4
      }
    ]
  },
  {
    id: '2000',
    title: 'Title of the second element',
    description: 'Description of the second element',
    inputsTasks: [{
        one: 'Point one',
        status: true,
        idTask: 1
      },
      {
        one: 'Point two',
        status: false,
        idTask: 2
      },
      {
        one: 'Point three',
        status: true,
        idTask: 3
      }
    ]
  },
  {
    id: '3000',
    title: 'Title of the third element',
    description: 'Description of the third element',
    inputsTasks: [{
        one: 'Point one',
        status: true,
        idTask: 1
      },
      {
        one: 'Point two',
        status: false,
        idTask: 2
      }
    ]
  }
]


export default {
  getProducts(cb) {
    setTimeout(() => cb(_todos), 100);
  }
};