export const metadata = { title: 'DeployCore', description: 'Developer Cloud Platform' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}