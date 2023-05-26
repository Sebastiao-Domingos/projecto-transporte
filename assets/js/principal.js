// Pegar todos os usuarios no localStorage
const users = JSON.parse( localStorage.getItem( 'users-project' )) ?? [];
//Pegar todas as companinhas cadastradas no localStorage
const companinhas = JSON.parse( localStorage.getItem( "companinhas-cad" )) ?? [];
//Pegar todos os hoteis cadastrados no localStorge
const hoteis =  JSON.parse( localStorage.getItem( "hoteis-cad" )) ?? [];
//Pegar todos os lugares turisticos cadastrados no localStorage
const lugares  =  JSON.parse( localStorage.getItem( "lugares-cad" )) || [];
//pegar notificações da administração
const notificaAdm =   JSON.parse(  localStorage.getItem( 'notif-adm' ) ) || [];
//Pegar todos osbilheltes
const bilhetes = JSON.parse( localStorage.getItem( 'bilhetes' ) ) || [];
//Criar um array  dos lugares com maior destaque
let lugaresDestaque = ["Praia Azul Benguela","Quedas de Kalandula","Cristo Rei","Pedras de Pungua Ndongo","Moro do Moco"]
// Variaveis auxiliares
let lugaresPequenos = false ,menuPequeno = false,home = true;
//Acção que será executado quando usar scroll vertical
document.addEventListener( "scroll" , () => {;
    // pegar a menu 
    const header = document.querySelector( "header nav" );
    //pegar os links
    const lis = document.querySelectorAll( '.link' );
    //pegar o botão movel
    const btnMovel = document.querySelector( ".botao-movel" );
    //pegar o altura actual do cursor
    const y =  window.scrollY
    //Pegar o texto dos lugares mais destacados
    const textLugar = document.querySelector( 'section .principal .conteudo' )
    //comprar altura se for maior de 100px para criar um backgroundColor no menu
    if( y > 100 ) {
        //trocar a color do background do transparent para branco 
        header.style.animation  =  'background-come 1s forwards'        
        lis.forEach(  ( elem ) => {

            if( y > 350  && !home) {
                //fazer aparecer o botão movel
                btnMovel.style.display = "block";
            } else {
                //fazer desaparecer o botão movvel
                btnMovel.style.display = "none" ;
            }
        })
        // sumir com o texto
        if( y > 200 ) {
            textLugar.style.zIndex = 0;
        }
    } else {
        //trocar a color do background  branco para transpaarent 
        header.style.animation = 'background-go 1s forwards'
        //fazer desaparecer o botão movel
        btnMovel.style.display = "none";
        //voltar o texto lugar
        textLugar.style.zIndex = 1;
    }

    //Verificar se estamos com menu pequeno e desativar o conteudo
    if( menuPequeno ){
        //Pegar o conteudo
        document.querySelector( "section .lugares-destaque .conteudo" ).style.zIndex = 0;
    }
})
//atribuir o evento de clique no botao movel
document.querySelector( '.botao-movel' ).addEventListener( 'click' ,function () {
    //chamar a tela home na parte de compra
    trocar(  0  ,  0  );
    //somir com o botão
    this.style.display = 'none';
    //manter o scroll na posição da parte de compra
    window.scroll( {
        top : 650,
        left : 0,
        behavior : "smooth",
    } )
})
//atribuir evento de click ao botão movel
document.querySelector( '.label-comprar' ).addEventListener( 'click' , () => {
    //Rodar o scroll ate 650px
    window.scrollTo( {
        top : 650 ,
        left : 0,
        behavior : "smooth",
    })
} )
//Fazer aparecer a sms quando pousar o mouse na foto
document.querySelector( '.imagem-div' ).addEventListener( 'mouseover' , () => {
    document.querySelector( '.imagem-div label' ).style.display = 'block' ;
})
//Fazer desaparecer a messagem quando o mouse sair
document.querySelector( '.imagem-div' ).addEventListener( 'mouseout' , () => {   
    document.querySelector( '.imagem-div label' ).style.display = 'none';
})
//aplicar o evento de clicar na imagem do usuario e fazer aparecer e desaparecer o user-menu 
let menuTem = true;
document.querySelector(  '.imagem-div' ).addEventListener( 'click' , () => {
    // pegar a menu 
    const header = document.querySelector( "header nav" );
    //pegar o span do email do usuario
    document.querySelector( 'nav .user p' ).innerText = users[ JSON.parse( localStorage.getItem( 'id' ) ) ].email;
    //pegar a altura do scroll emrelacao ao top
    const y = window.scrollY;
    if( menuTem ){
        header.style.animation = 'background-come 0s forwards'
        document.querySelector(  '.user'  ).style.display = 'block';
        menuTem=false;
    }else{
        //chamar afunction que permite sumir com o menu do usuario
        leftUserMenu()
    }
})
//function que permite sair do menu user
document.querySelector( '.user .sair').addEventListener( 'click' , leftUserMenu )
//function que permitir sair no menu do usuario
function leftUserMenu() {
        //pegar a altura do scroll emrelacao ao top
        const y = window.scrollY;
        //comparar a altura do scroll
        if( y < 350 ) {
            document.querySelector( "header nav" ).style.animation = 'background-go 0s forwards'
        }
        document.querySelector(  '.user'  ).style.display = 'none';
        menuTem = true;
}
//Fazer aparecer a parte das notificações e sumir com menu user
document.querySelector( "header .notificacaobtn" ).addEventListener( "click" , () => helper( 4 ))
//Fazer aparecer a parte das ajudas e sumir com o menu user
document.querySelector( "header .ajudabtn" ).addEventListener( "click" , () => helper( 5 ))
//Fazer aparecer a parte das compras e sumir com o menuuser
document.querySelector( '.comprasbtn' ).addEventListener( 'click' , () => helper( 6 ) )
//fucntion helper 
function helper( type ){
        //desaparecer com menu usuário 
        document.querySelector( ".user" ).style.display = "none";
        //chamar a tela notificação
        trocar( type , 0 );
}
//function que permite sair da pagina para a pagina anterior
document.querySelector( '.user ul .sair-pagina').addEventListener( 'click' , ( ) => {
    //sumir com o menu do usuario
    leftUserMenu() ;
    //chamar um modal de pergunta
    callModal( 'ask' , 'Dejesas sair da tua conta ? ')
    //Atribuir um evento de clique nos botoes do modal de perguntas
    document.querySelector( '.btn-posetive' ).addEventListener( 'click' , () => {
        //trocal o modal para loading
        callModal( 'load' , 0 );
        //chamar um outra pagina depois de dois segundos
        setTimeout( () => {
            //chamar direcionar a janela para uma nova pagina 
            window.open( '../../doc/index.html' , '_self' );
        }, 2000 )
    } )
    document.querySelector( '.btn-negative' ).addEventListener( 'click' , () => {
        //voltar o ambiente no estado normal
        changeEvaroment( false );
    })
} )
//function que permite ir na pagina do perfil
document.querySelector( '.user .ir-perfil' ).addEventListener( 'click' , () => {
    leftUserMenu()
    //chamar o modal loading
    callModal( 'load' , 0 );
    //abrir a pagina do perfil em dois segundos
    setTimeout( () => {
        //inicializar o ambiente
        changeEvaroment( false )
        //direcionar a janela para a pagina do perfil
        window.open( '../perfil/perfil.html' , '_self' )
    } , 2000 );
})
//função responsável pela troca de container
function trocar( type , elem , indBuy ) {
    //quando elem = 0 e para trocar paginas
    if ( elem === 0 ) {
        //Pegar todos os container da página principal
        const conts = document.querySelectorAll( 'section .section' );
        // Pegar os elementos do menu
        const btns = document.querySelectorAll( '.link' );
        // fazer a enteração de todos elementos dos btns
        btns.forEach( ( element , index ) => {
            //Verificar se o indice é igual a type inserido
            if( index === type ) {
                //Verificar se o type inserido é menor que 4
                if ( type < 4 ) {
                    //trocar a color do fundo do elemento clicado 
                    element.style.backgroundColor = 'rgba(229, 55, 55,.5)';
                    //desativar o home para permitir o aparecimento do botao movel
                    if ( type > 0 ) {
                        //caso o type seja maior que 0 e menor que 4 a variavel home será false
                        home = false ;
                    } else{
                        // activat o home para n ão permitir que o botão movel apareça
                        home = true;
                    }
                }else{
                    // se o type inserido é maior que 4 então trocar a color da borda
                    element.style.borderBottomColor = `rgba(229, 55, 55,1)`;
                }
                // fazer aparecer o container correspondente a type clicado
                conts[ type ].style.display = "block";
                //Verificar se um dos botoes de compra da companinha foi clicado
                if( type === 0 && elem === 0 && indBuy === 0 ) {
                    //dar um scroll vertical de 700px
                    window.scrollTo( {
                        top : 700 ,
                        left : 0 ,
                        behavior : "smooth" 
                    } )
                }
                //Chamar a função trocar caso o index seja igual a 3
                if( index === 3 )
                    trocar( 0 , 1 );
                //Chamar a função hospedagem  
                if( type === 1 || type === 2 ) {
                    //chamar a função que prepara a parte de hospedagem e lugares turistico
                    hospedagemLugares( type )
                }
            }else{
                //trocar a color para transparente do elemento clicado
                element.style.backgroundColor = 'transparent';
                //trocar a color da borda para transparente do elemento clicado 
                element.style.borderBottomColor = `transparent`;
                //fazer desaparecer os container que não estão em foco
                conts[ index ].style.display = "none";
            }
            //Para tela pequena
            if( menuPequeno ){
                //Pegar o conteudo de lugares em destaques e fazer aparecer
                document.querySelector( "section .lugares-destaque .conteudo" ).style.zIndex = 1;
                // desaparecer com o menu
                document.querySelector( ".menu-nav" ).style.display = "none";
                //atribuir o valor false para menuPequeno
                menuPequeno = false;
            }
        } );

        for ( let i = 4 ; i < conts.length ; i++ ) {
            if ( i === type ) {
                conts[ type ].style.display = 'block';
            } else {
                conts[ i ].style.display = 'none';
            }
        }
        //quando for a home incializar a etapa das compras
        if( type === 0 ) {
            //chamar a função que troca as etapas da compra do bilhete
            trocarComprar( 0 )
        }
         
    }else{//caso o elemento não 0 então 
        //pegar todos os elementos que representam as  companinhas
        const btns1  =  document.querySelectorAll( ".tipos ul li" );
        btns1.forEach( ( element , index ) => {
            if ( index === type ) {
                //Trocar a color da borda do elemento clicado
                element.style.borderBottomColor = "rgba(229, 55, 55,1)";
                //chamar a função que cria o horário da empresa
                criarHorario( type );
            } else {
                // trocar o background transparent
                element.style.borderBottomColor = "transparent";
            }
        });
    }
}
//função anónima que pegar o id, do usuário actual e carregar a sua foto
( function() {
    const img = document.querySelector("#img");
    //pegar o id do usuario actual 
    const id = JSON.parse(localStorage.getItem("id"));
    img.src=users[id].file ;
    //atribuir o nome do usuário no bilhete de compra
    document.querySelectorAll( '.tela-etapas input' )[8].value = users[ id ].nome;
    //pegar as notificacoes da area administrativa
    const notSpan = document.querySelector( '.notificacaobtn span' );
    //verificar se não temos notificações
    if( notificaAdm.length !== 0){
        notSpan.style.display = 'flex'
        notSpan.innerHTML = notificaAdm.length
    }else{
        notSpan.style.display = 'none'
    }
} ) ( );
//Função que criar elementos do menu vertical das companinhas,lugares turisticos e hospedagem 
criarElementosMenu()
function criarElementosMenu () {
    const ul = document.querySelector( ".lugares-turistico .menu ul" );
    const ulHostel = document.querySelector( ".hospedagem .content .hotel ul" );
    const ulcomp = document.querySelector( '.companinhas .container .tipos ul' );
    ulHostel.innerHTML  =  '';
    ulcomp.innerHTML  =  '';
    ul.innerHTML  =  '';

    //criar os elementos da lista, adiciona-los e inicializar com os valores pegados no localStorage  
    hoteis.forEach( element =>{
        const li = document.createElement( 'li' );
        li.innerText = element.nome;
        ulHostel.appendChild( li );
    })
    //criar os elementos da lista, adiciona-los e inicializar com os valores pegados no localStorage  
    companinhas.forEach( ( element , index ) => {
        const li = document.createElement( 'li' );
        li.innerText = element.nome;
        li.setAttribute( 'onclick' , `trocar( ${ index } , ${ 1 } )` )

        if ( index === 0 ) {
            li.setAttribute( 'class' , 'macon' );
        }
        ulcomp.appendChild( li );
    })

    //criar os elementos da lista, adiciona-los e inicializar com os valores pegados no localStorage  
    for (const index in lugares) {
        const li = document.createElement("li");
        li.setAttribute("onclick",`lugaresTuris(${index})`);
        li.innerText=lugares[index].nome;
        ul.appendChild(li)
    }
}
//função anónima que cria a animação dos lugares em destaques
(function(){
    const lugares = document.querySelectorAll(".lugares");
    let  nome = document.querySelector(".principal .lugares-destaque .conteudo p");
    let cont=1,vai=true;
    setInterval(() => {
        if(vai){
            //Mover da direita para esquerda
            lugares[cont-1].style.animation="vai-lugar 1.4s forwards";
            lugares[cont].style.animation="vem-lugar 1.4s forwards";
            nome.innerHTML=lugaresDestaque[cont];
            cont++;
            if(cont === lugares.length-1){
                vai = false;
                cont--;
            }
        }else{
            //Mover da esquerda para direita
            lugares[cont].style.animation="vai1-lugar 1.4s forwards";
            cont--;
            lugares[cont].style.animation="vem1-lugar 1.4s forwards";
            nome.innerHTML=lugaresDestaque[cont];
            if(cont===0){
                vai=true;
                cont++;
            }
        }
    }, 2000);
})();

