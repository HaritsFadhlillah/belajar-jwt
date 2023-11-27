const express = require('express');

const methodGet = (req,res) =>{
    res.end('Contoh menggunakan GET')
}

const methodPost = (req,res) =>{
    res.end('Contoh menggunakan POST')
}

const methodPut = (req,res) =>{
    res.end('Contoh menggunakan PUT')
}

const methodDelete = (req,res) =>{
    res.end('Contoh menggunakan DELETE')
}

module.exports = {
    methodGet,
    methodPost,
    methodPut,
    methodDelete,
}