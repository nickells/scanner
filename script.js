const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')

const image = new Image()
image.src = 'https://cdn.glitch.me/8f207867-584a-4e33-ba8a-e5f07660b828%2F1.png?v=1636498924289'

let state = {}
image.addEventListener('load', evt => {
  state.width = image.width / 2,
  state.height = image.height / 2
})

canvas.addEventListener('mousemove', evt => {
  const x = evt.clientX
  const y = evt.clientY
  
  
  const imageX = x - (state.width / 2)
  const imageY = y - (state.height / 2 )
  state.imageX = imageX
  state.imageY = imageY
  
})


canvas.addEventListener('mousedown', evt => {
  state.scanning = true
  state.scanX = 0
})

const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, state.imageX, state.imageY, state.width, state.height)
  
  if (state.scanning) {
    state.scanX += 2
    context.strokeStyle = 'black'
    context.strokeWidth = 1
    context.beginPath()
    context.moveTo(state.scanX, 0)
    context.lineTo(state.scanX, canvas.height)
    context.stroke()  
    context.drawImage(canvas, 0, 0, state.scanX, canvas.height)
  }
  
  requestAnimationFrame(render)
}

render()