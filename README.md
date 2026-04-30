# Abogado Tech

Base inicial del sistema con Next.js, TypeScript y Supabase.

## Requisitos

- Node.js 20.9 o superior
- Variables de entorno de Supabase en `.env.local`

## Variables de entorno

Usa estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Flujo actual

- `/login`: acceso con email y password
- `/dashboard`: ruta protegida
- `/modulos/calculo-pena`: placeholder protegido
