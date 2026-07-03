import React from "react"
import { Controller } from "react-hook-form"
import { FormControl, FormControlLabel, Checkbox } from "@mui/material"

export default function FormCheckbox({
  name,
  control,
  label,
  rules,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error} component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                {...props}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
        </FormControl>
      )}
    />
  )
}
