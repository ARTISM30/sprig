const player = "p"
const player2 = "P"
const target = "T"
const othertarget = 't'
const arrow = "A"
const otherarrow = "a"
const ground_grass = 'g'
let score = 0
let score2 = 0
let timer = 30

setLegend(
  [player, bitmap`
................
................
.........C......
.........1C.....
.........1.C....
.........1..C...
..000...00...C..
.0070000000...C.
.0777777770000C.
.0725772570...C.
.0725772570..C..
.0777777770.C...
.007777770.C....
..00000000C.....
...0....0.......
...0....0.......`],
  [player2, bitmap`
................
................
....00...C......
..004400.1C.....
.0044440.1.C....
.044444401..C...
.044D4D401...C..
.044D4D401....C.
.0444444000000C.
.044444440....C.
.044444440...C..
.044444440..C...
.004444440.C....
..0000000CC.....
...0....0.......
...0....0.......`],
  [target, bitmap`
................
................
................
................
................
.......4D.......
......4D4.......
...66664........
..666666........
..666666........
..666666........
...6666.........
................
................
................
................`], [arrow, bitmap`
................
................
................
................
................
................
...H.H.....0....
....H.H.....0...
...00000000000..
....H.H.....0...
...H.H.....0....
................
................
................
................
................`],
  [otherarrow, bitmap`
................
................
................
................
................
................
...8.8.....0....
....8.8.....0...
...00000000000..
....8.8.....0...
...8.8.....0....
................
................
................
................
................`], [othertarget, bitmap`
................
................
.......44.......
......4..4......
.....4....4.....
....4......4....
...333....333...
..33333..33333..
..33333..33333..
..33333..33333..
...333....333...
................
................
................
................
................`],  [ground_grass, bitmap`
DDDDDDDDDDDDDDDD
DD444DDDDDDDDDDD
D4DD444D4DD44DDD
DD4DDD44DDDDDDDD
DDD4DDD44DDDDDDD
DDDD4DDDDDDDDD4D
DDDDDDDD4D4D4DDD
DD4DDD4DDDDDDDDD
DDDDDDDDDDDD44DD
DDDDDDDDD4D4DDDD
D4DDD44DDDD4DDDD
D4DDDDDD44DDDDDD
DDDDDDDDDDDD444D
DD4DD4D4DDD4DDDD
DDDD4DD4DDDDDDDD
DDDDDDDDDDDDDDDD`],

)

setSolids([target, othertarget])
let threshold = 0.35
let level = 1
const levels = [
  map`
.........
..p......
.........
.........
.........
.........
..P......
.........`,map`
........
....T...
.....T..
..P..aT.
..p..AT.
.....T..
....T...
........`,map`
.......
.......
...aT..
.P.aT..
...aT..
.......
.......`,map`
.......
.......
...AT..
.p.AT..
...AT..
.......
.......`,map`
......
......
.P.aT.
.p.AT.
......
......`
]

setMap(levels[level])
setBackground(ground_grass)
setPushables({
  [player]: []
})

const updateArrows = () => {
  if(level === 0){
  if(getAll(arrow).length > 0){
    if (getFirst(arrow).x >= 8) {
      getFirst(arrow).remove()
    }else{
    getFirst(arrow).x += 1
    }
  if(tilesWith(arrow,target).length > 0 || tilesWith(arrow,othertarget).length > 0){
    clearTile(getFirst(arrow).x,getFirst(arrow).y)
    score+=1
  }
}
  }
}

const updateotherArrows = () => {
  if(level === 0){
  if(getAll(otherarrow).length > 0){
    if (getFirst(otherarrow).x >= 8) {
      getFirst(otherarrow).remove()
    }else{
    getFirst(otherarrow).x += 1
    }
  if(tilesWith(otherarrow,target).length > 0 || tilesWith(otherarrow,othertarget).length > 0){
    clearTile(getFirst(otherarrow).x,getFirst(otherarrow).y)
    score2 += 1
 
  }
}
  addText("P1: \n" + score.toString(),{x:1,y:1,color: color`0`})
  addText("P2: \n" + score2.toString(),{x:1,y:13,color: color`0`})
  let x = timer.toString()
  if (timer < 10){
    x = "0"+timer.toString()
  }
  addText(x,{x:1,y:7,color: color`0`})
  }
}

const updateTarget = () => {
  if(level === 0){
  if (Math.random() > threshold) {
    if (Math.random() > 0.5) {
      addSprite(Math.floor(Math.random() * 5) + 4, 0, target)
    } else {
      addSprite(Math.floor(Math.random() * 5) + 4, 7, othertarget)
    }
  }
  for(let i = 0; i < getAll(target).length; i++){
        if (getAll(target)[i].y === height-1) {
      getAll(target)[i].remove()
    }
  }
  for (let i = 0; i < getAll(target).length; i++) {
    getAll(target)[i].y += 1;
  }
  for(let i = 0;  i < getAll(othertarget).length; i++){
        if (getAll(othertarget)[i].y === 0) {
      getAll(othertarget)[i].remove()
    }
  }
  for (let i = 0; i < getAll(othertarget).length; i++) {
    getAll(othertarget)[i].y -= 1;
  }
  }
}

const handleReset = () => {
  if(level !== 0 && level !== 1){
    onInput("j", () => {
    clearText()
    level = 0
      setMap(levels[level])
    })
  }
}

const updateTimer = () =>{
  if (timer <= 0){
    if (score > score2){
      clearText()
      level = 3
      timer = 30
      setMap(levels[level])
      addText("Blueberry Wins!\n\n\n\n\n\n\n\n\n\n\nPress J to reset",{x:2,y:1,color: color`7`})
      setInterval(handleReset,1)
    }
    if (score < score2){
      clearText()
      level = 2
      timer = 30
      setMap(levels[level])
      addText("Pear Wins!\n\n\n\n\n\n\n\n\n\n\nPress J to reset",{x:2,y:1,color: color`4`})
          setInterval(handleReset,1)
    }
    if (score == score2){
      clearText()
      timer = 30
      level = 4
      setMap(levels[level])
      addText("It's a Draw...\n\n\n\n\n\n\n\n\n\n\nPress J to reset",{x:2,y:1,color: color`3`})
            setInterval(handleReset,1)

    }
  }
  if(level === 0){
  timer-=1;
  }
}



setInterval(updateArrows, 100);
setInterval(updateotherArrows, 100);
setInterval(updateTarget, 500);
setInterval(updateTimer, 1000);

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  if(tilesWith(arrow).length === 0){
  addSprite(getFirst(player).x + 1, getFirst(player).y, arrow)
  }
})

onInput("i", () => {
  getFirst(player2).y -= 1
})
onInput("k", () => {
  getFirst(player2).y += 1
})
onInput("l", () => {
  if(tilesWith(otherarrow).length === 0){
  addSprite(getFirst(player2).x + 1, getFirst(player2).y, otherarrow)
  }
})




if (level === 1){
  addText("Fruity fun \n\n\n\n\n\n\n\n\n\n\n\n\nPress A to start",{x:2,y:1,color:color`3`})
  onInput("a", () => {
    clearText(),
    level = 0
    setMap(levels[level])
  })
}
afterInput(() => {

})