import openai
from dotenv import find_dotenv , load_dotenv
import time 
import logging
from datetime import datetime
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


user_propmt = "orgnize this folder by types  /home/tchisama/Downloads";




function_descriptions = [
    {
        "name": "get_value_by_command",
        "description": "it gets the value of a command,you may need it to get values like files or...",
        "parameters": {
            "type": "object",
            "properties":{
                "command": {
                    "type":"string",
                    "description":"the command to execute"
                }
            },
            "required":["command"]
        },
    },
    {
        "name": "commands_executer",
        "description": "it gets an array of commands for executing them",
        "parameters": {
            "type": "object",
            "properties":{
                "commands": {
                    "type":"array",
                    "description":"an array of commands to execute",
                    "items":{
                        "type":"object",
                        "properties":{
                            "command":{
                                "type":"string",
                                "description":"the command to execute"
                            },
                            "message":{
                                "type":"string",
                                "description":"the message to display after executing the command"
                            }
                        }
                    }
                }
            },
            "required":["commands"]
        },
    }
]




completion = openai.chat.completions.create(
    model="gpt-3.5-turbo-16k",
    messages=[
        {"role": "system", "content": "you are a pro linux user, and your work is to provide with helpful commands, you will get provided with with the path of the current directory , dont use the `cd` command always use relative paths to that i gives you ,"},
        {"role": "user", "content": user_propmt},
    ],
    functions=function_descriptions,
    function_call="auto"
    )




output = completion.choices[0].message.content
print(completion.choices[0].message.function_call)







