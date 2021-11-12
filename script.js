const canvas1 = document.getElementById('canvas')

canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

const context1 = canvas1.getContext('2d')

const canvas2 = document.getElementById('canvas-top')

canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

const context2 = canvas2.getContext('2d')


const image = new Image()
image.src = 'https://cdn.glitch.me/1be3bc59-b422-4635-9476-f11ca80a5d2a%2F65020957073__D12BD835-7D7B-4A78-942C-B32EB7F109B2.jpg?v=1636751130622'

const scanner = document.getElementById('scanner')

let state = {
  scanX: 0,
  done: false,
  scanning: false,
}
image.addEventListener('load', evt => {
  state.width = image.width / 2,
  state.height = image.height / 2
})

canvas1.addEventListener('mousemove', evt => {
  const x = evt.clientX
  const y = evt.clientY
  
  
  const imageX = x - (state.width / 2)
  const imageY = y - (state.height / 2 )
  state.imageX = imageX
  state.imageY = imageY
  
})


document.addEventListener('keydown', evt => {
  if (evt.code === 'Space') {
    
    if (state.scanning === false) {
      state.scanning = true
      
      if (state.scanX >= canvas1.width) {
        state.scanX = 0;
        context1.clearRect(0, 0, canvas1.width, canvas1.height)
        context2.clearRect(0, 0, canvas1.width, canvas1.height)
        canvas2.style.pointerEvents = 'none'
        canvas1.style.pointerEvents = 'all'
      }
    }
    else {
      state.scanning = false;
    }
    
  }
})

const scan_width = 1


const render = () => {
  
  // draws on first image
  context1.clearRect(0, 0, canvas1.width, canvas1.height)
  context1.drawImage(
    image, 
    state.imageX,
    state.imageY,
    state.width,
    state.height,
  )

  // context2.clearRect(state.scanX, 0, canvas2.width, canvas2.height)
  
  if (state.scanning) {
    state.scanX += scan_width
    
    scanner.style.left = state.scanX + 'px'
    
    // keep contents of fi rst image on second image
    context2.drawImage(
      canvas1, 
      state.scanX, // source X start
      0,  // source Y start
      scan_width, // source width
      canvas1.height, // source height
      state.scanX, // destination X start
      0, // destination Y start
      scan_width, // destination width
      canvas1.height) // destination height
  }
  
  if (state.scanX >= canvas1.width) {
    state.scanning = false;
    state.done = true;
    canvas1.style.pointerEvents = 'none'
    canvas2.style.pointerEvents = 'all'
    context1.clearRect(0, 0, canvas1.width, canvas1.height)
  }
    
    
  
  requestAnimationFrame(render)
}

render()
