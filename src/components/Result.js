import React from 'react';
import styled from 'styled-components';

/**
   * 오늘의 주문서
   * 1. 같은메뉴는 취합해서 갯수로 보여준다.
   * 2. 시킨 인원에 따라서 배달비 계산을 해준다.(배달비 default 3600원)
   * 3. 총 합에 따른 인원별 비용 계산 처리(Table)
   */

const Container = styled.div``;

const Result = ({result}) => {
  console.log(result);
  return <Container>
  결과
  </Container>
}
export default Result;