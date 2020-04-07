import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {OrthographicView} from '@deck.gl/core'
import NodeLayer from '../../Layers/NodeLayer'
import {ScatterplotLayer, LineLayer} from '@deck.gl/layers'

const baseStyle = {
  backgroundColor: '#000000',
  position: 'relative',
}

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  zoom: 1
}

const view = new OrthographicView()

const GraphRenderer = props => {
  const [isEdgesVisible, setEdgesVisible] = useState(true)
  const [tooltipState, setTooltipState] = useState({
    hoveredObject: null,
    pointerX: 0,
    pointerY: 0
  })

  
  const {setSelectedNode} = props
  const {nodeViews, edgeViews} = props.data

  const _renderTooltip = () => {
    const {hoveredObject, pointerX, pointerY} = tooltipState

    return (
      hoveredObject && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            pointerEvents: 'none',
            left: pointerX,
            top: pointerY
          }}
        >
          {hoveredObject}
        </div>
      )
    )
  }

  const nodeLayer = new ScatterplotLayer({
    data: [...nodeViews.values()],
    getPosition: d => [d.position.x, d.position.y],
    getColor: d => d.color,
    getRadius: d => d.size,
    opacity: 1,
    pickable: true,
    onHover: d => {
      setSelectedNode(d)
    }
  })

  const edgeLayer = new LineLayer({
    id: `link-layer`,
    data: [...edgeViews.values()],
    pickable: false,
    getSourcePosition: e => {
      const source = nodeViews.get(e.source)
      return [source.position.x, source.position.y]
    },
    getTargetPosition: e => {
      const target = nodeViews.get(e.target)
      return [target.position.x, target.position.y]
    },
    getColor: [80, 80, 80],
    strokeWidth: 1,
    opacity: 0.1,
    visible: isEdgesVisible
  })

  const layers = [edgeLayer, nodeLayer]

  return (
      <DeckGL
        width="100%"
        height="100%"
        style={baseStyle}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        views={view}
        layers={layers}
        onClick={info => {
          console.log('##CLK', info)
        }}
        onDragStart={info => {
          setEdgesVisible(!isEdgesVisible)
        }}
        onDragEnd={info => {
          setEdgesVisible(!isEdgesVisible)
        }}
        onViewStateChange={state => {
          if (state.interactionState.isZooming) {
            setEdgesVisible(false)
            setTimeout(() => {
              if (!isEdgesVisible) {
                setEdgesVisible(true)
              }
            }, 300)
          }
        }}
      />
  )
}

export default GraphRenderer
