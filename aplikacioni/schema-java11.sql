-- Java 11: njoftimet personale te udhetarit.
-- Ekzekutoje pasi te jete ekzekutuar schema-java10.sql.
CREATE TABLE IF NOT EXISTS njoftimet (
  id BIGSERIAL PRIMARY KEY,
  kerkesa_id BIGINT NOT NULL UNIQUE REFERENCES kerkesat(id) ON DELETE CASCADE,
  marresi_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  lloji TEXT NOT NULL CHECK (lloji IN ('pranuar', 'refuzuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lexuar_me TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS njoftimet_marresi_idx
  ON njoftimet (marresi_id, lexuar_me, krijuar_me DESC);

SELECT id, kerkesa_id, marresi_id, lloji, krijuar_me, lexuar_me
FROM njoftimet ORDER BY krijuar_me DESC;
