import * as cxVizConverter from 'cxVizConverter'

console.log('VC ', cxVizConverter)


const cx2native = (cx2: object[]) => {

    const result = cxVizConverter.convert(cx2, 'cytoscapeJS')
    console.log('VC result', result)

    return result
}

export {cx2native}