const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const daysMonday = dayNames
export const daysSunday = () => {
  let sundays = dayNames.slice()
  sundays.unshift(sundays.pop())

  return sundays
}
