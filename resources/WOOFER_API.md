
`POST signup`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |
| email           | string          |


`POST zipcodes/add`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |
| zipcode         | number          |


`DELETE zipcodes/remove`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |
| zipcode         | number          |


`GET matches/generate`

**Params**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |



**Response**

| Key             | Type            |
| --------------- | --------------- |
| user_profile    | object          |


`POST matches/swipe`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| this_user_id    | array           |
| that_user_id    | array           |
| status          | any             |



**Response**

| Key             | Type            |
| --------------- | --------------- |
| chat_id         | string          |
| user_profile    | object          |


`GET profile`

**Params**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |



**Response**

| Key             | Type            |
| --------------- | --------------- |
| user_profile    | object          |


`GET profile/details`

**Params**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |



**Response**

| Key             | Type            |
| --------------- | --------------- |
| user_profile    | object          |


`POST profile/details`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |



**Body (optional)**

| Key             | Type            |
| --------------- | --------------- |


`DELETE profile/details`

**Body**

| Key             | Type            |
| --------------- | --------------- |
| id              | string          |

