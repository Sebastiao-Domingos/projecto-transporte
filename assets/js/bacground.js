//Class pessoa
class Pessoa{
    constructor(nome,ano,email,tel,morada,sexo,pass,file,id){
        this.nome = nome;
        this.ano = ano;
        this.email = email;
        this.tel = tel;
        this.morada = morada;
        this.sexo = sexo;
        this.pass = pass;
        this.file = file;
        this.id = id;
    }
}
//Pegar os usuarios no localStorage
const users = JSON.parse( localStorage.getItem( 'users-project' ) ) ?? [];
//Animação da tela de sign in
document.querySelector('#sign-in').addEventListener('click', trazTelaSign  )
//function que traz a tela sign in
function trazTelaSign( ) {
    const contTexto = document.querySelector('.conteudo')
    const contSign=document.querySelector('.cont-sign-in')
    
    contTexto.style.animation='vai-content .5s forwards';
    contSign.style.animation= 'vem-content .5s forwards';
}
//Animação do input
function subir( type , mov ) {
    let labels = document.querySelectorAll(".texto")
    let inputs = document.querySelectorAll('input')

    if(mov===1){
        labels.forEach((elem,index)=>{
            if(index===type){
                elem.style.animation='subir .5s forwards';
            }else{
                if(!inputs[index].value)
                    elem.style.animation='';
            }
        })
    }else{
        labels.forEach((elem,index)=>{
            if(!inputs[index].value)
                elem.style.animation='';
            
        })
    }
}
//Animação e validação dos dados do sign up
function signUp( type , mov ) {
    //pegar as telas de sign up
    const signs = document.querySelectorAll( ".sign" )
    //Pegar os inputs
    const inputs =  document.querySelectorAll( '.input' )
    let preenchido = false;
    //verificar se o email existe
    const  emailExiste = verificar( inputs[2].value , null );
    //verificar se o no email existe o caracter @
    const correctoEmail = verifEmail( inputs[ 2 ].value )
    //Validar os inputs caso estejam vazios
    switch ( type ) {
        case 1:
            preenchido = verifCamposVazios( [ inputs[ 0 ].value , inputs[ 1 ].value , inputs[ 2 ].value ] ) ;
            break;
        case 2:
            preenchido = verifCamposVazios( [ inputs[ 3].value  , inputs[ 4 ].value ] );
            break;
        default:
            preenchido = true//verifCamposVazios( [ inputs[ 5 ].value , inputs[ 6 ].value ]);
            break;
    }
    //se estiver preenchido , agora verificar se o email ja existe ou se não foi escrita correctamente
    if( preenchido ){
        // verificar se o email digitado é mesmo um email
        if( correctoEmail ) {      
            //verificar se o email existe
            if( !emailExiste ) {
                //verificar a posicao da tela
                if ( mov === 0 ) {
                    //trocar para a proxima tela
                    signs.forEach((elem, index)=>{
                        if(index!==type){
                            if(index<type){
                                elem.style.left='-50%';
                                elem.style.animation="";
                            }else{
                                elem.style.left ='-150%'
                                elem.style.animation="";
                            }
                        }else{
                            elem.style.animation='vem-content .5s forwards';
                            elem.style.left='36%'; 
                        }
                    })
                }else{
                    //este é para sentido diferente 
                    signs.forEach((elem, index)=>{
                        if(index!==type){
                            if(index<type){
                                elem.style.left='-50%';
                                elem.style.animation="";
                            }else{
                                elem.style.left ='150%'
                                elem.style.animation="";
                            }
                        }else{
                            elem.style.animation='voltar-content .5s forwards';
                        }
                
                    })
                }
            }else{
                callModal( 'alert' , 'Já existe alguem cadastrado com este email!')
            }
        } else {
            callModal( 'alert', 'Email mal digitado , ...@.... ! ')
        }
    }else{
        callModal( 'alert' , 'Por favor, preencha todos os campos ! ')
    }    
}
//function que verifica email
function verifEmail ( email1 ) {
    let tem = true ;
    //procurar o caracter @
    const position = email1.search( /[a-z0-9]@[a-z]/ );
    //verificar o Caracter
    if( position === -1 ) {
        tem  = false ;
    }
    return tem
}
//fucntion que verifica se os campos foram preenchidos
function verifCamposVazios( array  ) {
    //verificar se todos os campos foram preenchidos
    const tem = array.every( ( element ) => {
        return  element.trim() !== '' ;
    })
    return tem;
}
//trocar as telas de sign up ou cadastro
function trocarSignInUp( type ) {
    const conts = document.querySelectorAll('.container')
    const btns = document.querySelectorAll('nav ul li .link')
    
    btns.forEach((element,index) => {
        if(index===type){
            element.style.backgroundColor='rgba(229, 55, 55,.4)';
            conts[index].style.display='block'
        }else{
            element.style.backgroundColor='transparent';
            conts[index].style.display='none'
        }
    });

}
//Cadastrar usuários
document.querySelector( "#btn-concluir" ).addEventListener( "click" , function() {
    //Pegar os inputs
    const inputs =  document.querySelectorAll('.input')   

    if( verifCamposVazios( [ inputs[ 5 ].value , inputs[ 6 ].value ] ) ) {

        if ( inputs[ 5 ].value.trim() === inputs[ 6 ].value.trim() ) {
            //Pegar o sexo
            let sex = document.querySelector("#masc")
            //escolher o sexo
            sex = ( sex.checked ) ? "Masculino" : "Femenino";
            //pegar o id do novo usuário
            const id = users.length; 
            //criar um url
            let url = "";
            if ( sex === "Masculino" ) {
                url = `../imagens/usuarios/masculino/user${id}.jpg`;
            } else  {
                url = `../imagens/usuarios/femenino/user${id}.jpg`;
            }
            //Criar um novo usuario
            const user = new Pessoa( inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].value,inputs[4].value,sex,inputs[5].value,url,id)
            //adicionar no arrayUsers
            users.push( user );
            //guardar no localStorage
            localStorage.setItem("users-project",JSON.stringify(users));
            //guardar o id actual
            localStorage.setItem("id",JSON.stringify(id));
            //criar array noticações
            const notifica = JSON.parse( localStorage.getItem( 'notificacao-users' ) ) || [] ;
            //notificacao usuarios
            notifica.push( `${ user.nome }` )
            // guardar session
            localStorage.setItem( 'notificacao-users' , JSON.stringify( notifica ) ); 
            //inicializar os inputs 
            inputs.forEach( ( element ) => {       
                element.value = "";           
            });
            subir( -1 , 0 )
            //function que abre um nova pagina
            const openNewPage = () => {
                //direcionar a janela para uma nova pagina
                window.open( '../assets/principal/principal.html'  ,  '_self' );
            }
            //Function que muda o modal
            const ChangeModal = () => {
                //chamar o modal confirme
                callModal( 'confirm' , 'Conta do usuário, criada com sucesso ! ');

                //chamar a function que abre um nova pagina depois de um segundo
                setTimeout( openNewPage , 2000 )
            }
            //chamar a function que muda modal, depois de tress (3) segundos
            setTimeout( ChangeModal , 3000 );
            //chamar o modal de loading
            callModal( 'load' , 0 );
        
        }else{
            //chamar o modal de alerta 
            callModal( 'alert' , 'As palavras passes devem ser iguais !')
            //alert( "Por favor verifique as palavras passes!" );
        }
    } else {
        //chamar o modal de alerta
        callModal( 'alert' , 'Digite a palavra passe' )
    }
})
//function que faz o login e verifica se estas cadastrado
document.querySelector( "#sign-in1" ).addEventListener( "click" , function () {
    //Pegar todos os inputs para fazer o log in
    const inputs = document.querySelectorAll(".cont-sign-in input")
    //Caso não estejam então
    if( verifCamposVazios( [ inputs[0].value , inputs[1].value ] ) ) {
        //Verificar se o email e a palavra passe digitado é verdadeira
        const verif = verificar(inputs[0].value , inputs[1].value )  ? true : false;
        //caso seja então vai para outra página
        if( verif ) {
            //pegar o id do usuário actual
            const id = pegarId(inputs[0].value,inputs[1].value);
            //guardar esste id
            localStorage.setItem("id",JSON.stringify(id));
            //function que abre uma nova pagina 
            const openOtherPage = () => {
                //abrir uma outra pagina na mesma aba
                window.open( "../assets/principal/principal.html" , '_self' )
            }
            //function que muda o modal
            const ChangeModal = () => {
                //chamar o modal de confirme
                callModal( 'confirm', 'Log in , feita com sucesso! ')
                //chamar a function que abre outra pagina
                setTimeout( openOtherPage , 1500)
            }
            //chamar o modal de loading
            callModal( 'load' ,0);
            // chamar a function que muda o modal para confirm
            setTimeout(  ChangeModal , 3000)
            
        } else {
            //chamar o modal
            callModal( 'alert','Dados inválidos !' );
        }
    } else {
        //chamar o modal
        callModal( 'alert', 'Por favor, preencha todos os campos');
    }
})
//function que retorna o id do usuario atraves do email e password
function pegarId(  mail , pass ) {
    const user = users.filter( ( el ) => {
        return el.email === mail && el.pass === pass;
    }) 
    return user[ 0 ].id;
}
//function que verifica o email e retorna uma boolean
function verificar( mail , pass ) { 
    
    if( pass !== null ) {
        return users.some( ( elem ) => {
            //verificar se pelo menos existe um usuário com o email e passWord digitado
            return ( elem.email===mail ) && ( elem.pass === pass ) ;
        })
    } else {
        return users.some( ( elem ) => {
            //verificar se pelo menos existe um usuário com o email e passWord digitado
            return ( elem.email === mail );
        })
    }
}
//acção que será eecutada quando fazer o scroll
document.addEventListener( "scroll" , () => {
    //pegar todos os dados necessarios
    const header = document.querySelector("header nav")
    const btnMovel = document.querySelector(".botao-movel")
    //pegar o comprimento em y do scroll
    const y =  window.scrollY
    //verificar o comprimento
    if(y>100){
        //chamar a animação que troca o fundo do menu para preta
        header.style.animation='background-come 1s forwards'        
        //Fazer aparecer o botão de compra movel
        if(y>350)
            btnMovel.style.display="block";
        else
            btnMovel.style.display="none";

    }else{
        //chamar a animção que troca o fundo do menu para transparent
        header.style.animation='background-go 1s forwards'
        //Fazer desaparecer o botão de compra movel
        btnMovel.style.display="none";
    }
})

//atribuir o evento de clique no botão movel
document.querySelector( 'section .botao-movel' ).addEventListener( 'click' ,() => {
    //mover para cima
    window.scroll( {
        top: 0,
        left: 0,
        behavior : "smooth"
    })
    //Trazer a tela sign in
    trazTelaSign()

} );

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
            paragrafoLoad.innerHTML = 'Carregando ...'
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
    changeEvaroment( true )
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





