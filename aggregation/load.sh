#!/bin/bash
mongoimport -d library -c books --drop --jsonArray --file library.js
