const canvas1 = document.getElementById('canvas1')

canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

const context1 = canvas1.getContext('2d')

const image = new Image()
image.src = 'https://cdn.glitch.me/8f207867-584a-4e33-ba8a-e5f07660b828%2F1.png?v=1636498924289'

let state = {}
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


canvas1.addEventListener('mousedown', evt => {
  state.scanning = true
  state.scanX = 0
})

const render = () => {
  context1.clearRect(state.scanX, 0, canvas1.width, canvas1.height)
  context1.drawImage(image, state.imageX, state.imageY, state.width, state.height)

  
  if (state.scanning) {
    state.scanX += 2
    context1.strokeStyle = 'black'
    context1.strokeWidth = 1
    context1.beginPath()
    context1.moveTo(state.scanX, 0)
    context1.lineTo(state.scanX, canvas1.height)
    context1.stroke()  
    context1.drawImage(
      canvas1, 
      0, // source X start
      0,  // source Y start
      state.scanX, // source width
      canvas1.height, // source height
      0, // destination X start
      0, // destination Y start
      state.scanX, // destination width
      canvas1.height) // destination height
  }
    
    
  
  requestAnimationFrame(render)
}

render()