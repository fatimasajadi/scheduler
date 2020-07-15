import { useState, useEffect } from "react";
import axios from 'axios';

function recalculateRemainingSpots(days, appointments) {
  return days.map(dayObj => ({
    ...dayObj,
    spots: dayObj.appointments
      .map(id => appointments[id])
      .filter(appointment => !appointment.interview)
      .length
  })
  )
}

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments, days: recalculateRemainingSpots(state.days, appointments) });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: recalculateRemainingSpots(state.days, appointments) });
      })
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch(error => console.log(error))
  }, []);

  return {
    cancelInterview,
    bookInterview,
    setDay,
    state
  }
}