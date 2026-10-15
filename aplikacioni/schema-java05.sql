-- Java 5: ruaje kete skedar ne repository dhe ekzekutoje nje here ne Neon SQL Editor.
-- Nuk fshin te dhenat ekzistuese te Java 4.
CREATE TABLE IF NOT EXISTS profilet (
  github_id TEXT PRIMARY KEY,
  emri TEXT NOT NULL,
  roli TEXT NOT NULL DEFAULT 'udhetar' CHECK (roli IN ('udhetar', 'shofer'))
);

ALTER TABLE udhetimet
  ADD COLUMN IF NOT EXISTS shofer_id TEXT REFERENCES profilet(github_id);

-- Pronari demonstrues i udhetimit 1; nuk mund te perdoret per hyrje.
INSERT INTO profilet (github_id, emri, roli)
VALUES ('DEMO-SHOFER-2', 'Shoferi tjeter (demo)', 'shofer')
ON CONFLICT (github_id) DO NOTHING;

UPDATE udhetimet
SET shofer_id = 'DEMO-SHOFER-2'
WHERE id = '1' AND shofer_id IS NULL;

SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;
