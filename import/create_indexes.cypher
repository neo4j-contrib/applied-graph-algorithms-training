CREATE INDEX ON :User(id);
CREATE INDEX ON :Photo(id);

CALL db.index.fulltext.createNodeIndex("BusinessNameIndex", ["Business"], ["name"]);