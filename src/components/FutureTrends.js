import React, { useState } from "react";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker'


export default function FutureTrends()  {

    const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
     
    </div>
    
  );

    
    

    /*
  
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Calendar onChange={(date) => setDate(date)} value={date} />
        </div>
    );

    */
  
}
