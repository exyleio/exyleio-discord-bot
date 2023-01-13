from os.path import isdir
from os import system

deps = [
    # "api",  # controlled by docker compose
]


def pre():
    # install dependencies if it isn't already
    if not isdir("node_modules"):
        system("npm install")
