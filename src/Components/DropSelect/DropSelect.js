import React from 'react';
import './DropSelect.css';
import { Select, } from 'grommet';


function DropSelect() {
    const [value, setValue] = React.useState('medium');
    return (
      <Select
        style={{"font-weight": '400'}}
        options={['small', 'medium', 'large']}
        value={value}
        onChange={({ option }) => setValue(option)}
      />
    );
}

export default DropSelect;