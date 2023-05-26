const users = JSON.parse(localStorage.getItem('users-project')) ?? [];
const id = JSON.parse(localStorage.getItem('id'));


renderPerfil();
function renderPerfil(){
    //pegar o content da imagem
    const contPerfil = document.querySelector('.imagem');
    //inicializar 
    contPerfil.innerText = '';
    //criar uma tag img 
    const img = document.createElement('img');
    //pegar a imagem do usuario
    img.setAttribute('src',`../imagens/usuarios/masculino/user${id}.jpg`);
    //criar um titulo h4 para 
    const h4 = document.createElement('h4');
    //pegar o nome do usuario e atribbuir no titulo
    h4.appendChild(document.createTextNode(`${users[id].nome}`));
    //Adicionar img ,h4 e botao no container
    contPerfil.appendChild(img)
    contPerfil.appendChild(h4)

    //Criar um menu
    const nav = document.createElement( 'div' );
    nav.className = 'nav';
    //Criar a lista ul
    const ul = document.createElement( 'ul' );
    //criar o primeiro elemento da lista
    const li1 = document.createElement( 'li' );
    //atribuir o nome da class
    li1.className = 'edit'
    //criar o icon 
    const icon = document.createElement( 'i' );
    icon.className = 'fas fa-edit';
    //adiconar o icon
    li1.appendChild( icon );
    //adicionar o texto
    li1.appendChild( document.createTextNode( 'Editar' ) )
    //criar  ossegundo elemento da lista
    const li2 = document.createElement( 'li' );
    //criar um link
    const link = document.createElement( 'a' );
    //atribuir href no link
    link.setAttribute( 'href',  '#' )
    //adiconar o texto
    link.appendChild( document.createTextNode( 'Voltar' ) );
    //Adicionar o link no elemento li2
    li2.appendChild( link );

    //adicionar os dois elementos na lista ul
    ul.appendChild( li1 );
    ul.appendChild( li2 );
    //adicionar a lista na nav menu
    nav.appendChild( ul );

    //adicionar o menu no container geral de  imagem 
    contPerfil.appendChild( nav )

    //botao salvar
    document.querySelector(".botao").style.display="none";
    
    //Atribuir valores nos inputs
    const inputs = document.querySelectorAll('.dados input');
    inputs[0].value = users[id].nome
    inputs[1].value = users[id].email
    inputs[2].value = users[id].tel
    inputs[3].value = users[id].morada
    inputs[4].value = users[id].ano
    inputs[5].value = users[id].sexo
    inputs[6].value = users[id].pass

    //inicializar os inputs
    inputs.forEach(element => {
        element.style.background= "transparent";
        element.style.color="white";
        element.disabled = true;
    });
}

document.querySelectorAll(".nav ul li")[0].addEventListener("click",()=>{
    const inputs = document.querySelectorAll('.dados input');
    
    inputs.forEach(element => {
        element.style.background= "rgb(224, 224, 224)";
        element.style.color="black";
        element.disabled = false;
    });

    document.querySelector(".botao").style.display="block";
})
//voltar na pagina principal
document.querySelector( '.nav ul li a ').addEventListener( 'click' , () => {
    //'../principal/principal.html'
    //chamar o modal de loading
    callModal( 'load' , 0 );
    //mudar de pagina depois de 2 segundos
    setTimeout(() => {
        //limpar o amibiente anterior
        changeEvaroment( false );
        window.open( '../principal/principal.html' , '_bblank' )
    }, 2000 );
})

document.querySelector(".dados .botao").addEventListener("click",()=>{
    //chamar o modal
    callModal( 'load', 0)
    const inputs = document.querySelectorAll('.dados input');
    //Atribuir novos valores do user
    users[id].nome = inputs[0].value
    users[id].email= inputs[1].value
    users[id].tel  = inputs[2].value
    users[id].morada= inputs[3].value
    users[id].ano  = inputs[4].value
    users[id].sexo = inputs[5].value
    users[id].pass = inputs[6].value

    //guardar as alteracoes
    localStorage.setItem("users-project",JSON.stringify(users));
    // renderizar
    renderPerfil()
    //chamar o modal de confirmação depois de 2 segundos
    setTimeout( () => {
        callModal( 'confirm' , 'Salvo com sucesso ! ')
        //limpar o ambiente depois de 2 segundos
        setTimeout(() => {
            changeEvaroment( false );
        }, 2000 );
    } , 2000 )
})

