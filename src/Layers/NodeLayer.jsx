import {ScatterplotLayer} from '@deck.gl/layers'

const NodeLayer = nodeViews => {
  return new ScatterplotLayer({
    data: nodeViews,
    getPosition: d => d.position,
    getColor: d => d.color,
    getRadius: d => d.size,
    opacity: 1
  })
}

export default NodeLayer
