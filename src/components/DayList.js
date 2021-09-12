import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const iterateDays = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.day === day.name}
        setDay={props.setDay}
      />
    )
  })

  return (
    <ul>
      {iterateDays}
    </ul>
  );
}