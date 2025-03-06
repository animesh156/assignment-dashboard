const {google} = require('googleapis')

const sheets = google.sheets({version: "v4", auth: process.env.GOOGLE_API_KEY})

const getSheetData = async (sheetName) => {
    const resposne = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: sheetName
    })
    return resposne.data.values
}

module.exports = {sheets, getSheetData}