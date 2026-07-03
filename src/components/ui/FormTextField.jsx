import React from "react"
import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"

const FormTextField = ({ name, control, label, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          error={!!error}
          helperText={error ? error.message : ""}
          size="small"
        />
      )}
    />
  )
}

export default FormTextField
