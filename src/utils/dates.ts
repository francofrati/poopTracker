export const getDayOfMonth = (date: Date) => {

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDay()

    if (year === currentYear && month === currentMonth && day === currentDay) return true

    return false

}

export const getCurrentMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    if (month === currentMonth && year === currentYear) return true
    return false
}