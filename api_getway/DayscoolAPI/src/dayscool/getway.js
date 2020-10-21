const url = "http://localhost:5000/graphql";
const url_message = "http://ec2-3-235-176-222.compute-1.amazonaws.com:5000/graphql";
const url_notification = "http://ec2-3-236-86-171.compute-1.amazonaws.com:5000/graphql";

var opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: ""
  };
var query = ``;

//Solo usar hasta poder crear usuarios desde autenticación
function createUserTest(username, mail, birthDate, career, role, name, password){
    var user = {};
    query = 
    `mutation{
        createUser(user: {
          username: "${username}",
          mail: "${mail}",
          birthDate: "${birthDate}",
          career: "${career}",
          role: "${role}",
          name: "${name}",
          password: "${password}",
        })
        {
          id
          name
          mail
        }
    }`;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
    .then(res => res.json())
    .then(data =>{
        console.log(data.data.createUser);
        user = data.data.createUser;
    });
    return user;
}

function getAllUsers(){
    var userList = {};
    query =
    `query{
        getAllUsers{
            id
            username
            mail
            birthDate
            career
            role
            name
        }
      }`;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getAllUsers);
          userList = data.data.getAllUsers;
      });
    return userList;
}


function getUserById(id){
    var user = {};
    query = 
    `query{
        getUserById(id: ${id}){
            id
            username
            mail
            birthDate
            career
            role
            name
        }
    }`;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getUserById);
          user = data.data.getUserById;
      });
    return user;
}

function getUserByUsername(username){
    var user = {};
    query =`
    query{
        getUserByUsername(username: "${username}"){
            id
            username
            mail
            birthDate
            career
            role
            name
        }
      }
    `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getUserByUsername);
          user = data.data.getUserByUsername;
      });
    return user;
}
function getUserByMail(mail){
    var user = {};
    query =`
    query{
        getUserByMail(mail: "${mail}"){
            id
            username
            mail
            birthDate
            career
            role
            name
        }
      }
    `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getUserByMail);
          user = data.data.getUserByMail;
      });
    return user;
}
function updateUser(id,username, mail, birthDate, career, role, name, password){
    var user = {};
    query = ` mutation{
        updateUser(id:${id}, 
            user:{
                username: "${username}",
                mail: "${mail}",
                birthDate: "${birthDate}",
                career: "${career}",
                role: "${role}",
                name: "${name}",
                password: "${password}"
        }){
            id
            username
            mail
            birthDate
            career
            role
            name
        }
      }`;
      opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data.data.updateUser);
            user = data.data.updateUser;
        });
      return user;
}
function deleteUser(id){
    query = `
    mutation{
        deleteUser(id:${id})  
    }
    `;
    opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        });
}


//_______________Message______________________

async function allConversations(idUs) {
    var conversations;
    //QUERY obtener todas las conversacines de un usuario con parametros
    var query =
        ` query {
                allConversations(idUs: ${idUs}){
                id
                usuario1Id
                usuario2Id
                }
         }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.allConversations);
            conversations = data.data.allConversations;
        });
    return conversations;

}

async function getMessagesbyConversation(idUs, idConv) {
    var messages;
    //QUERY obtener los mensajes de una conversacion
    var query =
        `query {
                getMessagesbyConversation(idUs: ${idUs},idConv: ${idConv}){
                id
                text
                sendDate
                remitenteId
                }
         }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.getMessagesbyConversation);
            messages = data.data.getMessagesbyConversation;
        });
    return messages;
}

