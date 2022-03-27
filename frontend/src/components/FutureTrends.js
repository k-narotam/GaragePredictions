import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function FutureTrends()  {
  
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Calendar onChange={(date) => setDate(date)} value={date} />
        </div>
    );
  
}
