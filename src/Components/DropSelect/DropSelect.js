import React from 'react';
import './DropSelect.css';
import { Select, } from 'grommet';


function DropSelect(props) {
    const [value, setValue] = React.useState(props.placeholder);
    return (
      <Select
        style={{"fonWeight": '400'}}
        options={props.options}
        value={value}
        onChange={({ option }) => setValue(option)}
      />
    );
}

export default DropSelect;