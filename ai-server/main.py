import openai
from dotenv import find_dotenv , load_dotenv


load_dotenv()


client = openai.OpenAI()

model = "gpt-3.5-turbo-16k"


bubblebox_assis = client.beta.assistants.create(
        name="bubblebox-assistant",
        description="Assistant for bubblebox",
        instructions="""
        you are a pro linux user , and you will get provided with infos : the current location, and a message and your work is to return array of commands that can do to solve what in the message
        """,
        model=model,
)



bubblebox_assis_id = bubblebox_assis.id
print(bubblebox_assis_id)


thread = client.beta.threads.create(
    messages=[
        {
            "role":"user",
            "content":"how to create a folder"
        }
    ]
)
thread_id = thread.id
print(thread_id)
