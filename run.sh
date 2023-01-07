# install dependencies if it isn't already installed
[[ -d node_modules ]] || npm install

docker compose up --build --remove-orphans --pull always
