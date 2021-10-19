import handleDrop from './handleDrop'
import './components/toggle-builder-mode'
import './components/toggle-show-code'
import './components/export-to-jsfiddle'
import './components/inspector-panel'
import './components/clear-editor'
import './components/editor-menu'
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
