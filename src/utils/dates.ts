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

export const getTwoHoursDifference = (date: Date): boolean => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    const currentHour = currentDate.getHours()

    //Different Year, 31st December to 1st January
    if (currentYear - year === 1 && month === 11 && currentMonth === 0 && day === 31 && currentDay === 1) {
        //One Day Difference
        const difference = (currentHour + 24) - hour

        if (difference > 2) {
            return true
        } else {
            return false
        }
    }

    //Same year
    if (currentYear === year) {
        //Same Month
        if (currentMonth === month) {
            //Same day
            if (day === currentDay) {
                const difference = currentHour - hour

                if (difference > 2) {
                    return true
                } else {
                    return false
                }

                //One Day difference
            } else if (currentDay - day === 1) {

                const difference = (currentHour + 24) - hour
           
                if (difference > 2) {
                    return true
                } else {
                    return false
                }
            }
            //Different Mont
        } else if (currentMonth - month === 1 && (day === 31 || day === 30 || (month === 1 && (day === 28 || day === 29))) && currentDay === 1) {
            //One Day difference
            const difference = (currentHour + 24) - hour

            if (difference > 2) {
                return true
            } else {
                return false
            }
        }
    }
    return true
}