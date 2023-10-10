



statStore structure:
```
{
    "podiumFinishes": {
        "First Place Finishes": {
            "John 👁️": 1,
            "Leah": 1
        },
        "Second Place Finishes": {
            "Sarah": 1,
            "Anthony": 1
        },
        "Third Place Finishes": {
            "Derrick": 1,
            "Juan": 1
        }
    },
    "h2h": {
        "Derrick 👁️": {
            "Juan": {
                "w": 1,
                "l": 0
            },
            "Sarah": {
                "w": 1,
                "l": 0
            },
        }
    }
}

```

Live web app
http://summit-tournament-webhost-bucket.s3-website-us-west-2.amazonaws.com/
Live API
https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/podium-finishes
https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/get-players

Next TODOs
- Test framework / cases
- Update only latest tournament / matches instead of full reload when tourneyCount is different
