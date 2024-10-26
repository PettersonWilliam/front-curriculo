const mostrarNomeArquivo = () => {
    const fileInput = document.getElementById('file');
    const selectedFileName = document.getElementById('selectedFileName');
    const file = fileInput.files[0];

    if (file) {
        selectedFileName.textContent = `Arquivo selecionado: ${file.name}`;
    } else {
        selectedFileName.textContent = '';
    }
}

const validarArquivo = () => {
    const fileInput = document.getElementById('file');
    const fileError = document.getElementById('fileError');
    const fileList = document.getElementById('fileList');
    const fileContent = document.getElementById('fileContent');
    const file = fileInput.files[0];

    if (!file) {
        const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
        alertModal.show();
        fileInput.classList.add('is-invalid');
        return;
    }

    const fileName = file.name;
    const validExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'txt'];
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
        fileError.textContent = 'Formato de arquivo inválido. Permitidos: ' + validExtensions.join(', ');
        fileInput.classList.add('is-invalid');
        return;
    }

    fileError.textContent = '';
    fileInput.classList.remove('is-invalid');

    // Adiciona o arquivo à lista
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.textContent = fileName;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Deletar';
    deleteButton.onclick = (event) => {
        event.stopPropagation();
        fileList.removeChild(listItem);
        fileContent.innerHTML = '';
    };

    listItem.appendChild(deleteButton);
    listItem.onclick = () => mostrarConteudoArquivo(file);
    fileList.appendChild(listItem);

    // Limpa o campo de entrada e o nome do arquivo selecionado
    fileInput.value = '';
    document.getElementById('selectedFileName').textContent = '';
}

const mostrarConteudoArquivo = file => {
    const fileContent = document.getElementById('fileContent');
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.src = content;
            img.className = 'img-fluid';
            img.style.maxWidth = '500px'; // Redimensiona a imagem
            fileContent.innerHTML = '';
            fileContent.appendChild(img);
        } else {
            fileContent.innerHTML = `<pre>${content}</pre>`;
        }
    };

    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file);
    }
}