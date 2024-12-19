import { User } from '@/models/user'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // GoogleProvider가 실행되고 구글 페이지에서 인증 동작을 거친 후에 동작하는 session 함수 정의
    // session 함수에는 session, token, user 인자가 넘어옴 이 안에 들어있는 값들을 조합해서 우리는 어떤 값을 세션에 남길건가 결정할 수 있음
    session({ session, token }) {
      console.log('session', session)
      console.log('token', token)

      if (session.user) {
        // 세션에 유저가 있다 = 로그인 됐다
        // tonken의 sub는 유저의 고유 식별자를 가지고 있는데 우리는 이걸 session.user.id에 할당해주고 싶음
        // id 부분에 타입 오류나는데 이유는name, email, image값만 가지고 있기 때문에 따로 타입을 지정해줘야함
        ;(session.user as User).id = token.sub as string
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})
