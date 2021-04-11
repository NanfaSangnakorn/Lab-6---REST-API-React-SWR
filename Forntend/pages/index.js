// npm install -g create-next-app    //ติดตั้งแล้ว 
// create-next-app //สร้างโฟรเดอร์ forntend 
//npm install next react retact-dom    //ทำการติดตั้ง
// npm i -s axios swr   //  ทำการติดตั้ง

//คำสั่งรันผล  npm run dev 



import styles from '../styles/Home.module.css'
import axios from 'axios'
const URL = "http://localhost:3001/api/students";
import {  useEffect, useState} from 'react'

export default function Home() {

  //ส่วนของฟังกชั่น
  const [students, setStudents] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  



  
  //  แสดงผลข้อมูลตัวแปร  product
 console.log("student",students)
  const getstudents = async () => {
    
  let result = await axios.get(URL); //ถ้าใส่ await   ต้องมีการใส่ async

   // console.log(result.data);
    setStudents(result.data.list)
  }

  const showstudents = () => {
    if(students && students.length) //เช็คเงื่อนไงของ product
      return students.map((item,index) => { // ฟังก์ชั่น map

        return (
          <li key={index}>
            {item.name} : {item.age} : {item.weight}
            <button  onClick={() => getbyStudent(item.id)}>Get</button>
            <button onClick={() => UpdatebyStudents(item.id)}>Update</button>
            <button onClick={() => DeletebyStudent(item.id)}>Delete</button>
          </li>
        );
       
      })
    else {
       <div> No Student</div>
     }
  }
  const [student, setStudent] = useState({})
  console.log(student)

  const getbyStudent = async (id) => {

    let student = await axios.get(`${URL}/${id}`)
    setStudent(student.data)

  }

   
  const UpdatebyStudents = async (id) => {

    let student = await axios.put(`${URL}/${id}`,{name,age,weight});
    getbyStudent(student.data)
  }



    
  const DeletebyStudent = async (id) => {

    let student = await axios.delete(`${URL}/${id}`)
    getstudents()

  }
  
 
  const AddbyStudent = async (name,age,weight) => {
  
    let student = await axios.post(URL, { name, age, weight});
  getstudents()
}




  useEffect(() => {
     
    getstudents()


   },[])

  
  


  return (
    /// clasหName  ใส่ส่วนของ css
    <div className={styles.container}>
      Data Student
      <img scr ="love.jpg"></img>
      <ul>{showstudents()}</ul>
      {student.name}
    
      Weight
      <input type="number" onChange={(e) => setWeight(e.target.value)}></input>
      Age<input type="number" onChange={(e) => setAge(e.target.value)}></input>
      Name<input type="text" onChange={(e) => setName(e.target.value)}></input>
      <br/>
      <button onClick={() => AddbyStudent(name,age,weight)}>Add New Student</button>
      
    </div>
  );
}
