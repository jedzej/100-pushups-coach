export default [
  {
    range: "0-5",
    plan: [
      {
        interval: 60,
        series: [2, 3, 2, 2, 3],
        regeneration: 1
      },
      {
        interval: 90,
        series: [3, 4, 2, 3, 4],
        regeneration: 1
      },
      {
        interval: 120,
        series: [4, 5, 3, 3, 5],
        regeneration: 2
      },
      {
        interval: 60,
        series: [5, 6, 4, 4, 6],
        regeneration: 1
      },
      {
        interval: 90,
        series: [5, 6, 4, 4, 7],
        regeneration: 1
      },
      {
        interval: 120,
        series: [5, 7, 5, 5, 7],
        regeneration: 2
      }
    ]
  }
];
