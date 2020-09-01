import React , {useState} from 'react';
import '../styles/ReservationForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
const  Reservations =()=>{
    const  [name , setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone, setPhone]= useState('');
    const [date, setDate] =useState();
    const [hour, setHour] = useState('');
    const [availHours,setAvailHours] = useState(['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30']);
    const handleNameInputChange =(event)=> {
        setName(event.target.value);
    }

    const handleEmailInputChange =(event)=> {
        setEmail(event.target.value);
    }

    const handlePhoneInputChange =(event)=> {
        setPhone(event.target.value);
       
    }

    const handleSelectInputChange = (event) => {
        setHour(event.target.value);
      
    }
    
    const handleDatePickerChange=date => {
        setDate(date);
    }

    const checkAvailability = async(date) => {
        let availH = await fetch(process.env.REACT_APP_BACKEND_URL+'/availability',{
            method:'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                date: moment(date).format('YYYY-MM-DD'),
            })
        })
        setAvailHours(await availH.json())
    }
    const submitButtonClikHandler = async () =>{
        console.log(name);
        console.log(email);
        console.log(phone);
        if(date)
        console.log(date);
        console.log(hour);

        await fetch(process.env.REACT_APP_BACKEND_URL+'/reserv',{
            method:'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                date: moment(date).format('YYYY-MM-DD'),
                time: hour
            })
        })
    }

    const renderAvailHours = ()=>{
        return(
            availHours.map((element,idx) => {
             return(
                <option  value={element} key={'option-'+idx} >{element}</option>
             )
           })
        )
    }
    
    return(
    <div className="cover" >
        <div className="form">
            <h2 className="form-title">Κάνε Κράτηση </h2>
            <form className ="form-wrapper" >
            <div className="personal-info-form" >
        <input className="form-input-1" type="text" name="name" placeholder="Ονομ/μο" onChange={handleNameInputChange} />
        <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleEmailInputChange} />
        <input className="form-input" type="phone" name="phone" placeholder="Phone" onChange={handlePhoneInputChange} />
        </div>
        <div className="reservation-info-form" >
        <DatePicker className="date-picker"
        selected={date}
        minDate={new Date()}
        onChange={(date)=>{
            handleDatePickerChange(date)
            checkAvailability(date)
        }}
        placeholderText="Επιλέξτε Ημερομηνία"
            />
            <select className="form-select" onChange={handleSelectInputChange}>
                {renderAvailHours()}
            </select>
            {/* {
                date &&
                renderAvailHours()
            }   */}
        </div>
    </form>
    <button className="reservation-button" onClick={submitButtonClikHandler} >Κάνε Κράτηση</button>
        
    </div>
    </div>
    )
}

export default Reservations;