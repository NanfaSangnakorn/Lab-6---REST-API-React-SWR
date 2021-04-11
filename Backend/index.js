//ติดตั้ง   npm i -s express body-parser cors  ก่อน
// ติดตั้ง   npm i -s -d nodemon

//ทำการประกาศ

// ทำการประกาศ
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const e = require("express");

const app = express();
const router = express.Router();


//กำหนด port
const PORT = 3001;

//การ route 

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);


//การกำหนดข้อมูล

let pets = {
  list: [
    { id: 1, type: "cat", age: 1, weight: 5, price: 2000 },
    { id: 2, type: "dog", age: 1, weight: 10, price: 3000 },
  ],
};

//การเพิ่ม route  ตัวเดียว 

router
    .route("/pets")
    .get((req, res) => {
        
        res.json(pets)


    })

    .post((req, res) => {
       
        let id = pets.list.length ? pets.list[pets.list.length - 1].id + 1 : 1;
        


        let newpets = {};
        newpets.id = id;
        newpets.type = req.body.type;
        newpets.age = req.body.age;
        newpets.weight = req.body.weight;
        newpets.price = req.body.price;

        pets = { list: [...pets.list, newpets] };


        res.json(pets);
    });

let income = 0;
router
    .route("/income").get((req, res) => {
     res.json(income);

});




    //การทำpets หลายตัว 

router
    .route("/pets/:petId")
    .get((req, res) => {
        
        let id = pets.list.findIndex(
            (item) => item.id == +req.params.petId
        );

         if (id == -1) {
           res.json("Not Found");
         } else {
           res.json(pets.list[id]);
         }

    })
    

    //การแก้ไข 
    .put((req, res) => {
        
        let id = pets.list.findIndex(
          (item) => item.id == +req.params.petId
        );
        console.log("id = ", id);

        if (id == -1) {
          res.json("Not Found");
        } else {
          pets.list[id].name = req.body.name;
          pets.list[id].type = req.body.type;
          pets.list[id].age = req.body.age;
          pets.list[id].weight = req.body.weight;
          pets.list[id].price = req.body.price;
            
          res.json(pets);
        }
    })
    
    .delete((req, res) => {
        
          let id = pets.list.findIndex(
            (item) => item.id == +req.params.petId
        );
        
        pets.list = pets.list.filter((item) => (item.id !== +req.params.petId))

        if (id >= 0) {
          pets.list = pets.list.filter(
            (item) => item.id !== +req.params.petId
          );
          res.json(pets);
        } else {
          res.json("Can't Delete");
        }

    })


app.listen(PORT, () => {

    console.log("Server runing is port", PORT);

});



