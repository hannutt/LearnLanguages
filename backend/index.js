import express, { request } from 'express'
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

app.get("/questionswe/:id",(req,res)=>{
    const query="SELECT * FROM Questionswe WHERE id=?"
    const val = [req.params.id]
    db.query(query,[val],(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
})

app.get("/voice/:id",(req,res)=>{
    const query="SELECT * FROM voicetext WHERE id=?"
    const val = [req.params.id]
    db.query(query,[val],(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/askhint/:id",(req,res)=>{
    const query="SELECT hinttext FROM Questions WHERE id=?"
    const val = [req.params.id]
    db.query(query,[val],(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
})

app.get("/tablename",(req,res)=>{
    //queryparamit talletetaan muuttujiin, query jälkeinen nimi on sama, mikä se on app.js:ssä queryparamina
    //annettu query kertoo että käsitellään queryparameja
    const table =req.query.table
    const id = req.query.id
   // const id=req.body.questionId
  
    const query=`SELECT * FROM ${table} WHERE id=${id}`
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
   
})

app.get("/continue",(req,res)=>{
    //queryparamit talletetaan muuttujiin, query jälkeinen nimi on sama, mikä se on app.js:ssä queryparamina
    //annettu query kertoo että käsitellään queryparameja
    const table =req.query.tableName
    const id = req.query.idNum
   // const id=req.body.questionId
  
    const query=`SELECT * FROM ${table} WHERE id=${id}`
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
   
})

app.get("/showscores",(req,res)=>{
    const query="SELECT * FROM scores"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
})
app.post("/savescores",(req,res)=>{
    //req.body.username & correctans ovat wordinputissa endpointissa hakasuluissa annetut state-muuttujat
    const nameVal=req.body.userName
    const pointsVal=req.body.correctAns
    
    const query="INSERT INTO scores (`name`,`points`) VALUES (?,?)"
    const values=[nameVal,pointsVal]
    db.query(query,values,(err,data)=>{
        if (err) return res.json(err)
            return res.json(data)

    })
})

app.listen(8800,()=>{
    console.log("server running")

})
