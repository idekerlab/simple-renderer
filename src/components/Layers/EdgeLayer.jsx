import { LineLayer} from '@deck.gl/layers'


const EdgeLayer = props => {
  const {nodes, edges} = props

  return new LineLayer({
    id: `link-layer`,
    data: edges,
    getSourcePosition: e => nodes[e[0]],
    getTargetPosition: e => nodes[e[1]],
    getColor: '#00FF00',
    strokeWidth: 1,
    opacity: 1
  })
}
