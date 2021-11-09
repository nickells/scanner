const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')

const image = new Image()
image.src = 'https://via.placeholder.com/512x512'

image.addEventListener('load', event => {
  console.log(event)
  context.drawImage(image, 0, 0)
})

const state = {}

canvas.addEventListener('mousemove', evt => {
  const x = evt.clientX
  const y = evt.clientY
  
  const imageX = x - (image.width / 2)
  const imageY = y - (image.height / 2 )
  context.drawImage(image, imageX, imageY)
})

const render = () => {
  
  requestAnimationFrame(render)
}

render()