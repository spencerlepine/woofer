# Woofer API Documentation

### Matches

- [`GET /api/matches/generate`](#generate-possible-match-user)
- [`POST /api/matches/swipe`](#record-user-match-swipe-choice)
- [`GET /api/matches/status`](#get-current-user-pair-match-status)
- [`GET /api/matches/queue`](#get-user-match-queue)

### Zipcodes

- [`POST /api/zipcodes/add`](#add-user-to-zipcode-pool)
- [`DELETE /api/zipcodes/remove`](#remove-user-from-zipcode-pool)

### Users

- [`GET /api/profile`](#get-user-profile)
- [`GET /api/profile/details`](#get-entire-user-profile-record)
- [`POST /api/profile/details`](#update-user-profile-record)
- [`DELETE /api/profile/details`](#delete-user-profile-record)

### Signup

- [`POST /api/signup`](#sign-up-user)

### Chats

- [`GET /api/chats/fetch`](#get-user-chats)

### Status

- [`GET /api/status`](#verify-server-status)

---

# Error Response

**Status Code:** `Variable`

#### Response Body:

```json
{
  "message": "This endpoint threw an error!",
  "error": "User profile does not have a gender"
}
```

---

# Matches

## Generate Possible Match User

**URL:** `/api/matches/generate`

**Method:** `GET`

#### Params

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "userProfile": {
    "userId": "abc1234",
    "gender": "Male",
    "...": "..."
  }
}
```

## Record User Match Swipe Choice

**URL:** `/api/matches/swipe`

**Method:** `POST`

#### Body

```json
{
  "thisUserId": "abc1234",
  "thatUserId": "efg6578",
  "status": "accept" // "accept", "reject"
}
```

### Success Response

**Code:** `201 Created`

## Get Current User Pair Match Status

**URL:** `/api/matches/status`

**Method:** `GET`

#### Params

```json
{
  "thisUserId": "abc1234",
  "thatUserId": "efg6578"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "abc1234": "accept", // "accept", "reject", "none"
  "efg6578": "none" // "accept", "reject", "none"
}
```

## Get User Match Queue

**URL:** `/api/matches/queue`

**Method:** `GET`

#### Params

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "userQueue":  [<userId>, <userId>, <userId>] // (strings)
}
```

# Zipcodes

## Add User To ZipCode Pool

**URL:** `/api/zipcodes/add`

**Method:** `POST`

#### Body

```json
{
  "userId": "abc1234",
  "zipcode": "10001"
}
```

### Success Response

**Code:** `201 Created`

## Remove User From ZipCode Pool

**URL:** `/api/zipcodes/remove`

**Method:** `DELETE`

#### Body

```json
{
  "userId": "abc1234",
  "zipcode": "10001"
}
```

### Success Response

**Code:** `201 Created`

# Users

## Get User Profile

**URL:** `/api/profile`

**Method:** `GET`

#### Params

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "userProfile": {
    "userId": "abc1234",
    "gender": "Male",
    "...": "..."
  }
}
```

## Get Entire User Profile Record

**URL:** `/api/profile/details`

**Method:** `GET`

#### Params

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "userProfile": {
    "userId": "abc1234",
    "gender": "Male",
    "zipcodes": [],
    "chats": [],
    "...": "..."
  }
}
```

## Update User Profile Record

**URL:** `/api/profile/details`

**Method:** `POST`

#### Body

```json
{
  "userId": "abc1234",
  "firstName": "newFirstName",
  "lastName": "newLastName",
  "preference": "newGenderPreference",
  "...": "..."
}
```

### Success Response

**Code:** `201 Created`

```json
{
  "userProfile": {
    "userId": "abc1234",
    "gender": "Male",
    "...": "..."
  }
}
```

## Delete User Profile Record

**URL:** `/api/profile/details`

**Method:** `DELETE`

#### Params

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

# Signup

## Sign Up User

**URL:** `/api/signup`

**Method:** `POST`

#### Body

```json
{
  "userId": "abc1234",
  "email": "example@gmail.com"
}
```

### Success Response

**Code:** `201 Created`

# Chats

## Get User Chats

**URL:** `/api/chats/fetch`

**Method:** `GET`

#### Body

```json
{
  "userId": "abc1234"
}
```

### Success Response

**Code:** `200 OK`

```json
{
  "chats": [
    {
      "chatId": "ajb9845un",
      "otherUserId": "efg5678"
    },
    {}
  ]
}
```

# Status

## Verify Server Statuss

**URL:** `/api/status`

**Method:** `GET`

### Success Response

**Code:** `200 OK`

```json
{
  "status": "running"
}
```
