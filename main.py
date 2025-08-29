from fastapi import FastAPI, Query, Form, File, UploadFile, Depends, HTTPException
from datetime import datetime
from enum import Enum
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from routes import users, mentors, mentees, sessions, misc
import model
import schemas
from database import SessionLocal, engine
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import SessionLocal, engine


model.Base.metadata.create_all(bind=engine)

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


app = FastAPI()

fake_items_db = [
    {"item_name": "Item 1"},
    {"item_name": "Item 2"},
    {"item_name": "Item 3"},
    {"item_name": "Item 4"},
    {"item_name": "Item 5"},
    {"item_name": "Item 6"},
]
#---------------routes---------
app.include_router(users.router)
app.include_router(mentors.router)
app.include_router(mentees.router)
app.include_router(sessions.router)
app.include_router(misc.router)
app.include_router(users.router)
# --- Health + root ---
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "message": "Service is healthy",
        "time": datetime.utcnow().isoformat()
    }

@app.get("/")
async def root():
    return {"message": "hello from root"}


# --- Items listing with pagination ---
@app.get("/items/")
async def list_items(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]


# --- Item by ID with optional query params ---
@app.get("/items/{item_id}")
async def read_item(
    item_id: str,
    q: Annotated[str | None, Query(min_length=3, max_length=50)] = None,
    short: bool = False,
):
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update({"description": "This is an amazing item with a long description"})
    return item


# --- Advanced query params ---
@app.get("/search/items/")
async def search_items(
    q: Annotated[
        str | None, 
        Query(min_length=3, max_length=50, pattern="^fixedquery$", alias="item-query")
    ] = None,
    tags: Annotated[list[str] | None, Query()] = None,  # multiple values ?tags=a&tags=b
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    if tags:
        results.update({"tags": tags})
    return results


# --- User endpoints ---
@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}

@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}

@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(
    user_id: int,
    item_id: str,
    needy: Annotated[str, Query(min_length=1)],  # required param
    skip: int = 0,
    limit: int | None = None,
):
    item = {"item_id": item_id, "owner_id": user_id, "needy": needy, "skip": skip, "limit": limit}
    return item


# --- Models Enum example ---
@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}
    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}
    return {"model_name": model_name, "message": "Have some residuals"}


# --- File path ---
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}


# --- Create & Update items ---
@app.post("/items/")
async def create_item(item: Item):
    item_dict = item.dict()
    if item.tax is not None:
        item_dict.update({"price_with_tax": item.price + item.tax})
    return item_dict

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result


# --- Form data (login example) ---
@app.post("/login/")
async def login(
    username: Annotated[str, Form()],
    password: Annotated[str, Form()],
):
    return {"username": username}

#  Single file as raw bytes
@app.post("/file-bytes/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

#  Single file as UploadFile
@app.post("/file-upload/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}

#  Multiple files as raw bytes
@app.post("/files-bytes/")
async def create_files(
    files: Annotated[list[bytes], File(description="Multiple files as bytes")],
):
    return {"file_sizes": [len(file) for file in files]}

#  Multiple files as UploadFile
@app.post("/files-upload/")
async def create_upload_files(
    files: Annotated[list[UploadFile], File(description="Multiple files as UploadFile")],
):
    return {"filenames": [file.filename for file in files]}

#  File + Form field (upload file + some metadata)
@app.post("/file-with-form/")
async def create_file_with_form(
    file: UploadFile,
    description: Annotated[str, Form(...)]  # form field
):
    return {"filename": file.filename, "description": description}

#  Multiple files + Form fields (advanced use case)
@app.post("/files-with-form/")
async def create_files_with_form(
    files: Annotated[list[UploadFile], File(description="Upload multiple files")],
    user_id: Annotated[str, Form(...)]  # another form field
):
    return {"filenames": [file.filename for file in files], "user_id": user_id}