//Criar modal
function createModal ( type, text ) {
    const contentModal = document.querySelector( '.content-modal' );
    contentModal.innerHTML = ''
    switch ( type ) {
        case 'load' : {
            //criar o modal do loading
            const modalLoad = document.createElement( 'div' );
            //atribuir className
            modalLoad.className = 'modal loading';
            //criar um paragrafo 
            const paragrafoLoad = document.createElement( 'p' );
            //adicionar um texto no paragrafo
            paragrafoLoad.innerHTML = 'Carregando...'
            //criar um content load
            const contentLoad = document.createElement( 'div' )
            //atribuir classname
            contentLoad.className = 'load-content'
            //crair load e adicionar no content
            for( let i  = 1 ; i<= 3 ; i++ ) {
                const load = document.createElement( 'div' );
                load.className = `load load-${ i }`
                contentLoad.appendChild( load )
            }
            //adiconar o paragrafo e content
            modalLoad.appendChild( paragrafoLoad );
            modalLoad.appendChild( contentLoad );
            contentModal.appendChild( modalLoad );

            break;
        }
        case 'confirm' : {
           //criar o modal confirma
           const modalConfirm = document.createElement( 'div' );
           //atribuir uma class
           modalConfirm.className = 'modal confirme';
           //criar um confirme item
           const confirmItem = document.createElement( 'div' );
           //atricuir uma class
           confirmItem.className = 'confirme-item';
           //criar um paragrafo e adicionar um texto
           const paragrafoConfirm = document.createElement( 'p' );
           paragrafoConfirm.innerHTML = `${ text }`;
           //adicionar os elementos no modal
           modalConfirm.appendChild( confirmItem );
           modalConfirm.appendChild( paragrafoConfirm );
           // adicionar no body
           contentModal.appendChild( modalConfirm );
           break ;
        }
        case 'ask' : {
           //criar um modal de pergunta
           const modalAsk = document.createElement( 'div' );
           //atribuir o nome da class
           modalAsk.className = 'modal asker';
           //criar um paragrafo
           const paragrafoAsk = document.createElement( 'p' );
           //adicionar um texto no paragrafo
           paragrafoAsk.innerHTML = `${ text }`;
           //criar content dos botoes
           const contentAsk = document.createElement( 'div' );
           //adicionar nome da class
           contentAsk.className = 'asker-btn';
           //criar os botoes com os nomes das duas class
           const askBtn1 = document.createElement( 'button' );
           askBtn1.className  = 'btn-negative';
           askBtn1.innerHTML = 'Não'
           const askBtn2 = document.createElement( 'button' );
           askBtn2.className  = 'btn-posetive';
           askBtn2.innerHTML = 'sim'
           //adicionar os botoes no content
           contentAsk.appendChild( askBtn1 )
           contentAsk.appendChild( askBtn2 )
           //adiconar o paragrafo e content butoes no modal
           modalAsk.appendChild( paragrafoAsk );
           modalAsk.appendChild( contentAsk );
           //adicionar o modal no body
           contentModal.appendChild( modalAsk );
           break;
        } 
        case 'alert' : {
            //criar um modal
            const modalAlert = document.createElement( 'div' );
            //atribuir o nome na class
            modalAlert.className   = 'modal alert';
            //criar um icon
            const iconAlert = document.createElement( 'i' );
            // Atribuir o  nome da class
            iconAlert.className = 'fas fa-warning';
            //criar um paragrafo
            const paragrafoAlert = document.createElement( 'p' );
            //adicionar um texto no paragrafo
            paragrafoAlert.innerHTML = `${ text }`;
            //criar um botão 
            const alertBtn = document.createElement( 'button');
            //Adicionar texto
            alertBtn.innerText = 'Sair';
            //Atribuir um evento de clique
            alertBtn.setAttribute( 'onclick' , `saveModal() ` )
            //atriuir um nome na class
            alertBtn.className = 'saiar-alert';
            //adicionar os elementos no modal
            modalAlert.appendChild( iconAlert );
            modalAlert.appendChild( paragrafoAlert );
            modalAlert.appendChild( alertBtn );
            //adicionar o modal no body
            contentModal.appendChild( modalAlert )
            break;
        }
    }
}
//function que organizar o ambiente para chamar o modal
function callModal( type , typeText ) {
    //mudar o ambiente
    changeEvaroment( true )
    //criar o modal
    createModal( type ,typeText )
}
//function que guarda o modal
function saveModal( type ) {
    
    document.querySelector( '.content-modal').innerHTML = '';
    
    changeEvaroment( false )
}
//function que muda o ambiente
function changeEvaroment ( type ) {
    const arrayContents = [ document.querySelector( 'header') , document.querySelector( 'section') , document.querySelector( 'footer')]
    if( type ) {
        arrayContents.map( ( element ) => {
            element.style.opacity = .2
        })
        document.body.style.background = 'rgba(40, 38, 38, 1)'
    } else {
        arrayContents.map( ( element ) => {
            element.style.opacity = 1
        })
        document.body.style.background = 'transparent'
        //Pegar o modal content
        const contentModal = document.querySelector( '.content-modal' );
        //inicializar o modal content
        contentModal.innerHTML = ''
    }
}
