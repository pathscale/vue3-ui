<script>
import { h, ref, onMounted, watchEffect } from 'vue'

import { defaultDayOptions, defaultNightOptions } from './DepthChartBaseData.ts'

export default {
  name: 'VDepthChart',
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
    customizeOptions: {
      type: [Object],
      default() {
        return defaultDayOptions
      },
    },
    theme: {
      type: String,
      default() {
        return 'day'
      },
    },
  },
  setup(props) {
    const gridNode = ref(null)
    const axisNode = ref(null)
    const depthNode = ref(null)
    const tipNode = ref(null)
    let pointMap = new Map()
    let options = Object.assign(defaultDayOptions, props.customizeOptions)

    const deepClone = obj => {
      if (obj instanceof RegExp) {
        return new RegExp(obj)
      }
      if (obj instanceof Date) {
        return new Date(obj)
      }
      if (obj === null || typeof obj !== 'object') {
        return obj
      } // if it is not a reference type, return directly
      const newObj = new obj.constructor() // if obj is an array, newObj=[]; if obj is an object, newObj={}
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // Is it its own object
          newObj[key] = deepClone(obj[key]) // assignment
        }
      }
      return newObj
    }

    // numbers are separated by commas
    const toThousand = (num = 0) => {
      if (typeof num === 'undefined') {
        return 0
      }
      return (num || 0).toString().replace(/\d+/, function(n) {
        const len = n.length
        if (len % 3 === 0) {
          return n.replace(/(\d{3})/g, ',$1').slice(1)
        }
        return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1')
      })
    }

    const lineNode = (x1, x2, y1, y2, style) => {
      return h('line', { x1, x2, y1, y2, style })
    }

    const rectNode = (x, y, width, height, style) => {
      return h('rect', { x, y, width, height, style })
    }

    const textNode = (x, y, innerHTML, style) => {
      return h('text', { x, y, innerHTML, style })
    }

    const renderGrid = options => {
      const { width, height, initOffset, bgColor, xAxisGridSpace, yAxisGridSpace, gridLineColor } =
        options

      const gridChildren = []
      const gridStyle = {
        stroke: gridLineColor,
        fill: bgColor,
        strokeWidth: 1,
      }
      // Create vertical grid line path
      for (let i = initOffset + xAxisGridSpace; i < width; i += xAxisGridSpace) {
        gridChildren.push(lineNode(i, i, 0, height - yAxisGridSpace, gridStyle))
      }
      // Create a horizontal grid line path
      for (let j = initOffset + yAxisGridSpace; j < height; j += yAxisGridSpace) {
        gridChildren.push(lineNode(0, width, j, j, gridStyle))
      }

      gridChildren.push(rectNode(0, 0, width, height, gridStyle))
      gridNode.value = h('g', { class: 'grid-container' }, gridChildren)
    }

    const renderAxis = (data, options) => {
      // Determine if there is a corresponding depth array
      if (
        !Object.prototype.hasOwnProperty.call(data, 'buy') ||
        !Object.prototype.hasOwnProperty.call(data, 'sell')
      ) {
        // alert("Cannot render coordinate scale, missing key array (buy or sell)")
        // console.log("Cannot render coordinate scale, missing key array (buy or sell)")
        return
      }

      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        xAxisGridSpace,
        yAxisGridSpace,
        xAxisFontSize,
        xAxisFontFamily,
        yAxisFontSize,
        yAxisFontFamily,
        xAxisFontColor,
        yAxisFontColor,
        yAxisShadowColor,
      } = options
      const yLen = height - yAxisGridSpace
      const originData = [0, yLen]
      const allData = deepClone(data)
      const buyOriginData = allData.buy
      const buyData = buyOriginData.reverse()
      const sellData = data.sell
      const buyLen = buyData.length
      const sellLen = sellData.length
      const buyBasePrice = buyData[buyLen - 1].price
      const sellBasePrice = sellData[sellLen - 1].price
      const buyPriceDiff = buyData[0].price - buyData[buyLen - 1].price
      const sellPriceDiff = sellData[0].price - sellData[sellLen - 1].price
      const staticWidth = (width - buySellSpace) / 2 // single width
      const staticHeight = yLen - bottomSpace
      const buyTotalAmount = buyData[0].amount // Buy order full depth amount
      const sellTotalAmount = sellData[0].amount // total depth of sell order
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount) // Determine the quantity corresponding to the maximum height
      const axisChildren = []

      const xAxisStyle = {
        fill: xAxisFontColor,
        fontSize: xAxisFontSize,
        fontFamily: xAxisFontFamily,
        maxWidth: xAxisGridSpace,
        textAnchor: 'middle',
      }

      const yAxisStyle = {
        fill: yAxisFontColor,
        fontSize: yAxisFontSize,
        fontFamily: yAxisFontFamily,
        maxWidth: yAxisGridSpace,
        textAnchor: 'start',
      }
      // create a horizontal axis path
      axisChildren.push(
        lineNode(originData[0], originData[0] + width, originData[1], originData[1], xAxisStyle),
      )

      // create vertical axis path
      axisChildren.push(
        lineNode(originData[0], originData[0], originData[1], originData[1] - yLen, xAxisStyle),
      )

      // Create the tick path for the y-axis
      for (let i = originData[0] + xAxisGridSpace; i < width; i += xAxisGridSpace) {
        axisChildren.push(lineNode(i, i, originData[1] - 4, originData[1] + 4, xAxisStyle))

        let number = 0
        if (i <= staticWidth) {
          number = Number.parseFloat((i / staticWidth) * buyPriceDiff + buyBasePrice).toFixed(2)
        } else if (i > staticWidth + buySellSpace) {
          number = Number.parseFloat(
            ((i - (staticWidth + buySellSpace)) / staticWidth) * sellPriceDiff + sellBasePrice,
          ).toFixed(2)
        } else {
          number = null
        }

        // maxWidth is the spacing
        axisChildren.push(textNode(i, originData[1] + 18, number, xAxisStyle))
      }

      for (let j = originData[1] - yAxisGridSpace; j > originData[1] - yLen; j -= yAxisGridSpace) {
        axisChildren.push(lineNode(originData[0] - 4, originData[0] + 4, j, j, yAxisStyle))

        const number = Number.parseFloat(((staticHeight - j) / staticHeight) * totalAmount).toFixed(
          2,
        )

        axisChildren.push(textNode(originData[0] + 6, j + 4, number, yAxisStyle))
      }

      axisNode.value = h(
        'g',
        {
          class: 'axis-container',
          transform: `translate(${initOffset}, ${initOffset})`,
        },
        axisChildren,
      )
    }

    const renderDepth = (data, options) => {
      // Determine if there is a corresponding depth array
      if (
        !Object.prototype.hasOwnProperty.call(data, 'buy') ||
        !Object.prototype.hasOwnProperty.call(data, 'sell')
      ) {
        // console.log("Unable to render depth map, missing key array (buy or sell)")
        // alert("Unable to render depth map, missing key array (buy or sell)");
        return
      }
      // initialize basic data
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        yAxisGridSpace,
        buyLinearGradientArray,
        sellLinearGradientArray,
      } = options
      const allwidth = width // overall width
      const allheight = height - yAxisGridSpace
      const staticWidth = (allwidth - buySellSpace) / 2 // fixed single width
      const staticHeight = allheight - bottomSpace
      const buyPoint = [],
        sellPoint = []
      const allData = deepClone(data)
      const buyOriginData = allData.buy
      const buyData = buyOriginData.reverse()
      const sellData = data.sell
      const buyLen = buyData.length
      const sellLen = sellData.length

      const buyEndOrigin = { x: staticWidth, y: staticHeight } // buy order pen end point
      const sellEndOrigin = { x: staticWidth + buySellSpace, y: staticHeight } // Sell order pen end point
      const buyStartOrigin = { x: 0, y: staticHeight } // the starting point of the buy order brush edge
      const sellStartOrigin = { x: width, y: staticHeight } // starting point of the edge of the sell order brush
      const buySidePrice = buyData[0].price // buy edge price
      const sellSidePrice = sellData[0].price // buy edge price
      const buyTotalAmount = buyData[0].amount // Buy order full depth amount
      const sellTotalAmount = sellData[0].amount // total depth of sell order
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount) // Determine the quantity corresponding to the maximum height
      const buyMaxPriceDiff = buyData[buyLen - 1].price - buyData[0].price // maximum price difference for buy orders
      const sellMaxPriceDiff = sellData[0].price - sellData[sellLen - 1].price // maximum price difference for sell order
      let pointList = []
      const depthChildren = []

      // Add a buy order drawing point and make sure that the coordinate points are all integers
      buyData.forEach((item, index) => {
        const x = Math.round(((item.price - buySidePrice) / buyMaxPriceDiff) * staticWidth)
        const y = Math.round(((totalAmount - item.amount) / totalAmount) * staticHeight)
        buyPoint.push({ x, y })

        if (buyData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - buyData[index + 1].amount) / totalAmount) * staticHeight,
          )
          buyPoint.push({ x, y: yDrop })
        }
        pointList.push({ x, y, side: 'buy', value: item })
      })
      // Add sell order drawing points and make sure the coordinate points are all integers
      sellData.forEach((item, index) => {
        const x = Math.round(
          width - ((sellSidePrice - item.price) / sellMaxPriceDiff) * staticWidth,
        )
        const y = Math.round(((totalAmount - item.amount) / totalAmount) * staticHeight)
        sellPoint.push({ x, y })
        // drop point
        if (sellData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - sellData[index + 1].amount) / totalAmount) * staticHeight,
          )
          sellPoint.push({ x, y: yDrop })
        }
        pointList.push({ x, y, side: 'sell', value: item })
      })
      pointList = pointList.sort((a, b) => {
        return a.x - b.x
      })
      pointList.forEach(item => {
        pointMap.set([item.x, item.y, item.side], item.value)
      })

      buyPoint.push(buyEndOrigin)
      buyPoint.push(buyStartOrigin)
      sellPoint.push(sellEndOrigin)
      sellPoint.push(sellStartOrigin)

      // Initialize the center offset to ensure the line is drawn without aliasing
      const defNode = h('defs', [
        h(
          'linearGradient',
          {
            id: 'buyLinearGradient',
            x1: '0%',
            y1: '0%',
            x2: '0%',
            y2: `${staticHeight}%`,
          },
          [
            h('stop', {
              offset: '0%',
              'stop-color': buyLinearGradientArray[0],
            }),
            h('stop', {
              offset: '30%',
              'stop-color': buyLinearGradientArray[1],
            }),
            h('stop', {
              offset: '50%',
              'stop-color': buyLinearGradientArray[2],
            }),
            h('stop', {
              offset: '80%',
              'stop-color': buyLinearGradientArray[3],
            }),
            h('stop', {
              offset: '100%',
              'stop-color': buyLinearGradientArray[4],
            }),
          ],
        ),
        h(
          'linearGradient',
          {
            id: 'sellLinearGradient',
            x1: '0%',
            y1: '0%',
            x2: '0%',
            y2: `${height}%`,
          },
          [
            h('stop', {
              offset: '0%',
              'stop-color': sellLinearGradientArray[0],
            }),
            h('stop', {
              offset: '30%',
              'stop-color': sellLinearGradientArray[1],
            }),
            h('stop', {
              offset: '50%',
              'stop-color': sellLinearGradientArray[2],
            }),
            h('stop', {
              offset: '80%',
              'stop-color': sellLinearGradientArray[3],
            }),
            h('stop', {
              offset: '100%',
              'stop-color': sellLinearGradientArray[4],
            }),
          ],
        ),
      ])
      depthChildren.push(defNode)

      const buyStyle = {
        stroke: options.buyStrokeColor,
        fill: 'url(#buyLinearGradient)',
      }

      const sellStyle = {
        stroke: options.sellStrokeColor,
        fill: 'url(#sellLinearGradient)',
      }

      // Buy single stroke to draw line
      // Set the buy order gradient fill and stroke color
      // connect the corresponding points
      const buyPathD = buyPoint.reduce((s, v) => {
        s += s ? ` L ${v.x} ${v.y}` : `M ${v.x} ${v.y}`
        return s
      }, '')
      depthChildren.push(
        h('path', {
          d: buyPathD,
          style: buyStyle,
        }),
      )

      // Sell single stroke line
      // Set the gradient fill and stroke color of the sell order
      // connect the corresponding points
      const sellPathD = sellPoint.reduce((s, v) => {
        s += s ? ` L ${v.x} ${v.y}` : `M ${v.x} ${v.y}`
        return s
      }, '')
      depthChildren.push(
        h('path', {
          d: sellPathD,
          style: sellStyle,
        }),
      )

      depthNode.value = h(
        'g',
        {
          class: 'depth-container',
          transform: `translate(${initOffset}, ${initOffset})`,
        },
        depthChildren,
      )
    }

    const onMouseMove = ({ offsetX }) => {
      const {
        tipType,
        tipHeight,
        tipLocationLineColor,
        tipLocationDotRadius,
        tipBuyLocationDotBgColor,
        tipBuyBorderColor,
        tipBuyBgColor,
        tipBuyTextColor,
        tipSellLocationDotBgColor,
        tipSellBorderColor,
        tipSellBgColor,
        tipSellTextColor,
        yAxisGridSpace,
        initOffset,
      } = options
      const tipChildren = []
      let { tipWidth } = options
      const { width } = options
      const height = options.height - yAxisGridSpace
      const tipContextFontSize = 12
      for (const key of pointMap.keys()) {
        const x = key[0]
        const y = key[1]
        const side = key[2]
        const obj = pointMap.get(key)
        const tipStyle = {
          stroke: tipLocationLineColor,
          strokeDasharray: '2',
          strokeWidth: 1,
        }
        if (offsetX < x) {
          tipChildren.push(lineNode(0, width, y, y, tipStyle))
          tipChildren.push(lineNode(x, x, 0, height, tipStyle))

          // draw small dots
          tipChildren.push(
            h('circle', {
              cx: x,
              cy: y,
              r: tipLocationDotRadius,
              fill: side === 'buy' ? tipBuyLocationDotBgColor : tipSellLocationDotBgColor,
              stroke: side === 'buy' ? tipBuyBorderColor : tipSellBorderColor,
              strokeWidth: 1,
            }),
          )

          // draw the tooltip
          if (tipType === 'mouse') {
            const tipContextFill = side === 'buy' ? tipBuyBgColor : tipSellBgColor
            const tipContextStroke = side === 'buy' ? tipBuyBorderColor : tipSellBorderColor

            let left = x - tipWidth / 2
            let top = y - tipHeight - 10
            const tipsPriceText = `Order price ${toThousand(obj.price)}`
            const tipsAmountText = `Amount of delegated ${toThousand(obj.amount)}`
            const maxTextWidth = Math.max(
              tipsPriceText.length * tipContextFontSize,
              tipsAmountText.length * tipContextFontSize,
            )
            if (maxTextWidth + 20 > tipWidth) {
              tipWidth = maxTextWidth + 20
            }
            if (left < initOffset) {
              left = initOffset
            }
            if (left >= width - tipWidth) {
              left = width - tipWidth
            }
            if (top <= 0) {
              top = y + 10
            }

            tipChildren.push(
              h('rect', {
                x: left,
                y: top,
                width: tipWidth,
                height: tipHeight,
                rx: 5,
                ry: 5,
                stroke: tipContextStroke,
                fill: tipContextFill,
                strokeDasharray: '2',
              }),
            )

            const marginLeft = 10
            const marginTop = 25
            const lineHeight = 20
            tipChildren.push(
              textNode(left + marginLeft, top + marginTop, tipsPriceText, {
                fill: side === 'buy' ? tipBuyTextColor : tipSellTextColor,
                textAlign: 'left',
                showBluer: 0,
                fontSize: `${tipContextFontSize}px`,
              }),
            )
            tipChildren.push(
              textNode(left + marginLeft, top + marginTop + lineHeight, tipsAmountText, {
                fill: side === 'buy' ? tipBuyTextColor : tipSellTextColor,
                textAlign: 'left',
                showBluer: 0,
                fontSize: `${tipContextFontSize}px`,
              }),
            )
          } else {
            const tipsPriceText = `${toThousand(obj.price)}`
            const tipsAmountText = `${obj.amount}`
            const tipsPriceWidth = tipsPriceText.length * tipContextFontSize + 20
            const tipsAmountWidth = tipsAmountText.length * tipContextFontSize + 15
            const lineHeight = 20
            // draw a tooltip on the x-axis
            const toopTipStyle = {
              fill: props.theme === 'night' ? 'rgb(25,25,25)' : '#fff',
              stroke: '#e6a23c',
              strokeWidth: 1,
            }

            const toopTipTextStyle = {
              fill: props.theme === 'night' ? '#ccc' : '#666',
              stroke: '#e6a23c',
              strokeWidth: 1,
              fontSize: `${tipContextFontSize}px`,
              textAnchor: 'middle',
              fontWeight: 'bold',
            }

            const xAxisToolTipD = `M ${x} ${height} L ${x - 5} ${height + 5} L ${
              x - tipsPriceWidth / 2
            } ${height + 5} L ${x - tipsPriceWidth / 2} ${height + 5 + lineHeight}
             L ${x + tipsPriceWidth / 2} ${height + 5 + lineHeight} L ${x + tipsPriceWidth / 2} ${
  height + 5
} L ${x + 5} ${height + 5} L ${x} ${height}`
            tipChildren.push(
              h('path', {
                d: xAxisToolTipD,
                style: toopTipStyle,
              }),
            )
            tipChildren.push(textNode(x, height + 19, tipsPriceText, toopTipTextStyle))

            // draw a tooltip on the y-axis
            const yAxisToolTipD = `M ${1} ${y} L ${8} ${y - 10} L ${8 + tipsAmountWidth} ${
              y - 10
            } L ${8 + tipsAmountWidth} ${y + 10} L ${8} ${y + 10} L ${1} ${y}`
            tipChildren.push(
              h('path', {
                d: yAxisToolTipD,
                style: toopTipStyle,
              }),
            )
            toopTipTextStyle.maxWidth = tipsAmountWidth
            tipChildren.push(textNode(30, y + 4, tipsAmountText, toopTipTextStyle))
          }

          tipNode.value = h(
            'g',
            {
              class: 'tip-container',
              transform: `translate(${initOffset}, ${initOffset})`,
            },
            tipChildren,
          )
          break
        }
      }
    }

    const onMouseOut = () => {
      tipNode.value = null
    }

    const init = () => {
      renderGrid(options)
      renderDepth(props.data, options)
      renderAxis(props.data, options)
    }

    onMounted(() => {
      if (props.theme === 'night') {
        options = Object.assign(defaultNightOptions, props.customizeOptions)
      }

      init()
    })

    watchEffect(() => {
      options = Object.assign(
        props.theme === 'night' ? defaultNightOptions : defaultDayOptions,
        props.customizeOptions,
      )
      pointMap = new Map()

      init()
    })

    return () =>
      h(
        'div',
        {
          class: 'depth-chart-container',
          onmousemove: onMouseMove,
          onmouseout: onMouseOut,
        },
        [
          h(
            'svg',
            {
              class: 'depth-chart-svg',
              width: options.width,
              height: options.height,
            },
            [gridNode.value, depthNode.value, axisNode.value, tipNode.value],
          ),
        ],
      )
  },
}
</script>
