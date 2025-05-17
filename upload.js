// Функции для drag and drop

const dropArea = document.getElementById('drop_area');
const nameInput = document.getElementById('name_input');
const descriptionInput = document.getElementById('description_input');
const uploadProgress = document.getElementById('upload_progress');

dropArea.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      uploadFile(fileInput.files[0]);
    }
  };
  fileInput.click();
});

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', e => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) {
    uploadFile(e.dataTransfer.files[0]);
  }
});

function uploadFile(file) {
  if (!nameInput.value) {
    alert('Введите название изображения');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', nameInput.value);
  formData.append('description', descriptionInput.value);

  uploadProgress.textContent = 'Загрузка...';

  fetch('/upload_image', {
    method: 'POST',
    body: formData
  })
  .then(resp => resp.json())
  .then(data => {
    if (data.success) {
      uploadProgress.textContent = 'Файл успешно загружен: ' + data.filename;
      nameInput.value = '';
      descriptionInput.value = '';
    } else {
      uploadProgress.textContent = 'Ошибка: ' + data.error;
    }
  })
  .catch(() => {
    uploadProgress.textContent = 'Ошибка загрузки';
  });
}
