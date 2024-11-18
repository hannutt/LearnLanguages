import express from 'express'
import mysql from "mysql2"
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root512!",
    database:"LearnDB"
    
})
app.use(express.json())

//cors antaa "luvan" frontendille käyttää backendiä.
app.use(cors())


app.get("/",(req,res)=>{
    res.json("this is backend")
})

app.get("/question/:id",(req,res)=>{
    const query="SELECT * FROM Questions WHERE id=?"
    const val = [req.params.id]
    db.query(query,[val],(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
})

app.listen(8800,()=>{
    console.log("server running")

})