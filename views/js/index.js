//When document is loaded
$(document).ready(function () {
    $('body').i18n();
    $('#user_name').attr("placeholder", $.i18n('Name'));
    $('#user_email').attr("placeholder", $.i18n('Enter email'));
    $('#description').attr("placeholder", $.i18n('Describe your problem'));
});

//Submit data when called
function sendData() {
    var name = $('#user_name').val();
    var email = $('#user_email').val();
    var description = $('#description').val();
    var d = new Date();
    if (name.length > 0) { //catch Enter key
        //POST request to API to create a new ticket entry in the database
        $.ajax({
            method: "POST",
            url: "./api/tickets",
            contentType: "application/json",
            data: JSON.stringify({ name: name, email: email, description: description, datetime: d })
        })
            .done(function (data) {
                if (data && data.name) {
                    if (data._id)
                        $('#response').html($.i18n('Enviado!', AntiXSS.sanitizeInput(data.name)));
                }
                else {
                    $('#response').html(AntiXSS.sanitizeInput(data));
                }
            });
        //Clean the inputs
        var name = $('#user_name').val('');
        var email = $('#user_email').val('');
        var description = $('#description').val('');
    }
};

const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};

//Set the template when adding a new message to the chat
const chatTemplate = (message, from) => `
          <div class="from-${from}">
            <div class="message-inner">
              <p>${message}</p>
            </div>
          </div>
          `;
//Add new messages/divs to the chat
const addTemplate = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
    //This will set the scroll at the bottom of the chat when a new message arrive
    chat.scrollTop = chat.scrollHeight;
};

//Validates if the ticket is ready to be created and, if so, send it to the DB
function addTicket(userData, confirmTicket) {
    if (confirmTicket.confirm === "true") {
        $.ajax({
            method: "POST",
            url: "./api/tickets",
            contentType: "application/json",
            data: JSON.stringify({ name: userData.name, email: userData.email, description: userData.description, datetime: userData.data })
        })
    };
};

//Validates if the ticket is ready to be consulted and, if so, get the data
var checkConsult = false;
function getTicket(checkData, consultTicket) {
    if (consultTicket.confirm === "true" && checkConsult == false) {
        //Get the tickets from the database
        $.get("./api/tickets")
            .done(function (data) {
                if (data.length > 0) {
                    data.forEach(function (element, index) {
                        //Compare the user input (email and name) with the data returned
                        if (data[index].email === checkData.email && data[index].name === checkData.name) {
                            //Set the message that will be sent in the chat along with the ticket
                            var ticket = ("Nome: " + data[index].name + "<br>Email: " + data[index].email + "<br>Data/Hora: " + data[index].datetime + "<br>Descrição: " + data[index].description);
                            var template = chatTemplate(ticket, 'watson');
                            addTemplate(template);
                            //Prevent this method being called all the time after a consult
                            checkConsult = true;
                        }

                    });
                }
            });
    };
};

//Get the data from Watson. Eg: Message, context, etc.
const getWatson = async (text = '') => {
    const uri = './api/watson';

    const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            context,
        }),
    })).json();

    context = response.context;
    const d = new Date();
    const userData = { name: context.name, email: context.email, date: d, description: context.description };
    const checkData = { name: context.name, email: context.email };
    const confirmTicket = { confirm: context.criarTicket }
    const consultTicket = { confirm: context.checkTicket }

    const template = chatTemplate(response.output.text, 'watson');

    addTemplate(template);
    addTicket(userData, confirmTicket);
    getTicket(checkData, consultTicket);
};

//Send message when the key 'Enter" is pressed 
textInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 && textInput.value) {
        getWatson(textInput.value);

        const template = chatTemplate(textInput.value, 'user');
        addTemplate(template);

        textInput.value = '';
    }
});

//Send message when clicked
function sendWatson() {
    if (textInput.value) {
        getWatson(textInput.value);

        const template = chatTemplate(textInput.value, 'user');
        addTemplate(template);

        textInput.value = '';
    }
};
//Load Watson Assistant on page load
getWatson();

//These methods expand and collapse the chat
function collapseChat() {
    $('#chatColumn').addClass("collapse");
    $('#expandBtn').removeClass("collapse");
};
function expandChat() {
    $('#expandBtn').addClass("collapse");
    $('#chatColumn').removeClass("collapse");
};