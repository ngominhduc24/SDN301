export const requireOutOfFormItem = (
  form,
  listChecks,
  msg = "Thông tin không được để trống!",
) => {
  const nameErrors = []
  const nameTrue = []
  listChecks.forEach(i => {
    if (i.condition) {
      nameErrors.push(i.name)
      form.setFields(
        nameErrors.map(i => ({
          name: i,
          errors: [msg],
        })),
      )
    } else {
      nameTrue.push(i.name)
      form.setFields(
        nameTrue.map(i => ({
          name: i,
          errors: null,
        })),
      )
    }
  })
  if (nameErrors.length === 0) return true
  else return false
}
