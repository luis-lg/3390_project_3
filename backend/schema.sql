DROP TABLE IF EXISTS "comments" CASCADE;
DROP TABLE IF EXISTS "messages" CASCADE;
DROP TABLE IF EXISTS "rsvps" CASCADE;
DROP TABLE IF EXISTS "events" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar(80) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(200) NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "comments" (
  "id" serial PRIMARY KEY,
  "body" text,
  "user_id" integer NOT NULL,
  "event_id" integer NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "events" (
  "id" serial PRIMARY KEY,
  "band" varchar NOT NULL,
  "venue" varchar,
  "location" varchar,
  "date" date,
  "description" text
);

CREATE TABLE "rsvps" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "event_id" INTEGER
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" integer,
  "receiver_id" integer,
  "body" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN "comments"."body" IS 'Content of the post';

COMMENT ON COLUMN "messages"."body" IS 'Content of the message';

ALTER TABLE "comments" ADD CONSTRAINT "user_comments" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");

ALTER TABLE "rsvps" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rsvps" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");
