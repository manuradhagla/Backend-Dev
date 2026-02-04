import express from 'express';
import {}   
export let mid1 = (req, res, next) => {
    console.log(`${ req.url } method ${ req.method }`)
    console.log("this is mid1")
    next()
}

export let validationpost = (req, res, next) => {
    let { name, city } = req.body;
    if (name == "" && city == "") {
        res.status(404).json({ message: "name and city can not be empty" });
        return;
    }
}