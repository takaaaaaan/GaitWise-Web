import { Copy, Share2 } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react' // QRコード生成用のライブラリ
import { GProject } from 'types'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/ui'

export function QRDialog({ projectdata }: { projectdata: GProject }) {
  // QRコード用のURLを作成
  const { project_name, project_code } = projectdata

  const qrCodeUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/qrcode?projectname=${encodeURIComponent(
    project_name
  )}&code=${encodeURIComponent(project_code)}`

  // QRコードをダウンロードする関数
  const downloadQRCode = () => {
    const canvas = document.getElementById('qrCanvas') as HTMLCanvasElement
    if (!canvas) return

    const dataUrl = canvas.toDataURL('image/png') // QRコードをPNG形式で取得
    const link = document.createElement('a') // ダウンロード用のリンクを作成
    link.href = dataUrl
    link.download = `${project_name}_QRCode.png` // ファイル名を指定
    link.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this project.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* QRコード表示部分 */}
          <div className="flex justify-center">
            <QRCodeCanvas id="qrCanvas" value={qrCodeUrl} size={150} />
          </div>
          {/* URLコピー部分 */}
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={qrCodeUrl} readOnly />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={() => navigator.clipboard.writeText(qrCodeUrl)}>
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
        </div>
        <DialogFooter className="items-center sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Close
            </Button>
          </DialogClose>
          {/* ダウンロードボタン */}
          <div className="mt-4 flex justify-center">
            <Button type="button" onClick={downloadQRCode}>
              Download QR Code
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
