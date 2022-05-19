let name = null;
let roomNo = null;
let socket_canvas=io.connect('/canvas');
let socket_chat= io.connect('/chat');
let socket_KG= io.connect('/KG');
const service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
const apiKey= 'AIzaSyAG7w627q-djB4gTTahssufwNOImRqdYKM';


/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    //@todo here is where you should initialise the socket operations as described in teh lectures (room joining, chat message receipt etc.)
    initChatSocket();
    initKGSocket();
}
function initKGSocket() {
    socket_KG.on('kg_on',function (room, imageUrl, row, color){
        showKgList(row, color);
        console.log("12345678");
    })
};


function initChatSocket() {
    // called when someone joins the room. If it is someone else it notifies the joining of the room
    socket_chat.on('joined', function (room, userId) {
        if (userId === name) {
            // it enters the chat
            hideLoginInterface(room, userId);
            //
            getCachedData(userId).then(r => console.log('Successful'));
        } else {
            // notifies that someone has joined the room
            writeOnHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });



};
    // called when a message is received
    socket_chat.on('chat', function (room, userId, chatText) {
        let who = userId
        if (userId === name) who = 'Me';
        writeOnHistory('<b>' + who + ':</b> ' + chatText);

        storeCachedData({userId: userId, chatText: chatText,room:room})
            .then (r =>console.log('successful') )
            .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))
    })




/**
 * called to generate a random room number
 * This is a simplification. A real world implementation would ask the server to generate a unique room number
 * so to make sure that the room number is not accidentally repeated across uses
 */
function generateRoom() {
    roomNo = Math.round(Math.random() * 10000);
    document.getElementById('roomNo').value = 'R' + roomNo;
}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    // @todo send the chat message
    socket_chat.emit('chat', roomNo, name, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    let imageUrl= document.getElementById('image_url').value;
    if (!name) name = 'Unknown-' + Math.random();
    //@todo join the room
    initCanvas(socket_canvas, imageUrl, roomNo, name);
    hideLoginInterface(roomNo, name);

    socket_chat.emit('create or join', roomNo, name);
}

/**
 * it appends the given html text to the history div
 * this is to be called when the socket receives the chat message (socket.on ('message'...)
 * @param text: the text to append
 */
function writeOnHistory(text) {
    if (text==='') return;
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    // scroll to the last element
    history.scrollTop = history.scrollHeight;
    document.getElementById('chat_input').value = '';
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}


function widgetInit(){
    let type= document.getElementById("myType").value;
    if (type) {
        let config = {
            'limit': 10,
            'languages': ['en'],
            'types': [type],
            'maxDescChars': 100,
            'selectHandler': selectItem,
        }

        KGSearchWidget(apiKey, document.getElementById("myInput"), config);
        document.getElementById('typeSet').innerHTML= 'of type: '+type;
        document.getElementById('widget').style.display='block';
        document.getElementById('typeForm').style.display= 'none';
    }
    else {
        alert('Set the type please');
        document.getElementById('widget').style.display='none';
        //document.getElementById('resultPanel').style.display='none';
        document.getElementById('typeSet').innerHTML= '';
        document.getElementById('typeForm').style.display= 'block';
    }
}

/**
 * callback called when an element in the widget is selected
 * @param event the Google Graph widget event {@link https://developers.google.com/knowledge-graph/how-tos/search-widget}
 */
function selectItem(event){
    let row= event.row;
    console.log(row);
    console.log(typeof (row.json));
    let imageUrl= document.getElementById('image_url').value;
    let color = $('input:radio[name="color"]:checked').val();
    socket_KG.emit('kg_emit', room, imageUrl, row, color);
    console.log("======================");
    storeKnowledgeData({room: room, row: row, color: color})
        .then (r =>'Successful')
        .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))
}

function knowledge_graph_flash(){
    document.getElementById('widget').style.display='none';
    //document.getElementById('resultPanel').style.display='none';
    document.getElementById('typeSet').innerHTML= '';
    document.getElementById('typeForm').style.display= 'block';
    document.getElementById('myInput').value = '';
    document.getElementById('myType').value = '';
}

function showKgList(row, color){
    $('#kg-list').append(
        $(`
        <div class="result-body" style = "border-style: solid; border-color: ${color}">
          <h3>${row.name}</h3>
          <h4>${row.description}</h4>
          <div>${row.rc}</div>
          <div>
            <a href="${row.qc}" target="_blank">
              Link to Webpage
            </a>
          </div>
        </div>
    `)
    )
}