/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LASTFM_USERNAME: string
  readonly VITE_LASTFM_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}