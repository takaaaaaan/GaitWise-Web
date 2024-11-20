export const formatDateTime = (dateString: Date) => {
  const dateYearOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedDateYear: string = new Date(dateString).toLocaleString('en-US', dateYearOptions)
  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)
  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)
  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateYear: formattedDateYear,
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object')
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
