import Position from './Position'

type NodeView = {
    id: string,
    label?: string,
    position: [number, number, number?],
    color: [number, number, number],
    size: number
}

export default NodeView