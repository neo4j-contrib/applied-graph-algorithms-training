// Find the most reviewed restaurants
// tag::most-reviewed-restaurants[]
match (b:Business)-[:IN_CITY]->(:City {name: "Phoenix"})
WHERE (b)-[:IN_CATEGORY]->(:Category {name: "Restaurants"})
RETURN b.id, b.name,
       [(b)-[:IN_CATEGORY]->(category) | category.name] AS categories,
       size((b)<-[:REVIEWS]-()) AS reviews
ORDER BY reviews DESC
LIMIT 10;
// end::most-reviewed-restaurants[]

// Find interesting reviewers to use to explain the data

// tag::interesting-reviewers[]
MATCH (u:User)-[:WROTE]->()-[:REVIEWS]-(business:Business)
WHERE (business:Business)-[:IN_CITY]->(:City {name: "Phoenix"})

WITH u, count(*) AS totalReviews
ORDER BY totalReviews DESC
LIMIT 1000
MATCH (u)-[:WROTE]->()-[:REVIEWS]->()-[:IN_CATEGORY]->(cat)

WITH u, totalReviews, cat, count(*) AS count ORDER BY u, count DESC
WHERE count > 5
RETURN u.id, u.name, totalReviews, collect(cat.name)[..5] AS categories
ORDER BY totalReviews DESC;
// end::interesting-reviewers[]

// Calculating taxonomy
MATCH (category:Category)
MATCH (category)<-[:IN_CATEGORY]-(business)
WITH {item:id(category),
      categories: collect(id(business))} as userData
WITH collect(userData) as data
CALL algo.similarity.overlap(data, {
  write: true, similarityCutoff: 0.75
})
YIELD nodes, similarityPairs, p50, p75, p90, p99
RETURN nodes, similarityPairs, p50, p75, p90, p99;

// Remove transitive taxonomy
MATCH (g1:Category)-[:NARROWER_THAN*2..]->(g3:Category),
      (g1)-[d:NARROWER_THAN]->(g3)
DELETE d;

// Top level categories
MATCH (u:User)-[:WROTE]->()-[:REVIEWS]-(business:Business)
WHERE (business:Business)-[:IN_CITY]->(:City {name: "Phoenix"})
WITH u, count(*) AS totalReviews
ORDER BY totalReviews DESC
LIMIT 1000
MATCH (u)-[:WROTE]->()-[:REVIEWS]->()-[:IN_CATEGORY]->(cat)-[:NARROWER_THAN*0..]->(superCat)
WHERE not (superCat)-[:NARROWER_THAN]->()
WITH u, totalReviews, superCat, count(*) AS count ORDER BY u, count DESC WHERE count > 5
RETURN u.id, u.name, totalReviews, collect(superCat.name)[..10] AS categories
ORDER BY totalReviews DESC;

// Find the top reviewers in a category
MATCH (u:User)-[:WROTE]->()-[:REVIEWS]-(business:Business)
WHERE (business:Business)-[:IN_CITY]->(:City {name: "Phoenix"})
AND (business:Business)-[:IN_CATEGORY]->(:Category {name: "Fast Food"})
RETURN  u.id, u.name,  count(*) AS count
ORDER BY count DESC
LIMIT 10;

// tag::userids[]
:param userIds => ["XEHZoTDWjw3w-gcQyYIe4g", "d_TBs6J3twMy9GChqUEXkg", "NwPnvTALYMNZgdiwHHkuAQ"];
// end::userids[]

// tag::selected-users[]
MATCH (u:User)-[:WROTE]->()-[:REVIEWS]->(business:Business)-[:IN_CATEGORY]->(category)
WHERE u.id IN $userIds AND (business)-[:IN_CITY]->(:City {name: "Phoenix"})
WITH u, category, count(*) AS count
ORDER BY u, count DESC
RETURN u, collect({category: category.name, count: count})[..5] AS reviews;
// end::selected-users[]

// tag::pick-similar-user[]
:param userId => "NwPnvTALYMNZgdiwHHkuAQ";
// end::pick-similar-user[]

// Find other people who have reviewed the same businesses
// tag::similar-users[]
MATCH (u:User {id: $userId})-[:WROTE]->()-[:REVIEWS]-(business:Business)<-[:REVIEWS]-()<-[:WROTE]-(other)
RETURN other.id, other.name, count(*) AS count
ORDER BY count DESC
LIMIT 10;
// end::similar-users[]