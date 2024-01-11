import styled from '@emotion/styled';

import {
  MainIcnArrowWhite as MainArrowWhiteIc,
  MainGraphicLogo as MainGraphicLogoIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Introduction = () => {
  const handleOnClick = () => {
    alert('Button Clicked!');
  };

  return (
    <IntroductionWrapper>
      <MileMakersTextLayout>
        <MainGraphicLogoIc />
        <Spacing marginBottom="2.9" />
        <MainText>
          마일은 어떻게 만들어졌을까요?
          <br /> 마일 메이커들의 에피소드
        </MainText>
        <Spacing marginBottom="0.8" />
        <SubText>아직 가입된 글 모임이 없으시다면, 마일과 함께 써요!</SubText>
        <Spacing marginBottom="8" />
        <GroupRoutingButtonBox onClick={handleOnClick}>
          마일 글 모임 바로가기
          <MainArrowWhiteIc />
        </GroupRoutingButtonBox>
      </MileMakersTextLayout>
      <IntroduceZakmiBox>
        <HookText>우리가 글을 사랑하는 이유</HookText>
        <Spacing marginBottom="0.4" />
        <GreetingText>안녕하세요, 팀 작미입니다.</GreetingText>
        <Spacing marginBottom="3" />
        <DiscriptionText>
          텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다.
          텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다.
          텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간...
        </DiscriptionText>
      </IntroduceZakmiBox>
    </IntroductionWrapper>
  );
};

export default Introduction;

const IntroductionWrapper = styled.section`
  display: flex;
  gap: 7.4rem;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  padding: 10.1rem 28.4rem 10rem 21.8rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
`;

const MileMakersTextLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6.4rem;
`;

const MainText = styled.p`
  width: fit-content;

  white-space: nowrap;
  ${({ theme }) => theme.fonts.title3};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.darkViolet};
  ${({ theme }) => theme.fonts.subtitle3};
`;

const GroupRoutingButtonBox = styled.button`
  display: inline-flex;
  gap: 0.8rem;
  align-items: center;
  width: fit-content;
  height: 3.6rem;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
    ${({ theme }) => theme.fonts.button1};

    background-color: ${({ theme }) => theme.colors.mileViolet};

    & > svg {
      path {
        stroke: ${({ theme }) => theme.colors.mainViolet};
      }
    }
  }
`;

const IntroduceZakmiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  height: 26.7rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

const HookText = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
`;

const GreetingText = styled.p`
  width: fit-content;

  white-space: nowrap;
  ${({ theme }) => theme.fonts.title5};
`;

const DiscriptionText = styled.p`
  width: fit-content;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;
