import handleDrop from './handleDrop'
import './components/toggle-builder-mode'
import './components/toggle-show-code'
;(function () {
  const editor = document.getElementById('editor')

  editor.addEventListener('dragover', (ev) => {
    ev.preventDefault()
  })

  editor.addEventListener('drop', handleDrop)

  document.addEventListener('dragstart', (ev) => {
    if (ev.target.classList.contains('drag-item')) {
      ev.dataTransfer.setData('id', ev.target.id)
    }
  })
})()
