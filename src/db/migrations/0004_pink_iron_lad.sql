CREATE TABLE IF NOT EXISTS "statuses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "statuses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "status" TO "status_id";--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "status_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "file" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."statuses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
