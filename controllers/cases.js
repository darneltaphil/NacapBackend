const connection = require('../database/dbconfig')

const getAllCases = async (req,res)=>{
    try{
            await connection.query('SELECT * FROM cases',(err,rows)=>{
                if (!err) {
                    res.send(rows);
                }else{
                    console.log(err);
                }
            })

    }catch(err){
        console.log(err)
    }
    
}

const getCaseById = async (req, res)=>{
    const id = req.params.id;
    try{
        await connection.query('SELECT * FROM cases WHERE case_id =?', [id],(err,rows, fields)=>{
            if (!err) {
               res.send(rows);
            }else{
                console.log(err);
            }
        })
    }catch(err){
        console.log(err)
    }
}

const deleteCase = async (req, res) =>{
    const id = req.params.id
    try{
        connection.query('DELETE FROM cases WHERE case_id= ?', [id], (err, rows)=>{
            !err ?res.send("Case deleted succesfully"): res.send(" Somethng went wrong")  
        })
    }catch(err){console.log(err)}
}

const addCase = async (req, res) =>{
    try{
        const data = req.body
        connection.query("INSERT INTO cases (case_id,case_category_id, case_title,          case_details, case_region_id, case_town, case_location, case_reporter_id,            case_date, case_time, status,status_fine, date_created)     VALUES (NULL,?)",[data], (err,rows)=>{
            if(!err){
                res.json({status:true, message:'Data inserted sucessfully'})
            }else{
                console.log(err);
                res.json({status:false, message:"Something went wrong"})
            }
        })
    }catch(err){console.log(err)}
}
const getCaseReporters = async (req,res)=>{
    connection.query('SELECT * FROM case_reporters',(err,rows)=>{
        if (!err) {
            res.send(rows);
         }else{
             console.log(err);
         }

    })
}
exports.getAllCases = getAllCases;
exports.getCaseById = getCaseById;
exports.getCaseReporters = getCaseReporters;
exports.deleteCase = deleteCase;
exports.addCase = addCase;