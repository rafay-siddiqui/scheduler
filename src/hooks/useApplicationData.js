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

  //Retrieve data from proxy API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
    //Added these hook dependencies so that the spots are automatically updated from the scheduler-api data
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

    //Update proxy (API) with newly created appointment
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
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

    //Update proxy (API) with newly deleted appointment
    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`, appointment)
    ).then((res) => {
      setState({
        ...state,
        appointments
      })
    })

  }

  return {state, setDay, bookInterview, cancelInterview};

}