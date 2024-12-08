import useUser from '@/hooks/auth/useUser'
import { app, storage, store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ChangeEvent } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atoms/user'

export default function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  // 이 값은 우리가 인증된 유저 정보를 가지고 state로 저장한 값이고 실제 Firebase가 동작하고 있는 곳에서 로그인 되어 있는 유저의 정보를 가지고 와야함 => firebase/auth의 getAuth에서 가지고옴
  const user = useUser()

  // recoil에 저장된 유저 정보를 업데이트 해줘야함
  const setUser = useSetRecoilState(userAtom)

  const currentUser = getAuth(app).currentUser

  // 사진 File 업로드 => 업로드된 파일을 가지고와서 유저의 정보를 업데이트 해줘야함
  // Firebase랑 상호작용을 하려면 지금 인증된 유저 정보를 가지고 와야함
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files == null || user == null || currentUser == null) return

    // 업로드한 파일 가져오는 로직
    // 콘솔에 찍어보면 사진의 이름이 나오는데 이대로 Firebase에 저장할 수 있지만 우리는 path를 만들어서 저장해야함
    const fileName = files[0].name

    // users라는 폴더를 만들고 지금 로그인한 유저의 아이디로 한번 더 폴더를 분류하고 그 안에 파일 이름을 저장함
    // ref를 감싸서 애플리케이션의 firebase를 사용하겠다고 알려줘야함
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    // 첫 번째 인자로 ref, 두 번째 인자로 어떤 파일을 저장할지
    const uploaded = await uploadBytes(storageRef, files[0])

    // 업로드한 파일을 가지고와서 다운로드 URL을 가지고옴
    const downloadUrl = await getDownloadURL(uploaded.ref)

    // 유저의 정보를 업데이트 해줘야항ㅁ
    await updateProfile(currentUser, { photoURL: downloadUrl })

    // 우리는 지금 유저의 인증 정보를 두 곳에서 관리하고 있음
    // 하나는 Firebase Authentication에서 인증을 관리해주는 곳이고
    // 하나는 위에서 나온 인증 정보를 가지고 Firebase Database에서도 USER에 대한 정보를 관리하고 있음
    // 방금 updateProfile로 photoURL을 업데이트 해준 요소는 Authentication에 대한 정보고 이거와 싱크를 맞춰줘야 하니까
    // 우리는 Firebase Database에도 동일한 정보를 업데이트 해줘야함
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    // 업데이트 잘 됐는지 콘솔 찍어보면 잘 됐는데 이미지가 안바뀜 => 우리는 recoil의 값도 업데이트 해줘야함
    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        // 유저의 이미지를 업로드 해주고 싶은데 내 정보랑, navbar에서 사용중이라서 mode 라는 props를 이용해서 이미지 뒤에 input 파일을 숨켜놓고 이미지를 클릭했을때 파일을 업로드 하는 창을 띄워주면 됨
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {/* accept="image/*" 이미지 파일만 업로드 가능 */}
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
