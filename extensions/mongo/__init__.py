import motor.motor_asyncio

from config import MONGO_URL, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD


client = motor.motor_asyncio.AsyncIOMotorClient(
    f'mongodb://{MONGO_INITDB_ROOT_USERNAME}:{MONGO_INITDB_ROOT_PASSWORD}@{MONGO_URL}'
)
db = client['gptlink']