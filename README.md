# Interview Service

## Routes

- GET / - Ping to test service health
- GET /leads - Dump of all Leads
- GET /leads/search - Query for matching Leads
- POST /leads - Insert an array of Leads

## Instructions

Setup:
- Pull repo
- Install dependencies with `npm i`
- Build and start the service with `npm run build` and `npm run start`
- Ping to ensure that it's up by hitting `localhost:3004/`

Bug hunting (investigate and fix):
- Users are reporting inaccurate search results
- Users are reporting duplicate Leads showing up in the DB

Optimization:
- Profiling indicates performance issues with the Lead submission endpoint

Feature implementation:
- Product has requested a new feature to allow for updating existing Leads (should accept an array of Leads)
