'''
Date: 2021-12-21 17:45:39
LastEditTime: 2021-12-21 17:49:01
FilePath: /new-simple-todo/my-todo/backend/__main__.py
'''
import uvicorn

# run server
if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)
