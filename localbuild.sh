#! /bin/bash

echo Building...

docker build -t localfastball .

echo running...
docker run -e PORT=4000 -p 4000:4000 localfastball

