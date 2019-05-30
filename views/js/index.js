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
				  data: JSON.stringify({name: name, email: email, description: description, datetime: d})
				})
                .done(function(data) {
                    if(data && data.name){
                        if(data._id)
                            $('#response').html($.i18n('added_to_database', AntiXSS.sanitizeInput(data.name)));
                        else
                            $('#response').html($.i18n('hello', AntiXSS.sanitizeInput(data.name))); 
                    }
                    else {
                        $('#response').html(AntiXSS.sanitizeInput(data));
                    }
                    $('#nameInput').hide();
                    getNames();
                });
            }
        };

        //Retrieve all the tickets from the database
        function getNames(){
          $.get("./api/tickets")
              .done(function(data) {
                  if(data.length > 0) {
                    data.forEach(function(element, index) {
                      data[index] = AntiXSS.sanitizeInput(element)
                    });
                    $('#databaseNames').html($.i18n('database_contents') + JSON.stringify(data));
                  }
              });
          }

          //Call getNames on page load.
          getNames();

        const textInput = document.getElementById('textInput');
        const chat = document.getElementById('chat');
        
        let context = {};
        
        const chatTemplate = (message, from) => `
          <div class="from-${from}">
            <div class="message-inner">
              <p>${message}</p>
            </div>
          </div>
          `;
        
        const addTemplate = (template) => {
          const div = document.createElement('div');
          div.innerHTML = template;
        
          chat.appendChild(div);
        };
        
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
        
          const template = chatTemplate(response.output.text, 'watson');
        
          addTemplate(template);
        };
        
        textInput.addEventListener('keydown', (event) => {
            if (event.keyCode === 13 && textInput.value) {
                getWatson(textInput.value);
        
            const template = chatTemplate(textInput.value, 'user');
            addTemplate(template);
            
            textInput.value = '';
          }
        });

       function sendWatson() {
            if (textInput.value) {
                getWatson(textInput.value);
        
            const template = chatTemplate(textInput.value, 'user');
            addTemplate(template);
            
            textInput.value = '';
          }
        };
        
        getWatson();        