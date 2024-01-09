import styled from '@emotion/styled/macro';

import Spacing from '../../components/commons/Spacing';

interface GroupCuriousPropTypes {
  mainText: string;
  subText: string;
}

const GroupCuriousTitle = (infoProps: GroupCuriousPropTypes) => {
  const { mainText, subText } = infoProps;

  return (
    <GroupCuriousTitleWrapper>
      <MainText>{mainText}</MainText>
      <Spacing marginBottom="0.8" />
      <SubText>{subText}</SubText>
    </GroupCuriousTitleWrapper>
  );
};

export default GroupCuriousTitle;
const GroupCuriousTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid purple;
`;

const MainText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body3};
`;
