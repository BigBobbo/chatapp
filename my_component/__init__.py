import os
import streamlit.components.v1 as components

import azure.cognitiveservices.speech as speechsdk


_component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "my_component",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",

    )

def my_component(name, code, text_to_say, hide_button=False, key=None):
    user_input = _component_func(name=name, key=key, default={'privText':""},  code=code, text_to_say=text_to_say, hide_button=hide_button)
    return user_input