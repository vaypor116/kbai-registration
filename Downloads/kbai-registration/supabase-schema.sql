-- ═══════════════════════════════════════════════════════════
--  Kids Build with AI 2.0 — Supabase Schema
--  Run this entire file in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS students (
  id                      UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at              TIMESTAMPTZ DEFAULT NOW(),

  -- Personal Info
  first_name              TEXT        NOT NULL,
  last_name               TEXT        NOT NULL,
  date_of_birth           DATE        NOT NULL,
  age                     INTEGER,
  gender                  TEXT,

  -- Contact
  email                   TEXT,
  phone                   TEXT,

  -- Location
  state                   TEXT        NOT NULL,
  lga                     TEXT,

  -- Guardian
  guardian_name           TEXT        NOT NULL,
  guardian_phone          TEXT        NOT NULL,
  guardian_email          TEXT,
  guardian_relationship   TEXT,

  -- Academic
  school_name             TEXT,
  grade_class             TEXT,
  prior_coding_experience TEXT,
  how_heard               TEXT,

  -- Media
  photo_url               TEXT,

  -- Program
  program_version         TEXT        DEFAULT '2.0',
  registration_id         TEXT        UNIQUE NOT NULL,
  status                  TEXT        DEFAULT 'pending'
);

-- ── Row Level Security ──────────────────────────────────────
-- Your API route uses the service_role key which bypasses RLS.
-- RLS is still good practice to enable.
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- No direct client access — all writes go through your API route
-- (which uses the service_role key server-side)

-- ── Index for fast lookups ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_students_registration_id ON students(registration_id);
CREATE INDEX IF NOT EXISTS idx_students_state ON students(state);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at DESC);

-- ═══════════════════════════════════════════════════════════
--  STORAGE BUCKET
--  After running this SQL, also do:
--  Supabase Dashboard → Storage → New Bucket
--    Name: student-photos
--    Public bucket: YES (so photo URLs are accessible)
-- ═══════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════
--  VOLUNTEERS TABLE
--  Run this in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS volunteers (
  id                       UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at               TIMESTAMPTZ DEFAULT NOW(),

  -- Personal Info
  first_name               TEXT        NOT NULL,
  last_name                TEXT        NOT NULL,
  email                    TEXT,
  phone                    TEXT        NOT NULL,
  state                    TEXT        NOT NULL,
  occupation               TEXT,

  -- Role & Skills
  role_type                TEXT[]      NOT NULL,            -- e.g. {tutor, mentor}
  areas_of_expertise       TEXT[]      NOT NULL,            -- e.g. {AI & Machine Learning, Programming / Coding}
  other_expertise          TEXT,

  -- Availability
  availability             TEXT        NOT NULL,
  days_available           TEXT[]      DEFAULT '{}',
  has_volunteered_before   TEXT,

  -- Motivation
  motivation               TEXT,
  how_heard                TEXT,

  -- Program
  program_version          TEXT        DEFAULT '2.0',
  registration_id          TEXT        UNIQUE NOT NULL,
  status                   TEXT        DEFAULT 'pending'    -- pending, approved, rejected, onboarded
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- No direct client access — all writes go through the API route
-- (which uses the service_role key server-side)

CREATE INDEX IF NOT EXISTS idx_volunteers_registration_id ON volunteers(registration_id);
CREATE INDEX IF NOT EXISTS idx_volunteers_state ON volunteers(state);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers(created_at DESC);
