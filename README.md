# Slack Webtask - Translate

A translation webtask for use with Webtask's Slack Integration

## How to use

* First install the [webtask integration](https://webtask.io/slack)
* Then create a new slack webtask named translate (or anything you want):
`
/wt create translate
`
* Navigate to the returned edit link in slack, and replace the generated code with the code in dist/webtask.js and hit save
* Click the wrench icon -> secrets, and add you Google Translate API key as API\_KEY and the Google Translate path as API\_PATH (it will default to https://translation.googleapis.com/language/translate/v2)

You can now translate text in slack! Use the following format:

`/wt [translate-command] [target-language] [any text you want]`

Example:

`/wt translate fr This is some sample text.`

# Development

Copy .env.example to .env, and populate API\_KEY and API\_PATH

## Create
`npm run create`

## Deploy
`npm run deploy`

## Test
`npm test`