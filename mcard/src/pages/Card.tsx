import FixedButton from '@/components/shared/FixedButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'

const str = `
<div class="container">
    <header class="main-header">
        <h1 style="color: blue;">신용카드 이용약관 및 안내사항</h1>
        <nav class="navigation">
            <ul>
                <li><a href="#section1">발급조건</a></li>
                <li><a href="#section2">카드혜택</a></li>
                <li><a href="#section3">이용약관</a></li>
                <li><a href="#section4">부가서비스</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="section1">
            <h2>신용카드 발급 기본 조건</h2>
            <p>당사 신용카드를 발급받기 위해서는 <strong>연소득 2,000만원</strong> 이상의 정규직 직장인 또는 사업자이어야 합니다. 단, 프리랜서의 경우 최근 2년간의 소득증빙자료가 필요합니다.</p>
            <ul>
                <li>대한민국 국적의 만 19세 이상 성인</li>
                <li>NICE 신용평가 기준 <em>680점</em> 이상 보유</li>
                <li><span class="highlight">최근 1년간 카드 연체 이력이 없는 자</span></li>
                <li>신용카드 발급 제한자가 아닌 자</li>
                <li>신용정보 조회 동의가 가능한 자</li>
            </ul>
        </section>

        <section id="section2">
            <h2>프리미엄 카드 서비스 혜택 안내</h2>
            <div class="benefits">
                <h3>기본 혜택</h3>
                <p>1. 전월 실적 <b>30만원</b> 이상 시 국내 모든 영화관 예매 시 <span style="color: red;">30% 즉시 할인</span></p>
                <p>2. 모든 온라인 가맹점 <i>2% 기본 캐시백</i> 및 특별 가맹점 최대 7% 추가 캐시백</p>
                <p>3. <span style="color: red;">연회비 첫해 무료</span> (단, 카드 발급 후 3개월 내 100만원 이상 사용 시)</p>
                <p>4. 전국 주요 커피전문점 <strong>20% 상시 할인</strong></p>
                <p>5. 프리미엄 공항 라운지 무료 이용 (연 3회)</p>
            </div>

            <div class="special-benefits">
                <h3>시즌별 특별 혜택</h3>
                <p>여름 성수기 (6월-8월)</p>
                <ul>
                    <li>리조트 예약 시 40% 할인</li>
                    <li>워터파크 입장료 50% 할인</li>
                    <li>해외 직구 결제 시 무료 배송비 지원</li>
                </ul>
                
                <p>겨울 성수기 (12월-2월)</p>
                <ul>
                    <li>스키장 리프트 이용권 30% 할인</li>
                    <li>겨울 방한용품 구매 시 10% 추가 할인</li>
                    <li>해외 호텔 예약 시 최대 15% 할인</li>
                </ul>
            </div>

            <table class="reward-table">
                <tr>
                    <th colspan="2">포인트 적립률 안내</th>
                </tr>
                <tr>
                    <td>기본 적립률</td>
                    <td>0.7% (모든 가맹점)</td>
                </tr>
                <tr>
                    <td>추가 적립률</td>
                    <td>1.3% (특별 가맹점)</td>
                </tr>
                <tr>
                    <td>온라인 적립률</td>
                    <td>2.0% (온라인 가맹점)</td>
                </tr>
            </table>
        </section>

        <section id="section3">
            <h2>이용약관 주요 내용</h2>
            <div class="terms">
                <p><strong>제1조 (목적)</strong></p>
                <p>본 약관은 당사가 발행하는 신용카드를 회원이 이용함에 있어서 필요한 사항을 규정하여 양자 간의 권리·의무 관계를 명확히 하는 것을 목적으로 합니다.</p>
                
                <p><strong>제2조 (용어의 정의)</strong></p>
                <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                <ol>
                    <li>"카드"란 당사가 발행하는 신용카드, 직불카드 및 선불카드를 의미합니다.</li>
                    <li>"회원"이란 본 약관을 승인하고 당사에 카드발급을 신청하여 카드를 발급받은 자를 말합니다.</li>
                    <li>"가맹점"이란 당사와 카드가맹점 계약을 체결하고 카드회원에게 물품 또는 서비스를 제공하는 자를 말합니다.</li>
                </ol>

                <p><strong>제3조 (카드의 유효기간)</strong></p>
                <p>카드의 유효기간은 발급일로부터 5년이며, 유효기간이 도래하면 회원의 의사를 확인하여 갱신발급합니다.</p>
            </div>
        </section>

        <section id="section4">
            <h2>부가서비스 상세 안내</h2>
            <div class="additional-services">
                <h3>여행 관련 서비스</h3>
                <ul>
                    <li>해외 여행자보험 최대 3억원 자동 가입</li>
                    <li>전 세계 공항 라운지 무료 이용</li>
                    <li>공항 밴 서비스 50% 할인</li>
                    <li>해외 호텔 예약 시 최대 15% 할인</li>
                </ul>

                <h3>생활 편의 서비스</h3>
                <ul>
                    <li>프리미엄 골프장 주중 무료 부킹 서비스</li>
                    <li>전국 주요 호텔 발렛파킹 무료</li>
                    <li>프리미엄 데스크 24시간 운영</li>
                    <li>긴급 의료 지원 서비스</li>
                </ul>

                <h3>쇼핑 관련 서비스</h3>
                <ul>
                    <li>명품 브랜드 VIP 세일 초대</li>
                    <li>프리미엄 아울렛 추가 할인</li>
                    <li>백화점 VIP 라운지 이용</li>
                    <li>면세점 즉시 할인 및 추가 적립</li>
                </ul>
            </div>
        </section>
    </main>

    <footer>
        <small>&copy; 2024 프리미엄 카드 서비스 약관</small>
        <div class="contact">
            <p>고객센터: <a href="tel:1588-0000">1588-0000</a> (365일 24시간 운영)</p>
            <p>해외에서: <a href="tel:82-2-1588-0000">+82-2-1588-0000</a></p>
            <p>이메일: <a href="mailto:premium@card.com">premium@card.com</a></p>
            <p>분실신고: <a href="tel:1588-0001">1588-0001</a></p>
        </div>
    </footer>
</div>`

