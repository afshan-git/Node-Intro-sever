import express from 'express'
import bp from 'body-parser'
import morgan from 'morgan'

const app = express()

app.use(bp.urlencoded({extended: true}))
//makes sure that we can parse the query string

app.use(bp.json())
//allows to parse json body of POST requests

app.use(morgan('dev'))

//database
const db = []

app.post('/todo', (req,res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text
    }

    db.push(newTodo)
    res.json(newTodo)
} )

app.get('/todo', (req,res) => {
    res.json(db)
})

app.get('/todo/:id', (req,res) => {
    const todo = db.find(t => {
        return t.id === +req.params.id
    })
    res.json({data: todo})
    
})


app.listen(process.env.PORT,() =>{
    console.log("Srver on http://localhost:8000")
})