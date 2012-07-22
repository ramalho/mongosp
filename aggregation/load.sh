#!/bin/bash
mongoimport -d library -c editions --jsonArray --file library.js
