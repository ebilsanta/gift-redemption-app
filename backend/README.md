# Gift Redemption Backend
## Base Url
https://gift-redemption-backend.fly.dev

## Endpoints
### Get staff
Returns a list of staff details with options for searching by staffPassId and pagination
- **Method**: `GET`
- **Endpoint**: `/api/staff`

#### Request

##### Parameters

- **prefix** (string): The staffPassId search query prefix. Can be omitted to return all results.
- **offset** (integer): An optional integer representing how many query results to offset in the response. Defaults to 0.
- **limit** (integer): An optional integer representing how many results to return. Defaults to 10
- **include_redeemed** (boolean): 'true' indicates that the `redeemedAt` timestamps of the staff's team will be returned in the query. 

#### Responses
- **200 OK**
  - Response Body (JSON):
    - List of Staff Objects
      - **id** (integer): The id of the staff in the database.
      - **staffPassId** (string): The staff's pass id. 
      - **teamName** (string): The team the staff belongs to.
      - **redeemedAt** (number | null): Optional field based on `include_redeemed` flag. If the staff's team has redeemed the gift, this is the redemption timing in epoch milliseconds, otherwise null.
      - **createdAt** (number): The time the staff entry was created in epoch milliseconds.

#### Sample Request
```
curl --location 'https://gift-redemption-backend.fly.dev/api/staff?prefix=STAFF_&limit=2&offset=2&include_redeemed=true'
```

#### Sample Response (JSON Body)
```
[
    {
        "id": 2094,
        "staffPassId": "STAFF_C6ZD0WJPSG3C",
        "teamName": "HUFFLEPUFF",
        "redeemedAt": null,
        "createdAt": 1623817186940
    },
    {
        "id": 2095,
        "staffPassId": "STAFF_LPJPQ0NMXTPY",
        "teamName": "HUFFLEPUFF",
        "redeemedAt": null,
        "createdAt": 1619273585626
    }
]
```

### Add redemption
Adds redemption data to the staff's team, if they have not redeemed their gift yet. 
- **Method**: `POST`
- **Endpoint**: `/api/redeem`

#### Request

##### Body (JSON)

- **staffPassId** (string): The staff's pass id, not to be confused with the database id.

#### Responses

- **201 Created**
  - Response Body (JSON):
    - **id** (string): The redemption data id in the database.
    - **teamName** (string): The name of the team that made the redemption, the staff's team.
    - **redeemedAt** (number): The redemption timing in epoch milliseconds.

- **409 Conflict**
  - Response Body (JSON):
    - **error**: (object): Object containing the error message
      - **message** (string)
        - `"team GRYFFINDOR has already redeemed their gift"`

- **422 Unprocessable Entity**
  - Response Body (JSON):
    - **error**: (object): Object containing the error message
      - **message** (string)
        - `"staff STAFF_98I2WOQU7VA does not exist"`

#### Sample Request
```
curl --location 'https://gift-redemption-backend.fly.dev/api/redeem' \
--header 'Content-Type: application/json' \
--data '{
    "staffPassId": "STAFF_98I2WOQU7VAU"
}'
```
#### Sample Response
```
{
    "id": 2,
    "teamName": "HUFFLEPUFF",
    "redeemedAt": 1708285491551
}
```

## Getting Started

### Prerequisites

* node
* npm
* local postgresql server
    *  You may want to use the official [Postgres Docker image](https://hub.docker.com/_/postgres)

### Running locally
* Clone the repo
```
git clone https://github.com/ebilsanta/govtech-gift-redemption
```

* Change directory
```
cd backend
```

* Install dependencies
```
npm i
```

* Set up environment variables
    - Rename .env.sample to .env and fill in the postgres database string in DATABASE_URL

* Generate Prisma client, which will include types based on the database schema
```
npx prisma generate
```

* Apply SQL migrations
```
npx prisma migrate deploy
```

* Seed the database, using the seed script
```
npx prisma db seed
```

* Serve the project, defaults to port 3000
```
npx nx serve gift-redemption-backend
```

### Run tests
Unit tests are written using Jest and cover all services.
```
npm run test
```

![Screenshot 2024-02-19 at 3 47 54 AM](https://github.com/ebilsanta/govtech-gift-redemption/assets/101983505/9298353f-a997-44ba-bab1-cdcb4c904b19)


