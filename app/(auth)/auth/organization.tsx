import CheckCircleIcon from '@mui/icons-material/CheckCircle' // アップロード完了アイコンをインポート
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button } from '@mui/material'
import { styled as mstyled } from '@mui/material/styles'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

export default function CreateOrganizationView() {
  const [organizationName, setOrganizationName] = useState('')
  const [organizationDescription, setOrganizationDescription] = useState('')
  const [organizationProfileImage, setOrganizationProfileImage] = useState<File | null>(null) // ファイル
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // 'files' が null の可能性を考慮
    if (file) {
      setOrganizationProfileImage(file) // ファイルを状態にセット
    }
  }

  const createOrganization = async () => {
    setErrorMessage('')
    setIsLoading(true)

    const formData = new FormData()
    formData.append('organization_name', organizationName)
    formData.append('organization_description', organizationDescription)
    if (organizationProfileImage) {
      formData.append('organization_profile_image', organizationProfileImage)
    }
    const token = Cookies.get('token')
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/organization/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // 로그인 시 받은 토큰을 헤더에 추가
        },
      })

      if (res.data.success) {
        alert('組織が正常に作成されました')
        router.push(`/organization/${organizationName}`) // ダッシュボードなど適切なページにリダイレクト
      } else {
        setErrorMessage(res.data.message || '組織作成に失敗しました')
      }
    } catch {
      setErrorMessage('サーバーエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OrganizationBox>
      <Title>Create Organization</Title>
      <Subtitle>Please enter basic information about the organization you wish to create</Subtitle>
      <InputField
        type="text"
        placeholder="Organization Name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
      />
      <TextareaField
        placeholder="Organization Description"
        value={organizationDescription}
        onChange={(e) => setOrganizationDescription(e.target.value)}
      />
      <Button
        component="label"
        variant="contained"
        startIcon={organizationProfileImage ? <CheckCircleIcon style={{ color: 'green' }} /> : <CloudUploadIcon />}
        style={{
          marginBottom: '1rem',
          width: '100%',
          borderRadius: 8,
          backgroundColor: organizationProfileImage ? '#d4edda' : '#007bff',
          color: organizationProfileImage ? '#155724' : 'white',
        }}
      >
        {organizationProfileImage ? `File Selected: ${organizationProfileImage.name}` : 'Upload files'}
        <VisuallyHiddenInput
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0] // 'files' が null の可能性を考慮
            if (file) {
              handleFileChange(event) // ファイル選択時に状態を更新
            }
          }}
          accept="image/*"
        />
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <CreateButton
        onClick={createOrganization}
        disabled={isLoading || !organizationName.trim() || !organizationDescription.trim() || !organizationProfileImage}
      >
        {isLoading ? 'Creating...' : 'Create Organization'}
      </CreateButton>
    </OrganizationBox>
  )
}

const VisuallyHiddenInput = mstyled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const OrganizationBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  margin: auto;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
`

const TextareaField = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  resize: none;
`

const CreateButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2d3748;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #1a202c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`
