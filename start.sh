#!/bin/bash

# Name of the file to run
FILE="index.js"

# Try running with nodemon
if command -v nodemon &> /dev/null; then
    echo "Starting with nodemon..."
    nodemon "$FILE"
else
    echo "nodemon not found, running with node..."
    node "$FILE"
fi
