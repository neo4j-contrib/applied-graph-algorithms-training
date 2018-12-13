// FIND PHOTOS OF RELEVANT BUSINESSES
export const FETCH_RECOMMENDED_PHOTOS_QUERY =
`
MATCH (b:Business)-[:HAS_PHOTO]->(p:Photo)
WITH b, p SKIP toInteger(rand() * 30000)-100 LIMIT 100
RETURN p{photoId: p.id, businessId: b.id} AS photos
`