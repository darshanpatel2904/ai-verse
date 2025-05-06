CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."agent_category" AS ENUM('Research', 'Business', 'Marketing', 'Data', 'Education', 'Support', 'Media', 'Development', 'Productivity', 'Automation', 'Security', 'Personal', 'Other');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"credits" double precision DEFAULT 0 NOT NULL,
	"deleteAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"longDescription" text NOT NULL,
	"imageUrl" text NOT NULL,
	"rating" double precision DEFAULT 0 NOT NULL,
	"ratingCount" double precision DEFAULT 0 NOT NULL,
	"creditsPerTask" double precision DEFAULT 0 NOT NULL,
	"category" "agent_category" DEFAULT 'Other',
	"features" text[] DEFAULT '{}' NOT NULL,
	"useCases" text[] DEFAULT '{}' NOT NULL,
	"formFields" jsonb,
	"sampleOutput" jsonb,
	"userId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote" text NOT NULL,
	"rating" double precision DEFAULT 0 NOT NULL,
	"authorId" uuid NOT NULL,
	"agentId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unique_user_agent_rating" UNIQUE("authorId","agentId")
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_agentId_agents_id_fk" FOREIGN KEY ("agentId") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "agents_name_idx" ON "agents" USING btree ("name");--> statement-breakpoint
CREATE INDEX "agents_category_idx" ON "agents" USING btree ("category");--> statement-breakpoint
CREATE INDEX "ratings_agent_id_idx" ON "ratings" USING btree ("agentId");