//Imagens da Hospedagem e lugars turisticos
function hospedagemLugares ( type ){
    const hotelImagens = document.querySelector(".hotel-imagem");
    const lugarImagens = document.querySelector(".lugares-imagem");
    const outrosLuagres = document.querySelector('.lugares-principal .outras-imagens');
    const outroshoteis = document.querySelector('.hotel-principal .outras-imagens');
    outrosLuagres.innerHTML='';
    outroshoteis.innerHTML='';

     //inicializar
    hotelImagens.innerHTML = "";
    lugarImagens.innerHTML = "";
    //criar  div
    for(let i=0;i<hoteis.length;i++){
        let div = document.createElement('div');
        div.setAttribute('class','imagem');
        div.style.backgroundImage=`url(${hoteis[i].foto})`;
        let li = document.createElement('li')
        li.style.backgroundImage=`url(${hoteis[i].foto})`;

        if(i==0){
            div.style.left=0;
        }
        hotelImagens.appendChild(div);
        outroshoteis.appendChild(li)

    }
    
    lugares.forEach((elem,index)=>{
        let div = document.createElement('div');
        div.setAttribute('class','imagem');
        div.style.backgroundImage=`url(${elem.foto})`;

        let li = document.createElement('li');
        li.style.backgroundImage=`url(${elem.foto})`;
        
        if(index===0){
            div.style.left=0;
        }
        lugarImagens.appendChild(div)
        outrosLuagres.appendChild(li)      
    })
    animacaoHoteisLugares(type,1)
}
// function animalão dos  hoteis e luagres turisticos
function animacaoHoteisLugares ( type , inicio ) {
    // pegar elmentos do menu da hospedagem ou dos lugares turistico
    let  nomes =( type === 1 )? document.querySelectorAll('.lugares .menu ul li') : document.querySelectorAll(".hotel ul li");
    
    //pegar as imagens da hospedagem ou dos lugares turistico
    const imagens=( type === 1 ) ? document.querySelectorAll('.lugares-imagem .imagem') : document.querySelectorAll(".hotel-imagem .imagem");

    // pegar outras imagens da hospedagem ou dos lugares turistico
    const outrasImagens = ( type===1 )?document.querySelectorAll('.lugares-principal .outras-imagens li') : document.querySelectorAll('.hotel-principal .outras-imagens li');
   
    //variáveis de controlo , incremento e decremento
    let cont=inicio,vai=true;
    setInterval(() => {
        if(vai){
            imagens[cont-1].style.animation="vai-lugar 1.4s forwards";
            imagens[cont].style.animation="vem-lugar 1.4s forwards";
            nomes[cont-1].style.borderBottomColor="transparent" ;
            nomes[cont].style.borderBottomColor="red"; 
            //Chamar a funcao ampliar 
            ampliarImagem(cont);

            cont++;
            if(cont===imagens.length){
                vai=false;
                cont--;
            }
        }else{
            imagens[cont].style.animation="vai1-lugar 1.4s forwards";
            nomes[cont].style.borderBottomColor="transparent"; 
            cont--;
            imagens[cont].style.animation="vem1-lugar 1.4s forwards";
            nomes[cont].style.borderBottomColor="red" ;
            
            //Chamar a funcao  Ampliar a imagem 
            ampliarImagem(cont);

            if(cont===0){
                vai=true;
                cont++;
            }
        }
    }, 4000);


    function ampliarImagem(tipo){
        outrasImagens.forEach((elem,index)=>{
            if(tipo === index )
                elem.style.transform=`scale(1.4)`;
            else
                elem.style.transform=`scale(1)`;

            elem.setAttribute("onclick",`trocarImagemPeloClique(${type},${index})`)    
        })
    }

}
//trocar uma imagem pela clique
function trocarImagemPeloClique ( elem , type ) {
    const imagens=( elem === 1 ) ? document.querySelectorAll('.lugares-imagem .imagem') : document.querySelectorAll(".hotel-imagem .imagem");
    imagens[type].style.animation='vem-lugar 1.4s forwards';
    if( type >= 1 )
        imagens[type].style.animation = 'vai-lugar 1.4s forwards';

    animacaoHoteisLugares(elem,type)
}
//comprar o bilhete
trocarComprar( 0 )
function trocarComprar( type ) {
    // Pegar as etapas
    const etapas = document.querySelectorAll( ".comprar-bilhete .etapas" )
    //criar um array preços
    const precos = [ 5000 , 9000 , 10000 , 6000 ,12000 ,25000 ]
    //Trocar as telas etapas de acordo com o parâmetro informado    
    etapas.forEach( ( element , index ) => {
        if( type === 1 ){
            if ( index === type ) {
                element.style.animation = 'vem-comprar .4s forwards'
            } else {
                element.style.animation = 'vai-comprar .4s forwards'
            }
        } else {
            if ( index === type ) {
                element.style.animation = 'vem1-comprar .4s forwards'
            } else {
                element.style.animation = 'vai1-comprar .4s forwards'
            }
        }
    });

    //Pegar o id da companinha actual 
    const  idCompaninha =  JSON.parse( localStorage.getItem( 'id-comp' ) ) || 0;
    //pegar o valor clicado ou padão
    const posPreco = JSON.parse( localStorage.getItem( 'pos-preco' ) ) || 0 ;
    //inicializar o nome da empresa pelo nome da empresa actual
    const inputs = document.querySelectorAll( '.tela-etapas .etapas input ') ;
    //inicializar o nome
    inputs[ 3 ].value = companinhas[ idCompaninha ].nome ;
    //inicializar o preco
    inputs[ 7 ].value = precos[ posPreco ] ;

}
//function que calcularam o preco total
calculaPrecoTotal()
//criar uma variavel 
var precoTotalCompra = 0 , tipoViajem1 = 'Só ida ';
function calculaPrecoTotal() {
    const precos = [ 5000 , 9000 , 10000 , 6000 ,12000 ,25000 ]
    //pegar o valor clicado ou padão
    const posPreco = JSON.parse( localStorage.getItem( 'pos-preco' ) ) || 0 ;
    //inicializar o nome da empresa pelo nome da empresa actual
    const inputs = document.querySelectorAll( '.tela-etapas .etapas input ') ;
    //Pegar o label do preco total
    const labelPreco = document.querySelector( '.comprar-bilhete .preco-total' );
    //Pegar a quantidade 
    const qnt = inputs[ 6 ].value.trim() !== '' ? Number( inputs[ 6 ].value ) : 1

    //tipo de viaje
    let tipoViajem = 1

    if( inputs[ 1 ].checked ){
        tipoViajem1 = 'Ida e Volta ';
        tipoViajem = 2;
    } else if (  inputs[ 2 ].checked  ) {
        tipoViajem1 = 'Multiplo-Destino';
        tipoViajem = 2 ;
    }
    //calcular o precco total
    precoTotalCompra = precos[ posPreco ]*qnt*tipoViajem;
    //Atualizar o label preço
    labelPreco.innerHTML = `Preço Total : ${ precoTotalCompra } , 00 Kz`
};
//function que renderiza as compras
renderCompras()
function renderCompras( ) {
    //pegar o corpo das compras
    const tbodyCompras = document.querySelector( '.compras-cad .content table tbody ' );
    //inicializar
    tbodyCompras.innerHTML = '';
    //verificar se temos bilhetes
    if( bilhetes.length !== 0 ) {
        bilhetes.map( ( element ) => {
            let tem = false 
            if( element.idUser ===  JSON.parse( localStorage.getItem( 'id' ) ) ) {
                //criar a tr
                const tr = document.createElement( 'tr' );
                //criar os elementos da tabelas
                for( let i = 1 ; i < 5 ; i++ ) {
                    const td = document.createElement( 'td' );

                    switch ( i ) {
                        case 1:
                            td.innerHTML = element.tipoDeViajem;
                            break;
                        case 2 : 
                            td.innerText  = element.precoTotal;
                            break;
                        case 3 : 
                            td.innerHTML = element.dataCompra;
                            break;
                        default:
                            td.innerText = 'Detalhes';
                            td.setAttribute( 'onclick' , `showModalTiket( ${ element.id } ) ` ) ;
                            break;
                    }
                    //adicionar os elementos na tabela
                    tr.appendChild( td );
                    //trocar  o estado variavel
                    tem = true 
                }
                //verificar se tem os bilhetes edeste usuario
                if( tem ) {
                    tbodyCompras.appendChild( tr )
                } else {
                    tbodyCompras.innerHTML = `<tr><td>Por enquanto não tem compras feitas</td></tr>`
                }
            }
        } )
    } else {
        callModal( 'alert' , 'Sem Compras ')
    }
    
}
//reequisitar umbilhete de viajem
function requisitarBilhete() {
    //pegar o array de bilhetes no localStorage
    const arrayBilhetes = JSON.parse( localStorage.getItem( 'bilhetes' ) ) || [];
    //pegar as inputs  da compra de bilhete
    const inputs = document.querySelectorAll( '.tela-etapas input' )
    //pegar o id do usuario actual 
    const id = JSON.parse( localStorage.getItem( "id" ) );
    //criar um objecto userRequisacao
    const userBilhete = {
        id:arrayBilhetes.length,
        idUser : null,
        tipoDeViajem : '',
        nomeEmpresa : '',
        origem : '',
        destino : '',
        nomeUsuario: '',
        dataIda : undefined,
        dataVolta : null,
        quantidadePassageiros: 1,
        dataCompra : null,
     }
    //variavvel de controlo 
    let preenchido = true
    //validar se tem campos vazios
    inputs.forEach( function ( element ) {
        if( element.type !== 'radio')
            if( element.value.trim() === '' ){
                preenchido = false
            }
    })

    // criar o objecto e atribuir valores ,caso não haja campos vazios
    if( preenchido ){
        //pegar data actual do  sistema 
        let year = ( new Date() ).getFullYear();
        let month1 = ( new Date() ).getMonth() + 1 ;
        let month = ( month1 > 9 ) ? month1 : ( '0' + month1 );
        let day1 = ( new Date() ).getDay()
        let day = (  day1 > 9 ) ? day1 : ( '0' + day1) 
        let data = day +  ' / ' + month + '/' + year ; 
        //Atribuir valores dos inputs no objecto
        userBilhete.idUser = id;
        userBilhete.tipoDeViajem = tipoViajem1;
        userBilhete.nomeEmpresa = inputs[ 3 ].value;
        userBilhete.origem  = inputs[ 4 ].value ;
        userBilhete.destino  = inputs[ 5 ].value ;
        userBilhete.nomeUsuario = inputs[ 8 ].value ;
        userBilhete.dataIda = inputs[ 9 ].value ;
        userBilhete.dataVolta = inputs[ 10 ].value ;
        userBilhete.quantidadePassageiros = inputs[ 6 ].value;
        userBilhete.precoTotal = precoTotalCompra ;
        userBilhete.dataCompra = data 
        //adicionar na lista de compra de bilhetes
        arrayBilhetes.unshift( userBilhete );
        //guardar no localStorage 
        localStorage.setItem( 'bilhetes', JSON.stringify( arrayBilhetes ) );
        //iniciar todos os inputs
        inputs.forEach( ( element ) => {
            if( element.type !== 'radio' )
                element.value = '';
        })

        //chamar o modal loading
        callModal( 'load' , 0 );

        //chamar o modal de confirmação após de 2 segundos
        setTimeout( () => {
            //chamar o modal confirme
            callModal( 'confirm' ,  'Compra do Bilhete feita com sucesso !!' ) ;
            //chamar  a function muda o ambiente apos 1 segundo
            setTimeout( () => {
                //chamar a function que troca oambiente
                changeEvaroment( false ) ;
            }, 2000 ) ;
        } , 2000 ) ;

    }else {
        //chamar o modal de alert
        callModal( 'alert' , 'Por favor, preencha todos os dados ! ');
    }
}
//function criar um modal de bilhetes comprados
function showModalTiket( type ){
    //pegar o container detalhe
    const detalhe = document.querySelector( '.compras-cad .detalhe');
    //Pegar a lista do detalhes
    const ulDetalhe = document.querySelector( '.compras-cad .detalhe ul' )
    //iniccializar 
    ulDetalhe.innerHTML = '';
    //Pegar todos objectos bilhetes no localStorage
    const arrayBilhetes = JSON.parse( localStorage.getItem( 'bilhetes' ) ) || [];
    //fazer aparecer o modal detalhes
    detalhe.style.display = 'block';

    //mapear os bilhtes 
    arrayBilhetes.reverse().map( ( bilhete , index ) => {
        //verificar o id do bilhete clicado
        if( index  ===  type ) {
            for( let i = 0 ; i< 10  ;i++ ) {
                //criar os lementos da lista
                const li = document.createElement( 'li' );
                let texto = '';
                switch ( i ) {
                    case 0 :
                        texto = `Tipo De Viajem  :  ${ bilhete.tipoDeViajem }`
                        break;
                    case 1 : 
                        texto = `Nome da Empresa  :  ${ bilhete.nomeEmpresa }`
                        break;
                    case 2:
                        texto = `Nome do Usuário  :  ${ bilhete.nomeUsuario } `
                        break;
                    case 3 : 
                        texto = `Origem  : ${ bilhete.origem } `
                        break;
                    case 4 : 
                        texto = `Destino  :  ${ bilhete.destino }`
                        break;
                    case 5 : 
                        texto = `Data  De  Ída :  ${ bilhete.dataIda }`
                        break;
                    case 6 :
                        texto = `Data de Volta :  ${ bilhete.dataVolta }`
                        break;
                    case 7 :
                        texto = `Quantidades de passageiros : ${ bilhete.quantidadePassageiros }`
                        break;
                    case 8 :
                        texto = `Preço da Viajem  :  ${ bilhete.precoTotal },00 Kz, `
                        break;
                    default:
                        texto = `Data de Compra :  ${ bilhete.dataCompra }`
                        break;
                }
                //adiionar um texto no elemento da lista
                li.innerText = texto;
                //adicionar o elemento na lista
                ulDetalhe.appendChild( li );
            }
        }
    } )

} 
//function que permite sumir com modal detalhe
function desapearModalTiket(){
    //pegar o container detalhe
    document.querySelector( '.compras-cad .detalhe').style.display = 'none'; 
}
//Criar um Horario
function criarHorario( type ) {
    //pegar o corpo da lista e iniciar
    const table = document.querySelector(".horario table tbody");
    table.innerText='';
    //pegar o header da da tabela
    let head = document.querySelector('.horario .texto');
    //Pegar o mês do Corrente e atribuir no cabeçalho e respectivo nome da empresa
    head.innerHTML = `<h3> HORÁRIO DO MÊS DE ${pegarMes()} </h3>`
    head.innerHTML+=`<span>${companinhas[type].nome}</span>`
    //criar linhas da tabela e os seus dados e adiciona-los
    for(let i = 0; i<5 ; i++){
        //criar uma linha da table
        const tr = document.createElement('tr');
        for (let index = 0; index < 4; index++) {
            //criar uma dados td  e  adicionar na linha tr
            const td = document.createElement('td');
            //atribuir uma class
            td.className = 'td'
            //escolher o index dado 
            switch (index) {
                case 0:
                    td.innerHTML=`${i+1}`;
                    break;
                case 1:
                    td.innerText ='5h,9h,12h,18h,21h';
                    break;
                case 2:
                    td.innerText='';
                    companinhas[type].nProvincias.forEach((element,index)=>{
                        td.innerText+=element;

                        if(index<companinhas[type].nProvincias.length-1)
                            td.innerText+=','
                    })
                    break;
                case 3:
                    const icon = document.createElement("i")
                    icon.setAttribute("onclick",`trocar(${0},${0},${0})`)
                    icon.className = "fas fa-coins"
                    td.appendChild(icon);
                    break;
                default:
                    console.log("falha");
                    break;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // guardar o id da companinha actual no local storage
    localStorage.setItem( 'id-comp' , JSON.parse( `${ type }` ) );
    //Renderizar os preços
    //pegar o content dos preços
    const ulPrecos = document.querySelector( '.companinhas .container-1 ul');
    //inicializar o content
    ulPrecos.innerHTML = '';
    //criar os elementos da lista
    for( let i = 0 ; i < 6 ; i++  ) {
        const li = document.createElement( 'li' );
        li.className = `li-${i+1}`;
        li.setAttribute( 'onclick' , ` guardarPreco( ${ i } ) ` );
        li.setAttribute( 'onmouseenter' , `trocarFocus( ${ 3 } , ${ i } )`);
        li.setAttribute( 'onmouseleave' , `trocarFocus( ${ 3 } , ${ null } )` );

        switch ( i ) {
            case 0 :
                li.innerText = '5.000,00 Kz'
                break;
            case 1 :
                li.innerText = '9.000,00 Kz'
                break ;
            case 2 :
                li.innerText = '10.000,00 Kz'
                break;
            case 3 :
                li.innerText = '6.000,00 Kz'
                break ;
            case 4 :
                li.innerText = '12.000,00 Kz'
                break;
            case 5 :
                li.innerText = '25.000,00 Kz'
                break ;
        }

        ulPrecos.appendChild( li );
    }
}
//guadar o preco clicado
function guardarPreco( type ) {
    //cmar afunction trocar tela
    trocar( 0 , 0 , 0 ) 
    //Guadar esta posicao no localStorage
    localStorage.setItem( 'pos-preco' , JSON.stringify( type ) );
}
//Pegar o mês do Corrente
function pegarMes() {
    const mes = ( new Date()).getMonth();
    let res = "";

    switch (mes) {
        case 0:
            res="Janeiro";
            break;
        case 1:
            res="Fevereiro"; 
            break;
        case 2:
            res="Março";
            break;
        case 3:
            res="Abril";
            break;
        case 4:
            res="Maio";
            break;
        case 11:
            res="Dezembro";
            break;
        case 6:
            res="junho";
            break;
        case 7:
            res="Julho";
            break;
        case 8:
            res="Agosto";
            break;
        case 9:
            res="Setembro";
            break;
        case 10:
            res="Outubro";
            break;
        default:
            res="Novembro";
            break;
    }

    return res.toUpperCase();
}
//Chamar menu 
let abreMenu  =  true;
document.querySelector( ".fa-bars" ).addEventListener(  "click", function() {
    //Pegar o menu
    const menu = document.querySelector(".menu-nav");
    //Pegar o conteúdo
    let conteudoHeader = document.querySelector(".principal .conteudo");
    //Verificar se o menu está aberta
    if( abreMenu ) {
        menu.style.display = "block";
        //atribuir true no menuPequeno
        menuPequeno = true;
        //Atribuir false no abrir menu
        abreMenu=false;
        //FAzer desaparecer o conteudo de destaque
        conteudoHeader.style.zIndex = 0;

    }else{
        menu.style.display="none";
        abreMenu=true;
        menuPequeno=false;
        conteudoHeader.style.zIndex=1;
    }
})
//Sumir com o menu 
document.querySelector( 'header .menu-nav button' ).addEventListener( 'click', () => {
    //Pegar o menu
    const menu = document.querySelector(".menu-nav");
    menu.style.display="none";
    abreMenu=true;
    menuPequeno=false;
    conteudoHeader.style.zIndex=1;
})
/*Tronar fusco os item com com a entrada do mouse no item */
function trocarFocus( type  , index ) {
    //pegar as descrições das hospedagem ou lugares turisticos
    const itens = (type === 2 ) ? document.querySelectorAll(".hospedagem .descricao-hospedagem p") : document.querySelectorAll(".lugares-turistico .descricao-lugares p");

    itens.forEach( (element,ind ) => {
        if( ind !== index ){
            element.style.opacity=.2;
            element.style.transform="scale(1)";
        }else{
            element.style.transform="scale(1.1)";
            element.style.opacity=1;
        }
    });

    if(type === 3){
        const etiqueta = document.querySelector('.companinhas .container-1 .etiqueta-comprar');
        const itensValores = document.querySelectorAll('.companinhas .container-1 ul li');
        itensValores.forEach( (element , ind) => {
            if(ind !== index){
                element.style.transform="scale(1)";
            }else{
                element.style.transform="scale(1.1)";
            }
        });
    }
}
//function pegar notificação
renderNotificacao()
function renderNotificacao() {
    //pegar a lista das notificacoes
    const notificacaoCont = document.querySelector( '.notificacao .content' );
    //iniciar o container
    notificacaoCont.innerText = '';
    //criar uma lista não ordenada
    const ul = document.createElement( 'ul' );
    //verificar se existe notificacoes
    if( notificaAdm.length !== 0 ){
        //fazer o mapeamento dos elementos do array notificações
        notificaAdm.map( ( elem , index ) => {
            //criar um novo elemento da lista notif...
            const li = document.createElement( 'li' );
            // varial do texto
            let texto = '' , objectActual = elem.idObject - 1 , tipo = elem.identificador;
            //verificar se a notificacao e de empresa, lugar ou hoteis
            switch ( tipo ) {
                case 0:
                    texto = ` Mais uma Nova Empresa, com o nome de ${ elem.nome } `
                    break;
                case 1 :
                    texto = `Mais um Novo lugar Turistico, com o nome ${ elem.nome }`;
                    break;
                default:
                    texto = `Mais um novo Hotel Cadastrado, com o nome ${ elem.nome }`
                    break;
            }

            //adicinar o texto na li
            li.appendChild( document.createTextNode( texto ) );
            //adicionar um evento de clique 
            li.setAttribute( 'onclick' , `callModalDetail( ${ index }, ${ objectActual } , ${ tipo } )` );
            //adicionar na lista das notificacoes
            ul.appendChild( li );
            //adicionar no container geral das notificações
            notificacaoCont.appendChild( ul );
        })
    } else {
        const p = document.createElement( 'p' );
        p.appendChild( document.createTextNode( 'Sem notificações' ) )
        //adicionar no container geeral das notificações
        notificacaoCont.appendChild( p )
    }
    // Pegar o span para trocar aquantidade 
    const span  =  document.querySelector( '.notificacaobtn span' );
    //Verificar se temos notificações
    if( notificaAdm.length !== 0 ){
        span.innerHTML = notificaAdm.length ;
    } else {
        span.style.display = 'none';
    }
} 
//function que permite aparecer o modal de detalhes
function callModalDetail ( type , obj , ident ) {
    //pegar o modal de detalhes 
    const modalDetail = document.querySelector( '.notificacao .modal-detalhe') ;
    modalDetail.innerHTML = '';
    modalDetail.style.display = 'block'
    //Escolhe qual o tipo de modal que sera criada
    switch ( ident ) {
        case 0 : {
            //Criar um span voltar e atribuir uma class e texto
            const spanVoltar = document.createElement( 'span' );
            spanVoltar.className = 'voltar';
            spanVoltar.innerText = 'X';
            spanVoltar.setAttribute( 'onclick' , `backToDetail( ${ type } ) ` )
            //criar a lista dos dizeres
            const ulDetail = document.createElement( 'ul' );
            //criar os elementos da lista e adicionar o texto
            const li1 = document.createElement( 'li' );
            li1.innerText = `Nome da Companinha :  ${ companinhas[ obj ].nome }`;
            const li2 = document.createElement( 'li' );
            li2.innerText = `Localização da Sede  :  ${ companinhas[ obj ].localSede }`;
            const li3 = document.createElement( 'li' );
            li3.innerText = `Províncias da frota :  ${ companinhas[ obj ].nProvincias[ 0 ] } , ${ companinhas[ 0 ].nProvincias[ 1 ] } `;
            const li4 = document.createElement( 'li' );
            li4.innerText = `Aproveita está nova empresa !`;
            //Criar uma imagem
            const imgDetail = document.createElement( 'img' );
            imgDetail.src = `${ companinhas[ obj ].foto }`
            //adicionar os elementos na lista
            ulDetail.appendChild( li1 )
            ulDetail.appendChild( li2 )
            ulDetail.appendChild( li3 )
            ulDetail.appendChild( li4 )
            //Adicionar a lista no modal
            modalDetail.appendChild( spanVoltar );
            modalDetail.appendChild( ulDetail );
            modalDetail.appendChild( imgDetail );
            break;
        }
        case 1 :{
            //Criar um span voltar e atribuir uma class e texto
            const spanVoltar = document.createElement( 'span' );
            spanVoltar.className = 'voltar';
            spanVoltar.innerText = 'X';
            spanVoltar.setAttribute( 'onclick' , `backToDetail( ${ type } ) ` )
            //criar a lista dos dizeres
            const ulDetail = document.createElement( 'ul' );
            //criar os elementos da lista e adicionar o texto
            const li1 = document.createElement( 'li' );
            li1.innerText = `Nome do lugar :  ${ lugares[ obj ].nome }`;
            const li2 = document.createElement( 'li' );
            li2.innerText = `Província  :  ${ lugares[ obj ].provincia }`;
            const li3 = document.createElement( 'li' );
            li3.innerText = `Município : ${ lugares[ obj ].municipio } `;
            const li4 = document.createElement( 'li' );
            li4.innerText = `Aproveita esta maravilha, não perca mais tempo!`;
            //Criar uma imagem
            const imgDetail = document.createElement( 'img' );
            imgDetail.src = `${ lugares[ obj ].foto }`
            //adicionar os elementos na lista
            ulDetail.appendChild( li1 )
            ulDetail.appendChild( li2 )
            ulDetail.appendChild( li3 )
            ulDetail.appendChild( li4 )
            //Adicionar a lista no modal
            modalDetail.appendChild( spanVoltar );
            modalDetail.appendChild( ulDetail );
            modalDetail.appendChild( imgDetail );
            break;
        }
        case 2 :{
            //Criar um span voltar e atribuir uma class e texto
            const spanVoltar = document.createElement( 'span' );
            spanVoltar.className = 'voltar';
            spanVoltar.innerText = 'X';
            spanVoltar.setAttribute( 'onclick' , `backToDetail( ${ type } ) ` )
            //criar a lista dos dizeres
            const ulDetail = document.createElement( 'ul' );
            //criar os elementos da lista e adicionar o texto
            const li1 = document.createElement( 'li' );
            li1.innerText = `Nome do lugar :  ${ hoteis[ obj ].nome }`;
            const li2 = document.createElement( 'li' );
            li2.innerText = `Província  :  ${ hoteis[ obj ].provincia }`;
            const li3 = document.createElement( 'li' );
            li3.innerText = `Município : ${ hoteis[ obj ].municipio } `;
            const li4 = document.createElement( 'li' );
            li4.innerText = `Números de quartos dispponíveis :  ${ hoteis[ obj ].nQuartos }`;
            //Criar uma imagem
            const imgDetail = document.createElement( 'img' );
            imgDetail.src = `${ hoteis[ obj ].foto }`
            //adicionar os elementos na lista
            ulDetail.appendChild( li1 )
            ulDetail.appendChild( li2 )
            ulDetail.appendChild( li3 )
            ulDetail.appendChild( li4 )
            //Adicionar a lista no modal
            modalDetail.appendChild( spanVoltar );
            modalDetail.appendChild( ulDetail );
            modalDetail.appendChild( imgDetail );
            break;
        }    
    }
}
//function que permite sair do modal
function backToDetail( type ) {
    document.querySelector( '.notificacao .modal-detalhe').style.display = 'none' ;
    deleteElementNot( type )
}
//function eliminar elementos da notificação
function deleteElementNot( pos ){
    //eliminar o elemento na respectiva posição
    notificaAdm.splice( pos , 1 );

    // guardar a nova lista no localStorage
    localStorage.setItem( 'notif-adm' , JSON.stringify( notificaAdm ) ) ;

    //renderizar as notificações
    renderNotificacao()
}
// Verificar a empresa digitada
function verificarEmpresa(){
    //pegar todos os inputs
    const input = document.querySelectorAll( '.tela-etapas input' );
    input.forEach( ( element , index ) => {
        if( index > 3 )
            element.disabled = true;
    })
    const tem =  companinhas.some ( elem => {
            return  elem.nome.toLowerCase() === input[3].value.toLowerCase() ;
        } )
    
    if( tem ){
        input.forEach( ( element , index ) => {
            if( index > 3 )
                element.disabled = false;
        })
    }else {
        //chamar o modal de alerta
        callModal( 'alert' , 'Não temos esta Companinhas' )
    }
}
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
//  function que trata da ajuda
function helperForAdm() {
    const inputs = [ document.querySelector( '.ajuda .content input' ) , document.querySelector( '.ajuda .content textarea' )];
    let preenchido = true
    //validar se tem campos vazios
    inputs.forEach( function ( element ) {
        if( element.value.trim() === '' ){
            preenchido = false
        }
    })

    if( preenchido ) {
        //chamar o modal loading
        callModal( 'load' , 0 )
        //Pegar todas as ajudas no localStorage
        const helps = JSON.parse( localStorage.getItem( 'ajuda' ) ) || [];
        //criar objecto help 
        const help = {
            id: helps.length ,
            assunto : inputs[ 0 ].value ,
            preocupacao : inputs[ 1 ].value,
        }
        //inicializar os campos
        inputs[ 0 ].value = ''
        inputs [ 1 ].value = ''
        //adicionar nas ajudas
        helps.push( help );
        //salvar no localStorage
        localStorage.setItem( 'ajuda' , JSON.stringify( helps ) );
        //chamar o modal confirm depois de 2 segundos
        setTimeout( () => {
            //chamar o modal confirm
            callModal( 'confirm' , 'Enviada com sucesso , Obrigado ' );
            //limpar o ambiente depois de 2 segundos
            setTimeout( () => {
                changeEvaroment( false );
            } , 2000 )
        } , 2000 )
    } else {
        //chamar o modal De alert 
        callModal( 'alert' , 'Preencha Todos os dados' )
    }
}




