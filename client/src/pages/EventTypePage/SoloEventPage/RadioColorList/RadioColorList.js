import React from 'react';
import { Radio } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Nothing = () => (<div style={{padding: "12px"}} />);

// !!!?? mapping the Radio-component breaks the site ??!!!
const RadioColorList = ({ eventColor, handleUserInput }) => (
    <React.Fragment>
        <Radio
        checked={eventColor === '#ff3d00'}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        className="soloEvent__form--radio--red"
        name="eventColor"
        value="#ff3d00"
        />
        <Radio
        checked={eventColor === '#ec407a'}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        className="soloEvent__form--radio--pink"
        name="eventColor"
        value="#ec407a"
        />
        <Radio
        checked={eventColor === "#d500f9"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--violet"
        value="#d500f9"
        />
        <Radio
        checked={eventColor === "#ab47bc"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--purple"
        value="#ab47bc"
        />
        <Radio
        checked={eventColor === "#3d5afe"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--blue"
        value="#3d5afe"
        />
        <Radio
        checked={eventColor === "#26a69a"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--teal"
        value="#26a69a"
        />
        <Radio
        checked={eventColor === "#76ff03"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--lime"
        value="#76ff03"
        />
        <Radio
        checked={eventColor === "#4caf50"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--green"
        value="#4caf50"
        />
        <Radio
        checked={eventColor === "#ffd600"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--yellow"
        value="#ffd600"
        />
        <Radio
        checked={eventColor === "#ef6c00"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleUserInput}
        name="eventColor"
        className="soloEvent__form--radio--orange"
        value="#ef6c00"
        />
    </React.Fragment>
)

export default RadioColorList;