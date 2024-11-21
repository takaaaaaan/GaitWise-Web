import { useEffect, useState } from 'react'

type Mode = 'default' | 'orginvitation' | 'projectinvitation' | 'invalidConfig'

/**
 * サインイン画面のモードを決定するカスタムフック
 * @param organization 組織名
 * @param project プロジェクト名
 * @returns mode 現在のモード
 */
export const useSigninMode = (organization: string | null, project: string | null): Mode => {
  const [mode, setMode] = useState<Mode>('default')

  useEffect(() => {
    if (!organization && !project) {
      setMode('default') // デフォルトの状態
    } else if (organization && !project) {
      setMode('orginvitation') // Organization のみある状態
    } else if (organization && project) {
      setMode('projectinvitation') // Organization と Project 両方がある状態
    } else if (!organization && project) {
      setMode('invalidConfig') // 不正な設定
    }
  }, [organization, project])

  return mode
}
