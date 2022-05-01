# Database Schema:

### Overview:

every user (a dog) has a document with personal information (birthday, name, zip code). Users can be a part of zip code pools of other users in the same area they could meet. Users can match/reject users, and these interactions must be recorded. Users can chat with each other and view message history.

### Database Relationships:

ONE DogDoc can be in MANY ZipCodePool zip codes
ONE DogDoc has ONE MatchQueue doc
ONE DogDoc has ONE RecordedMatches doc

# Schema

```json
ZipcodePoolDB: [
    <zipCodeDocId>: {
        <dogDocId>: 1,
        <dogDocId>: 1
    },
    "98119": {
        "dog13245": 1,
        "dog91234": 1
    }
]

dogAccountDB: [
    <dogDocId>: {
        "userId": "dog12345",
        "name": "Shilo",
        "zodiacSign": "Virgo",
        "gender": "Male",
        "preference": "Male",
        "breed": "Shib",
        "bio": "Woof @ me",
        "birthday": "09/09/2009",
        "pictures": ["<imgUrlStr"],
        "zipcodes": {
            "<zipCode>": <zipCodePoolDocId>,
            "<zipCode>": <zipCodePoolDocId>,
        },
       "chats": {
            "<chatId>": {
                "userId": "<dogId>",
                "creationDate": "09/09/2009",
            }
        }
    }
]

MatchRecordsDB: [
    <dogOneId>: {
        <dogTwoId>: "accepted",
        <dogTwoId>: "rejected",
    },
    "dog98119": {
        "dog13245": 1,
        "dog91234": 1
    }
]

MatchesQueueDB: [
    <dogOneId>: [<dogTwoId>, <dogThreeId>],
    <dogTwoId>: [],
]

ChatsDB: [
    "<chatId>": [...<Chat>]
]

Chat: {
    "username": "asdfsa",
    "message": "blah blah",
    "timestamp": "09/09/2009",
}
```
