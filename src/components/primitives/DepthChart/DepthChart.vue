<template>
  <div>
    <div class="content-wrap">
      <!-- <img style="opacity: 1;" :src="logo" ref="watermaskImage2" alt /> -->
      <!-- Text watermark or image watermark -->
      <canvas ref="watermask" :width="options.width" :height="options.height" />
      <!-- grid -->
      <canvas ref="grid" :width="options.width" :height="options.height" />
      <!-- Main depth map -->
      <canvas ref="depth" :width="options.width" :height="options.height" />
      <!-- axis -->
      <canvas ref="axis" :width="options.width" :height="options.height" />
      <!-- prompt box -->
      <canvas
        ref="tip"
        :width="options.width"
        :height="options.height"
        @mousemove="onMouseMove"
        @mouseout="onMouseOut" />
    </div>
  </div>
</template>

<script>
// import logo from "./../assets/logo.png";

// Default configuration items for depth map
import {onMounted, onUnmounted, watchEffect} from "vue";

const defaultDayOptions = {
  // basic configuration
  width: 780, // depth map visible width
  height: 540, // depth map visible height
  initOffset: 0.5, // initial offset to solve blurred lines
  bgColor: "rgba(255,255,255,0.1)", // overall background color

  // watermark configuration
  watermaskType: "image", // watermark configuration type "text" (text) "image" (picture)
  watermaskContent: "vue-depth-chart", // text watermark directly assign text image watermark import object

  // line configuration
  gridLineColor: "#ddd", // grid line color
  rulerLineColor: "#999", // ruler line color color

  // axis configuration
  xAxisGridSpace: 90, // x-axis background grid spacing
  yAxisGridSpace: 30, // y-axis background grid spacing
  xAxisFontColor: "#666", // x-axis ruler scale font color
  yAxisFontColor: "#666", // y-axis ruler scale font color
  xAxisFontSize: "12px Aria", // x-axis ruler scale font size
  yAxisFontSize: "12px Aria", // y-axis ruler scale font size
  yAxisShadowColor: "#fff", // y-axis ruler tick shadow color

  // spacing configuration
  bottomSpace: 8, // the distance between the depth map and the y-axis
  buySellSpace: 10, // Space between buy and sell ends

  // prompt box
  tipWidth: 120,
  tipHeight: 60,
  tipLocationLineColor: "#999", // Tip box positioning line color
  tipLocationDotRadius: 5, // Tip box dot radius
  tipType: "mouse", // Mouse movement prompt information position axis (on the xy axis) mouse (displayed with absolute positioning following the mouse position)

  // buy prompt box
  tipBuyLocationDotBgColor: "#fff", // background color of tip box dots
  tipBuyBorderColor: "#67c23a", // The border color of the tip box
  tipBuyBgColor: "#f0f9eb", // background color of tip box
  tipBuyTextColor: "#67c23a", // The color of the tip text in the tip box

  // sell prompt
  tipSellLocationDotBgColor: "#fff", // background color of tip box dots
  tipSellBorderColor: "#f56c6c", // The border color of the prompt box
  tipSellBgColor: "#fef0f0", // background color of the prompt box
  tipSellTextColor: "#f56c6c", // The prompt text color of the prompt box

  // custom depth style configuration
  buyStrokeColor: "rgb(111,168,0)", // buy stroke color rgb(111,168,0)
  sellStrokeColor: "rgb(234,0,112)", // Sell stroke color rgb(234,0,112)
  buyLinearGradientArray: [
    "rgb(141,186,51)",
    "rgb(160,197,87)",
    "rgb(189,215,138)",
    "rgb(228,238,206)",
    "rgb(250,250,241)",
  ],
  sellLinearGradientArray: [
    "rgb(255,148,152)",
    "rgb(255,164,172)",
    "rgb(255,192,197)",
    "rgb(255,228,230)",
    "rgb(255,249,249)",
  ],
};

