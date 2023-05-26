
//renderizar
render()
function render(){
    const liMenus = document.querySelectorAll(".menu ul li");

    liMenus.forEach((element,index)=>{
        element.setAttribute('onclick',`changeScreen(${index})`)
    })
}

//trocar de tela para ver as notificações
function changeScreen(type , pos){
    const liMenus = document.querySelectorAll(".menu ul li");
    const elementSCreen =  document.querySelector('.notificacao') ;
    //Pegar container bilhete 
    if( type === 1 ){
        elementSCreen.style.left = '50%';

    } else {
        elementSCreen.style.left = '150%'
        takeDataCard( pos )
    } 

   liMenus.forEach((element,index)=>{
        if(index === type)
            element.style.borderBottomColor='rgb(245, 233, 233)';
        else
            element.style.borderBottomColor='transparent';
   })     

}
//pegar as requisições de compra de bilhetes
 takeRequisition()
function takeRequisition () {
    //pegar as requisicoes  das compras dos bilhetes
    const requisicoes = JSON.parse( localStorage.getItem( 'bilhetes' ) ) || [];
    //pegar o aviso da empresa 
    const notif = document.querySelector( 'header nav ul li span ' );
    //pegar a quantidade
    const tamanho = requisicoes.filter( ( element ) => {
        return  element.nomeEmpresa === 'Macon' || element.nomeEmpresa === 'macon' || element.nomeEmpresa === 'MACON'
    } )
    if ( tamanho.length !== 0 ) {
        notif.style.display = 'flex';
        notif.innerHTML = tamanho.length;
    } else {
        notif.style.display = 'none';
    }

    // criar elemntos na tela de notificações
    const notifUl = document.querySelector( '.notificacao ul' )
    notifUl.innerHTML = '';
    requisicoes.map( (element , index ) => {
        //filtrar somente os da macon

        let macon = element.nomeEmpresa === 'Macon' || element.nomeEmpresa === 'macon' || element.nomeEmpresa === 'MACON';
        if( macon ){
            const li = document.createElement( 'li' );
            li.appendChild( document.createTextNode( `Solicitação para compra de bilhete, nome : ${ element.nomeUsuario } `));
            //adicionar um evento de clique
            li.setAttribute( 'onclick' , `callDetail(  ${ index } )`)
            notifUl.appendChild( li );
        }
    })
}   
//function que chamaos detalhes
function callDetail( pos ){
    document.querySelector( '.bilhete-cliente' ).style.display = 'block';
    //chamar a function que renderizar o bbilhete
    takeDataCard( pos );
}
//function que pegar todos os dados do bilhete de comprar
function takeDataCard( posObject ) {
    //Pegar container bilhete 
    const bilhete =  document.querySelector( '.bilhete-cliente' )
    //inicializar
    bilhete.innerHTML = '';
    //pegar as requisicoes  das compras dos bilhetes
    const requisicoes = JSON.parse( localStorage.getItem( 'bilhetes' ) ) || [];
    //criar o span para sair
    const spanSair = document.createElement( 'span' );
    spanSair.innerHTML = 'x'
    //adicionar um evento de clique
    spanSair.setAttribute( 'onclick' , 'goDetail() ')
    bilhete.appendChild( spanSair );
    //criar titulo h3 
    const titulo3 = document.createElement( 'h3' );
    titulo3.appendChild( document.createTextNode( `Companinha :  ${ requisicoes[ posObject ].nomeEmpresa }`) );
    //criar uma lista não ordenada
    const ul = document.createElement( 'ul' );
    //Criar os elmentos da lista
    const li1 = document.createElement( 'li' );
    //adiiconar texto no elemnto 
    li1.appendChild( document.createTextNode( `Nome do Cliente : ${ requisicoes[ posObject ].nomeUsuario }` ) );
    //criar o segundo elemento
    const li2 = document.createElement( 'li' );
    //Adicionar texto no elemento
    li2.appendChild( document.createTextNode( `Local de Origem : ${ requisicoes[ posObject ].origem }` ) );
    //criar o terceiro elemento
    const li3 = document.createElement( 'li' );
    //Adicionar texto no elemento
    li3.appendChild( document.createTextNode( `Local de Destino : ${ requisicoes[ posObject ].destino }` ) );
    //criar o quarto elemento da lista
    const li4 = document.createElement( 'li' );
    //adicionar um texto no elemento da lista
    li4.appendChild( document.createTextNode( `Data de Ída : ${ requisicoes[ posObject ].dataIda }` ) );
    //criar o quinta elemento da lista
    const li5 = document.createElement( 'li' );
    //adicionar um texto no elemento da lista
    li5.appendChild( document.createTextNode( `Data de Volta : ${ requisicoes[ posObject ].dataVolta }` ) );
    //Criar o sexto elemento da lista
    const li6 = document.createElement( 'li' );
    //adicionar um texto no elemento
    li6.appendChild( document.createTextNode( `Quantidade de Passageiros : ${ requisicoes[ posObject ].quantidadePassageiros }` )  );
    //criar o sétimo  elemento da lista
    const li7 = document.createElement( 'li' );
    // adicionar um texto
    li7.appendChild( document.createTextNode(  `O valor total da Viajem  : ${ requisicoes [ posObject ].precoTotal } , 00 Kz` ) )
    //criar o oitavo elemento da lista
    const li8 = document.createElement( 'li' )
    li8.innerHTML = `Comprado aos : ${ requisicoes[ posObject ].dataCompra }`
    //adicionar todos os elementos na lista
    
    ul.appendChild( li1 )
    ul.appendChild( li2 )
    ul.appendChild( li3 )
    ul.appendChild( li4 )
    ul.appendChild( li5 )
    ul.appendChild( li6 )
    ul.appendChild( li7 )
    ul.appendChild(li8 )

    //Adicionar no bilhete 
    bilhete.appendChild( titulo3 );
    bilhete.appendChild( ul )
    //criar uma imagem
    const imagem = document.createElement( 'img' );
    imagem.src = "../_macon/_fotos_macon/LOGO-MACON.png";
    //adicionar a imagem no modal
    bilhete.appendChild( imagem );

}
//function que sumi com modal de detalhes
function goDetail( ) {
    //sumir com o modal dos detalhes
    document.querySelector( '.bilhete-cliente' ).style.display = 'none' ;
}






