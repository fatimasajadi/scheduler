import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from 'components/DayList.js';
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = (day) => {
    setState({
      ...state,
      day,
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      });

  }, []);

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
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map((appointment) =>{
        const interview = getInterview(state, appointment.interview);
        return <Appointment
            key={appointment.id}
            {...appointment}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
        />
          })}
        <Appointment key="last" time="18pm" />
      </section>
    </main>
  );
}
