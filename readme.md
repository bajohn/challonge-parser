# Summit Tournament Tracker

Live web app:
https://summit-pool.com/

Below are mostly notes to self on next-ups.

## Next TODOs
- Make sure update works when tournaments are already logged in a pending state - they seem
- Support for doubles tournaments
- How to deal with repeated names via unique IDs
- H2H view
    - (In progress) Finish refactor of H2H storage
    - Build h2h view on front end, show player v player and past matches
- Add iTournament and iTournamentData types where missing (if anywhere)
- 
Nice to haves, probably won't do:
- When we're ready to create the clean base app - can we create a fresh version of this entire live app using a fork of the cleaned base app?

## Nice to haves
- Set CloudWatch retention to 2 weeks via tf

## Data flow / call stack

The tournament update follows this call stack

- From entrypoint, api-entry.ts
    - Check for existing update in dyGetMetaField(FULL_RELOAD_STATUS_PATH)
        - If update is in progress, return blocked and exit
        - If all clear, trigger invokeDynamoReload
    - invokeDynamoReload kicks off dynamo updater Lambda
    - updateDynamo function - kicks off entire update of dynamodb with data from challonge
        - checks count of tournaments in dynamo vs tournaments on challonge
        - if there are new tournaments, kick off generateStatStore
    - generateStatStore pulls all tournaments from challonge, and builds an in-memory data structure containing all relevant info (see interface iStatStore)
    - executeUpdate PUTs the stat store into dynamo


Possible abstraction layers
- Table names should all be parameterized
- Admin matcher? For unspecified names
    - Let's make a FE tool to create tournaments using the challonge api
    - Each website has an ID column type (email, or UUID)
    - When creating a new tournament, select from existing UUID, or create a new player
    - We can even add a column of whether they've paid?
    - Once ready, hit "create tournament" (new entries are closed at this point)
- raw Dynamo pull - doFetch pulls from either challonge or dynamo; if fetching from challonge, store raw data in dynamo (SummitAPIMock)
