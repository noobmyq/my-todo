'''
Date: 2021-12-21 17:45:39
LastEditTime: 2021-12-21 20:49:20
FilePath: /new-simple-todo/my-todo/backend/mytodo/__main__.py
'''
import uvicorn

# run server on a default host and port
if __name__ == "__main__":
    uvicorn.run("mytodo.apis:app", host="127.0.0.1", port=8000, reload=True)
