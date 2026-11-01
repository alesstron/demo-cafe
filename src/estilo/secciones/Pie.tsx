"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Pie: vitral fino, letrero pequeño, dirección, créditos de las fotos y aviso de demo.
 * EN: Footer: thin stained glass, small sign, address, photo credits and demo notice.
 */
import { urlFicha, urlTelefono, useMotor } from "@/motor";
import { Vitral } from "../decor";
import { COPY } from "../textos";

export function Pie() {
  const { cafe, tx, t } = useMotor();
  const autores = [...new Set((cafe.galeria ?? []).map((f) => f.autor).filter(Boolean))].join(", ");
  return (
    <footer className="pie">
      <Vitral fino />
      <div className="contenedor pie__rejilla">
        <div>
          <p className="logotipo pie__logo">
            Kahwa <span>Café</span>
          </p>
          <p className="pie__lema">{tx(cafe.marca.eslogan)}</p>
        </div>
        <div className="pie__datos">
          <p>
            {cafe.contacto.direccion}, {cafe.contacto.ciudad}
          </p>
          {cafe.contacto.telefono && (
            <p>
              <a href={urlTelefono(cafe.contacto.telefono)}>{cafe.contacto.telefono}</a>
            </p>
          )}
          <p>
            <a href={urlFicha(cafe)} target="_blank" rel="noopener noreferrer">
              {t("verEnMaps")}
            </a>
          </p>
        </div>
      </div>
      <div className="contenedor pie__legal">
        {autores && (
          <p>
            {tx(COPY.creditos)} · {autores}.
          </p>
        )}
        {cafe.demo && <p className="pie__demo">{t("avisoDemo")}</p>}
      </div>
    </footer>
  );
}
