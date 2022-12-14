import { Streamlit, RenderData } from "streamlit-component-lib"
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';


// Add text and a button to the DOM. (You could also add these directly
// to index.html.)
const span = document.body.appendChild(document.createElement("span"))
const textNode = span.appendChild(document.createTextNode(""))
const button = span.appendChild(document.createElement("button"))
button.textContent = "Click Me!"
// Add a click handler to our button. It will send data back to Streamlit.
// let numClicks = {}
let isFocused = false
button.onclick = function(): void {
  // Increment numClicks, and pass the new value back to
  // Streamlit via `Streamlit.setComponentValue`.

        var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(pass, 'eastus');
        speechConfig.speechRecognitionLanguage = "ga-IE";
        console.log(pass)


        var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(
          function (result) {
            // startRecognizeOnceAsyncButton.disabled = false;
            // phraseDiv.innerHTML += result.text;
            window.console.log(result);
            recognizer.close();
            Streamlit.setComponentValue(result) 
            // recognizer = undefined;
          },
          function (err) {
            // startRecognizeOnceAsyncButton.disabled = false;
            // phraseDiv.innerHTML += err;
            window.console.log(err);

            recognizer.close();
            // recognizer = undefined;
          }); 



  // numClicks += 1
  // Streamlit.setComponentValue(numClicks) 
}

button.onfocus = function(): void {
  isFocused = true
}

button.onblur = function(): void {
  isFocused = false
}

function speak_text(text_to_say: string, pass: string){
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(pass, 'eastus');
  speechConfig.speechSynthesisLanguage = "ga-IE";
  const player = new SpeechSDK.SpeakerAudioDestination();
  const audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player)

  var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig,
    // SpeechSDK.AudioConfig.fromDefaultSpeakerOutput());
    audioConfig);

  synthesizer.speakTextAsync(text_to_say)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
let pass = '';
let text_to_say = '';
function onRender(event: Event):void {
  // Get the RenderData from the event
  const data = (event as CustomEvent<RenderData>).detail

  // Maintain compatibility with older versions of Streamlit that don't send
  // a theme object.
  // if (data.theme) {
  //   // Use CSS vars to style our button border. Alternatively, the theme style
  //   // is defined in the data.theme object.
  //   const borderStyling = `1px solid var(${
  //     isFocused ? "--primary-color" : "gray"
  //   })`
  //   button.style.border = borderStyling
  //   button.style.outline = borderStyling
  // }

  // Disable our button if necessary.
  button.disabled = data.disabled
  if (data.args["hide_button"]){
  button.style.display = 'none';
}

  // RenderData.args is the JSON dictionary of arguments sent from the
  // Python script.
  // let name = data.args["name"]
  pass = data.args["code"]
  text_to_say = data.args["text_to_say"]
  console.log(data.args)
  // Show "Hello, name!" with a non-breaking space afterwards.
  // textNode.textContent = `Hello, ${name}! ` + String.fromCharCode(160)

 if (data.args["speak_aloud"]){
  speak_text(text_to_say, pass);
}

  Streamlit.setFrameHeight()
}
// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight()


