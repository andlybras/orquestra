from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

def login_view(request):
    error_message = None  # Inicia a variável de erro como nula

    # Se o método da requisição for POST, significa que o formulário foi enviado
    if request.method == 'POST':
        # Pega os dados enviados pelo formulário
        username_data = request.POST.get('username')
        password_data = request.POST.get('password')

        # Usa a função "authenticate" do Django para verificar as credenciais
        # Ela retorna o objeto do usuário se for válido, ou None se for inválido
        user = authenticate(request, username=username_data, password=password_data)

        # Se o usuário for válido (não for None)
        if user is not None:
            # Usa a função "login" do Django para criar a sessão do usuário
            login(request, user)
            # Redireciona o usuário para a página do dashboard
            return redirect('dashboard')
        else:
            # Se o usuário for inválido, define uma mensagem de erro
            error_message = 'Usuário ou senha inválidos. Tente novamente.'

    # Se a requisição for GET (primeiro acesso à página) ou se o login falhou,
    # renderiza a página de login. Se houver um erro, ele será enviado para o template.
    context = {'error': error_message}
    return render(request, 'core/login.html', context)


@login_required
def dashboard_view(request):
    return render(request, 'core/dashboard.html')


# Mantenha as outras views de conteúdo parcial aqui embaixo
@login_required
def notificacoes_content_view(request):
    return render(request, 'partials/notificacoes.html')