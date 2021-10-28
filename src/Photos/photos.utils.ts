//해시태그 생성 함수
export const generateHashtags = (caption: String) => {
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || null;

  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
