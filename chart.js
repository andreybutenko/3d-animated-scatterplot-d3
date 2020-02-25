const svg = d3.select('svg');

const RANDOM_SCATTER = 0.4;

let data = [];

// Generate a random (x, y, z) point with a random color
function getRandomPoint() {
  return {
    x: 2 * Math.random() - 1,
    y: 2 * Math.random() - 1,
    z: 2 * Math.random() - 1,
    color: '#' + Math.floor(Math.random()*16777215).toString(16)
  }
}

// Generate a random (x, y, z) point near a provided (x, y, z) point, with the same color
// as the original point
function getRandomPointNear(pt) {
  return {
    x: pt.x + RANDOM_SCATTER * Math.random() - RANDOM_SCATTER * 0.5,
    y: pt.y + RANDOM_SCATTER * Math.random() - RANDOM_SCATTER * 0.5,
    z: pt.z + RANDOM_SCATTER * Math.random() - RANDOM_SCATTER * 0.5,
    color: pt.color
  }
}

// Update the data array with 5 clusters of (x, y, z) points, with 10 points in each cluster.
function generatePoints() {
  data = [];
  for(let i = 0; i < 5; i++) {
    const centerPoint = getRandomPoint();
    data.push(centerPoint);
    
    for(let j = 0; j < 9; j++) {
      data.push(getRandomPointNear(centerPoint))
    }
  }
}

// First render: generate points, then draw with d3
generatePoints();
svg.selectAll('.point')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'point')
  .attr('cx', d => 150 + d.x * 100 + d.z * 50)
  .attr('cy', d => 150 - d.y * 100 - d.z * 50)
  .attr('fill', d => d.color)

// Every 2 seconds: generate new points, then draw and transition with d3
setInterval(() => {
  generatePoints();

  svg.selectAll('.point')
    .data(data)
    .transition()
    .duration(1000)
    .attr('cx', d => 150 + d.x * 100 + d.z * 50)
    .attr('cy', d => 150 - d.y * 100 - d.z * 50)
    .attr('fill', d => d.color)
}, 2000);
