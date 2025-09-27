// Espera todo o conteúdo da página carregar antes de rodar o script.
document.addEventListener('DOMContentLoaded', function() {
    
    // Lógica do botão de revelar senha (que já tínhamos)
    // ... (mantenha o código anterior aqui se desejar)

    // NOVA LÓGICA PARA NAVEGAÇÃO AJAX DO DASHBOARD
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPanel = document.getElementById('content-panel');

    // Verifica se estamos na página do dashboard
    if (navLinks.length > 0 && contentPanel) {
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Impede a navegação padrão do link

                const url = this.dataset.url; // Pega a URL do atributo 'data-url'

                if (!url || url === '#') {
                    return; // Não faz nada se a URL não existir
                }

                // Efeito visual de link ativo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Busca o conteúdo na URL especificada
                fetch(url)
                    .then(response => response.text()) // Converte a resposta em texto (HTML)
                    .then(html => {
                        contentPanel.innerHTML = html; // Insere o HTML no painel de conteúdo
                    })
                    .catch(error => {
                        contentPanel.innerHTML = `<p>Ocorreu um erro ao carregar o conteúdo.</p>`;
                        console.error('Erro na requisição AJAX:', error);
                    });
            });
        });
    }
});