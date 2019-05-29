const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watsonAssistant = new AssistantV1({
    version: '2019-02-28',
    iam_apikey: 'UxwM5PviQxspJe-LweiDuJyzMDrSsjfOW5bFCwvIf5m-',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

module.exports = watsonAssistant;