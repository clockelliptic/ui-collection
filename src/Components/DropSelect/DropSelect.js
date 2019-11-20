import React from 'react';
import { Select, } from 'grommet';

function DropSelect(props) {
    const [value, setValue] = React.useState(props.placeholder);
    return (
      <Select
        options={props.options}
        value={value}
        onChange={({ option }) => setValue(option)}
      />
    );
}

export default DropSelect;