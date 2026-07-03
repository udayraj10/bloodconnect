import React from "react"
import { Controller } from "react-hook-form"
import { Autocomplete, TextField } from "@mui/material"

export default function FormAutocomplete({
  name,
  control,
  label,
  options,
  rules,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value, ...fieldProps },
        fieldState: { error },
      }) => (
        <Autocomplete
          {...fieldProps}
          {...props}
          options={options}
          value={value || null}
          // "_" is used to ignore the first argument (event) since we only need the second argument (data)
          onChange={(_, data) => onChange(data ? data.label : null)}
          renderInput={(params) => (
            <TextField {...params} label={label} error={!!error} size="small" />
          )}
        />
      )}
    />
  )
}
