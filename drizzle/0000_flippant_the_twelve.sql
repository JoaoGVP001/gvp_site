CREATE TABLE `contact_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`empresa` text NOT NULL,
	`cidade` text NOT NULL,
	`telefone` text NOT NULL,
	`email` text NOT NULL,
	`assunto` text NOT NULL,
	`mensagem` text NOT NULL,
	`preferencia` text NOT NULL,
	`origem` text DEFAULT 'contato' NOT NULL,
	`status` text DEFAULT 'novo' NOT NULL,
	`criado_em` integer NOT NULL,
	`atualizado_em` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_status_criado_idx` ON `leads` (`status`,`criado_em`);