# Issue Viewer

A react native app to see open github issues assigned to you.

# Dev startup

From your github account navigate to settings -> developer settings -> personal access tokens. 

Create a personal access token with permission to read issues from your repositories.

Clone this repo and create a file in the root directory named .env.local

In that file place the following line and supply your personal access token:
`EXPO_PUBLIC_GITHUB_PERSONAL_TOKEN=your_token`

npm install

npm run web

open browser to localhost:8081