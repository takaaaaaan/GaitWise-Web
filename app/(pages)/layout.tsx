import '@/styles/globals.css'

import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>
}
