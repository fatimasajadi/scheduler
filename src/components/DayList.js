import React from "react";
import "components/DayListItem.scss";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map(item => {
        const handleSetDay = () => props.setDay(item.name);
        const isSelected = item.name === props.day;

        return (
          <DayListItem
            key={item.id}
            name={item.name}
            spots={item.spots}
            selected={isSelected}
            setDay={handleSetDay}
          />
        )
      })}
    </ul>
  );
}
