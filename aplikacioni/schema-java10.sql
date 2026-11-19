-- Java 10: ekzekutoje pasi te jete ekzekutuar schema-java05.sql.
-- Kjo tabele ruan kerkesen ne Neon, jo vetem ne shfletues.
CREATE TABLE IF NOT EXISTS kerkesat (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'ne_pritje' CHECK (status IN ('ne_pritje', 'pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ndryshuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS kerkesat_udhetim_idx ON kerkesat (udhetim_id, status);

-- Te dhenat e provave jane fiktive; vendos ID-te reale te dy llogarive vetem ne Neon.
SELECT id, udhetim_id, udhetar_id, status FROM kerkesat ORDER BY id;
