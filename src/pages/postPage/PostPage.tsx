/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Topics } from './apis/fetchEditorContent';
import DropDown from './components/DropDown';
import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';
import {
  useGetTempSaveContent,
  useGetTopic,
  usePostContent,
  usePostTempSaveContent,
  usePresignedUrl,
  usePutEditContent,
  useTempSaveFlag,
} from './hooks/queries';

import {
  EditorEditHeader,
  EditorTempExistHeader,
  EditorTempNotExistHeader,
} from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 에디터 제목, 내용 저장 함수
  const [contentTitle, setContentTitle] = useState('');
  const [contentContent, setContentContent] = useState('');
  const [topicList, setTopicList] = useState<Topics[]>([]);
  const [topicId, setTopicId] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageToServer, setImageToServer] = useState('');

  // 모임 ID, url에서 받아오기
  const { groupId, type } = useParams() as { groupId: string; type: string };

  const [editPostId, setEditPostId] = useState('');
  useEffect(() => {
    if (type == 'edit') {
      setEditPostId(location.state.postId);
      setImageUrl(location.state.imageUrl);
    }
  }, [type]);

  // 임시저장 값 여부 확인 (서버값)
  const { isTemporaryPostExist, postId } = useTempSaveFlag(groupId || '');
  // 조건부 처리용
  const [temporaryExist, setTemporaryExist] = useState(isTemporaryPostExist);

  // 글감 받아오기
  const { topics } = useGetTopic(groupId || '');
  useEffect(() => {
    if (topics) {
      setTopicList(topics);
    }
  }, [topics]);

  // 이미지 보낼 url 받아오기
  const { fileName, url } = usePresignedUrl();
  console.log(url);
  console.log(fileName);

  // 최초저장
  const { mutate: postContent } = usePostContent({
    groupId: groupId,
    topicId: topicId,
    title: contentTitle,
    content: contentContent,
    imageUrl: imageToServer,
    anonymous: anonymous,
  });

  const saveHandler = () => {
    postContent();
  };

  // 수정하기 제출하기
  const { mutate: putEditContent } = usePutEditContent({
    topicId: topicId,
    title: contentTitle,
    content: contentContent,
    imageUrl: imageUrl,
    anonymous: anonymous,
    postId: editPostId,
  });

  const editSaveHandler = () => {
    putEditContent();
    navigate(`/detail/${groupId}/${editPostId}`);
  };

  // 임시 저장
  const { mutate: postTempSaveContent } = usePostTempSaveContent({
    groupId: groupId,
    topicId: topicId,
    title: contentTitle,
    content: contentContent,
    imageUrl: imageUrl,
    anonymous: anonymous,
  });
  const tempSaveHandler = () => {
    postTempSaveContent();
  };

  useEffect(() => {
    if (isTemporaryPostExist && type != 'edit') {
      if (confirm('임시 저장된 글을 계속 이어 쓸까요?')) {
        setTemporaryExist(true);
        setContentTitle(tempTitle);
        setContentContent(tempContent);
      } else {
        setTemporaryExist(false);
      }
    } else {
      return;
    }
  }, [isTemporaryPostExist]);

  // 임시저장 불러오기
  const { tempTopicList, tempTitle, tempContent, tempImageUrl, tempAnonymous } =
    useGetTempSaveContent(postId || '', temporaryExist || false);

  console.log(tempImageUrl);
  console.log(tempAnonymous);
  // 임시 저장 글 -> 저장하기
  const tempExistSaveHandler = () => {};

  return (
    <PostPageWrapper>
      {type == 'edit' ? (
        <EditorEditHeader onClickEditSave={editSaveHandler} />
      ) : temporaryExist ? (
        <EditorTempExistHeader onClickSubmit={tempExistSaveHandler} />
      ) : (
        <EditorTempNotExistHeader onClickTempSave={tempSaveHandler} onClickSubmit={saveHandler} />
      )}
      <ImageUpload
        saveImage={setImageUrl}
        imageUrl={imageUrl}
        setImageToServer={setImageToServer}
        url={url || ''}
        fileName={fileName || ''}
      />
      <DropDownEditorWrapper>
        <DropDown
          isTemp={temporaryExist || false} // isTemp={temporaryExist} <- 원래코드임 pr용 yarn build 에러 방지위해서 바꿔둠
          topicList={topicList}
          tempTopicList={tempTopicList}
          selectedTopicId={setTopicId}
          updateAnonymous={setAnonymous}
        />
        <Spacing marginBottom="2.4" />
        <Editor
          title={temporaryExist ? tempTitle : contentTitle}
          saveTitle={setContentTitle}
          content={temporaryExist ? tempContent : contentContent}
          saveContent={setContentContent}
        />
      </DropDownEditorWrapper>
      <Spacing marginBottom="8" />
    </PostPageWrapper>
  );
};

export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DropDownEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
