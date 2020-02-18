import React from 'react';
import { Radio } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Nothing = () => (<div style={{padding: "12px"}} />);

// !!!?? mapping the Radio-component breaks the site ??!!!
const RadioColorList = ({ color, handleCheckBox }) => (
    <React.Fragment>
        <Radio
        checked={color === '#ff3d00'}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--red"
        value="#ff3d00"
        />
        <Radio
        checked={color === '#ec407a'}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--pink"
        value="#ec407a"
        />
        <Radio
        checked={color === "#d500f9"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--violet"
        value="#d500f9"
        />
        <Radio
        checked={color === "#ab47bc"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--purple"
        value="#ab47bc"
        />
        <Radio
        checked={color === "#3d5afe"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--blue"
        value="#3d5afe"
        />
        <Radio
        checked={color === "#26a69a"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--teal"
        value="#26a69a"
        />
        <Radio
        checked={color === "#76ff03"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--lime"
        value="#76ff03"
        />
        <Radio
        checked={color === "#4caf50"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--green"
        value="#4caf50"
        />
        <Radio
        checked={color === "#ffd600"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--yellow"
        value="#ffd600"
        />
        <Radio
        checked={color === "#ef6c00"}
        icon={<Nothing />}
        checkedIcon={<CheckIcon />}
        onChange={handleCheckBox}
        className="soloEvent__form--radio--orange"
        value="#ef6c00"
        />
    </React.Fragment>
)

export default RadioColorList;