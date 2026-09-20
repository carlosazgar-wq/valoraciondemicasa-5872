import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nombre: text("nombre").notNull(),
  telefono: text("telefono").notNull(),
  email: text("email").notNull(),
  direccion: text("direccion").notNull(),
  codigoPostal: text("codigo_postal"),
  ciudad: text("ciudad"),
  tipoInmueble: text("tipo_inmueble").notNull(), // piso, casa, adosado, etc
  superficie: integer("superficie").notNull(),
  habitaciones: integer("habitaciones").notNull(),
  banos: integer("banos").notNull(),
  planta: text("planta"),
  estado: text("estado").notNull(), // excelente, bueno, regular, reformar
  extras: text("extras"), // JSON array: garaje, trastero, piscina, etc
  valorEstimadoMin: real("valor_estimado_min"),
  valorEstimadoMax: real("valor_estimado_max"),
  valorEstimado: real("valor_estimado"),
  consentimientoCesion: integer("consentimiento_cesion", { mode: "boolean" }).default(true),
  ip: text("ip"),
  estado_lead: text("estado_lead").default("nuevo"), // nuevo, contactado, vendido, descartado
  notas: text("notas"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
