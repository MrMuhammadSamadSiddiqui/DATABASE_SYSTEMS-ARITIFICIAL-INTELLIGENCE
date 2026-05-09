import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { error } from 'node:console'

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())

const port=process.env.PORT
const url=process.env.URL
const key=process.env.KEY


export const sb=createClient(
    url,
    key
)

app.post('/register',async(req,res)=>{

    const {
            full_name,
            father_name,
            guardian_contact,
            date_of_birth,
            education_board,
            class_year,
            has_sibling,
            siblings
        }=req.body

    const{data:grades,error:gradeerror}=await sb.from('grade_levels').select('id').ilike('name',education_board.trim()).maybeSingle()
    if(gradeerror){
        return res.status(400).json({
            error:gradeerror.message
        })
    }


       const siblingrolls=siblings.map(s=>s.roll)
    const {data:existingstudents,error:studentcheckerror}=await sb.from('students').select('student_id,roll_no').in('roll_no',siblingrolls)
    if(studentcheckerror){
       return res.status(400).json({
            error:'Sibling Info Error'
        })
    }       
 
    const exist_rolls=existingstudents.map(s=>s.roll_no)

    const invalid=[]
    for(let i=0;i<siblingrolls.length;i++){
        let check=false
        for(let j=0;j<exist_rolls.length;j++){
            if(siblingrolls[i]==exist_rolls[j]){
                check=true
            }
        }
        if(!check){
            invalid.push(siblingrolls[i])
        }
    }
    if(invalid.length>0){
          return res.status(400).json({error:`Sibling is not a student:${invalid.join(', ')}`})
    }
   
    const{data:std,error:stderror}=await sb.from('register_students').insert([{full_name,father_name, guardian_contact,date_of_birth,grade_level_id:grades.id,class_year,has_sibling:has_sibling==='yes'}]).select().single()
    if(stderror){
        return res.status(400).json({
            error:stderror.message
        })
    }

    if(has_sibling==='yes'&&siblings.length>0){

 

const sibrow = []
for(let i=0;i<siblings.length;i++){
    let studentid = null
    for(let j=0;j<existingstudents.length;j++){
        if(siblings[i].roll==existingstudents[j].roll_no){
            studentid=existingstudents[j].student_id
        }
    }
    sibrow.push({
        register_id:std.register_id,
        sibling_id:studentid
    })}

        const {error:siberror}=await sb.from('siblings').insert(sibrow)
         if(siberror){
        return res.status(400).json({
            error:siberror.message
        })
    }
    }
    return res.status(200).json({message:'Registration Successfull'})
})


app.post('/login_student',async(req,res)=>{
    const{roll, pass}=req.body
    const{data:std_data,error:std_error}=await sb.from('students').select('roll_no').eq('roll_no',roll).eq('password',pass).maybeSingle()
    if(std_error){
        return res.status(400).json({
            error:std_error.message
        })
    }
    if(!std_data){
        return res.status(401).json({
        error:"Invalid credentials"
        })
    }

    return res.json({
        message:"Login successful"
    })
})


function correct_date(i){
    const dat = new Date(i);
    const months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const formatted_date=String(dat.getDate()).padStart(2,'0')+ '-'+ months[dat.getMonth()]+ '-'+ dat.getFullYear();
    return formatted_date
}

app.post('/login_teacher',async(req,res)=>{
    const{id, pass}=req.body
    const{data:std_data,error:std_error}=await sb.from('teachers').select('*').eq('id',id).eq('password',pass).maybeSingle()
    if(std_error){
        return res.status(400).json({
            error:std_error.message
        })
    }
    if(!std_data){
        return res.status(401).json({
        error:"Invalid credentials"
        })
    }

std_data.created_at = correct_date(std_data.created_at);

    return res.json({
        message:"Login successful",
        teacher:std_data
    })
})

app.post('/teacher_courses',async (req,res)=>{
    const{id}=req.body
    const{data:course,error:course_error}=await sb.from("courses").select(`subject_id,created_at,student_count,subjects (id,name, grade_levels(id,name))`).eq('teacher_id', id).eq('is_published', true);
    for(let i=0;i<course.length;i++){
        course[i].created_at=correct_date(course[i].created_at)
    }
    
    if(course_error){
        return res.status(400).json({
            error:std_error.message
        })
    }
    if(course.length==0){
        return res.status(401).json({
            error:"No Course Assigned Yet"
        })
    }
    else{
        return res.json({data:course})
    }
})

app.listen(port,()=>{
    console.log('Server is running on ',port)
})