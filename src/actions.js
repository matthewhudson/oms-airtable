const Airtable = require('airtable')
const { AIRTABLE_API_KEY } = process.env

const list = async inputs => {
  const { baseId, maxRecords, tableName, view, fields } = inputs
  // @TODO: Use an OMS helper to validate inputs and env vars

  const allRecords = []

  return new Promise((resolve, reject) => {
    const airtableBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(baseId)

    airtableBase(tableName)
      .select({
        fields,
        maxRecords: Number(maxRecords),
        view
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => {
            allRecords.push({
              id: record.getId(),
              ...record.fields
            })
          })
          fetchNextPage()
        },
        err => {
          if (err) {
            reject(err)
          }
          resolve(allRecords)
        }
      )
  })
}

module.exports = { list }
