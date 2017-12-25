# Lunreddit

View your Reddit karma and posts by year.

## How to Develop

```bash
yarn install
yarn watch-css
yarn react-scripts start
open http://localhost:3000/
```

## How to Deploy to Heroku

```bash
heroku git:remote -a your-heroku-app
heroku buildpacks:add https://github.com/mars/create-react-app-buildpack.git
git push heroku master
```
