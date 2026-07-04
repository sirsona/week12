CREATE TABLE leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    wa_phone text NOT NULL UNIQUE,
    name text,
    email text,
    inquiry_type text,
    status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    notes text,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    lead_id uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
    state text NOT NULL,
    data jsonb,
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    lead_id uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
    direction text NOT NULL CHECK (direction IN ('in', 'out')),
    body text,
    created_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('admin', 'manager', 'agent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads (status);

CREATE INDEX idx_messages_lead_id ON messages (lead_id);

ALTER TABLE leads ADD COLUMN assigned_to UUID REFERENCES users(id);


