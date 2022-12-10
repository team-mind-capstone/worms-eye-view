// ============ CONTROL VARIABLES HERE ===========
// ============ CONTROL VARIABLES HERE ===========
// ============ CONTROL VARIABLES HERE ===========

// **** PLANT IMAGES ****
const img_grain_path = "https://picsum.photos/100"
// const img_grain_path = "../assets/gardenPlotImg/tree.jpg"
const img_grass_path = "../assets/gardenPlotImg/tree.jpg"
const img_herb_path = "../assets/gardenPlotImg/tree.jpg"
const img_house_path = "../assets/gardenPlotImg/tree.jpg"
const img_orn_path = "../assets/gardenPlotImg/tree.jpg"
const img_shrub_path = "../assets/gardenPlotImg/tree.jpg"
const img_tree_path = "../assets/gardenPlotImg/tree.jpg"
const img_vege_path = "../assets/gardenPlotImg/tree.jpg"
const img_vine_path = "../assets/gardenPlotImg/tree.jpg"

let img_grain
let img_grass
let img_herb
let img_house
let img_orn
let img_shrub
let img_tree
let img_vege
let img_vine

// **** OBJECT ****
let objArr = []
let objCount = 0
const objSizeX = 50
const objSizeY = 50
let petalColor = [150, 10, 50]
let centerPetalColor = [50, 100, 75]

// **** ACTUAL PLOT DETAILS ****z
const actualPlotLength = 4 //ft
const actualPlotWidth = 8 //ft
const gridSpacingRule = 1 //ft how far apart plants should be

const plotDimensionConversionConstant = 80 // 1 ft = 100 px

// **** PLOT ****
const plotLength = actualPlotLength * plotDimensionConversionConstant
const plotWidth = actualPlotWidth * plotDimensionConversionConstant
const plotSoilColor_R = 150
const plotSoilColor_G = 80
const plotSoilColor_B = 0
const plotOpacity = 90

// **** GRID ****
const gridSpacing = gridSpacingRule * plotDimensionConversionConstant
const plotColumns = plotLength / gridSpacing
const plotRows = plotWidth / gridSpacing

// SHAPES
let shapeSpawnLocationX = 50
let shapeSpawnLocationY = 50
let textSizeForPlant = 12

// UI Button
let createPlantButtonX = plotLength - 300
let createPlantButtonY = plotWidth + 90
let sel
let dropDownListX = plotLength - 310
let dropDownListY = plotWidth + 50
let plantInputTextValue = ""
let plantInputBox
let inputPositionX = dropDownListX + 65
let inputPositionY = plotWidth + 35

// PLANT OPTIONS
let plantTypeListArr = [
  "grain",
  "grass",
  "herb",
  "house",
  "orn",
  "shrub",
  "tree",
  "vege",
  "vine", //9 types
]
let selectedPlantType = plantTypeListArr[0]

// ============ CONTROL VARIABLES END ===========
// ============ CONTROL VARIABLES END ===========
// ============ CONTROL VARIABLES END ===========

