# Summit Tournament Tracker

Live web app
http://summit-tournament-webhost-bucket.s3-website-us-west-2.amazonaws.com/
Live API
https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/podium-finishes
https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/get-players

## Next TODOs
- Add dynamo mock to jest test so we can do "e2e" back end updates (create new data structures without running the entire live API update!)
- When we're ready to create the clean base app - can we create a fresh version of this entire live app using a fork of the cleaned base app?
- Add clean name prioritization check
- Clear old players when doing a fresh load! Currently old, messy names persist between reloads
- Update only latest tournament / matches instead of full reload when tourneyCount is different
- Move podiumfinishes to SummitMetadata table

## Nice to haves
- Set CloudWatch retention to 2 weeks via tf
- Cloudwatch distribution so we're not relying on 404s to route requests

## Pulling out to generalize
Once the app is stable, we'll eject a generic web app stack for the next project. The base features to isolate and make generic are:
- React stack
    - Typescript compilation
    - Create React App boilerplate and Router
    - Bare minimum hello world pages - homepage, one subpage, and a not found page
    - Minimal Cypress component test running on one of these.
- API stack
    - Lambda JS code compilation via typescript
    - Router for incoming api paths -> JS handlers
    - Bare minimum hello world event handler (one lambda handler that routes these requests)
    - Dynamo sample read / write
    - Jest test running on this minimal handler
- Terraform
    - API Gateway boilerplate for one endpoint
    - One Dynamo table - something generic like "user profiles"
    - S3 webhost configuration
- Scripts
    - Deployment script that updates all the above!