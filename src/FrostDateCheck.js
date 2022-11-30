// ! assume we are getting a clean frost zone number

// ! frost data. make changes here to change frost dates
// formatted as MM/DD
const frostZoneMap = {
//zone# : [last frost date, first frost date]
//aka zone#: [start of growing season, end of growing season]
  1: ["5/29", "8/29"],
  2: ["5/19", "9/5"],
  3: ["5/9", "9/12"],
  4: ["5/4", "9/30"],
  5: ["4/19", "10/18"],
  6: ["4/12", "10/25"],
  7: ["3/29", "11/7"],
  8: ["3/21", "11/18"],
  9: ["2/18", "12/5"],
  10: ["null", "null"],
  11: ["null", "null"],
  12: ["null", "null"],
  13: ["null", "null"],
}

// Checks if today's date is within a specified frost zone
// accept start date, end date as a string  DATE FORMAT: "MM/DD"
// return true if OKAY to plant, return false if NOT GOOD TO PLANT (aka in frost zone time)
function frostDateCheck(firstFrostDate, lastFrostDate) {
  const dateStr = new Date().toLocaleDateString()
  console.log("today's date: ", dateStr)
  const [month1, day1, year1] = dateStr.split("/")
  const date = new Date(month1 - 1, +day1)

  const startStr = firstFrostDate // EX aug 24 = "08/24"
  const [month2, day2] = startStr.split("/")
  const startDate = new Date(month2 - 1, +day2)

  const endStr = lastFrostDate //EX dec 30 = "12/30"
  const [month3, day3] = endStr.split("/")
  const endDate = new Date(month3 - 1, +day3)

  if (date > startDate && date < endDate) {
    console.log(`✅ date is between start and end dates`)
  } else {
    console.log(`⛔️ date is NOT between start and end dates`)
  }
}

frostDateCheck("08/24", "12/30")
