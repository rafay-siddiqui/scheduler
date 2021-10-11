import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  //Default state on page render
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
    //Had this hook depend on state.day and state.appointments so that the spots are automatically updated based on data from the scheduler api database
  }, [state.day, state.appointments])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    ).then((res) => {
      setState({
        ...state,
        appointments
      })
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

    return Promise.resolve(
      axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    ).then((res) => {
      setState({
        ...state,
        appointments
      })
    })

  }

  return {state, setDay, bookInterview, cancelInterview};

}