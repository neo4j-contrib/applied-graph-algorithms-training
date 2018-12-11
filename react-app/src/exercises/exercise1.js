/*
 TODO: instructions / context for
 */
export const FETCH_CATEGORIES_QUERY =
`
MATCH (c:Category)
WHERE (NOT exists ((c)-[:NARROWER_THAN]->())) AND exists((c)<-[:NARROWER_THAN]-())
WITH c LIMIT 50
RETURN COLLECT(c.name) AS categories
`;