async function createConversation(idUsRemitente, idUsDestinatario, ) {
    var conversation;
    //QUERY Crear una conversacion con parametros
    var query =
        ` mutation {
                createConversation(idUs: ${idUsRemitente}, conversation:{
                    usuario1Id: ${idUsRemitente},
                    usuario2Id: ${idUsDestinatario}
                }){
                    id
                    usuario1Id
                    usuario2Id
                } 
                }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.createConversation);
            conversation = data.data.createConversation;
        });
    return conversation;
}

async function createMessage(idUs, idConv, text) {
    //Variable para guardar el destinatario
    var message;
    var idDestinatario;
    //Fecha actual para creación de mensaje y notificación
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //QUERY Crear un mensaje con parametros
    var query =
        ` mutation {
            createMessage(idUs: ${idUs},idConv: ${idConv}, message:{
                conversationId:${idConv},
                text: "${text}"
                sendDate:"${date}"
                remitenteId:${idUs}
            }){
            id
            text
            sendDate
            remitenteId
            }
            }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.createMessage);
            message = data.data.createMessage;
        });

    //QUERY para obtener conversaciones de usuario
    var query = `query {
                    allConversations(idUs: ${idUs}){
                        id
                        usuario1Id
                        usuario2Id
                        } 
                    }`;
    //Hacer la peticion a GraphQL
    idDestinatario = await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {
            //Filtrar la respuesta a la conversación del mensaje que se creo
            let newArray = data.data.allConversations.filter(conversation => conversation.id === idConv);
            //Obtener el destinatario segun el ususario emisor del mensaje
            if (newArray[0].usuario1Id === idUs) {
                idDestinatario = newArray[0].usuario2Id;
            } else {
                idDestinatario = newArray[0].usuario1Id;
            }
            return idDestinatario
        });

    console.log(idDestinatario);
    //QUERY Crear un mensaje con parametros
    var query = `mutation {
                createNotification(notification: {
                    userId: ${idDestinatario},
                    conversationId: ${idConv},
                    message:"${text}",
                    senderId: ${idUs}
                    }) {
                    userId
                    conversationId
                    message
                    senderId
                    }
                    }`;
    //Crear la notificación
    await fetch(url_notification, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => { console.log(data.data) });
    return message;
}