// Default configuration items for depth map
const defaultNightOptions = {
  // basic configuration
  width: 780, // depth map visible width
  height: 540, // depth map visible height
  initOffset: 0.5, // initial offset to solve blurred lines
  bgColor: "rgba(0,0,0,0.9)", // overall background color

  // watermark configuration
  watermaskType: "image", // watermark configuration type "text" (text) "image" (picture)
  watermaskContent: "vue-depth-chart", // text watermark directly assign text image watermark import object

  // line configuration
  gridLineColor: "#333", // grid line color
  rulerLineColor: "rgb(47,47,47)", // ruler line color color

  // axis configuration 0
  xAxisGridSpace: 90, // x-axis background grid spacing
  yAxisGridSpace: 30, // y-axis background grid spacing
  xAxisFontColor: "#999", // x-axis ruler scale font color
  yAxisFontColor: "#999", // y-axis ruler scale font color
  xAxisFontSize: "12px Aria", // x-axis ruler scale font size
  yAxisFontSize: "12px Aria", // y-axis ruler scale font size
  yAxisShadowColor: "#333", // y-axis ruler tick shadow color

  // spacing configuration
  bottomSpace: 8, // the distance between the depth map and the y-axis
  buySellSpace: 10, // Space between buy and sell ends

  // prompt box
  tipWidth: 120,
  tipHeight: 60,
  tipLocationLineColor: "#999", // Tip box positioning line color
  tipLocationDotRadius: 5, // Tip box dot radius
  tipType: "mouse", // Mouse movement prompt information position axis (on the xy axis) mouse (displayed with absolute positioning following the mouse position)

  // buy prompt box
  tipBuyLocationDotBgColor: "#fff", // background color of tip box dots
  tipBuyBorderColor: "#67c23a", // The border color of the tip box
  tipBuyBgColor: "#f0f9eb", // background color of tip box
  tipBuyTextColor: "#67c23a", // The color of the tip text in the tip box

  // sell prompt
  tipSellLocationDotBgColor: "#fff", // background color of tip box dots
  tipSellBorderColor: "#f56c6c", // The border color of the prompt box
  tipSellBgColor: "#fef0f0", // background color of the prompt box
  tipSellTextColor: "#f56c6c", // The prompt text color of the prompt box

  // custom depth style configuration
  buyStrokeColor: "rgb(111,168,0)", // buy stroke color rgb(111,168,0)
  sellStrokeColor: "rgb(234,0,112)", // Sell stroke color rgb(234,0,112)
  buyLinearGradientArray: [
    "rgb(80,120,3)",
    "rgb(72,106,4)",
    "rgb(51,74,5)",
    "rgb(35,49,7)",
    "rgb(20,25,8)",
  ],
  sellLinearGradientArray: [
    "rgb(217,45,127)",
    "rgb(172,37,101)",
    "rgb(115,27,68)",
    "rgb(64,19,39)",
    "rgb(26,13,18)",
  ],
};

