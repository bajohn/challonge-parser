



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

Next TODOs
- Create shareable variable for whether to put API responses into Dynamo, or retrieve from it (like isTesting)
- If retrieving from dynamo, make sure the whole pull works (will need to ignore cred)
- Should we make an additive data model in general? 