// Find the most reviewed restaurants
// tag::most-reviewed-restaurants[]
match (b:Business)-[:IN_CITY]->(:City {name: "Phoenix"})
WHERE (b)-[:IN_CATEGORY]->(:Category {name: "Restaurants"})
RETURN b.id, b.name,
     [(b)-[:IN_CATEGORY]->(category) | category.name] AS categories,
     size((b)<-[:REVIEWS]-()) AS reviews
ORDER BY reviews DESC
LIMIT 10
// end::most-reviewed-restaurants[]

// Find interesting reviewers to use to explain the data
// tag::interesting-reviewers[]
MATCH (u:User)-[:WROTE]->()-[:REVIEWS]-(business:Business)
WHERE (business:Business)-[:IN_CITY]->(:City {name: "Phoenix"})

WITH u, count(*) AS totalReviews
ORDER BY totalReviews DESC
LIMIT 1000
MATCH (u)-[:WROTE]->()-[:REVIEWS]->()-[:IN_CATEGORY]->(cat)

WITH u, totalReviews, cat, count(*) AS count ORDER BY u, count DESC WHERE count > 5
RETURN u.id, u.name, totalReviews, collect(cat.name)[..5] AS categories
ORDER BY totalReviews DESC
// end::interesting-reviewers[]