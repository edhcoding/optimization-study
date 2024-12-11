// 가격표에 세 자릿수마다 구분자 넣어주는 유틸함수
export default function addDelimeter(value: number | string, delimiter = ',') {
  // 정규식 사용해서 3자리마다 구분자 넣어줌 (구분자 아무거나 상관없음 ex), . # a 등등)
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}
