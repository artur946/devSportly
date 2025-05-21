function abrirModalCadastro() {
    const modal = document.getElementById('janelaModalCadastro');
    modal.classList.add('abrir');
  
    modal.addEventListener('click', (e) => {
      if (e.target.id == 'janelaModalCadastro') {
        modal.classList.remove('abrir');
      }
    });
  }