CREATE TABLE houder (
                        id                          VARCHAR(50)     PRIMARY KEY,
                        naam                        VARCHAR(255)    NOT NULL,
                        kvk                         BIGINT,
                        contact_persoon             VARCHAR(255),
                        contact_telefoon            VARCHAR(50),
                        contact_emailadres          VARCHAR(255),
                        contact_website             VARCHAR(255),
                        correspondentie_adres       VARCHAR(255),
                        correspondentie_postcode    VARCHAR(10),
                        correspondentie_woonplaats  VARCHAR(100),
                        created_at                  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
                        updated_at                  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);