async function deleteConversation(idUs, idConv) {
    
    //QUERY Crear un mensaje con parametros
    var query =
        ` mutation {
            deleteConversation(idUs: ${idUs},idConv: ${idConv})
   
        }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => {console.log(data.data)});

}

async function deleteMessage(idUs, idConv, idMsg) {
    
    //QUERY Crear un mensaje con parametros
    var query =
        ` mutation {
                deleteMessage(idUs: ${idUs},idConv: ${idConv}, idMsg: ${idMsg})
        }`;
    //Hacer la peticion a GraphQL
    await fetch(url_message, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) })
        .then(res => res.json())
        .then(data => { console.log(data.data) });

}



//_______________Notification______________________

async function getAllNotifications(userId){
    var allnotifications;
    var query =`query {
            getAllNotifications(userId: ${userId}){
                _id
                userId
                date
                message
                }
            }`;

    opts["body"] = JSON.stringify({ query });
    await fetch(url_notification, opts)
    .then(res => res.json())
    .then(data =>{
        console.log(data.data.getAllNotifications);
        allnotifications = data.data.getAllNotifications;
    });
    return allnotifications;
}

async function getNotification(userId,notId){
    var notification;
    console.log(notId)
    var query =`query {
            getNotification(userId: ${userId}, notId: "${notId}"){
                _id
                userId
                date
                message
                }
            }`;

    opts["body"] = JSON.stringify({ query });
    await fetch(url_notification, opts)
    .then(res => res.json())
    .then(data =>{
        console.log(data.data.getNotification);
        notification = data.data.getNotification;
    });
    return notification;
}

async function deleteNotification(userId, notId){
    var message;
    var query =`mutation {
        deleteNotification(userId: ${userId}, notId: "${notId}"){
            message
            }
        }`;

    opts["body"] = JSON.stringify({ query });
    await fetch(url_notification, opts)
    .then(res => res.json())
    .then(data =>{
        console.log(data.data.deleteNotification);
        message = data.data.deleteNotification;
    });
    return message;
}

async function deleteAllNotifications(userId){
    var message;
    var query =`mutation {
            deleteNotifications(userId: ${userId}){
                message
                }
            }`;

    opts["body"] = JSON.stringify({ query });
    await fetch(url_notification, opts)
    .then(res => res.json())
    .then(data =>{
        console.log(data.data.deleteNotifications);
        message = data.data.deleteNotifications;
    });
    return message;
}

//Pruebas
document.getElementById("createUserTest").onclick = function(){
    createUserTest("prueba104", "prueba104@mail.com", "1998-11-09", "engineering", "student", "prueba", "1234");
}
document.getElementById("getAllUsers").onclick = function(){
    getAllUsers();
}
document.getElementById("getUserById").onclick = function(){
    getUserById(1);
}
document.getElementById("getUserByMail").onclick = function(){
    getUserByMail("prueba@mail.com");
}
document.getElementById("getUserByUsername").onclick = function(){
    getUserByUsername("prueba");
}
document.getElementById("updateUser").onclick = function(){
    updateUser(1, "pruebaeditada", "pruebaeditada@mail.com", "1997-11-09", "eng", "professor", "editado", "12345");
}
document.getElementById("deleteUser").onclick = function(){
    deleteUser(27);
}


// Pruebas message
document.getElementById("allConversations").onclick = function () { allConversations(555) };
document.getElementById("getMessagesbyConversation").onclick = function () { getMessagesbyConversation(555, 11) };
document.getElementById("createConversation").onclick = function () { createConversation(555,2)};
document.getElementById("createMessage").onclick = function () { createMessage(2, 16, "Hola 555") };
document.getElementById("deleteConversation").onclick = function () { deleteConversation(555, 16) };
document.getElementById("deleteMessage").onclick = function () { deleteMessage(1, 5, 40) };
//pruebas notification
document.getElementById("getAllNotifications").onclick = function(){getAllNotifications(1)};
document.getElementById("getNotification").onclick = function(){getNotification(1,"5f83c608f7a2ac0019847eb0")};
document.getElementById("deleteNotification").onclick = function(){deleteNotification(3,"5f83ce9af7a2ac0019847eb2")};
document.getElementById("deleteNotifications").onclick = function(){deleteAllNotifications(3)};



//---------------------------------------- Activities ---------------------------------------------------------

function getAllCategorias(){
    var categoryList = {};
    query =
    `query{
        getAllCategorias{
          idCurso
          Nombre
          Fecha
          FechaEntrega
          Descripcion
          Archivo
        }
      }
      `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getAllCategorias);
          categoryList = data.data.getAllCategorias;
      });
    return categoryList;
}

function getCategoriaById(id){
    var actividad = {};
    query = 
    `query{
        getCategoriaById(id:"${id}"){
          idCurso
          Nombre
          Fecha
          FechaEntrega
          Descripcion
          Archivo
        }
      }
      `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getCategoriaById);
          actividad = data.data.getCategoriaById;
      });
    return actividad;
}

function getCategoriaByCurso(id){
    var actividad = {};
    query =`
    query{
        getCategoriaByCurso(idCurso:"${id}"){
            idCurso
          Nombre
          Fecha
          FechaEntrega
          Descripcion
          Archivo
        }
      }
    `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getCategoriaByCurso);
          actividad = data.data.getCategoriaByCurso;
      });
    return actividad;
}

function createActividad(id,idcurso, nombre, fecha, fechaentrega, descripcion, archivo){
    var actividad = {};
    query = ` mutation{
        createActividad(actividad: {
            id: "${id}",
            idCurso: "${idcurso}",
            Nombre: "${nombre}",
            Fecha: "${fecha}",
            FechaEntrega: "${fechaentrega}",
            Descripcion: "${descripcion}",
            Archivo: "${archivo}"
        }){
            idCurso
        Nombre
        Fecha
        FechaEntrega
        Descripcion
        Archivo
      }
    }
    `;
      opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data.data.createActividad);
            actividad = data.data.createActividad;
        });
      return actividad;
}

function updateActividad(id,idcurso, nombre, fecha, fechaentrega, descripcion, archivo){
    var actividad = {};
    query = ` mutation{
        updateActividad(id: "${id}", actividad: {
                id:"${id}",
          idCurso:"${idcurso}",
          Nombre:"${nombre}",
          Fecha:"${fecha}",
          FechaEntrega:"${fechaentrega}",
          Descripcion:"${descripcion}",
          Archivo:"${archivo}"
        })
    }
    `;
      opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data.data.updateActividad);
            actividad = data.data.updateActividad;
        });
      return actividad;
}

function deleteActividad(id){
    query = `
    mutation{
        deleteActividad(id:"${id}")
      }
    `;
    opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        });
}
// ---------------------------- Entregas ----------------------------

function getAllEntregas(){
    var entregaList = {};
    query =
    `query{
        getAllEntregas{
            idUsuario
            idActividad
            Nombre
            Fecha
            Descripcion
            Archivo
            Calificacion
        }
      }
      `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getAllEntregas);
          entregaList = data.data.getAllEntregas;
      });
    return entregaList;
}

function getEntregaById(id){
    var entrega = {};
    query = 
    `query{
        getEntregaById(id:"${id}"){
            idUsuario
            idActividad
            Nombre
            Fecha
            Descripcion
            Archivo
            Calificacion
        }
      }
      `;
    opts["body"] = JSON.stringify({ query });
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
          console.log(data.data.getEntregaById);
          entrega = data.data.getEntregaById;
      });
    return entrega;
}

function createEntrega(id, idusuario, idactividad, nombre, fecha, descripcion, archivo, calificacion){
    var entrega = {};
    query = ` mutation{
        createEntrega(entrega: {
            id: "${id}",
        idUsuario: "${idusuario}",
        idActividad: "${idactividad}",
        Nombre: "${nombre}",
        Fecha: "${fecha}",
        Descripcion: "${descripcion}",
        Archivo: "${archivo}",
        Calificacion: "${calificacion}"
        }){
            idUsuario
          idActividad
          Nombre
          Fecha
          Descripcion
          Archivo
          Calificacion
      }
    }
    `;
      opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data.data.createEntrega);
            entrega = data.data.createEntrega;
        });
      return entrega;
}

function updateEntrega(id, idusuario, idactividad, nombre, fecha, descripcion, archivo, calificacion){
    var entrega = {};
    query = ` mutation{
        updateEntrega(id: "${id}", entrega: {
                id:"${id}",
          idUsuario:"${idusuario}",
          idActividad:"${idactividad}",
          Nombre:"${nombre}",
          Fecha:"${fecha}",
          Descripcion:"${descripcion}",
          Archivo:"${archivo}",
          Calificacion:"${calificacion}"
        })
    }
    `;
      opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data.data.updateEntrega);
            entrega = data.data.updateEntrega;
        });
      return entrega;
}

function deleteEntrega(id){
    query = `
    mutation{
        deleteEntrega(id:"${id}")
      }
    `;
    opts["body"] = JSON.stringify({ query });
      fetch(url, opts)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        });
}


// Pruebas message
document.getElementById("getAllCategorias").onclick = function () { getAllCategorias() };
document.getElementById("getCategoriaById").onclick = function () { getCategoriaById("5f75068ceef5ccb5f939b96e") };
document.getElementById("getCategoriaByCurso").onclick = function () { getCategoriaByCurso("5f75068ceef7")};
document.getElementById("createActividad").onclick = function () { createActividad("2f75068ceef5ccb5f939b96e", "5f75068ceef7", "Prueba API Gateway", "2020/10/19", "2020/10/20", "Prueba para verificar api gateway", "gateway.pdf") };
document.getElementById("updateActividad").onclick = function () { updateActividad("2f75068ceef5ccb5f939b96e", "5f75068ceef7", "Prueba API Gateway 2", "2020/10/19", "2020/10/20", "Prueba para verificar api gateway 2", "gateway2.pdf") };
document.getElementById("deleteActividad").onclick = function () { deleteActividad("2f75068ceef5ccb5f939b96e") };
//pruebas entregas
document.getElementById("getAllEntregas").onclick = function () { getAllEntregas() };
document.getElementById("getEntregaById").onclick = function () { getEntregaById("5f750692eef5ccb5f939b98c") };
document.getElementById("createEntrega").onclick = function () { createEntrega("8f750692eef5ccb5f939b98c", "5", "6", "Prueba API Gateway", "2020/10/19", "Prueba para verificar api gateway", "3.5") };
document.getElementById("updateEntrega").onclick = function () { updateEntrega("8f750692eef5ccb5f939b98c", "6", "7", "Prueba API Gateway 2", "2020/10/19", "Prueba para verificar api gateway 2", "3.6") };
document.getElementById("deleteEntrega").onclick = function () { deleteEntrega("8f750692eef5ccb5f939b98c") };                                                                                                        
//---------------------------------------- End Activities ---------------------------------------------------------