function gardenPlotSketch(p) {
  p.preload = function () {
    // console.log("before", img_grain)
    // img_grain = p.loadImage(img_grain_path)
    // console.log("after", img_grain)
    // img_grass = p.loadImage(img_grass_path)
    //  img_herb = p.loadImage(img_herb_path)
    //  img_house = p.loadImage(img_house_path)
    //  img_orn = p.loadImage(img_orn_path)
    //  img_shrub = p.loadImage(img_shrub_path)
    //  img_tree = p.loadImage(img_tree_path)
    //  img_vege = p.loadImage(img_vege_path)
    //  img_vine = p.loadImage(img_vine_path)
  }

  p.setup = function () {
    p.createCanvas(plotLength, plotWidth)

    // select plant dropdown \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    sel = p.createSelect()
    sel.position(dropDownListX, dropDownListY)
    sel.option(plantTypeListArr[0])
    sel.option(plantTypeListArr[1])
    sel.option(plantTypeListArr[2])
    sel.option(plantTypeListArr[3])
    sel.option(plantTypeListArr[4])
    sel.option(plantTypeListArr[5])
    sel.option(plantTypeListArr[6])
    sel.option(plantTypeListArr[7])
    sel.option(plantTypeListArr[8])

    sel.selected(plantTypeListArr[0])
    sel.changed(mySelectEvent)

    function mySelectEvent() {
      console.log("changed a select event")
      selectedPlantType = sel.value()
      console.log(selectedPlantType)
    }

    // add plant button \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    p.button = p.createButton("add plant")
    p.button.size(250, 75)
    p.button.position(createPlantButtonX, createPlantButtonY)
    p.button.mousePressed(p.handleAddPlant)
  }

  p.handleAddPlant = function () {
    console.log("clicked add button")
    plantInputTextValue = plantInputBox.value()
    console.log("input text box value", plantInputTextValue)
    objCount++
    let tempAddObj = new Draggable(
      shapeSpawnLocationX,
      shapeSpawnLocationY,
      objSizeX,
      objSizeY,
      objCount,
      selectedPlantType,
      plantInputTextValue
    )
    objArr.push(tempAddObj)
    console.log(objArr)
  }

  // plant type input \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  plantInputBox = p.createInput()
  plantInputBox.position(inputPositionX, inputPositionY)
  plantInputBox.attribute("placeholder", "enter your plant name")

  p.draw = function () {
    // clear out old frames
    p.background(plotSoilColor_R, plotSoilColor_G, plotSoilColor_B)
    for (let x = 0; x < p.width; x += p.width / plotColumns) {
      for (let y = 0; y < p.height; y += p.height / plotRows) {
        p.stroke(0)
        p.strokeWeight(1)
        p.line(x, 0, x, p.height)
        p.line(0, y, p.width, y)
      }
    }

    objArr.forEach((curElem) => {
      curElem.over()
      curElem.update()
      curElem.show()
    })

    console.log("hi")
  }

  p.mousePressed = function () {
    objArr.forEach((curElem) => {
      curElem.pressed()
    })
  }

  p.mouseReleased = function () {
    objArr.forEach((curElem) => {
      curElem.released()
    })
  }
  p.drawFlower = function (
    flowerX,
    flowerY,
    petalSize,
    petalColor,
    centerPetalColor
  ) {
    let petalDistance = petalSize / 2

    // petal color
    p.fill(petalColor[0], petalColor[1], petalColor[2])

    // upper-left petal
    p.circle(flowerX - petalDistance, flowerY - petalDistance, petalSize)

    // upper-right petal
    p.circle(flowerX + petalDistance, flowerY - petalDistance, petalSize)

    // lower-left petal
    p.circle(flowerX - petalDistance, flowerY + petalDistance, petalSize)

    // lower-right petal
    p.circle(flowerX + petalDistance, flowerY + petalDistance, petalSize)

    // center petal
    p.fill(centerPetalColor[0], centerPetalColor[1], centerPetalColor[2])
    p.circle(flowerX, flowerY, petalSize)
  }

  class Draggable {
    constructor(x, y, w, h, id, selectedPlantType, userPlantInput) {
      this.dragging = false // Is the object being dragged?
      this.rollover = false // Is the mouse over the ellipse?
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.offsetX = 0
      this.offsetY = 0
      this.id = id
      this.plantType = selectedPlantType
      this.userPlantInput = userPlantInput
    }

    over() {
      // Is mouse over object
      if (
        p.mouseX > this.x &&
        p.mouseX < this.x + this.w &&
        p.mouseY > this.y &&
        p.mouseY < this.y + this.h
      ) {
        this.rollover = true
      } else {
        this.rollover = false
      }
    }

    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = p.mouseX + this.offsetX
        this.y = p.mouseY + this.offsetY
      }
    }

    show() {
      p.stroke(50)
      if (this.plantType === "grain") {
        // this.mask(img_grain)
        // console.log(this)
        //   p.image(img_grain, 0, 0)
        // img_grain.mask(this)
        // p.image(img_grain, 0, 0)
        // p.noFill()
        // console.log(this)

        p.fill(235, 189, 104)
        petalColor = [235, 189, 104]
        centerPetalColor = [235, 189, 104]
        p.textSize(textSizeForPlant)
        p.text(`grain: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "grass") {
        p.fill(0, 82, 33)
        petalColor = [0, 82, 33]
        centerPetalColor = [0, 82, 33]
        p.textSize(textSizeForPlant)
        p.text(`grass: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "herb") {
        p.fill(103, 133, 74)
        petalColor = [103, 133, 74]
        centerPetalColor = [103, 133, 74]
        p.textSize(textSizeForPlant)
        p.text(`herb: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "house") {
        p.fill(104, 70, 129)
        petalColor = [104, 70, 129]
        centerPetalColor = [104, 70, 129]
        p.textSize(textSizeForPlant)
        p.text(`house: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "orn") {
        p.fill(161, 49, 51)
        petalColor = [161, 49, 51]
        centerPetalColor = [161, 49, 51]
        p.textSize(textSizeForPlant)
        p.text(`orn: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "shrub") {
        p.fill(213, 184, 190)
        petalColor = [213, 184, 190]
        centerPetalColor = [213, 184, 190]
        p.textSize(textSizeForPlant)
        p.text(`shrub: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "tree") {
        p.fill(165, 100, 77)
        petalColor = [165, 100, 77]
        centerPetalColor = [165, 100, 77]
        p.textSize(textSizeForPlant)
        p.text(`tree: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "vege") {
        p.fill(231, 24, 55)
        petalColor = [231, 24, 55]
        centerPetalColor = [231, 24, 55]
        p.textSize(textSizeForPlant)
        p.text(`vege: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      } else if (this.plantType === "vine") {
        p.fill(138, 205, 222)
        petalColor = [138, 205, 22]
        centerPetalColor = [138, 205, 22]
        p.textSize(textSizeForPlant)
        p.text(`vine: ${this.userPlantInput}`, this.x - 25, this.y + 45)
      }

      // console.log(p.drawFlower)

      // p.rect(this.x, this.y, this.w, this.h)
      p.drawFlower(this.x, this.y, 25, petalColor, centerPetalColor)
      //   p.circle(this.x, this.y, this.w)
      //   p.image(img_grain, 0, 0)
    }

    pressed() {
      // Did I click on the rectangle?
      if (
        p.mouseX > this.x &&
        p.mouseX < this.x + this.w &&
        p.mouseY > this.y &&
        p.mouseY < this.y + this.h
      ) {
        this.dragging = true
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - p.mouseX
        this.offsetY = this.y - p.mouseY
      }
    }

    released() {
      // Quit dragging
      this.dragging = false
    }
  }
}

export default gardenPlotSketch

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ! try adding text to color version
// ! icons

// // ============ CONTROL VARIABLES HERE ===========
// // ============ CONTROL VARIABLES HERE ===========
// // ============ CONTROL VARIABLES HERE ===========

// // // **** PLANT IMAGES ****
// // const img_grain_path = "https://picsum.photos/100"
// // // const img_grain_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_grass_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_herb_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_house_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_orn_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_shrub_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_tree_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_vege_path = "../assets/gardenPlotImg/tree.jpg"
// // const img_vine_path = "../assets/gardenPlotImg/tree.jpg"

// let img_grain
// let img_grass
// let img_herb
// let img_house
// let img_orn
// let img_shrub
// let img_tree
// let img_vege
// let img_vine

// // **** OBJECT ****
// let objArr = []
// let objCount = 0
// const objSizeX = 50
// const objSizeY = 50

// // **** ACTUAL PLOT DETAILS ****
// const actualPlotLength = 4 //ft
// const actualPlotWidth = 8 //ft
// const gridSpacingRule = 1 //ft how far apart plants should be

// const plotDimensionConversionConstant = 80 // 1 ft = 100 px

// // **** PLOT ****
// const plotLength = actualPlotLength * plotDimensionConversionConstant
// const plotWidth = actualPlotWidth * plotDimensionConversionConstant
// const plotSoilColor_R = 150
// const plotSoilColor_G = 90
// const plotSoilColor_B = 0
// const plotOpacity = 100

// // **** GRID ****
// const gridSpacing = gridSpacingRule * plotDimensionConversionConstant
// const plotColumns = plotLength / gridSpacing
// const plotRows = plotWidth / gridSpacing

// // SHAPES
// let shapeSpawnLocationX = 50
// let shapeSpawnLocationY = 50

// // UI Button
// let createPlantButtonX = 25
// let createPlantButtonY = plotWidth + 100
// let sel
// let dropDownListX = 250
// let dropDownListY = plotWidth + 100

// // PLANT OPTIONS
// let plantTypeListArr = [
//   "grain",
//   "grass",
//   "herb",
//   "house",
//   "orn",
//   "shrub",
//   "tree",
//   "vege",
//   "vine", //9 types
// ]
// let selectedPlantType = plantTypeListArr[0]

// function gardenPlotSketch(p) {
//   let rects
//   let dragRec
//   let isDragging
//   let clickOffset
//   let imgCb

//   p.preload = function () {
//     imgCb = p.loadImage("https://picsum.photos/100")
//   }

//   p.setup = function () {
//     p.createCanvas(plotLength, plotWidth)

//     rects = []

//     // select plant dropdown
//     sel = p.createSelect()
//     sel.position(dropDownListX, dropDownListY)
//     sel.option(plantTypeListArr[0])
//     sel.option(plantTypeListArr[1])
//     sel.option(plantTypeListArr[2])
//     sel.option(plantTypeListArr[3])
//     sel.option(plantTypeListArr[4])
//     sel.option(plantTypeListArr[5])
//     sel.option(plantTypeListArr[6])
//     sel.option(plantTypeListArr[7])
//     sel.option(plantTypeListArr[8])

//     sel.selected(plantTypeListArr[0])
//     sel.changed(mySelectEvent)

//     function mySelectEvent() {
//       console.log("changed a select event")
//       selectedPlantType = sel.value()
//       console.log(selectedPlantType)
//     }

//     // add plant button
//     p.button = p.createButton("add plant")
//     p.button.position(createPlantButtonX, createPlantButtonY)
//     console.log("hi @@@@@@@@@@@@@@@@@@@@@@ ")
//     // p.button.mousePressed(p.handleAddPlant)
//     p.button.mousePressed(p.tempHandle)

//     p.tempHandle = function () {
//       console.log("basic button handle")
//     }

//     p.handleAddPlant = function () {
//       console.log("clicked add button")
//       objCount++
//       let pos = randomPos()
//       let tempAddObj = new RectangleImage(
//         pos,
//         imgCb,
//         shapeSpawnLocationX,
//         shapeSpawnLocationY,
//         objSizeX,
//         objSizeY,
//         objCount,
//         selectedPlantType
//       )
//       objArr.push(tempAddObj)
//       console.log(objArr)
//     }

//     placeImages()
//     console.log(rects)

//     isDragging = false
//   }

//   function placeImages() {
//     var numImage = 5
//     for (var i = 0; i < numImage; i++) {
//       let pos = randomPos()
//       rects.push(new RectangleImage(pos, imgCb))
//     }
//   }

//   class RectangleImage {
//     constructor(pos, img) {
//       this.pos = pos // vector with x and y
//       this.img = img
//       this.width = img.width
//       this.height = img.height
//     }

//     draw() {
//       p.image(this.img, this.pos.x, this.pos.y)
//     }

//     hits(hitpos) {
//       if (
//         hitpos.x > this.pos.x &&
//         hitpos.x < this.pos.x + this.width &&
//         hitpos.y > this.pos.y &&
//         hitpos.y < this.pos.y + this.height
//       ) {
//         return true
//       }
//       return false
//     }
//   }

//   function randomPos() {
//     return p.createVector(
//       p.random(0, p.windowWidth),
//       p.random(0, p.windowHeight)
//     )
//   }

//   function manualVectorSub(v1, v2) {
//     let v3_x = v1.x - v2.x
//     let v3_y = v1.y - v2.y
//     let v3 = p.createVector(v3_x, v3_y)
//     return v3
//   }

//   p.draw = function () {
//     // p.clear()
//     p.background(plotSoilColor_R, plotSoilColor_G, plotSoilColor_B)
//     for (let x = 0; x < p.width; x += p.width / plotColumns) {
//       for (let y = 0; y < p.height; y += p.height / plotRows) {
//         p.stroke(0)
//         p.strokeWeight(1)
//         p.line(x, 0, x, p.height)
//         p.line(0, y, p.width, y)
//       }
//     }

//     rects.forEach((r) => r.draw())
//   }

//   p.mousePressed = function () {
//     let m = p.createVector(p.mouseX, p.mouseY)
//     let index
//     console.log("in mouse pressed =====================")
//     console.log("rects", rects)

//     if (rects) {
//       rects.forEach((r, i) => {
//         if (r.hits(m)) {
//           clickOffset = manualVectorSub(r.pos, m)
//           isDragging = true
//           dragRec = r
//           index = i
//         }
//       })
//     }

//     if (isDragging) {
//       putOnTop(index)
//     }
//   }

//   function putOnTop(index) {
//     rects.splice(index, 1)
//     rects.push(dragRec)
//   }

//   p.mouseDragged = function () {
//     if (isDragging) {
//       let m = p.createVector(p.mouseX, p.mouseY)
//       dragRec.pos.set(m).add(clickOffset)
//     }
//   }

//   p.mouseReleased = function () {
//     isDragging = false
//   }

//   // p.windowResized = function () {
//   //   p.resizeCanvas(p.windowWidth, p.windowHeight)
//   // }
// }

// export default gardenPlotSketch