# fuelTracker
A SPA built for tracking your car's fuel consumption

## Environments

`firebase use develop`: develop

`firebase use default`: **prod**

## Deploy
- Build the app: `npm run build`
- Choose the environment: `firebase use {env}`
- Deploy: `firebase deploy`


## Update firestore rules
- Choose the environment: `firebase use {env}`
- Deploy: `firebase deploy --only firestore:rules`