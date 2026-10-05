CREATE TABLE `lead_email_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`kind` text NOT NULL,
	`status` text NOT NULL,
	`provider_id` text,
	`criado_em` integer NOT NULL,
	`atualizado_em` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `lead_email_attempts_lead_idx` ON `lead_email_attempts` (`lead_id`);