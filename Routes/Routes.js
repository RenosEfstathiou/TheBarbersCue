const {Router} = require('express');
const router = Router();
const Appointment=   require('../models/Appointment');
const moment = require('moment');


router.post('/reserv',async(req,res)=>{
    try{
      console.log(req.body)
      const newApp = new Appointment(req.body);
      res.send(await newApp.save());
    }catch (err){
        console.log(err);
    }
});

router.post('/availability',async(req,res)=> {
    try {
        let a = await Appointment.find({date:new Date(req.body.date)})
        let hours = ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30'];
        a.map((i)=>{
          let index = hours.indexOf(i.time)
          hours.splice(index,1)
        })
        res.send(hours)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;