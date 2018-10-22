match (b:Business)-[:IN_CITY]->(:City {name: "Phoenix"})
WHERE (b)-[:IN_CATEGORY]->(:Category {name: "Restaurants"})
RETURN b.id, b.name,
     [(b)-[:IN_CATEGORY]->(category) | category.name] AS categories,
     size((b)<-[:REVIEWS]-()) AS reviews
ORDER BY reviews DESC
LIMIT 10
