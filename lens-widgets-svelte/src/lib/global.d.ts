declare module "*.spec.ts" {
  declare global {
    interface Window{
      ethereum?: any
    }
  }
}