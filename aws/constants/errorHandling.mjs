const ERROR_HANDLING = {
  badRequest: 'Bad Request',
  correctDateFormat: 'mm-dd-yyyy',
  expectedFormatS3ObjectsRoute: '/api/s3objects?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy',
  exampleIPAddress: '192.168.1.1',
  invalidNumberOfKeyValPairs: 'Invalid number of key/value pairs provided.',
  invalidKeyValueStructure: 'Improper key/value object structure ',
  logValue: 'logValue',
  malformedDateParameters: 'Malformed date parameter(s)',
  missingEndDateStartDateOrBoth: 'Missing startDate,endDate, or both properities in req. body',
  missingDateParameter: 'Missing date parameter',
  missingFieldObjectKeysInReqBody :'Missing field objectKeys in req. body',
  objectKeysEmpty: 'objectKeys is empty. No results will be produced.',
  objectKeysExpectedFormat: '{objectKeys: [file1.log, file2.log]}',
  startDateMustBelessThanOrEqualToEndDate:'startDate must be <= endDate',
  queriesPropertyMissingOrInvalid: 'Queries property is either missing or not an array',
  queriesPropertyEmpty: 'queries array was provided, but is empty.'
}

export default ERROR_HANDLING;