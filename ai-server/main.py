import openai
from dotenv import find_dotenv , load_dotenv
import time 
import logging
from datetime import datetime
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


# user_propmt = "orgnize all the files inside this folder each folder contain a type path:/home/tchisama/bubblebox-testing";
user_propmt = "what time is it now in america ? , btw i'm in morocco";




function_descriptions = [
    # {
    #     "name": "pre_answer",
    #     "description": "this function is the first level to answer , it will return all the things needed to run the next function execute command the answer ",
    #     "parameters": {
    #         "type": "object",
    #         "properties":{
    #             "message":{
    #                 "type":"string",
    #                 "description":"the message to display"
    #             },
    #             "prompt":{
    #                 "type":"string",
    #                 "description":"a prompt for another function to run , here tell me what should the next function do"
    #             },
    #             "command":{
    #                 "type":"string",
    #                 "description":"this is a command if you want to get value of something that can help to answer the prompt"
    #             }
    #         }
    #     },
    #     "required":["message"]
    # },
    # {
    #     "name": "get_value_by_command",
    #     "description": "it gets the value of a command,you may need it to get values like files or...",
    #     "parameters": {
    #         "type": "object",
    #         "properties":{
    #             "command": {
    #                 "type":"string",
    #                 "description":"the command to execute"
    #             }
    #         },
    #         "required":["command"]
    #     },
    # },
    {
        "name": "commands_executer",
        "description": "it gets an array of commands for executing them , you can run with any commands , to get values or to execute commands",
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
                        }
                    }
                }
            },
            "required":["commands"]
        },
    }
]



def ask_openai(prompt):
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {"role": "system", "content": "you are Bubble a pro linux user, and your work is to provide with helpful commands, you will get provided with with the path of the current directory , dont use the `cd` command always use relative paths to that i gives you , !import work on the path you get provided with ex : dont ( mkdir hello ) but ( mkdir /home/tchisama/hello ) use the path you get provided , "},
                {"role": "user", "content": prompt},
            ],
            functions=function_descriptions,
            function_call="auto"
        )
        print(completion.choices[0].message)
        return completion.choices[0].message
    except Exception as e:
        print(e)
        return None

# completion = openai.chat.completions.create(
#     model="gpt-3.5-turbo-16k",
#     messages=[
#         {"role": "system", "content": "you are a pro linux user, and your work is to provide with helpful commands, you will get provided with with the path of the current directory , dont use the `cd` command always use relative paths to that i gives you ,"},
#         {"role": "user", "content": user_propmt},
#     ],
#     functions=function_descriptions,
#     function_call="auto"
# )




# output = completion.choices[0].message.content
# print(completion.choices[0].message.function_call)







