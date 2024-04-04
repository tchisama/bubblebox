import openai
from dotenv import find_dotenv , load_dotenv
import time 
import logging
from datetime import datetime

load_dotenv()


client = openai.OpenAI()

model = "gpt-3.5-turbo-16k"






# bubblebox_assis = client.beta.assistants.create(
#         name="bubblebox-assistant",
#         description="Assistant for bubblebox",
#         instructions="""you are a pro linux user , and you will get provided with infos : the current location, and a message and your work is to return array of commands that can do to solve what in the message. """,
#         model=model,
# )
#
#
#
# bubblebox_assis_id = bubblebox_assis.id
# print(bubblebox_assis_id)
#
#
# thread = client.beta.threads.create(
#     messages=[
#         {
#             "role":"user",
#             "content":"how to create a folder"
#         }
#playground     ]
# )
# thread_id = thread.id
# print(thread_id)

# hard code our ids


asistant_id = "asst_RqF4CFlnS2vH5QylYI1Pc3TR"
thread_id = "thread_yrNTom5UY4n71F0tcoUAQ8eg"


# create a message 
#
#
message = "how to create a folder"
message = client.beta.threads.messages.create(
    thread_id=thread_id,
    role="user",
    content=message
)


# to run our assistants
#
run = client.beta.threads.runs.create(
    assistant_id=asistant_id,
    thread_id=thread_id,
    instructions="give the user a commands he want"
)




 

def wait_for_run_completion(client, thread_id, run_id, sleep_interval=5):
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                elapsed_time = run.completed_at - run.created_at
                formatted_elapsed_time = time.strftime(
                    "%H:%M:%S", time.gmtime(elapsed_time)
                )
                print(f"Run completed in {formatted_elapsed_time}")
                logging.info(f"Run completed in {formatted_elapsed_time}")
                # Get messages here once Run is completed!
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                response = last_message.content[0].text.value
                print(f"Assistant Response: {response}")
                break
        except Exception as e:
            logging.error(f"An error occurred while retrieving the run: {e}")
            break
        logging.info("Waiting for run to complete...")
        time.sleep(sleep_interval)


# === Run ===
wait_for_run_completion(client=client, thread_id=thread_id, run_id=run.id)



run_steps = client.beta.threads.runs.steps.list(thread_id=thread_id, run_id=run.id)
print(f"Steps---> {run_steps.data[0]}")
