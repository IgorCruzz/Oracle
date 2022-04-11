#!/bin/bash
echo "Deploying..." && \
yarn build-backend-admin && \
git add . && \
git commit -m "$1" && \
git push && \
echo "Done!"
