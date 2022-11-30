import R from '@components/utils/R';
import React, {useState} from 'react';
import StarRating from 'react-native-star-rating';

const Stars = props => {
  const {
    starSize = 30,
    ratingCallBack,
    fullStarColor = R.color.mainColor,
    emptyStarColor = R.color.white,
    containerStyles,
  } = props;

  const [starsCount, setStarsCount] = useState(0);

  const ratingStars = data => {
    ratingCallBack(data);
    setStarsCount(data);
  };

  return (
    <StarRating
      disabled={false}
      maxStars={5}
      starSize={starSize}
      rating={starsCount}
      emptyStarColor={emptyStarColor}
      containerStyle={{
        padding: 0,
        width: R.unit.scale(180),
        ...containerStyles,
      }}
      fullStarColor={fullStarColor}
      selectedStar={rating => ratingStars(rating)}
    />
  );
};
export default Stars;
