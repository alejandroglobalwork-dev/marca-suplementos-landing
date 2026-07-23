# Landing page — [Nombre de Marca]

Borrador de landing para validar demanda del "Protocolo Sento 6" antes de fabricar nada.
Ya tiene un repo git local con el primer commit hecho.

## Ver el resultado

Abre `index.html` directamente en el navegador (doble clic), o si quieres verlo servido:

```bash
python3 -m http.server 8000
```

y entra a `http://localhost:8000`.

## Subirlo a GitHub para que los dos podáis editarlo

1. Entra a github.com y crea un repositorio nuevo, vacío (sin README, sin licencia) — por ejemplo `marca-suplementos-landing`. Puede ser privado.
2. En tu terminal, dentro de esta carpeta:

```bash
git remote add origin https://github.com/TU-USUARIO/marca-suplementos-landing.git
git branch -M main
git push -u origin main
```

3. Invita a tu socio como colaborador desde GitHub: Settings → Collaborators → Add people, con su usuario o email.
4. A partir de ahí, cada uno hace sus cambios en local y sube con:

```bash
git add .
git commit -m "describe qué cambiaste"
git push
```

Si los dos vais a tocar el mismo archivo a la vez, mejor trabajar en ramas (`git checkout -b nombre-cambio`) y luego un Pull Request en GitHub, para no pisaros el trabajo.

## Qué falta antes de que esto capture emails de verdad

El formulario ahora mismo solo funciona en el navegador (mira la consola). Para recoger emails reales, conéctalo a algo como Mailchimp, Brevo o un Google Form — o dilo aquí y te lo dejo integrado.

## Pendiente de decidir

- Nombre de marca y logo (ahora mismo hay placeholders `[NOMBRE MARCA]`)
- Paleta de color e imágenes reales de producto (el bote es un mockup en CSS)
- Copy final una vez cerréis nicho y naming
