import handleDrop from './handleDrop';

(function () {
  const editor = document.getElementById('editor');

  editor.addEventListener('dragover', (ev) => {
    ev.preventDefault();
  });

  editor.addEventListener('drop', handleDrop);

  document.addEventListener('dragstart', (ev) => {
    if (ev.target.classList.contains('drag-item')) {
      ev.dataTransfer.setData('id', ev.target.id);
    }
  });
})();
