import styled from '@emotion/styled';

import { DetailCommentMeatBallIc, TextCommentProfileIc } from '../../../assets/svgs';

interface CommentItem {
  // id?: number;  추후 사용될지 모름
  name: string;
  moimName: string;
  content: string;
  isMyComment: boolean;
}

const CommentItem = ({ name, moimName, content, isMyComment }: CommentItem) => {
  return (
    <CommentItemWrapper>
      <TextCommentProfileIc />
      <CommentItemContainer>
        <CommentInfoWrapper>
          <CommenterNameText $name={name}>{name}</CommenterNameText>
          <CommnertGroupNameText>{moimName}</CommnertGroupNameText>
        </CommentInfoWrapper>
        <CommentText>{content}</CommentText>
      </CommentItemContainer>
      {isMyComment && (
        <MeatBallWrapper>
          <DetailCommentMeatBallIcon />
        </MeatBallWrapper>
      )}
    </CommentItemWrapper>
  );
};

export default CommentItem;

const CommentItemWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  height: 8.4rem;
  margin-left: 1.2rem;
  padding: 1.8rem 0;

  background-color: ${({ theme }) => theme.colors.white};
`;

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 67rem;
  height: 4.7rem;
`;

const CommentInfoWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: start;
`;

const CommenterNameText = styled.p<{ $name: string }>`
  color: ${({ theme }) => theme.colors.mainViolet};
  color: ${({ $name, theme }) =>
    $name == '글쓴이' ? theme.colors.mainViolet : theme.colors.black};
  ${({ theme }) => theme.fonts.body5};
`;

const CommnertGroupNameText = styled.p`
  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body8};
`;

const CommentText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.body6};
`;

const MeatBallWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const DetailCommentMeatBallIcon = styled(DetailCommentMeatBallIc)`
  cursor: pointer;
`;
