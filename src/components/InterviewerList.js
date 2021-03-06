import React from 'react';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {

  const iterateInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.value === interviewer.id}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {iterateInterviewers}
      </ul>
    </section>
  );
}

//Ensure an array is passed for interviewers
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};