-- Java 9: ekzekutoje pasi te jete ekzekutuar schema-java05.sql.
CREATE TABLE IF NOT EXISTS preferencat (
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (udhetar_id, udhetim_id)
);
CREATE INDEX IF NOT EXISTS preferencat_udhetar_idx ON preferencat (udhetar_id);
