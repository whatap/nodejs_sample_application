"use strict";
var WhatapAgent = require('whatap').NodeAgent;

var d = new Date();
var dateString = d.getTimezoneOffset();

if(dateString < 0) dateString = "GMT+" + ((100 + Math.abs(dateString/60)) + '00').substr(1);
else if(dateString > 0) dateString = "GMT-" + ((100 + Math.abs(dateString/60)) + '00').substr(1);
else dateString = "GMT";

console.log(dateString);
var fs = require('fs');
var path = require('path');
var http = require('http');

var staticBasePath = './html';

var staticServe = function(req, res) {
    var fileLoc = path.resolve(__dirname, staticBasePath);
    fileLoc += req.url;
    if (fileLoc.endsWith('/')){
        fileLoc = fileLoc + 'index.html';
    }
    
    //console.log(__dirname + " // " + fileLoc)


    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
        res.statusCode = 200;
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write(data);
        
        return res.end();
    });
};

var httpServer = http.createServer(staticServe);
httpServer.listen(3500);