export default {
  name: 'VDepthChart',
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    customizeOptions: {
      type: [Object],
      default() {
        return defaultDayOptions;
      },
    },
    theme: {
      type: String,
      default() {
        return "day";
      },
    },
  },
  setup(props) {
    // initialize canvas
    const init = () => {
      this.watermask = this.$refs.watermask;
      this.watermaskContext = this.getContext2D(this.watermask);
      this.grid = this.$refs.grid;
      this.gridContext = this.getContext2D(this.grid);
      this.depth = this.$refs.depth;
      this.depthContext = this.getContext2D(this.depth);
      this.axis = this.$refs.axis;
      this.axisContext = this.getContext2D(this.axis);
      this.tip = this.$refs.tip;
      this.tipContext = this.getContext2D(this.tip);
      this.tipContext.translate(
        this.options.initOffset,
        this.options.initOffset
      );

      // draw watermark
      this.drawWatermask(this.watermaskContext, this.options);
      // draw grid lines
      this.drawGrid(this.gridContext, this.options);
      // draw the depth area
      this.drawDepth(this.data, this.depthContext, this.options);
      // draw axis scale ticks
      this.drawAxis(this.data, this.axisContext, this.options);
    }
    const reset = () => {
      this.watermask = this.tip = this.grid = this.depth = this.axis = null;
      this.watermaskContext = this.tipContext = this.gridContext = this.depthContext = this.axisContext = null;
    }
    // draw watermark
    const drawWatermask = (context, options) => {
      const { width, height, watermaskType, watermaskContent } = options;

      if (watermaskType === "text") {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.font = "24px Aria";
        context.textAlign = "center";
        context.fillStyle = "rgba(100,100,100,0.3)";
        context.fillText(watermaskContent, width / 2, 50);
        context.closePath();
      } else if (watermaskType === "image") {
        context.beginPath();
        const watermaskImage = new Image();
        watermaskImage.src = watermaskContent;
        watermaskImage.addEventListener('load', () => {
          context.drawImage(
            watermaskImage,
            (width - watermaskImage.width) / 2,
            10,
            watermaskImage.width,
            watermaskImage.height
          );
        });
        if (this.theme === "night") {
          context.globalAlpha = 1;
        } else {
          context.globalAlpha = 0.2;
        }
        context.closePath();
      }
    }
    // draw grid
    const drawGrid = (context, options) => {
      const {
        width,
        height,
        initOffset,
        bgColor,
        xAxisGridSpace,
        yAxisGridSpace,
        gridLineColor,
      } = options;
      context.beginPath();

      // Create vertical grid line path
      for (
        let i = initOffset + xAxisGridSpace;
        i < width;
        i += xAxisGridSpace
      ) {
        context.moveTo(i, 0);
        context.lineTo(i, height - yAxisGridSpace); // don't go out
      }
      // Create a horizontal grid line path
      for (
        let j = initOffset + yAxisGridSpace;
        j < height;
        j += yAxisGridSpace
      ) {
        context.moveTo(0, j);
        context.lineTo(width, j);
      }

      // set drawing color
      context.strokeStyle = gridLineColor;
      // Set the width of the drawn line segment
      context.lineWidth = 1;
      context.fillStyle = bgColor;
      context.fillRect(0, 0, width, height);
      // draw grid
      context.stroke();
      context.closePath();
    }
    // draw the axes
    const drawAxis = (data, context, options) => {
      // Determine if there is a corresponding depth array
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        // alert("Cannot render coordinate scale, missing key array (buy or sell)")
        // console.log("Cannot render coordinate scale, missing key array (buy or sell)")
        return;
      }
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        xAxisGridSpace,
        yAxisGridSpace,
        rulerLineColor,
        xAxisFontSize,
        yAxisFontSize,
        xAxisFontColor,
        yAxisFontColor,
        yAxisShadowColor,
      } = options;
      const yLen = height - yAxisGridSpace;
      const originData = [0, yLen];
      const allData = this.deepClone(data)
      const buyOriginData = allData.buy;
      const buyData = buyOriginData.reverse();
      const sellData = data. sell;
      const buyLen = buyData.length;
      const sellLen = sellData.length;
      const buyBasePrice = buyData[buyLen - 1].price;
      const sellBasePrice = sellData[sellLen - 1].price;
      const buyPriceDiff = buyData[0].price - buyData[buyLen - 1].price;
      const sellPriceDiff = sellData[0].price - sellData[sellLen - 1].price;
      const staticWidth = (width - buySellSpace) / 2; // single width
      const staticHeight = yLen - bottomSpace;
      const buyTotalAmount = buyData[0].amount; // Buy order full depth amount
      const sellTotalAmount = sellData[0].amount; // total depth of sell order
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // Determine the quantity corresponding to the maximum height

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(initOffset, initOffset);
      context.beginPath();

      // create a horizontal axis path
      context.moveTo(originData[0], originData[1]);
      context.lineTo(originData[0] + width, originData[1]);

      // create vertical axis path
      context.moveTo(originData[0], originData[1]);
      context.lineTo(originData[0], originData[1] - yLen);

      // Create the tick path for the y-axis
      for (let i = originData[0] + xAxisGridSpace; i < width; i += xAxisGridSpace) {
        context.moveTo(i, originData[1] - 4);
        context.lineTo(i, originData[1] + 4);
        context.font = xAxisFontSize;
        context.fillStyle = xAxisFontColor;
        // set center
        context.textAlign = "center";

        let number = 0;
        if (i <= staticWidth) {
          number = Number.parseFloat(
            (i / staticWidth) * buyPriceDiff + buyBasePrice
          ).toFixed(2);
        } else if (i > staticWidth + buySellSpace) {
          number = Number.parseFloat(
            ((i - (staticWidth + buySellSpace)) / staticWidth) * sellPriceDiff +
            sellBasePrice
          ).toFixed(2);
        } else {
          number = null;
        }

        // maxWidth is the spacing
        context.fillText(number, i, originData[1] + 18, xAxisGridSpace);
      }

      for (
        let j = originData[1] - yAxisGridSpace;
        j > originData[1] - yLen;
        j -= yAxisGridSpace
      ) {
        context.moveTo(originData[0] - 4, j);
        context.lineTo(originData[0] + 4, j);
        context.font = yAxisFontSize;
        context.fillStyle = yAxisFontColor;
        context.textAlign = "left";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = yAxisShadowColor;

        const number = Number.parseFloat(
          ((staticHeight - j) / staticHeight) * totalAmount
        ).toFixed(2);

        context.fillText(number, originData[0] + 6, j + 4);
      }

      // set drawing color
      context.strokeStyle = rulerLineColor;
      // Set the width of the drawn line segment
      context.lineWidth = 1;
      // draw the axes
      context.stroke();
      context.closePath();
      context.restore();
    }
    // draw the main depth map
    const drawDepth = (data, context, options) => {
      // Determine if there is a corresponding depth array
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        // console.log("Unable to render depth map, missing key array (buy or sell)")
        // alert("Unable to render depth map, missing key array (buy or sell)");
        return;
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
      } = options;
      const allwidth = width; // overall width
      const allheight = height - yAxisGridSpace;
      const staticWidth = (allwidth - buySellSpace) / 2; // fixed single width
      const staticHeight = allheight - bottomSpace;
      const buyPoint = [],
        sellPoint = [];
      const allData = this.deepClone(data)
      const buyOriginData = allData.buy;
      const buyData = buyOriginData.reverse();
      const sellData = data. sell;
      const buyLen = buyData.length;
      const sellLen = sellData.length;

      const buyEndOrigin = { x: staticWidth, y: staticHeight }; // buy order pen end point
      const sellEndOrigin = { x: staticWidth + buySellSpace, y: staticHeight }; // Sell order pen end point
      const buyStartOrigin = { x: 0, y: staticHeight }; // the starting point of the buy order brush edge
      const sellStartOrigin = { x: width, y: staticHeight }; // starting point of the edge of the sell order brush
      const buySidePrice = buyData[0].price; // buy edge price
      const sellSidePrice = sellData[0].price; // buy edge price
      const buyTotalAmount = buyData[0].amount; // Buy order full depth amount
      const sellTotalAmount = sellData[0].amount; // total depth of sell order
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // Determine the quantity corresponding to the maximum height
      const buyMaxPriceDiff = buyData[buyLen - 1].price - buyData[0].price; // maximum price difference for buy orders
      const sellMaxPriceDiff = sellData[0].price - sellData[sellLen - 1].price; // maximum price difference for sell order
      let pointList = [];
      // Add a buy order drawing point and make sure that the coordinate points are all integers
      buyData.forEach((item, index) => {
        const x = Math.round(
          ((item.price - buySidePrice) / buyMaxPriceDiff) * staticWidth
        );
        const y = Math. round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        buyPoint.push({ x, y });

        if (buyData[index + 1]) {
          const yDrop = Math. round(
            ((totalAmount - buyData[index + 1].amount) / totalAmount) *
            staticHeight
          );
          buyPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "buy", value: item });
      });
      // Add sell order drawing points and make sure the coordinate points are all integers
      sellData.forEach((item, index) => {
        const x = Math.round(
          width -
          ((sellSidePrice - item.price) / sellMaxPriceDiff) * staticWidth
        );
        const y = Math. round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        sellPoint.push({ x, y });
        // drop point
        if (sellData[index + 1]) {
          const yDrop = Math. round(
            ((totalAmount - sellData[index + 1].amount) / totalAmount) *
            staticHeight
          );
          sellPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "sell", value: item });
      });
      pointList = pointList.sort((a, b) => {
        return a.x - b.x;
      });
      pointList.forEach((item) => {
        this.pointMap.set([item.x, item.y, item.side], item.value);
      });

      buyPoint.push(buyEndOrigin);
      buyPoint.push(buyStartOrigin);
      sellPoint.push(sellEndOrigin);
      sellPoint.push(sellStartOrigin);
      // Initialize the center offset to ensure the line is drawn without aliasing
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(initOffset, initOffset);
      context.lineWidth = 1; // Because the center is already offset, it does not need to be set to 0.5, and setting it to 0.5 will produce aliasing
      context.lineJoin = "bevel"; // When the line and the line intersect, the shape presented is set to "miter (will not be extended to form sharp corners)"

      // Buy single stroke to draw line
      context.beginPath();
      // Set the buy order gradient fill and stroke color
      const buyLinearGradient = context.createLinearGradient(
        0,
        0,
        0,
        staticHeight
      );
      buyLinearGradient.addColorStop(0, buyLinearGradientArray[0]);
      buyLinearGradient.addColorStop(0.3, buyLinearGradientArray[1]);
      buyLinearGradient.addColorStop(0.5, buyLinearGradientArray[2]);
      buyLinearGradient.addColorStop(0.8, buyLinearGradientArray[3]);
      buyLinearGradient.addColorStop(1, buyLinearGradientArray[4]);
      context.strokeStyle = this.options.buyStrokeColor;
      context.fillStyle = buyLinearGradient;
      // connect the corresponding points
      buyPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== buyPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();

      // Sell single stroke line
      context.beginPath();
      // Set the gradient fill and stroke color of the sell order
      const sellLinearGradient = context.createLinearGradient(0, 0, 0, height);
      sellLinearGradient.addColorStop(0, sellLinearGradientArray[0]);
      sellLinearGradient.addColorStop(0.3, sellLinearGradientArray[1]);
      sellLinearGradient.addColorStop(0.5, sellLinearGradientArray[2]);
      sellLinearGradient.addColorStop(0.8, sellLinearGradientArray[3]);
      sellLinearGradient.addColorStop(1, sellLinearGradientArray[4]);
      context.fillStyle = sellLinearGradient;
      context.strokeStyle = this.options.sellStrokeColor;
      // connect the corresponding points
      sellPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== sellPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();

      context.restore();
    }
    const onMouseMove = ({ offsetX }) => {
      const {pointMap} = this;
      const {tipContext} = this;
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
      } = this.options;
      let { tipWidth } = this.options;
      const {width} = this.options;
      const height = this.options.height - yAxisGridSpace;
      for (const key of pointMap.keys()) {
        const x = key[0];
        const y = key[1];
        const side = key[2];
        const obj = pointMap.get(key);
        if (offsetX < x) {
          // clear first
          tipContext.clearRect(-10, -10, width + 20, this.options.height + 20);
          // draw the positioning dotted line
          tipContext.strokeStyle = tipLocationLineColor;
          tipContext.lineWidth = 1;
          tipContext.setLineDash([2]);
          tipContext.beginPath();
          tipContext.moveTo(0, y);
          tipContext.lineTo(width, y);
          tipContext.stroke();
          tipContext.closePath();
          tipContext.beginPath();
          tipContext.moveTo(x, 0);
          tipContext.lineTo(x, height);
          tipContext.stroke();
          tipContext.closePath();

          // draw small dots
          tipContext.beginPath();
          tipContext.lineWidth = 1;
          tipContext.setLineDash([]);
          tipContext.fillStyle =
            side === "buy"
              ? tipBuyLocationDotBgColor
              : tipSellLocationDotBgColor;
          tipContext.strokeStyle =
            side === "buy" ? tipBuyBorderColor : tipSellBorderColor;
          tipContext.arc(x, y, tipLocationDotRadius, 0, 2 * Math.PI);
          tipContext.fill();
          tipContext.stroke();
          tipContext.closePath();

          // draw the tooltip
          if (tipType === "mouse") {
            tipContext.beginPath();
            tipContext.fillStyle =
              side === "buy" ? tipBuyBgColor : tipSellBgColor;
            tipContext.font = "12px bold";
            let left = x - tipWidth / 2;
            let top = y - tipHeight - 10;
            const tipsPriceText = `Order price ${this.toThousand(obj.price)}`;
            const tipsAmountText = `Amount of delegated ${this.toThousand(obj.amount)}`;
            const maxTextWidth = Math.max(
              tipContext.measureText(tipsPriceText).width,
              tipContext.measureText(tipsAmountText).width
            );
            if (maxTextWidth + 20 > tipWidth) {
              tipWidth = maxTextWidth + 20;
            }
            if (left < initOffset) {
              left = initOffset;
            }
            if (left >= width - tipWidth) {
              left = width - tipWidth;
            }
            if (top <= 0) {
              top = y + 10;
            }
            tipContext.lineWidth = 1;
            tipContext.setLineDash([2]);
            tipContext.lineJoin = "round";
            tipContext.strokeStyle =
              side === "buy" ? tipBuyBorderColor : tipSellBorderColor;
            this.drawRoundedRect(
              tipContext,
              left,
              top,
              tipWidth,
              tipHeight,
              5,
              false,
              true
            );
            tipContext.fillStyle =
              side === "buy" ? tipBuyBgColor : tipSellBgColor;
            tipContext.fill();

            // tipContext.fillRect(left, top, tipWidth, tipHeight);
            tipContext.fillStyle =
              side === "buy" ? tipBuyTextColor : tipSellTextColor;
            tipContext.textAlign = "left";
            tipContext.shadowBlur = 0;
            const marginLeft = 10;
            const marginTop = 25;
            const lineHeight = 20;
            tipContext.fillText(
              tipsPriceText,
              left + marginLeft,
              top + marginTop
            );
            tipContext.fillText(
              tipsAmountText,
              left + marginLeft,
              top + marginTop + lineHeight
            );
            tipContext.closePath();
          } else {
            const tipsPriceText = `${this.toThousand(obj.price)}`;
            const tipsAmountText = `${obj.amount}`;
            const tipsPriceWidth =
              tipContext.measureText(tipsPriceText).width + 20;
            const tipsAmountWidth =
              tipContext.measureText(tipsAmountText).width + 15;
            const lineHeight = 20;
            // draw a tooltip on the x-axis
            tipContext.beginPath();
            tipContext.fillStyle = "#fff";
            tipContext.lineWidth = 1;
            tipContext.lineJoin = "round";
            tipContext.strokeStyle = "#e6a23c";
            tipContext.moveTo(x, height);
            tipContext.lineTo(x - 5, height + 5);
            tipContext.lineTo(x - tipsPriceWidth / 2, height + 5);
            tipContext.lineTo(x - tipsPriceWidth / 2, height + 5 + lineHeight);
            tipContext.lineTo(x + tipsPriceWidth / 2, height + 5 + lineHeight);
            tipContext.lineTo(x + tipsPriceWidth / 2, height + 5);
            tipContext.lineTo(x + 5, height + 5);
            tipContext.lineTo(x, height);
            if (this.theme === "night") {
              tipContext.fillStyle = "rgb(25,25,25)";
            } else {
              tipContext.fillStyle = "#fff";
            }
            tipContext.fill();
            tipContext.stroke();
            if (this.theme === "night") {
              tipContext.fillStyle = "#ccc";
            } else {
              tipContext.fillStyle = "#666";
            }
            tipContext.font = "12px bold";
            tipContext.textAlign = "center";
            tipContext.fillText(tipsPriceText, x, height + 19);
            tipContext.closePath();
            // draw a tooltip on the y-axis
            tipContext.beginPath();
            tipContext.fillStyle = "#fff";
            tipContext.lineWidth = 1;
            tipContext.lineJoin = "round";
            tipContext.strokeStyle = "#e6a23c";
            tipContext.moveTo(1, y);
            tipContext.lineTo(8, y - 10);
            tipContext.lineTo(8 + tipsAmountWidth, y - 10);
            tipContext.lineTo(8 + tipsAmountWidth, y + 10);
            tipContext.lineTo(8, y + 10);
            tipContext.lineTo(1, y);
            if (this.theme === "night") {
              tipContext.fillStyle = "rgb(25,25,25)";
            } else {
              tipContext.fillStyle = "#fff";
            }
            tipContext.fill();
            tipContext.stroke();
            if (this.theme === "night") {
              tipContext.fillStyle = "#ccc";
            } else {
              tipContext.fillStyle = "#666";
            }
            tipContext.font = "12px bold";
            tipContext.textAlign = "center";
            tipContext.fillText(tipsAmountText, 30, y + 4, tipsAmountWidth);
            tipContext.closePath();
          }

          break;
        }
      }
    }
    const onMouseOut = () => {
      const { width, height } = this.options;
      this.tipContext.clearRect(0, 0, width, height);
    }
    const drawRoundedRect = (context, x, y, width, height, r, fill, stroke) => {
      context.moveTo(x + r, y);
      context.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
      context.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
      context.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
      context.arcTo(x, y, x + r, y, r);
      if (fill) {
        context.fill();
      }
      if (stroke) {
        context.stroke();
      }
    }
    const getContext2D = (elem) => {
      // Determine whether it is canvas
      if (elem && elem.nodeType && elem.nodeType === 1) {
        return elem.getContext("2d");
      }
      return null;
    }
    // numbers are separated by commas
    const toThousand = (num = 0) => {
      if (typeof num === "undefined") {
        return 0;
      }
      return (num || 0).toString().replace(/\d+/, function (n) {
        const len = n.length;
        if (len % 3 === 0) {
          return n.replace(/(\d{3})/g, ",$1").slice(1);
        }
        return (
          n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ",$1")
        );

      });
    }
    const deepClone = (obj) => {
      if (obj instanceof RegExp) return new RegExp(obj);
      if (obj instanceof Date) return new Date(obj);
      if (obj === null || typeof obj !== "object") return obj; // if it is not a reference type, return directly
      const newObj = new obj.constructor(); // if obj is an array, newObj=[]; if obj is an object, newObj={}
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // Is it its own object
          newObj[key] = this.deepClone(obj[key]); // assignment
        }
      }
      return newObj;
    }

    onMounted(() => {
      if (this.theme === "night") {
        this.options = Object.assign(defaultNightOptions, props.customizeOptions);
      }
      // initialize
      init();
    })

    onUnmounted(() => {
      // reset
      reset();
    })

    watchEffect((data) => {
      this.pointMap = new Map();
      this.drawDepth(data, this.depthContext, this.options);
      this.drawAxis(data, this.axisContext, this.options);
    })
    return {
      drawWatermask,
      drawGrid,
      drawAxis,
      drawDepth,
      onMouseMove,
      onMouseOut,
      drawRoundedRect,
      getContext2D,
      toThousand,
      deepClone,
      options: Object.assign(defaultDayOptions, this.customizeOptions),
      watermask: null,
      watermaskContext: null,
      grid: null,
      gridContext: null,
      depth: null,
      depthContext: null,
      axis: null,
      axisContext: null,
      tip: null,
      tipContext: null,
      pointMap: new Map(),
    };
  },
};
</script>

<style scoped>
.content-wrap {
  position: relative;
}

canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
