CREATE TABLE voorziening (
                             lrk_id                      VARCHAR(50)     PRIMARY KEY,
                             houder_id                   VARCHAR(50)     NOT NULL REFERENCES houder(id),
                             adres                       VARCHAR(255),
                             plaats                      VARCHAR(100),
                             postcode                    VARCHAR(10),
                             verantwoordelijke_gemeente  VARCHAR(100),
                             gemeente_cbs_code           VARCHAR(20),
                             soort                       VARCHAR(10),
                             created_at                  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
                             updated_at                  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_voorziening_houder_id ON voorziening(houder_id);
CREATE INDEX idx_voorziening_soort     ON voorziening(soort);
CREATE INDEX idx_voorziening_postcode  ON voorziening(postcode);