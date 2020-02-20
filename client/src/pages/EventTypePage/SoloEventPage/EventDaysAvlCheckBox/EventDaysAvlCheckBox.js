import React from 'react';
import { Box, Checkbox,Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const OrangeCheckbox = withStyles({
    root: {
        '&$checked': {
            color: orange[800],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const DaysAvailableCheckBox = ({ daysAvl, handleCheckbox }) => (
    <Box className="daysChkBox__content--days">
        <Typography variant="h6" className="daysChkBox__content--days--title">Available Days:</Typography>
        <Box className="daysChkBox__content--days--list">
            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="sunday"
                    value={daysAvl.sunday}
                    checked={daysAvl.sunday}
                />
                <br/>
                <label className="daysChkBox__content--days--label" htmlFor="sunday">Sundays</label>
            </Box>

            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="monday"
                    value={daysAvl.monday}
                    checked={daysAvl.monday}
                />                        <br/>
                <label className="daysChkBox__content--days--label" htmlFor="monday">Mondays</label>
            </Box>

            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="tuesday"
                    value={daysAvl.tuesday}
                    checked={daysAvl.tuesday}
                />                            <br/>
                <label className="daysChkBox__content--days--label" htmlFor="tuesday">Tuesdays</label>
            </Box>

            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="wednesday"
                    value={daysAvl.wednesday}
                    checked={daysAvl.wednesday}
                />    
                <br/>
                <label className="daysChkBox__content--days--label" htmlFor="wednesday">Wednesdays</label>
            </Box>
            
            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="thursday"
                    value={daysAvl.thursday}
                    checked={daysAvl.thursday}
                />    
                <br/>
                <label className="daysChkBox__content--days--label" htmlFor="thursday">Thursdays</label>
            </Box>
            
            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="friday"
                    value={daysAvl.friday}
                    checked={daysAvl.friday}
                />                            <br/>
                <label className="daysChkBox__content--days--label" htmlFor="friday">Fridays</label>
            </Box>
            
            <Box className="daysChkBox__content--days--item">
                <OrangeCheckbox
                    onChange={handleCheckbox}
                    name="saturday"
                    value={daysAvl.saturday}
                    checked={daysAvl.saturday}
                />                            <br/>
                <label className="daysChkBox__content--days--label" htmlFor="saturday">Saturdays</label>
            </Box>
        </Box>
    </Box>
);

export default DaysAvailableCheckBox;