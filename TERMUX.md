# DeployCore - Termux Setup
1. `pkg install nodejs postgresql redis clang python make git`
2. `npm install -g pnpm`
3. Install in `~/deploycore`, NEVER in `/sdcard/`.
4. `pnpm install`
5. `cp .env.example .env`
6. `pnpm db:generate`
7. `pnpm dev:termux`