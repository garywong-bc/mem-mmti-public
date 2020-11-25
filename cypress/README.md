# Notes

```bash

❯ npm start


PERCY_TOKEN=23af732ce64bb040707d1ff362605789f9c980943da962c584ed62c0195e0ccb \
  PERCY_BRANCH=cypress-percy $(npm bin)/percy exec $(npm bin)/cypress \
  open

PERCY_TOKEN=23af732ce64bb040707d1ff362605789f9c980943da962c584ed62c0195e0ccb \
  PERCY_BRANCH=cypress-percy $(npm bin)/percy exec $(npm bin)/cypress \
  run --spec "cypress/integration/homepage.spec.js"

```