export default function CardPage() {
  const { id = '' } = useParams()

  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    // enabled는 쿼리 실행 여부 => id가 빈 값이 아니면 호출하겠다! 라는 뜻
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    // 나중에 추가하면 좋은기능
    // 로그인 후 원래 페이지로 돌아오기

    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () =>
          navigate(`/signin`, {
            state: {
              redirectUrl: `/card/${id}`,
            },
          }),
      })
      return
    }

    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (data == null) return null

  const { name, corpName, promotion, tags, benefit } = data

  // promotion.title 안에는 html 태그가 들어있는데 우린 필요없으므로 제거해줘야함 (removeHtmlTags함수 생성)
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, i) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              // animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: 0.1 * i,
              }}
              // animate 속성을 없애고 whileInView 속성을 써주면 화면에 보일때마다 실행됨
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${i + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          {/* <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text> */}
          <Text typography="t7">{removeHtmlTags(str).repeat(200)}</Text>
        </Flex>
      ) : null}

      <FixedButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

/**
// 태그 <> 꺽쇠를 건너뛰기 위한 함수
function removeHtmlTags(text: string | undefined) {
  if (text == null) return ''

  // HTML 태그가 제거된 순수 텍스트를 저장할 빈 문자열 변수를 선언합니다
  let output = ''

  for (let i = 0; i < text.length; i++) {
    // 현재 문자가 HTML 태그의 시작 문자('<')인 경우
    if (text[i] === '<') {
      for (let j = i; j < text.length; j++) {
        // 태그의 끝 문자를 찾으면
        if (text[j] === '>') {
          // 외부 반복문의 인덱스를 태그 끝으로 이동시킵니다
          i = j
          // 내부 반복문 종료
          break
        }
      }
    } else {
      // html 태그가 아니라 일반 텍스트인 경우에는
      output += text[i]
    }
  }

  return output
}
 */

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
  // HTML 여는 태그와 닫는 태그 사이의 문자열을 가진 애들을 가지고 와서 공백 으로 바꾸겠다라는 거임
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`
