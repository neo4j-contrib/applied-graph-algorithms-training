/*
 TODO: instructions / context for
 */
export const FETCH_CATEGORIES_QUERY =
`
MATCH (c:Category)
WHERE NOT EXISTS ((c)-[:NARROWER_THAN]->())
WITH c ORDER BY c.name LIMIT 200
RETURN COLLECT(c.name) AS categories
`;

// `
// MATCH (c:Category)
// WITH c ORDER BY c.name LIMIT 500
// RETURN COLLECT(c.name) AS categories
// `;