const { json } = require("body-parser");
const fs = require('fs');
const express  = require("express");
const app = express(); 
app.use(express.json());

let  todos  = [{ id:1 , task:"go to gym"},  {id:2 , task:"go to gym"}]




app.get("/todos" , function (req,res){
  const data   = JSON.stringify(todos);


  res.json(data); 

})


app.get("/todos/:id", function (req,res){
    const id  = parseInt(req.params.id);
   let todo = ""
    for(let i = 0 ; i<todos.length ; i++){
     if(todos[i].id == id){
          todo = todos[i].task;
     }
  }
     if(todo.length == 0){
        res.json({
            msg: "Not found"
        })
     }else{
        res.json({
            id:id,
            task:todo 
        })
     }

})

app.post("/todos/save-data" , function (req,res) {
     const todo   = req.body.todo ; 
      const  id  =  Date.now();    


     todos.push({
        "id":id,
        "task":todo 
     })

const jsonString = JSON.stringify(todos, null, 2);

fs.writeFile('a.txt', jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Successfully wrote array of objects to output.txt');
    }
});






     res.json({
        msg:"Done Succesfully"
     })
})


app.put("/todos/edit-data/:id" , function (req,res){
      const id  = parseInt(req.params.id) ;
      const task = req.body.task
      let found  = false  ; 
      for(let i =0 ; i<todos.length ; i++){
        if(todos[i].id == id){
            todos[i].task = task ;
            found  = true 
        }
      }

  
const jsonString = JSON.stringify(todos, null, 2);

fs.writeFile('a.txt', jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
           } else {
        console.log('Successfully wrote array of objects to output.txt');
    }
});


      if(found){
        res.json({msg:"DONE!"})
      }else{
        res.json({msg:"NOT FOUND!"})
      }


})
app.delete ("/todos/delete-data/:id" , function(req,res){
   let dummytodos= []
    const id  = parseInt(req.params.id) ; 
  //  const task  = req.body.task 
    let found  = false 
for(let i =0 ; i<todos.length ; i++){
        if(todos[i].id == id){
            //todos[i].task = task ;
            found  = true 
            continue ;
        }
    else{
         let data  = {id:todos[i].id , task:todos[i].task}
         dummytodos.push(data)

    }


}

todos = dummytodos;


const jsonString = JSON.stringify(todos, null, 2);

fs.writeFile('a.txt', jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
                 } else {
        console.log('Successfully wrote array of objects to output.txt');
    }
});


 
   if(found ){
    res.json("DELETED SUCCESFULLY")
   }else{
    res.json({msg:"NOT FOUND "})
    
   }


  
  
})


app.listen(3000)