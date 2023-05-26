const users = JSON.parse(localStorage.getItem('users-project')) ?? [];
const companinhas = JSON.parse(localStorage.getItem("companinhas-cad")) ?? [];
const hoteis=JSON.parse(localStorage.getItem("hoteis-cad")) ?? [];
const lugares =JSON.parse(localStorage.getItem("lugares-cad")) || [];
const notificacoes = JSON.parse( localStorage.getItem("notificacao-users")) || [];
const indexProvincias = [];
//criar um array para armazenar as mudanças
const notifAdm = JSON.parse(localStorage.getItem('notif-adm')) || []
//Array de todas as províncias do nosso País
const provincias =["Bengo","Benguela","Bié","Cabinda","Cunene","Huambo","Huíla","Kuando Kubango","kwanza Norte","Kwanza Sul","Luanda","Lunda Norte","Lunda Sul","Malanje","Moxico","Namibe","Uíge","Zaire"] 
let menuPequenoB = false,contImage=0;

// function que retorna um Objecto de acordo com o parametro 
function ObjectoCadastro( type ) {
    switch (type) {
        case "companinhas-cad":
            return {
                nome : "",
                localSede :"",
            } 
        case  "hoteis-cad":
            return {
                nome : "",
                provincia:"",
                municipio:"",
                nQuartos: 0,
            }
        case "lugares-cad":
            return {
                nome : "",
                provincia :"",
                municipio:"",
            }
    }
}
//function para adicionar companinhas, lugares turistico e hoteis 
function adicionar( type ) {
    const inputs = document.querySelectorAll(`.${type} .input`);
    const lisProv = document.querySelectorAll('.companinhas-cad .selecionar ul li');
    let obj = new ObjectoCadastro(type);
    let cont = 0;

    // verificar chamar function que valida os dados
    if(  validateDados( inputs ) ) {
        //Chamar modal de loading 
        callModal( 'load' , 0 )
        //passa os valores dos inputs no ojecto
        for ( const iterator in obj ) {
            obj[ iterator ]= inputs[ cont ].value;
            inputs[ cont ].value = '';
            cont++;
        }
        //escolher o tipo se e uma empresa ou lugar turistico ou hospedarias
        switch ( type ) {
            case "companinhas-cad":
                obj.id = companinhas.length;
                if(obj.id<6)
                    obj.foto=`../imagens/companinhas/comp${obj.id}.jpg`
                else
                    obj.foto=`../imagens/companinhas/comp${(obj.id-6)}.jpg`
    
                obj.nProvincias = [];
                for( const iterator of indexProvincias ){
                    obj.nProvincias.push(provincias[iterator]);
                }
    
                companinhas.push( obj );
                localStorage.setItem( type ,JSON.stringify( companinhas ));
    
                lisProv.forEach(element => {
                    element.style.backgroundColor='transparent';
                });
    
                //pegar as notificacoes
                notifAdm.unshift( {
                    nome : obj.nome,
                    identificador : 0,
                    idObject : companinhas.length ,
                } )
                // guardar localStorage
                localStorage.setItem( 'notif-adm',JSON.stringify( notifAdm ) )
                //chamar o modal confirme depois de 2 segundos
                setTimeout( () => {
                    //chamar o modal confirme
                    callModal( 'confirm' , 'Companinha cadastrada com sucesso! ')
                    //limpar o ambiente depois 1,5 segundo
                    setTimeout( () => {
                        //limpar o ambiente
                        changeEvaroment( false );
                    } ,2000 )
                } ,2000 )
                break;
            case "hoteis-cad" :
                obj.id = hoteis.length;
    
                if(obj.id===2 || obj.id===8)
                    obj.foto = `../imagens/hotel${obj.id}.png`;
                else
                    obj.foto = `../imagens/hotel${obj.id}.jpg`;
    
                hoteis.push(obj);
                localStorage.setItem(type,JSON.stringify(hoteis));
                //guardar as notificacoes
                notifAdm.push( {
                    nome:obj.nome,
                    identificador:2,
                    idObject : hoteis.length ,
                } )
                // guardar localStorage
                localStorage.setItem( 'notif-adm',JSON.stringify( notifAdm ) );
                //chamar o modal confirm depois de 2 segundos
                setTimeout( () => {
                    //chamar o modal confirme
                    callModal( 'confirm' , 'Hotel cadastrada, com secesso! ');
                    //limpa o ambiente depois de 2 segundos
                    setTimeout( () =>{
                        //chamar a function que limpa o ambiente
                        changeEvaroment( false );
                    } , 2000 )
                } , 2000 )
                break;
            case "lugares-cad":
                obj.id=lugares.length;
    
                if( obj.id===1 || obj.id===14 || obj.id === 15 || obj.id === 16 )
                    obj.foto = `../imagens/turismo${obj.id}.png`;
                else
                    obj.foto = `../imagens/turismo${obj.id}.jpg`;
                
                lugares.push(obj);
                localStorage.setItem(type,JSON.stringify(lugares));
    
                //guardar as notificacoes
                notifAdm.push( {
                    nome:obj.nome,
                    identificador : 1,
                    idObject : lugares.length ,
                } )
                // guardar localStorage
                localStorage.setItem( 'notif-adm',JSON.stringify( notifAdm ) )
                //chamar o modal confirm depois 2 segundos
                setTimeout( () => {
                    //chamar o modal confirme 
                    callModal( 'confirm' , 'Lugar Turístico cadastrado com sucesso ! ');
                    //limpar o ambiente depois de 2 segundos
                    setTimeout( ()=> {
                        //limpar o ambiente
                        changeEvaroment( false );
                    }, 2000 )

                } , 2000 )
                break;
        } 
    } else {
        //chamar o modal de alert
        callModal( 'alert' , 'Por favor , Preencha , todos os campos !' )
    }
}
// function de validação de dados do cadastro , retorna um valor boolean
function validateDados( array ) {
    let valide = true ;
    //verificar se temos pelomenos um campo vazio
    for( let element of array  ) {
        if ( element.value.trim() === '' ) {
            valide = false 
            break ;
        }
    }
    // retornar o valor boleano
    return valide ;
}
//renderizar o menu
renderMenu()
function renderMenu(){
    const lis = document.querySelectorAll(".sub-menu li");
    const liPincipis = document.querySelectorAll('.li-p')

    lis.forEach((element,index) => {
        let tipo=0;
        if(index>2)
            tipo=1;

        element.setAttribute("onclick",`trocar(${index},${tipo})`)
    });

    liPincipis.forEach((element,index)=>{
        if(index<2)
            element.setAttribute('onmousein',`mostraSubMenu(${index})`);
        else
            element.setAttribute('onclick',`trocar(${2},${-1})`)
    })
}
//function mostrar a sub menu
function mostraSubMenu( index ) {
    const subMenu = document.querySelectorAll( '.sub-menu' );

    subMenu.forEach( ( element , type ) => {
        if ( type === index ) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
}
//function trocar os componentes 
function trocar(  elemento , type ) {
    //pegar todos componetes
    const nomeComp = document.querySelectorAll('.comp-nome');
    const subMenus = document.querySelectorAll('.sub-menu');
    const contents = document.querySelectorAll('.art')
    const lis = document.querySelectorAll(".sub-menu li");
    
    //verificar se o type e 1
    if( type !== -1 ){
        // verificar se foi chamada tela de editar 
        if( type !== 4 ) {  
            subMenus[ type ].style.display = 'block';
            //Iitens do sub menus
            lis.forEach( ( element , index ) => {
                if ( index === elemento ) {
                    element.style.borderBottomColor='rgb(229, 55, 55)';
                    nomeComp[ type ].innerHTML = element.innerHTML;
                } else {
                    element.style.borderBottomColor='transparent';
                }
            });
        
            // guardar pos da tela actual
            localStorage.setItem( 'pos-tela' , JSON.stringify( `${ elemento } `) );
        } 
        //comparar o tipo para saber 
        if( type === 1 ) {
            showScroll( ( elemento - 3 ) );
        }
        //Conteudo
        contents.forEach((element,index) => {
            if(index===type){
                element.style.display='block';
            }else{
                element.style.display='none';
            }
        });
        mostrarTela( type , elemento );

    }else{
        contents.forEach((element,index) => {
            if(index===elemento){
                element.style.display='block';
                if(index===2)
                    element.style.display="flex";
            }else{
                element.style.display='none';
            }
        });

        if(menuPequenoB){
            document.querySelector('section .menu').style.display='none';
        }
    }

}
//function mostrar tela
function mostrarTela( type , index ) {
    const telasVisual = document.querySelectorAll('.visualizar .div');
    
    if( type === 0  || type === 4 ){
        //pegar as telas de cadastros ou de editar
        const telasCadast =  ( type === 0 )  ? document.querySelectorAll('.cadastro div.cad') : document.querySelectorAll( '.editar .cad' );
        // Para chamar telas de cadastro
        telasCadast.forEach( (element,ind )=>{
            if(ind === index){
                //fazer a tela de acordo com o elemnto
                element.style.display='block';
                //renderizar o cadastro
                if( index === 0 ){
                    renderCadastro( true );
                }
            }else{
                //Fazer desaparecer outras telas
                element.style.display='none';
            }
        })
    }else{
        // chamar telas de vizualização
        telasVisual.forEach( (element , ind )=>{
            if(ind === index-3){
                //fazer a tela de acordo com o elemnto
                element.style.display='block';
                //Pegar o valor do input de serch
                document.querySelector( 'header .user input' ).focus();
            }else{
                //Fazer desaparecer outras telas
                element.style.display='none';
            }
        })

    }

    // para disposetivos pequenos
    if(menuPequenoB){
        //fazer desaparecer o menu vertical
        document.querySelector('section .menu').style.display='none';
    }
}
//Renderizar usuarios , hoteis , lugares turisticos
renderUsuario()
function renderUsuario(){
    const ulUser= document.querySelector(".usuarios ul");
    const ulComp = document.querySelector(".companinhas ul");
    const ulHotel= document.querySelector(".hoteis ul");
    const ulLugares = document.querySelector('.visualizar .lugares ul');
    ulUser.innerHTML=''
    ulComp.innerHTML ='';
    ulHotel.innerHTML='';
    ulLugares.innerHTML='';

    //Renderizar as comapninhas cadastradas
    if( companinhas.length !== 0 ){
        createElementList( companinhas , ulComp , 0 )
    }else{
        ulComp.appendChild(document.createTextNode("Não temos Companinhas cadastrado"));
    }
    //renderizar os usuarios
    if( users.length !== 0 ){
        //chamar a function que cria elemetos
        createElementList( users , ulUser , 2 )
    }else {
        ulUser.appendChild( document.createTextNode('Não temos usuários cadastrado!'));
    }
    //renderizar os hoteis
    if( hoteis.length !== 0 ){
        //chamar a function que cria elemetos
        createElementList( hoteis , ulHotel , 1 )
    }else{
        ulHotel.appendChild(document.createTextNode("Não temos hoteis cadastrado"));
    }
    //Renderizar os lugares turisticos
    if(lugares.length!==0){
        //chamar a function que cria elemetos
        createElementList( lugares , ulLugares , 3 )
    }else{
        ulLugares.appendChild(document.createTextNode('Não tem nem um lugar turistico cadastrado'));
    }
    
}
//function que cria os elementos da lista para usuarios lugares e hoteis
function createElementList( array  , ulComponent , type ) {
    for( let i = 0; i < array.length ; i++ ){
        //criar o elemento li da lista das companinhas
        const li = document.createElement( 'li' );
        //pegar o nome da companinhas cadastrada no Sistema
        li.appendChild( document.createTextNode( array[i].nome ) );
        //criar uma tag img atribuir a src da respectiva empresa
        const img = document.createElement( 'img' );
        img.src = array[i].foto || array[i].file;
        //adicionar a img no elemento li da lista
        li.appendChild( img );
        //criar o link detalhe e fazer as configurações
        const detalheA = document.createElement( 'a' );
        detalheA.setAttribute( 'href',"#" )
        detalheA.appendChild( document.createTextNode( 'Mais detalhes' ) );
        //adicionar uma acção de clique 
        detalheA.setAttribute( 'onclick',`mostrarDetalhe( ${ i },${ type } )` ); 

        //criar um link edit e configurar
        const eliminarA = document.createElement(  'a'  );
        eliminarA.setAttribute(  'href' , '#'  );
        //Adicionar um evento de clique 
        eliminarA.setAttribute(  'onclick' , `eliminarElemento(  ${ i } , ${ type }  )` )
        eliminarA.appendChild(  document.createTextNode( 'Eliminar'  )  );

        // criar eliminar
        const icon = document.createElement( 'i' );
        icon.className = 'fas fa-edit';
        icon.setAttribute( 'onclick' , `callScreemEdit( ${ type } , ${ 4 } , ${ array[ i ].id } )` )
        
        //criar um container para links editar e detalhes
        const div = document.createElement( 'div' );
        div.setAttribute( 'class' , 'div-edit');

        //adicionar elementos no container
        div.appendChild( detalheA );
        div.appendChild( icon )
        div.appendChild( eliminarA );
        
        //adicionar o container no li
        li.appendChild( div );
        // adicionar todo elemento mna lista
        ulComponent.appendChild( li )
    }
}
// Renderizar o cadastro das companinhas, hoteis , lugares turisticos
renderCadastro( false )
function renderCadastro ( type ) {
    //Pegar a ul para alistar todas as províncias
    const ul = ( type ) ? document.querySelector( ".cadastro .companinhas-cad .selecionar ul" ) : document.querySelector( '.editar .companinhas-cad .selecionar ul' );
    //inicializar
    ul.innerHTML="";
    //Fazer a interação para listar todos os elementos
    provincias.forEach( element => {
        //criar um novo li 
        const li = document.createElement( "li" );
        //criar o texto no li
        li.appendChild( document.createTextNode( element ) );
        //adicionar um evento de clique
        li.setAttribute( "onclick" , `selecionarProvincia( ${ provincias.indexOf( element ) } )` )
        //adicionar o li no ul 
        ul.appendChild( li )
    });
}
//renderizar Estatistica
renderEstatistica ()
function renderEstatistica() {
    const lisUS = document.querySelectorAll(".estatistica .usuario ul li");
    lisUS[0].innerHTML+=users.length;
    lisUS[1].innerHTML+=18;

    const lisComp = document.querySelectorAll(".estatistica .companinhas ul li");
    lisComp[0].innerHTML+=companinhas.length;
    lisComp[1].innerHTML+=18;

    const lisHot = document.querySelectorAll(".estatistica .hoteis ul li");
    lisHot[0].innerHTML+=hoteis.length;
    lisHot[1].innerHTML+=18;

    const lisLug = document.querySelectorAll(".estatistica .lugares ul li");
    lisLug[0].innerHTML+=lugares.length;
    lisLug[1].innerHTML+=18;

}
// renderizar notificações
renderNotificacoes () ;
function renderNotificacoes() {
    //pegar todos container 
    const containers = document.querySelectorAll( 'main .art' ) ;
    //Pegar o container completo de notificação
    const contNotif  = document.querySelector( 'main .notificacao' ) ;
    //inicializar
    contNotif.innerHTML = "";
    // criar a lista das notificações
    const ulNotif  = document.createElement( 'ul' );

    if( notificacoes.length !==  0 ){

        notificacoes.map( ( element , index ) => {
            //criar li da lista das notificações
            const li  =  document.createElement( 'li' ) ;
            // criar um texto para o li
            li.appendChild( document.createTextNode( `Temos um novo usuário , com o nome ${ element } ` ) ) ;
            //adicionar um evento de clique para eliminar o mesmo elemento
            li.setAttribute( 'onclick' , `deleteElementoNotif( ${ index } )` )
            
            // adicionar a li na lista
            ulNotif.appendChild( li );
    
        } )
        //adicionar no container gerar das notificações
        contNotif.appendChild( ulNotif );
    } else {
        const p = document.createElement( 'p' );
        p.innerHTML = 'Sem notificações !'

        //Adicionar no container geral das notificações
        contNotif.appendChild( p );
    }

    //fazer a troca 
    containers.forEach ( ( element , index ) => {
        if( index !== containers.length - 2 )
            element.style.display = 'none';
        else 
            element.style.display = 'block' ;
    } )

    //para actualizar o span que lida com a quantidade de notificações 
    const notSpan = document.querySelector('.notificacao span');
    
    if( notificacoes.length !== 0 ){
        notSpan.style.display = "flex";
        notSpan.innerHTML = `${ notificacoes.length }`;
    } else {
        notSpan.style.display = "none";
    }   
}
//function eliminar elemento da notificação
function deleteElementoNotif ( pos ) {
    //Eliminar o elemento no array Notificação
    notificacoes.splice( pos , 1 );

    //guardar as mudanças feitas
    localStorage.setItem( "notificacao-users" , JSON.stringify( notificacoes ));
    // renderizar as notificações
    renderNotificacoes()
}
//Selecionar Provincia  
function selecionarProvincia( index ){
    const lis = document.querySelectorAll(".companinhas-cad .selecionar ul li");
    
    lis.forEach( (element,ind)=> {
        if(ind === index ){
            element.style.backgroundColor = "rgb(229, 55, 55)";
        }
    });

    //Pegar o idProvincia
    indexProvincias.push(index);
}
//Mostrar com detalhes
function mostrarDetalhe( index , type ){
    const detalhe = document.querySelector(".detalhes");
    const ul= document.querySelector(".detalhes ul")
    ul.innerHTML='';

    let res='';
    const img = document.createElement("img");
    switch (type) {
        case 0:
            res=companinhas[index];
            img.src=res.foto;
            break;
        case 1 :
            res = hoteis[index];
            img.src=res.foto;
            break;
        case 2 :
            res = users[index]
            img.src=res.file;
            break;
        case 3:
            res = lugares[index];
            img.src=res.foto;
            break;
   }
   ul.appendChild(img);

    for(const key in res){
        const li = document.createElement('li');
        li.innerHTML= `${key} : ${res[key]}`;
        ul.appendChild(li);
    }
    //criar o botao para sair do model
    const voltar = document.createElement( 'button' )
    //Atribuir uma classe no botão
    voltar.className = 'voltar'
    voltar.appendChild( document.createTextNode( 'X' ) )
    /*Adicionar o evento de clique*/
    voltar.setAttribute( 'onclick' , 'fazerDesaparecerDetalhe()')
    //Adicionar botão
    detalhe.appendChild( voltar )
    detalhe.style.display="block";
}
//Fazer desaparecer os detalhes com duplo click
 const fazerDesaparecerDetalhe = () => {
    const detalhe  =  document.querySelector( ".detalhes" );
    detalhe.style.display = "none" ;
}
// fazer aparecer menu quando para disposetivos mobiles
let aparecerMenu  =  true;
document.querySelector( ".fa-bars" ).addEventListener( "click" , () => {
    const menuPequeno  =  document.querySelector( 'section .menu' );

    if( aparecerMenu ){
        menuPequeno.style.display = 'block';
        aparecerMenu = false;
        menuPequenoB = true;
    } else {
        menuPequeno.style.display = 'none';
        aparecerMenu = true;
        menuPequenoB = false;
    }
})
//function pesquisa elementos de uma lista tanto faz usuários lugares e hoteis
function pesquisaElemento ( ) {
    //Pegar todos containers das lista
    const ulUser= document.querySelector(".usuarios ul");
    const ulComp = document.querySelector(".companinhas ul");
    const ulHotel= document.querySelector(".hoteis ul");
    const ulLugares = document.querySelector('.visualizar .lugares ul');
    //inicializar todos elementos
    ulUser.innerHTML=''
    ulComp.innerHTML ='';
    ulHotel.innerHTML='';
    ulLugares.innerHTML='';
    const posTelaActual = JSON.parse( localStorage.getItem( 'pos-tela' )) || 0;
    //Pegar o valor do input de serch
    const input =  document.querySelector( 'header .user input' );

    // Criar novo receberArray
    var receberArray = [];
    var cont = [];
    console.log( posTelaActual );
    switch ( Number( posTelaActual ) ) {
        case 3 : {
            receberArray = companinhas;
            cont.push( ulComp )
            cont.push( 0 )
            break ;
        }
        case 4 :
            receberArray = users ;
            cont.push( ulUser );
            cont.push( 1 );
            break;
        case 5 :
            receberArray = hoteis ;
            cont.push( ulHotel )
            cont.push( 2 )
            break ;
        case 6 : 
            receberArray = lugares ;
            cont.push(  ulLugares )
            cont.push( 3 )
            break ;
    }

    var pesquisa = receberArray.filter( ( elemento ) => {
        return elemento.nome.toLowerCase().includes( input.value.toLowerCase() )
    } )

    //criar novo elmentos
    createElementList( pesquisa , cont[ 0 ] , cont[ 1 ] )
}

//function eleminar Elementos a partir da area administrativa
var posTipo = []
function eliminarElemento( pos , type ){
    //declarar um novo array
    var arrayNovo = []
    //declararuma nova varial auxiliar
    var tipoNome = '';
    //confirmar se pretendes apagar mesmo
    posTipo = [ pos , type ]
    //chamar o modal confirme
    callModal( 'ask' , 'Queres mesmo eliminar ? ')
    if(false ){
        switch ( type ) {
            case 0 : 
                arrayNovo = companinhas ;
                tipoNome = 'companinhas-cad'
                break ;
            case 1 :
                arrayNovo = hoteis ;
                tipoNome = 'hoteis-cad';
                break ;
            case 2 :
                arrayNovo = users ;
                tipoNome = 'users-project';
                break ;
            case 3 :
                arrayNovo = lugares ;
                tipoNome = 'lugares-cad';
                break;
            }
            //Eliminar o elemento da lista
            arrayNovo.splice( pos , 1 )
        
            //guardar no localStorage
            localStorage.setItem( `${ tipoNome }`, JSON.stringify( arrayNovo ) );
        
            renderUsuario()
            //console.log(arrayNovo);
    }

}

// function chmar a tela editar 
function callScreemEdit( index , typeScreem , id ){
    // chamar a function trocar tela 
    trocar( index ,  typeScreem )
    //escolhe o tipo index para saber qual será o tipo de objecto a ser editado
    switch ( Number( index ) ) {
        case 0 :
            //Pegar os dados do object a partir da posição 
            takeDataObject( companinhas , takePositon( companinhas , id ) , index )
            break;
        case 1 :
            //Pegar os dados do object a partir da posição 
            takeDataObject( hoteis , takePositon( hoteis , id ) , index )
            break;
        case 2 :
            //Pegar os dados do object a partir da posição 
            takeDataObject( users , takePositon( users , id ) , index )
            break;
        case 3 :
            //Pegar os dados do object a partir da posição 
            takeDataObject( lugares , takePositon( lugares , id ) , index )
            break;
    }

}

//function que retorna a posicao actual do elemnto pelo id
function takePositon( array , id ) {
    let pos = -1;
    array.forEach( ( element , index ) => {
        if( element.id ===  id  )
            pos = index ;
    } )

    //retornar a posição do objecto
    return pos ;
}
// Pegar os dados do objeto
function takeDataObject( array , pos , index) {
    
    if( pos !== -1 ) {
        localStorage.setItem( 'pos-edit', JSON.stringify( pos ) );
        //chamar a function para transferir os dados
        gaveDataInputs( array[ pos ] , index ) 
    } else {
        alert( 'Dados não encontrado !' )
    }
}

//function que atribuir os dados nos rspectivos inputs
function gaveDataInputs( element , type ) {
    // Pegar a etiqueta 
    const etiqueta = document.querySelector( '.editar .comp-nome' );
    etiqueta.innerText = '';
    //Escolher o tipo elemento que será inicializado
    switch ( type ) {
        //Inicializar acompaninha para editar
        case 0 :  {
            //Pegar todos inputs do formulário de companinhas
            const inputsComp = document.querySelectorAll( '.editar .companinhas-cad input');
            // pegar a lista das províncias
            const ulProvincias = document.querySelectorAll( '.editar .companinhas-cad ul li ');
            //atribuir dados nos inputs 
            inputsComp[ 0 ].value =  element.nome ;
            inputsComp[ 1 ].value = element.localSede;
            //inicializar as províncias
             ulProvincias.forEach( ( elem ) => {
                if( elem.innerHTML === element.nProvincias[ 0 ] || elem.innerText === element.nProvincias[ 1 ] || elem.innerText === element.nProvincias[ 2 ] ){
                    elem.style.backgroundColor = 'rgb(229, 55, 55)';
                }
            })
            //Atribuir nome a etiqueta
            etiqueta.innerText = `Companinha ${ element.nome }`;
            break;
        }
        //Inicializar Hotel para editar
        case 1 : {
            const inputsHotel = document.querySelectorAll( '.editar .hoteis-cad input' );
            let cont = 0;
            //Inicializar cada input do formulário
            for ( const key in element ){
                if( key !== 'id' && key !== 'foto' )
                    inputsHotel[ cont++ ].value = element[ key ] ;
            }

           //Atribuir nome a etiqueta
           etiqueta.innerText = `Hotel ${ element.nome }`;
            break ;
        }
        //Inicializar o usuário para editar
        case 2 :  {
            const inputsUser = document.querySelectorAll( '.editar .usuario-cad input ')
            
            let cont = 0
            //Inicializar cada input do formulário
            for ( const key in element ){
                if( key !== 'id'  && key !== 'file' )
                    inputsUser[ cont++ ].value = element[ key ];
            }

           //Atribuir nome a etiqueta
           etiqueta.innerText = `Usuário ${ element.nome } `;
            break ;
        }
        //Inicializar o lugar para editar 
        case 3 : {
            const inputLugares = document.querySelectorAll( '.editar .lugares-cad input' );

            let cont = 0 ;
            //Inicializar cada input do formulário
            for ( const key in element ) {
                if( key !== 'id'   && key !== 'foto' )
                   inputLugares[ cont++ ].value = element[ key ]; 
            }
           //Atribuir nome a etiqueta
           etiqueta.innerText = `Lugar Turístico ${ element.nome }`;
            break;
        }
    }
}

//Function que salva todas as alterções feitas
function saveData ( type ) {
    const posEdit = JSON.parse( localStorage.getItem( 'pos-edit' ) );
    switch ( type ) {
        //Guardar os dados da acompaninha editada
        case 'companinhas-cad' :  {
            //Pegar todos inputs do formulário de companinhas
            const inputsComp = document.querySelectorAll( '.editar .companinhas-cad input');
            
            if( validateDados( inputsComp ) ){
                // pegar a lista das províncias
                const ulProvincias = document.querySelectorAll( '.editar .companinhas-cad ul li ');
                //trocar os respectivos valores da companinha
                companinhas[ posEdit ].nome  =  inputsComp[ 0 ].value  ;
                companinhas[ posEdit ].localSede =  inputsComp[ 1 ].value ;
                //guadar as alterações feitas
                localStorage.setItem( type , JSON.stringify( companinhas ));

                //inicializar todos os campos
                inputsComp[ 0 ].value = '';
                inputsComp[ 1 ].value = '';

            } else {
                alert( 'Por favor , preenche todos os dados ! ');
            }
            
            break;
        }
        //Guardar os dados do Hotel editado
        case 'hoteis-cad' : {
            const inputsHotel = document.querySelectorAll( '.editar .hoteis-cad input' );
            let cont = 0;
            //validar os dados
            if ( validateDados ( inputsHotel ) ) {
                for ( let key in hoteis[ posEdit ] ){
                    if( key !== 'id' && key !== 'foto' ){
                        hoteis[ posEdit ][ key ]  =  inputsHotel[ cont ].value ;
                        //iniciar ocampo do input
                        inputsHotel[ cont++ ].value = '';
                    }
                }
                
                // Guardar os novos dados
                localStorage.setItem( type , JSON.stringify( hoteis ) );
            } else {
                alert( 'Por favor , preencha todos os dados !' );
            }

            break ;
        }
        //Guadar os dados do usuário editado
        case 'users-project' :  {
            //pegar todos os inputs do usuário 
            const inputsUser = document.querySelectorAll( '.editar .usuario-cad input ')
            
            let cont = 0
            //validar os dados 
            if( validateDados( inputsUser ) ) {
                //Pegar os novos dados e atribuir para o usuário
                for ( const key in users[ posEdit ] ){
                    if( key !== 'id'  && key !== 'file' ) {
                        users[ posEdit ][ key ]  = inputsUser[ cont ].value ;
                        //Inicializar todos os inputs 
                        inputsUser[ cont++ ].value = '';
                    }
                }
                //Guardar os dados alterados do usuário
                localStorage.setItem( type , JSON.stringify( users ) );

            } else {
                alert( 'Por favor , preencha todos os dados ! ' )
            }

            break ;
        }
        //Guardar os dados do lugar editado 
        case 'lugares-cad' : {
            //Pegar todos os valores de todos os inputs
            const inputLugares = document.querySelectorAll( '.editar .lugares-cad input' );

            let cont = 0 ;
            //Validar todos os dados antes de guardar 
            if( validateDados( inputLugares ) ) {
                //atribuir os novos valores ao hotel cada
                for ( const key in lugares[ posEdit ] ) {
                    if( key !== 'id'   && key !== 'foto' ){
                        lugares[ posEdit ][ key ] = inputLugares[ cont ].value;
                        inputLugares[ cont++ ].value = '';
                    }
                }
                //Guardar os dados alterado 
                localStorage.setItem( type  , JSON.stringify( lugares ) );

            } else {
                alert( 'Por favor , Preencha todos os dados ! ');
            }
            break;
        }
    }
}
//Function que cria scroll de fomra automática
function showScroll( type ){
    
    switch ( type ) {
        case 0:{
            //pegar todos os elementos da lista 
            const listElements = document.querySelectorAll( '.companinhas ul li' );
            if( listElements.length > 5  ){
                document.querySelector( '.visualizar .companinhas' ).style.overflowY = 'scroll' ;
            } else {
                document.querySelector( '.visualizar .companinhas' ).style.overflowY = 'hidden' ;
            }
            break;
        }
        case 1 : {
            const listElements = document.querySelectorAll( '.usuarios ul li' );

            if( listElements.length > 5 ){
                document.querySelector( '.visualizar .usuarios').style.overflowY = 'scroll';
            } else {
                document.querySelector( '.visualizar .usuarios').style.overflowY = 'hidden';
            }
            break ;
        }
        case 2:{
            //pegar todos os elementos da lista 
            const listElements = document.querySelectorAll( '.hoteis ul li' );
            if( listElements.length > 5  ){
                document.querySelector( '.visualizar .hoteis' ).style.overflowY = 'scroll' ;
            } else {
                document.querySelector( '.visualizar .hoteis' ).style.overflowY = 'hidden' ;
            }
            break;
        }
        case 3 : {
            const listElements = document.querySelectorAll( '.lugares ul li' );

            if( listElements.length > 5 ){
                document.querySelector( '.visualizar .lugares').style.overflowY = 'scroll';
            } else {
                document.querySelector( '.visualizar .lugares').style.overflowY = 'hidden';
            }
            break ;
        }
            
    
        default:
            break;
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
           askBtn1.setAttribute( 'onclick' , ` negarBtn() ` );
           const askBtn2 = document.createElement( 'button' );
           askBtn2.className  = 'btn-posetive';
           askBtn2.setAttribute( 'onclick' , `aceitarBtn()`)
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
function saveModal() {
    
    document.querySelector( '.content-modal').innerHTML = '';
    
    changeEvaroment( false )
}
//function que muda o ambiente
function changeEvaroment ( type ) {
    const arrayContents = [ document.querySelector( 'main') ]
    if( type ) {
        arrayContents.map( ( element ) => {
            element.style.opacity = .02
        })
        document.querySelector( 'section .menu').style.opacity = .02; 
    } else {
        arrayContents.map( ( element ) => {
            element.style.opacity = 1
        })
        //Pegar o modal content
        const contentModal = document.querySelector( '.content-modal' );
        //inicializar o modal content
        contentModal.innerHTML = ''
        document.querySelector( 'section .menu').style.opacity = 1; 
    }
}
//function de aceitação
function negarBtn( ) {
    //chamar a function para mudar o ambiente
    changeEvaroment( false );
}
//function de aceitação
function aceitarBtn (  ) {
    let arrayNovo = [] ,tipoNome = null;
    switch ( posTipo[ 1 ] ) {
        case 0 : 
            arrayNovo = companinhas ;
            tipoNome = 'companinhas-cad'
            break ;
        case 1 :
            arrayNovo = hoteis ;
            tipoNome = 'hoteis-cad';
            break ;
        case 2 :
            arrayNovo = users ;
            tipoNome = 'users-project';
            break ;
        case 3 :
            arrayNovo = lugares ;
            tipoNome = 'lugares-cad';
            break;
        }
        //Eliminar o elemento da lista
        arrayNovo.splice( posTipo[ 0 ] , 1 )
    
        //guardar no localStorage
        localStorage.setItem( `${ tipoNome }`, JSON.stringify( arrayNovo ) );
    
        renderUsuario()
        // chamar o save o modal
        callModal( 'load' , 0)
        //trocar o modal loading para confirme depois de 2 segundos
        setTimeout( () => {
            //trocar o modal para loading
            callModal( 'confirm' , 'Eliminado com sucesso !')
            //chamar a function que guarda  o modal depois de 2 segundos
            setTimeout( () => {
                saveModal()        
            } , 2000 )
        } , 2000 )
}