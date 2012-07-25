#!/bin/bash
mongoimport -d bookshop -c books --drop --jsonArray --file books.js
