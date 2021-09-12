import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import 'components/Appointment';
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
  },
  {
    id: 4,
    time: '10am',
    interview: {
      student: "Certified Donda Boy",
      interviewer: {
        id: 2,
        name: "Jermaine Cole",
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg',
      }
    }
  },
  {
    id: 5,
    time: '4am',
    interview: {
      student: "Rafay Siddiqui",
      interviewer: {
        id: 3,
        name: 'Mildred Nazir',
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then((response) => {
        setDays(response.data);
      })
  }, [])

  const iterateAppointments = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />)
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {iterateAppointments}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
