import React from 'react'
import Select, { MultiValue } from "react-select";

export type Option = {
  value: string;
  label: string;
}

interface MultiSelectProps {
  placeholder: string;
  options: Option[];
  instanceId: string;
  value: MultiValue<Option>;
  onChange: (selected: MultiValue<Option>) => void;
  className?: string;
}

function MultiSelect({ instanceId, onChange, options, placeholder, value, className }: MultiSelectProps) {
  <Select />


  return (

    <Select
      isMulti
      instanceId={instanceId}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className={className}

    />
  )
}

export default MultiSelect
