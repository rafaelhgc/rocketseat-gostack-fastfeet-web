import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useField } from '@unform/core';

import { SelectInput, Field } from './style';

export default function AsyncSelect({ name, cols, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Field cols={cols}>
      <label htmlFor={fieldName}>{label}</label>
      <SelectInput
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </Field>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string,
  cols: PropTypes.string,
  label: PropTypes.string.isRequired,
};

AsyncSelect.defaultProps = {
  name: 'select',
  cols: '1',
};
