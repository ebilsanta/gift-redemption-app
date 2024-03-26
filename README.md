# gift-redemption-app
A live demo of the app is available at: https://gift-redemption-frontend.vercel.app/ !

<img width="600" alt="Screenshot 2024-02-19 at 5 39 53 AM" src="https://github.com/ebilsanta/govtech-gift-redemption/assets/101983505/c0542d47-6b99-41e9-aa2c-43094cb575f4">


## About
This is a gift redemption system that helps distributes gifts to teams. Each team can send a representative to redeem their team's gift, and each gift can only be redeemed once. This system assists with that process by keeping track of redemption data and verifying if the representative can still collect the gift.  

The entire flow is as follows:
1. Admin searches for the staff using their staff pass id. They don't have to key in the entire id as autocompleted results are returned while typing.
2. Once the admin finds the staff's entry, they can see if the staff's team has already redeemed the gift, as well as the redemption timing if applicable.
3. If the team has already redeemed, there will be no option for further steps, and the admin can send them away :,(
4. Otherwise, the admin can click "Redeem" and confirm that the representative will be collecting on behalf of their team.

## Features
* Autocomplete search function on frontend so users can find staff entries without keying in entire id
* Lazy loading on frontend, search results are returned 10 at a time to help with performance
* Debouncing and caching on the frontend is also used to limit the number of requests to the API
* API with pagination options on the backend to support these features
* Unit tests for both frontend/backend
* Automated CI/CD for frontend (backend ran into some blockers using AWS ECS and RDS)

Built with 
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,express,react,postgres,prisma" />
  </a>
</p>

## Running locally
For more information about running locally, please refer to the READMEs in the respective `/backend` and `/frontend` folders.

## Assumptions and considerations
* An SQL database was chosen for this task as the data was mostly relational instead of hierarchical.
* A key assumption is that team_name is unique and no additional information about teams need to be stored in this system. Additionally since the CSV file only had staff-team mappings, I did not create an additional table for team data itself.
* Due to this, I could not use Prisma operations to join staff and redemption data tables as they had no relation, and had to resort to raw SQL queries in the end. Initially, I planned to make two separate database calls to get redemption data, but that would be inefficient. This also explains why there is an option in the endpoint to fetch staff rows with/without redemption data, as I thought it would take two calls and wanted to make this more explicit. 
* On the frontend, there is lazy loading for 10 results at a time, and debouncing by delaying search on key press by 1.5 seconds. This is to avoid fetching a large amount of data and storing it on the frontend, while also limiting the number of times the API is called.
* Caching on the frontend is also performed in-memory with the query prefix string as key. Existing queries in the cache is updated when user loads more pages for that query, and the entire cache is invalidated when a redemption is made. 

## Future roadmap/improvements
* Add functionality to unredeem gifts. It's tiring to reset the database each time...
* Improve API response bodies to include more information and be more consistent. For example, returning a standard data field in responses.
* Add infinite scrolling to frontend, right now users have to perform an additional step of clicking "Load More"


