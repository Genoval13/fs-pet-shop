#!/usr/bin/env node

const fs = require('fs');

fs.readFile('./pets.json', 'utf8', (err, data) => {

    //Create process variables
    const subcommand = process.argv[2];
    const arg3 = process.argv[3];
    const arg4 = process.argv[4];
    const arg5 = process.argv[5];
    const arg6 = process.argv[6];
    const dataArr = JSON.parse(data);

    //Creates error message
    if (!subcommand) {console.error('Usage: node pets.js [read | create | update | destroy]')}

    //Read file if read subcommand
    if (subcommand === 'read') {   
        //Throw error if nothing to read
        if (err) throw err;
        //If given an index number, print only that index; otherwise, print all
        if (arg3)    {                
            console.log(JSON.parse(data)[arg3])
        }   else    {
            console.log(dataArr);
        }
    };

    //Create new pet record
    if (subcommand === 'create' && arg3 && arg4 && arg5) {
        const newPet = {"age":parseInt(arg3),"kind":arg4,"name":arg5}
        dataArr.push(newPet);
        fs.writeFile('./pets.json', JSON.stringify(dataArr), (err) =>{
            if (err) throw err;
            console.log(newPet);
        });
    };

    //Update!
    //If update, then pull data array, replace info
    if (subcommand === 'update' && arg3 && arg4 && arg5) {
        const updatePet = {"age":parseInt(arg4),"kind":arg5,"name":arg6}
        dataArr.splice(arg3, 1, updatePet);
        fs.writeFile('./pets.json', JSON.stringify(dataArr), (err) => {
            if (err) throw err;
            console.log(updatePet);
        })
    };

    if (subcommand === 'destroy' && arg3) {
        dataArr.splice(arg3, 1);
        fs.writeFile('./pets.json', JSON.stringify(dataArr), (err) => {
            if (err) throw err;
            console.log('Pet destroyed!');
        })
    };
});