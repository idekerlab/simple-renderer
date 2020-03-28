const createPoints = (nodeCount: number) => {
  const points = new Array(nodeCount)

  let idx: number = nodeCount

  while (idx--) {
    // points[idx] = {position: [posOrNeg() * Math.random() * 500, posOrNeg() * Math.random() * 500], color: [255, 0, 0], radius: 0.1}
    const point: [number, number] = [
      posOrNeg() * Math.random() * 50000,
      posOrNeg() * Math.random() * 50000
    ]
    Object.seal(point)
    points[idx] = point
  }

  return points
}

const getLinks = (nodeCount: number, edgeCount: number, nodeArray: [][]) => {
  const edges = new Array(edgeCount)

  let idx = edgeCount

  while (idx--) {
    const sourceIdx = getRandomIntInclusive(nodeCount - 1)
    const targetIdx = getRandomIntInclusive(nodeCount - 1)

    // An edge: only w/ source and target ID
    const edge: readonly [number, number] = [sourceIdx, targetIdx]
    edges[idx] = edge
  }

  return edges
}

const getRandomIntInclusive = (max: number) => {
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1))
}

const posOrNeg = () => (Math.random() < 0.5 ? -1 : 1)

export {createPoints, getLinks}
