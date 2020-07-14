import React from "react";
import DayList from 'components/DayList.js';
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";
import useApplicationData from '../hooks/useApplicationData';

export default function Application(props) {
  const { state, bookInterview, cancelInterview, setDay } = useApplicationData();

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
        {getAppointmentsForDay(state, state.day).map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);

          return <Appointment
            key={appointment.id}
            {...appointment}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        })}
        <Appointment key="last" time="18pm" />
      </section>
    </main>
  );
}
